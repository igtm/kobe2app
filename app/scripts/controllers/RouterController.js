define([
	'backbone',
    'communicator'
],
function( Backbone, Communicator ) {
    'use strict';

	return Backbone.Marionette.Controller.extend({

		initialize: function( options ) {
			console.log("initialize a Routercontroller Controller");
		},
        home: function(){
            this.Private_setHeaderDrawer("all","home");
        },
        homeWithCategory: function(category){
            Communicator.command.execute("changeTitle:Header", category); // Header_titleを書き換え
            Communicator.command.execute("getEventsWithCategory:EventComV",category); // getEventsWithCategory
        },
        page: function(page) {
            this.Private_setHeaderDrawer(page,page);
        },


        /*   Drawerをtap時にする共通部分   */
        Private_setHeaderDrawer: function(title, action){
            Communicator.command.execute("changeTitle:Header", title); // Header_titleを書き換え
            Communicator.command.execute("checkItem:Drawer", action); // data-actionが???のやつcheckedする
            Communicator.command.execute("change:Content", action); // Content内を指定のものに変更表示
        }
	});

});
