(function() {
	'use strict';

	var root = this;

	root.define([
		'views/layout/HeaderLayout'
		],
		function( Headerlayout ) {

			describe('Headerlayout Layout', function () {

				it('should be an instance of Headerlayout Layout', function () {
					var HeaderLayout = new Headerlayout();
					expect( HeaderLayout ).to.be.an.instanceof( Headerlayout );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );