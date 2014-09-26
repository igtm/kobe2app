define([
	'backbone',
    'communicator'
    ],
function( Backbone, Communicator  ) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({

		initialize: function() {
			console.log("initialize a Headerlayout Layout");
            this.bindUIElements();
            /* Drawing 横メニュー */
            Communicator.command.setHandler("changeTitleOnFirstPage:Header",this.changeTitleOnFirstPage,this); // <- Route

            /* Paging ページ送り */
            Communicator.command.setHandler("pageNext:Header",this.pageNext,this);
            Communicator.command.setHandler("pageBack:Header",this.pageBack,this);
            Communicator.command.setHandler("changeTitleOnNextPage:Header",this.changeTitleOnNextPage,this);
            this.firstPageTitle = undefined;

            /* DropItems カテゴリ */
            Communicator.command.setHandler("pageNext:Header",this.pageNext,this);

            /* shopsの順番 */
            Communicator.command.setHandler("showOrder:Header",this.showOrder,this); // shops
            Communicator.command.setHandler("hideOrder:Header",this.hideOrder,this); // home event
            Communicator.command.setHandler("setOrder0:Header",this.setOrder0,this); // ShopComV ContainerLayout
            Communicator.command.setHandler("setOrder1:Header",this.setOrder1,this); // Router
            Communicator.command.setHandler("setOrderTrue:Header",this.setOrderTrue,this); // Router
            this.shopsOrder = 0; // 0:適当 1:近い順
            this.reRenderOrder = false; // trueとはbackボタンで戻った時にまた表示するということ
        },

        el: ".Header",

    	/* Layout sub regions */
    	regions: {},

    	/* ui selector cache */
    	ui: {
            "title": ".Header_title",
            "bar": ".Header_bar",
            "back": ".Header_back",
            "down": ".Header_down",
            "up": ".Header_up",
            "rightBtn": ".Header_rightButton"
        },

		/* Ui events hash */
		events: {
            "tap .Header_bar": "onTapBar", // Drawing
            "tap .Header_title": "onTapTitle", // DropItems
            "tap .Header_back": "onTapBack", // backPage
            "tap .Header_rightButton": "toggleRightButton" // shopsの順番
        },

        /* Drawing */
        onTapBar: function(){
            Communicator.command.execute("DrawToggle:Container"); // -> ContainerLayout
        },
        /* DropDown */
        onTapTitle: function(){
            if(this.ui.title.hasClass("Header_nextTitle")){return;} // 詳細ページなのでドロップしない
            Communicator.command.execute("toggleDropItems:Container");
        },
        changeTitleOnFirstPage:function(category){
            this.ui.title.text(category);
            this.firstPageTitle = category; // pageTitleを保持（nextPageに飛んだ後、帰ってくるときに使う）
        },

        /* Paging */
        pageNext:function(){
            this.ui.bar.addClass("Header_is-hidden");
            this.ui.back.removeClass("Header_is-hidden");
        },
        pageBack:function(){
            this.ui.bar.removeClass("Header_is-hidden");
            this.ui.back.addClass("Header_is-hidden");
            this.rewriteTitleOnNextPage();
        },
        onTapBack: function(){
            this.pageBack();
            if(this.reRenderOrder){this.showOrder();this.reRenderOrder = false;}
            Communicator.command.execute("backPage:ContentNextRegion");
        },
        changeTitleOnNextPage:function(title){
            $(".Header_down").addClass("Header_is-hidden");
            this.ui.title.text(title);
        },
        rewriteTitleOnNextPage:function(){
            $(".Header_down").removeClass("Header_is-hidden");
            this.ui.title.text(this.firstPageTitle);
        },

        /* shopsの順番 */
        showOrder: function(){
            $(".Header_rightButton").removeClass("Header_rightButton-isHidden");
        },
        hideOrder: function(){
            $(".Header_rightButton").addClass("Header_rightButton-isHidden");
        },
        setOrder0: function(){
            this.shopsOrder = 0;
            this.ui.rightBtn.text("近い順");
        },
        setOrder1: function(){
            this.shopsOrder = 1; // 近い順なので、そのように表示。
            this.ui.rightBtn.text("人気順");
        },
        setOrderTrue: function(){
            this.reRenderOrder = true;
            this.hideOrder();
        },
        toggleRightButton: function(){
            Communicator.command.execute("show:loading");
            var self =this;
            if(navigator.geolocation){
                switch (this.shopsOrder){
                    case 0: // 近い順を表示する
                        navigator.geolocation.getCurrentPosition(
                            successCallback, errorCallback, {enableHighAccuracy:true, timeout:6000, maximumAge:600000}
                        );
                        break;
                    case 1:
                        this.ui.rightBtn.text("近い順");
                        this.shopsOrder = 0;
                        var url = 'shops';
                        var category = Communicator.reqres.request("getCategory:Container");
                        switch(category){
                            case 'restaurant':
                            case 'clothing':
                            case 'variety':
                                url += '/'+category;
                                break;
                        }
                        Communicator.command.execute("navigate:Router",url);
                        break;
                }
                Communicator.command.execute("hide:loading");
            }else{
                Communicator.command.execute("hide:loading");
                Communicator.command.execute("show:alert","位置情報が許可されていません");
                return;
            }



            /* コールバック関数 */
            function successCallback(position){
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=true";
                $.ajax({
                    url: url,
                    success: function (json) {
                        console.log(json.results[0].address_components[4].long_name);
                        if("神戸市" === json.results[0].address_components[4].long_name || true){ // デモ用
                            self.ui.rightBtn.text("人気順");
                            self.shopsOrder = 1;
                            var url = 'shops/';
                            var category = Communicator.reqres.request("getCategory:Container");
                            switch(category){
                                case 'all':
                                case 'restaurant':
                                case 'clothing':
                                case 'variety':
                                    url += category+'/near';
                                    break;
                            }
                            Communicator.command.execute("navigate:Router",url);
                        }else{
                            Communicator.command.execute("show:alert","現在地が神戸市内ではありません");
                        }
                    }
                });
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
            }
        },
        /* on render callback */
		onRender: function() {}
	});

});
