/**
 * Created by Vinay on 10/18/2016.
 */
(function () {

    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    
    
    function PageService()
    {
        var pages = [
            { _id: "321", name: "Post 1", websiteId: "456", description: "Lorem" },
            { _id: "432", name: "Post 2", websiteId: "456", description: "Lorem" },
            { _id: "543", name: "Post 3", websiteId: "456", description: "Lorem" }
        ];


        var api = {

            createPage : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage
        };
        return api;


        function createPage(websiteId, page)
        {

            var eachPage = null;
            for(var i in pages)
            {
                eachPage = pages[i];
                if(eachPage.websiteId === websiteId &&
                eachPage.name === page.name)
                    return false;

            }
            page.websiteId = websiteId;
            page._id = (new Date().getTime()).toString();
            pages.push(page);
            return true;


        }

        function findPageByWebsiteId(websiteId)
        {
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
            return result;

        }

        function findPageById(pageId)
        {
            var page = null;
            for(var i in pages)
            {
                page = pages[i];
                if(page._id === pageId)
                {
                    return page;
                }
            }

            return null;
        }

        function updatePage(pageId, page)
        {
            var eachPage = null;
            for(var i in pages)
            {
                eachPage = pages[i];
                if(eachPage._id === pageId)
                {
                    pages[i] = page;
                    return true;
                }

            }
            return false;

        }
        
        function deletePage(pageId)
        {
            var page = null;

            for(var i in pages)
            {
                page = pages[i];
                if(page._id == pageId)
                {
                    pages.splice(i,1);
                    return true;
                }
            }
            return false;

        }






    }

})();
