"use strict";

(function () {
    //Basic config neded for this view
    const config = {
        apiBaseURL: 'http://cluster.dystopi.nu/api/',
        streams: [
            {
                id: 0,
                name: "Camera 1: Charlie Chaplin",
                url: 'https://cluster.dystopi.nu/stream/eye.flv'
            },
            {
                id: 1,
                name: "Camera 2: True Survivor Music Video",
                url: 'https://cluster.dystopi.nu/stream/truesurvivor.flv'
            },
            {
                id: 2,
                name: "Camera 3: Re-Send",
                url: 'https://cluster.dystopi.nu/stream/rbt.flv'
            }
        ]
    };
    //basic app states
    let appState = {
        selectedStream: 0,
        selectedStreamUrl: config.streams[0].url
    };

    //create a video element
    const createVideo = () => {
        let videoWrap = document.getElementById("video-wrap");

        //reset the player element

        videoWrap.innerHTML = '<video class="video" controls autoplay poster="img/loadingStream.png" id="videoElement"></video>';

        //attach flvjs to the video object
        if (flvjs.isSupported()) {
            let videoElement = document.getElementById('videoElement');
            let flvPlayer = flvjs.createPlayer({
                type: 'flv',
                url: appState.selectedStreamUrl
            });
            flvPlayer.attachMediaElement(videoElement);
            // If there is any issue we'll tell the user
            flvPlayer.on(flvjs.Events.ERROR, () => {
                videoElement.setAttribute("poster", "img/streamError.png");
            });
            flvPlayer.load();
            flvPlayer.play();
        } else {
            alert("Error loading video stream player");
        }
    };

    //Select the camera feed menu
    let selectMenu = document.getElementById("streamSelect");

    //Add Camera feed options
    config.streams.forEach((stream) => {
        let feedOption = document.createElement("option");

        if (appState.selectedStream == stream.id) {
            feedOption.setAttribute("selected", "selected");
        }
        feedOption.innerText = stream.name;
        feedOption.value = stream.id;
        //When the user clicks on the option we
        //re-render the view with updated stream url
        feedOption.addEventListener("click", () => {
            appState.selectedStream = stream.id;
            appState.selectedStreamUrl = stream.url;
            createVideo();
        });

        //add change dropdown event trigger
        selectMenu.addEventListener("change", (e) => {
            console.log(selectMenu.value);
            selectMenu.options[selectMenu.value].click();
        });

        selectMenu.appendChild(feedOption);
    });

    createVideo();


})();
