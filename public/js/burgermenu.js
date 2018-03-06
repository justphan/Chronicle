
'use strict';

$( document ).ready(function() {

$("body").on('click', '.top', function() {
		$("nav.menu").toggleClass("menu_show");
	});


 $('#datePicker').val(new Date());
});
