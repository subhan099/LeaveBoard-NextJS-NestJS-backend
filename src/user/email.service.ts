import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail', // Use the email service you prefer
      auth: {
        user: 'sibhanali19@gmail.com', // Your email address
        pass: 'Subhan@12345', // Your email password
      },
    });
  }

  async sendEmail(emailData: { to: string; subject: string; text: string }) {
    const { to, subject, text } = emailData;

    const mailOptions = {
      from: 'sibhanali19@gmail.com', // Your email address
      to,
      subject,
      text,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Email sent: ${info.response}`);
      return { message: 'Email sent successfully', status: 'success' };
    } catch (error) {
      console.error('Error sending email:', error);
      return { message: 'Email could not be sent', status: 'failure' };
    }
  }
}
