/**
 * Created by Tomokatsu on 2014/09/27.
 */
define('template/helpers/showStars', ['handlebars'], function (Handlebars) {
    function showStars(star) {
        console.log("helper:showStars:"+star);
        if(!star){return;}
        var result = "<ul class='Review_rate'>";
        var i=1;
        while(i<=star) {
            result +=   "<li class='Review_starOn fa fa-star'></li>";
            i++;
        }
        while(i<=5) {
            result +=   "<li class='Review_starOff fa fa-star'></li>";
            i++;
        }
        result += "</ul>";
        return result;
    }

    Handlebars.registerHelper('showStars', showStars);
    return showStars;
});