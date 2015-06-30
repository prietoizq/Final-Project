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

        var found = $.inArray(user_name, object.users_likes) == -1;

        if(found==true){
            var new_url = url_path.concat('/like');

            $.ajax({
                type: "GET",
                url: new_url,
                data: "",
                success: function(response){},
                error: function(){alert("Success: false2");},
                dataType: "json",
            });

            var $number_likes = $(".like").text();
            $number_likes = parseInt($number_likes) + 1;
            $(".like").text($number_likes+" ");             
        }else{
            create_alert("Sorry, you have already voted!");
        };
    };

//FUNCION PARA CREAR UNA ALERTA

    function create_alert(message){

        $("body").append(
            '<div class="alert alert-danger custom-alert" role="alert">'+
                '<strong>'+message+'</strong>'+
            '</div>'
        ).fadeIn('slow');

        $(".custom-alert").delay(3000).fadeOut(2500,"swing",function(){});

        setTimeout(function(){
            $(".custom-alert:hidden").remove();
            }, 3500);
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
    });


//INICIALIZO LAS VARIABLES USADAS EN LOS SCRIPTS PARA LA VISTA PHOTOS
    var counter = 0;
    var i = 0;
    var started = true;
    //started es true hasta que se de click al primer boton, tras lo cual ya se filtra.
    //esto vale para que al principio se muestren TODAS las fotos sin filtro

    if(started){
        $.ajax({
                type: "GET",
                url: "http://localhost:3000/photos",
                data: "",
                success: function(response){populate_page(response)},
                error: function(){alert("Success: false");},
                dataType: "json",
        });
    };

// FUNCION PARA HACER SCROLL Y RECARGAR ELEMENTOS
    $(window).scroll(function() {
       if($(window).scrollTop() + $(window).height() == $(document).height()) {
            $.ajax({
                type: "GET",
                url: "http://localhost:3000/photos",
                data: "",
                success: function(response){populate_page(response)},
                error: function(){alert("Success: false");},
                dataType: "json",
            });
        };
    });

//FUNCION PARA FILTRAR LAS FOTOS CON AJAX
//estas funciones cogen el valor array_selected obtenido en los puntos anteriores

    $('#search-button').on("click", function(){
        i = 0;
        started = false;
        $('.photo-container').addClass( "old-photo" );

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

        counter = 0;        
        total_length = items.length;

        
            while((counter<6)&&(i<total_length)){

                var found = $.inArray(items[i].theme, array_selected) > -1;
                //a la hora de seleccionar las fotos, se evalua si el tema de la foto esta contenido en choice
                if(started){found=true};
                if(found){
                    counter = counter + 1;
                    $.ajax({
                        url: "/images/search",
                        data: {item: items[i].id},
                        success: function(response){$('.photo-list').append(response).fadeIn('slow')},
                        error: function(){console.log("Error")},
                        dataType: "html",
                    })
                };
                i = i + 1;       
            };

        $(".old-photo").hide(3000,"swing",function(){});

        setTimeout(function(){
            $(".old-photo:hidden").remove();
        }, 3000);
    
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

        if(typeof array_ids[0] === 'undefined'){create_alert("There aren't element with this search")};

        $('#mapa-space').next().remove();

        $.ajax({
            url: "/images/update_map",
            data: {item: array_ids},
            success: function(response){$('#mapa-space').after(response)},
            error: function(){console.log("Error")},
            dataType: "html",
        })     
    };

    //FUNCION PARA CREAR EFECTOS EN LAS IMAGENES ORIGINALES

    $("#gray").on('click', change_class("#gray", "gray", "#image"));
    $("#saturate").on('click', change_class("#saturate", "saturate", "#image"));    
    $("#contrast").on('click', change_class("#contrast", "contrast", "#image"));
    $("#blur").on('click', change_class("#blur", "blur", "#image"));
    $("#invert").on('click', change_class("#invert", "invert", "#image"));
    $("#rotate").on('click', change_class("#rotate", "rotate", "#image"));

    function change_class(id_button, class_image, image){
        $(id_button).on('click', function(){
            if($(image).hasClass(class_image)){
                $(image).removeClass(class_image);
            }else{
                $(image).addClass(class_image);
            };
        });
    };

});


