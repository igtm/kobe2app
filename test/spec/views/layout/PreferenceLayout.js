(function() {
	'use strict';

	var root = this;

	root.define([
		'views/layout/PreferenceLayout'
		],
		function( Preferencelayout ) {

			describe('Preferencelayout Layout', function () {

				it('should be an instance of Preferencelayout Layout', function () {
					var PreferenceLayout = new Preferencelayout();
					expect( PreferenceLayout ).to.be.an.instanceof( Preferencelayout );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );