// For searching multiple search terms (maybe not necessary)
inputList = []

function addFoodType(){
    input = document.forms["searchForm"]["searchBar"].value;
    input = input.toLowerCase();

    inputList.push(input);

    console.log(inputList);

    document.forms["searchForm"]["searchBar"].value = "";
    //TODO: Add selected food items to a list to display.
}

function searchForFood(){
    // Adds the query string to the URL
    if(inputList.length == 0){
        console.log("No provided search terms!");
    } else {

        queryString = "results.html?q=";

        for(var i = 0; i < inputList.length; i++){
            queryString += encodeURIComponent(inputList[i].toLowerCase().replace(/[,]/, '-')) + ",";
        }

        queryString = queryString.substring(0, queryString.length - 1); //Trim last +
        
        console.log(queryString);
        
        window.location.href = queryString;
        //TODO: Set up searching for multiple terms.

    }
}

// When the submit button pressed, send to results
$("#searchform").submit(function(e) {
    e.preventDefault();
    searchForFood();
});


// When the enter button is pressed, run addFoodType()
$(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      addFoodType();
      return false;
    }
  });
});
