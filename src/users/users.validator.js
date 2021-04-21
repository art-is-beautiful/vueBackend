const Router = require('koa-joi-router');

const joi = Router.Joi;

const userSchama = {
    fname: joi.string().min(2).required(),
    lname: joi.string().min(2).required(),
    username: joi.string().min(3).required(),
    email: joi.string().email().required(),
};

exports.example = {
    validate: {
        type: 'json',
        body: {
            message: joi.string().min(2).required(),
        },
    },
};

exports.signIn = {
    validate: {
        type: 'json',
        body: {
            email: joi.string().min(2).required(),
            mypassword: joi.string().min(3).required()
        },
    },
};

exports.createUser = {
    validate: {
        type: 'json',
        body: {
            ...userSchama,
            mypassword: joi.string().min(3).required()
        },
    },
};