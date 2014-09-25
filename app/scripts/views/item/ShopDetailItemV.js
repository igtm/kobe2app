define([
	'backbone',
	'hbs!tmpl/item/ShopDetailItemV_tmpl',
    'communicator'
],
function( Backbone, ShopdetailitemvTmpl, Communicator  ) {
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
