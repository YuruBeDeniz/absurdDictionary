const router = require("express").Router();
const Entry = require('../models/Entry');
const User = require("../models/User");
const Topic = require('../models/Topic');
const { isAuthenticated } = require("../middlewares/jwt");

//create an entry
router.post('/', isAuthenticated, (req, res, next) => {
    console.log('REQ.PAYLOAD:', req.payload)
    const userID = req.payload._id;
    const {entry, topicId} = req.body;
    Entry.create({entry, author: userID, topic: topicId})
    .then(createdEntry => {
        console.log('createdEntry: ', createdEntry)
        Topic.findByIdAndUpdate( topicId, {$push: {entries: createdEntry._id}})
        .then(updatedTopic => {
            User.findByIdAndUpdate( userID, {$push: {entries: createdEntry._id}})
            .then(updatedUser => {
                Entry.findById(createdEntry._id)
                .populate('author')
                .then((populatedEntry) => {
                    res.json(populatedEntry)
                })
                .catch(err => console.log(err))
            })
        })
    })
    .catch(err => console.log(err))
})

//get a specific entry
router.get('/:id', (req, res, next) => {
    const entryId = req.params.id
   // console.log('entry ID: ', req.params)
    Entry.findById(entryId)
    .populate('topic')
    .then(entry => {
        res.status(200).json(entry);
    })
    .catch(err => console.log(err));
})

//edit an entry
router.put('/:id', isAuthenticated, (req, res, next) =>{
    const {entry} = req.body;
    Entry.findByIdAndUpdate(req.params.id, {entry}, {new: true})
    .then(entry => {
        res.status(200).json(entry);
    })
    .catch(err => console.log(err));
})


//delete an entry
router.delete('/:id', isAuthenticated, (req, res, next) => {
    const entryId = req.params.id
    Entry.findByIdAndDelete(entryId)
    .then(() => {
        res.status(200).json({message: 'Entry deleted'})
    })
    .catch(err => console.log(err))
})


module.exports = router;