//AIzaSyDWmVsJoqFRi5hs6pFjPFZuz5hw64zG40E

$('#SearchYoutube').submit( function (event) {
    event.preventDefault();
    let strThingToSearch = event.currentTarget['0'].value;

    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search',
        type: 'GET',
        data: {
            'key': 'AIzaSyDWmVsJoqFRi5hs6pFjPFZuz5hw64zG40E',
            'part': 'id, snippet',
            'q': 'dog',
            'maxResults': '10'
        }
    }).done((result) => {
        console.log(result);
    }).fail((error) => {
        console.log(error);
    });

});
