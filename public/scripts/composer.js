$(document).ready(function() {
  $("#scroll-to-compose").click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: $(".new-tweet").offset().top - 150
    }, 500);
    $("#tweet-text").focus();
    $("#scroll-to-compose").hide();
  });

  $("#tweet-text").focusout(function() {
    $("#scroll-to-compose").show();
  });

  $("#scroll-to-top").hide();

  $("#scroll-to-top").click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: 0
    }, 500);
  });

  $(window).scroll(function() {
    if ($(window).scrollTop() > 0) {
      $("#scroll-to-top").show();
    } else {
      $("#scroll-to-top").hide();
    }
  })

  $("#tweet-text")[0].addEventListener("keyup", function() {
    const counter = $("output[for='" + $(this).attr("id") + "']");

    $(counter).html(140 - this.value.length);

    if (this.value.length > 140) {
      $(counter).css("color", "red");
    } else {
      $(counter).css("color", "#58544C");
    }
  });
});