(function() {
	'use strict';

	var root = this;

	root.define([
		'models/ShopDetail'
		],
		function( Shopdetail ) {

			describe('Shopdetail Model', function () {

				it('should be an instance of Shopdetail Model', function () {
					var ShopDetail = new Shopdetail();
					expect( ShopDetail ).to.be.an.instanceof( Shopdetail );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );