/**
 * Created by Vinay on 10/18/2016.
 */
(function (){

    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController)

    function PageListController()
    {


    }

    function NewPageController()
    {

    }

    function EditPageController($routeParams,PageService)
    {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;

        vm.userId = userId;

        var websitePages = PageService.findPageByWebsiteId(websiteId);

        for(var i in websitePages)
        {
            if(pageId === websitePages[i]._id)
            {
                vm.websitePage =  websitePages[i];
                break;
            }

        }

    }

})();
