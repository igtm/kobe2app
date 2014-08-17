(function() {
	'use strict';

	var root = this;

	root.define([
		'views/layout/DrawerLayout'
		],
		function( Drawerlayout ) {

			describe('Drawerlayout Layout', function () {

				it('should be an instance of Drawerlayout Layout', function () {
					var DrawerLayout = new Drawerlayout();
					expect( DrawerLayout ).to.be.an.instanceof( Drawerlayout );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );