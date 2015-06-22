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

//FUNCION PARA LIKE

    var url_path = window.location.pathname;
    
    $(".btn-like").on("click", function(){
        $.ajax({
            url: url_path,
            data: "",
            success: function(response){increase_like(response)},
            error: function(){alert("Success: false");},
            dataType: "json",

        });
    });

    function increase_like(object){

        var user_welcome = $("#user-name").text();
        var user_name = user_welcome.substring(8, user_welcome.length);

        console.log(object.users_likes);

        var found = $.inArray(user_name, object.users_likes) == -1;
        console.log(found);

        if(found==true){
            var new_url = url_path.concat('/like');

            $.ajax({
                type: "GET",
                url: new_url,
                data: "",
                success: function(response){console.log(object)},
                error: function(){alert("Success: false2");},
                dataType: "json",
            });

            var $number_likes = $(".like").text();
            $number_likes = parseInt($number_likes) + 1;
            $(".like").text($number_likes+" ");             
        }else{
            alert("NO PUEDES VOTAR MAS");
        };
    };

//FUNCION PARA EL BOTON DE FILTROS

    var array_selected = [];

    $("label").on('click', function(){
        var tag = $(this).children("input").attr("value");
        var found = array_selected.indexOf(tag);
        if(found>-1){
            array_selected.splice(found, 1)}
        else{
            array_selected.push(tag);
        };
        console.log(array_selected);
    });


//FUNCION PARA FILTRAR LAS FOTOS CON AJAX
//estas funciones cogen el valor array_selected obtenido en los puntos anteriores

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
            var found = $.inArray(items[i].theme, array_selected) > -1;
            //a la hora de seleccionar las fotos, se evalua si el tema de la foto esta contenido en choice
            if(found){
                $.ajax({
                    url: "/images/search",
                    data: {item: items[i].id},
                    success: function(response){$('.photo-list').append(response).fadeIn('slow')},
                    error: function(){console.log("Error")},
                    dataType: "html",
                })
            };       
        };

        $(".old-photo").hide(3000,"swing",function(){}).delay(3000);
        $(".old-photo").remove(3000);
    
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

        var total_length = items.length;
        var array_ids = [];

        for(var i=0; i<total_length; i++){
            var found = $.inArray(items[i].theme, array_selected) > -1;
            //a la hora de seleccionar las fotos, se evalua si el tema de la foto esta contenido en choice
            if(found){
                array_ids.push(items[i].id)
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

});


