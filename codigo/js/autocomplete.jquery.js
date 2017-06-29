/************************************************************************************/
/************************************************************************************/
/************************************************************************************/
/************************************************************************************/
/************************************************************************************/
/************************************************************************************/
/*
    PROYECTO DANE MODERNO
    ********************************************************************************
    ********************************************************************************
    ********************************************************************************
    MÓDULO JAVASCRIPT PARA EL PROCESO DE AUTOCOMPLETACIÓN DINÁMICO
    ********************************************************************************
    ********************************************************************************
    ********************************************************************************

    DIRECCIÓN DE INVESTIGACIONES EN GEOESTADÍSTICA
    GRUPO DE TRABAJO DANE MODERNO
    CENTRO DE EXCELENCIA SOA DE INTEROPERABILIDAD DANE - PROGRAMA GOBIERNO EN LÍNEA

    ELABORÓ:
    INGENIERO JAIME ALBERTO GUTIÉRREZ MEJÍA
    INGENIERO DE DESARROLLO
    CONTRATISTA DE LA DIRECCIÓN DE INVESTIGACIONES EN GEOESTADÍSTICA

    Modulo de autocompletación optimizado para el desarrollo del módulo
    de búsqueda de información Catastral del formulario de e-Censo

    Proyecto colaborativo entre el grupo MODERNIZACIÓN SIGE y el Área de Sistemas del
    Departamento Administrativo Nacional de Estadísticas DANE
*/
/************************************************************************************/
/************************************************************************************/
/************************************************************************************/
/************************************************************************************/
/************************************************************************************/
/************************************************************************************/
/**
 * Plugin  : Autocompletar con jQuery
 *   Autor : Lucas Forchino
 * WebSite : http://www.tutorialjquery.com
 * version : 1.0
 * Licencia: Pueden usar libremenete este código siempre y cuando no sea para 
 *           publicarlo como ejemplo de autocompletar en otro sitio.
 */
/************************************************************************************/
/************************************************************************************/
/************************************************************************************/
/************************************************************************************/
/************************************************************************************/
/************************************************************************************/
var controlAutocomplete = false;
(function($)
{
    // Creo la funcion en el prototype de jQuery de manera de integrarla
    $.fn.autocomplete= function ()
    {
        //puede haber mas de un autocomplete que cargar por eso esto los levanta a todos
        $(this).each(function(){

        // aplico los estilos a los elementos elegidos
        $(this).addClass('autocomplete-jquery-aBox');
            
        // guardo en una variable una nueva funcion que asigna el texto del 
        // link que paso en that al input donde escribimos.
        // esto seleccionaria el link del cuadro autocompletar
        var selectItem = function(that)
        {
            $(".imagenUbicador").remove();
            // partiendo del link busco el input y le asigno el valor del link
            var textSelected = $(that).html().replace("<b>","");
            var posicion=textSelected.search("<");
            var cortado = textSelected.slice(0,posicion);
           $(that).parent().parent().find('input').val(cortado);
            
            //$(that).parent().parent().find('input').val($(that).html());
            // remuevo el cuadro de autocompletar, se supone si ya seleccionaste
            // un valor no se necesita mas
            $(that).parent().remove();
                                
        }

        // busco el input y le asigno un evento al presionar una tecla
        $(this).find('input').bind('keyup',function(event)
        {
            
            var input=$(this);
            if(event.keyCode==8&&input.val().length<direccionCaja.length){
                direccionCaja=input.val();
                if(direccionCaja.length>2)
                {    
                    actualizarListaDireccionesCaja(direccionCaja +"#");
                }
       
            }
                
            var input=$(this);
            // codigo de la tecla persionada
            var code=event.keyCode;
            // si es Enter => seleccionar el link marcado 
            if (code==13 && $('.autocomplete-jquery-mark').size()>0)
            {
                var element=$('.autocomplete-jquery-mark').get(0);
                //alert ("Elemento: " + element);
                selectItem(element);
                //**********************************************
                //**********************************************
                //realizarBusquedaPredio();
                //**********************************************
                //**********************************************
            }
            // si son las flechas => moverse por los links
            else if(code==40 || code ==38)
            {
                elements =$('.autocomplete-jquery-results').find('a');
                var mark =0;
                //*********************************************************
                //*********************************************************
                if ($('.autocomplete-jquery-mark').size()>0)
                {
                    mark=$('.autocomplete-jquery-mark').attr('data-id');

                    $('.autocomplete-jquery-mark').removeClass('autocomplete-jquery-mark');
                         
                    if (code==38)
                    {
                        mark --;
                    }
                    else
                    {
                        mark ++;
                    }
                         
                    if (mark > elements.size())
                    {
                        mark=0;
                    }
                    else 
                    if (mark < 0)
                    {
                        mark=elements.size();
                    }
                }
                //*********************************************************
                //*********************************************************
                elements.each(function()
                {
                    if ($(this).attr('data-id')==mark)
                    {
                        $(this).addClass('autocomplete-jquery-mark');
                    }
                });                             
                //*********************************************************
                //*********************************************************
            }
            // si es una letra o caracter, ejecutar el autocompletar
            // con este filtro solo toma caracteres para la busqueda
            else if((code>47 && code<91)||(code>96 && code<123) || code ==8){
                
                // si presiono me fijo si hay resultados para lo que tengo 
                // tomo la url
                var url = input.attr('data-source');
                // tomo el valor del combo actualmente
                var value = input.val();
                url+=value;
                //busco en el server la info 
                $.getJSON(url,{}, function(data)
                {
                    
                   input.parent().find('.autocomplete-jquery-results').remove();
                    var left = input.position().left;
                    var width= input.width();
                    var result=$('<div>');
                    
                    //*********************************************************
                    //*********************************************************
                    result.addClass('autocomplete-jquery-results');
                    //*********************************************************
                    //*********************************************************
                    //*********************************************************
                    //*********************************************************
                   var i=0;
                    for(index in data)
                    {
                        
                            
                        if(i<5){
                        //*********************************************************
                        //*********************************************************
                        //agrego un link por resultado
                        
                      //if(data.hasOwnProperty(index)&&controlAutocomplete==false)
                        //   {
                                
                                
                                var img= $('<div>');
                                img.addClass("imagenUbicador");
                                var aux = $('<div>');
                                var a = $('<a>');
                                a.html(data[index]);
                                a.html( "<b>" + data[index]["NOMBRE_SEDE"].replace("\xC3","Ñ") + "</b>, " + data[index]["DIRECCION"] + ", " + data[index]["BARRIO"] );
                                a.addClass('autocomplete-jquery-item');
                                a.attr('href',"#");
                                a.click(function()
                                {
                 
                                    selectItem(this);
                                    controlAutocomplete = true;
                                })
                                a.attr('data-id',index);
                                $(result).append(img);
                                $(result).append(a);
                                
                               
                        
                                    
                            }
                       i++ }
                            
                    //}
                    //*********************************************************
                    //*********************************************************
                    //*********************************************************
                    //*********************************************************
                    if (data.length>0)
                    {
                        input.parent().append(result);
                        result.fadeIn('slow');

                        //*******************************************************
                        //*******************************************************
                        $(".autocomplete-jquery-item").click(function() 
                        {
                         
                            //var x = $(this).attr("data-id");
                            var textSelected = $(this).html().replace("<b>","");
                            var posicion=textSelected.search(",");
                            var cortado = textSelected.slice(0,posicion);
							cortado = cortado.replace("</b>","")
                            input.value = cortado;
                            realizarBusquedaPredio(cortado); 
                            
                        });
                        //*******************************************************
                        //*******************************************************
                        pregunta = false;
                        enter = false;//Cuando no existen direcciones no sale cuadro de dualogo
                    }
                    else
                    {
                        enter=true;//Cuando no existen direcciones sale cuadro de dualogo
                    }
                    //*********************************************************
                    //*********************************************************
                    //*********************************************************
                    //*********************************************************
                });
            }
        });
    });
}
                                   
})(jQuery);
/************************************************************************************/
/************************************************************************************/
/************************************************************************************/
/************************************************************************************/
/************************************************************************************/
/************************************************************************************/
