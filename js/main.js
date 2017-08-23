$(document).ready(function (){
  $('.bxslider').bxSlider({
    auto: true,
    pause: 4000,
    slideMargin: 20
  });

  $('.about_img').hover(function() {
    $(this).css("opacity", "1");
    }, function() {
    $(this).css("opacity", ".80");
  });
});
