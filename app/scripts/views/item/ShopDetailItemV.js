define([
	'backbone',
	'hbs!tmpl/item/ShopDetailItemV_tmpl'
],
function( Backbone, ShopdetailitemvTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Shopdetailitemv ItemView");
		},
		
    	template: ShopdetailitemvTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
