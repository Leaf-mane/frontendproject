$(document).ready(function() {
    const apiKey = '0YxvJxV6';
    const apiEndpoint = 'https://www.rijksmuseum.nl/api/nl/collection';
    
    // Gets and displays random art
    function getRandomArtwork() {
        // Define a random page number to request different results each time
        const randomPage = Math.floor(Math.random() * 10) + 1;
        const totalPages = 5;
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
                    
                    console.log("Applying artwork")
                    $('#artwork-title').text(artwork.title);
                    $('#artwork-artist').text(artwork.principalOrFirstMaker);
                    if (artwork.plaqueDescription) {
                        $('#artwork-description').text(artwork.plaqueDescription);
                    } else {
                        // No description found in the response
                        $('#artwork-description').text('Try again :)');
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

    $('#enter-button').on('click', function() {
        // Append the content from the hidden container to the artwork container
        $('#artwork-container').append($('#hidden-content').html());
        setTimeout(openElevatorDoors, 6000);
        // Trigger the getRandomArtwork function to fetch and display random artwork
        getRandomArtwork();
        // Hide the "Enter" button
        $('#enter-button').hide();
    });
    // Attach click event to the button
    $(document).on('click', '#get-random-artwork', getRandomArtwork);
    console.log("Click detected on artwork button")
    // Get a random artwork when the page loads
    // getRandomArtwork();
    function openElevatorDoors() {
        // Toggle the animation-play-state to 'running' to start the animation
        $('#eledoorl, #eledoorr').css('animation-play-state', 'running');
    }
    
    // Call the function when needed, e.g., when the "Open Doors" button is clicked
    
});
