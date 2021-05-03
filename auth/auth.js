'use strict';

const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.login = function(req, res){
    //validation should use db
    User.findOne({name: req.body.user, password: req.body.pwd})
    .then(user => {
        //auth ok
        const id = user._id;
        let token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: 3600 // expires in 1 hour
        });
        res.status(200).json({ auth: true, token: token });
    })
    .catch(() => res.status(401).json({message: 'Unauthorized'}));
};