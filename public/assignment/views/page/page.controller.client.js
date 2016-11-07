/**
 * Created by Vinay on 10/18/2016.
 */
(function (){

    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController)

    function PageListController($routeParams, PageService)
    {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        vm.userId = userId;
        vm.websiteId = websiteId;

        var promise = PageService.findPageByWebsiteId(websiteId);
        promise
            .success(function (websitePages) {
                vm.websitePages = websitePages;
            })
            .error(function (error) {
                console.log(error);
            });

    }

    function NewPageController($routeParams,PageService,$location)
    {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        vm.userId = userId;
        vm.currentWebsiteId = websiteId;
        vm.createPage = createPage;


        function init() {

            PageService
                .findPageByWebsiteId(websiteId)
                .success(function (websitePages) {
                    vm.websitePages = websitePages;
                })
                .error(function (error) {
                    console.log(error);
                });
        }
        init();

        function createPage()
        {
            if(vm.currentPage === undefined)
            {
                vm.error = "Please enter a Page Name";
                return;
            }

            PageService
                .createPage(vm.currentWebsiteId, vm.currentPage)
                .success(function (status) {
                    if(status == '0')
                    {
                        vm.error = "Page with same name exists. Please choose a different name";
                    }
                    else
                    {
                        $location.url("/user/"+userId + "/website/" + websiteId + "/page");
                    }

                })
                .error(function (error) {
                    console.log(error);
                });
        }


    }

    function EditPageController($routeParams,PageService,$location)
    {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        vm.userId = userId;
        vm.pageId = pageId;
        vm.deleteCurrentPage = deleteCurrentPage;
        vm.updateCurrentPage = updateCurrentPage;

        function init() {
            var promise = PageService.findPageByWebsiteId(websiteId);
            promise
                .success(function (websitePages) {
                    vm.websitePagesonEdit = websitePages;
                    for(var i in websitePages)
                    {
                        if(pageId === websitePages[i]._id)
                        {
                            vm.websitePage =  websitePages[i];
                            break;
                        }
                    }
                })
                .error(function (error) {
                    console.log(error);
                })
        }
        init();

        function deleteCurrentPage(pageId)
        {
            PageService
                .deletePage(pageId)
                .success(function (status) {
                    if(status == '0')
                    {
                        vm.error = "Sorry! Could not delete the page";
                    }
                    else
                    {
                        $location.url("/user/"+userId + "/website/"+websiteId+"/page");
                    }
                })
                .error(function (error) {
                    console.log(error);
                })
        }

        function updateCurrentPage()
        {
            PageService
                .updatePage(vm.websitePage._id, vm.websitePage)
                .success(function (status) {
                    if(status == '0')
                    {
                        vm.error = "Sorry! Could not update the page";
                    }
                    else
                    {
                        $location.url("/user/"+userId + "/website/" + websiteId + "/page");
                    }
                })
                .error(function (error) {
                    console.log(error);

                });
        }

    }

})();
