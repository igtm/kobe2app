(function() {
	'use strict';

	var root = this;

	root.define([
		'views/layout/DialogLayout'
		],
		function( Dialoglayout ) {

			describe('Dialoglayout Layout', function () {

				it('should be an instance of Dialoglayout Layout', function () {
					var DialogLayout = new Dialoglayout();
					expect( DialogLayout ).to.be.an.instanceof( Dialoglayout );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );