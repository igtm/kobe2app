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
        start: function(){
            Communicator.command.execute("show:Start");
        },
        event: function(){
            this.Private_initializer("全てのイベント","event");
            this.Private_getEvents("all");
        },
        eventWithCategory: function(category){
            var title;
            if(category=="all"){title="全てのイベント"}
            if(category=="umie"){title="Umie"}
            if(category=="sanda"){title="三田プレミアム"}
            if(category=="mitsui"){title="三井アウトレット"}
            this.Private_initializer(title,"event");
            this.Private_getEvents(category);
        },

        shops: function(){
            this.Private_initializer("全てのショップ","shops");
            this.Private_getShops("all");
        },
        shopsWithCategory: function(category){
            console.log("ROUTER:shopsWithCategory");
            var title;
            if(category=="all"){title="全てのショップ"}
            if(category=="restaurant"){title="Restaurant"}
            if(category=="clothing"){title="Clothing Store"}
            if(category=="variety"){title="雑貨屋"}
            this.Private_initializer(title,"shops");
            this.Private_getShops(category);
        },
        shopsInCloseOrder: function(category){
            console.log("ROUTER:shopsInCloseOrder");
            var title;
            if(category=="all"){title="全てのショップ"}
            if(category=="restaurant"){title="Restaurant"}
            if(category=="clothing"){title="Clothing Store"}
            if(category=="variety"){title="雑貨屋"}
            this.Private_initializer(title,"shops");
            this.Private_getShops(category,true);
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
            Communicator.command.execute("hideOrder:Header"); // home event
            Communicator.command.execute("modifyCategoryVariable:Container",category); // ①DropItemsのStatusを現Categoryに更新
            Communicator.command.execute("initPage:EventComV"); // page 1 に初期化
            Communicator.command.execute("getEventsWithCategory:EventComV",category); // ②getEventsWithCategory

        },
        Private_getShops: function(category,near){ // ①DropItemsのStatusを現Categoryに更新 ②getEventsWithCategory
            Communicator.command.execute("showOrder:Header"); // shops
            Communicator.command.execute("modifyCategoryVariable:Container",category); // ①DropItemsのStatusを現Categoryに更新
            Communicator.command.execute("initPage:ShopsComV"); // page 1 に初期化
            if(near){ Communicator.command.execute("setOrder1:Header"); }
            Communicator.command.execute("getShopsWithCategory:ShopsComV",category,true,near); // ②getShopsWithCategory

        }
	});

});
