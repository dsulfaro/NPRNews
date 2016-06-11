$(document).ready(function(){
  $('#randomVal').mouseenter(animateBorder);
  $('#randomVal').mouseout(animateBorder2)
  $('#searchVal').mouseenter(animateBorder);
  $('#searchVal').mouseout(animateBorder2);
  $('#searchVal').keypress(function(event){
    if (event.keyCode == 13 || event.which == 13){
      event.preventDefault();
      wikiData();
    }
  });
  $('#go').click(function(event){
    event.preventDefault();
    wikiData();
  });
});

var animateBorder = function(){
  $(this).animate({borderRadius: 0, backgroundColor: "#ff9900"}, 100);
  if ($(this).attr('id') == 'searchVal'){
    $('.btn').animate({backgroundColor: "#ff9900"}, 100);
  }
};

var animateBorder2 = function(){
  $(this).animate({borderRadius: 40, backgroundColor: "#330033"}, 100);
  if ($(this).attr('id') == 'searchVal'){
    $('.btn').animate({backgroundColor: "#330033"}, 100);
  }
};

var wikiData = function(){
  var search = $("#searchVal").val();
  //var api = "http://en.wikipedia.org/w/api.php?format=json&action=query&titles=" + search + "&prop=extracts&exintro=&rvprop=content&callback=?";
  var api = "https://en.wikipedia.org//w/api.php?action=query&prop=extracts|info&format=json&exsentences=1&exlimit=10&exintro=&explaintext=&inprop=url&generator=search&redirects=&gsrsearch="+search+"&gsrlimit=10&callback=?";
  $.getJSON(api, function(data){
    var str = JSON.stringify(data.query.pages);
    var obj = JSON.parse(str);
    var keys = [];
    for (var prop in obj){
      keys.push(prop);
    }
    displayContent(obj, keys);
  });
};

function displayContent(obj, keys){
  $('#title').animate({
        'marginTop' : "-=30px",
        'marginBottom' : "+=30px"
        });
  $('#random').delay(200).fadeOut("fast");
  $('#or').delay(100).fadeOut("fast");
  $('#search').delay(20).fadeOut("fast");
  for(var i = 0; i < keys.length; ++i){
    var title = obj[keys[i]].title;
    var extract = obj[keys[i]].extract;
    var link = obj[keys[i]].fullurl;
    $('body').append("<div class='result'>" +
                     "<a href=" + "'" + link + "'" + "target='_blank'" +
                     "<h3 id='art'>" + title + "</h3>" +
                     "<h4>" + extract + "</h4>" +
                     "</a>" +
                     "</div><br><br>");
  }
  $('.result').mouseenter(animateBorder);
  $('.result').mouseleave(animateBorder2);
  $('body').append('<h3>Refresh page to do another search</h3>');
};