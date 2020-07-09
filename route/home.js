const express = require('express');
const { Router } = require('express');
// const app = express();// top level function of express [ similar to "costructor" in OOP ]
const router = express.Router();// to do route handling on an external file/ modules

router.get("/", (req, res) => {
    res.send("Avengers...pff..XD");
});

// router.get("/*", (req, res) => {
//     res.status(404).send("404 PFF.. Do you even API bro XD");
// });

module.exports = router;