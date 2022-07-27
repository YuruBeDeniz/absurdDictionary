const router = require("express").Router();
const User = require('../models/User');
const { route } = require("./topic");
const fileUploader = require("../config/cloudinary.config");

// POST "/api/profile/upload" => Route that will receive an image, send it to Cloudinary via the fileUploader and return the image URL
router.post("/upload", fileUploader.single("imageURL"), (req, res, next) => {
    console.log("file is: ", req.file)
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    // Get the URL of the uploaded file and send it as a response.
    // 'secure_url' can be any name, just make sure you remember to use the same when accessing it on the frontend
    res.json({ secure_url: req.file.path });
  });

router.post('/savepicture', (req, res, next) => {
    const {imageURL, id} = req.body;
    User.findByIdAndUpdate(id, {imageURL}, {new: true})
    .then(user => {
        console.log(user)
        const imageURL = user.imageURL
        res.json(imageURL)
    })
    .catch(err => {
        console.log(err);
    })
})  

router.get('/details/:id', (req, res, next) => {
    const userId = req.params.id
    //console.log(userId)
    User.findById(userId)
    .populate({
            path: 'entries',
            populate: {
                path: 'topic'
            }
    })
    /* .populate('topics') */
    .then((userFromDB) => {
        //console.log('userFromDB:', userFromDB)
        res.json({user: userFromDB})
    })
    .catch(err => {
        console.log(err);
    })
})

module.exports = router;