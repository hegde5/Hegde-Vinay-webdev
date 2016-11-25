/**
 * Created by Vinay on 10/18/2016.
 */
(function () {

    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);


    function WidgetService($http)
    {

        var api = {
            createWidget : createWidget,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget,
            sort: sort
        };
        return api;

        function createWidget(pageId, widget)
        {
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, widget);
        }

        function findWidgetById(widgetId)
        {
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
        }


        function findWidgetsByPageId(pageId)
        {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);

        }
        
        function updateWidget(widgetId, widget)
        {
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget);
        }


        function deleteWidget(widgetId)
        {
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);
        }
        
        function sort(pageId, start, end) {
            var url = "/page/"+ pageId + "/widget?initial="+start+"&final="+end;
            return $http.put(url);
        }
    }

})();
