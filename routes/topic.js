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
    Topic.findById(topicId)
    .populate({
        path: 'entries',
        populate: {
            path: 'author'
        }
    })
    .then((topicFromDB) => {
        res.json({topic: topicFromDB})
    })
    .catch(err => {
        console.log(err);
    })
})

router.get('/gettopics', (req, res, next) => {
    const { q = '' } = req.query;
    Topic.find({title: { $regex: new RegExp(q, "i") }})
    .then(filteredTopics => {
        res.json({filteredTopics})
    })
    .catch(err => {
        console.log(err);
    })
})


router.get('/randomtopics', (req, res, next) => {
    Topic.aggregate([
        {$sample: {size: 5}}
    ])
    .then(randomTopics => {
        res.json({randomTopics})
    })
    .catch(err => {
        console.log(err);
    })
})

router.put('/:id', isAuthenticated, (req, res, next) =>{
    const {title} = req.body;
    Topic.findByIdAndUpdate(req.params.id, {title}, {new: true})
    .then(entry => {
        res.status(200).json(title);
    })
    .catch(err => console.log(err));
})

module.exports = router;