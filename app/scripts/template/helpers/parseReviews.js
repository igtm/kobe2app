/**
 * Created by Tomokatsu on 2014/09/27.
 */
define('templates/helpers/parseReviews', ['hbs/handlebars'], function (Handlebars) {
    function parseReviews(object) {
        var result = '';
        for(var i=0; i<object.length; i++) {
            result += "<div class='Review_subject'>"+object[i].subject+"</div>";
            result += "<div class='Review_rate'>"+object[i].rate+"</div>";
            result += "<div class='Review_body'>"+object[i].body+"</div>";
        }
        return result;
    }

    Handlebars.registerHelper('parseReviews', parseReviews);
    return parseReviews;
});