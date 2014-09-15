define([
	'backbone',
	'views/item/EventItemV',
	'hbs!tmpl/composite/EventComV_tmpl',
    'communicator',
    'iscroll'
],
function( Backbone, Eventitemv, EventcomvTmpl, Communicator, iScroll  ) {
    'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function() {
            Communicator.command.setHandler("getEventsWithCategory:EventComV",this.getEventsWithCategory,this); // getEventsWithCategory
            Communicator.command.setHandler("initPage:EventComV",this.initPage,this);
            this.bindUIElements();

            this.page = 1;

            /* Pull to reload  */
            this.reloadFlag = true;
            this.windowHeight = $(window).innerHeight(); // ディスプレイの高さ
            $(window).scroll({self: this},function (e) { // object -> e.dataで受け取れる
                var loadTop = $(".Content_pullUp").offset().top; // loadTopの位置更新

                console.log(e.data.self.reloadFlag);


                if(e.data.self.reloadFlag && $(window).scrollTop()+ e.data.self.windowHeight >= loadTop ){
                    var category = Communicator.reqres.request("getCategory:Container");
                    $(".Content_loading").css("display",""); // loading表示
                    e.data.self.reloadFlag = false; // 再びreload出来ないようにする
                    console.log('読み込み中…');
                    e.data.self.getEventsWithCategory(category,false);
                }
            });
        },

    	itemView: Eventitemv,
    	
    	template: EventcomvTmpl,

        /* ui selector cache */
    	ui: {
            'load': '.Content_pullUp',
            'loading': '.Content_loading'
        },

    	/* where are we appending the items views */
    	itemViewContainer: ".Content_items",

		/* Ui events hash */
		events: {
        },

        getEventsWithCategory: function(category, remove){
            if(typeof remove === 'undefined'){
                remove = true;
            }
            var self = this;

            console.log(category,remove);

            Communicator.command.execute("show:loading");
            this.collection.changeCategoryURL(category); // URLの決定
            this.collection.fetch({
                data:{page:self.page},
                remove: remove,
                success: function(collection, res, options){
                    console.log("success");
                    console.log("collection.length:"+collection.length);
                    console.log(res);
                    Communicator.command.execute("hide:loading");
                },
                error: function(){
                    console.log("error");
                    Communicator.command.execute("hide:loading");
                    Communicator.command.execute("show:alert","通信エラー");
                },
                complete: function(){
                    self.incPage();
                    self.reloadFlag = true; // reloadしても良い状態に戻す（pull to reloadが終了）
                    $(".Content_loading").css("display","none"); // loading非表示

                }
            });
        },
        incPage: function(){
            this.page++;
            console.log("incPageTo"+this.page);
        },
        initPage: function(){
            this.page = 1;
            console.log("initPageTo"+this.page);
        },

        /* on render callback */
        onRender: function () {
        }

	});

});
