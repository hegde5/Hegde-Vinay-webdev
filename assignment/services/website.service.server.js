/**
 * Created by Vinay on 11/1/2016.
 */
module.exports = function (app, model) {

    var websites = [
        { _id: "123", name: "Facebook",    developerId: "456", description: "Lorem" },
        { _id: "234", name: "Tweeter",     developerId: "456", description: "Lorem" },
        { _id: "456", name: "Gizmodo",     developerId: "456", description: "Lorem" },
        { _id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem" },
        { _id: "678", name: "Checkers",    developerId: "123", description: "Lorem" },
        { _id: "789", name: "Chess",       developerId: "234", description: "Lorem" }
    ];


    app.get("/api/user/:uid/website", findAllWebsitesForUser);
    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);

    function findAllWebsitesForUser(req,res)
    {
        var uid = req.params.uid;

        model
            .websiteModel
            .findAllWebsitesForUser(uid)
            .then(
                function (websites) {
                    if(websites)
                    {
                        res.json(websites);
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

    function createWebsite(req, res)
    {
        var uid = req.params.uid;
        var website = req.body;


        model
            .websiteModel
            .createWebsite(uid, website)
            .then(function (website) {
                if(website){
                    // console.log("Website is " + website);
                    res.json(website);
                }
                else{
                    res.send('0');
                }

            },
                function (error) {
                    res.sendStatus(400).send(error);
                }

            );
    }

    function findWebsiteById(req, res)
    {

        var websiteId = req.params.wid;

        model
            .websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                if(website)
                {
                    res.send(website);
                }
                else
                    res.send('0');

            },
            function (error) {
                res.sendStatus(400).send(error);
            });
    }

    function updateWebsite(req, res) {

        var websiteId = req.params.wid;
        var website = req.body;

        model
            .websiteModel
            .updateWebsite(websiteId, website)
            .then(function (status) {
                if(status)
                {
                    res.send(200);
                }
                else
                    res.send('0');
            },
            function (error) {
                res.sendStatus(400).send(error);
            });
    }


    function deleteWebsite(req, res) {

        console.log("Called");
        var websiteId = req.params.wid;

        model
            .websiteModel
            .deleteWebsite(websiteId)
            .then(function (status) {
                if(status){
                    res.send(200);
                }
                else
                    res.send('0');

            },
                function (error) {
                    res.sendStatus(400).send(error);
            });
    }


}
