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
            "id": null,
            "title":null,
            "image": null,
            "imageFlag":null,
            "category": null
        }

    });
});
