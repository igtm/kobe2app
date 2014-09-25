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
            '':'start', // startができたらstartに変える。うっとおしいいかも。eventにダイレクトにしよかな。
            'start': 'start',
            'event':'event',
            'event/:category':'eventWithCategory',

            'shops':'shops',
            'shops/:category':'shopsWithCategory',
            'shops/:category/near':'shopsInCloseOrder',
            ':page':'start' // 仮実装
        },

        navigator: function(url){
            this.navigate(url,true);
        }
	});
});