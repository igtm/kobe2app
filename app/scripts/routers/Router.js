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
            ':page':'page'

        },

        navigator: function(to){
            this.navigate(to,true);
        }
	});
});