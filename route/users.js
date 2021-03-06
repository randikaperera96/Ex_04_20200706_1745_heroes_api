const express = require('express');
const bcrypt = require("bcrypt");

// const { Router } = require('express');
const User = require('../model/user');
const { use } = require('./heroes');
// const app = express();// top level function of express [ similar to "costructor" in OOP ]
const router = express.Router();// to do route handling on an external file/ modules 

router.post("/", async (req, res) => {
    //if email is duplicate send response code 400 with msg:"User already registered"
    //Validation of other parameters
    // console.log('DEBUG: here')
    try {

        let salt = await bcrypt.genSalt(10);
        let hashPw = await bcrypt.hash(req.body.password, salt);

        let user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashPw
        });

        // console.log('DEBUG: here')

        user = await user.save();
        return res.send({
            userName: user.userName,
            email: user.email
        });
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

module.exports = router;