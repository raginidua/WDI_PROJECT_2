// const User = require('../models/user');
const Garden = require('../models/garden');

function gardensCreate(req, res) {
  const garden = new Garden(req.body.garden);
  garden.user = req.user.id;
  garden.save((err, garden) => {
    console.log('The current user is', req.user.id);
    if (err) return res.status(500).json({
      message: 'Something went wrong.',
      err
    });
    return res.status(200).json({ garden });
  });
}

function gardensIndex(req, res) {
  Garden.find((err, gardens) => {
    console.log(err);
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    return res.status(200).json({ gardens });
  });
}

module.exports = {
  index: gardensIndex,
  create: gardensCreate
};
