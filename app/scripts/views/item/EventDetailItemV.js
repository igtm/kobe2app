define([
	'backbone',
	'hbs!tmpl/item/EventDetailItemV_tmpl',
    'communicator'
],
function( Backbone, EventdetailitemvTmpl, Communicator  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Eventdetailitemv ItemView");
		},
		
    	template: EventdetailitemvTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {
        },

        modelEvents: {
        },

		/* on render callback */
		onRender: function() {}
	});

});
