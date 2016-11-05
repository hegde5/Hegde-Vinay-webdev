/**
 * Created by Vinay on 11/1/2016.
 */
module.exports = function (app) {

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
        var result = [];
        var website = null;
        for(var i in websites)
        {
            website = websites[i];
            if(website.developerId === uid)
            {
                result.push(website);
            }
        }
        res.json(result);

    }

    function createWebsite(req, res)
    {
        var uid = req.params.uid;
        var website = req.body;
        var eachWebsite = null;
        for(var i in websites)
        {
            eachWebsite = websites[i];
            if(eachWebsite.developerId === uid &&
                    eachWebsite.name === website.name)
            {
                res.send('0');
                return;
            }

        }
        website.developerId = uid;
        website._id = (new Date().getTime()).toString();
        websites.push(website);
        res.send(websites);

    }

    function findWebsiteById(req, res)
    {
        var websiteId = req.params.wid;
        var website = null;
        for(var i in websites)
        {
            website = websites[i];
            if(website._id === websiteId)
            {
                res.send(website);
                return;
            }
        }
        res.send('0');
    }

    function updateWebsite(req, res) {

        var websiteId = req.params.wid;
        var website = req.body;
        var eachWebsite = null;
        for(var i in websites)
        {
            eachWebsite = websites[i];
            if(websiteId === eachWebsite._id)
            {
                websites[i] = website;
                res.send(200);
                return;
            }
        }
        res.send('0');
    }


    function deleteWebsite(req, res) {

        var websiteId = req.params.wid;
        var website = null;
        for(var i in websites)
        {
            website = websites[i];
            if(website._id === websiteId)
            {
                websites.splice(i,1);
                res.send(200);
                return;
            }
        }
        res.send('0');


    }


}
