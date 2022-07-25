const router = require("express").Router();
const Entry = require('../models/Entry');
const User = require("../models/User");
const Topic = require('../models/Topic')

router.post('/', (req, res, next) => {
    const {entry, topicId} = req.body;
    Entry.create({entry})
    .then(createdEntry => {
        /* const {entry} = createdEntry; */
        Topic.findByIdAndUpdate( topicId, {$push: {entries: createdEntry._id}})
        .then(updatedTopic => {
            res.json(createdEntry)
        })
    })
    .catch(err => console.log(err))
})



module.exports = router;