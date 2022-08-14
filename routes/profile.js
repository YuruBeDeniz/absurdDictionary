const router = require("express").Router();
const User = require('../models/User');
const { route } = require("./topic");
const fileUploader = require("../config/cloudinary.config");


router.post("/upload", fileUploader.single("imageURL"), (req, res, next) => {
    console.log("file is: ", req.file)
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    res.json({ secure_url: req.file.path });
  });

router.post('/savepicture', (req, res, next) => {
    const {imageURL, id} = req.body;
    User.findByIdAndUpdate(id, {imageURL}, {new: true})
    .then(user => {
        const imageURL = user.imageURL
        res.json(imageURL)
    })
    .catch(err => {
        console.log(err);
    })
})  

router.get('/details/:id', (req, res, next) => {
    const userId = req.params.id
    User.findById(userId)
    .populate({
            path: 'entries',
            populate: {
                path: 'topic'
            }
    })
    .then((userFromDB) => {
        res.json({user: userFromDB})
    })
    .catch(err => {
        console.log(err);
    })
})

module.exports = router;