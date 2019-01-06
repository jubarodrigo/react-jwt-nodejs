var express = require('express');
var router = express.Router();

router.post('/login',(req, res, next) => {
    const { email, password } = req.body.userData;

    res.json({
        sendedEmail: email
    })
})

module.exports = router;