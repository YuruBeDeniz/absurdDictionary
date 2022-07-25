const router = require("express").Router();
const Topic = require('../models/Topic');


router.post('/', (req, res, next) => {
    console.log('this is req.body:', req.body)
    const {title} = req.body;
    Topic.create({
        title: title
    })
    .then((newTopic) => {
        res.json({newTopic: newTopic})
    })
})

router.get('/details/:id', (req, res, next) => {
    const topicId = req.params.id;
    console.log('topicID: ', req.params)
    Topic.findById(topicId)
    .populate('entries')
    .then((topicFromDB) => {
       // console.log(topicFromDB)
        res.json({topic: topicFromDB})
    })
    .catch(err => {
        console.log(err);
    })
})

//get all topics to display 
router.get('/gettopics', (req, res, next) => {
    Topic.find()
    .then(allTopics => {
        //console.log(allTopics)
        res.json({allTopics: allTopics})
    })
})



module.exports = router;