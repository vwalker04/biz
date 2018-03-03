$(document).ready(function (){
  /* Slider properties */
  $('.bxslider').bxSlider({
    mode: 'fade',
    auto: true,
    autoHover: true,
    pause: 4000,
    slideMargin: 0
  });

  /* jQuery - About images brighten effect */
  $('.about_img').hover(function() {
    $(this).css("opacity", "1");
    }, function() {
    $(this).css("opacity", ".80");
  });

  /* Webpage pre-loader function */
  $(window).on("load", function(){
    $('.loader').fadeOut(4000, function() {
      $(this).remove();
    });
  });

  // $(window).resize(function(){
	// if ($(window).width() <= 375){
	// 	$('.sky').remove();
	// }

});
/* Forces user to load page with https if not http */
  // if (location.protocol != 'https:') {
  //   location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
  // }
