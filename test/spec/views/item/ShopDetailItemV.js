(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/ShopDetailItemV'
		],
		function( Shopdetailitemv ) {

			describe('Shopdetailitemv Itemview', function () {

				it('should be an instance of Shopdetailitemv Itemview', function () {
					var ShopDetailItemV = new Shopdetailitemv();
					expect( ShopDetailItemV ).to.be.an.instanceof( Shopdetailitemv );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );