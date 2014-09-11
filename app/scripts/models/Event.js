define([
	'backbone'
],
function( Backbone ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
			console.log("initialize a Event model");
		},

		defaults: {
            "title":null,
            "content":null,
            "image": null,
            "fromdDay":null,
            "toDay":null,
            "place": null,
            "time": null
        },

    });
});
