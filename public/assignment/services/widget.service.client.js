/**
 * Created by Vinay on 10/18/2016.
 */
(function () {

    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);


    function WidgetService()
    {
        var widgets = [
            { _id: "123", "widgetType": "HEADER", "pageId": "321", "size": 2, text: "GIZMODO"},
            { _id: "234", "widgetType": "HEADER", "pageId": "321", "size": 4, text: "Lorem ipsum"},
            { _id: "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { _id: "456", "widgetType": "HTML", "pageId": "321", text: "<p>Lorem ipsum</p>"},
            { _id: "567", "widgetType": "HEADER", "pageId": "321", "size": 4, text: "Lorem ipsum"},
            { _id: "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { _id: "789", "widgetType": "HTML", "pageId": "321", text: "<p>Lorem ipsum</p>"}
        ];

        var api = {
            createWidget : createWidget,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget
        };
        return api;

        function createWidget(pageId, widget)
        {

            var eachWidget = null;
            widget.pageId = pageId;
            widget._id = (new Date().getTime()).toString();
            widgets.push(widget);
            return widget._id;
        }

        function findWidgetById(widgetId)
        {
            var widget = null;
            for(var i in widgets)
            {
                widget = widgets[i];
                if(widget._id === widgetId)
                    return widget;
            }
            return null;
        }


        function findWidgetsByPageId(pageId)
        {
            var result = [];
            var widget = null;
            for(var i in widgets)
            {
                widget = widgets[i];
                if(widget.pageId === pageId)
                {
                    result.push(widget);
                }
            }
            return result;
        }
        
        function updateWidget(widgetId, widget)
        {

            var eachWidget = null;
            for(var i in widgets)
            {
                eachWidget = widgets[i];
                if(eachWidget._id === widgetId)
                {
                    var updatedWidget = UpdateFieldsOnWidgetType(widgets[i],widget);
                    widgets[i] = updatedWidget;
                    return true;
                }
            }
            return false;
            
        }

        function UpdateFieldsOnWidgetType(widget,currentWidget)
        {
            if(currentWidget.widgetType === "HEADER")
            {
                widget.text = currentWidget.text;
                widget.size = currentWidget.size;
            }
            else if(currentWidget.widgetType === "IMAGE")
            {
                widget.width = currentWidget.width;
                widget.url = currentWidget.url;
            }
            else if(currentWidget.widgetType === "HTML")
            {
                widget.text = currentWidget.text;

            }
            else
            {
                widget.url = currentWidget.url;
                widget.width = currentWidget.width;
            }

            return widget;
        }

        function deleteWidget(widgetId)
        {
            var widget = null;
            for(var i in widgets)
            {
                widget = widgets[i];
                if(widget._id === widgetId)
                    widgets.splice(i,1);
            }

        }





    }

})();
