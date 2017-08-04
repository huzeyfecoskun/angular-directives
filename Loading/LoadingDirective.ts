
var loading = angular.module("ui.loading", []);
loading.directive("loading", () => {

    return {

        restrict: "A",
        templateUrl:getaPath()+"/tr/api/template?key=loading"

    };

});