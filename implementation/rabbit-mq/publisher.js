const amqp = require("amqplib");
const { faker } = require("@faker-js/faker");

async function connect() {
  try {
    const conn = await amqp.connect("amqp://localhost:5672");
    const channel = await conn.createChannel();
    await channel.assertQueue("email_service");
    let counter = 0;
    setInterval(() => {
      channel.sendToQueue(
        "email_service",
        Buffer.from(
          JSON.stringify({
            msg: faker.git.commitMessage(),
            senderName: faker.person.firstName(),
            senderEmail: faker.internet.email(),
            recipientName: faker.person.firstName(),
            recipientEmail: faker.internet.email(),
          })
        )
      );
      counter++;

      console.log(`msg sent to server: ${counter}`);
    }, 15 * 1000);

    console.log("message sent to channel");
  } catch (err) {
    console.log(err);
  }
}

connect();
