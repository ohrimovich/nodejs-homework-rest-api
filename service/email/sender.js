import sgMail from '@sendgrid/mail'
import nodemailer from 'nodemailer'

class SenderSendgrid {
    async send(msg) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        return await sgMail.send({...msg, from: process.env.SENDER_SENDGRID})
    }
}

class SenderNodemailer {
    async send(msg) {
        const config = {
  host: "smtp.example.com",
  port: 587,
  secure: false, 
  auth: {
    user: "username",
    pass: "password",
  },
        }
        const transporter = nodemailer.createTransport(config)
}
}

export {SenderSendgrid, SenderNodemailer}