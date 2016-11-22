/**
 * Created by Vinay on 11/18/2016.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);
    var model = {};

    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        setModel: setModel,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    }
    return api;
    
    function createWebsite(userId ,website) {
        return WebsiteModel.create(website)
            .then(function (websiteObj) {
                return model.userModel
                    .findUserById(userId)
                    .then(function (userObj) {
                        userObj.websites.push(websiteObj);
                        websiteObj._user = userObj._id;
                        websiteObj.save();
                        return userObj.save();
                    }, function (error) {
                            console.log(error);
                        }
                    );
            });
    }
    
    function findAllWebsitesForUser(userId) {
        return model.userModel.findAllWebsitesForUser(userId);
        
    }
    
    function setModel(_model) {
        model = _model;
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findById(websiteId);
    }

    function updateWebsite(websiteId, website) {
        return WebsiteModel.update(
            {
                _id: websiteId
            },
            {
                name: website.name,
                description: website.description
            }
        );

    }

    function deleteWebsite(websiteId) {
        return WebsiteModel
            .findById(websiteId)
            .then(function (websiteObj) {
                var userId = websiteObj._user;
                return model.userModel
                    .removeWebsiteFromUser(userId, websiteId)
                    .then(function (user) {
                        return WebsiteModel.remove({
                            _id: websiteId
                        });
                    });
            });

    }
}