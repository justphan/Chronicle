
'use strict';

$( document ).ready(function() {

$("body").on('click', '.top', function() {
		$("nav.menu").toggleClass("menu_show");
		console.log("click registered");
	});



 $('#datePicker').val(new Date());
});
