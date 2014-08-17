(function() {
	'use strict';

	var root = this;

	root.define([
		'views/layout/ContainerLayout'
		],
		function( Containerlayout ) {

			describe('Containerlayout Layout', function () {

				it('should be an instance of Containerlayout Layout', function () {
					var ContainerLayout = new Containerlayout();
					expect( ContainerLayout ).to.be.an.instanceof( Containerlayout );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );