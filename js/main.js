$(document).ready(function (){
  $('.bxslider').bxSlider({
    auto: true,
    pause: 3000,
    slideMargin: 20
  });

  $('.about_img').hover(function() {
    $(this).css("opacity", "1");
    }, function() {
    $(this).css("opacity", ".80");
  });
});
