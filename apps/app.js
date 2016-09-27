// Document ready
$(function() {
  $('#search-term').submit(function(event) {
    event.preventDefault();
    var searchTerm = $('#query').val();
    getRequest(searchTerm);
  });
});

// functions
function getRequest(searchTerm) {
  var params = {
    q: searchTerm,
    r: 'json',
    part: 'snippet',
    key: 'AIzaSyAl8MQs9yrcwaWGtqEZWlGgwsvJO4HVyvw'

  };
  url = 'https://www.googleapis.com/youtube/v3/search';

  $.getJSON(url, params, function(data) {
    // console.log(data.items[0]);
    showResults(data.items);
  });
}

function showResults(results) {
  console.log(results);
  var html = "";
  $.each(results, function(index, value) {
    var desc = this.snippet.description;
    var shortDesc = $.trim(desc).substring(0, 40).split(" ").slice(0, -1).join(" ") + "...";
    html += '<div class="col-md-4"><div class="thumbnail"><div class="caption"><h4>' + this.snippet.title + '</h4><p>' + shortDesc + '</p><p><a href="https://www.youtube.com/watch?v=' + this.id.videoId + '" class="btn btn-danger btn-sm popup-youtube" rel="tooltip" title="watch video">Watch Video</a></p></div> <img src="' + this.snippet.thumbnails.high.url + '" alt="..." class="img-responsive"> </div></div>';

    // console.log(this.snippet.title);
  });
  $('#search-results').html(html);
  toolHover();
  popUp();

}

function toolHover() {
  $("[rel='tooltip']").tooltip();
  $('.thumbnail').hover(
    function() {
      $(this).find('.caption').fadeIn(); //.fadeIn(250)
    },
    function() {
      $(this).find('.caption').fadeOut(); //.fadeOut(205)
    }
  );
}
function popUp() {
  $('.popup-youtube').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });
}
