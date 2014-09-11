define([
	'backbone',
	'models/Event'
],
function( Backbone, Event ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			console.log("initialize a Events collection");
		},

		model: Event,

        url: 'http://54.64.141.117:3000/event/list.json',

        parse: function(res){
            console.log(res);
            return res;
        }
    });
});
