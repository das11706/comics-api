class Comic {
  constructor(title, artist) {
    this.title = title;
    this.artist = artist;
  }
}

class Review {
  constructor(description) {
    this.description = description;
  }

    review() {
    return `${this.description}`;
  }
}


document.addEventListener("DOMContentLoaded", function() {
 
  // const reviewForm = document.getElementById("create-review-form");
  // // const newReviewDescription = document.getElementById("newReviewDescription");
  // // const newReviewList = document.getElementById("reviews");
  // reviewForm.addEventListener("submit", createReview);

  // submitData();
  fetchComics();
});


// const appendNewReview = (review) => {
//   document.getElementById("reviews").appendChild(review);
// };


// const createReview = (event) => {
//   event.preventDefault();
//   const newReviewDescription = document.getElementById("newReviewDescription");
//   const newReview = document.createElement("li");
//   newReview.innerText = newReviewDescription.value;
  
//   const button = document.createElement("button");
//   button.innerText = "X";


//   button.addEventListener("click", deleteReview);
  
//   newReview.appendChild(button);

//   appendNewReview(newReview);
//   event.target.reset();
// }

//   const deleteReview = () => {
//   // event.preventDefault();
//   // document.getElementById("reviews").removeChild();
//   let reviews = document.getElementById("reviews");
//   reviews.removeChild(reviews.firstElementChild);
// }


// function submitData(description) {
//   return fetch("http://localhost:3000/reviews", {
//     method : "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify({
//       description
//     })
//   })
//     .then(function(response) {
//       return response.json();
//     })
//     // .then(function(object) {
//     //   document.body.innerHTML = object[]
//     // })
//     .then(json => createReview(json))
//     // .then(json => {

//     // })
//     // .then(function(object) {
//     //   document.body.innerHTML = object["id"]
//     // }) 
//     .catch(function(error) {
//       alert("There is an error.");
//       document.body.innerHTML = error.message
//     })
// }

function fetchComics() {
  fetch("http://localhost:3000/reviews")
  .then(resp => resp.json())
  // .then(json => renderComics(json))
  // .then(reviews => console.log(reviews))
  .then(reviews => reviews.forEach(review => {
    // debugger
    const com = new Comic(review.comic.title, review.comic.artist)
    renderComics(com)
  }
  )) 

  // reviews.forEach(review => new Review(review.description))
    // const obj = JSON.parse(json);
    // obj.comic = new Comic(obj.comic);
  // })
  // .catch(function(error) {
  //   console.log(error.message);
  // });
}


function renderComics(review) {
  debugger
  const main = document.querySelector('main');
  // reviews.forEach(review => {
    // const comic = new Comic(review)
    const h2 = document.createElement('h2');
    h2.innerHTML = review.title;
    // h2.innerHTML = comic.title;
    main.appendChild(h2);
    // const a = document.createElement('a');
    // a.setAttribute('href',"http://localhost:3000/reviews/1" )
    // a.innerHTML = h2;
    // document.getElementsByTagName('main')[0].appendChild(a);

    const h3 = document.createElement('h3');
    h3.innerHTML = review.artist;
    // h3.innerHTML = comic.artist;
    main.appendChild(h3);
  // });
}


