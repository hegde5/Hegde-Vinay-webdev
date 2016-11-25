/**
 * Created by Vinay on 11/23/2016.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var model = {};
    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model("PageModel", PageSchema);


    var api = {

        createPage : createPage,
        findAllPagesForWebsite : findAllPagesForWebsite,
        findPageById : findPageById,
        updatePage : updatePage,
        deletePage : deletePage,
        findAllWidgetsForPage : findAllWidgetsForPage,
        removeWidgetFromPage: removeWidgetFromPage,
        setModel : setModel

    };
    return api;

    function setModel(_model) {
        model = _model;

    }

    function createPage(websiteId, page) {
        return PageModel.create(page)
            .then(function (pageObj) {
                return model
                    .websiteModel
                    .findWebsiteById(websiteId)
                    .then(function (websiteObj) {
                        websiteObj.pages.push(pageObj._id);
                        pageObj._website = websiteObj._id;
                        websiteObj.save();
                        return pageObj.save();
                    });

            });

    }

    function findAllPagesForWebsite(websiteId) {
        return model.websiteModel.findAllPagesForWebsite(websiteId);
    }
    
    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }

    function findAllWidgetsForPage(pageId) {
        return PageModel.findById(pageId)
            .populate('widgets')
            .exec();
    }
    
    function updatePage(pageId, page) {
        return PageModel.update(
            {
                _id: pageId

            },
            {
                name: page.name,
                description: page.description
            }

        );
        
    }
    
    function removeWidgetFromPage(pageId, widgetId) {
        return PageModel.findById(pageId)
            .then(function (pageObj) {
                var widgets = pageObj.widgets;
                var widgetsLength = widgets.length;
                for(var i = 0; i < widgetsLength; i++)
                {
                    if(widgets[i] == widgetId)
                        widgets.splice(i,1);
                }
                pageObj.widgets = widgets;
                return pageObj.save();

            })
        
    }
    
    function deletePage(pageId) {
        return PageModel
            .findById(pageId)
            .then(function (pageObj) {
                var websiteId = pageObj._website;
                return model.websiteModel
                    .removePageFromWebsite(websiteId, pageId)
                    .then(function (website) {
                        return PageModel.remove(
                            {
                                _id: pageId
                            }
                        )

                    });

            });
    }

};

