import dotenv from 'dotenv';
import nodemailer, { Transporter } from 'nodemailer';
import nodemailerExpressHandlebars from 'nodemailer-express-handlebars';
import path from 'path';

dotenv.config({ path: '.env' });

const transporter: Transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
  },
});

interface TemplateData {
  [key: string]: any;
}

const sendEmail = async (email: string, subject: string, templateData: TemplateData, templatePath: string): Promise<void> => {
  const handlebarOptions = {
    viewEngine: {
      extName: '.handlebars',
      partialsDir: path.resolve('utils/email/template/'),
      defaultLayout: false,
    },
    viewPath: path.resolve('utils/email/template/'),
    extName: '.handlebars',
  };

  transporter.use('compile', nodemailerExpressHandlebars(handlebarOptions));

  const mailOptions = {
    from: process.env.FROM_EMAIL, // Replace with your email
    to: email,
    subject,
    template: templatePath,
    context: templateData,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export default sendEmail;