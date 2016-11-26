/**
 * Created by Vinay on 11/25/2016.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
      createWidget: createWidget,
      findAllWidgetsForPage: findAllWidgetsForPage,
      findWidgetById: findWidgetById,
      updateWidget: updateWidget,
      deleteWidget: deleteWidget,
      reorderWidget: reorderWidget,
      setModel : setModel

    };


    return api;

    function setModel(_model) {
        model = _model;

    }

    function createWidget(pageId, widget) {
        return WidgetModel.create(widget)
            .then(function (widgetObj) {
                return model.pageModel
                    .findPageById(pageId)
                    .then(function (pageObj) {
                        return findAllWidgetsForPage(pageId)
                            .then(function (widgets) {
                                pageObj.widgets.push(widgetObj._id);
                                pageObj.save();
                                widgetObj._page = pageObj._id;
                                return widgetObj.save();

                            })

                    })

            })

    }

    function findAllWidgetsForPage(pageId) {
        return model.pageModel.findAllWidgetsForPage(pageId);

    }
    
    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {

        var widgetType = widget.widgetType;
        if(widgetType === "HEADER")
        {
            return WidgetModel
                .update(
                    {
                        _id: widget._id
                    },
                    {
                        name: widget.name,
                        text: widget.text,
                        size: widget.size
                    }
                )
        }
        else if(widgetType === "HTML")
        {
            return WidgetModel.update(
                {
                    _id: widget._id
                },
                {
                    text: widget.text
                }
            )
        }
        else if(widgetType === "IMAGE")
        {
            return WidgetModel.update(
                {
                    _id: widget._id
                },
                {
                    name: widget.name,
                    text: widget.text,
                    url: widget.url,
                    width: widget.width
                }
            )
        }
        else if (widgetType === "TEXT")
        {
            return WidgetModel.update(
                {
                    _id: widget._id
                },
                {
                    text: widget.text,
                    rows: widget.rows,
                    formatted: widget.formatted,
                    placeHolder: widget.placeHolder

                }
            )

        }
        else
        {
            return WidgetModel.update(
                {
                    _id: widget._id
                },
                {
                    name: widget.name,
                    text: widget.text,
                    url: widget.url,
                    width: widget.width
                }
            )
        }
    }

    function deleteWidget(widgetId) {
        return WidgetModel.findById(widgetId)
            .then(function (widgetObj) {
                var pageId = widgetObj._page;
                return model
                    .pageModel
                    .removeWidgetFromPage(pageId, widgetId)
                    .then(function (page) {
                        return WidgetModel.remove({_id: widgetId});
                    })
            })
    }
    
    function reorderWidget(initial, final, pageId) {
        return WidgetModel.find({_page: pageId},
        function (err, widgets) {

            widgets.forEach(function (widget) {

                if(initial < final)
                {
                    if (widget.order == initial)
                        widget.order = final;
                    else if (widget.order > initial && widget.order <= final)
                        widget.order = widget.order - 1;

                    widget.save();
                }
                else
                {
                    if(widget.order < initial && widget.order >= final)
                        widget. order = widget.order + 1;
                    else if(widget.order == initial)
                    {
                            widget.order = final;
                    }
                    widget.save();
                }

            });
        });

    }


};