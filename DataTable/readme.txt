Events

    $scope.$on("picked", (e,item) => {
        console.log(item);
    });

    $scope.$on("delete", (e, item) => {
        console.log(item);
    });
    
 Config
 
     $scope.dtConfig =
        {
            columns: [
                { id: "Artist", type: "text" },
                { id: "SongName", type: "text" },
                { id: "UploadDate", type: "date" }]
        };