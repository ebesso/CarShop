const nodemailer = require('nodemailer')

const EmailService = {
    Send: (password, email) => {
        return new Promise((resolve, reject) => { 
            nodemailer.createTestAccount((err, account) => {
                let transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: process.env.GMAIL_ADDRESS,
                        pass: process.env.GMAIL_PASSWORD
                    }
                })

                transporter.sendMail({
                    from: account.user,
                    to: email,
                    subject: 'New Password',
                    text: `New Password: ${password}`
                }).then((info) => {
                    resolve()
                }).catch((err) => {
                    reject(500)
                })

            })
        })
    }
}

module.exports = EmailService