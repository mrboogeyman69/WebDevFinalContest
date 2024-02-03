const tweet = {
    text: 'This is a tweet',
    likes: 0,
    comments: []
  };
  
  const tweetCard = document.createElement('div');
  tweetCard.classList.add('tweet-card');
  
  const tweetText = document.createElement('p');
  tweetText.textContent = tweet.text;
  tweetCard.appendChild(tweetText);
  
  const likeButton = document.createElement('button');
  likeButton.textContent = 'Like';
  likeButton.addEventListener('click', () => {
    tweet.likes++;
    likeButton.textContent = `Like (${tweet.likes})`;
  });
  tweetCard.appendChild(likeButton);
  
  const commentButton = document.createElement('button');
  commentButton.textContent = 'Comment';
  commentButton.addEventListener('click', () => {
    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Add a comment...';
    commentInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const commentText = event.target.value;
        const comment = { text: commentText };
        tweet.comments.push(comment);
        displayComment(comment);
        event.target.value = '';
      }
    });
    tweetCard.appendChild(commentInput);
  });
  tweetCard.appendChild(commentButton);
  
  const commentsList = document.createElement('ul');
  tweetCard.appendChild(commentsList);
  
  function displayComment(comment) {
    const commentItem = document.createElement('li');
    commentItem.textContent = comment.text;
  
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      // code to edit the comment
    });
    commentItem.appendChild(editButton);
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      // code to delete the comment
    });
    commentItem.appendChild(deleteButton);
  
    commentsList.appendChild(commentItem);
  }
  
  document.body.appendChild(tweetCard);