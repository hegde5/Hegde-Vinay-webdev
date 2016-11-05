/**
 * Created by Vinay on 11/2/2016.
 */
module.exports = function (app) {

    var pages = [
        { _id: "321", name: "Post 1", websiteId: "456", description: "Lorem" },
        { _id: "432", name: "Post 2", websiteId: "456", description: "Lorem" },
        { _id: "543", name: "Post 3", websiteId: "456", description: "Lorem" }
    ];

    app.get("/api/website/:wid/page", findAllPagesForWebsite);
    app.post("/api/website/:wid/page", createPage);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);



    function findAllPagesForWebsite(req, res) {

        var websiteId = req.params.wid;

        var result = [];
        var page = null;
        for(var i in pages)
        {
            page = pages[i];
            if(page.websiteId === websiteId)
            {
                result.push(page);
            }

        }
        res.json(result);
    }


    function createPage(req, res)
    {
        var websiteId = req.params.wid;
        var page = req.body;

        var eachPage = null;
        for(var i in pages)
        {
            eachPage = pages[i];
            if(eachPage.websiteId === websiteId &&
            eachPage.name === page.name)
            {
                res.send('0');
                return;
            }

        }
        page.websiteId = websiteId;
        page._id = (new Date().getTime()).toString();
        pages.push(page);
        res.send(pages);

    }

    function findPageById(req, res) {

        var pageId = req.params.pid;
        var page = null;
        for(var i in pages)
        {
            page = pages[i];
            if(page._id === pageId)
            {
                res.send(page);
                return;
            }
        }
        res.send('0');
    }

    function updatePage(req, res) {

        var pageId = req.params.pid;
        var page = req.body;

        var eachPage = null;
        for(var i in pages)
        {
            eachPage = pages[i];
            if(eachPage._id === pageId)
            {
                pages[i] = page;
                res.send(200);
                return;
            }
        }
        res.send('0');
    }

    function deletePage(req, res) {

        var pageId = req.params.pid;
        var page = null;

        for(var i in pages)
        {
            page = pages[i];
            if(page._id == pageId)
            {
                pages.splice(i,1);
                res.send(200);
                return;
            }
        }
        res.send('0');
    }
}
