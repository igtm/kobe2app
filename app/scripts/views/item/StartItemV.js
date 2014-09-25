define([
	'backbone',
	'hbs!tmpl/item/StartItemV_tmpl',
    'communicator',
    'jquery.flexslider'
],
function( Backbone, StartitemvTmpl, Communicator  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Startitemv ItemView");

            Communicator.command.setHandler("show:Start",this.show,this); //Router
            Communicator.command.setHandler("hide:Start",this.hide,this); // Drawer
                $('.flexslider').flexslider({
                    "animation": 'slide',
                    "animationLoop": false,
                    "slideshow": false
                });
        },
		
    	template: StartitemvTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {
            "tap #lastImage": "drawing"
        },

        drawing: function(){
            Communicator.command.execute("DrawToggle:Container");
        },
        show: function(){
            this.$el.removeClass("Start-isHidden");
        },
        hide: function(){
            this.$el.addClass("Start-isHidden");
        },
		/* on render callback */
		onRender: function() {}
	});

});
