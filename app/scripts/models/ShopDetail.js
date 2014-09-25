define([
	'backbone'
],
function( Backbone ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
			console.log("initialize a Shopdetail model");
		},

        defaults: {
            uid:null,
            title: null,
            content:null,
            day:null,
            place:null,
            image:null
        },

        baseURL: 'http://54.64.141.117:3000/shops/show/',

        idURL: 1, // default

        changeIdURL: function(idURL){
            this.idURL = idURL+".json";
            console.log("idURL is changed");
        },

        url: function(){
            return this.baseURL+this.idURL;
        },

        parse: function(res) {
            console.log(res);
            return res;
        }
    });
});
