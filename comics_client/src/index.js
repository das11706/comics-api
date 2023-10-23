class Comic {
  constructor(title, artist, id) {
    this.title = title;
    this.artist = artist;
    this.id = id;
  }

  comicInfo() {
    return `${this.title} written by ${this.artist}`
  }

}

// class Review {
//   constructor(description, id, comic_id) {
//     this.description = description;
//     this.id = id;
//     this.comic_id = comic_id;
//   }

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

  const comicDropdown = document.getElementById("comic_id");
  comicDropdown.addEventListener("change", (event) => {
    const selectedComicId = event.target.value;
    renderComicReviews(selectedComicId);
  });
  
  // const reviewsUrl = "http://localhost:3000/reviews"
  const reviewUl = document.getElementById("reviews");
  const reviewSubmit = document.getElementById("submit-review");
  const reviewForm = document.getElementById("review-form");
  const reviewDropdown = document.getElementById("review_id_hidden");

  // reviewForm.addEventListener("submit", (event) => createNewReview(event));

  reviewDropdown.addEventListener("change", (event) => {
    const selectedReviewId = event.target.value;
    reviewForm.review_id.value = selectedReviewId;
  });

  reviewForm.addEventListener("submit", (event) => updateReview(event));
  
  const submitReviewButton = document.getElementById("submit-review");
  const updateReviewButton = document.getElementById("submit-review-update");

  submitReviewButton.addEventListener("click", (event) => createNewReview(event));
  updateReviewButton.addEventListener("click", () => {
    const reviewId = reviewForm.querySelector("#review_id_hidden").value;
    updateReview(reviewId);
  });


    fetch("http://localhost:3000/comics")
    .then(resp => resp.json())
    .then(comics => comics.map(renderComics))

  
    function renderComics(comic) {
    
      const com = new Comic(comic.title, comic.artist, comic.id);
      const comicLi = document.createElement("li");
      comicLi.dataset.id = comic.id;
      comicLi.innerHTML = com.comicInfo();
      comicColl.appendChild(comicLi);
     
 
      select = document.getElementById("comic_id")
      let opt = document.createElement('option');
      opt.value = comic.id;
      opt.innerHTML = comic.title;
      select.appendChild(opt);

      //COMMENTING OUT THIS BUTTON DELETE FEATURE FOR COMICS. ONCE COMICS ARE CREATED THEY ARE NOT ABLE TO BE DELETED.

      // const buttonDel = document.createElement("button");
      // buttonDel.setAttribute("id", "delete-button");
      // buttonDel.innerText = "DELETE";
      // comicColl.appendChild(buttonDel);
      // buttonDel.addEventListener("click", (event) => {
      //   if (event.target.id === "delete-button")
      //   deleteComic()})

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
          buttonDel.remove();
          // buttonRev.remove();
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
      .then(comics => comics.map(renderComics))  
      // .then(renderComics)
      .catch(function(error) {
        console.log(error.message); 
      });
    };

  
    function createNewReview(event) {
      event.preventDefault();

      // const description = event.target.description.value;
      // const comicId = event.target.comic_id.value;

      const description = reviewForm.querySelector("#description").value;
      const comicId = reviewForm.querySelector("#comic_id").value;

      return fetch("http://localhost:3000/reviews", {
        method : "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          description: description,
          comic_id: comicId,
        }),
      })
      .then(resp => resp.json())
      .then((review) => renderReviews(review))
      .then(() => reviewForm.reset())
      .catch(function(error) {
        console.log(error.message);
      });
    };


    function renderComicReviews(comicId) {
      fetch(`http://localhost:3000/comics/${comicId}`)
        .then((resp) => resp.json())
        .then((comic) => {
          const reviews = comic.reviews;
          reviewUl.innerHTML = '';
          reviews.map((review) => renderReviews(review));
        })
        .catch(function(error){
          console.log(error.message);
        })
    }



    fetch("http://localhost:3000/reviews/")
      .then(resp => resp.json())
      .then(reviews => reviews.map(renderReviews))

  function renderReviews(review) {
    // reviewUl.innerHTML = "";
    const rev = new Review(review.description, review.id, review.comic_id);
    const reviewLi = document.createElement("li");
    // reviewLi.dataset.id = review.id;
    reviewLi.dataset.id = review.comic_id
    reviewLi.innerHTML = rev.newReview();
    reviewUl.appendChild(reviewLi);
    
   
    const buttonDel = document.createElement("button");
    buttonDel.setAttribute("id", "delete-button");
    buttonDel.innerText = "DELETE";
    reviewUl.appendChild(buttonDel);
    buttonDel.addEventListener("click", (event) => {
    if (event.target.id === 'delete-button')
    deleteReview()});


    const buttonRev = document.createElement("button");
    buttonRev.setAttribute("class", "update-rev-button");
    buttonRev.innerText = "Select to Edit Review";
    reviewLi.appendChild(buttonRev);
    // reviewUl.appendChild(buttonRev);
    buttonRev.addEventListener("click", () => updateReviewForm(review.id));
    // buttonRev.addEventListener("click", (event) => {
    //   if (event.target.id === 'update-rev-button') {
    //     const reviewId = review.id;
    //   updateReview(reviewId);
    //   }
    // });


    // function deleteReview(){
    //   fetch(`http://localhost:3000/reviews/${review.id}`, {
    //   method: "DELETE",
    //   headers: {
    //   "content-type": "application/json",
    //   "Accept": "application/json"
    //   }
    //   })
    //   .then(resp => resp.json())
    //   .then(() => {
    //     reviewLi.remove();
    //     buttonDel.remove();
    //     buttonDel.removeEventListener("click", 'delete-button');
    //   })
    // }

    function deleteReview() {
      fetch(`http://localhost:3000/reviews/${review.id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
      })
        .then((resp) => {
          if (resp.status === 204) {
            reviewLi.remove();
            buttonDel.remove();
            buttonDel.removeEventListener("click", 'delete-button');
          } else {
            console.log("Failed to delete review.");
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }
    
    

  }


function updateReview(reviewId) {
  // event.preventDefault();

  const description = document.querySelector("#description").value;
  const reviewIdHidden = document.querySelector("#review_id_hidden").value;

  fetch(`http://localhost:3000/reviews/${reviewId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        description: description,
      }),
    })
      .then((resp) => resp.json())
      .then((updatedReview) => {
        const existingReviewLi = document.querySelector(`li[data-id="${reviewId}"]`);
        existingReviewLi.innerHTML = updatedReview.description;
        // reviewIdHidden.value = review.id;
        document.querySelector("#review-form").reset();
        document.querySelector("#submit-review").style.display = "inline-block";
        document.querySelector("#submit-review-update").style.display = "none";
      })
      .catch(function(error){
        console.log(error.message);
      });
  }

  function updateReviewForm(reviewId) {
    // const reviewForm = document.getElementById("review-form");
    const descriptionInput = reviewForm.querySelector("#description");
    const reviewIdHidden = reviewForm.querySelector("#review_id_hidden");
    const submitReviewButton = reviewForm.querySelector("#submit-review");
    const updateReviewButton = reviewForm.querySelector("#submit-review-update");
    
    fetch(`http://localhost:3000/reviews/${reviewId}`)
    .then((resp) => resp.json())
    .then((review) => {
      descriptionInput.value = review.description;
      reviewIdHidden.value = review.id;
    })
    .catch(function (error) {
      console.log(error.message);
    });

    submitReviewButton.style.display = "none";
    updateReviewButton.style.display = "inline-block";
  }




});

