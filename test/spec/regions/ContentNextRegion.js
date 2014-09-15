(function() {
	'use strict';

	var root = this;

	root.define([
		'regions/ContentNextRegion'
		],
		function( Contentnextregion ) {

			describe('Contentnextregion Region', function () {

				it('should be an instance of Contentnextregion Region', function () {
					var ContentNextRegion = new Contentnextregion();
					expect( ContentNextRegion ).to.be.an.instanceof( Contentnextregion );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );