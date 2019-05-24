const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  id: String,
  title: String,
  photoUrl: String
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;