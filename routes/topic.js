const router = require("express").Router();
const Topic = require('../models/Topic');

router.get('/topic/:id', (req, res, next) => {
    const topicId = req.params.id;
    Topic.findById(topicId)
    /* .populate('entries') */
    .then((topicFromDB) => {
        res.json({topic: topicFromDB})
    })
    .catch(err => {
        console.log(err);
    })
})

router.post('/topic/:id', (req, res, next) => {
    console.log('this is req.body:', req.body)
    const {title} = req.body;
    Topic.create({
        title: title
    })
    .then((newTopic) => {
        console.log('isCreated? ', newTopic)
        res.json({newTopic: newTopic})
    })
})

module.exports = router;