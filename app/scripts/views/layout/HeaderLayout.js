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
            Communicator.command.setHandler("changeTitle:Header",this.changeTitle,this); // <- Route

            /* Paging ページ送り */
            Communicator.command.setHandler("pageNext:Header",this.pageNext,this);
            Communicator.command.setHandler("pageBack:Header",this.pageBack,this);

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
            "tap .Header_title": "onTapTitle" // DropItems
        },

        /* Drawing */
        onTapBar: function(){
            Communicator.command.execute("DrawToggle:Container"); // -> ContainerLayout
        },
        /* DropDown */
        onTapTitle: function(){
            Communicator.command.execute("toggleDropItems:Container");
        },
        changeTitle:function(category){
            this.ui.title.text(category);
        },

        /* Paging */
        pageNext:function(){
            this.ui.bar.addClass("Header_is-hidden");
            this.ui.back.removeClass("Header_is-hidden");
        },
        pageBack:function(){
            this.ui.bar.removeClass("Header_is-hidden");
            this.ui.back.addClass("Header_is-hidden");
        },


		/* on render callback */
		onRender: function() {}
	});

});
