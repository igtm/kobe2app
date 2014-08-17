(function() {
	'use strict';

	var root = this;

	root.define([
		'regions/ContainerRegion'
		],
		function( Containerregion ) {

			describe('Containerregion Region', function () {

				it('should be an instance of Containerregion Region', function () {
					var ContainerRegion = new Containerregion();
					expect( ContainerRegion ).to.be.an.instanceof( Containerregion );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );