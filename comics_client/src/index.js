document.addEventListener("DOMContentLoaded", () => {
 
  const reviewForm = document.getElementById("create-review-form");
  // const newReviewDescription = document.getElementById("new-review-description");
  // const newReviewList = document.getElementById("reviews");
  reviewForm.addEventListener("submit", createReview);
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

  // if (reviews.hasChildNodes()){
  //   reviews.removeChild(reviews.children[0]);
  // }

}


// function deleteReview() {
//   event.preventDefault();
//   document.getElementById("reviews").removeChild();
// }

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
      reader,
    })
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      document.body.innerHTML = object["id"]
    }) 
    .catch(function(error) {
    
      document.body.innerHTML = error.message
    })
}


