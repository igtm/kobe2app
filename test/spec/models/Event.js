(function() {
	'use strict';

	var root = this;

	root.define([
		'models/Event'
		],
		function( Event ) {

			describe('Event Model', function () {

				it('should be an instance of Event Model', function () {
					var Event = new Event();
					expect( Event ).to.be.an.instanceof( Event );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );