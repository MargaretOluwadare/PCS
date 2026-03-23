const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const User = require('./models/User');
const Booking = require('./models/Booking');

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

router.post('/webhook', async (req, res) => {
  try {
    const incoming = req.body.Body || req.body.body;
    const from = req.body.From;

    const match = incoming.match(/Book (.+) on (\d{4}-\d{2}-\d{2}) at (.+)/i);

    if (match) {
      const [_, service, date, location] = match;

      let user = await User.findOne({ phone: from });
      if (!user) user = await User.create({ name: 'WhatsApp User', phone: from, email: '' });

      const booking = await Booking.create({
        userId: user._id,
        service,
        date,
        location,
        status: 'pending'
      });

      await client.messages.create({
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
        to: from,
        body: `✅ Booking received for ${service} on ${date} at ${location}. We will confirm shortly!`
      });
    } else {
      await client.messages.create({
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
        to: from,
        body: '❌ Invalid format. Send: Book [service] on [YYYY-MM-DD] at [location]'
      });
    }
    res.sendStatus(200);
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    res.sendStatus(500);
  }
});

module.exports = router;