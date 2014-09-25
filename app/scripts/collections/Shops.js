define([
	'backbone',
	'models/Shop'
],
function( Backbone, Shop ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			console.log("initialize a Shops collection");
		},

		model: Shop,

        baseURL: 'http://54.64.141.117:3000/shops',

        categoryURL: "/list.json", // default

        orderURL: "/near.json", // default

        changeCategoryURL: function(category ,page, location){
            if(typeof location === 'undefined'){
                switch(category){
                    case "all":
                        this.categoryURL = "/list/"+page+".json";
                        break;
                    case "restaurant":
                        this.categoryURL = "/restaurant/"+page+".json";
                        break;
                    case "clothing":
                        this.categoryURL = "/clothing/"+page+".json";
                        break;
                    case "variety":
                        this.categoryURL = "/variety/"+page+".json";
                        break;
                }
            }else{
                console.log(location);
                var lat = location.latitude.toString(10).replace(".","-");
                var lon = location.longitude.toString(10).replace(".","-");
                switch(category){
                    case "all":
                        this.categoryURL = "/near/"+lat+"/"+lon+"/"+page+".json";
                        break;
                    case "restaurant":
                        this.categoryURL = "/restaurant/near/"+lat+"/"+lon+"/"+page+".json";
                        break;
                    case "clothing":
                        this.categoryURL = "/clothing/near/"+lat+"/"+lon+"/"+page+".json";
                        break;
                    case "variety":
                        this.categoryURL = "/variety/near/"+lat+"/"+lon+"/"+page+".json";
                        break;
                }
            }
        },

        url: function(){
            return this.baseURL+this.categoryURL;
        },
        parse: function(res){
            console.log(res);
            return res;
        }

    });
});
