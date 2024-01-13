/*require('dotenv').config();

const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

exports.makeCall = (req, res) => {
  const { phoneNumber } = req.body;

  client.calls
    .create({
      url: 'https://chatu-git-master-swapnendu003.vercel.app/api/twilio/voicecall', 
      to: phoneNumber,
      from: twilioPhoneNumber,
    })
    .then(call => {
      console.log(`Call SID: ${call.sid}`);
      res.json({ message: 'Call initiated successfully' });
    })
    .catch(error => {
      console.error('Error initiating call:', error);
      res.status(500).json({ error: 'Error initiating call' });
    });
};*/


require('dotenv').config();

const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

exports.makeCall = (req, res) => {
  const { phoneNumber } = req.body;

  const twiml = `
    <Response>
      <Say voice="alice" language="en-US">Welcome to your Therapy.</Say>
    </Response>
  `;

  client.calls
    .create({
      url: 'https://chatu-git-master-swapnendu003.vercel.app/api/twilio/voicecall' + encodeURIComponent(twiml),
      to: phoneNumber,
      from: twilioPhoneNumber,
    })
    .then(call => {
      console.log(`Call SID: ${call.sid}`);
      res.json({ message: 'Call initiated successfully' });
    })
    .catch(error => {
      console.error('Error initiating call:', error);
      res.status(500).json({ error: 'Error initiating call' });
    });
};
