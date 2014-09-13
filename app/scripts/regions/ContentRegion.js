define([
	'backbone',
    'communicator',
    'views/composite/EventComV',
    'collections/Events'
    ],
function( Backbone, Communicator, EventComV, Events ) {
    'use strict';

	/* Return a Region class definition */
	return Backbone.Marionette.Region.extend({

        el: ".Content",

		initialize: function() {
			console.log("initialize a ContentRegion");
            Communicator.command.setHandler("change:Content",this.changeContent,this); // <- RouterController

            this.currentPage = undefined;
		},

        changeContent: function(page){
            if(this.currentPage == page){return;} // 同じページに変えない
            this.currentPage = page;
            switch(page){
                case "home":
                    this.show(new EventComV({collection: new Events()}));
                    break;
                default:
                    this.close();
                    break;
            }
        }
	});

});
