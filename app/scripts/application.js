define([
	'backbone',
	'communicator',
    'views/layout/ContainerLayout',
    'views/layout/DrawerLayout',
    'routers/Router',
    'controllers/RouterController',
    'views/layout/DialogLayout',
    'views/layout/PreferenceLayout',
    'views/item/StartItemV',
    'zepto.touch'
],

function( Backbone, Communicator, ContainerLayout, DrawerLayout, Router, RouterController, DialogLayout, PreferenceLayout, StartItemV ) {
    'use strict';

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
        "Container": ".Container",
        "Drawer": ".Drawer",
        "Dialog": ".Dialog",
        "Start": ".Start",
        "Preference": ".Preference"
    });

	/* Add initializers here */
	App.addInitializer( function () {
        this.Container.attachView(new ContainerLayout({el: App.Container.el}));
        this.Drawer.attachView(new DrawerLayout({el: App.Drawer.el}));
        this.Dialog.attachView(new DialogLayout());
        this.Start.attachView(new StartItemV({el: App.Start.el}));
        this.Preference.attachView(new PreferenceLayout({el: App.Preference.el}));
        Communicator.command.setHandler("show:Preference",
            function(){

            },this);

        new Router({controller: new RouterController()});
        Backbone.history.start();
	});

	return App;
});
