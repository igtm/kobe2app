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
            "up": ".Header_up"
        },

		/* Ui events hash */
		events: {
            "tap .Header_bar": "onTapBar", // Drawing
            "tap .Header_title": "onTapTitle", // DropItems
            "tap .Header_back": "onTapBack" // backPage
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



        /* on render callback */
		onRender: function() {}
	});

});
