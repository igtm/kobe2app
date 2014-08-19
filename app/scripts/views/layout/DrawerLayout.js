define([
	'backbone',
    'communicator'
    ],
function( Backbone, Communicator  ) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({

		initialize: function() {
			console.log("initialize a Drawerlayout Layout");
            this.currentItem = undefined;
		},

    	/* Layout sub regions */
    	regions: {},

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {
            "tap .Drawer_item[data-action]": "action"
        },

        action: function(e){
            if($(e.currentTarget).hasClass("Drawer_item-checked")){return ;}// 同じの押した
            if(this.currentItem){
                this.currentItem.removeClass("Drawer_item-checked"); // 既チェックを消す
            }
            this.currentItem = $(e.currentTarget);// 入れ替え
            this.currentItem.addClass("Drawer_item-checked"); // チェックする
            Communicator.command.execute("DrawToggle:Container"); // ->Container Region
        },

		/* on render callback */
		onRender: function() {}
	});

});
