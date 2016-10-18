/**
 * Created by Vinay on 10/18/2016.
 */
(function () {

    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);


    function WebsiteService()
    {
        var websites = [
                            { _id: "123", name: "Facebook",    developerId: "456", description: "Lorem" },
                            { _id: "234", name: "Tweeter",     developerId: "456", description: "Lorem" },
                            { _id: "456", name: "Gizmodo",     developerId: "456", description: "Lorem" },
                            { _id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem" },
                            { _id: "678", name: "Checkers",    developerId: "123", description: "Lorem" },
                            { _id: "789", name: "Chess",       developerId: "234", description: "Lorem" }
                        ];

        var api = {
            createWebsite : createWebsite,
            findWebsitesByUser : findWebsitesByUser,
            findWebsiteById :  findWebsiteById,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite
        };
        return api;
        
        function createWebsite(userId, website)
        {
            if(website != null)
            {
                website.developerId = userId;
                websites.push(website);
            }

        }
        
        function findWebsitesByUser(userId)
        {
            var website = null;
            for(var i in websites)
            {
                website = websites[i];
                if(website.developerId === userId)
                {
                    return website;
                }
            }
            return null;
            
        }

        function findWebsiteById(websiteId)
        {
            var website = null;
            for(var i in websites)
            {
                website = websites[i];
                if(website._id === websiteId)
                {
                    return website;
                }
            }
            return null;

        }
        
        function updateWebsite(websiteId, website)
        {
            var eachWebsite = null;
            for(var i in websites)
            {
                eachWebsite = websites[i];
                if(websiteId === eachWebsite._id)
                {
                    websites[i] = website;
                }
            }
            
        }
        
        function deleteWebsite(websiteId)
        {
            var website = null;
            for(var i in websites)
            {
                website = websites[i];
                if(website._id === websiteId)
                {
                    websites.splice(i,1);
                }
            }
            
        }

    }

})();
