/**
 * Created by Vinay on 11/26/2016.
 */
(function () {

    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http)
    {
        var api = {
            searchPhotos: searchPhotos
        };
        return api;

        var secret = "4c1edc00c0ec3641";

        function searchPhotos(searchTerm)
        {
            var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT".replace("API_KEY", "1030cdf994448694b66f716b8edba50c").replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }

})();
