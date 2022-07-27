const router = require("express").Router();
const Topic = require('../models/Topic');
const { isAuthenticated } = require("../middlewares/jwt");
const User = require('../models/User');


router.post('/', isAuthenticated, (req, res, next) => {
    console.log('this is req.body:', req.body)
    const authorId = req.payload._id;
    const {title} = req.body;
    Topic.create({
        title: title,
        author: authorId
    })
    .then((newTopic) => {
        User.findByIdAndUpdate( authorId, {$push: {topics: newTopic._id}})
        .then(updatedUser => {
            res.json({newTopic: newTopic})
        })
        .catch(err => {
            console.log(err);
        })
    })
})


router.get('/details/:id', (req, res, next) => {
    const topicId = req.params.id;
    //console.log('topicID: ', req.params)
    Topic.findById(topicId)
    .populate({
        path: 'entries',
        populate: {
            path: 'author'
        }
    })
    .then((topicFromDB) => {
        //console.log('topicFromDB: ', topicFromDB)
        res.json({topic: topicFromDB})
    })
    .catch(err => {
        console.log(err);
    })
})

//get all topics to display 
router.get('/gettopics', (req, res, next) => {
    //console.log(req.query)
    //we make q equal to empty string as we need it for frontend to work properly
    //regex to make search work properly and cant be empty
    const { q = '' } = req.query;
    Topic.find({title: {$regex : q}})
    .then(filteredTopics => {
        //console.log(filteredTopics)
        res.json({filteredTopics})
    })
    .catch(err => {
        console.log(err);
    })
})

//show random topics on home page
router.get('/randomtopics', (req, res, next) => {
    Topic.aggregate([
        {$sample: {size: 5}}
    ])
    .then(randomTopics => {
        //console.log(randomTopics)
        res.json({randomTopics})
    })
    .catch(err => {
        console.log(err);
    })
})

//edit a topic
router.put('/:id', isAuthenticated, (req, res, next) =>{
    const {title} = req.body;
    Topic.findByIdAndUpdate(req.params.id, {title}, {new: true})
    .then(entry => {
        res.status(200).json(title);
    })
    .catch(err => console.log(err));
})

module.exports = router;