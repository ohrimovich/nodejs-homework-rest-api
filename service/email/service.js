import Mailgen from 'mailgen'

class EmailService { 
    constructor(env, sender) {
        this.sender = sender
        switch (env) {
            case 'development':
                this.link = 'http://locallhost.com:3000/'
                break
            case 'test':
                this.link = 'http://locallhost.com:5000/'
                break
            case 'production': 
                this.link = 'https://heroku/'
                break
            default:
                this.link = 'http://locallhost.com:3000/'

        }
    }

    createEmailTemplate(username, verifyToken) { 
        const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Goit',
        link: this.link
    }
        })
        
     const email = {
    body: {
        name: username,
        intro: 'Welcome! We\'re very excited to have you on board.',
        action: {
            instructions: 'To get started with out API, please click here:',
            button: {
                color: '#22BC66', 
                text: 'Confirm your account',
                link: `${this.link}/api/users/verify/${verifyToken}`
            }
        },
        outro: 'Нужна помощь напиште нам'
    }
        }
        return mailGenerator.generate(email);
    }
    
    async sendVerifyEmail(email, username, verifyToken) {
        const emailBoby = this.createEmailTemplate(username, verifyToken)
        const msg = {
            to: email,
            subject: 'Verify email',
            html: emailBoby
        }
        try {
            const result = await this.sender.send(msg)
            console.log(result);
            return true
        } catch (error) {
            console.error(error.message)
            return false
        }
    }
}
 
export default EmailService