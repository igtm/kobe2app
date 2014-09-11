(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/EventItemV'
		],
		function( Eventitemv ) {

			describe('Eventitemv Itemview', function () {

				it('should be an instance of Eventitemv Itemview', function () {
					var EventItemV = new Eventitemv();
					expect( EventItemV ).to.be.an.instanceof( Eventitemv );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );