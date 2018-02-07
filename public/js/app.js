/*global $*/

// **************INITIATE LESS.JS****************
window.less = {
    async: true,
    environment: 'production',
    fileAsync: false,
    onReady: false,
    useFileCache: true
};
/////////////////////////////////////////////////


// **************DROPDOWNS AND SIDE MENU ACCORDIAN****************

$('.ui.accordion').accordion();

$('.profileMenu')
  .dropdown()
;

/////////////////////////////////////////////////


// **************HANDLE SUCCESS AND ERROR POPUPS****************
setTimeout(function(){$('.success_alerts').fadeOut();}, 5000);
        
$(window).click(function(){$('.error_alerts').fadeOut();});

/////////////////////////////////////////////////


// **************DESTROY POPUPS ON SMALL SCREENS****************
// **************SHOW ARROWS ON NEWS BUTTONS MOBILE****************
$(document).ready(function() {
    $(window).resize(function() {
        // This will fire each time the window is resized:
        if($(window).width() >= 1024) {
            $('.activating.element')
              .popup({
                  position: "bottom right"
              });
        } else {
           $('.activating.element')
              .popup('destroy');
        }
        
        if($(window).width() >= 1024) {
            $('.slick-nav').removeClass('hidden');
        } else {
            $('.slick-nav').addClass('hidden');
        }
    }).resize(); // This will simulate a resize to trigger the initial run.
});
/////////////////////////////////////////////////



// **************FETCH NEWS FROM API AT /newsResults ROUTE****************

function getTechNews(source){

 $.ajax({
            type: "POST",
            dataType: 'json',
            url: "/newsResults",
            data: {source: source},
 }).done(function(data) {
      updateList(data);
 }).fail(function(err){
      console.log(err);
 });
}

/////////////////////////////////////////////////


// **************ADJUST NEWS BUTTONS TO REFLECT CURRENT NEWS SOURCE****************

$('.news.button').on('click', function(){
  $('.news.button').removeClass('orange');
  $('.news.button').addClass('teal');
  $(this).removeClass('teal');
  $(this).addClass('orange');
});

/////////////////////////////////////////////////


// **************CREATE SLIDER FOR NEWS BUTTONS ON SMALLER SCREENS****************

$('#readNews').slick({
          dots: false,
          infinite: true,
          speed: 300,
          rows: 0,
          slidesToShow: 6,
          responsive: [
            {
              breakpoint: 1530,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
              }
            },
            {
              breakpoint: 1050,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            }
  ]
});

/////////////////////////////////////////////////


// **************CREATE NEWS FEED AND SLICK SLIDER****************

function updateList(newData) {
    var articles = newData.articles;
    var ul = document.getElementById('headlines');
    destroyCarousel();
    ul.innerHTML = "";
    articles.forEach(function (article){
      
      var imgurl = article.urlToImage;

      if($.isEmptyObject(imgurl)){
        imgurl = "https://semantic-ui.com/images/wireframe/image.png";
      }
      
      var n = imgurl.search("https");
      var newimgUrl;
      
      if (n == -1) {
        newimgUrl = imgurl.replace("http", "https");
      } else {
        newimgUrl = imgurl;
      }
          
        var html =  '<div class="card"><a class="image" target="_blank" href="' + article.url + '">' +
                            '<img class="newsImg backup_picture" src="' + newimgUrl +'">' +
                        '</a>' +
                        '<div class="content">' +
                            '<a class="header" target="_blank" href="' + article.url + '">' +
                                article.title +
                            '</a>' +
                        '</div>' +
                        '</div>';
                            
        $('#headlines').append(html);

});

$('#headlines').slick({
          dots: true,
          infinite: true,
          speed: 300,
          rows: 0,
          slidesToShow: 5,
          slidesToScroll: 5,
          prevArrow: $(".prev-slide"),
          nextArrow: $(".next-slide"),
          responsive: [
            {
              breakpoint: 2380,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 1900,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 1530,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 490,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false
              }
            }
  ]
});

$('.slick-track').addClass("ui cards");

$(".backup_picture").on("error", function(){
        $(this).attr('src', 'https://semantic-ui.com/images/wireframe/image.png');
    });

}


// **************FUNCTION TO DESTROY SLICK SLIDER****************

function destroyCarousel() {
  if ($('#headlines').hasClass('slick-initialized')) {
    $('#headlines').slick('unslick');
  }      
}


/////////////////////////////////////////////////

  
// ****************************WEATHER WIDGET*****************************

$(document).ready(function() {
  
  const hours = new Date().getHours();
  const isDayTime = hours > 6 && hours < 20;

      $.getJSON("https://api.openweathermap.org/data/2.5/weather?id=4299276&appid=bf1f1e70fce9ab83d909874019fac2e3", function(json) {
        $('#city').html('<i class="fa fa-map-marker" aria-hidden="true"></i>' + json.name);
        $('#weather-status').html(json.weather[0].main + " / " + json.weather[0].description);
        console.log(json.weather[0].main);
        
        // https://openweathermap.org/weather-conditions
        
        //WEATHER CONDITIONS FOUND HERE: http://openweathermap.org/weather-conditions
        switch (json.weather[0].main) {
          case "Clouds":
            $('.top-left').html('<img class="weather-icon" title="' + json.weather[0].main + '" src="/images/cloudy.png">');
            break;
          case "Clear":
            if(isDayTime){
              $('.top-left').html('<img class="weather-icon" title="' + json.weather[0].main + '" src="/images/sunny.png">');
            } else {
              $('.top-left').html('<img class="weather-icon" title="' + json.weather[0].main + '" src="/images/moon.png">');
            }
            break;
          case "Thunderstorm":
            $('.top-left').html('<img class="weather-icon" title="' + json.weather[0].main + '" src="/images/thunderstorm.png">');
            break;
          case "Drizzle":
            $('.top-left').html('<img class="weather-icon" title="' + json.weather[0].main + '" src="/images/drizzle.png">');
            break;
          case "Mist":
            $('.top-left').html('<img class="weather-icon" title="' + json.weather[0].main + '" src="/images/drizzle.png">');
            break;
          case "Rain":
            $('.top-left').html('<img class="weather-icon" title="' + json.weather[0].main + '" src="/images/rain.png">');
            break;
          case "Snow":
            $('.top-left').html('<img class="weather-icon" title="' + json.weather[0].main + '" src="/images/snow.png">');
            break;
          case "Extreme":
            $('.top-left').html('<img class="weather-icon" title="' + json.weather[0].main + '" src="/images/warning.png">');
            break;
        }

        var temp = (json.main.temp -273);
        $('#temperature').html('<i class="fa fa-thermometer-full" aria-hidden="true"></i>' + Math.round(temp * 1.8 + 32) + '&deg F');
    
      });

    });
    
    
  