define([
	'backbone',
	'hbs!tmpl/item/EventDetailItemV_tmpl',
    'communicator',
    'models/EventDetail'
],
function( Backbone, EventdetailitemvTmpl, Communicator, EventDetail  ) {
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
            'sync':'changeTitle'
        },

        changeTitle: function(){
            this.render();
            Communicator.command.execute("changeTitleOnNextPage:Header",this.model.get("title"));
            $(".Header_title").addClass("Header_nextTitle"); // font-size小さく
        },
		/* on render callback */
		onRender: function() {}
	});

});
