const express = require('express');
const { isLoggedIn } = require('../middlewares')
const Photo = require('../models/Photo')
const parser = require('../configs/cloudinary.js')
const router = express.Router();

// Route to get all countries
router.get('/collection', isLoggedIn, (req, res, next) => {
  Photo.find()
    .then(photos => {
      res.json(photos);
    })
    .catch(err => next(err))
});

// // Route to add a country
// router.post('/', (req, res, next) => {
//   let { name, capitals, area, description } = req.body
//   Country.create({ name, capitals, area, description })
//     .then(country => {
//       res.json({
//         success: true,
//         country
//       });
//     })
//     .catch(err => next(err))
// });

//================================================================================
//= = = = = = = = = = = = = = Cloudinary POST = = = = = = = = = = = = = = = = = =
//================================================================================

// This route finds the first user, takes the file from the request with the key 'picture' and save the 'pictureUrl'
// router.post('/first-user/pictures', parser.single('picture'), (req, res, next) => {
//   User.findOneAndUpdate({}, { pictureUrl: req.file.url })
//     .then(() => {
//       res.json({
//         success: true,
//         pictureUrl: req.file.url
//       })
//     })
// });

//================================================================================
//= = = = = = = = = = = = End Cloudinary POST = = = = = = = = = = = = = = = = = =
//================================================================================

module.exports = router;
