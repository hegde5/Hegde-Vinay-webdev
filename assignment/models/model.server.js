/**
 * Created by Vinay on 11/16/2016.
 */
module.exports = function(){



    var mongoose = require('mongoose');
    var connectionString =  'mongodb://admin:admin@ds155727.mlab.com:55727/webappmaker';

    mongoose.connect(connectionString);

    var userModel = require('./user/user.model.server')();
    var websiteModel = require('./website/website.model.server')();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();

    var model = {
      userModel: userModel,
      websiteModel: websiteModel,
      pageModel: pageModel,
      widgetModel: widgetModel
    };

    websiteModel.setModel(model);
    userModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);

    return model;

};