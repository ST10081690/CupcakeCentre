//Referencing:
//The Independent Institute of Education. 2023. APDS7311 Lab Guide.

require('dotenv').config;

const express = require('express')
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');
const user = require('../models/user');
const jwt = require('jsonwebtoken');

//registering a new user
router.post('/signup', async (req, res)=>{

    bcrypt.hash(req.body.password,10)
    .then(hash => { //hashing password
        const user = new User (
            {
                username: req.body.username,
                name: req.body.name,
                password: hash
            }
        )
    
        //saving user details
        user.save()

        .then(result => {
            res.status(201).json({
                message: 'User Created Successfully',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

    });

})

//login existing user
//ChatGPT helped with this one
router.post('/login', (req, res) =>{
    let foundUser;

    //finding user with the matching username
    User.findOne({username: req.body.username})
    .then(user => {
        console.log('User Found:', user);
        if(!user){
            return res.status(401).json({
                message:"Authentication Failure"
            });
        }

        foundUser = user;

        //comparing password to saved password with encryption
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
        if(!result){
            return res.status(401).json({
                message:"Password is Incorrect."
            });
        }

        //signing token
        const token = jwt.sign( { username: foundUser.username, userId: foundUser._id}, 
            "2c98b56d97a0360502e05d6e1b58e7cb52788a350c5fa00972992eb6c8852b3852cea1b5f3644efb0bac42e798d535220c0310d0554734f0f96e34016e04be94");

            res.status(200).json({token: token});
    })
    .catch(err => {
        return res.status(401).json({
            message:"Authentication Failure."
        });
    })
})

module.exports = router