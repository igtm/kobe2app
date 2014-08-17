(function() {
	'use strict';

	var root = this;

	root.define([
		'routers/Router'
		],
		function( Router ) {

			describe('Router Router', function () {

				it('should be an instance of Router Router', function () {
					var Router = new Router();
					expect( Router ).to.be.an.instanceof( Router );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );