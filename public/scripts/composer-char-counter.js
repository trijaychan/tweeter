$(document).ready(function() {

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