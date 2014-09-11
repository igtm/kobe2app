define([
	'backbone',
	'hbs!tmpl/layout/DialogLayout_tmpl'
],
function( Backbone, DialoglayoutTmpl  ) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({

		initialize: function() {
			console.log("initialize a Dialoglayout Layout");
		},
		
    	template: DialoglayoutTmpl,

        el: ".Dialog",
    	

    	/* Layout sub regions */
    	regions: {},

    	/* ui selector cache */
    	ui: {
            "loading": ".Dialog_loading",
            "confirm": ".Dialog_confirm",
            "alert": ".Dialog_alert",
            "mask": ".Dialog_mask"
        },

		/* Ui events hash */
		events: {
            "tap .Dialog_alert_ok": "alertOk",
            "tap .Dialog_confirm_ok": "confOk",
            "tap .Dialog_confirm_cancel": "confCancel"
        },

        alertOk: function(){
            this.ui.alert.addClass("is-hidden");
            this.ui.mask.addClass("is-hidden");
        },
        confOk: function(){
            this.ui.confirm.addClass("is-hidden");
            this.ui.mask.addClass("is-hidden");
        },
        confCancel: function(){
            this.ui.confirm.addClass("is-hidden");
            this.ui.mask.addClass("is-hidden");
        },

		/* on render callback */
		onRender: function() {}
	});

});
