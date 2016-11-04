/**
 * Created by Vinay on 11/3/2016.
 */
module.exports = function (app) {
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

    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findAllWidgetsForPage);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid",updateWidget);
    app.delete("/api/widget/:wgid",deleteWidget);

    
    function createWidget(req, res) {

        var pageId = req.params.pid;
        var widget = req.body;

        widget.pageId = pageId;
        widget._id = (new Date().getTime()).toString();
        widgets.push(widget);
        res.send(widget._id);
    }

    function findAllWidgetsForPage(req, res) {


        var pageId = req.params.pid;

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

        res.json(result);
    }
    
    function findWidgetById(req, res) {

        var widgetId = req.params.wgid;

        var widget = null;
        for(var i in widgets)
        {
            widget = widgets[i];
            if(widget._id === widgetId)
            {
                res.send(widget);
                return;
            }
        }
        res.send('0');
    }

    function updateWidget(req, res) {

        var widgetId = req.params.wgid;
        var widget = req.body;

        var eachWidget = null;
        for(var i in widgets)
        {
            eachWidget = widgets[i];
            if(eachWidget._id === widgetId)
            {
                var updatedWidget = UpdateFieldsOnWidgetType(widgets[i],widget);
                widgets[i] = updatedWidget;
                res.send(200);
                return;
            }
        }
        res.send('0');
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

    function deleteWidget(req, res) {

        var widgetId = req.params.wgid;

        var widget = null;
        for(var i in widgets)
        {
            widget = widgets[i];
            if(widget._id === widgetId)
            {
                widgets.splice(i,1);
                res.send(200);
                return;
            }
        }
        res.send('0');
    }


}
