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

//FUNCION PARA FILTRAR LAS FOTOS CON AJAX
$(document).ready(function(){

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
        $('.photo-container').addClass( "old-photo" );
        total_length = items.length;

        for(var i=0; i<total_length; i++){
            if(items[i].direction=='direction'){
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
         //con esto vaciamos el interior de la lista y nos quedamos con el UL
    };
});


