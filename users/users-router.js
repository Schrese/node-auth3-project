const express = require('express');
const router = express.Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
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