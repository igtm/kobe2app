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

            /* ===============  Collection　保持  ================= */
            this.EventsColl = new Events();
		},

        changeContent: function(page){
            switch(page){
                case "home":
                    this.show(new EventComV({collection: this.EventsColl}));
                    break;
                default:
                    this.empty();
                    break;
            }
        }
	});

});
