$(document).ready(function() {
$('.carousel.carousel-slider').carousel({fullWidth: true});

var topics = ["kittehs", "puppies", "sugar gliders", "tigers", "otters", "chinchillas"];
var topic2 = "camels";
var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + topic2 + "&api_key=dc6zaTOxFJmzC";
// console.log(queryUrl);

function createButtons(){
  $(".buttons").empty();
  for(var i=0; i < topics.length; i++){
    $(".buttons").append("<button data-name='" + topics[i] + "'>" + topics[i] + "</button>");
    // $(".buttons").append("<button data-name="{topics[i]}">" + {topics[i]} + "</button>");
    
  };

};

function createNewButtons(){
  var newButtonText = $('#added_btn').val();
  topics.push(newButtonText);
  createButtons();
}
createButtons();
createButtons(); //this checks to make sure the .empty() works, not to duplicate buttons


$(".buttons").on("click", "button", function(){
  var buttonText = $(this).attr("data-name");
  $(".buttons").html(buttonText);
  console.log(buttonText);
  // making this more flexible by 'listening' on the html element button. if you get rid of "button" it is only
  // on buttons that exist in the html
});

// $(document).on('click', function(){
//   // this is making jquery listen too high, or too broad level
// });

  $.ajax({

    url: queryUrl,
    method: 'GET',
  }).done(function(response){
    console.log(response);
  });

});