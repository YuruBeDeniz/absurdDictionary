const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
/* const { isAuthenticated } = require('../middlewares/jwt') */
const User = require('../models/User');

router.post('/signup', (req, res, next) => {
    const {email, password, name} = req.body
    if (email === '' || password === '' || name === '') {
		res.status(400).json({ message: 'Provide email, password and name' })
		return
	};
	if (password.length < 4) {
		res.status(400).json({ message: 'Password has to be 4 chars min' })
		return
	};
    User.findOne({ email })
        .then(foundUser => {
            if(foundUser){
                res.status(400).json({message: 'User already exists'})
                return
            }

            const salt = bcrypt.genSaltSync();
            const hashedPassword = bcrypt.hashSync(password, salt);

            return User.create({email, password: hashedPassword, name})
                       .then(createdUser => {
                        const {email, name, _id} = createdUser;
                        const user = { email, name, _id};
                        res.status(201).json({user: user})
                       })
                       .catch(err => {
                        console.log(err);
                        req.status.json({message: 'Internal Server Error'})
                       })
        })
});

module.exports = router;