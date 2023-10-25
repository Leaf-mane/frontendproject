$(document).ready(function() {
    const apiKey = '0YxvJxV6';
    const apiEndpoint = 'https://www.rijksmuseum.nl/api/nl/collection';
    
    // Gets and displays random art
    function getRandomArtwork() {
        // Define a random page number to request different results each time
        const randomPage = Math.floor(Math.random() * 10) + 1;

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
            },
            success: function(data) {
                // Check if there are any artworks in the response
                if (data.artObjects && data.artObjects.length > 0) {
                    // Randomly select an artwork
                    const randomIndex = Math.floor(Math.random() * data.artObjects.length);
                    const artwork = data.artObjects[randomIndex];

                    //art details
                    $('#artwork-image').attr('src', artwork.webImage.url);
                    $('#artwork-title').text(artwork.title);
                    $('#artwork-artist').text(artwork.principalOrFirstMaker);
                } else {
                    // No art found in the response
                    $('#artwork-image').attr('src', '');
                    $('#artwork-title').text('No artworks found');
                    $('#artwork-artist').text('');
                }
            }
        });
    }

    // Attach click event to the button
    $('#get-random-artwork').on('click', getRandomArtwork);

    // Get a random artwork when the page loads
    getRandomArtwork();
});
