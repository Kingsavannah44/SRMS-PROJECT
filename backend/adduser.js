const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  const user = new User({ username: 'admin', password: 'password' });
  await user.save();
  console.log('User created');
  process.exit();
}).catch(err => console.log(err));