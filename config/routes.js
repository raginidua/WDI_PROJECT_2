const express = require('express');
const router  = express.Router();

const authentications = require('../controllers/authentications');
const users           = require('../controllers/users');
const gardens         = require('../controllers/gardens');

router.route('/register')
  .post(authentications.register);
router.route('/login')
  .post(authentications.login);

router.route('/users')
  .get(users.index);
router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.route('/gardens')
  .get(gardens.index)
  .post(gardens.create);

router.route('/gardens/:id')
  .put(gardens.update)
  .delete(gardens.delete);

module.exports = router;
