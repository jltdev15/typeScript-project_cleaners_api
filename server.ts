import express from 'express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter.js';
import { ExpressAdapter } from '@bull-board/express';
import emailQueue from './utils/email/emailQueue';

import session from 'express-session';
import passport from 'passport';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/AuthRoute';
import userRoutes from './routes/UserRoutes';
// import bookingRoutes from './routes/BookingRoutes.js';
// import adminRoutes from './routes/AdminRoutes.js';
// import serviceRoutes from './routes/ServiceRoutes.js';

import './config/database_connections.js';
import './config/PassportSetup.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

app.use(helmet());

createBullBoard({
  queues: [new BullMQAdapter(emailQueue)],
  serverAdapter,
});

app.use(cookieParser());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.options("*", cors());
app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret', // Provide a default value
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    },
  })
);


app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/", authRoutes);
app.use("/api/v1/", userRoutes);
// app.use('/api/v1/', bookingRoutes);
// app.use('/api/v1/', serviceRoutes);
// app.use('/api/v1/admin/', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});