module.exports = {
  register: authenticationsRegister,
  login: authenticationsLogin
};

const User   = require('../models/user');
const jwt    = require('jsonwebtoken');
const config = require('../config/config');

function authenticationsRegister(req, res){
  User.create(req.body.user, (err, user) => {
    if (err) return res.status(500).json({
      message: 'Something went wrong.',
      err
    });

    const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 60*60*24 });

    return res.status(201).json({
      message: `Welcome ${user.firstName}!`,
      user,
      token
    });
  });
}

function authenticationsLogin(req, res){
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!user || !user.validatePassword(req.body.password)) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }

    const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 60*60*24 });

    return res.status(200).json({
      message: 'Welcome back.',
      user,
      token
    });
  });
}
