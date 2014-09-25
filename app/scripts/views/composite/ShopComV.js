define([
	'backbone',
	'views/item/ShopItemV',
	'hbs!tmpl/composite/ShopComV_tmpl',
    'communicator',
    'iscroll'
],
function( Backbone, Shopitemv, ShopcomvTmpl, Communicator, iScroll  ) {
    'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function() {
			console.log("initialize a Shopcomv CompositeView");
            Communicator.command.setHandler("initPage:ShopsComV",this.initPage,this); // page 1 に初期化
            Communicator.command.setHandler("getShopsWithCategory:ShopsComV",this.getShopsWithCategory,this); // ②getShopsWithCategory
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
                    console.log('ShopsComV読み込み中…');
                    e.data.self.getShopsWithCategory(category,false);
                }
            });

            /* 位置情報取得  */
            this.location = undefined; // latitude longitude heading speed
            Communicator.command.setHandler("getGeolocation:ShopsComV",this.getGeolocation,this);
        },
		
    	itemView: Shopitemv,
    	
    	template: ShopcomvTmpl,
    	

    	/* ui selector cache */
    	ui: {
            'load': '.Content_pullUp',
            'loading': '.Content_loading'
        },

        id: 'scroller',

        /* where are we appending the items views */
    	itemViewContainer: ".Content_items",

		/* Ui events hash */
		events: {},

        getShopsWithCategory: function(category, remove, near){
            var category = category,
                remove = remove,
                near = near;
            if(typeof remove === 'undefined'){
                remove = true;
            }
            if(typeof near === 'undefined'){
                near = false;
            }
            var self = this;
            Communicator.command.execute("show:loading");
            if(near){ // 近い順に
                if(typeof this.location === 'undefined'){
                    navigator.geolocation.getCurrentPosition(
                        successCallback, errorCallback, {enableHighAccuracy:true, timeout:6000, maximumAge:600000}
                    );
                }else{
                    this.collection.changeCategoryURL(category,this.page,this.location); // URLの決定
                    fetchCategory();
                }
            }else{ // 普通に
                this.collection.changeCategoryURL(category,this.page); // URLの決定
                fetchCategory();
            }


            /* コールバック関数 */
            function successCallback(position) {
                var lat = position.coords.latitude,
                    lng = position.coords.longitude;
                var gl_text = "緯度：" + lat + "経度：" + lng;
                console.log(gl_text);
                var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=true";
                $.ajax({
                    url: url,
                    success: function (json) {
                        console.log(json.results[0].address_components[4].long_name);
                        if ("神戸市" === json.results[0].address_components[4].long_name) {
                            self.location = position.coords;
                            self.collection.changeCategoryURL(category,self.page,self.location); // URLの決定
                            fetchCategory();
                        } else {
                            Communicator.command.execute("show:alert", "現在地が神戸市内ではありません");
                            Communicator.command.execute("navigate:Router","shops");
                            Communicator.command.execute("setOrder0:Header");
                        }
                }});
            }
            function errorCallback(error) {
                var err_msg = "";
                switch(error.code)
                {
                    case 1:
                        err_msg = "位置情報の利用が許可されていません";
                        break;
                    case 2:
                        err_msg = "デバイスの位置が判定できません";
                        break;
                    case 3:
                        err_msg = "タイムアウトしました";
                        break;
                }
                Communicator.command.execute("show:alert",err_msg);
                Communicator.command.execute("navigate:Router","shops");
                Communicator.command.execute("setOrder0:Header");
            }

            function fetchCategory(){
                self.collection.fetch({
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
                        Communicator.command.execute("show:alert","通信エラー");
                    },
                    complete: function(){
                        self.resizeHeight();
                        $(".Content_loading").css("display","none"); // loading非表示

                    }
                });

            }
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

        /* 近い順取得 */
        getGeolocation: function(){
        },



        /* 使わないね */
        initIScroll: function(){
            console.log("DOMContentLoaded");
            this.setHeight();
            var myScroll = new iScroll('wrapper', {desktopCompatibility:true});
        },
		/* on render callback */
		onRender: function() {}
	});

});
