const express = require('express');
const User = require('../models/userModel');
const router = express.Router();
const getToken = require('../util');

router.post('/signin', async (req, res) => {
    console.log(req.body);
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if(signinUser) {
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        })
    } else {
        res.status(401).send({msg: 'Invalid Email or Password'})
    }
});
router.post('/register', async (req, res) => {
    console.log(req.body);
    const checkUser = await User.findOne({
        email: req.body.email
    });

    if(checkUser) {
        res.send({msg: 'Email Address already in Use'});
        return;
    } else {
        const user = User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        // const newUser = await User.save();
        // if(newUser) {
        //     res.send({newUser});
        // }
        if(user) {
            res.status(200).send({name:user.name, email:user.email, token:getToken(user)})
        }
    }
})

router.get("/createadmin", async(req, res) => {
    try {

        const user = new User({
            name: 'Bright',
            email: 'nbright597@gmail.com',
            password: 'bright',
            isAdmin: true,
        });
    
        const newUser = await User.save();
        if(newUser) {
            res.send({
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: getToken(newUser)
            });

        } else {
            res.send({msg: 'Invalid Credentials'})
        }
    } catch(error) {
        res.send({msg: error.message});
    }
})

module.exports = router;