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
            this.Private_initializer("all","home");
            this.Private_getEvents("all");
        },
        homeWithCategory: function(category){
            this.Private_initializer(category,"home");
            this.Private_getEvents(category);
        },
        page: function(page) {
            this.Private_initializer(page,page);
        },


        /*   Drawerをtap時にする共通部分   */
        Private_initializer: function(title, action){ // ①タイトル書き換え ②Drawerの選択 ③Contentの表示
            Communicator.command.execute("changeTitle:Header", title); // ①タイトル書き換え
            Communicator.command.execute("checkItem:Drawer", action); // ②Drawerの選択 　同じ場合も動作してしまう
            Communicator.command.execute("change:Content", action); // ③Contentの表示 (現pageと違う場合のみ動作)
        },
        Private_getEvents: function(category){ // ①DropItemsのStatusを現Categoryに更新 ②getEventsWithCategory
            Communicator.command.execute("modifyCategoryVariable:Container",category); // ①DropItemsのStatusを現Categoryに更新
            Communicator.command.execute("initPage:EventComV"); // page 1 に初期化
            Communicator.command.execute("getEventsWithCategory:EventComV",category); // ②getEventsWithCategory

        }
	});

});
