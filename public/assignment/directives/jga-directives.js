/**
 * Created by Vinay on 11/6/2016.
 */
(function(){

    angular
        .module("jgaDirectives", [])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable() {


        function linker(scope, element, attributes) {

            var start = -1;
            var end = -1;

            element
                .sortable({
                    start: function (event, ui) {
                       start = $(ui.item).index();
                    },
                    stop: function (event, ui) {
                        end = $(ui.item).index();
                        scope.sortableController.sort(start, end);
                    }
                });
        }

        return {
            scope:{},
            link: linker,
            controller: sortableController,
            controllerAs: 'sortableController'
        }

    }


    function sortableController(WidgetService, $routeParams){
        var vm = this;
        vm.sort = sort;

        function sort(start, end) {

            var pageId = $routeParams.pid;
            WidgetService
                .sort(pageId, start, end)
                .success(function () {
                })
                .error(function (err) {

                });
        }
    }

})();
