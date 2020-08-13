const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET_KEY = '1234';

const User = require('../model/user');

router.post("/", async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send({ status: "ERROR", statusMessage: "Invalid Credentials" });

        let pwValid = await bcrypt.compare(req.body.password, user.password);
        if (!pwValid) return res.status(400).send({ status: "ERROR", statusMessage: "Invalid Credentials" })

        // res.send({ status: "SUCCESS", statusMessage: "Valid Credentials. Expect a JWT in a moment!" });

        let token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY);
        return res.send({ status: "SUCCESS", token: token });
    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;