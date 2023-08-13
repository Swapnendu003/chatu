const twilio = require('twilio');


const accountSid = 'ACd3dcd809f5b36f9387538b4a83beb511';
const authToken = 'c069b54bd198b06ab7285ea2c37931bc';
const twilioPhoneNumber = '+18156459007';

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
