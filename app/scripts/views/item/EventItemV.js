define([
	'backbone',
	'hbs!tmpl/item/EventItemV_tmpl',
    'communicator'
],
function( Backbone, EventitemvTmpl, Communicator  ) {
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
		events: {
            'tap .Content_item_image':'nextPage'
        },
        modelEvents: {
            "sync": 'render'
        },

        nextPage: function(){
            console.log("this.model.eventid:"+this.model.get('eventid'));
            Communicator.command.execute("nextPage:ContentNextRegion","home",this.model.get('eventid'));
        },

		/* on render callback */
		onRender: function() {}
	});

});
