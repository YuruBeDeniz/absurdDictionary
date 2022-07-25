const router = require("express").Router();
const Entry = require('../models/Entry');
const User = require("../models/User");
const Topic = require('../models/Topic');

//create an entry
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

//get a specific entry
router.get('/:id', (req, res, next) => {
    const entryId = req.params.id
   // console.log('entry ID: ', req.params)
    Entry.findById(entryId)
    .then(entry => {
        res.status(200).json(entry);
    })
    .catch(err => console.log(err));
})

//edit an entry
router.put('/:id', (req, res, next) =>{
    const {entry} = req.body;
    Entry.findByIdAndUpdate(req.params.id, {entry}, {new: true})
    .then(entry => {
        res.status(200).json(entry);
    })
    .catch(err => console.log(err));
})


//delete an entry
router.delete('/:id', (req, res, next) => {
    const entryId = req.params.id
    Entry.findByIdAndDelete(entryId)
    .then(() => {
        res.status(200).json({message: 'Entry deleted'})
    })
    .catch(err => console.log(err))
})


module.exports = router;