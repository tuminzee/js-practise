const amqp = require("amqplib");
const nodemailer = require("nodemailer");

async function connect() {
  try {
    const conn = await amqp.connect("amqp://localhost:5672");
    const channel = await conn.createChannel();
    await channel.assertQueue("email_service");

    const consumeMsgCb = (cbMsg) => {
      const { msg, senderName, senderEmail, recipientName, recipientEmail } =
        JSON.parse(cbMsg.content.toString());
      sendMail({ msg, senderName, senderEmail, recipientName, recipientEmail });
    };
    console.log("reading msg from q");
    channel.consume("email_service", consumeMsgCb, { noAck: true });
  } catch (err) {
    console.log(err);
  }
}

const sendMail = ({
  msg,
  senderName,
  senderEmail,
  recipientName,
  recipientEmail,
}) => {
  nodemailer.createTestAccount((err) => {
    if (err) {
      console.error("Failed to create a testing account. " + err.message);
      return process.exit(1);
    }

    console.log("Credentials obtained, sending message...");

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "angelo.sporer@ethereal.email",
        pass: "dfrcQD4nJ7rDy2GMfG",
      },
    });

    // Message object
    let message = {
      from: `${senderName} <${senderEmail}>`,
      to: `${recipientName} <${recipientEmail}`,
      subject: `${msg}`,
      text: "Hello to myself!",
      html: "<p><b>Hello</b> to myself!</p>",
    };

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log("Error occurred. " + err.message);
        return process.exit(1);
      }

      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  });
};

connect();
