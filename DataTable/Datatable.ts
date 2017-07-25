var datatable = angular.module("ui.datatable", []);

datatable.filter("range",
    () => {
        return (item, a) => {
            var na = [];
            for (var i = 0; i < item.length; i++) {
                if (i >= a.start && i < a.end) {
                    na.push(item[i]);
                }
            }
            return na;
        };
    });

datatable.directive("datatable",
    () => {

        return {
            restrict: "A",
            scope: {
                config: "=",
                data: "="
            },
            templateUrl: getaPath() + "/tr/api/template?key=datatable",
            link: (scope, elem, attr) => {
                scope.currentpage = 0;
                scope.pagesize = 50;
                scope.pageCount = Math.floor(scope.data.length / scope.pagesize);

                scope.$watch("data",
                    (nv, ov) => {
                        if (scope.data.length % scope.pagesize === 0)
                            scope.pageCount = Math.floor(scope.data.length / scope.pagesize);
                        else
                            scope.pageCount = Math.floor(scope.data.length / scope.pagesize) + 1;

                        if (scope.currentpage > scope.pageCount)
                            scope.currentpage = 0;
                    });

                scope.$watch("pagesize",
                    (nv, ov) => {
                        if (scope.data.length % scope.pagesize === 0)
                            scope.pageCount = Math.floor(scope.data.length / scope.pagesize);
                        else
                            scope.pageCount = Math.floor(scope.data.length / scope.pagesize) + 1;

                        if (scope.currentpage > scope.pageCount)
                            scope.currentpage = 0;
                    });

                scope.sortType = "asc";

                scope.range = (i) => { return new Array(i); }

                scope.setpage = (i) => {
                    if (i < 0) i = 0;
                    if (i >= scope.pageCount) i = scope.pageCount - 1;
                    scope.currentpage = i;

                };

                scope.ToggleSort = (sort) => {

                    scope.sortProp = sort;
                    if (scope.sortType === "asc")
                        scope.sortType = "desc";
                    else
                        scope.sortType = "asc";

                    console.log(sort);

                    var sorted = _.orderBy(scope.data, (o) => { return o[sort] }, [scope.sortType]);

                    console.log(sorted);
                    scope.data = sorted;
                };

                scope.getDate = (i) => {
                    moment.locale("tr");
                    var m = new moment(i);
                    return m.format("DD.MM.YYYY");
                };

                scope.pick = (item) => { scope.$emit("picked", item) };
                scope.delete = (item) => { scope.$emit("delete", item) };
            }
        };

    });