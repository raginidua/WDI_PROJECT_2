// const User = require('../models/user');
module.exports = {
  index: gardensIndex,
  create: gardensCreate,
  show: gardensShow,
  update: gardensUpdate,
  delete: gardensDelete
};

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

function gardensShow(req, res) {
  Garden.findById(req.params.id, (err, garden) => {
    if (garden) return res.status(500).json({ message: 'Something went wrong.' });
    if (!garden) return res.status(404).json({ message: 'No user found!'});
    return res.status(200).json({ garden });
  });
}

function gardensUpdate(req, res) {
  Garden.findByIdAndUpdate(req.params.id, req.body.garden, { new: true}, (err, garden) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!garden) return res.status(404).json({ message: 'No user found!'});
    return res.status(200).json({ garden });
  });
}

function gardensDelete(req, res) {
  Garden.findByIdAndRemove(req.params.id, (err, garden) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!garden) return res.status(404).json({ message: 'No user found!'});
    return res.status(200).json({ message: 'garden deleted!' });
  });
}
