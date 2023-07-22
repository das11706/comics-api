
document.addEventListener("DOMContentLoaded", () => {
 
  const reviewForm = document.getElementById("create-review-form");
  // const newReviewDescription = document.getElementById("new-review-description");
  // const newReviewList = document.getElementById("reviews");
  reviewForm.addEventListener("submit", createReview);

  submitData();
  fetchComics();
});


const appendNewReview = (review) => {
  document.getElementById("reviews").appendChild(review);
};


const createReview = (event) => {
  event.preventDefault();
  const newReviewDescription = document.getElementById("new-review-description");
  const newReview = document.createElement("li");
  newReview.innerText = newReviewDescription.value;
  
  const button = document.createElement("button");
  button.innerText = "X";


  button.addEventListener("click", deleteReview);
  
  newReview.appendChild(button);

  appendNewReview(newReview);
  event.target.reset();
}

  const deleteReview = () => {
  // event.preventDefault();
  // document.getElementById("reviews").removeChild();
  let reviews = document.getElementById("reviews");
  reviews.removeChild(reviews.firstElementChild);
}


function submitData(id, description, comic, reader) {
  return fetch("http://localhost:3000/reviews", {
    method : "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      id,
      description,
      comic,
      reader
    })
  })
    .then(function(response) {
      return response.json();
    })
    .then(json => createReview(json))
    // .then(function(object) {
    //   document.body.innerHTML = object["id"]
    // }) 
    // .catch(function(error) {
    
    //   document.body.innerHTML = error.message
    // })
}

function fetchComics() {
  return fetch("http://localhost:3000/reviews")
  .then(resp => resp.json())
  .then(json => renderComics(json))
}


function renderComics(reviews) {
  const main = document.querySelector('main');
  reviews.forEach(review => {
    const h2 = document.createElement('h2');
    h2.innerHTML = review.comic.title;
    main.appendChild(h2);

    const h3 = document.createElement('h3');
    h3.innerHTML = review.comic.artist;
    main.appendChild(h3);
  });
}


