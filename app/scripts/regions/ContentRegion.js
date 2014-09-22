define([
	'backbone',
    'communicator',
    'views/composite/EventComV',
    'collections/Events',
    'views/composite/ShopComV',
    'collections/Shops'
    ],
function( Backbone, Communicator, EventComV, Events, ShopComV, Shops ) {
    'use strict';

	/* Return a Region class definition */
	return Backbone.Marionette.Region.extend({

        el: ".Content",

		initialize: function() {
			console.log("initialize a ContentRegion");
            Communicator.command.setHandler("change:Content",this.changeContent,this); // <- RouterController

            this.currentPage = undefined;
		},

        changeContent: function(page){
            if(this.currentPage == page){return;} // 同じページに変えない
            this.currentPage = page;
            switch(page){
                case "home":
                    this.show(new EventComV({collection: new Events()}));
                    this.changeDropItemsToHome();
                    break;
                case "shops":
                    this.show(new ShopComV({collection: new Shops()}));
                    this.changeDropItemsToShops();
                    break;
                default:
                    Communicator.command.execute("initPage:EventComV"); // page 1 に初期化
                    this.close();
                    break;
            }
        },
        changeDropItemsToHome: function(){
            $("#DropItem_1").text("全てのイベント");
            $("#DropItem_2").attr("data-action","umie").text("- Umie");
            $("#DropItem_3").attr("data-action","sanda").text("- 三田プレミアム・アウトレット");
            $("#DropItem_4").attr("data-action","mitsui").text("- 三井アウトレット");
        },
        changeDropItemsToShops: function(){
            $("#DropItem_1").text("全てのショップ");
            $("#DropItem_2").attr("data-action","restaurant").text("- Restaurant");
            $("#DropItem_3").attr("data-action","clothing").text("- Clothing Store");
            $("#DropItem_4").attr("data-action","variety").text("- 雑貨屋");
        },
	});

});
