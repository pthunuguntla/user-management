const User = require('../models/users.model');

const fs = require('fs');
const path = require('path');

exports.create = (req, res) => {

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        dob: req.body.dob,
        country: req.body.country,
    });

    if(req && req.file && req.file.path){
        user.img.data = fs.readFileSync(req.file.path)
        user.img.contentType = 'image/png';
    }


    User.find({ email: user.email }).then(userObj => {
        if (userObj.length){
            return res.status(200).json({
                message: 'User Already Exists With given email'
            })
        } else {
            // Save a User in the MongoDB
            user.save().then(data => {
                // send uploading message to client
                res.send({
                    statusCode: 200,
                    data
                })
            }).catch(err => {
                res.send({
                    statusCode: 500,
                    error: err.message
                })
            });
        }
    })
};

// FETCH all users
exports.findall = (req, res) => {
    User.find().select('-__v').then(userInfos => {
        res.contentType('json');
        res.status(200).json({
            message: "Get all cusers' Infos Successfully!",
            numberOfUsers: userInfos.length,
            users: userInfos
        });
    }).catch(error => {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    });
};

// UPDATE a User
exports.update = (req, res) => {

    const user = new User({});

    user.img.data = fs.readFileSync(req.file.path)
    user.img.contentType = 'image/png';
    // Find user and update it
    User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            dob: req.body.dob,
            country: req.body.country,
            img: user.img,
        },
        { new: true }
    ).select('-__v')
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "Error -> Can NOT update a user with id = " + req.params.id,
                    error: "Not Found!"
                });
            }

            res.status(200).json({
                message: "Update successfully a user with id = " + req.params.id,
                user: user,
            });
        }).catch(err => {
            return res.status(500).send({
                message: "Error -> Can not update a user with id = " + req.params.id,
                error: err.message
            });
        });
};

// DELETE a user
exports.delete = (req, res) => {
    let userId = req.params.id

    User.findByIdAndDelete(userId).select('-__v -_id')
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: "Does Not exist a user with id = " + userId,
                    error: "404",
                });
            }
            res.status(200).json({
                message: "Delete Successfully a user with id = " + userId,
                user: user,
            });
        }).catch(err => {
            return res.status(500).send({
                message: "Error -> Can NOT delete a user with id = " + userId,
                error: err.message
            });
        });
};