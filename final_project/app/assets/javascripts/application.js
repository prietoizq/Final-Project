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

function initialize() {

    var mapOptions = {
      center: { lat: -34.397, lng: 150.644},
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    var map = new google.maps.Map(document.getElementById('mapa_div'), mapOptions);

    var pos = new google.maps.LatLng(-34.397, 150.644);
     
    var marker = new google.maps.Marker({
          position: pos,
          map: map,
          draggable: true,
          title:"Esto es un marcador",
          animation: google.maps.Animation.DROP
      });

    google.maps.event.addListener(marker, 'click', funcionClick);

    function funcionClick() {
        if (marker.getAnimation() != null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }
};

google.maps.event.addDomListener(window, 'load', initialize);

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

