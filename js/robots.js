"use strict";

(function () {
    //Basic config neded for this view
    const config = {
        apiBaseURL: 'https://cluster.dystopi.nu/api/',
    };

    let target = document.getElementById("robots");

    fetch(config.apiBaseURL + "robots")
    .then(function (response) {
        return response.json();
    }).then(function(data) {
        //loop the list of robots add add click event and html elements
        data.forEach((aRobot) => {
            //Create a html object
            let robotDataObject = document.createElement("div");

            //populate that object wíth the data
            robotDataObject.className = "aRobot";
            robotDataObject.innerHTML =
                "<h2>" + aRobot.id + ": " +
                aRobot.name + "</h2>" +
                "<p>x: " + aRobot.x + " y: " + aRobot.y + "</p>" +
                "<p>w: " + aRobot.width + " h: " + aRobot.height + "</p>";

            target.appendChild(robotDataObject);
        });
    }).catch((error) => {
        let errorMsg = document.createElement("div", "error");

        errorMsg.innerText = "Failed to fetch robots from " + config.apiBaseURL;
        target.appendChild(errorMsg);
    });
})();
