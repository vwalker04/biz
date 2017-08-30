$(document).ready(function (){
  /* Slider properties */
  $('.bxslider').bxSlider({
    auto: true,
    pause: 4000,
    slideMargin: 20
  });

  /* About-container image brighten effect */
  $('.about_img').hover(function() {
    $(this).css("opacity", "1");
    }, function() {
    $(this).css("opacity", ".80");
  });
});
