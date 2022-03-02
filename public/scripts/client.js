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

const createTweetElement = (tweetInfo) => {
  let $tweet = $(`<article class="tweet">
                    <header>
                      <div class ="tweet-top">
                        <div class="user-info">
                          <img src="${tweetInfo.user.avatars}"> 
                          <p>${tweetInfo.user.name}</p>
                        </div>
                        <p><strong>${tweetInfo.content.text}</strong></p>
                      </div>
                      <hr>
                      <div class="tweet-bottom">
                        <p><strong>${timeago.format(tweetInfo.created_at)}</strong></p>
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
    const input = "";

    if (!input) {
      alert("Please enter a valid tweet!");
    } else {
      $.post("/tweets/", $(this).serialize());
    }

    event.preventDefault();
  });
});