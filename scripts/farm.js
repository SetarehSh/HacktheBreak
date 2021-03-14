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

function getFarmer(){
    //Read JSON file for list of farmers
    readJson("/scripts/farmers.json", function(data){
        var farmerId = getUrlParams();
        var farmer;
        for(var i = 0; i < data.farmers.length; i++){
            if(data.farmer[i].id == farmerId){
                farmer = data.farmer[i];
            }
        }
        console.log(farmer);
    });
}