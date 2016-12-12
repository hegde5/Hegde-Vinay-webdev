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
            .success(function (user) {
                vm.websites = user.websites;

                
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
                .success(function (userObj) {

                    vm.userWebsites = userObj.websites;

                })
                .error(function (error) {
                    console.log(error);
                })
        }
        init();


        function createWebsite()
        {
            if(vm.website === undefined || vm.website.name === "" || vm.website.name === undefined)
            {
                vm.error = "Please enter a Website Name";
                return;
            }


            WebsiteService
                .createWebsite(vm.userId, vm.website)
                .success(function (status) {
                    if(status == '0')
                    {
                        vm.error = "Website with same name exists. Please choose a different name";
                    }
                    else
                    {
                        $location.url("/user/"+userId + "/website/");
                    }
                })
                .error(function (error) {
                    console.log(error);
                });
        }

    }

    function EditWebsiteController($routeParams, WebsiteService, $location)
    {

        var vm = this;
        var userId = $routeParams.uid;
        vm.userId = userId;
        var websiteId = $routeParams.wid;
        vm.currentWebsiteId = websiteId;
        vm.deleteCurrentWebsite = deleteCurrentWebsite;
        vm.updateCurrentWebsite = updateCurrentWebsite;


        function init() {


            WebsiteService
                .findWebsitesByUser(userId)
                .success(function (userObj) {
                    vm.userWebsites = userObj.websites;
                    var userWebsites = userObj.websites;
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
                .success(function (status) {

                    if(status == '0')
                    {
                        vm.error = "Sorry! Could not delete the website";
                    }
                    else
                    {
                        $location.url("/user/"+userId + "/website/");
                    }
                })
                .error(function (error) {
                    console.log(error);
                });
        }

        function updateCurrentWebsite()
        {


            if(vm.userWebsite === undefined || vm.userWebsite.name === "" || vm.userWebsite.name === undefined)
            {

                vm.error = "Please enter a Website Name";
                return;
            }

            WebsiteService
                .updateWebsite(vm.userWebsite._id, vm.userWebsite)
                .success(function (status) {
                    if(status == '0')
                    {
                        vm.error = "Sorry! Could not update the website";
                    }
                    else
                    {
                        $location.url("/user/"+userId + "/website/");
                    }

                })
                .error(function (error) {
                    console.log(error);
                })
        }
    }

})();
