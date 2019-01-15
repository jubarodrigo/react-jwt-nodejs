var express = require('express');
var router = express.Router();
//config
const config = require('../config/index');
//JWT
var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');
var db = require('../db');

router.post('/login', (req, res, next) => {
    const { email, password } = req.body.userData;

    if (email === undefined || password === undefined) {
        res.status(401).json({
            success: false,
            code: "ERROR_API_01",
            message: "email e/or password invalid."
        });
    } else {

        //find user in MongoDB
        const handler = (err, result) => {
            if (!err && bcrypt.compareSync(password, result.password)) {
                let tokenData = {
                    name: result.name,
                    email: result.email
                };
                let generatadeToken = jwt.sign(tokenData, config.JWT_KEY, { expiresIn: '1m' });
                res.json({
                    success: true,
                    token: generatadeToken
                });
            } else {
                res.status(401).json({
                    success: false,
                    code: 'Error_02',
                    message: err
                })
            }
        }

        db.findUser({ email }, handler);
    }

});

module.exports = router;