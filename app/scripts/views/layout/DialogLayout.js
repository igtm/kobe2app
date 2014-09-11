define([
	'backbone',
	'hbs!tmpl/layout/DialogLayout_tmpl',
    'communicator'
],
function( Backbone, DialoglayoutTmpl, Communicator  ) {
    'use strict';
    /*
    * confirmに関して
    * 表示指示（行き）と選択後の処理（帰り）を２分して実装。（本当はreqres等でユーザーの選択を待って返したいが、無限ループ等しかないと思う。）
    * 行きに帰り先住所を一緒に送る。this.returnAddressに保存。アクションがあったら、それを参照して値を返却。
    *
    * */
	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({

		initialize: function() {
			console.log("initialize a Dialoglayout Layout");
            this.bindUIElements(); // 必要です！

            this.returnAddress = undefined;
            Communicator.command.setHandler("show:loading",this.showLoading,this); // 読み込み中を表示
            Communicator.command.setHandler("hide:loading",this.hideLoading,this); // 読み込み中を消す
            Communicator.command.setHandler("show:confirm",this.showConfirm,this); // 確認を表示 第１引数：text 第２引数：returnAddress
            Communicator.command.setHandler("show:alert",this.showAlert,this); // アラートを表示 第１引数：text
		},
		
    	template: DialoglayoutTmpl,

        el: ".Dialog",
    	

    	/* Layout sub regions */
    	regions: {},

    	/* ui selector cache */
    	ui: {
            "loading": ".Dialog_loading",
            "confirm": ".Dialog_confirm",
            "alert": ".Dialog_alert",
            "mask": ".Dialog_mask",
            "alertText": ".Dialog_alert_content",
            "confirmText": ".Dialog_confirm_content"
        },

		/* Ui events hash */
		events: {
            "tap .Dialog_alert_ok": "alertOk",
            "tap .Dialog_confirm_ok": "confOk",
            "tap .Dialog_confirm_cancel": "confCancel"
        },

        showLoading: function(){
            this.ui.mask.removeClass("is-hidden");
            this.ui.loading.removeClass("is-hidden");
        },
        hideLoading: function(){
            this.ui.mask.addClass("is-hidden");
            this.ui.loading.addClass("is-hidden");
        },
        showConfirm: function(text, returnAddress){
            this.ui.confirmText.text(text);
            this.returnAddress = returnAddress;
            this.ui.mask.removeClass("is-hidden");
            this.ui.confirm.removeClass("is-hidden");
        },
        showAlert: function(text){
            this.ui.alertText.text(text);
            this.ui.mask.removeClass("is-hidden");
            this.ui.alert.removeClass("is-hidden");
        },

        alertOk: function(){
            this.ui.alert.addClass("is-hidden");
            this.ui.mask.addClass("is-hidden");
        },
        confOk: function(){
            this.ui.confirm.addClass("is-hidden");
            this.ui.mask.addClass("is-hidden");
            Communicator.command.execute(this.returnAddress, true);
        },
        confCancel: function(){
            this.ui.confirm.addClass("is-hidden");
            this.ui.mask.addClass("is-hidden");
            Communicator.command.execute(this.returnAddress, false);
        },

		/* on render callback */
		onRender: function() {}
	});

});
