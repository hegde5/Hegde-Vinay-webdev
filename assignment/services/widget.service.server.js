/**
 * Created by Vinay on 11/3/2016.
 */
module.exports = function (app) {


    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });
    //var upload = multer({ dest: __dirname+'/../../uploads' });

    /*
    var mime = require('mime');
    var multer = require('multer'); // npm install multer --save
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname+'../../uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
        }
    });
    var upload = multer({ storage: storage });
    */

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
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/page/:pid/widget", sortWidgets);

    
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

    function getCurrentWidget(widgetId) {

        var widget = null;
        for(var i in widgets)
        {
            widget = widgets[i];

            if(widget._id === widgetId)
            {
                return widget;
            }
        }
        return widget;
    }

    function updateCurrentWidget(widgetId, widget) {

        var eachWidget = null;
        for(var i in widgets)
        {
            eachWidget = widgets[i];

            if(eachWidget._id === widgetId) {
                widget._id = eachWidget._id;
                widget.pageId = eachWidget.pageId;
                widgets[i] = widget;
                return true;
            }
        }
        return false;
    }



    function uploadImage(req, res) {


        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        //var pageId = req.body.pid;
        var pageId = req.body.pageId;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var widgetName =  req.body.name;
        var widgetText = req.body.text;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;


        var currentWidget = getCurrentWidget(widgetId);
        currentWidget.name = widgetName;
        currentWidget.text = widgetText;
        currentWidget.width = width;
        //currentWidget.url = "/assignment/uploads/" + filename;
        currentWidget.url = "/assignment/uploads/" + filename;

        if(updateCurrentWidget(widgetId, currentWidget))
        {
            var destinationPage = "/assignment/index.html#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
            res.redirect(destinationPage);
        }
        else
        {
            res.redirect("back");
        }

    }


    function getCurrentIndex(pageId, index) {
        var result = [];
        var eachWidget = null;
        for(var i in widgets)
        {
            eachWidget = widgets[i];
            if(eachWidget.pageId === pageId)
            {
                result.push(i);
            }
        }

        return result[index];
    }

    function sortWidgets(req, res)
    {
        var start = req.query.initial;
        var end = req.query.final;
        var pageId = req.params.pid;

        var modfiedStart = getCurrentIndex(pageId, start);
        var modfiedEnd = getCurrentIndex(pageId, end);
        //widgets.splice(end, 0, widgets.splice(start, 1)[0]);
        widgets.splice(modfiedEnd, 0, widgets.splice(modfiedStart, 1)[0]);
        res.send(200);

    }



}
