//TODO: Display all matching farms in infinite scrolling fashion
//TODO: Farms data class


function getUrlParams(){
    var urlParams = new URLSearchParams(window.location.search);
    var foods = urlParams.get('q');
    console.log(foods);

    return foods.split(",");
}

function readJsonToData(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(JSON.parse(rawFile.responseText));
        }
    }
    rawFile.send(null);
}

// //usage:
// readTextFile("/scripts/farmers.json", function(text){
//     var data = JSON.parse(text);
//     console.log(data);
// });

function getMatchingFarmers(){
    //Read JSON file for list of farmers
    readJsonToData("/scripts/farmers.json", function(data){
        var matchingFarmers = []
        paramList = getUrlParams();
        
        //Go through every farmer and check if they have the foods we want from paramList
        for(var i = 0; i < data.farmers.length; i++){
            var farmer = data.farmers[i];
            console.log(farmer);
            matches = true;

            for(var j = 0; j < paramList.length; j++){
                //Check that every parameter is in the farmers items
                if(!farmer.foods.includes(paramList[j])){
                    matches = false;
                }
            }

            if(matches){
                matchingFarmers.push(farmer);
            }

        }

        console.log(matchingFarmers);

        displayResults(matchingFarmers);

    });
}

function displayResults(matchingFarmers){
    var div = $("#results");
    var farmerHtml = "";
    div.append("<div>");

    for(var i = 0; i < matchingFarmers.length; i++){
        farmer = matchingFarmers[i];

        farmerHtml += "<div class='farmerContainer'>";

        farmerHtml += "<img class='farmerImg' src='" + farmer.imgsrc + "'>";

        farmerHtml += "<span class=farmerName>" + farmer.name + "</span>";

        farmerHtml += "<span class=farmerDescription>Details about the farm go here!</span>";

        farmerHtml += "</div>";

        div.append(farmerHtml);

        farmerHtml = "";

    }
}

$(document).ready(getMatchingFarmers());