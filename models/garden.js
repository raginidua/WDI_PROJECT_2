const mongoose     = require('mongoose');

const gardenSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  image: { type: String, unique: true, required: true, trim: true },
  lat: { type: String, required: true },
  lng: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User'}
}, {
  timestamps: true
});

module.exports = mongoose.model('Garden', gardenSchema);
