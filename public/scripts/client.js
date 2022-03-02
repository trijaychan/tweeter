/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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
                          <img src="${tweetInfo.user.avatars}" style="height: 75px;"> 
                          <p>${tweetInfo.user.name}</p>
                        </div>
                        <p><strong>${tweetInfo.content.text}</strong></p>
                      </div>
                      <hr>
                      <div class="tweet-bottom">
                        <p><strong>${timeago.format(tweetInfo.created_at, 7)} days ago</strong></p>
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


$(document).ready(function() {
  renderTweets(data);
});