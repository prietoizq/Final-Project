// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs

//= require_tree .


//a partir de aquí, es para convertir la DIRECCIÓN en una longitud y latitud, y mostrarlas en el mapa

geocoder = new google.maps.Geocoder();

function getCoordinates(address, callback){
    var coordinates;
    geocoder.geocode({address: address}, function(results, status){
        coords_obj = results[0].geometry.location;
        coordinates = [coords_obj.A,coords_obj.F];
        callback(coordinates);
    });
};

google.maps.visualRefresh = true;
var map;

function initialize() {   

    var direction = $('.direction').text();

    getCoordinates(direction, function(coords){
        var mapOptions = {
            zoom: 14,
            center: {lat: coords[0], lng: coords[1]},
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        };

        var pos = new google.maps.LatLng(coords[0], coords[1]);

        map = new google.maps.Map(document.getElementById('mapa_div'), mapOptions);
         
        var marker = new google.maps.Marker({
              position: pos,
              map: map,
              title:"Esto es un marcador",
              animation: google.maps.Animation.DROP
        });

        function createInfoWindow(text){
          var infowindow = new google.maps.InfoWindow({
            content: text
          });
          return infowindow;
        }

        var title = $('.title').text();

        var info = createInfoWindow(title);
        google.maps.event.addListener(marker, 'click', function(){
            info.open(map,marker);
        });
        });
};

google.maps.event.addDomListener(window, 'load', initialize);

    //hasta aquí, es para convertir la DIRECCIÓN en una longitud y latitud, y mostrarlas en el mapa


jQuery(function ($) {
    $('.panel-heading span.clickable').on("click", function (e) {
        if ($(this).hasClass('panel-collapsed')) {
            // expand the panel
            $(this).parents('.panel').find('.panel-body').slideDown();
            $(this).removeClass('panel-collapsed');
            $(this).find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        }
        else {
            // collapse the panel
            $(this).parents('.panel').find('.panel-body').slideUp();
            $(this).addClass('panel-collapsed');
            $(this).find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        }
    });
});

