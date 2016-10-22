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
        vm.userId = userId;
        vm.websites = WebsiteService.findWebsitesByUser(userId);


    }

    function NewWebsiteController($routeParams, WebsiteService, $location)
    {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var userWebsites = WebsiteService.findWebsitesByUser(userId);
        vm.userId = userId;
        vm.userWebsites = userWebsites;
        vm.currentWebsiteId = websiteId;
        vm.createWebsite = createWebsite;

        function createWebsite()
        {
            if(vm.website === undefined)
            {
                vm.error = "Please enter a Website Name";
                return;
            }

            if(WebsiteService.createWebsite(vm.userId, vm.website))
            {
                $location.url("/user/"+userId + "/website/");
            }
            else
            {
                vm.error = "Website with same name exists. Please choose a different name";
            }

        }

    }

    function EditWebsiteController($routeParams, WebsiteService, $location)
    {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var userWebsites = WebsiteService.findWebsitesByUser(userId);
        vm.userWebsites = userWebsites;
        vm.currentWebsiteId = websiteId;
        vm.deleteCurrentWebsite = deleteCurrentWebsite;
        vm.updateCurrentWebsite = updateCurrentWebsite;

        for(var i in userWebsites)
        {
            if(websiteId === userWebsites[i]._id)
            {
                vm.userWebsite =  userWebsites[i];
                break;
            }

        }

        function deleteCurrentWebsite(websiteId)
        {
            if(WebsiteService.deleteWebsite(websiteId))
            {
                $location.url("/user/"+userId + "/website/");
            }
            else
            {
                vm.error = "Sorry! Could not delete the website";
            }
        }

        function updateCurrentWebsite()
        {

            if(WebsiteService.updateWebsite(vm.userWebsite._id,vm.userWebsite))
            {
                $location.url("/user/"+userId + "/website/");
            }
            else
            {
                vm.error = "Sorry! Could not update the website";
            }


        }


    }

})();
