const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const Users = require('../users/users-model.js');
const secrets = require('../config/secrets.js');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
        .then(newUser => {
            res.status(201).json(newUser);
        })
        .catch(err => {
            console.log('error creating user', err);
            res.status(500).json({ errorMessage: 'Error creating this user' })
        })
})

router.post('/login', (req, res) => {
    let {username, password} = req.body;

    Users.findBy({ username })
        .first()
        .then(someone => {
            if (someone && bcrypt.compareSync(password, someone.password)) {
                const token = generateToken(someone);
                res.status(200).json({ message: `Welcome ${someone.username}`, token})
            } else {
                res.status(401).json({ message: 'Invalid Credentials!' })
            }
        })
        .catch(err => {
            console.log('error logging in', err)
            res.status(500).json({ errorMessage: 'Could not log in!' })
        })
})

function generateToken(user) {
    const payload = {
        userId: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '8h'
    } 
    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;