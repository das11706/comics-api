class Comic {
  constructor(title, artist) {
    this.title = title;
    this.artist = artist;
  }

  comicInfo() {
    return `${this.title} written by ${this.artist}`
  }

  allComicReview() {
    return 
  }
}

class Review {
  constructor(description) {
    this.description = description;
  }

  newReview() {
    return this.description
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const mainCont = document.getElementById("main-content");
  const comicColl = document.getElementById("comic-collection");
  const comicSubmit = document.getElementById("submit-comic");
  const comicForm = document.getElementById("comic-form");
  comicForm.addEventListener("submit", (event) => createNewComic(event));

  const reviewUl = document.getElementById("reviews")
  const reviewSubmit = document.getElementById("submit-review");
  const reviewForm = document.getElementById("review-form");
  reviewForm.addEventListener("submit", (event) => createNewReview(event));
  
  // reviewForm.addEventListener("submit", createReview); // alternate version I'm working on for reviewForm along with the code at the very bottome outside of the DOMContentLoaded.


    fetch("http://localhost:3000/comics")
    .then(resp => resp.json())
    .then(comics => comics.forEach(renderComics))

    // fetch(`http://localhost:3000/comics/${comic.id}`)
    // .then(resp => resp.json())
    // .then(renderComics)
    // .then(comics => comics.forEach(renderComics))
  
    function renderComics(comic) {
    
      const com = new Comic(comic.title, comic.artist)
      const comicLi = document.createElement("li");
      comicLi.dataset.id = comic.id
      comicLi.innerHTML = com.title
      comicColl.appendChild(comicLi);
      const a = document.createElement('a');
      a.dataset.id = comic.id
      a.innerHTML = com.comicInfo();
      comicColl.appendChild(a);
    
      // const buttonRev = document.createElement("button")
      // buttonRev.setAttribute("id", "submit-review")
      // buttonRev.innerText = "Create New Review"
      // comicColl.appendChild(buttonRev);
      // buttonRev.addEventListener("click", (event) => {
      //   if (event.target.id === "submit-review")
      //   createNewReview()}) 

      // buttonRev.addEventListener("click", (event) => {
      //   if (event.target.id === "submit-review")
      //   reviewForm.addEventListener("submit", (event) => createNewReview(event))}) 


      // reviewSubmit.setAttribute("id", "submit-review")
      // reviewSubmit.innerText = "REVIEW"  
      // comicColl.appendChild(reviewSubmit);
      // reviewSubmit.addEventListener("click", (event) => {
      //   if (event.target.id === "submit-review")
      //   createNewReview()
      // })
      

      const buttonDel = document.createElement("button")
      buttonDel.setAttribute("id", "delete-button")
      buttonDel.innerText = "DELETE"
      comicColl.appendChild(buttonDel);
      buttonDel.addEventListener("click", (event) => {
        if (event.target.id === "delete-button")
        deleteComic()})

      function deleteComic(){
        fetch(`http://localhost:3000/comics/${comic.id}`, {
        method: "DELETE",
        headers: {
        "content-type": "application/json",
        "Accept": "application/json"
        }
        })
        .then(resp => resp.json())
        .then(() => {
          comicLi.remove();
          // reviewLi.remove();  I need to connect the review to the comic to be able to delete them both simultaneously. If I delete the comic I also want to delete the review.
          a.remove();
          buttonDel.remove();
          buttonRev.remove();
          buttonDel.removeEventListener("click", 'delete-button');
        })
      }
    }

 
    function createNewComic(event) {
      event.preventDefault();
      return fetch("http://localhost:3000/comics", {
        method : "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          title:  event.target.title.value,
          artist: event.target.artist.value
        })
      })
      .then(resp => resp.json())
      .then(comics => comics.forEach(renderComics))  
      // .then(renderComics)
      .catch(function(error) {
        console.log(error.message);
      });
    };


    function createNewReview(event) {
      event.preventDefault();
      return fetch("http://localhost:3000/reviews", {
        method : "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          description: event.target.description.value
        })
      })
      .then(response => response.json())
      // .then(reviews => reviews.forEach(renderReviews))
      .then(renderReviews)
      .then(event.target.reset())
      .catch(function(error) {
        console.log(error.message);
      });
    };


    fetch("http://localhost:3000/reviews")
      .then(resp => resp.json())
      .then(comics => comics.forEach(renderReviews))

  function renderReviews(review) {
    // mainCont.innerHTML = "";
    // comicColl.innerHTML = "";
    const rev = new Review(review.description);
    const reviewLi = document.createElement("li");
    reviewLi.dataset.id = review.id;
    reviewLi.innerHTML = rev.newReview();
    reviewUl.appendChild(reviewLi);
    
   
    const buttonDel = document.createElement("button")
    buttonDel.setAttribute("id", "delete-button")
    buttonDel.innerText = "DELETE";
    reviewUl.appendChild(buttonDel);
    buttonDel.addEventListener("click", (event) => {
    // event.target.reset();
    if (event.target.id === 'delete-button')
    deleteReview()});


    function deleteReview(){
      fetch(`http://localhost:3000/reviews/${review.id}`, {
      method: "DELETE",
      headers: {
      "content-type": "application/json",
      "Accept": "application/json"
      }
      })
      .then(resp => resp.json())
      .then(() => {
        reviewLi.remove();
        buttonDel.remove();
        buttonDel.removeEventListener("click", 'delete-button');
      })
    }
  }


});



// const appendNewReview = (review) => {
//   const rev = new Review(review.description);

//   document.getElementById("reviews").appendChild(review);
// };

// const createReview = (event) => {
//   event.preventDefault();
//   const newReviewDescription = document.getElementById("description");
//   const newReview = document.createElement("li");
//   newReview.innerText = newReviewDescription.value;

//   appendNewReview(newReview);
//   event.target.reset();
// };

// I was useing the code below for renderReviews to take info from it an add it to the createReview function right above to expand on its funtionality. Still working on this as a possibility.


// function renderReviews(review) {
//   // mainCont.innerHTML = "";
//   // comicColl.innerHTML = "";
//   const rev = new Review(review.description);
//   const reviewLi = document.createElement("li");
//   reviewLi.dataset.id = review.id;
//   reviewLi.innerHTML = rev.newReview();
//   reviewUl.appendChild(reviewLi);
  
 
//   const buttonDel = document.createElement("button")
//   buttonDel.setAttribute("id", "delete-button")
//   buttonDel.innerText = "DELETE";
//   reviewUl.appendChild(buttonDel);
//   buttonDel.addEventListener("click", (event) => {
//   // event.target.reset();
//   if (event.target.id === 'delete-button')
//   deleteReview()});







  





  






