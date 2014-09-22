(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/ShopItemV'
		],
		function( Shopitemv ) {

			describe('Shopitemv Itemview', function () {

				it('should be an instance of Shopitemv Itemview', function () {
					var ShopItemV = new Shopitemv();
					expect( ShopItemV ).to.be.an.instanceof( Shopitemv );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );