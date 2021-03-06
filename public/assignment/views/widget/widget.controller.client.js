/**
 * Created by Vinay on 10/18/2016.
 */
(function(){

    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($sce,$routeParams, WidgetService)
    {

        var vm =  this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pid = $routeParams.pid;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pid = pid;

        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;
        //vm.sort = sort;

        function checkSafeHtml(widget)
        {
            return $sce.trustAsHtml(widget.text);
        }

        function checkSafeYouTubeUrl(url)
        {

            if(url === undefined)
                return;
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function init()
        {
            WidgetService
                .findWidgetsByPageId(pid)
                .success(function (page) {
                    //vm.widgets = page.widgets;
                    var widgets = page.widgets;
                    vm.widgets = widgets.sort(function(a, b) {
                        return parseInt(a.order) - parseFloat(b.order);
                    });

                })
                .error(function (error) {
                    console.log(error);
                });
        }
        init();
        //
        // function sort(start, end) {
        //         WidgetService
        //             .sort(start, end)
        // }

    }

    function NewWidgetController($location,$routeParams,WidgetService)
    {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        vm.createWidget = createWidget;


        function init()
        {
            WidgetService
                .findWidgetsByPageId(pageId)
                .success(function (page) {
                    //vm.widgets = page.widgets;
                    var widgets = page.widgets;
                    vm.widgets = widgets.sort(function(a, b) {
                        return parseInt(a.order) - parseInt(b.order);
                    });

                })
                .error(function (error) {
                    console.log(error);
                });
        }
        init();

        function createWidget(widgetType)
        {

            if(widgetType === "HEADER" || widgetType === "IMAGE" || widgetType === "HTML" || widgetType === "YOUTUBE" || widgetType === "TEXT")
            {
                var widgetOrder = vm.widgets.length;
                var widget = {order: widgetOrder};
                widget.widgetType = widgetType;
                //var newWgid = WidgetService.createWidget(pageId,widget);
                WidgetService
                    .createWidget(pageId, widget)
                    .success(function (widget) {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+widget._id);
                    })
                    .error(function (error) {
                        console.log(error);
                    });
            }
            else
            {
                vm.error = "Cannot create this widget type. Please choose one of header, image, html, youtube";
            }
        }

    }

    function EditWidgetController($routeParams, WidgetService,$location)
    {
        var vm =  this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pid = $routeParams.pid;
        var wgid = $routeParams.wgid;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pid = pid;
        vm.wgid = wgid;
        vm.updateCurrentWidget = updateCurrentWidget;
        vm.deleteCurrentWidget = deleteCurrentWidget;

        function updateCurrentWidget()
        {

            if(vm.widget === undefined || vm.widget.name === "" || vm.widget.name === undefined)
            {
                vm.error = "Please enter a Widget Name and Text";
                return;
            }
            WidgetService
                .updateWidget(vm.wgid, vm.widget)
                .success(function (status) {
                    if(status == '0')
                    {
                        vm.error = "Sorry! Could not update the widget";
                    }
                    else
                    {
                        $location.url("/user/"+userId + "/website/" + websiteId + "/page/"+pid+"/widget");
                    }

                })
                .error(function (error) {
                    console.log(error);

                });
        }

        function deleteCurrentWidget()
        {
            WidgetService
                .deleteWidget(vm.wgid)
                .success(function () {
                    $location.url("/user/"+userId + "/website/"+websiteId+"/page/"+pid+"/widget");
                })
                .error(function (error) {
                    console.log(error);
                });
        }

        function init()
        {
            WidgetService
                .findWidgetById(vm.wgid)
                .success(function (widget) {
                    vm.widget = widget;
                })
                .error(function (error) {
                    console.log(error);
                });
        }
        init();


    }
})();
