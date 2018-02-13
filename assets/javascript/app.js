// require('dotenv').config({path: '/../.env'});
// console.log(process.env.GIPHY_KEY);
// import key from '../../key.js'
// console.log(key);

$(document).ready(function() {
$('.carousel.carousel-slider').carousel({fullWidth: true});

var topics = ["kittehs", "puppies", "sugar gliders", "tigers", "otters", "chinchillas"];
console.log(topics);
var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=dc6zaTOxFJmzC";
console.log(queryUrl);

function createButtons(){
  $(".buttons").empty(); //clear out existing, and re-runs with all new buttons displayed correctly. No duplicates.
  for(var i=0; i < topics.length; i++){
    $(".buttons").append("<button data-name='" + topics[i] + "'>" + topics[i] + "</button>");
    // $(".buttons").append("<button data-name="{topics[i]}">" + {topics[i]} + "</button>");
    
  };
};
createButtons();

function createNewButtons(){
  var newButtonText = $('#added_btn').val();
  console.log(newButtonText);
  topics.push(newButtonText);
  createButtons();
  // Add a submit button on click function //on an input id animal_input.val() (once submit is hit), attach the input id name.val() do this inside the on click for submit, clear submit by setting val("").
  // call createnewbutton function (first thing inside the submit button function, clear the prior, add the button #.val()
};

createButtons(); //this checks to make sure the .empty() works, not to duplicate buttons


$(".buttons").on("click", "button", function(evt){
  evt.preventDefault();
  $(".coolGifs").empty();
  var buttonText = $(this).attr("data-name");
  // $(".buttons").html(buttonText);
  // var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + buttonText + "&limit=15&api_key="+ key;
  var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + buttonText + "&limit=10&api_key=dc6zaTOxFJmzC";
  console.log(buttonText);

  $.ajax({
  url: queryUrl,
  method: 'GET',
  }).done(function(response){
    console.log(response);
    // $(".coolGifs").append
    for(var i=0; i < response.data.length; i++){
      // $(".coolGifs").prepend("<img src='" + response.data[i].images.fixed_width_still.url + "' />");
    //data-state, data-anim, data-still, img giphy class
    // console.log(response.data[i].title);
    var newDiv = $("<div />").addClass("newGifs");
    var newImg = $("<img class='giphy' />");
    var rating = response.data[i].rating;
    console.log(rating);
    var p = $('<h5>').text("Ratings: " + rating.toUpperCase());

    newImg.attr("data-state", "still")
        .attr("data-still", response.data[i].images.fixed_width_still.url)
        .attr("data-anim", response.data[i].images.fixed_width.url)
        .attr("src", response.data[i].images.fixed_width_still.url)
      // then, the last thing we do is we append the newImg to the coolGifs container
      
      newDiv.append(newImg).append(p);
      $(".coolGifs").append(newDiv);
    };
  });
  // making this more flexible by 'listening' on the html element button. if you get rid of "button" it is only
  // on buttons that exist in the html
});

// $(document).on('click', function(){
//   // this is making jquery listen too high, or too broad level
// });
// img.giphy (on click function)

$(".coolGifs").on("click", ".giphy", function(evt){
  evt.preventDefault();
  var gifState = $(this).attr("data-state");
  var gifAnimate = $(this).attr("data-anim");
  var gifStill = $(this).attr("data-still")
    if (gifState == "still") {
      $(this).attr("src", gifAnimate).attr('data-state', 'animate');
      //set src to be equal to value of data-anim
      //set 'data-state' to be equal to anim
    }else {
      $(this).attr("src", gifStill).attr('data-state', 'still');
      //set data-state to be equal to still
    }
  });

  $("#submitButton").on("click", function(evt){
    evt.preventDefault();
    createNewButtons();
  });
// $('.parallax').parallax();
});