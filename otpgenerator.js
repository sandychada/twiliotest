const accountSid ='AC4fecc83fda6cb66926627cb17976717c' ;
const authToken = '2e39783a652e8a5dc04a6db2fdeb7875';
const client = require('twilio')(accountSid, authToken);
var express = require('express');

let otp = Math.floor(100000 + Math.random() * 900000);
console.log(otp);



