'use strict';

const express = require('express');
const Users = require('../auth/models/users-model.js');
const basic = require('./middleware/basic.js');
const router = express.Router();
const bcrypt = require('bcrypt');





router.post('/signup', async (req, res) => {

    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = new Users(req.body);
        const record = await user.save(req.body);
        res.status(200).json(record);
    } catch (e) { res.status(403).send("Error Creating User"); }
});

router.post('/signin', basic, signinHandler);


 function signinHandler(req, res) {
    res.status(200).json(req.user);
}


module.exports = router;