const $gifArea = $("#gif-area");
const $term = $("#term");

//Retrives gif from giphy API and appends to gif area div
function updateGifs(res) {
  //Gets length of results
  let resultTotal = res.data.length;
  if (resultTotal) {
    //finds a random index of result total
    let random = Math.floor(Math.random() * resultTotal);
    //creates new gif element using random index
    let $newGif = $("<img>", {
      src: res.data[random].images.original.url,
      class: "gif",
    });
    //appends new gif to gif area div
    $gifArea.append($newGif);
  }
}

//Get search term from the form;
$("form").on("submit", async function (evt) {
  //prevent reload
  evt.preventDefault();

  //get search term from form
  let term = $term.val();
  $term.val("");

  //get response from giphy api of term search
  const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
    params: {
      q: term,
      api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym",
    },
  });
  //call updateGifs to create new gif
  updateGifs(response.data);
});

//Remove all gifs from the page
$("#remove").on("click", function () {
  $("#gif-area").empty();
});
