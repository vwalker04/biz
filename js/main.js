$(document).ready(function (){

  /* jQuery - About images brighten effect */
  $('.about_img').hover(function() {
    $(this).css("opacity", "1");
    }, function() {
    $(this).css("opacity", ".80");
  });

});

/* Forces user to load page with https if not http */
  if (location.protocol != 'https:') {
    location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
  }
