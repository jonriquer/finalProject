const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  id: String,
  title: String,
  photoUrl: String,
  
  stylez: { 
    type: Object, 
    original:{ 
      default: true,
      gravity:"",
      quality:"",
      crop:"",
      radius:"",
      effect: "",
      effect2: "" 
    }
  
  }
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;