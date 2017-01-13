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

  const garden2 = new Garden({
    name: 'Postmans Park',
    description: 'A short walk from St Pauls Cathedral lies one of Londons most touching monuments: George Frederic Watts Memorial to Heroic Self-Sacrifice. Within the quiet Postmans Park, nestled beneath a tiled roof, are just over 50 ceramic plaques, each commemorating an ordinary person who lost their life trying to save others. Many of the descriptions are truly heartbreaking, and you can easily spend an entire lunchbreak contemplating their selflessness. ',
    image: 'tbd',
    lat: '51.5168433',
    lng: '-0.0998537',
    user: user
  });

  garden2.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });

  const garden3 = new Garden({
    name: 'Phoenix Garden',
    description: 'Tucked behind Charing Cross Road, this is a super spot for a leafy lunchtime break. Look out for frogs and sparrows, which are thriving thanks to an enthusiastic conservation initiative.',
    image: 'tbd',
    lat: '51.514444',
    lng: '-0.1306767',
    user: user
  });

  garden3.save((err, garden) => {
    if (err) return console.log('Something went wrong saving garden');
    return console.log(`${garden.name} was saved.`);
  });
});
