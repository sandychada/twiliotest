require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
console.log(accountSid);

const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
    .create( {
    body: 'This is a text message from Node',
    from: '+12244326419',
    to: '+18172913302'
})
.then((message) => console.log(message))
    .catch((err) => console.log(err));

