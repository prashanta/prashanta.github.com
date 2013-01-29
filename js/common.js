/* Do some stuffs after page loads
*/
$(document).ready(function(){	

	$('#shareme').sharrre({
		share: {
	    	twitter: true,
		    facebook: true,
		    googlePlus: true
		},
		template: 	'<div class="box">'+
						'<div class="middle">'+					
							'<a href="#" class="facebook" title="Share on Facebook"><img src="../../img/facebook.png"></a>&nbsp;&nbsp;'+							
							'<a href="#" class="twitter" title="Share on Twitter"><img src="../../img/twitter.png"></a>&nbsp;&nbsp;'+
							'<a href="#" class="googleplus" title="Share on Google+"><img src="../../img/google.png"></a>&nbsp;&nbsp;'+			
						'</div>'+						
					'</div>',
		enableHover: false,
		enableTracking: true,
		render: function(api, options){
			$(api.element).on('click', '.twitter', function() {
				api.openPopup('twitter');
			});
			$(api.element).on('click', '.facebook', function() {
				api.openPopup('facebook');
			});
			$(api.element).on('click', '.googleplus', function() {
				api.openPopup('googlePlus');
			});
		}
	});
});		


