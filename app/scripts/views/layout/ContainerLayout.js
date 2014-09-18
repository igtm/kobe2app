define([
	'backbone',
    'communicator',
    'jquery',
    'views/layout/HeaderLayout',
    'regions/ContentRegion',
    'regions/ContentNextRegion'
    ],
function( Backbone, Communicator, $, HeaderLayout ,ContentRegion , ContentNextRegion ) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({

		initialize: function() {
			console.log("initialize a Containerlayout Layout");
            this.bindUIElements();
            // Communicator
            Communicator.command.setHandler("DrawToggle:Container",this.drawToggle,this); // <- HeaderLayout
            Communicator.reqres.setHandler("getCategory:Container",this.getCategory,this); // <- EventComV


            // status
            this.drawStatus = 0; // 0=閉じてる 1=開いてる
            this.maskStatus = 0; // 0=マスク非表示 1=表示

            /* DropItems カテゴリ */
            Communicator.command.setHandler("toggleDropItems:Container",this.toggleDropItems,this); // <- HeaderLayout
            Communicator.command.setHandler("modifyCategoryVariable:Container",this.modifyCategoryVariable,this); // <- Router
            this.dropItemIsOpen = false;
            this.currentCategory = "all"; // 前見ていた履歴を保存できればいいけどなー

		},

    	/* Layout sub regions */
    	regions: {
            "header": new HeaderLayout(),
            "content": new ContentRegion(),
            "contentNext": new ContentNextRegion()
        },

    	/* ui selector cache */
    	ui: {
            "mask": ".Container_mask",
            "DropItems": ".DropItems"
        },

		/* Ui events hash */
		events: {
            "tap .Container_mask": "drawToggle",
            'swipeLeft .Container_mask': "drawToggle",
            'swipeRight': "drawToggle",
            'tap .DropItem': "changeCategory"
        },

        getCategory: function(){
            return this.currentCategory;
        },




    /* -----------------------  ドロップダウン・カテゴリ選択 ---------------------------  */
        changeCategory: function(e){
            /*
             ①DropItems引っ込める
             ②まずは一回Routeを更新。(URLだけで来ても同じように振る舞えるように、RouterFirstで。)
             ③Routeに応じて、headerTitleの変更を行う。
             */
            this.toggleDropItems();
            var category = $(e.currentTarget).attr("data-action");
            if(category == this.currentCategory){return ;}// 同じの押した
            this.currentCategory = category; // 前見ていた履歴を保存できればいいけどなー
            if(category == "all"){
                var url = "home"
            }else{
                var url = "home/"+category;
            }
            Communicator.command.execute("navigate:Router",url); // Routingする
        },
        toggleDropItems: function(){
            if(this.dropItemIsOpen){
                this.dropItemIsOpen = false;
                $(".Header_down").removeClass("Header_is-hidden"); // 取り敢えずコッチで処理（headerに渡すのがメンドイ）
                $(".Header_up").addClass("Header_is-hidden");      // 取り敢えずコッチで処理（headerに渡すのがメンドイ）
                this.ui.DropItems.removeClass("DropItems_is-shown");
            }else{
                this.dropItemIsOpen = true;
                $(".Header_down").addClass("Header_is-hidden"); // 取り敢えずコッチで処理（headerに渡すのがメンドイ）
                $(".Header_up").removeClass("Header_is-hidden"); // 取り敢えずコッチで処理（headerに渡すのがメンドイ）
                this.ui.DropItems.addClass("DropItems_is-shown");
            }
        },
        modifyCategoryVariable: function(category){
            this.currentCategory = category;
            window.scrollTo(0,0); // 一番上にスクロール
        },
    /* -----------------------  ドロップダウン・カテゴリ選択 ---------------------------  */


    /* -----------------------  ドロワー部分 ---------------------------  */
        drawToggle: function(){

            switch(this.drawStatus){
                case 0: // 閉じてる
                    // $(".Container").css("overflow","visible"); // 【臨時】headerが見えるようにContainerの一番を表示
                    $(".Drawer").css("display",""); // 後ろにあってもfixedの奴は、スクロールの悪さをするので削除しておく
                    this.$el.addClass("Container-isDrawing");
                    this.maskToggle();
                    this.drawStatus = 1;
                    break;
                case 1: // 開いてる
                    // $(".Container").css("overflow",""); // 【臨時】headerが見えるようにContainerの一番を表示
                    this.$el.removeClass("Container-isDrawing");
                    this.maskToggle();
                    this.drawStatus = 0;

                    setTimeout(function(){
                        $(".Drawer").css("display","none"); // 後ろにあってもfixedの奴は、スクロールの悪さをするので削除しておく
                    },200); // Drawerにかかる時間ms
                    break;
            }
        },
        maskToggle: function(){
            switch(this.maskStatus){
                case 0:
                    $(".Container_mask").removeClass("Container_mask-isHidden");
                    this.maskStatus = 1;
                    break;
                case 1:
                    $(".Container_mask").addClass("Container_mask-isHidden");
                    this.maskStatus = 0;
                    break;
            }
        },
    /* -----------------------  ドロワー部分 ---------------------------  */
		/* on render callback */
		onRender: function() {}
	});

});
