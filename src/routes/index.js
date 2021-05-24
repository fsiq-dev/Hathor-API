const  Router  = require('express').Router();
const {name , version} = require('../../package.json');

const userRouteV1 = require('./v1/user');
const categoryRouteV1 = require('./v1/category');
const partnersRouteV1 = require('./v1/partners');

Router
    .route('/')
    .get((req, res) => {
        res.send(`${name} - Version:${version}`)
    });

userRouteV1(Router);
categoryRouteV1(Router);
partnersRouteV1(Router);

module.exports = Router;