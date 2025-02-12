import { Queue, Worker, Job } from 'bullmq';
import sendEmail from './sendEmail'; // Adjust the path as needed

interface EmailJobData {
    email: string;
    subject: string;
    templateData: any;
    templatePath: string;
}

const emailQueue = new Queue<EmailJobData>('emailQueue', {
    connection: {
        host: 'localhost',
        port: 6379,
    },
});

const emailWorker = new Worker<EmailJobData>('emailQueue', async (job: Job<EmailJobData>) => {
    const { email, subject, templateData, templatePath } = job.data;
    await sendEmail(email, subject, templateData, templatePath);
}, {
    connection: {
        host: 'localhost',
        port: 6379,
    },
});

export default emailQueue;