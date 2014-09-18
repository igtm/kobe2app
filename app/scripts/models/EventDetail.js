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

        url: 'http://i-and-i.main.jp/API/testServer/kobe2app/getEvent.php'
        /*       baseURL: 'http://54.64.141.117:3000/event/show',

                 idURL: 1, // default

                 changeIdURL: function(idURL){
                    this.idURL = idURL+".json";
                    console.log("idURL is changed");
                 },

                 url: function(){
                    return this.baseURL+this.idURL;
                 },
        */

         });
});
