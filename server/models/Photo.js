const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  id: String,
  title: String,
  photoUrl: String,
  styles: { 
    type: Object, 
    default:
      { 
    type:"fetch", 
    gravity:"face:center",
    quality:"100",
    crop:"",
    radius:"max" 
  }
  
  }
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;