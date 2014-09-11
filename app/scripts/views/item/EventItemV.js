define([
	'backbone',
	'hbs!tmpl/item/EventItemV_tmpl'
],
function( Backbone, EventitemvTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Eventitemv ItemView");
		},
		
    	template: EventitemvTmpl,

        tagName: "li",

        className: "Content_item",

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
