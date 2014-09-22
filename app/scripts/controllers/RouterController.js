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
            this.Private_initializer("全てのイベント","home");
            this.Private_getEvents("all");
        },
        homeWithCategory: function(category){
            var title;
            if(category=="all"){title="全てのイベント"}
            if(category=="umie"){title="Umie"}
            if(category=="sanda"){title="三田プレミアム"}
            if(category=="mitsui"){title="三井アウトレット"}
            this.Private_initializer(title,"home");
            this.Private_getEvents(category);
        },

        shops: function(){
            this.Private_initializer("Shops","shops");
            this.Private_getShops("all");
        },


        page: function(page) {
            this.Private_initializer(page,page);
        },


        /*   Drawerをtap時にする共通部分   */
        Private_initializer: function(title, action){ // ①タイトル書き換え ②Drawerの選択 ③Contentの表示
            Communicator.command.execute("changeTitleOnFirstPage:Header", title); // ①タイトル書き換え
            Communicator.command.execute("checkItem:Drawer", action); // ②Drawerの選択 　同じ場合も動作してしまう
            Communicator.command.execute("change:Content", action); // ③Contentの表示 (現pageと違う場合のみ動作)
        },
        Private_getEvents: function(category){ // ①DropItemsのStatusを現Categoryに更新 ②getEventsWithCategory
            Communicator.command.execute("modifyCategoryVariable:Container",category); // ①DropItemsのStatusを現Categoryに更新
            Communicator.command.execute("initPage:EventComV"); // page 1 に初期化
            Communicator.command.execute("getEventsWithCategory:EventComV",category); // ②getEventsWithCategory

        },
        Private_getShops: function(category){ // ①DropItemsのStatusを現Categoryに更新 ②getEventsWithCategory
            Communicator.command.execute("modifyCategoryVariable:Container",category); // ①DropItemsのStatusを現Categoryに更新
            Communicator.command.execute("initPage:ShopsComV"); // page 1 に初期化
            Communicator.command.execute("getShopsWithCategory:ShopsComV",category); // ②getShopsWithCategory

        }
	});

});
