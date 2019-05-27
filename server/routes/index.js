const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const parser = require('../configs/cloudinary.js')
const User = require("../models/User");
const Photo = require("../models/Photo");

// router.get('/secret', isLoggedIn, (req, res, next) => {
//   res.json({
//     secret: 42,
//     user: req.user
//   });
// });

// This route finds the first user, takes the file from the request with the key 'picture' and save the 'pictureUrl'
router.post('/first-user/pictures', isLoggedIn, parser.single('picture'), (req, res, next) => {
  console.log(req.file, 2435235423544235345243)

    Photo.create({ photoUrl: req.file.url.replace("http://res.cloudinary.com/jonriquer/image/upload/", ""), title:req.file.originalname }).then(result => {
      console.log("saved pic", result)
      res.json({saved:result})
    }).catch(err=>console.error(err))
});


router.post('/saveStyles', (req, res, next)=>{
  console.log(req.body, 1111111)
  Photo.findByIdAndUpdate(req.body.id, {stylez: req.body.stylez}, {new:true}).then(response=>{
    res.json({response:response})
  }).catch(err=>{ console.error(err)} )

});

router.post('/deletePhoto', (req,res,next)=>{
  Photo.findByIdAndRemove(req.body.id).then(response=>{
    res.json({response:response})
    .catch(err=>{console.error(err)})
  })
})

// Route to get all countries
// router.get('/collection', (req, res, next) => {
//   Collection.find()
//     .then(collection => {
//       res.json(collection);
//     })
//     .catch(err => next(err))
// });

module.exports = router;
