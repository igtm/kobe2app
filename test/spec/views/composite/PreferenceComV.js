(function() {
	'use strict';

	var root = this;

	root.define([
		'views/composite/PreferenceComV'
		],
		function( Preferencecomv ) {

			describe('Preferencecomv Compositeview', function () {

				it('should be an instance of Preferencecomv Compositeview', function () {
					var PreferenceComV = new Preferencecomv();
					expect( PreferenceComV ).to.be.an.instanceof( Preferencecomv );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );