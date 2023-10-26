$(document).ready(function() {
    apiKey='0YxvJxV6';
    const apiEndpoint = 'https://www.rijksmuseum.nl/api/nl/collection';
    let doorsOpen = false;
    const elevatorMusic = $('#elevator-music')[0]; 
    const doorsMoving = $('#doorsmoving')[0];
    const ding = $('#ding')[0];
    const hum = $('#hum')[0];
    doorsMoving.volume = 0.4;

// ************************************************************** Fetch and display random artworks ******************************************************** //
    function getRandomArtwork() {
        // Define a random page number to request different results each time
        const randomPage = Math.floor(Math.random() * 10) + 1;
        const resultsPerPage = 1000;
        // Make an API request
        $.ajax({
            url: apiEndpoint,
            headers: {
                'X-Custom-ApiKey': apiKey
            },
            data: {
                key: apiKey,
                format: 'json',
                q: '',
                s: 'relevance',
                p: randomPage, // Random page
                ps: resultsPerPage,
            },
            success: function(data) {
                // Check if there are any artworks in the response
                if (data.artObjects && data.artObjects.length > 0) {
                    // Randomly select an artwork
                    const randomIndex = Math.floor(Math.random() * data.artObjects.length);
                    const artwork = data.artObjects[randomIndex];
                // Fallback in case of missing artwork from source
                    const artworkImage = artwork.webImage.url;
                    const defaultImage = 'img/default-eye.gif';

                    if (artworkImage){
                        $('#artwork-image').attr('src', artworkImage);
                    } else {
                        $('#artwork-image').attr('src', defaultImage);
                    }

                
// *************************************** Apply results of API to HTML ******************** //

                    console.log("Applying artwork")
                    $('#artwork-title').text(artwork.title);
                    $('#artwork-artist').text(artwork.principalOrFirstMaker);
                    if (artwork.plaqueDescription) {
                        $('#artwork-description').text(artwork.plaqueDescription);
                    } else {
                        // No description found in the response
                        console.log("oopsie");
                    }
                } else {
                    // No art found in the response
                    $('#artwork-image').attr('src', '');
                    $('#artwork-title').text('No artworks found');
                    $('#artwork-artist').text('');
                }
            }
        });
    }
 // ************************************************************** Enter the Elevator for the first time *********************************************** //
    $('#enter-button').on('click', function() { 
        elevatorMusic.play();
        hum.play();
        elevatorMusic.volume = 0.3;
        hum.volume = 0.3;
        // Append the content from the hidden container to the artwork container
        $('#artwork-container').append($('#hidden-content').html());
        $('#elevator-doors').addClass('open');
        setTimeout(openElevatorDoors, 5000);
        setTimeout(function() {
            ding.play();
        }, 5000);
        // Trigger the getRandomArtwork function to fetch and display random artwork
        getRandomArtwork();
        doorsOpen = true;
        setTimeout(loadCloseDoorButton, 5000)
        // Hide the "Enter" button
        $('#enter-button').hide();
        $('#newfloorbutton').text('Bringing you to your floor...');
    });
// ************************************************************** Open and close elevator doors ******************************************************** //
    $('#newfloorbutton').on('click', function() {
        if (!doorsOpen) {
            // If closed, play animation to open.
            getRandomArtwork();
            changeBackground();
            $('#newfloorbutton').text('Heading to new floor...');
            setTimeout(openDoorsNewFloor, 5000);
        } else {
            const elevatorDoors = $('#eledoorl, #eledoorr');
            // If doors are open, play animation to close.
            elevatorDoors.css('animation-play-state', 'running');
            $('#eledoorr').css('animation-name', 'reverseDoors2'); 
            $('#eledoorl').css('animation-name', 'reverseDoors1');
            elevatorDoors.css('animation-duration', '4s'); 
            console.log("Should be closing doors");
            waitingDoorButton();
            setTimeout(loadNewFloorButton, 4000)
            setTimeout(4000, doorsMoving.play())
            console.log("Should not be fetching new art")
        }
        // Toggle the animation state
        doorsOpen = !doorsOpen;   
    });
// ************************************************************** Elevator Door Animation Func ******************************************************** //
    function openElevatorDoors() {
        // Toggle the animation-play-state to 'running' to start the animation
        $('#eledoorl, #eledoorr').css('animation-play-state', 'running');
        doorsMoving.play()
    }
// ************************************************************** Fetch new floor ********************************************************************* //
    function openDoorsNewFloor(){
        const elevatorDoors = $('#eledoorl, #eledoorr');
        $('#eledoorr').css('animation-name', 'openDoors'); 
        $('#eledoorl').css('animation-name', 'openDoors2');
        elevatorDoors.css('animation-duration', '4s');
        console.log("Should be opening doors");
        waitingDoorButton();
        setTimeout(loadCloseDoorButton, 4000)
        setTimeout(4000, doorsMoving.play())
        ding.play()
        console.log("tester")
    }
// ************************************************************** Randomly change background ******************************************************** //
     function changeBackground() {
        const backgroundImages = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg5.jpg', 'bg7.jpg', 'bg8.jpg', 'bg9.jpg', 'bg10.jpg', 'bg11.jpg','bg12.jpg','bg13.jpg','bg14.jpg','bg15.jpg','bg16.jpg','bg17.jpg','bg18.jpg' ];
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        const selectedImage = backgroundImages[randomIndex];
        $('#artwork-container').css('background-image', `url(backgrounds/${selectedImage})`);
     }
     function loadNewFloorButton(){
        $('#newfloorbutton').text('New Floor');
     }
     function loadCloseDoorButton(){
        $('#newfloorbutton').text('Close Doors');
     }
     function waitingDoorButton(){
        $('#newfloorbutton').text('Waiting...');
     }
});
