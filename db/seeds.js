const mongoose = require('mongoose');
const config   = require('../config/config');

mongoose.connect(config.db);

const User   = require('../models/user');
const Garden = require('../models/garden');

User.collection.drop();
Garden.collection.drop();

const user1 = new User({
  firstName: 'Angelina',
  lastName: 'Jolie',
  email: 'angelinajolie@gmail.com',
  password: 'password',
  passwordConfirmation: 'password'
});

user1.save((err, user) => {
  if (err) return console.log('Something went wrong saving user');
  console.log(`${user.firstName} was saved.`);

  const garden1 = new Garden({
    name: 'Japanese Roof Garden, SOAS',
    description: 'A serene space dedicated to forgiveness.  A period of repose amongst the artfully placed rocks, pebbles, and combed sand will help you find your inner harmony. Look out for the Kanji character on the granite water basin which represents the gardens dedication to forgiveness',
    image: 'tbd',
    lat: '51.5223533',
    lng: '-0.1314477',
    user: user
  });

  garden1.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });
});
