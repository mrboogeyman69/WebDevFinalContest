document.addEventListener('DOMContentLoaded', function () {
  // Get the post form, posts container, and post area
  const postForm = document.querySelector('.post-box');
  const postsContainer = document.querySelector('.posts');
  const postArea = document.getElementById('post-area');

  // Event listener for posting a tweet
  postForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Get the tweet text
      const tweetText = postArea.value;

      // Create a new tweet card
      const newPost = createPostCard(tweetText);

      // Add the new tweet card to the posts container
      postsContainer.appendChild(newPost);

      // Clear the post area after posting
      postArea.value = '';

      // Save tweets to local storage
      saveTweetsToLocalStorage();
  });

  // Event listener for like button
  postsContainer.addEventListener('click', function (event) {
      if (event.target.classList.contains('like-btn')) {
          toggleLike(event.target);
      }
  });

  // Event listener for comment button
  postsContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('comment-btn')) {
        // Get the parent post element
        const postElement = event.target.closest('.post-main');

        // Check if the post element exists
        if (postElement) {
            // Assuming you have a specific area within the post for displaying comments
            const commentArea = postElement.querySelector('.comment-area');

            // You can toggle the visibility of the comment form
            if (commentArea) {
                commentArea.classList.toggle('hidden');
            }
        }
    }
});


  // Function to create a new tweet card
  function createPostCard(text) {
    const postCard = document.createElement('div');
    postCard.classList.add('post-main');

    // Example structure:
    postCard.innerHTML = `
        <div class="prof-img">
            <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/031/original/profile_image.png?1706888739" alt="#">
        </div>
        <div class="post-right">
            <div class="post-det">
                <h4>Name</h4>
                <h5>@Username</h5>
                <div class="post-right-btns">
                    <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/028/original/edit.png?1706888661" alt="#">
                    <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/027/original/delete.png?1706888643" alt="#">
                </div>
            </div>
            <div class="post-txt-area">
                <p>${text}</p>
            </div>
            <div class="like-cmnt-btns">
                <button class="like-btn">Like</button>
                <button class="comment-btn">Comment</button>
            </div>
        </div>
    `;

    return postCard;
}


  // Function to toggle like on a tweet
  function toggleLike(likeBtn) {
      likeBtn.classList.toggle('liked');
      // Implement logic to update likes in local storage
      saveTweetsToLocalStorage();
  }

  // Function to save tweets to local storage
  function saveTweetsToLocalStorage() {
      // Get all tweets from the posts container
      const tweets = Array.from(postsContainer.children).map(post => post.querySelector('.post-txt-area p').innerText);

      // Save tweets to local storage
      localStorage.setItem('tweets', JSON.stringify(tweets));
  }

  // Function to load tweets from local storage
  function loadTweetsFromLocalStorage() {
      const storedTweets = localStorage.getItem('tweets');

      if (storedTweets) {
          const tweets = JSON.parse(storedTweets);
          // Create tweet cards for each stored tweet and append them to the posts container
          tweets.forEach(text => {
              const newPost = createPostCard(text);
              postsContainer.appendChild(newPost);
          });
      }
  }

  // Load tweets from local storage when the page loads
  loadTweetsFromLocalStorage();
});
