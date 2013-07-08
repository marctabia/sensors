function CounterCtrl($scope, $timeout) {
    var map = L.map('map').setView([12.4, 123], 6);
    var gmapsAttrib = '&copy; <a href="http://www.google.com.ph/permissions/geoguidelines.html">Google Maps</a> contributors';
    var gmapsURL = 'http://mt1.google.com/vt/v=w2.106&x={x}&y={y}&z={z}';
    L.tileLayer(gmapsURL, {maxZoom: 12, minZoom: 4,attribution: gmapsAttrib}).addTo(map);
    
    var sensorIcon;
    var count = 0;
    $scope.count = 0;
    var stations = [];
    var aws = [];
    var awsIcon;
    var asg = [];
    var asgIcon;
    var arg = [];
    var argIcon;
    var delay = 200;
    
    var json = $.getJSON('../sensors.json', function(data) {
            $.each(data, function (index, value) {
                if (index == 0 ){
                    aws = value.stations;
                    awsIcon = L.icon({iconUrl: value.icon});
                }else if (index == 1 ){
                    asg = value.stations;
                    asgIcon = L.icon({iconUrl: value.icon});
                }else if (index == 2 ){
                    arg = value.stations;
                    argIcon = L.icon({iconUrl: value.icon});
                }
            });
    }).done(function() { console.log( "done" );
    }).fail(function() { console.log( "error" );
    }).always(function() { console.log( "complete" ); }).then( function (){
        $.each(aws, function(k, v){
            $timeout(function (){
                L.marker([v.lat, v.lng], {icon: awsIcon}).addTo(map);
                $scope.count++;
            }, delay*count);
            count++;
        });
                
        $.each(asg, function(k, v){
            $timeout(function (){
                L.marker([v.lat, v.lng], {icon: asgIcon}).addTo(map);
                $scope.count++;
            }, delay*count);
            count++;
        });
                
        $.each(arg, function(k, v){
            $timeout(function (){
                L.marker([v.lat, v.lng], {icon: argIcon}).addTo(map);
                $scope.count++;
            }, delay*count);
            count++;
        });
    });
}
