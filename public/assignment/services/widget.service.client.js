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
            if(widget != null)
            {
                widget.pageId = pageId;
                widgets.push(widget);
            }
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
            var widget = null;
            for(var i in widgets)
            {
                widget = widgets[i];
                if(widget.pageId === pageId)
                    return widget;
            }
            return null;
        }
        
        function updateWidget(widgetId, widget)
        {
            var eachWidget = null;
            for(var i in widgets)
            {
                eachWidget = widgets[i];
                if(eachWidget._id === widgetId)
                    widgets[i] = widget;
            }
            
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
