require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const staffRoutes = require('./routes/staff');
const subscriptionRoutes = require('./routes/subscriptions');
const referralRoutes = require('./routes/referral');
const whatsappBot = require('./whatsappBot');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/referral', referralRoutes);
app.use('/api/whatsapp', whatsappBot);

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));