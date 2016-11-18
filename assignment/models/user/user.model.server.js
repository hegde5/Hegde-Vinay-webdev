/**
 * Created by Vinay on 11/16/2016.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        removeUser: removeUser
    }
    return api;

    function createUser(user) {
        return UserModel.create(user);
    }
    
    function  findUserById(userId) {
        return UserModel.findById(userId);
    }
    
    function findUserByUsername(username) {
        return UserModel.find({
            username: username
        })
    }
    
    function updateUser(userId, user) {
        return UserModel
            .update(
                {
                    _id: userId
                },
                {
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            );
        
    }

    function findUserByCredentials(username, password) {

        return UserModel.findOne({
            username: username,
            password: password
        });

    }

    function removeUser(userId) {
        return UserModel
            .remove({
                _id: userId
            });

    }
    
    

};
