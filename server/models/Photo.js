const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  id: String,
  title: String,
  photoUrl: String,
  styles: { 
    type: Object, 
    default:
      { 
    type:"", 
    gravity:"",
    quality:"",
    crop:"",
    radius:"" 
  }
  
  }
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;