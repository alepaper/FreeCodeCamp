var temp = 0;
// var icon='<i class="wi wi-celsius"></i>';
var icon='&deg;';
var latitude=6.222527299999999;
var longitude=-75.5740975;
var geo_options = {
        enableHighAccuracy: true,
        maximumAge : 30000,
        timeout : 27000
        };

    function escribirClima(){
          if(navigator.geolocation){
              navigator.geolocation.getCurrentPosition(success, error, geo_options);
          } else {
              alert("El servicio de Geolocalización no está disponible en su navegador");
          }
    }

    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        var altitude = position.coords.altitude;
        var accuracy = position.coords.accuracy;
        escribir(latitude,longitude);
    }

    function error(error) {
        alert("Imposible obtener su geolocalización debido a: "+error.code + " : " + error.message);
        escribir(latitude,longitude);
    };
  //       $.simpleWeather({
  //   location: 'Austin, TX',
    // woeid: '',http://uxrepo.com/static/icon-sets/windows/svg/thermometer-celcius.svg
  //   unit: 'c',
  //   success: function(weather) {
  //     html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
  //     html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
  //     html += '<li class="currently">'+weather.currently+'</li>';
  //     html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';

  //     $("#clima").html(html);
  //   },
  //   error: function(error) {
  //     $("#frasesaleatorias").html('<p>'+error+'</p>');
  //   }
  // });

    function escribir (lat, lon) {
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather',
            type: 'GET',
            data: {
                lat:lat,
                lon:lon,
                APPID: '754edee575b3da22621576c73adc95f9',
                units: 'metric'
            },
        })
        .done(function(data) {
            temp=data.main.temp;
            $('#temp').html(' ' + temp.toFixed(2) + icon);
            $('#toc').prop("class","wi wi-celsius");
            $('#tof').prop("class","wi wi-fahrenheit");
            $('#pic1').html('<i class="pic wi wi-owm-' + data.weather[0].id + '"></i>');
            $('#pic2').html('<i class="pic wi wi-windy"></i>');
            $('#pic1').append('<h2>' + data.weather[0].description + '</h2>');
            $('#pic2').append('<h2>Wind</h2>');
            $('#pic2').append('<h3>Speed: ' + data.wind.speed + ' <i class="wi wi-wind-beaufort-'
                + Math.round(data.wind.speed) + '"></i></h3>');
            $('#pic2').append('<h3>Direction: ' + data.wind.deg +
             '&deg; <i class="wi wi-wind from-' + data.wind.deg +
             '-deg"></i></h3>');

        });
    }

    function cambio () {
         if ($('#toc').css('opacity')=='1') {
             $('#tof').css('opacity','1');
             $('#toc').css('opacity','0.5');
             temp=temp*9/5+32;
             // icon='<i class="wi wi-fahrenheit"></i>';
         } else {
             $('#toc').css('opacity','1');
             $('#tof').css('opacity','0.5');
             temp=(temp-32)*5/9;
             // icon='<i class="wi wi-celsius"></i>';
         }
         $('#temp').html(' ' + temp.toFixed(2) + icon);
    }

    $(document).ready(function() {
        escribirClima();
        $('#toc').on('click',cambio);
        $('#tof').on('click',cambio);
    });
