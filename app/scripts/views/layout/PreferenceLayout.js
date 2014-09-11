define([
	'backbone',
	'hbs!tmpl/layout/PreferenceLayout_tmpl'
],
function( Backbone, PreferencelayoutTmpl  ) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({

		initialize: function() {
			console.log("initialize a Preferencelayout Layout");
		},
		
    	template: PreferencelayoutTmpl,
    	

    	/* Layout sub regions */
    	regions: {},

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
