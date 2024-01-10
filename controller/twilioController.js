require('dotenv').config();

const twilio = require('twilio');

const accountSid = 'AC7f2235eda5eb8b5b2a3465191a9e9124'
const authToken = 'ba5f87ffbd8f32857bc7c8573a33af63'
const twilioPhoneNumber = '+12403453991'

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
};
