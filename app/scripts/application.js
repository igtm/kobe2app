define([
	'backbone',
	'communicator',
    'views/layout/ContainerLayout',
    'views/layout/DrawerLayout',
    'routers/Router',
    'controllers/RouterController',
    'zepto.touch'
],

function( Backbone, Communicator, ContainerLayout, DrawerLayout, Router, RouterController ) {
    'use strict';

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
        "Container": ".Container",
        "Drawer": ".Drawer"
    });

	/* Add initializers here */
	App.addInitializer( function () {
        this.Container.attachView(new ContainerLayout({el: App.Container.el}));
        this.Drawer.attachView(new DrawerLayout({el: App.Drawer.el}));

        new Router({controller: new RouterController()});
        Backbone.history.start();
	});

	return App;
});
