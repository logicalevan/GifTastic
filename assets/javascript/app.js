$(document).ready(function() {

var heroes = [
  'Madara', 'Might Guy', 'Sasuke', 'Hinata', 'Shino', 'Kakashi', 'Deidara', 'Naruto',
];

/*-------------------------------------
| on load
-------------------------------------*/

findHero('Itachi');

function addHero(keyword){
  var heroButton = $('<a>');
  heroButton.html(keyword);
  $('.hashtag').append(heroButton);
}

for (var i=0; i<heroes.length; i++){
  addHero(heroes[i]);
}

/*-------------------------------------
| search function
-------------------------------------*/

var resultArray;
/* global -------------------------------*/

function findHero(userSearch) {
  $('#result').empty();
  $('#tag h2').html(userSearch);

  var queryURL = $.get("https://api.giphy.com/v1/gifs/search?q=" + userSearch + "&api_key=QDXHFmXllVMTU7lWhz9Ll9ulsJaO0oQD&limit=10");

  // $.ajax({
  //   url: queryURL,
  //   method: "GET"
  // }).done(function (response) {
  //   console.log(response);
  // });

  queryURL.done(function(data) {
    resultArray = data.data;
    /* search result array of 10 objects -------------------------------*/
    console.log(resultArray);

    for(var i=0; i<resultArray.length; i++){
      var imgURL = resultArray[i].images['480w_still'].url;
      var imgRate = resultArray[i].rating;
      var imgHTML = '<img src="' + imgURL + '" index="' + i + '">';

      $('#result').append('<div class="box">' + imgHTML + '</div>');
      $('.box:eq('+ i + ')').append('<p>Rating: ' + imgRate + '</p>');
    }
  });

}

/*-------------------------------------
| search function calls
-------------------------------------*/

$('.search button').on('click', function(){
  var userSearch = $('.search input').val();
  var isletter = /^[a-zA-Z]+$/.test(userSearch);
  if(isletter){
    addHero(userSearch);
    findHero(userSearch);
  } else {
    $('.search input').val('This is not a hero!');
  }
});

$('.hashtag a').on('click', function(){
  var userSearch = $(this).html();
  findHero(userSearch);
});

/*-------------------------------------
| click to animate
-------------------------------------*/

$(document).on('click', '.box img', function(){
  var i = $(this).attr('index');
  var imgGif = resultArray[i].images.downsized.url;
  var imgSrc = $(this).attr('src');

  if(imgSrc === imgGif){
    imgSrc = resultArray[i].images['480w_still'].url;
  } else {
    imgSrc = imgGif;
  }

  $(this).attr('src', imgSrc);
});


/* document.ready -------------------------------*/
});
