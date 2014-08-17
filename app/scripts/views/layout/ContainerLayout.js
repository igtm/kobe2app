define([
	'backbone',
    'communicator',
    'jquery',
    'views/layout/HeaderLayout',
    'regions/ContentRegion'
    ],
function( Backbone, Communicator, $, HeaderLayout ,ContentRegion  ) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({

		initialize: function() {
			console.log("initialize a Containerlayout Layout");
            // Communicator
            Communicator.command.setHandler("DrawToggle:Container",this.drawToggle,this); // <- HeaderLayout

            // status
            this.drawStatus = 0; // 0=閉じてる 1=開いてる
            this.maskStatus = 0; // 0=マスク非表示 1=表示
		},

    	/* Layout sub regions */
    	regions: {
            "header": new HeaderLayout(),
            "content": new ContentRegion()
        },

    	/* ui selector cache */
    	ui: {
            "mask": ".Container_mask"
        },

		/* Ui events hash */
		events: {
            "touchstart .Container_mask": "drawToggle"
        },
    /* -----------------------  ドロワー部分 ---------------------------  */
        drawToggle: function(){
            switch(this.drawStatus){
                case 0: // 閉じてる
                    this.$el.addClass("Container-isDrawing");
                    this.maskToggle();
                    this.drawStatus = 1;
                    break;
                case 1: // 開いてる
                    this.$el.removeClass("Container-isDrawing");
                    this.maskToggle();
                    this.drawStatus = 0;
                    break;
            }
        },
        maskToggle: function(){
            switch(this.maskStatus){
                case 0:
                    $(".Container_mask").removeClass("Container_mask-isHidden");
                    this.maskStatus = 1;
                    break;
                case 1:
                    $(".Container_mask").addClass("Container_mask-isHidden");
                    this.maskStatus = 0;
                    break;
            }
        },
    /* -----------------------  ドロワー部分 ---------------------------  */

		/* on render callback */
		onRender: function() {}
	});

});
