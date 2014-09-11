(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/Events'
		],
		function( Events ) {

			describe('Events Collection', function () {

				it('should be an instance of Events Collection', function () {
					var Events = new Events();
					expect( Events ).to.be.an.instanceof( Events );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );