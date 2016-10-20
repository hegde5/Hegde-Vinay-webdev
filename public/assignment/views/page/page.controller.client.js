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

        var websitePages = PageService.findPageByWebsiteId(websiteId);
        vm.websitePages = websitePages;

    }

    function NewPageController($routeParams,PageService,$location)
    {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var websitePages = PageService.findPageByWebsiteId(websiteId);
        vm.userId = userId;
        vm.websitePages = websitePages;
        vm.currentWebsiteId = websiteId;
        vm.createPage = createPage;

        function createPage()
        {

            if(PageService.createPage(vm.currentWebsiteId, vm.currentPage))
            {
                $location.url("/user/"+userId + "/website/" + websiteId + "/page");
            }
            else
            {
                vm.error = "Page with same name exists. Please choose a different name";
            }

        }


    }

    function EditPageController($routeParams,PageService,$location)
    {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        vm.deleteCurrentPage = deleteCurrentPage;
        vm.updateCurrentPage = updateCurrentPage;

        vm.userId = userId;
        vm.pageId = pageId;

        var websitePages = PageService.findPageByWebsiteId(websiteId);
        vm.websitePagesonEdit = websitePages;

        for(var i in websitePages)
        {
            if(pageId === websitePages[i]._id)
            {
                vm.websitePage =  websitePages[i];
                break;
            }

        }

        function deleteCurrentPage(pageId)
        {
            PageService.deletePage(pageId);

            $location.url("/user/"+userId + "/website/"+websiteId+"/page");

        }

        function updateCurrentPage()
        {
            if(PageService.updatePage(vm.websitePage._id,vm.websitePage))
            {
                $location.url("/user/"+userId + "/website/" + websiteId + "/page");
            }
            else
            {
                vm.error = "Sorry! Could not update the page";
            }

        }

    }

})();
