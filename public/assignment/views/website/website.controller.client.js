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
        var promise = WebsiteService.findWebsitesByUser(userId);
        promise
            .success(function (websites) {
                vm.websites = websites;
                
            })
            .error(function (error) {
                console.log(error);
            });
    }

    function NewWebsiteController($routeParams, WebsiteService, $location)
    {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        vm.userId = userId;
        vm.currentWebsiteId = websiteId;
        vm.createWebsite = createWebsite;

        function init() {
            var userId = $routeParams['uid'];
            vm.userId = userId;
            var promise = WebsiteService.findWebsitesByUser(userId);
            promise
                .success(function (websites) {
                    vm.userWebsites = websites;

                })
                .error(function (error) {
                    console.log(error);
                })
        }
        init();


        function createWebsite()
        {
            if(vm.website === undefined)
            {
                vm.error = "Please enter a Website Name";
                return;
            }

            WebsiteService
                .createWebsite(vm.userId, vm.website)
                .success(function () {
                    $location.url("/user/"+userId + "/website/");
                })
                .error(function (error) {
                    console.log(error);
                    vm.error = "Website with same name exists. Please choose a different name";
                });
        }

    }

    function EditWebsiteController($routeParams, WebsiteService, $location)
    {

        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        vm.currentWebsiteId = websiteId;
        //var userWebsites = WebsiteService.findWebsitesByUser(userId);
        //vm.userWebsites = userWebsites;
        vm.deleteCurrentWebsite = deleteCurrentWebsite;
        vm.updateCurrentWebsite = updateCurrentWebsite;


        function init() {

            WebsiteService
                .findWebsitesByUser(userId)
                .success(function (userWebsites) {
                    vm.userWebsites = userWebsites;
                    for(var i in userWebsites)
                    {
                        if(websiteId === userWebsites[i]._id)
                        {
                            vm.userWebsite =  userWebsites[i];
                            break;
                        }
                    }
                })
                .error(function (error) {
                    console.log(error);
                })
        }
        init();

        function deleteCurrentWebsite(websiteId)
        {
            WebsiteService
                .deleteWebsite(websiteId)
                .success(function () {
                    $location.url("/user/"+userId + "/website/");
                })
                .error(function (error) {
                    console.log(error);
                    vm.error = "Sorry! Could not delete the website";
                });
        }

        function updateCurrentWebsite()
        {
            WebsiteService
                .updateWebsite(vm.userWebsite._id, vm.userWebsite)
                .success(function () {
                    $location.url("/user/"+userId + "/website/");
                })
                .error(function (error) {
                    console.log(error);
                    vm.error = "Sorry! Could not update the website";
                })
        }
    }

})();
