function getUrlParams(){
    var urlParams = new URLSearchParams(window.location.search);
    var listingId = urlParams.get('id');
    console.log(listingId);

    return listingId;
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

function getFarmer(callback){
    //Read JSON file for list of farmers
    readJson("/scripts/farmers.json", function(data){
        var farmerId = getUrlParams();
        var farmer;
        for(var i = 0; i < data.farmers.length; i++){
            if(data.farmers[i].id == farmerId){
                farmer = data.farmers[i];
            }
        }
        callback(farmer);
    });
}

function displayFarmer(){
    getFarmer(function (farmer){
        console.log(farmer);

        // Set the image
        var image = $("#listingImage");
        var imageSrc = farmer.imgsrc;
        image.attr("src", imageSrc);

        // Set the title
        var title = $("#listingTitle");
        var farmerTitle = farmer.listingTitle;
        title.html(farmerTitle);

    });
}

$(document).ready(displayFarmer());