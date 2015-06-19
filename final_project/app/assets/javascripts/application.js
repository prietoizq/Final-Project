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
//= require underscore
//= require gmaps/google



//FUNCION PARA EXPANDIR LOS MENUS DE USUARIO
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


$(document).ready(function(){

//FUNCION PARA FILTRAR LAS FOTOS CON AJAX

    $('#search-button').on("click", function(){
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/photos",
            data: "",
            success: function(response){populate_page(response)},
            error: function(){alert("Success: false");},
            dataType: "json",
        });
    });

    function populate_page(items){

        //Segun la seleccion del usuario, la variable choice adquiere un texto
        var $choice = $('p.multiSel').text();

        $('.photo-container').addClass( "old-photo" );
        
        total_length = items.length;
        for(var i=0; i<total_length; i++){
            //a la hora de seleccionar las fotos, se evalua si el tema de la foto esta contenido en choice
            if($choice.includes(items[i].direction)){
                $.ajax({
                    url: "/images/search",
                    data: {item: items[i].id},
                    success: function(response){$('.photo-list').append(response)},
                    error: function(){console.log("Error")},
                    dataType: "html",
                })
            };       
        };

        $(".old-photo").hide(3000,"swing",function(){}).delay(3000);
        $(".old-photo").remove(10000);      
         //con esto vaciamos el interior de la lista y nos quedamos solo con las nuevas fotos
    };


// SCRIPT PARA PODER ESCOGER EN EL MAPA LOS TIPOS DE LUGARES PREFERIDOS

    $('#search-in-map').on("click", function(){
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/photos",
            data: "",
            success: function(response){populate_map(response)},
            error: function(){alert("Success: false");},
            dataType: "json",
        });
    });

    function populate_map(items){

        //Segun la seleccion del usuario, la variable choice adquiere un texto
        var $choice = $('p.multiSel').text();
        
        var total_length = items.length;
        var array_ids = [];

        for(var i=0; i<total_length; i++){
            if($choice.includes(items[i].direction)){
                array_ids.push(items[i].id);
            }; 
        };

        $('#mapa-space').next().remove();

        $.ajax({
            url: "/images/update_map",
            data: {item: array_ids},
            success: function(response){$('#mapa-space').after(response)},
            error: function(){console.log("Error")},
            dataType: "html",
        })     
    };


//FUNCION PARA EL BOTON DESPLEGABLE DE FILTROS
    $(".dropdown dt a").on('click', function () {
          $(".dropdown dd ul").slideToggle('fast');
      });

      $(".dropdown dd ul li a").on('click', function () {
          $(".dropdown dd ul").hide();
      });

      function getSelectedValue(id) {
           return $("#" + id).find("dt a span.value").html();
      }

      $(document).bind('click', function (e) {
          var $clicked = $(e.target);
          if (!$clicked.parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
    });


    $('.multiselect input[type="checkbox"]').on('click', function () {
        
          var title = $(this).closest('.multiselect').find('input[type="checkbox"]').val(),
              title = $(this).val() + ",";
        
          if ($(this).is(':checked')) {
              var html = '<span title="' + title + '">' + title + '</span>';
              $('.multiSel').append(html);
              $(".hida").hide();
          } 
          else {
              $('span[title="' + title + '"]').remove();
              var ret = $(".hida");
              $('.dropdown dt a').append(ret);        
          }
    });


});


