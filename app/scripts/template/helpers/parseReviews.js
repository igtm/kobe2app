/**
 * Created by Tomokatsu on 2014/09/27.
 */
define('template/helpers/parseReviews', ['handlebars'], function (Handlebars) {
    function parseReviews(object) {
        console.log("helper:parseReviews:"+object);
        if(!object){return;}
        var result = '<div class="Review">';
        for(var i=0; i<object.length; i++) {
            result += "<div class='Review_article'>";
            result += "<ul class='Review_rate'>";
            var j=1;
            while(j<=object[i].rate) {
                result +=   "<li class='Review_starOn fa fa-star'></li>";
                j++;
            }
            while(j<=5) {
                result +=   "<li class='Review_starOff fa fa-star'></li>";
                j++;
            }
            result += "<span class='Review_subject'>"+object[i].subject+"</span>";
            result += "</ul>";

            result += "<div class='Review_body'>"+object[i].body+"</div>";
            result += "</div>";
        }
        result += '</div>';
        return result;
    }

    Handlebars.registerHelper('parseReviews', parseReviews);
    return parseReviews;
});