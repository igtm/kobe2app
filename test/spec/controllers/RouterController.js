(function() {
	'use strict';

	var root = this;

	root.define([
		'controllers/RouterController'
		],
		function( Routercontroller ) {

			describe('Routercontroller Controller', function () {

				it('should be an instance of Routercontroller Controller', function () {
					var RouterController = new Routercontroller();
					expect( RouterController ).to.be.an.instanceof( Routercontroller );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );