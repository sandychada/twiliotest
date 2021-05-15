const accountSid = 'AC4fecc83fda6cb66926627cb17976717c';
const authToken = '2e39783a652e8a5dc04a6db2fdeb7875';
const client = require('twilio')(accountSid, authToken);
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
const VoiceResponse = require('twilio').twiml.VoiceResponse;




app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', router);
router.use(function (req, res, next) {
    console.log('Twilio connectivity being used');
    next();
});

let sendSMS = (phoneNumber, message) => {
    client.messages
        .create({
            body: message,
            from: '+12244326419',
            to: phoneNumber
        })
        .then((message) => {
            console.log(message.sid);
        });
};
router.route('/sendOTP').post(function (req, res) {
 let message = "Dear Customer, your OTP is ";
  let otp = Math.floor(100000 + Math.random() * 900000);
    console.log(message + otp);
    sendSMS(req.body.phoneNumber,message+otp)
    res.json({message: 'Your message has been delivered successfully!'});
});

router.route('/sendVoice').post(function (req, res) {
    client.calls
        .create({
            record:true,
            url:req.body.link ,
            to: req.body.phnumber,
            from: '+12244326419'
        })
        .then(call => console.log(JSON.stringify(call)))
        .done();
    res.json({message: 'Your message has been delivered successfully!'});
});

router.route('/getVoice').post(function (req, res) {
    console.log(req.body);
    const twiml = new VoiceResponse();
    twiml.say('Hello. This is Victory Capital.');
    const gather = twiml.gather({ numDigits: 1 });
    gather.say('Please press 1 to confirm');

    // If the user doesn't enter input, loop
    twiml.redirect('/sendVoice');

    // Render the response as XML in reply to the webhook request
    res.type('text/xml');
    res.send(twiml.toString());

    // client.calls
    //     .create({
    //         record: true,
    //         url: response.body.link,
    //         from: '+12244326419',
    //         to: req.body.phnumber
    //     })
    //     .then((call) => {
    //         console.log(call.sid);
    //         res.json({message: 'Thanks for your call!'});
    //     });
});

router.route('/sendEmail').post(function (req, res) {
    client.messages
        .create({
            body: req.body.msgtext,
            from: '+12244326419',
            to: req.body.phonenumber
        })
        .then(message => console.log(message.sid));
});

router.route('/sendOTP').post(function (req, res) {
    client.verify.services(accountSid)
        .verifications
        .create({to: req.body.phonenumber, channel: req.body.channel})
        .then((message) => {
            console.log(message.status);
            res.json({message: 'Your number has been delivered successfully!'});
        });
});
const port = 7001;
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});

