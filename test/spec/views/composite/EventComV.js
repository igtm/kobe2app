(function() {
	'use strict';

	var root = this;

	root.define([
		'views/composite/EventComV'
		],
		function( Eventcomv ) {

			describe('Eventcomv Compositeview', function () {

				it('should be an instance of Eventcomv Compositeview', function () {
					var EventComV = new Eventcomv();
					expect( EventComV ).to.be.an.instanceof( Eventcomv );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );