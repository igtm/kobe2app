define([
	'backbone',
	'models/Event'
],
function( Backbone, Event ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function(models, options) {
			console.log("initialize a Events collection");
		},

		model: Event,

        baseURL: 'http://54.64.141.117:3000/event',

        categoryURL: "/list.json", // default

        changeCategoryURL: function(category ,page){
            switch(category){
                case "all":
                    this.categoryURL = "/list/"+page+".json";
                    break;
                case "umie":
                    this.categoryURL = "/umie/"+page+".json";
                    break;
                case "sanda":
                    this.categoryURL = "/sanda/"+page+".json";
                    break;
                case "mitsui":
                    this.categoryURL = "/mitsui/"+page+".json";
                    break;
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
