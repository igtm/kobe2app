define([
	'backbone',
	'views/item/EventItemV',
	'hbs!tmpl/composite/EventComV_tmpl',
    'communicator'
],
function( Backbone, Eventitemv, EventcomvTmpl, Communicator  ) {
    'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function() {
            Communicator.command.setHandler("getEventsWithCategory:EventComV",this.getEventsWithCategory,this); // getEventsWithCategory
        },
		
    	itemView: Eventitemv,
    	
    	template: EventcomvTmpl,

        /* ui selector cache */
    	ui: {},

    	/* where are we appending the items views */
    	itemViewContainer: ".Content_items",

		/* Ui events hash */
		events: {},

        getEventsWithCategory: function(category){
            Communicator.command.execute("show:loading");
            this.collection.changeCategoryURL(category); // URLの決定
            this.collection.fetch({
                success: function(collection, res, options){
                    console.log("success");
                    console.log(collection.length);
                    console.log(res);
                    Communicator.command.execute("hide:loading");
                },
                error: function(){
                    console.log("error");
                    Communicator.command.execute("hide:loading");
                    Communicator.command.execute("show:alert","通信エラー");
                }
            });

        },

		/* on render callback */
		onRender: function() {
        }
	});

});
