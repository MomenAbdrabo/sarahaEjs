import nodemailer from "nodemailer";



const transporter = nodemailer.createTransport({
service:"gmail",
  auth: {
    user: "momenabdrabooo@gmail.com",
    pass: "pnya vave zpjf zryn",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main({to=[],cc,bcc,subject,text,html,attachments=[]}={}) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <momenabdrabooo@gmail.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  info.rejected.length?false:true
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

//main().catch(console.error);
export default main

