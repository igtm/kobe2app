define([
	'backbone',
	'hbs!tmpl/item/EventDetailItemV_tmpl',
    'communicator'
],
function( Backbone, EventdetailitemvTmpl, Communicator  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Eventdetailitemv ItemView");

            var self = this;
            this.model.fetch({
                data:{id:self.model.eventid},
                success: function(model, res, options){
                    console.log("success");
                    console.log(res);
                    Communicator.command.execute("hide:loading");
                },
                error: function(){
                    Communicator.command.execute("hide:loading");
                    Communicator.command.execute("show:alert","通信エラー");
                },
                complete: function(){

                }
            });
		},
		
    	template: EventdetailitemvTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
