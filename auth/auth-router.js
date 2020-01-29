const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const Users = require('../users/users-model.js');

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

module.exports = router;