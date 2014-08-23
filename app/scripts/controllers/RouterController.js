define([
	'backbone',
    'communicator'
],
function( Backbone, Communicator ) {
    'use strict';

	return Backbone.Marionette.Controller.extend({

		initialize: function( options ) {
			console.log("initialize a Routercontroller Controller");
		},
        home: function(){
            Communicator.command.execute("change:Header", "home");
            Communicator.command.execute("checkItem:Drawer", "home"); // data-actionがhomeのやつcheckedする
        },
        page: function(page) {
            Communicator.command.execute("change:Header", page);
            Communicator.command.execute("checkItem:Drawer", page); // data-actionが???のやつcheckedする
        }
	});

});
