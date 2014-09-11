define([
	'backbone',
	'views/item/EventItemV',
	'hbs!tmpl/composite/EventComV_tmpl'
],
function( Backbone, Eventitemv, EventcomvTmpl  ) {
    'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function() {
			console.log("initialize a Eventcomv CompositeView");
            this.collection.fetch({
                success: function(collection, res, options){
                    console.log("success");
                    console.log(collection.length);
                    console.log(res);
                },
                error: function(){
                    console.log("error");
                    alert("通信エラー");
                }
            });
		},
		
    	itemView: Eventitemv,
    	
    	template: EventcomvTmpl,

        /* ui selector cache */
    	ui: {},

    	/* where are we appending the items views */
    	itemViewContainer: ".Content_items",

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {
        }
	});

});
