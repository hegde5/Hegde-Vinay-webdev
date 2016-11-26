/**
 * Created by Vinay on 11/26/2016.
 */
(function () {

    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, $location, WidgetService, FlickrService)
    {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pid = $routeParams.pid;
        var wgid = $routeParams.wgid;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pid = pid;
        vm.wgid = wgid;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function init()
        {
            WidgetService
                .findWidgetById(wgid)
                .success(function (widget) {
                    vm.widget = widget;
                })
                .error(function (error) {
                    console.log(error);
                })

        }
        init();

        function searchPhotos(searchTerm)
        {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo)
        {
                var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
                url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
                vm.widget.url = url;
                console.log("the url is " +  vm.widget.url);
                console.log(vm.widget);

                WidgetService
                    .updateWidget(vm.wgid, vm.widget)
                    .success(function (widget)
                    {
                        if(widget)
                        {
                            $location.url("/user/"+ vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pid +  "/widget/" + vm.wgid);
                        }
                        else
                        {
                            vm.error = "Could not upload the Image.";
                        }

                    })
                    .error(function (error) {
                        console.log(error);
                    })
        }


    }


})();