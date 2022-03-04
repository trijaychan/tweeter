/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = (tweets) => {
  // for loop that runs for each tweet element there is in tweets
  for (const tweet of tweets) {
    // prepends so that tweets appear in reverse chronological order
    $("#tweets-container").prepend(createTweetElement(tweet));
  }
};

// function to prevent XSS through tweet submission
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// creates a tweet element with user info using string interpolation
const createTweetElement = (tweetInfo) => {
  let $tweet = $(`<article>
                    <header>
                      <div class="tweet-top">
                        <div class="user-info">
                          <div>
                            <img src="${escape(tweetInfo.user.avatars)}"> 
                            <p>${escape(tweetInfo.user.name)}</p>
                          </div>
                          <p>${escape(tweetInfo.user.handle)}</p>
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

// uses ajax to perform an http get request and uses the
// response for creating and rendering the tweets
const loadTweets = () => {
  $.get("/tweets/")
    .then((data) => {
      renderTweets(data);
    });
};

//  when web page is done loading
$(document).ready(function() {
  loadTweets(); // loads tweets from database
  $(".error-popup").hide(); // div containing error message and icon

  // when a new tweet is submitted
  $("#compose-tweet").submit(function(event) {
    if (!$("#tweet-text").val()) { // if textarea is empty
      // sets html of error message and shows it through jquery
      $("#error-text").html("Please enter a valid tweet");
      $(".error-popup").show();
    } else if ($("#tweet-text").val().length > 140) { // if tweet exceeds 140 chars
      $("#error-text").html("Please enter a shorter tweet");
      $(".error-popup").show();
    } else {
      $(".error-popup").hide(); // hides incase user made error before

      // sends information about new tweet to database then renders it
      // onto the feed
      $.post("/tweets/", $(this).serialize())
        .then(() => {
          $.get("/tweets/")
            .then((data) => {
              renderTweets(data.slice(-1)); // we only want to render the new tweet
            });
        });
    }

    event.preventDefault(); // returns false
  });
});