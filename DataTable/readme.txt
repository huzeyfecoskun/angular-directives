Events

    $scope.$on("picked", (e,item) => {
        console.log(item);
    });

    $scope.$on("delete", (e, item) => {
        console.log(item);
    });
    
 Config
 
     $scope.config = {
                enableFilter : true,
                filter:
                [
                    {
                        id: "MemberType",
                        type: "select",
                        values: [{ var: "MemberType", key: "User", value: 0 },
                        { var: "MemberType", key: "Admin", value: 1 },
                        { var: "MemberType", key: "Super Admin", value: 2 }]
                    },
                    {
                        id: "EMail",
                        type: "text"
                    }
                ]
                ,
                columns: [
                    {
                        id: "MobilePhone",
                        title: getTranslate("ta_mobile_phone", getLang()),
                        type: "text",
                        css: "width:100px;"
                    }, {
                        id: "Name",
                        title: getTranslate("ta_name", getLang()),
                        type: "text"
                    },
                    {
                        id: "SureName",
                        title: getTranslate("ta_sure_name", getLang()),
                        type: "text"
                    },
                    {
                        id: "EMail",
                        title: getTranslate("ta_email", getLang()),
                        type: "text"
                    }
                ]
            };