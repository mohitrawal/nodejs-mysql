const User = require("../Models/User");
const knex = require('../Database/knex');
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const Privatekey = "MOHITRAWAL";
module.exports = {
    create: async function(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        let user = {
            user_first_name: req.body.user_first_name,
            user_last_name: req.body.user_last_name,
            user_username: req.body.user_username,
            user_email: req.body.user_email,
            user_password:req.body.user_password,
            user_status: 1
        };
        const salt = await bcrypt.genSalt(10);
        user.user_password = bcrypt.hashSync(user.user_password, salt);
        knex('users').insert(user).then(function(user){
            return res.json({
                status:200,
                message:"successfully created"
            })
        }).catch(function(error) {
            res.json({
                error : error,
                status:400
            })
            return;
        });
    },
    userList: function(req,res,next) {
        knex.select('user_first_name','user_last_name','user_email')
        .from('users')
        .then(function(users) {
            return res.json({
                status:200,
                message:"success",
                users: users
            })
        });
    },
    userDetails: function(req,res,next) {
        knex.select('user_first_name','user_last_name','user_email')
        .from('users')
        .where('user_id', req.params.id) 
        .then(function(user) {
            return res.json({
                status:200,
                message:"success",
                users: user
            })
        });
    },
    updateUser: function(req,res,next){
        
    },
    login: function(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        
        knex('users').where({user_username: req.body.username}).first().then(function(user){
            console.log('usr',user)
            if (!user) {
                return res.json({
                    status:200,
                    message:"user not found"
                })    
            }
            bcrypt.compare(req.body.password, user.user_password).then(isAuthenticated => {
                if(!isAuthenticated){
                    return res.status(401).json({
                        error: "Unauthorized Access!"
                    })
                }else{
                    return jwt.sign({username:user.user_username}, Privatekey, (error, token) => {
                        res.status(200).json({token})
                    })
                }
            })
        }).catch(function(error) {
            return res.json({
                error : error,
                status:400
            })
        });
    },
}