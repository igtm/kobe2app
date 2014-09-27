/**
 * Created by Tomokatsu on 2014/09/27.
 */
define('template/helpers/getMap', ['handlebars',"async!http://maps.google.com/maps/api/js?sensor=true"], function (Handlebars) {
    function getMap(lat, lng, title) {
        console.log("helper:getMap:"+lat+lng+title);
        if(!lat || !lng){return;}
        var latlng = new google.maps.LatLng(lat,lng);
        var myOptions= {
            zoom: 14,
            center: latlng
        };
        var map=new google.maps.Map(document.getElementById("ContentNext_map"),myOptions);
        var marker1= new google.maps.Marker({
            position: latlng,
            title: title
        });
        marker1.setMap(map);
    }

    Handlebars.registerHelper('getMap', getMap);
    return getMap;
});