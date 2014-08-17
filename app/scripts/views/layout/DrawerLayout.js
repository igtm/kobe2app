define([
	'backbone'
    ],
function( Backbone, DrawerlayoutTmpl  ) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({

		initialize: function() {
			console.log("initialize a Drawerlayout Layout");
		},

    	/* Layout sub regions */
    	regions: {},

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {
            "touchstart .Drawer_item[data-action]": "action"
        },

        action: function(){
        },

		/* on render callback */
		onRender: function() {}
	});

});
