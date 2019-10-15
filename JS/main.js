let previousToken = '';
let nextToken = '';
let strThingToSearch = '';

//----------------------------------------------------------
$('#SearchYoutube').submit( function (event) {
    event.preventDefault();
    strThingToSearch = event.currentTarget['0'].value;

    _deletePreviousData();
    _addSpinner();
    _askForSearch(strThingToSearch, '');
});

//----------------------------------------------------------
$('#Next').click(function (event) {
  if(nextToken) {
      _deletePreviousData();
      _addSpinner();
      _askForSearch(strThingToSearch, nextToken);
  }
});

//----------------------------------------------------------
$('#Prev').click(function (event) {
    if(previousToken) {
        _deletePreviousData();
        _addSpinner();
        _askForSearch(strThingToSearch, previousToken);
    }
});

//----------------------------------------------------------
function _askForSearch(strTermToSearch, pageToken) {

    let resultOFSearch = [];

    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search',
        type: 'GET',
        data: {
            'key': 'AIzaSyDWmVsJoqFRi5hs6pFjPFZuz5hw64zG40E',
            'part': 'id, snippet',
            'q': strTermToSearch,
            'maxResults': '10',
            'pageToken': pageToken
        }
    }).done((result) => {
        console.log(result);

        nextToken = result.nextPageToken;
        previousToken = result.prevPageToken;

        _deletePreviousData();
        resultOFSearch = result.items;

        let DisplayVideos = [];
        for (item of resultOFSearch) {

            DisplayVideos.push(
                '<div class="video">' +
                '<a target="_blank" href="https://www.youtube.com/watch?v=' + item.id.videoId + '">' +
                '<img src=" '+ item.snippet.thumbnails.default.url + ' ">' +
                '<h3>'+ item.snippet.title + '</h3>' +
                '</a>' +
                '</div>'
            );
        }

        $('.videoContainer').append(DisplayVideos);

    }).fail((error) => {
        console.log(error);
    });
}

//----------------------------------------------------------
function _deletePreviousData() {
    $('.videoContainer').empty();
}

//----------------------------------------------------------
function _addSpinner() {

    $('.videoContainer').append(
        '<div class="containerSpinner">' +
        '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>' +
        '</div>'
    );
}
