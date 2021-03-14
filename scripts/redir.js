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

// When clicking on a listing, go to the listing detail page
$(document).on("click", '.farmerContainer', function (event) {
    console.log(event.target);
    //Gets the parent container class, then gets its title span, then parses the HTML to get the name of the farm
    farmName = event.target.closest(".farmerContainer").getElementsByClassName("farmerName")[0].innerHTML;

    readJson("/scripts/farmers.json", function(data){
        var id;

        // Get the ID of a farm with a matching name
        for(var i = 0; i < data.farmers.length; i++){
            if(data.farmers[i].name == farmName){
                id = data.farmers[i].id;
            }
        }

        if(id == null){
            console.log("Could not find a farm with the name " + farmName);
        } else {
            window.location.href = "farm.html?id=" + id;
        }

    });
});