/**
 * Created by Vinay on 10/18/2016.
 */
(function () {

    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);


    function WebsiteListController($routeParams, WebsiteService)
    {
        var vm = this;
        var userId = $routeParams['uid'];

        var websites = WebsiteService.findWebsitesByUser(userId);



    }

    function NewWebsiteController()
    {

    }

    function EditWebsiteController($routeParams, WebsiteService)
    {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;


        var userWebsites = WebsiteService.findWebsitesByUser(userId);

        for(var i in userWebsites)
        {
            if(websiteId === userWebsites[i]._id)
            {
                vm.userWebsite =  userWebsites[i];
                break;
            }

        }

    }

})();
