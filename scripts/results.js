function getUrlParams(){
    var urlParams = new URLSearchParams(window.location.search);
    var foods = urlParams.get('q');
    console.log(foods);

    return foods.split(",");
}

function readJson(file, callback) {
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

function getMatchingFarmers(){
    //Read JSON file for list of farmers
    readJson("/scripts/farmers.json", function(data){
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

//Uses HTML to create listings the results div.
//Feel free to pretty this up by changing up the HTML assigned to farmerHtml
function displayResults(matchingFarmers){
    var div = $("#results");
    var farmerHtml = "";
    div.append("<div>");

    for(var i = 0; i < matchingFarmers.length; i++){
        farmer = matchingFarmers[i];

        //Start of HTML for the listing
        farmerHtml += "<div class='farmerContainer'>";

        farmerHtml += "<img class='farmerImg' src='" + farmer.imgsrc + "'>";

        farmerHtml += "<span class=farmerName>" + farmer.name + "</span>";

        farmerHtml += "<span class=farmerDescription>" + farmer.listingTitle + "</span>";

        farmerHtml += "<span class=farmerDescription>Distance: " + farmer.distance + "km</span>";


        farmerHtml += "</div>";
        //End of HTML for the listing

        div.append(farmerHtml);

        farmerHtml = "";
    }
}

$(document).ready(getMatchingFarmers());