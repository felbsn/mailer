import { EMAIL_HOST, EMAIL_PASS, EMAIL_PORT, EMAIL_SECURE, EMAIL_USER } from '$env/static/private';
import { json } from '@sveltejs/kit'
import nodemailer from 'nodemailer'

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: parseInt(EMAIL_PORT),
    secure: !!+EMAIL_SECURE, // true for 465, false for other ports
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS, // generated ethereal password
    },
});


export const POST = async ({ request }) => {

    let data = await request.json();

    let { body, title, to } = data;

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Ghost 👻" <${EMAIL_USER}>`, // sender address
        to: to, // list of receivers
        subject: title, // Subject line
        // text: "Hello world?", // plain text body
        html: body, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview only available when sending through an Ethereal account
    //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return json(info)
}