define([
	'backbone',
    'communicator'
    ],
function( Backbone, Communicator  ) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({

		initialize: function() {
			console.log("initialize a Headerlayout Layout");
            Communicator.command.setHandler("change:Header",this.changeHeader,this); // <- Route
            this.bindUIElements();
        },

        el: ".Header",

    	/* Layout sub regions */
    	regions: {},

    	/* ui selector cache */
    	ui: {
            "title": ".Header_title",
            "bar": ".Header_bar"
        },

		/* Ui events hash */
		events: {
            "tap .Header_bar": "onTouchstartHeader_bar"
        },
        /* Drawing */
        onTouchstartHeader_bar: function(){
            Communicator.command.execute("DrawToggle:Container"); // -> ContainerLayout
        },

        changeHeader:function(page){
            this.ui.title.text(page);
        },

		/* on render callback */
		onRender: function() {}
	});

});
