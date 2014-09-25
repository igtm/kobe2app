define([
	'backbone',
    'communicator'
    ],
function( Backbone, Communicator  ) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({

		initialize: function() {
			console.log("initialize a Drawerlayout Layout");
            Communicator.command.setHandler("checkItem:Drawer",this.checkItem,this);
            this.currentItem = undefined;
		},

    	/* Layout sub regions */
    	regions: {},

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {
            "tap .Drawer_item[data-action]": "action",
            "tap .Drawer_icon[data-action]": "onTapIcon",  // 【start】
            "tap .Drawer_prefIcon": "showPreference"
        },

        action: function(e){
            /*
                ０:Startを閉じる
                ①Drawer処理
                ②まずは一回Routeを更新。(URLだけで来ても同じように振る舞えるように、RouterFirstで。)
                ③Routeに応じて、checkedの変更とheaderTitleの変更を行う。
             */

            if($(e.currentTarget).hasClass("Drawer_item-checked")){return ;}// 同じの押した
            Communicator.command.execute("hide:Start"); // 【start】Startを閉じる
            $(".Container").css("overflow",""); // 【start】下スクロール禁止を解除
            Communicator.command.execute("DrawToggle:Container"); //Drawerを引っ込める ->Container Region

            var action = $(e.currentTarget).attr("data-action");
            Communicator.command.execute("navigate:Router",action); // Routingする
        },
        onTapIcon: function(e){ // 【start】
            if(this.currentItem){
                this.currentItem.removeClass("Drawer_item-checked"); // 既チェックを消す
            }
            this.currentItem = undefined;
            Communicator.command.execute("DrawToggle:Container"); //Drawerを引っ込める ->Container Region
            var action = $(e.currentTarget).attr("data-action");
            Communicator.command.execute("navigate:Router",action); // Routingする
            setTimeout(function(){
                $(".Container").css("overflow","hidden"); // 【start】下スクロール禁止
            },200);
        },

        checkItem:function(page){ //routeから飛んでくる
            if(this.currentItem){
                this.currentItem.removeClass("Drawer_item-checked"); // 既チェックを消す
            }
            this.currentItem = $(".Drawer_item[data-action = "+page+"]"); // 入れ替え
            this.currentItem.addClass("Drawer_item-checked"); // チェックする
        },

        showPreference: function(){

        },

		/* on render callback */
		onRender: function() {}
	});

});
