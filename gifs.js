
// Set initial array of my topic: food.
var topics = ["pizza", "hamburger", "steak", "sushi"];
        
// Define function to make buttons by looping through "topics" array and making a button for each item in the array.
function makeButtons(){
    for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button>").text(topics[i]);
    newButton.attr("data-id", topics[i]);
    $("#buttons").append(newButton);
}
}

// Call the makeButtons function to display initial buttons upon loading the page.
makeButtons();

// Make an on click function so that whenever the user clicks Submit, it takes the value of the user input and makes a button labeled as such.
$("#addFood").on("click", function () {
    event.preventDefault();
    var item = $("#input-food").val();
    topics.push(item);
    $("#buttons").empty();
    makeButtons();
    $("#input-food").val("");

})

// Whenever a button (dynamically created or otherwise) is clicked, first clear the "foods" div, then call the Giphy API to search for gifs with the button label being the search term. It then grabs a static gif, attaches a rating to it, and adds it to a dynamically created div called "gifDiv". Each gif is then prepended to the "foods" div. 

// ** I know that I should add another data-attribute or class to each of these buttons so that this function doesn't target ALL buttons, but since there are no buttons other than the ones coming out of my array, I decided to just make this function target all buttons on click.
$(document).on("click", "button", function() {
    $("#foods").empty();
    var food = $(this).attr("data-id");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        food + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            console.log(results)

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var foodImage = $("<img>");
                foodImage.attr("src", results[i].images.fixed_height_still.url);
                foodImage.attr("data-still", results[i].images.fixed_height_still.url);
                foodImage.attr("data-animate", results[i].images.fixed_height.url);
                foodImage.attr("data-state", "still");
                gifDiv.prepend(p);
                gifDiv.prepend(foodImage);

                $("#foods").prepend(gifDiv);
            }
        });
    }) ;


// When an image tag (gifs in our case) is clicked, it checks the gif's "data-state", which is originally set to "still" upon creation. If the data-state is "still", this function changes the src of the gif to the animated gif url and changes the data-state to "animate". If the data-state is "animate", the src of the gif is set to the static gif url and the data-state is changed to "still". 
$(document).on("click", "img", function(){

    var state = $(this).attr("data-state");
    if(state == "still"){
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
    }
    else{
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
    }            
});


