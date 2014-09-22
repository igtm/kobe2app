define([
	'backbone'
],
function( Backbone ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
			console.log("initialize a Eventdetail model");
		},

		defaults: {
            eventid:null,
            title: null,
            content:null,
            day:null,
            place:null,
            image:null
        },

        baseURL: 'http://54.64.141.117:3000/event/show/',

        idURL: "1.json", // default

        changeIdURL: function(idURL){
              this.idURL = idURL+".json";
              console.log("idURL is changed");
        },

        url: function(){
            console.log("URLis:"+this.baseURL+this.idURL);
              return this.baseURL+this.idURL;
        },

        parse: function(res){
            console.log(res);
            return res;
        }
    });
});
