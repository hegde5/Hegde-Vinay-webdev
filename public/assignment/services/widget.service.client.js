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
            deleteWidget : deleteWidget
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

        // function UpdateFieldsOnWidgetType(widget,currentWidget)
        // {
        //     if(currentWidget.widgetType === "HEADER")
        //     {
        //         widget.text = currentWidget.text;
        //         widget.size = currentWidget.size;
        //     }
        //     else if(currentWidget.widgetType === "IMAGE")
        //     {
        //         widget.width = currentWidget.width;
        //         widget.url = currentWidget.url;
        //     }
        //     else if(currentWidget.widgetType === "HTML")
        //     {
        //         widget.text = currentWidget.text;
        //
        //     }
        //     else
        //     {
        //         widget.url = currentWidget.url;
        //         widget.width = currentWidget.width;
        //     }
        //
        //     return widget;
        // }

        function deleteWidget(widgetId)
        {
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);
        }
    }

})();
