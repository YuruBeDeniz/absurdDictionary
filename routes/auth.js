const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const saltRounds = 10;
const { isAuthenticated } = require('../middlewares/jwt'); 

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

router.post('/login', (req, res, next) => {
    const {name, password} = req.body;
    if (name === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." });
        return;
      }
     
    User.findOne({name})
        .then((foundUser) => {
            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return;
              }
            const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
            if(passwordCorrect){
                const {name, _id} = foundUser;

                const payload = {_id, name};
            
                const authToken = jwt.sign(
                   payload,
                   process.env.JWT_SECRET,
                   {algorithm: 'HS256', expiresIn: '24h'}
            )

               res.status(200).json({authToken: authToken, userId: _id});
            }       
            else {
                res.status(401).json({message: 'Unable to authenticate the user'});
            }   
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Internal Server Error'})
        });  
})

router.get('/verify', isAuthenticated, (req, res, next) => {
    res.status(200).json(req.payload);
})

module.exports = router;