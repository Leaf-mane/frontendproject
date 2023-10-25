$(document).ready(function() {
    let userInput = '';
    $('#searchButton').on('click', function() {
        userInput = $('#movieSearch').val();
        let apiKey = 'UF8yV7gC2w9jWTTAKMiGpPmB7xAgcSJdA9iA8Wqh';
        let searchField = 'name';
        let searchValue = userInput;

        let url = `https://api.watchmode.com/v1/search/?apiKey=${apiKey}&search_field=${searchField}&search_value=${searchValue}`;

        // API request using the user input
        $.get(url, function(data) {
            // Clear any previous results
            $('#resultsList').empty();

            if (data.title_results.length > 0) {
                // Loop through the title results and display them in a list
                data.title_results.forEach(function(result) {
                    $('#resultsList').append(
                        `<li>
                            <a href="#" class="result-link" data-id="${result.id}">${result.name}</a>
                        </li>`
                    );
                });

                //click event for the result links
                $('.result-link').on('click', function() {
                    // Get the selected result's ID
                    let selectedId = $(this).data('id');
                    let titleSearch = `https://api.watchmode.com/v1/title/${selectedId}/details/?apiKey=${apiKey}`;
                    $.get(titleSearch, function(data) {
                        console.log(data);
                    }).fail(function(error) {
                        console.error('Error:', error);
                    });
                    console.log('Selected ID: ' + selectedId);
                });
            } else {
                $('#resultsList').append('<li>No results found.</li>');
            }
        }).fail(function(error) {
            console.error('Error:', error);
        });
    });

});