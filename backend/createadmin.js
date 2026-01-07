const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  const adminUser = new User({
    username: 'admin',
    password: 'admin123'
  });
  
  await adminUser.save();
  console.log('Admin user created: username=admin, password=admin123');
  process.exit();
}).catch(err => console.log(err));