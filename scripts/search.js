// For searching multiple search terms (maybe not necessary)
inputList = []

function addFoodType(){
    // Get value from search bar
    input = document.forms["searchForm"]["searchBar"].value;
    input = input.toLowerCase();

    // Validate input
    if(input.length != 0){
        inputList.push(input);

        console.log("Input list: " + inputList);

        // Clear the search bar
        document.forms["searchForm"]["searchBar"].value = "";
    
        // Display input word in a neat HTML list
        showAddedFood(input);
    }
}

//Adds HTML to show a list item for each search word
function showAddedFood(input){
    var div = $("#searchList");
    var farmerHtml = "";

    //Add the index in the inputList as a class to keep track
    farmerHtml += "<div class='searchTermContainer index"+(inputList.length-1)+"'>";

    console.log(farmerHtml);
    farmerHtml += "<span class=searchTermText>"+input+"</span>";

    farmerHtml += "</div>";

    div.append(farmerHtml);
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

// i : the index in the inputList
function clearSearchTerm(index){
    inputList.splice(index);
    $(".index"+index).remove();
    //Rename the other class indices, and replace them with an index that is one lower (to preserve order)
    for(var i = index+1; i < inputList.length + 1; i++){
        temp = $(".index"+i);
        temp.removeClass(".index"+i);
        temp.addClass(".index"+(i-1));
    }
}

function clearAllSearchTerms(){
    for(var i = inputList.length - 1; i >= 0; i--){
        clearSearchTerm(i);
    }
}

// When the submit button pressed, send to results
$("#searchform").submit(function(e) {
    e.preventDefault();
    searchForFood();
});

// When the submit button pressed, send to results
$("#clearSearchButton").click(function(e) {
    clearAllSearchTerms();
    console.log("clicked!")
    console.log(inputList)
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
