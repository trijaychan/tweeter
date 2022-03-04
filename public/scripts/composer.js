$(document).ready(function() {
  $("#scroll-to-top").hide();

  $("#scroll-to-top").click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: 0
    }, 500);
  });

  $(window).scroll(function() {
    if ($(window).scrollTop() > 0) {
      $("#scroll-to-top").show();
      $("#scroll-to-compose").hide();
    } else {
      $("#scroll-to-top").hide();
      $("#scroll-to-compose").show();
    }
  })
});