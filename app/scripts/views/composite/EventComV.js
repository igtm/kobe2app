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
                if(e.data.self.reloadFlag && $(window).scrollTop()+ e.data.self.windowHeight >= loadTop ){
                    e.data.self.reloadFlag = false; // 再びreload出来ないようにする
                    var category = Communicator.reqres.request("getCategory:Container");
                    $(".Content_loading").css("display",""); // loading表示
                    console.log('EventComV読み込み中…');
                    e.data.self.getEventsWithCategory(category,false);
                }
            });

            // iScroll
            // document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        },

    	itemView: Eventitemv,
    	
    	template: EventcomvTmpl,

        /* ui selector cache */
    	ui: {
            'load': '.Content_pullUp',
            'loading': '.Content_loading'
        },

        id: 'scroller',

    	/* where are we appending the items views */
    	itemViewContainer: ".Content_items",

		/* Ui events hash */
		events: {
        },
        collectionEvents: {
        },

        getEventsWithCategory: function(category, remove){
            if(typeof remove === 'undefined'){
                remove = true;
            }
            var self = this;
            Communicator.command.execute("show:loading");
            this.collection.changeCategoryURL(category,this.page); // URLの決定
            this.collection.fetch({
                remove: remove,
                success: function(collection, res, options){
                    Communicator.command.execute("hide:loading");
                    self.incPage();

                    if(res.length === 10 ){
                        console.log("collection.length:"+collection.length);
                        console.log("まだあるから、trueにする");
                        self.reloadFlag = true; // reloadしても良い状態に戻す（pull to reloadが終了）
                    }else{
                        console.log("collection.length:"+collection.length);
                        console.log("もう無いから、falseにする");
                        self.reloadFlag = false; // reloadしても良い状態に戻す（pull to reloadが終了）
                    }
                },
                error: function(){
                    console.log("error");
                    Communicator.command.execute("hide:loading");
                    self.reloadFlag = false;
                    Communicator.command.execute("show:alert","通信エラー");
                },
                complete: function(){
                    self.resizeHeight();
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
            self.reloadFlag = true; // reloadしても良い状態に戻す（pull to reloadが終了）
            console.log("initPageTo"+this.page+"&reloadFlag:true");
        },
        setHeight: function() {
            var headerH = document.getElementById('header').offsetHeight,
                wrapperH = window.innerHeight - headerH;
            document.getElementById('wrapper').style.height = wrapperH + 'px';
        },
        initIScroll: function(){
            console.log("DOMContentLoaded");
            this.setHeight();
            var myScroll = new iScroll('wrapper', {desktopCompatibility:true});
        },

        resizeHeight: function(){
            console.log("resizeHeight");
            var contentItem,margin,itemH,items,
                headerH = document.getElementById('header').offsetHeight,
                contentH = window.innerHeight - headerH,
                deviceHeightBorder = 500;
            (deviceHeightBorder > contentH) ? items = 2 : items = 3; // ボーダーより小さい時は画面に２つ表示できるサイズに。
            itemH = (contentH - 8 * (items + 1)) / items + 'px'; // margin:8px;
            $(".Content_item").css("height", itemH);
            $(".Content_item_image img").css("height", itemH);
        },

        /* on render callback */
        onRender: function () {
        }

	});

});
