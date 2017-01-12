// const User = require('../models/user');
// const Garden = require('../models/garden');
//
// function newGarden(req, res) {
//   User.findById(req.params.id, (err, user) => {
//     if (err) return res.status(500).json({ message: 'Something went wrong.' });
//     if (!user) return res.status(404).json({ message: 'No user found!'});
//
//     const garden = new Garden(req.params.garden);
//     garden.save((err, garden) => {
//       if (err) return res.status(500).json({ message: 'Something went wrong.' });
//
//       user.gardens.push(garden);
//
//       user.save((err, user) => {
//         if (err) return res.status(500).json({ message: 'Something went wrong.' });
//         return res.status(200).json({ user });
//       });
//     });
//   });
// }
//
//
//
// module.exports = {
//   new: newGarden
// };
