(function() {
	'use strict';

	var root = this;

	root.define([
		'models/EventDetail'
		],
		function( Eventdetail ) {

			describe('Eventdetail Model', function () {

				it('should be an instance of Eventdetail Model', function () {
					var EventDetail = new Eventdetail();
					expect( EventDetail ).to.be.an.instanceof( Eventdetail );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );