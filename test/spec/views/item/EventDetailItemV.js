(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/EventDetailItemV'
		],
		function( Eventdetailitemv ) {

			describe('Eventdetailitemv Itemview', function () {

				it('should be an instance of Eventdetailitemv Itemview', function () {
					var EventDetailItemV = new Eventdetailitemv();
					expect( EventDetailItemV ).to.be.an.instanceof( Eventdetailitemv );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );