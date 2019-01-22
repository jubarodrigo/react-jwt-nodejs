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
            if (!err && result !== null && bcrypt.compareSync(password, result.password)) {
                let tokenData = {
                    name: result.name,
                    email: result.email
                }
                let generatadeToken = jwt.sign(tokenData, config.JWT_KEY, { expiresIn: '1m' });
                res.json({
                    success: true,
                    token: generatadeToken
                });
            } else {
                res.status(401).json({
                    success: false,
                    code: 'API_Error_02',
                    message: err || 'User does not exists'
                })
            }
        }

        db.findUser({ email }, handler);
    }

});

router.get('/verifytoken', (req, res, next) => {
    //[0] = Bearer , [1] = Token
    let token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, config.JWT_KEY, (err, decode) => {
        if (!err) {
            res.json({
                success: true,
                message: 'Token is valid'
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Token is not valid',
                error: err
            });
        }
    });
});

module.exports = router;