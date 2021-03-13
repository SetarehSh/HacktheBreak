// For searching multiple search terms (maybe not necessary)
inputList = []

function addFoodType(){
    input = document.forms["searchform"]["searchbar"].value;
    input = input.toUpperCase()

    inputValue = foodType[input]

    inputList.push(input)

    console.log(inputList)

    searchForFood(inputValue)

    //TODO: Add selected food items to a list to display. Search button will do the search
}

function searchForFood(input){
    // Adds the query string to the URL
    window.location.href = "results.html?" + input
    //TODO: Set up searching for multiple terms.
}

$("#searchform").submit(function(e) {
    e.preventDefault()
    addFoodType();
});