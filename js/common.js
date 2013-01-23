/* Do some stuffs after page loads
*/
$(document).ready(function(){	
	$('#shareme').sharrre({
	  share: {
	    googlePlus: false,
	    facebook: true,
	    twitter: true,
	    digg: false,
	    delicious: false,
	    stumbleupon: false,
	    linkedin: false,
	    pinterest: false
	  },
	  buttons: {
	    googlePlus: {count: 'horizontal'},
	    facebook: {count: 'horizontal'},
	    twitter: {count: 'horizontal'},
	    digg: {type: 'DiggMedium'},
	    delicious: {size: 'tall'},
	    stumbleupon: {layout: '5'},
	    linkedin: {counter: 'top'},
	    pinterest: {media: 'http://sharrre.com/img/example1.png', description: $('#shareme').data('text'), layout: 'vertical'}
	  },
	  enableHover: false,
	  enableCounter: false,
	  enableTracking: true
	});
});		


