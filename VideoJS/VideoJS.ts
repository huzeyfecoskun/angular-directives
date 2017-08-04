declare var videojs;

var vjs = angular.module("ui.videojs", []);
vjs.directive("videoJs", vjsFunction);

function vjsFunction($compile) {

    const obj: any = {};

    obj.restrict = "A";
    obj.templateUrl = getaPath() + "/tr/api/template?key=videojs";

    // Sources array
    // [{ link : 'adress', resolution : '1080', mimetype : 'video/mp4' },
    // { link : 'adress', resolution : '720', mimetype : 'video/mp4' }]
    //
    // info : 'To view this video please enable JavaScript, and consider upgrading to a web browser that'
    //
    // poster : link
    //
    obj.scope = {
        sources: "=",
        info: "@",
        poster: "@",
        id:"@"
    };

    obj.replace = true;

    obj.link = (scope, elem, attr) => {

        scope.$on("init", (e, i) => {

            var split = scope.id.split(' ');
            if (split[0] !== i.id)
                return;

            try {
                videojs.getPlayers()[scope.id].dispose();
            } catch (e) {

            } 

            scope.sources = i.sources;
            console.log(scope.sources);
            $(elem).html("");
            $(elem).html(scope.template);
            $compile(elem.contents())(scope);
            scope.init();
        });

        scope.init = () => {
            var vjs = videojs(scope.id,
                {
                    controls: true
                }, () => {

                    var player = vjs;
                    player.on("loadeddata", () => {
                        console.log("VIDEO DATA LOADED...");
                        var aspect = 1080 / 1920;
                        var h = $(scope.id).width() * aspect;
                        $(scope.id).height(h);
                        $(document).mousemove(() => {
                            var aspect = 1080 / 1920;
                            var h = $(scope.id).width() * aspect;
                            $(scope.id).height(h);
                        });

                    });
                });
            vjs.play();
        };

        scope.template = `
<video id="`+scope.id+`" class="video-js" controls preload="auto" autoplay style="width: 100%;"
       poster="{{poster}}" data-setup="{}">
    
    <source ng-repeat="item in sources" src="{{item.link}}" type='{{item.mimetype}}'>

    <p class="vjs-no-js">
        {{info}}
        <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
    </p>
</video>
`;

    };

    return obj;

}