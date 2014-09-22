define([
	'backbone',
	'hbs!tmpl/item/ShopItemV_tmpl',
    'communicator'
],
function( Backbone, ShopitemvTmpl, Communicator  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Shopitemv ItemView");
		},
		
    	template: ShopitemvTmpl,

        tagName: "li",

        className: "Content_item",

        /* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {
            'tap .Content_item_image':'nextPage'
        },

        nextPage: function(){
            console.log("this.model.eventid:"+this.model.get('uid'));
            Communicator.command.execute("nextPage:ContentNextRegion","shops",this.model.get('uid'));
        },

        /* on render callback */
		onRender: function() {}
	});

});
