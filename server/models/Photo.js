const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  id: String,
  title: String,
  photoUrl: String,
  
  stylez: { 
    type: Object, 
    default:{ 
      default: true,
      gravity:"",
      quality:"",
      crop:"",
      radius:"",
      effect: "",
      effect2: "",
      effect3: "",
      effect4: "",
      zoom: "" 
    }
  
  }
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;