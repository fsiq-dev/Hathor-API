const  Router  = require('express').Router();
const {name , version} = require('../../package.json');

const userRouteV1 = require('./v1/user');

Router
    .route('/')
    .get((req, res) => {
        res.send(`${name} - Version:${version}`)
    });

userRouteV1(Router);

module.exports = Router;