import User from '@/models/userModel'
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'


export const sendEmail = async ({
    email, emailType, userId
}: any) => {

    try {
        const hashToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashToken,
                    verifyTokenExpiry: Date.now() + 3600000
                })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.NODE_MAILER_USER,
                pass: process.env.NODE_MAILER_PASSWORD
            }
        });

        const mailOptions = {
            from: 'some_email@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a> to ${emailType === 'VERIFY' ? "verify email" : "reset password"}
                or copy+paste the link below in your browser. <br> <br> ${process.env.DOMAIN}/verifyemail?token=${hashToken}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions)

        return mailResponse

    } catch (err: any) {
        throw new Error(err.message)
    }


}
