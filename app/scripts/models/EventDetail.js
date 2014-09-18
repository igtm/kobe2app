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

    });
});
