(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/StartItemV'
		],
		function( Startitemv ) {

			describe('Startitemv Itemview', function () {

				it('should be an instance of Startitemv Itemview', function () {
					var StartItemV = new Startitemv();
					expect( StartItemV ).to.be.an.instanceof( Startitemv );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );