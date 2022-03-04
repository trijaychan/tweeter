/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    $("#tweets-container").prepend(createTweetElement(tweet));
  }
};

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweetInfo) => {
  let $tweet = $(`<article class="tweet">
                    <header>
                      <div class ="tweet-top">
                        <div class="user-info">
                          <img src="${escape(tweetInfo.user.avatars)}"> 
                          <p>${escape(tweetInfo.user.name)}</p>
                        </div>
                        <p>${escape(tweetInfo.content.text)}</p>
                      </div>
                      <hr>
                      <div class="tweet-bottom">
                        <p>${timeago.format(escape(tweetInfo.created_at))}</p>
                        <div>
                          <i class="fa-solid fa-flag fa-xs"></i>
                          <i class="fa-solid fa-retweet fa-xs"></i>
                          <i class="fa-solid fa-heart fa-xs"></i>
                        </div>
                      </div>
                    </header>
                  </article>
                  <br>`);

  return $tweet;
};

const loadTweets = () => {
  $.get("/tweets/")
    .then((data) => {
      renderTweets(data);
    });
};

$(document).ready(function() {
  $(".error-popup").hide();
  loadTweets();

  $("#compose-tweet").submit(function(event) {
    if (!$("#tweet-text").val()) {
      $("#error-text").html("Please enter a valid tweet");
      $(".error-popup").show();
    } else if ($("#tweet-text").val().length > 140) {
      $("#error-text").html("Please enter a shorter tweet");
      $(".error-popup").show();
    } else {
      $(".error-popup").hide();
      $.post("/tweets/", $(this).serialize())
        .then (() => {
          $.get("/tweets/")
            .then((data) => {
              renderTweets(data.slice(-1));
            });
        })
    }

    event.preventDefault();
  });
});