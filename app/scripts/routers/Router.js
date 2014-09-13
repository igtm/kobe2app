define([
	'backbone',
    'communicator'
],
function(Backbone, Communicator){
    'use strict';

	return Backbone.Marionette.AppRouter.extend({
        initialize: function(){
            Communicator.command.setHandler("navigate:Router",this.navigator,this);
        },

		/* Backbone routes hash */
		appRoutes: {
            '':'home',
            'home':'home',
            'home/:category':'homeWithCategory',
            ':page':'page' // 仮実装
        },

        navigator: function(url){
            this.navigate(url,true);
        }
	});
});