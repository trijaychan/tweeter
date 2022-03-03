/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    $("#tweets-container").append(createTweetElement(tweet));
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
                        <p><strong>${escape(tweetInfo.content.text)}</strong></p>
                      </div>
                      <hr>
                      <div class="tweet-bottom">
                        <p><strong>${timeago.format(escape(tweetInfo.created_at))}</strong></p>
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
  $.ajax("/tweets/", { method: "GET" })
    .then((data) => {
      renderTweets(data);
    });
};


$(document).ready(function() {
  loadTweets();

  $("#compose-tweet").submit(function(event) {
    if (!$("#tweet-text").val()) {
      alert("Please enter a valid tweet!");
    } else if ($("#tweet-text").val().length > 140) {
      alert("Please enter a shorter tweet!");
    } else {
      $.post("/tweets/", $(this).serialize());
      $.ajax("/tweets/", { method: "GET" })
      .then((data) => {
        renderTweets(data.slice(-1));
      });
    }

    event.preventDefault();
  });
});