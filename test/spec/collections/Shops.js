(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/Shops'
		],
		function( Shops ) {

			describe('Shops Collection', function () {

				it('should be an instance of Shops Collection', function () {
					var Shops = new Shops();
					expect( Shops ).to.be.an.instanceof( Shops );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );