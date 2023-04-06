import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ankan.basu.webdev@gmail.com',
    pass: ''
  }
});