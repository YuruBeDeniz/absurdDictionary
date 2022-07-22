const router = require("express").Router();
const Topic = require('../models/Topic');


router.post('/topic/', (req, res, next) => {
    console.log('this is req.body:', req.body)
    const {title} = req.body;
    Topic.create({
        title: title
    })
    .then((newTopic) => {
        res.json({newTopic: newTopic})
    })
})

router.get('/topic/:id', (req, res, next) => {
    const topicId = req.params.id;
    console.log('topicID: ', topicId)
    Topic.findById(topicId)
    .populate('entries')
    .then((topicFromDB) => {
        console.log(topicFromDB)
        res.json({topic: topicFromDB})
    })
    .catch(err => {
        console.log(err);
    })
})

module.exports = router;