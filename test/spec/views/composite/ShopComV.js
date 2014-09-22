(function() {
	'use strict';

	var root = this;

	root.define([
		'views/composite/ShopComV'
		],
		function( Shopcomv ) {

			describe('Shopcomv Compositeview', function () {

				it('should be an instance of Shopcomv Compositeview', function () {
					var ShopComV = new Shopcomv();
					expect( ShopComV ).to.be.an.instanceof( Shopcomv );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );