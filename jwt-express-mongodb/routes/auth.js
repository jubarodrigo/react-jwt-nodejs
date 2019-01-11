var express = require('express');
var router = express.Router();
//config
const config = require('../config/index');
//JWT
var jwt = require('jsonwebtoken');

router.post('/login', (req, res, next) => {
    const { email, password } = req.body.userData;

    if (email === undefined || password === undefined) {
        res.status(401).json({
            success: false,
            code: "ERROR_API_01",
            message: "email e/or password invalid."
        })
    } else {
        let tokenData = {
            id: 101
        };
        let generatadeToken = jwt.sign(tokenData, config.JWT_KEY, { expiresIn: '1m' });
        res.json({
            success: true,
            token: generatadeToken
        })
    }

    res.json({
        sendedEmail: email
    })
})

module.exports = router;