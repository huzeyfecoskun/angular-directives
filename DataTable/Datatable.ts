var datatable = angular.module("ui.datatable", []);

datatable.filter("dtfilter", () => {
    return (item, a) => {

        var o = [];

        for (var i = 0; i < a.filter.length; i++) {

            if (i === 0) {

                if (a.original[i].type === "text") {

                    if (a.filter[i] == undefined)
                        a.filter[i] = "";

                    var res = _.filter(item,
                        (n) => {
                            return n[a.original[i].id].indexOf(a.filter[i]) > -1;
                        });

                    for (var j = 0; j < res.length; j++)
                        o.push(res[j]);

                }
                else if (a.original[i].type === "select") {

                    if (a.filter[i] === undefined)
                        a.filter[i] = {};

                    var res = _.filter(item,
                        (n) => {
                            return n[a.original[i].id] === a.filter[i].value;
                        });

                    for (var j = 0; j < res.length; j++)
                        o.push(res[j]);

                }
            } else {

                if (a.original[i].type === "text") {

                    if (a.filter[i] === undefined)
                        a.filter[i] = "";

                    o = _.filter(o,
                        (n) => {
                            return n[a.original[i].id].indexOf(a.filter[i]) > -1;
                        });

                } else {

                    if (a.filter[i].value == undefined)
                        a.filter[i].value = "";

                    o = _.filter(item,
                        (n) => {
                            return n[a.original[i].id] === a.filter[i].value;
                        });
                }
            }

        }

        o = _.uniqWith(o, _.isEqual);

        return o;

        //var pagination = [];

        //for (var p = a.start; p < a.end; p++) {
        //    if (p === o.length) {

        //    }
        //    if (o[p] != null)
        //        pagination.push(o[p]);
        //}

        //return pagination;

    };
});

datatable.filter("range",
    () => {
        return (item, a) => {
            var na = [];
            for (var i = a.start; i < a.end; i++) {
                na.push(item[i]);
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
                scope.data = [];

                try {
                    scope.cfilter = new Array(scope.config.filter.length);
                } catch (e) {

                }

                scope.currentpage = 0;
                scope.pagesize = 50;
                scope.pageCount = Math.floor(scope.data.length / scope.pagesize);

                scope.$watch("data",
                    (nv, ov) => {
                        if (scope.config.enableFilter) {
                            if (scope.result.length % scope.pagesize === 0)
                                scope.pageCount = Math.floor(scope.result.length / scope.pagesize);
                            else
                                scope.pageCount = Math.floor(scope.result.length / scope.pagesize) + 1;

                            if (scope.currentpage > scope.pageCount)
                                scope.currentpage = 0;
                        } else {
                            if (scope.data.length % scope.pagesize === 0)
                                scope.pageCount = Math.floor(scope.data.length / scope.pagesize);
                            else
                                scope.pageCount = Math.floor(scope.data.length / scope.pagesize) + 1;

                            if (scope.currentpage > scope.pageCount)
                                scope.currentpage = 0;
                        }
                    });

                scope.$watch("pagesize",
                    (nv, ov) => {
                        if (scope.config.enableFilter) {

                            if (scope.result.length % scope.pagesize === 0)
                                scope.pageCount = Math.floor(scope.result.length / scope.pagesize);
                            else
                                scope.pageCount = Math.floor(scope.result.length / scope.pagesize) + 1;

                            if (scope.currentpage > scope.pageCount)
                                scope.currentpage = 0;

                            console.log("Datatable filter enabled", scope.result.length);
                        } else {
                            if (scope.data.length % scope.pagesize === 0)
                                scope.pageCount = Math.floor(scope.data.length / scope.pagesize);
                            else
                                scope.pageCount = Math.floor(scope.data.length / scope.pagesize) + 1;

                            if (scope.currentpage > scope.pageCount)
                                scope.currentpage = 0;
                        }
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

                scope.debug = () => { console.log(scope.cfilter); };

                scope.pick = (item) => { scope.$emit("picked", item) };
                scope.delete = (item) => { scope.$emit("delete", item) };
            }
        };

    });