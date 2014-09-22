(function() {
	'use strict';

	var root = this;

	root.define([
		'models/Shop'
		],
		function( Shop ) {

			describe('Shop Model', function () {

				it('should be an instance of Shop Model', function () {
					var Shop = new Shop();
					expect( Shop ).to.be.an.instanceof( Shop );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );