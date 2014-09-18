define([
	'backbone',
    'models/EventDetail',
    'views/item/EventDetailItemV',
    'communicator',
    'models/ShopDetail',
    'views/item/ShopDetailItemV'
],
function( Backbone, EventDetail, EventDetailItemV, Communicator, ShopDetail, ShopDetailItemV ) {
    'use strict';
    /*
        次ページの機能
    ①まずは、この空リージョンのみを右横見えない部分に作成。
    ②アクションがあったら、IDを受け取り、Model-Itemview作成。表示
    ③画面にスライドしてくるアニメーションで表示する。その際headerも変える。
     */

	/* Return a Region class definition */
	return Backbone.Marionette.Region.extend({

        el: '.ContentNext',

		initialize: function() {
			console.log("initialize a Contentnextregion Region");
            Communicator.command.setHandler("nextPage:ContentNextRegion",this.nextPage,this);
            Communicator.command.setHandler("backPage:ContentNextRegion",this.backPage,this);
		},

        nextPage: function(page, id){ // Event:id model itemview作成
            var self = this;
            Communicator.command.execute("show:loading");

            switch(page){
                case "home": // home の詳細画面
                    var model = new EventDetail();
                    model.set({eventid:id});

                    this.show(new EventDetailItemV({model: model}));
                    Communicator.command.execute("pageNext:Header");
                    $('.ContentNext').addClass('ContentNext-isPaging');
                    $('.Content').addClass('Content_is-paging');
                    $('.Container').css("overflow-y","hidden");
                    break;
                case "shops": // shops の詳細画面
                    var model = new ShopDetail();
                    model.set({eventid:id});

                    this.show(new ShopDetailItemV({model: model}));
                    Communicator.command.execute("pageNext:Header");
                    $('.ContentNext').addClass('ContentNext-isPaging');
                    $('.Content').addClass('Content_is-paging');
                    $('.Container').css("overflow-y","hidden");
                    break;
            }
        },
        backPage: function(page){
            $('.ContentNext').removeClass('ContentNext-isPaging');
            $('.Content').removeClass('Content_is-paging');
            $('.Container').css("overflow-y","");
            this.close();
        }
	});

});
