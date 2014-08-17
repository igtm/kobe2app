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
            "touchstart .Header_bar": "onTouchstartHeader_bar"
        },

        onTouchstartHeader_bar: function(){
            Communicator.command.execute("DrawToggle:Container"); // -> ContainerLayout
        },

		/* on render callback */
		onRender: function() {}
	});

});
