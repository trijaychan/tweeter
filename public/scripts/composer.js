// function that scrolls to the given coord from the top
// during 5 seconds
function setPositionFromTop(fromTop) {
  $([document.documentElement, document.body]).animate({
    scrollTop: fromTop
  }, 500);
};

$(document).ready(function() {
  // defaultly hidden
  $(".error-popup").hide();
  $("#scroll-to-top").hide();

  // when nav button is clicked
  $("#scroll-to-compose").click(function() {
    // aligns the top of the tweet form to the bottom of the nav
    setPositionFromTop($(".new-tweet").offset().top - 150);
    $("#tweet-text").focus(); // focuses onto textarea
    $("#scroll-to-compose").hide(); // hides nav button
  });

  // when focus is lost on textarea
  $("#tweet-text").focusout(function() {
    $("#scroll-to-compose").show(); // reshows nav button
  });

  // if page is scrolled up or down
  $(window).scroll(function() {
    if ($(window).scrollTop() > 0) { // if is not scrolled all the way up
      $("#scroll-to-top").show();
    } else {
      $("#scroll-to-top").hide();
    }
  });

  // when bottom right button is clicked
  $("#scroll-to-top").click(function() {
    // scrolls all the way to the top
    setPositionFromTop(0);
  });

  // whenever keyup happens with textarea in focus
  $("#tweet-text")[0].addEventListener("keyup", function() {
    // pointer for counter element
    const counter = $("output[for='" + $(this).attr("id") + "']");
    $(counter).html(140 - this.value.length); // updates counter

    if (this.value.length > 140) {
      $(counter).css("color", "red"); // sets counter color to red
    } else {
      $(counter).css("color", "#58544C"); // sets back to default
    }
  });
});