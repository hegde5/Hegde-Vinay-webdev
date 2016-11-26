/**
 * Created by Vinay on 11/3/2016.
 */
module.exports = function (app, model) {


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

        model
            .widgetModel
            .createWidget(pageId, widget)
            .then(
                function (widget) {
                    if(widget)
                    {
                        res.send(widget);
                    }
                    else
                    {
                        res.send('0');
                    }

                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAllWidgetsForPage(req, res) {


        var pageId = req.params.pid;

        model
            .pageModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    if(widgets)
                    {
                        res.send(widgets);
                    }
                    else
                    {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }
    
    function findWidgetById(req, res) {

        var widgetId = req.params.wgid;

        model
            .widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    if(widget)
                    {
                        res.send(widget);
                    }
                    else
                    {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateWidget(req, res) {

        var widgetId = req.params.wgid;
        var widget = req.body;

        model
            .widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (status) {
                    if(status)
                    {
                        res.send(200);
                    }
                    else
                    {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }

            );
    }

    // function UpdateFieldsOnWidgetType(widget,currentWidget)
    // {
    //     if(currentWidget.widgetType === "HEADER")
    //     {
    //         widget.text = currentWidget.text;
    //         widget.size = currentWidget.size;
    //     }
    //     else if(currentWidget.widgetType === "IMAGE")
    //     {
    //         widget.width = currentWidget.width;
    //         widget.url = currentWidget.url;
    //     }
    //     else if(currentWidget.widgetType === "HTML")
    //     {
    //         widget.text = currentWidget.text;
    //
    //     }
    //     else
    //     {
    //         widget.url = currentWidget.url;
    //         widget.width = currentWidget.width;
    //     }
    //
    //     return widget;
    // }

    function deleteWidget(req, res) {

        var widgetId = req.params.wgid;

        model
            .widgetModel
            .deleteWidget(widgetId)
            .then(
                function (status) {
                    if(status)
                    {
                        res.send(200);
                    }
                    else
                    {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);

                }
            );
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


        //var currentWidget = getCurrentWidget(widgetId);
        model
            .widgetModel
            .findWidgetById(widgetId)
            .then(function (currentWidget) {
                currentWidget.name = widgetName;
                currentWidget.text = widgetText;
                currentWidget.width = width;
                //currentWidget.url = "/assignment/uploads/" + filename;
                currentWidget.url = "/assignment/uploads/" + filename;

                model
                    .widgetModel
                    .updateWidget(widgetId, currentWidget)
                    .then(
                        function (status) {
                            if(status.ok ==  1)
                            {
                                var destinationPage = "/assignment/index.html#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
                                res.redirect(destinationPage);
                            }
                            else
                            {
                                res.redirect("back");
                            }

                        },
                        function (error) {
                            res.sendStatus(400).send(error);

                        }
                    );
            });

    }

    function sortWidgets(req, res)
    {
        var start = req.query.initial;
        var end = req.query.final;
        var pageId = req.params.pid;

        model
            .widgetModel
            .reorderWidget(start, end, pageId)
            .then(
                function (status) {
                    if(status)
                    {
                        res.send(200);
                    }
                    else
                    {
                        res.send('0');
                    }

                },
                function (error) {
                    res.sendStatus(400).send(error);
                }

            )
    }



};
