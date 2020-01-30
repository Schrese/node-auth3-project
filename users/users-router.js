const express = require('express');
const router = express.Router();

const Users = require('./users-model.js');

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.status(500).json(users)
        })
        .catch(err => {
            console.log('error getting users', err)
            res.status(500).json({ errorMessage: 'Could not get users' })
        })
})

module.exports = router;