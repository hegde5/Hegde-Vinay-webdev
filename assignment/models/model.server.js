/**
 * Created by Vinay on 11/16/2016.
 */
module.exports = function(){



    var mongoose = require('mongoose');
    var connectionString =  'mongodb://admin:admin@ds155727.mlab.com:55727/webappmaker';

    mongoose.connect(connectionString);

    var userModel = require('./user/user.model.server')();

    var model = {
      userModel: userModel
    };
    return model;

};