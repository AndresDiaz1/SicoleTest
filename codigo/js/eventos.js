var direccionCaja = "";
var busquedaDireccion = "";
var bandera = false;
var inputSeleccionado = $("#inputBusqueda");
var uriTipoBusqueda = "http://geoportal.dane.gov.co/wssicole/serviciobusqueda.php?palabrasclave=";
var auxiliarScroll=300;
var randomTip = Math.floor((Math.random() * 4) + 1);; 
var vectorCaracteristicas = ["Total estudiantes matriculados","Estudiantes matriculados en preescolar", "Estudiantes matriculados en primaria", "Estudiantes matriculados en secundaria" , "Estudiantes matriculados en media"];
var vectorCalidad = ["Pruebas saber 11"]
var vectorRecursos = ["Total docentes", "Docentes con posgrado", "Estudiantes por docente"];
var vectorTasas = ["aprobación", "reprobación", "deserción", "transferencia"];
var tasasNiveles = ["preescolar", "primaria", "secundaria", "media"];
var variableSiMapa = "";
var favorito = false;
var jActiva = "";
var colorDonut = [];
var htmlActualizar = "";
var ciclo;
var clicPosicion = false; 
var changeTasas = false; 
var capaMapTypeOptions = "";
var capaMapTypeOptions2 = "";
var vectorPosicion = [16];
var posicionActualMapa = 0;
var numeroColegios = 3744;
var filtroAbierto = false;
var correrMapa = false; 
var idCalor = ""; 
var numeroPrefere = 0;
var habilitarStreet = true; 
var favorito = false;



//$('.autocomplete').autocomplete();  

//recuadro
var miLienzo; // el canvas
var contexto; // el contexto
var canvasLimites; // los margenes del canvas
var paint=false; // nos dice si pintar o no
var mbegin; // info de mi cuadro (x,y)
var mend; // info de mi cuadro (width,height)

var isRegisterFormVisible=false;
var hasPressedLogIn=false;
var hasRegisterLinkBeenPressed= false;
var isOnUpdateInfo=false;
var  auxJornada = 100;


function crearOtrosFiltros(){
	var htmlOtros = "";
	for(i= 0 ; i<vectorTasas.length; i++){
		var mayuscula = vectorTasas[i].charAt(0).toUpperCase() + vectorTasas[i].slice(1);
		var valor = vectorTasas[i].replace("ó","o");
		htmlOtros+= "<div tabindex='0' role='button' aria-expanded='false' id = 'despliegue" + mayuscula.replace("ó","o") + "' class = 'desplegableOtroFiltro'><p style= 'float:left;  width: 25%;'>" + mayuscula + ":</p><div class='imagenDespliegueOtros'></div></div>"
		htmlOtros+= '<div id="seccion' + mayuscula.replace("ó","o") +'" class ="seccionesFiltros" style = "height:auto; display:none">'
		for(j=0; j<tasasNiveles.length;j++){
			var mayuscula1 = tasasNiveles[j].charAt(0).toUpperCase() + tasasNiveles[j].slice(1);
			htmlOtros+= '<div class = "seccionesFiltros"><div class = "titulofiltros">' + mayuscula1 + '</div>';
			htmlOtros+= '<div class = "contenedorLimites" style = " margin-top: 7%;">0</div><form class = "rangeFiltro" style= "margin-top:20px;">';
			htmlOtros+= '<input type = "range" id = "'+ mayuscula.replace("ó","o") + mayuscula1 +'" name = "desercion"' + mayuscula1 +' min ="0" max = "1" value = "1" step = "0.1" onchange="cambioTasas(this.id)"/>';
			htmlOtros+= '<output id ="output' + mayuscula1+'" for="'+  mayuscula.replace("ó","o") + mayuscula1 + '" onforminput="value = desercion'+ mayuscula1 +'.valueAsNumber;" style="margin-left: 94%;" >1.0</output></form><div class = "contenedorLimites" style = "margin-top: 7%;">1.0</div></div>';
		}
		htmlOtros+= "</div>"
	}
	$("#filtrosAdicionales").html(htmlOtros);
	$(".desplegableOtroFiltro").click(onclick, function(){
		var id = $(this).attr("id");
		id = id.replace("despliegue","");
		id = id.charAt(0).toUpperCase() + id.slice(1);
		if($("#seccion" + id + "").css("display")=="none"){
			$(this).attr('aria-expanded',"true");
			$(this).css("border-bottom", "none");
			$("#despliegue" + id.replace("ó", "o") + " .imagenDespliegueOtros").css("background-image", "url(imagenes/flecha_azul.png)")

		}else{
            $(this).attr('aria-expanded',"false");
            $(this).css("border-bottom", "#01b4ed solid 2px")
			$("#despliegue" + id.replace("ó", "o") + " .imagenDespliegueOtros").css("background-image", "url(imagenes/flecha_azulder.png)")
		}
		$("#seccion" + id + "").toggle(anima);

	})

	$(".desplegableOtroFiltro").keypress(function(e){
        var id = $(this).attr("id");
        id = id.replace("despliegue","");
        id = id.charAt(0).toUpperCase() + id.slice(1);
        if($("#seccion" + id + "").css("display")=="none"){
            $(this).css("border-bottom", "none");
            $("#despliegue" + id.replace("ó", "o") + " .imagenDespliegueOtros").css("background-image", "url(imagenes/flecha_azul.png)")

        }else{
            $(this).css("border-bottom", "#01b4ed solid 2px")
            $("#despliegue" + id.replace("ó", "o") + " .imagenDespliegueOtros").css("background-image", "url(imagenes/flecha_azulder.png)")
        }
        $("#seccion" + id + "").toggle(anima);
	})
	
	/*$("#filtroDistanciaR").change(function() {
		ubicarIndicador($(this));
	})*/
}
crearOtrosFiltros()
function cambioTasas(id){
	changeTasas = true;
	var contenedor = $("#" + id + "")
	ubicarIndicador(contenedor);
}

function estilosParteInferior(){
    var barra = $("#barrainferior").height();
    var barra1 = barra +10;
    var alto = parseInt($("#encuestaMovil").height())/2 - 7.5;
    setTimeout(function(){
        $(".botonEncuestaMover").animate({
            "marginTop" : alto
        },200);
    },503)
    $("#map_canvas_izquierdo").width($(window).width());
    $("#map_canvas_izquierdo").css("top","59px");
    $("#pieIzquierda").css("bottom", "70px");
    var funcionalidades = $("#ventanaCategoriasIzq").height() - $("#pieIzquierda").height() - 80;
    $("#contenedorFuncionalidades").height(funcionalidades);
    $("#comparacionMapas").css("bottom", barra1)
    //$("#isocronas").css("bottom", barra1);
    var alturaContenido = $("#infoColeEsp").height-($("#barraTitulo").height()+$(".selectores").height()+$(".campodetextos").height()-10);
    $("#contenidoInfoCole").height(alturaContenido);
    $("#contenedorColegiosCercanos").height(alturaContenido);
    $("#menuDesplegableAbajo").css("bottom", barra);
    $("#ventanaCategoriasAbajo").css("bottom", barra);
    if($("body").height() <= 500){
        $("#infoColeEsp").css("bottom", barra);
    }else{
        var largo = barra + 55;
        largo = parseFloat($("body").height()) - largo;
        $("#infoColeEsp").height(largo);
    }

    if($("#mapasContinuos").hasClass("comparacionGradiante2")){
        var ancho = 3;
        var tamano = parseFloat($("#sidebar").width());
        var left = tamano - parseFloat($("#indicadorOficial").width()) - ancho;
        $("#indicadorOficial").css("right","inherit");
        $("#indicadorOficial").css("left",left);

        left = tamano - ancho;
        $("#indicadorNoOficial").css("left",left);
        $("#sidebar").show();
    }
    var margenIzq = parseFloat($("#ventanaCategoriasIzq").width()) +-20;
    $("#botonPlegar").css("left", margenIzq);

    var heightTips = parseFloat($("#tips").width()) * 0.7;
    $("#tips").height(heightTips);
    heightTips = parseFloat($("body").height()) - heightTips;
    heightTips = heightTips/2;
    $("#tips").css("margin-top", heightTips);
    $("#pieTips").width($("#tips").width());
    var top1 = (parseFloat($("#infoTipsImagen").height()) - parseFloat($("#infoTipsLetras").height()))/2;
    $("#infoTipsLetras").css("margin-top", top1);
    var left = $("#rangeImagen").height() + $("#rangeImagen").css("left")
    //$("#hombrecito").css("left", left);
    $("#graficaFuncion").css("bottom", barra);
    var margenIzq = $("#ventanaCategoriasIzq").width();
    var margender = $("#infoColeEsp").width();
    var ancho = $("body").width()-margenIzq-margender;
    $("#graficaFuncion").width(ancho);
    $("#graficaFuncion").css("margin-left", margenIzq);

    if($("#ventanaCategoriasIzq").css("display")== "block"){
        var margenIzq = parseFloat($("#ventanaCategoriasIzq").width()) +30;
        $("#comparacionMapas").css("margin-left", margenIzq)
        $("#contenedorZoom").animate({
            marginLeft: margenIzq
        }, 30)
        $("#numeroSedesFiltro").css("margin-left", margenIzq)
    }
    var izq = parseFloat($("#ventanaCategoriasIzq").width());
    var anchoBarra = parseFloat($("#contenedorParalelos").width()) - parseFloat($("#ventanaCategoriasIzq").width());
    $("#contenedorParalelos").width(anchoBarra);
    $("#contenedorParalelos").css("left",izq);


    if($("#graficaFuncion").css("display")== "block"){
        var abajo = parseFloat($("#comparacionMapas").css("bottom").replace("px",""));
        abajo+= 100;
        $("#comparacionMapas").css("bottom", abajo + "px")
    }
    if($("#functionOpen").css("display") == "block"){
        conInfocolegio();
    }
    ancho = $("body").height()/2;
    ancho = ancho - $("#ventanaRecuperar").height()/2
    $("#ventanaRecuperar").css("margin-top",ancho);
    if($("body").width()>800){
        var mas = 0.235;
    }else{
        var mas = 0.285;
    }

}
 
 function conInfocolegio(){
	//|| $("#contenedorColegiosCercanos").css("display") == "block"
		
		if($("#infoColeEsp").css("display") == "block" || $("#ventanaCategoriasDer").css("display") == "block"){
			if($("#infoColeEsp").css("display") == "block"){
				var ancho = parseFloat($("#ventanaCategoriasDer").width())
			}else if ($("#ventanaCategoriasDer").css("display") == "block"){
				var ancho = parseFloat($("#infoColeEsp").width())
			}
			var right1 = parseFloat($( window ).width()) * 0.05;
			right1 = right1 + ancho;	
			$("#funcionalidadActual").css("right",right1);
			right1 = parseFloat($( window ).width()) * 0.01;
			right1 = right1 + ancho +20;
			$("#cerrarFuncionalidad").css("right",right1);
		}else{
			var right1 = parseFloat($( window ).width()) * 0.05;
			$("#funcionalidadActual").css("right",right1);
			right1 = parseFloat($( window ).width()) * 0.01;
			$("#cerrarFuncionalidad").css("right",right1);
			
		}
}		
	
 
 function quitarEmergentes(){
	$("#menuAyuda").hide(anima);
	$("#menuSesionIniciada").hide(anima);
	$("#menulogueo").hide(anima);	
}

 /*******************************************************************************************************************************************************************************************************************
																						REGISTRARSE
 *******************************************************************************************************************************************************************************************************************/
$("#registrarse").click(onclick, function(){
	var login = $("#menulogueo");
	if(login.css("display") == "none"){
		$("#registrarse").attr("aria-expanded","true");
		login.show();
        $("#crearCuenta").show();
	} else {
		onCloseLogInMenu(login);
	}
	$("#menuAyuda").hide();
	$("#ventanaAno").hide();
});

function onCloseLogInMenu(login){
    $("#registrarse").attr("aria-expanded","false");
    login.hide();
}

$("#iniciar").click(onclick, function (){
    quitarEmergentes();
})
 
 $("#ingresarUsuario").click(onclick, function (){
     onClickLogIn();
});

$("#ingresarUsuario").keypress(function(e){
	if(e.which==13){
        onClickLogIn();
	}
});	

function onClickLogIn(){
    hasPressedLogIn=true;
    var focusTrapLogInMenu=returnFocusTrapLogInMenu();
    focusTrapLogInMenu.deactivate();
    cerrarTodos();
    $("#barraSesion").show(anima);
    $("#seccionPerfil").hide();
    $("#menulogueo").hide();
    $("#cambiarmapa").hide();
    $("#iniciar").show(anima);
    isRegisterFormVisible=false;
    $("#formularioSesion").hide(anima);
    $("#LoginTitle").focus();
}

function closeLoginForm() {
    $("#barraSesion").hide(anima);
    $("#iniciar").show(anima);
    $("#registrarse").focus();

}

function cerrarTodos(){
    	isRegisterFormVisible=false;
		$("#formularioSesion").hide();
		$("#contactoVentana").hide();
		$("#iniciar").hide();
		$(".subventana").hide();
		$("#menuAyuda").hide(anima);
		$("#avisoConvivencia").hide(anima);
		$("#formularioActualizar").hide(anima);
		$("#botonSalir2").hide(anima);
		$("#introduccion").hide(anima);
		$("#listaFavoritos").hide();
        $("#seccionPerfil").hide();
		$("#ventanaAno").hide();
}
function opcionesLiMenu(){
	if($("#divPanorama").css("display")== "block"){
		cerrarPanorama();
	}
	
	$("#infoSicole").hide();
	setTimeout(function(){
		var right = parseFloat($("#barraSesion").width())-20;
		$("#botonPlegar2").css("right", right).css("left", "inherit").show();
		
	},510);
}	
$("#menulogueo li").click(onclick, opcionesLiMenu);
$("#menuSesionIniciada li").click(onclick, opcionesLiMenu);
$("#menuAyuda li").click(onclick, opcionesLiMenu);


	
function crearCuentaUsuario(){
    isRegisterFormVisible=true;
    var loginFocusTrap=returnFocusTrapLogInMenu();
    loginFocusTrap.deactivate();

    showRegisterForm()

}

function showRegisterForm(){
    cerrarTodos();
    $("#contactoVentana").hide()
    $("#formularioSesion #fechaNac").val("");
    $("#formularioSesion #correo").val("");
    $("#formularioSesion #password").val("");
    $("#formularioSesion #repassword").val("");
    $("#formularioSesion #nombres").val("");
    $("#formularioSesion #apellidos").val("");
    $("#formularioSesion #tipoDoc").val("1");
    $("#formularioSesion #numeroDoc").val("");
    $("#formularioSesion #diaNac").val("-");
    $("#formularioSesion #mesNac").val("-");
    $("#formularioSesion #anoNac").val("-");
    $("#formularioSesion #roles").val("1");
    $('#seccionFoto #nombre').val("");
    $('#seccionFoto #botonload').hide();
    $('#fotoUsuarioMask').css("background-image", "url(./imagenes/foto.png)");
    $('#sedesAgregadas').html("");
    if($("#divPanorama").css("display")== "block"){
        cerrarPanorama();
    }
    sedeActiva = [];
    $("#iniciar").hide(anima);
    $("#sicoleLogo").hide();
    $("#formularioSesion").show();
    $("#barraSesion").show(anima);
    $("#menulogueo").hide(anima);
    $("#seccionPerfil").hide();
    $("#ventanaEncuesta").hide(anima);
    $("#contenedorEncuesta").hide(anima);
    createRegisterFormFocusTrapIfUserClicksOnRegisterLink();
    $("#registerTitle").focus();
}

	
	$("#crearCuenta").click(onclick,crearCuentaUsuario);
	$("#crearPerfilBoton").click(onclick,function(){
        hasRegisterLinkBeenPressed=true;

        var focusTrapLogInForm= returnFocusTrapLogInForm();
        focusTrapLogInForm.deactivate();
        crearCuentaUsuario()
	});


function createRegisterFormFocusTrapIfUserClicksOnRegisterLink(){
    if(hasRegisterLinkBeenPressed){
        var focusTrapRegisterForm=returnFocusTrapRegisterForm();
        focusTrapRegisterForm.activate();
        hasRegisterLinkBeenPressed=false;
    }
}

/******************************************************************************************************************************************************************************************************************
																						CREAR CUENTA/ CAMBIAR PERFIL
******************************************************************************************************************************************************************************************************************/

$("#cancelarSede").click(onclick, function (){
	
	
	if(clasePerfil == 1){
		$("#seccionFoto").show();
		$("#agregarSede").hide();	
		if(htmlActualizar != ""){
			$("#sedesAgregadas").html(htmlActualizar);
		}	
	}
	
			
	if(clasePerfil == 2){
		$("#seccionPerfil").show();
		$("#agregarSede").hide();
		if(htmlActualizar != ""){
			$("#sedesAgregadasPerfil").html(htmlActualizar);
		}	
	};
	htmlActualizar = "";
    var focusTrapAddSchoolOnRegister=returnFocusTrapAddSchoolOnRegister();
    focusTrapAddSchoolOnRegister.deactivate();
    var focusTrapPhotoForm=returnFocusTrapPhotoForm();
    focusTrapPhotoForm.unpause();
})

function actualizarfuncion(id){
	htmlActualizar = $("#sedesAgregadasPerfil").html();
	$("#" + id + "").parent().remove(); 
	$("#seccionFoto").hide();
	$("#sicoleLogo").hide();
	$("#agregarSede").show(); 
	//cambiar claseperfil.
	var idSede = id.replace("actualizarSede","");
	$("#tituloNombre3").html("Actualizar Sede");
	var i =0;
	var actua = false;
	while(actua == false &&  i<sedeActiva.length){
		if (sedeActiva[i] == idSede){
		
				sedeActiva.splice(i, 1);
				actua = true
		}
		i++
	}

    var focusTrapPhotoForm=returnFocusTrapPhotoForm();
    focusTrapPhotoForm.pause();

	$("#tituloNombre3").html("Actualizar Sede");
    $("#tituloNombre3").focus();

    var focusTrapAddSchoolOnRegister=returnFocusTrapAddSchoolOnRegister();
    focusTrapAddSchoolOnRegister.activate();

}

function keyPressactualizarfuncion(e,id){
	if(e.which==13){
        actualizarfuncion(id);
	}
}

function eliminarfuncion(id){

    var focusTrapPhotoForm=returnFocusTrapPhotoForm();
    focusTrapPhotoForm.pause();

		$("#divMascara").show(anima);
		$("#divMascara").css("display", "flex");
	$("#deleteSchoolSentence").focus();
    var focusTrapDeleteSchoolPopUp=returnFocusTrapDeleteSchoolPopUp();
    focusTrapDeleteSchoolPopUp.activate();

    function goBackToPhotoFormFocusTrap(){
        focusTrapDeleteSchoolPopUp.deactivate();
        $("#tituloNombre").focus();
        focusTrapPhotoForm.unpause();
	}
		
	$("#cancelarEliminar").click(function(){
		$("#divMascara").hide(anima);
        goBackToPhotoFormFocusTrap();
	});

	$("#confirmarEliminar").click(function(){
		$("#divMascara").hide(anima);
		$("#" + id + "").parent().remove(); 
		var idSede = id.replace("eliminarSede","");
		var i =0;
		var actua = false;
		while(actua == false&& i<sedeActiva.length){
			if (sedeActiva[i] == idSede){
				sedeActiva.splice(i, 1);
				actua = true;
			} 
			i++;
		}
        goBackToPhotoFormFocusTrap();
	})	
}

function keyPresseliminarfuncion(e,id){
	if(e.which==13){
        eliminarfuncion(id);
	}
}

$("#volverJornada").click(onclick, function(){
    isOnAddScheduleShool=false;
	var focusTrapSchoolSchedules=returnFocusTrapSchoolSchedules();
    focusTrapSchoolSchedules.deactivate();
	$("#agregarSede").show(); 
	$("#contenedorJornadas").hide(anima);
	$("#tituloNombre3").focus();
    var focusTrapAddSchoolOnRegister=returnFocusTrapAddSchoolOnRegister();
    focusTrapAddSchoolOnRegister.activate();
})

function agregarSedesPerfil (){
	var sedesComas = "";
	if(sedeActiva!= undefined){
			for(i=0;i<sedeActiva.length;i++){
				if(i==sedeActiva.length-1){
					sedesComas+= sedeActiva[i];
				}	
				else{	
					sedesComas+= sedeActiva[i] + ",";
				}	
			}
			
			var urlactualizar = "http://geoportal.dane.gov.co/wssicole/serviciousuario.php?operacion=modificarusuario";
			//var urlactualizar = "http://192.168.0.163//wssicole/serviciousuario.php?operacion=modificarusuario";
			var tipo = $("#formularioActualizar #tipoDoc").val();
			urlactualizar+= "&id_tipo="+tipo;
			var numero = datossesion.cedula;
			urlactualizar+= "&numero_documento="+numero;
			//var rol = $('#formularioActualizar #roles').val();
			if(sedesComas == ""){
				sedesComas = "vacio";
			}
			urlactualizar+= "&sedesEducativas=" + sedesComas; 
			
			d3.json(encodeURI(urlactualizar), function(error, data) {
					
					if(data[1] == "true"){
                        $("#contenedorLogin").attr('aria-expanded','false');
                        openUpdateProfilePopUpFocusTrap("¡Felicitaciones!",data[2]);
					}else{
                        openUpdateProfilePopUpFocusTrap("¡Error!",data[2]);
					}
				var urlsede ="http://geoportal.dane.gov.co/wssicole/serviciousuario.php?operacion=obtenerSedesUsuario&numerodoc=" + datossesion.cedula;
				//console.log("Sede");
				console.log(urlsede);
				d3.json(urlsede, function(error, data) {
					datossedesession = data;
					$('#nombreSede').html("");
					for(i=0; i < data.length; i++){
						$('#nombreSede').append($('<option>', {
							value: data[i]["CODIGOSEDE"],
							text: data[i]["NOMBRE_SEDE"]
						}));						
					}
				});				
			});
				
			
			datossesion.tipodocumento = cambiarTipo(datossesion.tipodocumento);
			datossesion.rolusuario = $('#formularioActualizar #roles :selected').text()
	}
	//});
	//$("#menuInicial").show();
	//$("#cambiarmapa").show();
	//$("#cambiartrafico").show();
	$("#seccionPerfil").hide();
	//$("#sicoleLogo").show();
	$("#barraSesion").hide(anima);
}

function openUpdateProfilePopUpFocusTrap(popUpTitle,popUpContent){
    var focusTrapPhotoForm=returnFocusTrapPhotoForm();
    focusTrapPhotoForm.deactivate();
    mensaje(popUpTitle,popUpContent);
    $(".title").focus();
    createFocusTrapLogInDialog();
    var focusTrapLogInDialog=returnFocusTrapLogInDialog();
    focusTrapLogInDialog.activate();
}


function cambiarUsuarios(rol){
	switch(rol){
	
		case 'Directivo':
			return 1;
			break;
		case 'Directivo':
			return 2;
			break;
		case 'Administrativo':
			return 3;
			break;
		case 'Padre de Familia/Acudiente':
			return 4;
			break;
		case 'Estudiante':
			return 5;
			break;
		case 'Investigador':
			return 6;
			break;
		case 'Otros':
			return 7;
			break
			
	}		
			
	
}
$("#grabarPerfil").click(onclick,function(){
	agregarSedesPerfil ();	
});
	$("#busquedacolegio").keyup(function(e) {
		var palabra = $("#busquedacolegio").val();
		if( e.which == 8){
			if(palabra.length<2){
				$("#contenedorSedes").hide(anima);
				$("#favoritosSede").show(anima);
				$("#contenedorFavoritos").show(anima);
			}
		}
	});

	$("#busquedacolegio").keypress(function(e) {
		var palabra = $("#busquedacolegio").val();
		
		if(e.which == 13) {
			$("#favoritosSede").hide(anima);
			$("#contenedorFavoritos").hide(anima);
			var url = "http://geoportal.dane.gov.co/wssicole/serviciobusqueda.php?";
			if(palabra != ""){
				url += "palabrasclave=" + palabra.toUpperCase();
			}
			d3.json(url, function(error, data) {
				numerodeSedes = data.length;
				$("#contenedorSedes").empty();
				var html = "";
				var imagenSector = "";
				var colorLetras = "";
				var codigos = [];
				colegiosfound = [];
				distanfound = [];	
		
				for (var i = 0; i < data.length; i++) {
					var sitioini = data[i];
					mostrarCercania2(sitioini);	
				}
				
				if(colegiosfound.length!=0) {
				colegiosfound.sort(function (a,b) {
					if (a[0] > b[0]) return  1;
					if (a[0] < b[0]) return -1;
					return 0;
				});
				
				for(i=0; i < colegiosfound.length; i++){
                    
                    
					colegiosfound[i][2] = colegiosfound[i][2].replace("?","Ñ");
					
					if(colegiosfound[i][4]==1 || colegiosfound[i][4]=="OFICIAL"){
						imagenSector = "imagenes/oficial.png";
						colorLetras = "#0A738C";
					}else if (colegiosfound[i][4]==2 || colegiosfound[i][4]=="NO OFICIAL"){
						imagenSector = "imagenes/no-oficial.png"; 
						colorLetras = "#70A12E";
					} 
					var valorCole = colegiosfound[i][2].indexOf($("#busquedacolegio").val().toUpperCase());
                    if(valorCole > -1){
					   html+= "<div role='button' onkeypress='sedeEnter(event,"+ colegiosfound[i][1] +")' id = '" + colegiosfound[i][1] + " 'class ='contenedorColegio' tabindex='0' onclick='sedeClick("+ colegiosfound[i][1] +")'>";
					   html+= "<div class = 'tipoColegio' style = 'background-image:url(" + imagenSector + ")'></div><div class = 'infoColegio'>";
					   html+= "<h3 class='text-align-initial' style='color:" + colorLetras + "'>" + colegiosfound[i][2] +"</h3><p class ='direccionColegio text-align-initial'>" + colegiosfound[i][3]  + "</p>";
					   html+= "<p class = 'distanciaColegio text-align-initial' style='color:" + colorLetras + "'>" + colegiosfound[i][0] +"m</p></div></div>";
                    }
				} 
				$("#contenedorSedes").append(html);
				}else{
					$("#contenedorSedes").append("No hay resultados.");
					$("#favoritosSede").show(anima);
				$("#contenedorFavoritos").show(anima);
					
				}$("#contenedorSedes").show(anima);
			});	
		}
	});


function sedeEnter(e,sede){
    if(e.which==13){
        sedeClick(sede);
    }
}
	
	function mostrarCercania2(sitioini){
		var lati = parseFloat(sitioini.LATITUD.replace(",","."));
		var longi = parseFloat(sitioini.LONGITUD.replace(",","."));
		var myLatlng = new google.maps.LatLng(lati,longi);
		var x1 = new google.maps.LatLng(markerLatLngIni.lat(),markerLatLngIni.lng());	
		var x2 = new google.maps.LatLng( myLatlng.lat(),myLatlng.lng());
		var distancia = Math.round(google.maps.geometry.spherical.computeDistanceBetween(x1, x2));			
		colegiosfound.push([distancia,sitioini.CODIGO_SEDE,sitioini.NOMBRE_IES, sitioini.DIRECCION, sitioini.SECTOR]);
		distanfound.push(distancia);
	}
		
	$("#imagenSalir").click(function(){

		var focusTrappopUpFotoCole=returnFocusTrappopUpFotoCole();
        focusTrappopUpFotoCole.deactivate();
        isRegisterFormVisible=false;
		$("#formularioSesion").hide();
		$("#botonSalir").hide();
		$("#iniciar").show();
		$("#cambiarmapa").show();
		$("#cambiartrafico").show();

		var focusTrapInfoSchool=returnFocusTrapInfoSchool();
        focusTrapInfoSchool.unpause();
		$("#botonAbrirFoto").focus();

	});

	$("#volver").click(function(){
		$("#cambiarmapa").show();
		$("#cambiartrafico").show();
		$("#menuInicial").show();	
		$("#menuInicial").show();
		$("#iniciar").hide();
		sesionactiva = "a";
	});

function jornadaActivada() {
    if(jActiva == ""){
        $(".columnaGraficas").hide();
        $(".columnaInfo").hide();
        $("#donaNivel").show(anima);
        $("#columnaInfoNiveles").show(anima);
        $("#donaJornada").show(anima);

        $("#columnaInfoJornadas").show(anima);
        auxJornada = 100;
        if($("#tituloJornadas1").css("display") == "none"){
            $("#tituloJornadas").show();
        }

    }else if($("#" +jActiva + "").css("opacity")=="1"){
        var id = jActiva;
        auxJornada = 1;
        $(".selectores").removeClass("botonPresionado");
        $("#" +jActiva + "").addClass("botonPresionado");
        coloresSecciones("#F39C1F ", "#FCF0A5 ");
        $("#tituloJornadas").hide();
        $("#tituloJornadas1").hide();
        $("#tablaJornadas").hide();
        $(".columnaGraficas").hide();
        $(".columnaInfo").hide();
        $("#columnaInfoNiveles" + id + "").show(anima);
        $("#donaNivel" + id + "").show(anima);
        eficienciaInternaJornada();
        cambiarColorGraficas(color2Dona);
        recursosJornadas();
        $("#imagenSexo1").show();
        $("#imagenSexo").hide();

    }
}
	
	//function volverActualizar(){
	$("#infoUsuario").click(onclick, function () {	
		$("#seccionFoto").hide();
		$("#botonSalir").show();
        isRegisterFormVisible=true;
		$("#formularioSesion").show();
	});
	

    function convertirFecha(fecha){
        
        var dia = parseInt(fecha.getDay());
        var mes = parseInt(fecha.getMonth()) +1;
        var ano = parseInt(fecha.getFullYear());
        
        if(dia< 10 ){
            dia = "0" + dia
        }
        
         if(mes< 10 ){
            mes = "0" + mes
        }
        return (dia + "/" + mes + "/" + ano);
        
    }
	$("#seccionPerfil #infoUsuario").click(onclick, function () {
		isOnUpdateInfo=true;
		console.log("presiono actualizar logueado")

		$("#formularioActualizar #nombres").val(datossesion.nombres)
		$("#formularioActualizar #apellidos").val(datossesion.apellidos)
		$("#formularioActualizar #numeroDoc").val(datossesion.cedula)
        
        switch(datossesion.tipodocumento){
                
            case "CÉDULA DE CIUDADANÍA":
                    $("#formularioActualizar #tipoDoc").val("1");
                    break;
                
            case "TARJETA DE IDENTIFICACION":
			     $("#formularioActualizar #tipoDoc").val("2");
                break;    
            case "CÉDULA DE EXTRANJERÍA":
			     $("#formularioActualizar #tipoDoc").val("3");
                break;  
            case "REGISTRO CIVIL DE NACIMIENTO":
			     $("#formularioActualizar #tipoDoc").val("4");
                break;   
                
            case "NÚMERO DE IDENTIFICACIÓN PERSONAL":
			     $("#formularioActualizar #tipoDoc").val("5");
                break;  
            case "NÚMERO ÚNICO DE IDENTIFICACIÓN PERSONAL":
			     $("#formularioActualizar #tipoDoc").val("6");
                break;
            case "NÚMERO DE IDENTIFICACIÓN - SECRETARÍA DE EDUCACIÓN":
			     $("#formularioActualizar #tipoDoc").val("7");
                break  
            case "CERTIFICACIÓN DE CALBILDO":
			     $("#formularioActualizar #tipoDoc").val("8");
                break;
            default:
                
                break;
        }
		
		
		
        var fecnac = new Date(datossesion.fecha_nacimiento);
        
       /*
		var fecnac = datossesion.fecha_nacimiento;
		fecnac = fecnac.split("-") 
		var dia = fecnac[0];
		
		var anio = parseInt(fecnac[2]);
		if(anio<1000){
			if( anio > 59 && anio < 99){
				anio = "19" + anio;
			}		
			else{
				if(anio > 9){
					anio = "20" + anio;
				}
				else{
					anio = "200" + anio;
				}
			}
		}
		var mes = fecnac[1] 
		
		if(mes == "JAN"){
			
		}else if(mes == "FEB"){
			$("#formularioActualizar #mesNac").val("02");
		}else if(mes == "MAR"){
			$("#formularioActualizar #mesNac").val("03");
		}else if(mes == "APR"){
			$("#formularioActualizar #mesNac").val("04");
		}else if(mes == "MAY"){
			$("#formularioActualizar #mesNac").val("05");
		}else if(mes == "JUN"){
			$("#formularioActualizar #mesNac").val("06");
		}else if(mes == "JUL"){
			$("#formularioActualizar #mesNac").val("07");
		}else if(mes == "AUG"){
			$("#formularioActualizar #mesNac").val("08");
		}else if(mes == "SEP"){
			mes = "09";
		}else if(mes == "OCT"){
			$("#formularioActualizar #mesNac").val("10");
		}else if(mes == "NOV"){
			$("#formularioActualizar #mesNac").val("11");
		}else if(mes == "DEC"){
			$("#formularioActualizar #mesNac").val("12");
		}else{
			$("#formularioActualizar #mesNac").val(mes);
		}
        */
        $("#fechaNacAct").val(convertirFecha(fecnac));
		
		
		if(datossesion.rolusuario == "Directivo"){
			$("#formularioActualizar #roles").val("1");
		}
		if(datossesion.rolusuario == "Docente"){
			$("#formularioActualizar #roles").val("2");
		}
		if(datossesion.rolusuario == "Administrativo"){
			$("#formularioActualizar #roles").val("3");
		}
		if(datossesion.rolusuario == "Padre de Familia/ Acudiente"){
			$("#formularioActualizar #roles").val("4");
		}
		if(datossesion.rolusuario == "Estudiante"){
			$("#formularioActualizar #roles").val("5");
		}
		if(datossesion.rolusuario == "Investigador"){
			$("#formularioActualizar #roles").val("6");
		}
		if(datossesion.rolusuario == "Otros"){
			$("#formularioActualizar #roles").val("7");
		}
		$("#seccionPerfil").hide();
		$("#formularioActualizar").show();
		$("#botonSalir2").show();
		$("#encabezadoInstitucion").hide();
		$(".subventana").hide();
		$("#sedeCuentanos").hide();

		var focusTrapPhotoForm=returnFocusTrapPhotoForm();
        focusTrapPhotoForm.deactivate();
		$("#updateDataTitle").focus();
		var focusTrapUpdateForm=returnFocusTrapUpdateForm();
        focusTrapUpdateForm.activate();
	});
	

	$("#sesion").click(onclick, function () {
		sesionactiva = "b";
		$("#menuInicial").hide();
		$("#iniciar").show();
        $("#cambiarmapa").hide(anima);
        $("#cambiartrafico").hide(anima);
        $(".botonesIniciar").show();
	});

	$("#volver2").click(onclick, function () {
		var focusTrapPhotoForm=returnFocusTrapPhotoForm();
		focusTrapPhotoForm.deactivate();

		var focusTrapRegisterForm=returnFocusTrapRegisterForm();
        focusTrapRegisterForm.unpause();
		$("#seccionFoto").hide(anima);
		$("#seccionPerfil").hide(anima);
        isRegisterFormVisible=true;
		$("#formularioSesion").show(anima);
	});



	$("#botonSalir").click(onclick,function () {
		$("#formularioSesion").hide();
        isRegisterFormVisible=false;
		$("#formularioActualizar").hide();
		$("#botonSalir").hide();
		$("#iniciar").show();
		$("#cambiarmapa").show();
		$("#cambiartrafico").show();
	});	
    
    $("#volverPerfil").click(onclick,function () {
		var focusTrapRegisterForm=returnFocusTrapRegisterForm();
		focusTrapRegisterForm.deactivate();
	});	
    
	$("#botonSalir2").click(onclick,function () {
						   
		$("#formularioActualizar").hide();
		$("#botonSalir2").hide();
		if(clasePerfil == 1){
			$("#seccionPerfil").show(anima);
		}else if (clasePerfil == 2){
			$("#barraSesion").hide(anima);
		} 
		
	});
	
	function llenarBarra(){
		var nombre = datossesion.nombres.charAt(0).toUpperCase() + datossesion.nombres.slice(1)
        var apellido = datossesion.apellidos.charAt(0).toUpperCase() + datossesion.apellidos.slice(1)
        var urlimg = "http://geoportal.dane.gov.co/wssicole/obtenerFotoUsuario.php?documento=" + datossesion.cedula;
		$("#UsuarioNombre").text(nombre + " " + apellido);
        $("#rolEscogido").text(datossesion.rolusuario);
		$('#fotoLoginBarra').css("background-image", "url("+urlimg+")"); 	
		$("#contenedorLogin").show(anima);
		$("#registrarse").hide(anima);
		$("#menuHamburguesa").show(anima); 
		$("#barraSesion").hide(anima);
		$('#infraestructura').removeClass("Activo");
		$('#dotacion').removeClass("Activo");
		$('#convivencia').removeClass("Activo");
		$('#asistencia').removeClass("Activo");
		$('#transporte').removeClass("Activo");
		habilitarseccion(datossesion.rolusuario);
	}
	
	function iniciarSesion() {
		$("#preaload").show();
		urlsesion = "http://geoportal.dane.gov.co/wssicole/serviciousuario.php?operacion=autenticar";
		var usuario = $("#correo").val();
		urlsesion+= "&login=" + usuario;
		var contrasena = $("#password").val();
		urlsesion+= "&clave=" + contrasena;
		console.log(urlsesion);
		$("#listaFavoritos").hide();
		d3.json(encodeURI(urlsesion), function(error, data) {
			console.log(data);
			if(data[1] == "true"){
				datossesion = data[3];
				$("#preaload").hide();
				llenarBarra();	
				//agregarSedesPerfil();
            }
			else{
				mensaje("¡Error!",data[2]);
                $("#preaload").hide();
			}
			
		});
	}
	
	
	$("#botonGrabar").click(onclick,function () {
			if(sedeActiva[0] != undefined){
				urlregistro += "&sedesEducativas=" + sedeActiva;
			}	
				console.log(encodeURI(urlregistro));
				d3.json(encodeURI(urlregistro), function(error, data) {	
					if(data[1] == "true"){

						var focusTrapRegisterForm=returnFocusTrapRegisterForm();
                        focusTrapRegisterForm.unpause();
                        focusTrapRegisterForm.deactivate();

                        var focusTrapPhotoForm=returnFocusTrapPhotoForm();
                        focusTrapPhotoForm.deactivate();
                        mensaje("¡Felicitaciones!","Se ha creado el usuario con éxito.");
                        isUserLoggedIn=true;
                        $(".title").focus();
                        createFocusTrapLogInDialog();
                        var focusTrapLogInDialog = returnFocusTrapLogInDialog();
                        focusTrapLogInDialog.activate();

						$("#seccionFoto").hide();
						$("#seccionPerfil").hide();	
				        iniciarSesion();
                        
						var urlsede ="http://geoportal.dane.gov.co/wssicole/serviciousuario.php?operacion=obtenerSedesUsuario&numerodoc=" + $("#numeroDoc").val();
						console.log(urlsede);
					d3.json(urlsede, function(error, data) {
                        datossedesession = data;
						$('#nombreSede').html("");
                        
						for(i=0; i < data.length; i++){
							$('#nombreSede').append($('<option>', {
							     value: data[i]["CODIGOSEDE"],
							     text: data[i]["NOMBRE_SEDE"]
						    }));
                             
					}
                        
				});		
					}
					else{
                        var focusTrapRegisterForm=returnFocusTrapRegisterForm();
                        focusTrapRegisterForm.unpause();

                        var focusTrapPhotoForm=returnFocusTrapPhotoForm();
                        focusTrapPhotoForm.deactivate();

						mensaje("¡Error!",data[2]);
                        $(".title").focus();
                        createFocusTrapLogInDialog();
                        var focusTrapLogInDialog = returnFocusTrapLogInDialog();
                        focusTrapLogInDialog.activate();

                        $("#seccionFoto").hide();
                        isRegisterFormVisible=true;
						$("#formularioSesion").show();
					}
				});	
					
	});
	
	
	$("#contenedorLogin").click(onclick, function () {
		abrirPerfil()
	});
	
	function abrirPerfil(){
		$("#contenedorLogin").attr('aria-expanded','true');
		clasePerfil = 2; 
		$("#listaFavoritos").hide();
		$("#avisoConvivencia").hide(anima);
		$(".subventana").hide();
		$("#sedeCuentanos").hide();
		$("#seccionPerfil #tituloNombre").html(datossesion.nombres + " " + datossesion.apellidos);
		$("#seccionPerfil #infoUsuario").empty();
		$("#menuSesionIniciada").hide(anima);
		$("#infraestructuraVentana").hide()
		$("#convivenciaEscolar").hide();
		$("#asistenciaDocente").hide();
		$("#transporteFormulario").hide();
		 var fecnac = new Date(datossesion.fecha_nacimiento);
        var html = "";

        
		html += "<div id='informacionvisible' tabindex='0'>" + datossesion.rolusuario + "<br>";
		html += datossesion.username + "<br>";
		
        html += datossesion.tipodocumento + "   ";
		html += datossesion.cedula + "<br>";
		html += convertirFecha(fecnac) + "<br>";
		html += "</div>";	
		html += "<button id='actualizarInformacion' tabindex='0' aria-label='Abrir menú para actualizar los datos'>";
		html += "<img style='position:relative; float:left' src='imagenes/actualizar.png' width='30px'>"
		html += "<h3>Actualizar datos</h3>";
		html += "</button>";

		$("#seccionPerfil #infoUsuario").append(html);	
		
		var urlimg = "http://geoportal.dane.gov.co/wssicole/obtenerFotoUsuario.php?documento=" + datossesion.cedula;
		
		$('#seccionPerfil #fotoUsuarioMask').css("background-image", "url("+urlimg+")"); 		
		$("#barraSesion").show(anima);
		$("#menuInicial").hide();
		$("#seccionPerfil").show(anima);
		$("#sicoleLogo").hide();

		$("#tituloNombre").focus();
		var focusTrapPhotoForm=returnFocusTrapPhotoForm();
        focusTrapPhotoForm.activate();
	}
/*    
$("#googleSearch").click(function(){
    $("#searchTextField2").val("")
    direccionCaja = $("#searchTextField2").val();   
    if($(this).prop("checked")==true){
         $("#botonSicole").show();
         $("#botonGoogle").show(); 
        
          if($("#sicoleSearch").prop("checked")==true){
              $("#imagenlogoSicole").attr("src","imagenes/logo_sicolebn.png");
              $("#sicoleSearch").prop("checked",false);    
          }
          if($(".autocomplete-jquery-results")){
            $(".autocomplete-jquery-results").hide();
           }
        
          $("#imagenlogoGoogle").attr("src","imagenes/google.png");
          autocompletar();
          if($("#sicoleSearch").prop("checked")==true){
            $("#searchTextField2").hide();
          }
    
    }
    else{
        $("#imagenlogoGoogle").attr("src","imagenes/googlebn.png");
        noAutocompletar();
        if($("#sicoleSearch").prop("checked")==false)
        {
            $("#sicoleSearch").prop("checked",true);
            $("#imagenlogoSicole").attr("src","imagenes/logo_sicole.png");
            
        }
        
    }
        
});
    
    $("#sicoleSearch").click(function(){
        
      if($(this).prop("checked")==true){
              
          $("#imagenlogoSicole").attr("src","imagenes/logo_sicole.png");
          if($("#googleSearch").prop("checked")==true){
            $("#imagenlogoGoogle").attr("src","imagenes/googlebn.png");
              noAutocompletar();
              $("#googleSearch").prop("checked",false)
          }
          else{
              
              
          }
      }
    else{
        $("#botonSicole").show();
        $("#botonGoogle").show();
        $("#imagenlogoSicole").attr("src","imagenes/logo_sicolebn.png");
         if($(".autocomplete-jquery-results")){
            $(".autocomplete-jquery-results").hide();
        }
        
        if($("#googleSearch").prop("checked")==false)
        {
            $("#googleSearch").prop("checked",true);
            $("#imagenlogoGoogle").attr("src","imagenes/google.png");
            autocompletar();
            
        }    
    }
        
});
        
  
$("#tipoBusqueda").click(onclick, function(){
    
    if($(".autocomplete-jquery-results")){
            $(".autocomplete-jquery-results").hide();
        }
    $("#botonSicole").show();
    $("#botonGoogle").show();
});

$("#panel").click(onclick,function(){
                              
      if($(".autocomplete-jquery-results")){
            $(".autocomplete-jquery-results").hide();
        }  
      $("#botonSicole").show();
    $("#botonGoogle").show();    
});

*/
/*
$("#inputBusqueda").keyup(function(e){

  	
  if(e.keyCode==8&&$("#inputBusqueda").val().length<direccionCaja.length){
        
        direccionCaja=$("#inputBusqueda").val();
        if(direccionCaja.length>2)
        {    
         actualizarListaDireccionesCaja(direccionCaja + "#");
        }
    }
    
});

$("#inputBusqueda").keypress(function(e)
{          
			if($(this)==0){
				direccionCaja=0;
			}
 
	    	if (e.charCode != 13)
	    	{
	    		
                if(String.fromCharCode(e.charCode)!=""){
                    direccionCaja+= String.fromCharCode(e.charCode);
                    actualizarListaDireccionesCaja(direccionCaja+"#");
                }
                else{
                    
                    if($('.autocomplete-jquery-mark')){
                         $('.autocomplete-jquery-mark').hide(500);
                         }
                }
	    	}
	    	else
	    	{
	    		console.log("Que sera enter?: "+ enter);
	    		if(enter)
	    		{
	    			console.log("Entro antes de hayEspacios");
	    		}
	    		else
	    		{
	    			//Actualizar mapa
	    		}
	    	}
            
}); 
        
    	//---------------------------------------------------------------
    	//---------------------------------------------------------------
	    //Actualizar direcciones en la caja
function actualizarListaDireccionesCaja(palabra){
		var direccion = palabra.toUpperCase();
    	var busquedaDireccion = "";
        var busquedaColegio="";
		    //	busquedaColegio = "http://192.168.0.163/wssicole/serviciocoordcolegio.php?nombre=" + direccion;
           // busquedaDireccion2 = "http://geoportal.dane.gov.co/wssicole/serviciobusqueda.php?palabrasclave="+direccion;
        busquedaDireccion =uriTipoBusqueda + direccion;    
 	    console.log(busquedaDireccion);
		//$("#searchTextField2").attr("data-source",busquedaDireccion);
        var busqueda = encodeURI(busquedaDireccion);
        inputSeleccionado.attr("data-source",busqueda);
}*/



/*$("#agregarinivel").change(function(){
    mapaJornadas=$(this).val();     
});*/




$(function () {
	var uribusqueda = "http://geoportal.dane.gov.co/wssicole/serviciobusqueda.php?";
   //$.getJSON(uribusqueda, function(data)
	//{
	/*var vector = [];
	for(i =0; i<data.length;i++){
		var valor = data[i]["NOMBRE_SEDE"].replace("\xC3","Ñ") + " ZZZ" + data[i]["DIRECCION"] + " ZZZ" + data[i]["BARRIO"]; 
		vector.push({label: valor,  value: data[i]["CODIGO_SEDE"]});
	}
       console.log("busqueda" + vector);*/

    $("#inputBusqueda").keyup(function(e){
     if($(this).val().length <= 3){
         
         $("#ui-id-1").hide(anima);
     }else{
     } 
    });
    $("#inputBusqueda").autocomplete({
        minLength: 0,
        source: function(request, response) {
            if(request.term.length>3){
            var salida = "http://geoportal.dane.gov.co/wssicole/serviciobusqueda.php?palabrasclave=" +request.term,
                salida2 = "http://geoportal.dane.gov.co/wssicole/serviciobusqueda.php?direccion=" +request.term,    
                 vector = [];
            $.getJSON(salida, function(data)
            {
              $.getJSON(salida2, function(data2)
             {   
                if(data.length == 0){
                    data = data2;
                }  
                for(i =0; i<data.length;i++){
		              var valor = data[i]["NOMBRE_SEDE"].replace("\xC3","Ñ") + " ZZZ" + data[i]["DIRECCION"] + " ZZZ" + data[i]["BARRIO"]; 
		              vector.push({label: valor,  value: data[i]["CODIGO_SEDE"]});
	           }
                
			     var results = $.ui.autocomplete.filter(vector, request.term);
			     response(results.slice(0, 5));
                $("#ui-id-1").show(anima);
            });
            });    
            }
                
		},
        focus: function (event, ui) {
            $("#project").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
			var res = ui.item.label.split(" ZZZ");
			console.log(res);
            $("#inputBusqueda").val(res[0]);
            $("#inputBusqueda-id").val(ui.item.value);
           // $("#project-description").html(ui.item.desc);
            //$("#project-icon").attr("src", "images/" + ui.item.icon);
			//realizarBusquedaPredio(res[0]);
            realizarBusquedaPredio(ui.item.value);
			return false;
        }
    })
		
        .data("ui-autocomplete")._renderItem = function (ul, item) {
		var res = item.label.split("ZZZ");
        return $("<li>")
            .data("ui-autocomplete-item", item)
           /* .append("<a>" + item.label + "<br></a>")
            .appendTo(ul);*/
            .append("<div class='imagenUbicador'></div><a><b>" + res[0] + "</b>, " + res[1] + ", " + res[2] +"</a>")
			.appendTo(ul);
			
    };
//});
});

$("#tipoDeBusqueda").click(onclick, function(){

	var focusTypeOfSearch=returnFocusTypeOfSearch();
    focusTypeOfSearch.activate();
    if($("#ventanaTipoBusqueda").css("display")=="none"){
		$("#tipoDeBusqueda").attr("aria-expanded","true");
       $("#ventanaTipoBusqueda").show(anima); 
    }else{
    	onCloseSearchTypeMenu();
	}
    
});

function onCloseSearchTypeMenu(){
    $("#tipoDeBusqueda").attr("aria-expanded","false");
    $("#ventanaTipoBusqueda").hide(anima);
}

$("#busquedaGeoportal").click(onclick,function () {
    geoPortalSearchSelected();
});

$("#busquedaGeoportal").keypress(function (e) {
	if(e.which==13){
        geoPortalSearchSelected();
	}
});

function geoPortalSearchSelected(){
    var focusTypeOfSearch=returnFocusTypeOfSearch();
    focusTypeOfSearch.deactivate();
    $("#logoBusqueda").css("background-image","url(imagenes/geop_ico.png)");
    $("#inputBusqueda").show();
    $("#inputBusqueda2").hide();
    $("#busqueda").hide(anima);
    $("#ventanaTipoBusqueda").hide(anima);
    $("#inputBusqueda").focus();
}


$("#menuDesplegableIzq").click(onclick, swiperightHandler );

function swiperightHandler(){
	if(limitesBogota.contains(markerini.getPosition())){
        $("#botonmapas").css("opacity",1);
    }else{
        $("#botonmapas").css("opacity",0.3);
        $("#barraMapa").css("display","none");
    }
    $("#menuDesplegableIzq").attr("aria-expanded","true");
    ocultarPaneles();
    quitarEmergentes();
    $("#ventanaAno").hide(anima);
	$("#menuDesplegableDer").show(510);
	$("#ventanaCategoriasIzq").show(anima); 
	setTimeout(function () {
		var margenIzq = parseFloat($("#ventanaCategoriasIzq").width()) +30;
		var margenIzq2 = margenIzq -50;
		$("#botonPlegar").css("left", margenIzq2).show();
		
		$("#numeroSedesFiltro").css("margin-left", margenIzq);
		$("#contenedorZoom").animate({
			marginLeft: margenIzq
		}, 200)
		$("#comparacionMapas").animate({
			marginLeft: margenIzq
		}, 200)
		var margenIzq = $("#ventanaCategoriasIzq").width();
		$("#ocultarClusters").css("left", margenIzq);
		var margender = $("#infoColeEsp").width();
		var ancho = $("body").width()-margenIzq-margender;
		$("#graficaFuncion").width(ancho);
		$("#graficaFuncion").css("margin-left", margenIzq);
		if($("#mapasParalelos").hasClass("comparacionGradiante2")){
			var izq = parseFloat($("#ventanaCategoriasIzq").width());
			var anchoBarra = parseFloat($( window ).width()) - parseFloat($("#ventanaCategoriasIzq").width());
			$("#contenedorParalelos").width(anchoBarra); 
			$("#contenedorParalelos").css("left",izq);
			var tamano = parseFloat($("#map2_canvas").width()) + parseFloat($("#lineaParalelo").width())/2 + parseFloat($("#ventanaCategoriasIzq").width());
			var left = tamano - parseFloat($("#indicadorOficial").width()) ;
			$("#indicadorOficial").css("right","inherit");
			$("#indicadorOficial").css("left",left);
			left = tamano;
			$("#indicadorNoOficial").css("left",left);	
		}else if($("#mapasContinuos").hasClass("comparacionGradiante2")){
			$("#sidebar").width("61%");
			var ancho = 3;
			var tamano = parseFloat($("#sidebar").width());
			var left = tamano - parseFloat($("#indicadorOficial").width()) - ancho;
			$("#indicadorOficial").css("right","inherit");
			$("#indicadorOficial").css("left",left);
		
			left = tamano - ancho;
			$("#indicadorNoOficial").css("left",left);	
			$("#sidebar").show();
		}
		
	}, 510)
	
}


$("#barraTitulo").on("swipedown", function (){
	if($("#infoColeEsp").height()>= 100){
		$("#infoColeEsp").animate({
			height: "10%"
		}, 500, function (){
			$("#barraTitulo").height("53%");
			$(".campodetextos").height("26%");
			$(this).css("bottom","-4px");
		});
	}else{
	}
});



$("#barraTitulo").on("swipeup", function (){
	if($("#infoColeEsp").height()>= 100){
	}else{
		//$(this).height("55%");
		 $("#infoColeEsp").animate({
			height: "55%"
		}, 500, function(){
				$("#barraTitulo").height("8%");
				$(".campodetextos").height("15%");
				$(this).css("bottom","26px");
			});
		
	}
});

$("#ventanaCategoriasIzq").on("swipeleft", function (){
	mostrarPaneles();
});

$("#ventanaCategoriasDer").on("swiperight", function (){
	mostrarPaneles();
});

$("#barraSesion").on("swipeleft", function (){
	$(this).hide(anima);
	mostrarPaneles();
});
    
$("#menuDesplegableDer").click( onclick, function (){
    $("#menuDesplegableDer").attr("aria-expanded","true");
	$("#ventanaCategoriasDer").show(anima); 
    quitarEmergentes();
     $("#ventanaAno").hide(anima);
    //ocultarPaneles();
    historial_navegacion++;
	if(busquedaAvanza == false){
		nombreTitulo = "Sedes cercanas a";
	}else{
		nombreTitulo = "Resultados Búsqueda";
	}	
	sitiosCercanos();
	var alturaContenido = $("#infoColeEsp").height-($("#barraTitulo").height()+$(".selectores").height()+$(".campodetextos").height()-10);
	if($("#divPanorama").css("display")== "block"){
		cerrarPanorama();
		
	}
	if($("#functionOpen").css("display") == "block"){
		conInfocolegio()
	}
	
	setTimeout(function (){
		var margenDerecha = parseFloat($("#ventanaCategoriasDer").width()) - 20;
		$("#botonPlegar2").css({
			"left": "inherit",
			"right": margenDerecha
		})
		$("#botonPlegar2").show();
	},510)
	
});

$("#menuDesplegableAbajo").on("swipeup",function(){
   $("#ventanaCategoriasAbajo").show(anima); 
    $(this).hide(anima);
    historial_navegacion++;
});

$("#retraer").on("swipedown", function(){
    
    $("#menuDesplegableAbajo").show(anima);
    $("#ventanaCategoriasAbajo").hide(anima);
    
})


$("#scrollBajar").click(onclick,function () {

    scrollColegios(1); 
});


$("#scrollSubir").click(onclick,function () {

    scrollColegios(-1);  
});


function scrollColegios(factor){
    var contenedorCercanos = $("#contenedorColegiosCercanos")
    var scroll = contenedorCercanos.scrollTop() +(auxiliarScroll*factor);
    contenedorCercanos. animate({ scrollTop : scroll},500,botonesScroll)
    
    
}

 $("#contenedorColegiosCercanos").scroll(botonesScroll);


function botonesScroll (){
    var contenedorCercanos = $("#contenedorColegiosCercanos");
    var adicionalSuma = contenedorCercanos.height();  
    var scrollBoton = contenedorCercanos.scrollTop();   
    if(scrollBoton>0){
        $("#scrollSubir").show(100);
        if((scrollBoton + adicionalSuma) >= document.getElementById("contenedorColegiosCercanos").scrollHeight){
                $("#scrollBajar").hide(100);
            }else{
                $("#scrollBajar").show(100);
            };
            
        }else{
        $("#scrollSubir").hide(100);
    }
           
}


$("#sectorOficial").click(onclick,function(){
	
    if($(this).prop( "checked") == true){
		$("#Oficial").prop( "checked", true);
		//$("#NoOficial").prop( "checked", false);
		lugaresCercanos();
		map.setCenter(markerini.getPosition());
		$("#preaload").show();
	}else{
			if($("#sectorNoOficial").prop( "checked") == false){
				$("#sectorNoOficial").prop( "checked", "true");
				$("#NoOficial").prop( "checked", true);
			}
			$("#Oficial").prop( "checked", false);
			lugaresCercanos();
			map.setCenter(markerini.getPosition());
			$("#preaload").show();
	}
	
});

$("#Oficial").click(onclick,function(){
	if($(this).is(':checked')){
		$("#sectorOficial").prop("checked", true);
	}
	else{
        $("#sectorOficial").prop("checked", false);
		if($("#NoOficial").is(':checked') == false){
            $("#NoOficial").prop("checked", true);
            $("#sectorNoOficial").prop("checked", true);
        }
	}
	
});


$("#sectorNoOficial").click(onclick,function(){
   
	if($(this).prop( "checked") == true){
		$("#NoOficial").prop( "checked", true);
		lugaresCercanos();
		map.setCenter(markerini.getPosition());
		$("#preaload").show();
		
	}else{
			if($("#sectorOficial").prop( "checked") == false){
				$("#sectorOficial").prop( "checked", "true");
				$("#Oficial").prop( "checked", true);
			}
			$("#NoOficial").prop( "checked", false);
			lugaresCercanos();
			map.setCenter(markerini.getPosition());
			$("#preaload").show();	
	}
	;
});
$("#NoOficial").click(onclick,function(){
	if($(this).is(':checked')){
		$("#sectorNoOficial").prop("checked", true);
	}else{
	  $("#sectorNoOficial").prop("checked", false);
		if($("#Oficial").is(':checked') == false){
            $("#Oficial").prop("checked", true);
            $("#sectorOficial").prop("checked", true);
        }
    }
	
});

function eventosInfo (){
$("#botonAbrirFoto").click(onclick, function (){
    displayPopUpPhotoWithFocusTrap();
})

	$("#botonAbrirFoto").keypress(function (e){
		if(e.which==13){
            displayPopUpPhotoWithFocusTrap();
        }
    })

$("#botonSalir3").click(onclick,function () {
                        
    $("#popUpFotoCole").hide(anima);                    
})

$("#popUpFotoCole").click(onclick,function () {
                        
    $("#popUpFotoCole").hide(anima);                    
})

$("#tituloJornadas").click(onclick,function(){
   $("#tablaJornadas").show(anima);
   $(this).hide();
   $("#tituloJornadas1").show();
   $("#tituloJornadas1").focus();

});

    $("#tituloJornadas").keypress(function(e){
        if(e.which==13){
            $("#tablaJornadas").show(anima);
            $(this).hide();
            $("#tituloJornadas1").show();
            $("#tituloJornadas1").focus();
		}
    });


$("#tituloJornadas1").click(onclick,function(){
   $("#tablaJornadas").hide(anima);
   $(this).hide();
   $("#tituloJornadas").show();
   $("#tituloJornadas").focus();
});

    $("#tituloJornadas1").keypress(function(e){
        if(e.which==13){
            $("#tablaJornadas").hide(anima);
            $(this).hide();
            $("#tituloJornadas").show();
            $("#tituloJornadas").focus();
		}
    });

$("#tituloNiveles").click(onclick,function(){
	$("#tablaNiveles").show(anima);
	$(this).hide();
   $("#tituloNiveles1").show();
    $("#tituloNiveles1").focus();
});

    $("#tituloNiveles").keypress(function(e){
    	if(e.which==13){
            $("#tablaNiveles").show(anima);
            $(this).hide();
            $("#tituloNiveles1").show();
            $("#tituloNiveles1").focus();
		}
    });

$("#tituloNiveles1").click(onclick,function(){
	$("#tablaNiveles").hide(anima);
	$(this).hide();
   $("#tituloNiveles").show();
    $("#tituloNiveles").focus();
});

    $("#tituloNiveles1").keypress(function(e){
    	if(e.which==13){
            $("#tablaNiveles").hide(anima);
            $(this).hide();
            $("#tituloNiveles").show();
            $("#tituloNiveles").focus();
		}
    });

}

function displayPopUpPhotoWithFocusTrap(){
    $("#popUpFotoCole").show(anima);
    var focusTrapInfoSchool=returnFocusTrapInfoSchool();
    focusTrapInfoSchool.pause();
    var popUpFotoCole=returnFocusTrappopUpFotoCole();
    popUpFotoCole.activate();
    $("#imagenSalir").focus();
}
  
$(".selectores").click(onclick, function () {
	jActiva = $(this).attr("id");
	jornadaActivada();
    $(".botonVolverCole").show();
});


function eficienciaInternaJornada(){
	var posicion = -1;
	var jornadaAux = jActiva;
	if(jornadaAux == "MANANA"){
		jornadaAux = "MAÑANA"
	}else if(jornadaAux == "FINDESEMANA"){
		jornadaAux = "FIN DE SEMANA"
	}
	for( i=0; i<jorna.length; i++){
		if(jorna[i] == jornadaAux){
			posicion = i;
			
		}
	}
	convertirEficiencia("Desercion",desercionjor[posicion]);
	convertirEficiencia("Aprobacion", aprobacionjor[posicion]);
	convertirEficiencia("Reprobacion", reprobacionjor[posicion]);
	convertirEficiencia("Transferencia", transferenciajor[posicion]);
}

function recursosJornadas (){
	var posicion = -1;
	var jornadaAux = jActiva;
	if(jornadaAux == "MANANA"){
		jornadaAux = "MAÑANA"
	}else if(jornadaAux == "FINDESEMANA"){
		jornadaAux = "FIN DE SEMANA"
	}
	for( i=0; i<jorna.length; i++){
		if(jorna[i] == jornadaAux){
			posicion = i;
		}
	}
	llenarDonaRecursos(posicion+1,color2Dona);
	numeroEstuPorProfe(posicion+1);
}

function llenarDonaRecursos(posicion,color){
	var porcentajeInsumo = 0
	
	textoinsumo(pordoc[posicion], totdoc[posicion]);
	
	porcentajeInsumo = pordoc[posicion] * 100; 
	donaInsumo = [];
	donaInsumo.push({ "jornada": "Porcentaje docentes sin posgrado", "population": 100- porcentajeInsumo});
	donaInsumo.push({ "jornada": "Porcentaje docentes posgrado", "population": porcentajeInsumo});
	$("#donaRecursos").html("");
	
	bandera1 = false;
	bandera2 = false;
	colorDonut = color;
	hacerDona3(donaInsumo, totdoc[posicion], "donaRecursos");
	$("#textoSin p").css("color",color[0]);
	$("#textoCon p").css("color",color[1]);
}

function numeroEstuPorProfe(posicion){
	var porcentaje;
	porcentaje = (numestdoc[posicion]/48)*100;
	if(isNaN(porcentaje)){
		porcentaje = 0;
	}
	if(porcentaje>98){
		porcentaje = 98; 
	}
	$("#estudiantesPordocentes").width(porcentaje + "%");	
	porcentaje = Math.round(porcentaje);
    if(numestdoc[posicion] != undefined)
    {    
	   $("#numeroEstudiantesDocente").text(numestdoc[posicion].Math.round());
    }
}


function convertirEficiencia(palabra, total){
    var total1 = parseFloat(total)* 100;
    if(total1>100){

        total1 = total1/100;
    }
    $("#texto" + palabra).text( total1.toFixed(1) + "%");
    $("#tasa" + palabra).height(total1 + "%");
}

$("#barraTitulo").click(onclick, function (){
    $(".botonVolverCole").hide();
    $(".selectores").removeClass("botonPresionado"); 
	$("#imagenSexo1").hide();
	$("#imagenSexo").show();
    coloresSecciones("#318DA6", "#CDEAFB");
    $("#tituloJornadas").show(anima);
	$(".columnaGraficas").hide();
	$(".columnaInfo").hide();
	$("#donaNivel").show(anima);
	$("#columnaInfoNiveles").show(anima);
	$("#donaJornada").show(anima);
	$("#columnaInfoJornadas").show(anima);
	var longitud = desercionjor.length - 1;
	convertirEficiencia("Desercion",desercionjor[longitud]);
	convertirEficiencia("Aprobacion", aprobacionjor[longitud]);
	convertirEficiencia("Reprobacion", reprobacionjor[longitud]);
	convertirEficiencia("Transferencia", transferenciajor[longitud]);
	cambiarColorGraficas(color1Dona);
	llenarDonaRecursos(0,color1Dona);
	numeroEstuPorProfe(0)
	jActiva = "";
});


    
function coloresSecciones(color1, color2) {
    $("#barraTitulo").css("background-color", color1); 
    $(".contenidoIdentificacion").css("color", color1);
    $(".tituloIdenficacion").css("color", color1);
    $("#agregarColegioFavorito").css("color", color1);
	$("#textoSexo").css("color", color1);
	$(".CircleCarac").css("fill", color1);
	$(".listasCaracteristicas").css("color", color1);
	$(".lineaGraficas").css("border-color", color1);
	$(".tituloColor").css("color", color1);
	$(".textoMulticolor").css("border-color", color1);
	$("#contenidoRecursos h3").css("color", color1);
	$("#contenidoRecursos h3").css("border-color", color1);
	$("#barraPorEstudiantes").css("border-color", color1);
	$("#contenidoRecursos .textoLeyendaBarra").css("cssText", "color: " + color1 + "!important;");
}

$("#busquedaPopup").click(onclick,function(){
    
    cerrarInfocole();
    mostrarPaneles();
    $("#barraSesion").hide(anima);
});


function sectorSeleccion (sector){
    var url = "http://geoportal.dane.gov.co/wssicole/serviciobusqueda.php?";
    
    if(sector == "todos" ){
		url += "&sector=todos";
	}
	else{
		if(sector =="oficial"){
			url += "&sector=oficial";
		}
		if(sector == "nooficial"){
			url += "&sector=nooficial";
		}
	}
}

$("#inputBusqueda2").click(onclick, function(){

});

function ocultarBusqueda(){
	
}




/***********************************************************************************************************************************************************************************************************************
																					TIPS
***********************************************************************************************************************************************************************************************************************/																								

$("#cerrarTips").click(onclick, function () {
    closeTips();
});

$("#cerrarTips").keypress(function (e) {
    if(e.which==13){
        closeTips()
    }

});

function closeTips(){
    $("#ventanaFondoTips").hide();
    $("#tips").hide(anima);
    var focusTrapTipsPopUp=returnFocusTrapTipsPopUp();
    focusTrapTipsPopUp.deactivate();
    $("#tipoDeBusqueda").focus();
}

/*$("#ventanaFondoTips").click(onclick, function(){
	$("#ventanaFondoTips").hide(anima);
})*/

$(".escogerCircle").click(onclick, function(){
	clearTimeout(ciclo);
	$(".escogerCircle").attr("r","5");
	$(this).attr("r","10");
	var id = $(this).attr("id").replace("circle","");
	randomTip = parseFloat(id);
	cambiarTips();

});

$(".escogerCircle").keypress(function(e){
	if(e.which==13){
        clearTimeout(ciclo);
        $(".escogerCircle").attr("r","5");
        $(this).attr("r","10");
        var id = $(this).attr("id").replace("circle","");
        randomTip = parseFloat(id);
        cambiarTips();
	}
});


$("#ventanaFondoTips").click(onclick, function (){
	$("#ventanaFondoTips").hide();
	$("#tips").hide(anima);
})

$(".numeros").click(onclick, function() {
	if($(this).hasClass( "puntos" )!= true){
		$(".numeros").css("font-size","1.1rem").css("font-weight", "500").css("margin-top","0%").css("color", "#999");
		$(this).css("font-size","1.3rem").css("font-weight", "600").css("margin-top","-1%").css("color", "#19B3E9");
		var id = $(this).attr("id").replace("seccion","");
		randomTip = parseFloat(id);
		cambiarMiniAyuda();
	}
})

function cambiarTips(){
	var titulo = "";
	var texto = "";
	var rutaImagen = "";
	switch (randomTip){
		case 1: 
			titulo = "1. ¿Qué es  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;?";
			texto = "Sicole es la sigla de Sistema de Consulta Geográfico de Colegios, un aplicativo que permite al usuario encontrar información sobre educación, desde preescolar hasta el grado 11.  Por ahora cubre Bogotá y Soacha, aunque se espera ampliarlo, próximamente, a otras ciudades del país"
			$("#logoQueEs").show();
			$("#infoTipsLetras p").css("margin-top", "-5%");
			break; 
		case 2: 
			titulo = "2. Funciones SIG";
			texto = "Las funciones SIG de Sicole (SIG es la sigla de Sistemas de Información Geográfica) le permiten realizar operaciones basadas en el espacio: ubicarse automáticamente; conocer qué colegios están cerca de su ubicación; saber el recorrido más rápido entre su casa y un colegio; entre otros"
			$("#logoQueEs").hide();
			$("#infoTipsLetras p").css("margin-top", "0");
			break; 
		case 3: 
			titulo = "3. Barra de búsqueda, Sí-mapas y registro";
			texto = "SICOLE tiene varias funcionalidades que valen la pena explorar. Dos buscadores de colegios, mapas que mejoran la visualización de la información y la posibilidad de ser usuario registrado."
			$("#logoQueEs").hide();
			$("#infoTipsLetras p").css("margin-top", "0");
			break;
		
		case 4: 
			titulo = "4. Tip de mes";
			texto = "Puede descargar una tabla con la información de los colegios (microdatos). Esta función está ubicada en la parte izquierda del aplicativo, en la pestaña “filtros”. Si quiere descargar únicamente los colegios filtrados, escoja: “ver reporte completo”.  Si quiere descargar todos los colegios del área de estudio escoja: descargar todos los colegios. "
			$("#logoQueEs").hide();
			$("#infoTipsLetras p").css("margin-top", "0");
			break;	 
	}
	
	$(".escogerCircle").attr("r","5");
	$("#circle" + randomTip +"").attr("r","10");
	$("#infoTips h3").html(titulo);
	$("#infoTips p").text(texto);
	var top1 = (parseFloat($("#infoTipsImagen").height()) - parseFloat($("#infoTipsLetras").height()))/2; 
	$("#infoTipsLetras").css("margin-top", top1);
	animarTips();
			
}

$("#infoTips").click (onclick, function(){
	clearTimeout(ciclo);
	$("#ventanaMiniAyuda").show(anima);
	$("#ventanaFondoTips").hide();
	$("#tips").hide(anima);
	$(".numeros").css("font-size","1.1rem").css("font-weight", "500").css("margin-top","0%").css("color", "#999");
	$("#seccion" + randomTip).css("font-size","1.3rem").css("font-weight", "600").css("margin-top","-1%").css("color", "#19B3E9");
	cambiarMiniAyuda();
});

function cambiarMiniAyuda(){
	$(".areaEditable").hide();
	var anima2 = 800
	switch (randomTip){
		
		case 1: 
			$("#areaEditable1").show(anima2);
			break;
		case 2: 
			$("#areaEditable2").show(anima2);
			break;	
		case 3: 
			$("#areaEditable3").show(anima2);
			break;
		case 4: 
			$("#areaEditable4").show(anima2);
			break;			
	}

}


$("#volverPerfil2").click(onclick,function(){
    isOnUpdateInfo=false;
    var focusTrapUpdateForm=returnFocusTrapUpdateForm();
    focusTrapUpdateForm.deactivate();

	$("#formularioActualizar").hide(anima);
	$("#seccionPerfil").show(anima);

    $("#tituloNombre").focus();
    var focusTrapPhotoForm=returnFocusTrapPhotoForm();
    focusTrapPhotoForm.activate();
});

$("#iconoAyuda").click(onclick,function(){
	if($("#menuAyuda").css("display") == "none"){
		$("#iconoAyuda").attr("aria-expanded", "true");
		$("#menuAyuda").show(anima);
	}else{
		onCloseHelpMenu();
	}
	
	$("#menulogueo").hide(anima);
    $("#ventanaAno").hide();
})

function onCloseHelpMenu(){
    $("#iconoAyuda").attr("aria-expanded", "false");
    $("#menuAyuda").hide(anima);
}


function showZoom(value){
	var zoom = 32 -value;
	if(map){
		map.setZoom(parseFloat(zoom));
	}
	if(map2 && map3){
		map2.setZoom(parseFloat(zoom));
		map3.setZoom(parseFloat(zoom));
	}	
	
}


function ubicarIndicador1(valorSlider,output, valorSlider2){	
	width = $("#slider-range").width();
	// Prevent bubble from going beyond left or right (unsupported browsers)
	if (valorSlider < 0) { newPlace = 0; }
	else if (valorSlider > 1) { newPlace = width; }
	else { newPlace = (width * valorSlider);}
	var texto = "";
	margen = -0.03 * parseFloat($(".categoriasMargen").height());
	//if(valor <=mitad){
	if("profes1Output"==output){
		newPlace-=width/2-5;
		$("#" + output +"").css("left", newPlace + "px").text(valorSlider);
	}else{
		if(valorSlider2!=0){
				newPlace-=width+4;
		}else{
			newPlace-=width-3;
		}
		
		$("#" + output +"").css("left", newPlace + "px").text(valorSlider);
	}
	
	//
}

function ubicarIndicador2(valorSlider,output, valorSlider2){	
	var width = $("#slider-range").width();
	// Prevent bubble from going beyond left or right (unsupported browsers)
	if (valorSlider < 1) { newPlace = 0; }
	else if (valorSlider > 100) { newPlace = width; }
	else { newPlace = (width * valorSlider)/100;}
	var texto = "";
    if(output == "docenteEst1" || output == "docenteEst2"){
        margen = -0.03 * parseFloat($(".categoriasMargen").height());
    }else
        {
            margen = 0;
        }
	//if(valor <=mitad){
	if(output == "docenteEst2"){
        newPlace = newPlace-width;
    }else{
        
        newPlace-=7;
    }
		
		$("#" + output +"").css("left", newPlace + "px").text(valorSlider);

	
	//
}



	
function ubicarIndicador(el){	
			 
	// Measure width of range input
	width = el.width();
	var mitad = (el.attr("max")-el.attr("min"))/2;
	// Figure out placement percentage between left and right of input
	newPoint = (el.val() - el.attr("min")) / (el.attr("max") - el.attr("min"));	  
	offset = -1;
	var ancho1 = $("#outputDistancia").width()/2;
	// Prevent bubble from going beyond left or right (unsupported browsers)
	if (newPoint < 0) { newPlace = 0; }
	else if (newPoint > 1) { newPlace = width; }
	else { newPlace = (width * newPoint); offset -= newPoint; }
	var valor = parseFloat(el.val())
	if(el.attr("id")=="filtroDistanciaR" || el.attr("id")=="sliderCerca"){
		var valor1 = (valor/1000).toFixed(1);
		var texto = "km"
	} else{
		valor1 = valor;
		var texto = "";
	}
	newPlace-= ancho1; 
	margen = -0.03 * parseFloat($(".categoriasMargen").height());
	//if(valor <=mitad){
		var valor3 = valor - el.attr("min")
		var valor2 = (mitad - valor3)/mitad ;
	
	newPlace+= valor2*9; 
	if(el.attr("id")=="sliderCerca"){
		newPlace-=8;
	}else if (el.attr("id")=="numeroEstudiantes"){
		newPlace-=7;
	}else if (changeTasas == true){
		newPlace-=9;
		if(valor1 == 1|| valor ==0){
			newPlace+=5;
		}
		changeTasas = false;
	}else if(el.attr("id") == "filtroDistanciaR"){
		newPlace-=17;
	}
	el
		.next("output")
		.css({
			marginLeft: newPlace + "px"//offset + "%"
		})
		.text(valor1 + texto);		 
}

/* $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );*/


	
$(".botonSectorSiMapa").click(onclick, function(){
	$(".botonSectorSiMapa").removeClass("gradiante2")	
	$(".botonSectorSiMapa").addClass("gradiante1")
	$(this).removeClass("gradiante1");
	$(this).addClass("gradiante2");
	if(idCalor!= ""){	
		mapaCalor(idCalor);
	}	
});

$(".boton2SiMapa").click(onclick, function(){
	console.log("hizo click en caracteristicas")
	$(".boton2SiMapa").removeClass("gradiente4");
	$(".boton2SiMapa").addClass("gradiente3");
	$(this).removeClass("gradiante3");
	$(this).addClass("gradiente4");
	$("#tituloSiMapa").text($(this).text());
	$("#contenedorVariablesSiMapa").show(anima);
	$("#barraMapa ul").html("");
	if($(this).text() != "Eficiencia interna"){
		llenarSiMapa($(this).text());
		$("#contenedorSubtemas").hide();
	}else{
		llenarSubtemaSiMapa();
	}
})


function llenarSubtemaSiMapa(){
	$("#contenedorSubtemas").html("");
	var htmlSubtemas = "";
		//vectorTasas
	console.log(vectorTasas.length);
	for(h=0; h<vectorTasas.length;h++){
		var letras = vectorTasas[h].replace("ó","o");
		htmlSubtemas+= '<div id = "tasa' + letras +'" class = "subTituloSiMapa subCategorySiMapa"><a href="#" class="a-tag-no-decoration">Tasa de ' + vectorTasas[h] + '</a><div id = "imagen' + letras +'" class = "imagenSubtitulo"></div></div>';
		htmlSubtemas+= llenarTasas(vectorTasas[h])
	}
	
	$("#contenedorSubtemas").html(htmlSubtemas);
	$(".listadosTasas").hide();
	$("#contenedorSubtemas").show(anima);
	
	$(".subTituloSiMapa").click(onclick, function(){
		var idTasa = $(this).attr("id");
		var nombreImagen = $(this).attr("id").replace("tasa", "imagen") 
		idTasa = idTasa.replace("tasa", "lista")	
		var listaDiv = $("#" + idTasa + "");
		if(listaDiv.css("display") == "none"){
			listaDiv.show(anima);
			$("#" + nombreImagen +"").css("background-image", "url(imagenes/flecha_azul.png)")
		}else{
			listaDiv.hide(anima);
			$("#" + nombreImagen +"").css("background-image", "url(imagenes/flecha_azulder.png)")
		}
	})
	
	$("#barraMapa li").click(onclick, function(){
		$("#ocultarClusters").show();
		variableSiMapa = $(this).attr("id");
		hacerclicOpcion();
		$(this).css("color","#B6134E"); 
		$(this).children().removeClass("colorLiMapa");
		$("#etiquetaMapa").text($(this).children().text());
		correrMapa = true;
		if($("#mapasContinuos").hasClass("comparacionGradiante2")){
			idCalor = $(this).attr("id");
			mapaCalorComparacion("oficial", map_izquierdo);
			$("#barraCalor1").css("background", $("#barraCalor").css("background") );
			$("#barraCalor1").show(anima);
			mapaCalorComparacion("nooficial", map);
		}else if($("#mapasParalelos").hasClass("comparacionGradiante2")){
			idCalor = $(this).attr("id");
			mapaCalorComparacion("oficial", map2);
			$("#barraCalor1").css("background", $("#barraCalor").css("background") );
			$("#barraCalor1").show(anima);
			mapaCalorComparacion("nooficial", map3);
		}else{
			
			mapaCalor($(this).attr("id"));
		}
		$("#funcionalidadActual").animate({
			top: "115px"
		},anima);
		$("#cerrarFuncionalidad").animate({
			top: "115px"
		},anima)
	})
	
}

function mapaCalor(id){
	var sector = "",
		servicio = "";
	idCalor = id;
   
	if($("#todosSiMapa").hasClass("gradiante2")){
		sector = "todos";
	}else if ($("#oficialSiMapa").hasClass("gradiante2")){
		sector = "oficial";
	}else if ($("#noOficialSiMapa").hasClass("gradiante2")){
		sector = "nooficial";
	}
    
    var idcalor2 = idCalor + sector 
        console.log("id " + idcalor2);
        textoMapa(idcalor2);

		servicio = escogerMapa(id, sector);
		
		servicio = servicio + "_" + sector + "_v"
		if("idw_sb11_nooficial_v" == servicio || "idw_sb11_todos_v" == servicio){
			servicio = servicio.replace("_v", "");
		}
		if(servicio == "idw_reprob_secu_oficial_v"){
			servicio = "idw_reprob_secu_oficial_f1";
			var clave = "omnq4yUY2D8TpiDa";
			//servicio = "IDW_ReprobSecuOficial";
		}else{
			var clave = "I4YYbPSw13ugmbAP";
		}
		if(servicio == "idw_aprob_prim_nooficial_v" || servicio == "idw_aprob_prees_nooficial_v" || servicio == "idw_aprob_secu_nooficial_v" || servicio == "idw_aprob_med_nooficial_v"){
			servicio = servicio.replace("_v", "_d");
		}
	map.setZoom(11);
	var zoom = map.getZoom();
	capaMapTypeOptions = {
		getTileUrl: function (coord, zoom) {
			if (zoom < 9 || zoom > 20){
				
				return null;
			}
			else{

					var url = "http://tiles.arcgis.com/tiles/" + clave +"/arcgis/rest/services/" + servicio + "/MapServer/tile/" + zoom + "/" + coord.y + "/" + coord.x;
					return url;
				}
					
			
		},
		tileSize: new google.maps.Size(256, 256),
		opacity: 0.8
	};
	
	
	var capaMapType = new google.maps.ImageMapType(capaMapTypeOptions); 
	map.overlayMapTypes.setAt("0", null);
	if(servicio!= "__v"){
		map.overlayMapTypes.setAt("0", capaMapType);
	}
	
}



function escogerMapa(id, sector){
	var parent = "",
	    numero = 0;
	
	if($("#eficienciaInterna").hasClass("gradiente4")){
		$("#textoBarra1").html("Menor tasa");
		$("#textoBarra2").html("Mayor tasa");
		parent = $("#" + id + "").parent().attr('id');
		parent = parent.replace("lista","");
		numero = id.replace(parent, "")
		
		servicio = "idw_";
		switch(parent){
			case "transferencia":
				servicio+= "transfe";
				break;
			case "reprobacion":
				servicio+= "reprob"
				break;
			case "desercion":
				servicio+= "deser";
				break;
			case "aprobacion":
				servicio+= "aprob";
				break;
				
		}
		switch(numero){
			case "1":
				servicio+= "_prees";
				break;
			case "2":
				servicio+= "_prim";
				break;		
			case "3":
				servicio+= "_secu";
				break;
			case "4":
				servicio+= "_med";
		}
		
		
	}
	
	switch(id){
		case "Caracteristicas1":
			servicio = "k_totmat";
			if(sector== "oficial"){
				cambiarGradiente("rgba(156,34,23,1)", "rgba(252,216,215,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(41,94,89,1)", "rgba(209,237,231,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(70,116,153,1)", "rgba(207,225,230,1)");
			}	
			break;
		case "Caracteristicas2":
			servicio = "k_prees";
			if(sector== "oficial"){
				cambiarGradiente("rgba(181,80,49,1)", "rgba(247,225,203,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(167,209,42,1)", "rgba(236,252,202,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(128,101,69,1)", "rgba(237,233,168,1)");
			}
			break;	
		case "Caracteristicas3":
			servicio = "k_prim";
			if(sector== "oficial"){
				cambiarGradiente("rgba(121,29,242,1)", "rgba(220,179,230,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(105,117,55,1)", "rgba(213,237,173,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(12,63,156,1)", "rgba(210,210,252,1)");
			}
			break;	
		case "Caracteristicas4":
			servicio = "k_secu";
			if(sector== "oficial"){
				cambiarGradiente("rgba(204,31,106,1)", "rgba(255,201,224,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(62,111,148,1)", "rgba(207,225,230,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(201,35,26,1)", "rgba(252,231,210,1)");
			}
			break;	
		case "Caracteristicas5":
			servicio = "k_med";
			if(sector== "oficial"){
				cambiarGradiente("rgba(245,131,32,1)", "rgba(255,232,199,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(117,22,4,1)", "rgba(255,248,120,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(34,89,84,1)", "rgba(209,237,231,1)");
			}
			break;	
		case "Calidad1":
			servicio = "idw_sb11";
			if(sector== "oficial"){
				cambiarGradiente("rgba(93,44,112,1)", "rgba(226,209,240,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(112,12,242,1)", "rgba(219,177,230,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(16,204,16,1)", "rgba(198,252,197,1)");
			}
			break;
		case "Recursos1":
			servicio = "k_totdoc";
			if(sector== "oficial"){
				cambiarGradiente("rgba(219,14,7,1)", "rgba(255,196,194,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(54,209,150,1)", "rgba(201,245,232,1)");
				servicio = "k_tot_doc";
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(37,105,54,1)", "rgba(213,240,226,1)");
			}
			break;
		case "Recursos2":
			servicio = "idw_estdoc";
			if(sector== "oficial"){
				cambiarGradiente("rgba(240,120,14,1)", "rgba(255,232,240,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(93,44,112,1)", "rgba(224,206,237,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(23,204,20,1)", "rgba(200,255,199,1)");
			}
			break;
		case "Recursos3":
			servicio = "idw_docpg";
			if(sector== "oficial"){
				cambiarGradiente("rgba(37,105,54,1)", "rgba(213,240,226,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(117,21,4,1)", "rgba(255,253,125,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(117,21,4,1)", "rgba(255,253,125,1)");
			}
			break;
		case "aprobacion1":	
			if(sector== "oficial"){
				servicio= "k_aprob_prees";
				cambiarGradiente("rgba(26,207,23,1)", "rgba(201,255,200,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(24,82,77,1)", "rgba(209,237,231,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(116,19,244,1)", "rgba(219,179,230,1)");
			}
			break;
		case "aprobacion2":	
			if(sector== "oficial"){
				cambiarGradiente("rgba(37,105,54,1)", "rgba(213,240,226,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(105,74,49,1)", "rgba(232,226,162,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(95,46,115,1)", "rgba(224,206,237,1)");
			}
			break;	
		case "aprobacion3":	
			if(sector== "oficial"){
				cambiarGradiente("rgba(240,120,8,1)", "rgba(255,231,196,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(0,57,148,1)", "rgba(205,206,250,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(201,16,103,1)", "rgba(252,197,219,1)");
			}
			break;
		case "aprobacion4":	
			if(sector== "oficial"){
				cambiarGradiente("rgba(199,21,18,1)", "rgba(252,230,207,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(48,100,140,1)", "rgba(200,221,227,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(171,65,36,1)", "rgba(247,225,203,1)");
			}
			break;
		case "reprobacion1":	
			if(sector== "oficial"){
				cambiarGradiente("rgba(95,46,115,1)", "rgba(221,202,235,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(196,14,14,1)", "rgba(252,230,207,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(25,15,226,1)", "rgba(199,196,255,1)");
			}
			break;
		case "reprobacion2":	
			if(sector== "oficial"){
				cambiarGradiente("rgba(160,205,23,1)", "rgba(232,250,195,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(201,16,103,1)", "rgba(255,200,222,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(102,72,48,1)", "rgba(235,230,164,1)");
			}
			break;	
		case "reprobacion3":	
			if(sector== "oficial"){
				cambiarGradiente("rgba(61,45,2,1)", "rgba(208,232,167,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(27,83,78,1)", "rgba(206,235,229,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(5,60,150,1)", "rgba(202,203,250,1)");
			}
			break;
		case "reprobacion4":	
			if(sector== "oficial"){
				cambiarGradiente("rgba(201,18,104,1)", "rgba(255,199,221,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(48,100,140,1)", "rgba(206,235,229,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(199,11,199,1)", "rgba(252,219,254,1)");
			}
			break;	
		case "desercion1":
			if(sector== "oficial"){
				cambiarGradiente("rgba(113,16,2,1)", "rgba(255,251,122,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(196,14,14,1)", "rgba(253,233,212,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(159,204,21,1)", "rgba(236,252,202,1)");
			}
			break;
			
		case "desercion2":
			if(sector== "oficial"){
				cambiarGradiente("rgba(240,118,13,1)", "rgba(255,232,199,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(245,0,0,1)", "rgba(245,237,0,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(50,103,143,1)", "rgba(202,221,227,1)");
			}
			break;
		case "desercion3":
			if(sector== "oficial"){
				cambiarGradiente("rgba(94,45,113,1)", "rgba(223,205,237,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(24,81,76,1)", "rgba(206,235,229,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(221,15,102,1)", "rgba(224,199,221,1)");
			}
			break;
		case "desercion4":
			if(sector== "oficial"){
				cambiarGradiente("rgba(20,204,17,1)", "rgba(200,255,199,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(102,72,48,1)", "rgba(235,230,164,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(113,15,242,1)", "rgba(217,174,230,1)");
			}
			break;
		case "transferencia1":
			if(sector== "oficial"){
				cambiarGradiente("rgba(37,105,54,1)", "rgba(212,238,224,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(240,120,14,1)", "rgba(255,228,194,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(51,103,143,1)", "rgba(227,228,230,1)");
			}
			break;
		case "transferencia2":
			if(sector== "oficial"){
				cambiarGradiente("rgba(26,207,23,1)", "rgba(194,252,192,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(199,10,100,1)", "rgba(255,202,226,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(27,83,78,1)", "rgba(206,235,229,1)");
			}
			break;
		case "transferencia3":
			if(sector== "oficial"){
				cambiarGradiente("rgba(48,207,146,1)", "rgba(201,245,232,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(111,11,2,1)", "rgba(255,251,122,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(50,207,146,1)", "rgba(212,240,233,1)");
			}
			break;
		case "transferencia4":
			if(sector== "oficial"){
				cambiarGradiente("rgba(98,110,47,1)", "rgba(208,232,167,1)");
			}else if(sector == "nooficial"){
				cambiarGradiente("rgba(197,9,10,1)", "rgba(252,229,207,1)");
			}else if(sector == "todos"){ 
				cambiarGradiente("rgba(107,77,54,1)", "rgba(232,226,162,1)");
			}
			break;		
	}
	return servicio;
}	


function cambiarGradiente(color, color2){
	$("#barraCalor").css({
		
		background: "rgba(255,255,255,1)",
		background: "-moz-linear-gradient(left, "+ color2 +" 0%, " +  color + " 90%, " + color + " 100%)",
		background: "-webkit-gradient(left top, right top, color-stop(0%, " + color2 + "), color-stop(90%, " + color +"), color-stop(100%, " + color +"))",
		background: "-webkit-linear-gradient(left, "+ color2 +" 0%, " +  color + " 90%, " + color + " 100%)",
		background: "-o-linear-gradient(left, "+ color2 +" 0%, " +  color + " 90%, " + color + " 100%)",
		background: "-ms-linear-gradient(left, "+ color2 +" 0%, " +  color + " 90%, " + color + " 100%)",
		background: "linear-gradient(to right, " + color2 +" 0%, " +  color + " 90%, " + color + " 100%)"
	});
}


function llenarTasas(nombreTasa){
	var htmlTasas = "";
	var nombreTasa1= nombreTasa.replace("ó", "o")
	htmlTasas = '<ul id = "lista' + nombreTasa1 + '" class = "listadosTasas">';
	for(i =0; i<tasasNiveles.length; i++){
		var j = i+1;
		htmlTasas+= "<li id ='" + nombreTasa1 + j + "' class='li-heatmap'><a href='#' class = 'colorLiMapa a-tag-no-decoration' tabindex='0'> Tasa de " + nombreTasa + " en " + tasasNiveles[i] +"</a></li>";
	}
	htmlTasas+= "</ul>";
	return htmlTasas;
	
	
}
 
 function hacerclicOpcion(){
		$("#barraMapa li").css("color","#01B4ED");
		$("#barraMapa li").children().addClass("colorLiMapa");
		$("#etiquetaMapa").show(anima);
		$("#explicacionMapa").show(anima);
		$("#comparacionMapas").show(anima);
		var margenIzq = parseFloat($("#ventanaCategoriasIzq").width()) +30;
		$("#comparacionMapas").css("margin-left", margenIzq);
		if($("#infoColeEsp").css("display") == "block"){
			desplegarGrafica();
			variableGrafica();
			$("#explicacionMapa").css("top", "auto");
			$("#explicacionMapa").animate({
				bottom: "9%",
				width: "26%"
			}, anima);
		}
 }
 
 function llenarSiMapa(titulo){
	var htmlLista = "";
	var vector = [];
	titulo = titulo.replace(" " ,"");
	titulo = titulo.replace("í", "i");
	
	if(titulo == "Caracteristicas"){
		vector = vectorCaracteristicas;
		$("#textoBarra1").html("Menos estudiantes");
		$("#textoBarra2").html("Más estudiantes");
	}else if(titulo == "Calidad"){
		vector = vectorCalidad;
		$("#textoBarra1").html("Menor tasa");
		$("#textoBarra2").html("Mayor tasa");
	}else if(titulo == "Recursos"){
		vector = vectorRecursos;
		$("#textoBarra1").html("Menos docentes");
		$("#textoBarra2").html("Más docentes");
	}
	
	
	for(i=0; i<vector.length; i++){
		var j = i+1;
		htmlLista+= "<li id ='" + titulo + j + "' class='li-heatmap'><a href='#' class = 'colorLiMapa'>" + vector[i] + "</a></li>";
	}
	$("#barraMapa ul").html(htmlLista);
	
	$("#barraMapa li").click(onclick, function(){
		variableSiMapa = $(this).attr("id");
		$("#ocultarClusters").show();
		hacerclicOpcion();
		$(this).css("color","#B6134E"); 
		$(this).children().removeClass("colorLiMapa");
		$("#etiquetaMapa").text($(this).children().text());
		correrMapa = true;
		if($("#mapasContinuos").hasClass("comparacionGradiante2")){
			idCalor = $(this).attr("id");
			mapaCalorComparacion("oficial", map_izquierdo);
			$("#barraCalor1").css("background", $("#barraCalor").css("background") );
			$("#barraCalor1").show(anima);
			mapaCalorComparacion("nooficial", map);
		}else if($("#mapasParalelos").hasClass("comparacionGradiante2")){	
			idCalor = $(this).attr("id");
			mapaCalorComparacion("oficial", map2);
			$("#barraCalor1").css("background", $("#barraCalor").css("background") );
			$("#barraCalor1").show(anima);
			mapaCalorComparacion("nooficial", map3);
		}else{
			mapaCalor($(this).attr("id"));
		}
		$("#funcionalidadActual").animate({
			top: "115px"
		},anima);
		$("#cerrarFuncionalidad").animate({
			top: "115px"
		},anima)
		
		
	})
	
 }
 
 $("#explicacionMapa").click(function(){
	if($("#desplegadaExplicacion").css("display") == "none"){
		if($("#infoColeEsp").css("display") == "block"){
            var bottom = $("#desplegadaExplicacion").height() + 60;
			$("#desplegadaExplicacion").css("top", "auto").css("bottom", bottom).width("26%");
			$(this).animate({bottom: "20%"},anima);
		}else{
			$("#desplegadaExplicacion").css("top", "95px").css("bottom", "auto").width("25%");
		}
		$("#desplegadaExplicacion").show(anima)
		$("#desplegarExplicacion").css("background-image", "url(imagenes/flecha_azul.png)");
	}else{
		if($("#infoColeEsp").css("display") == "block"){
			$(this).animate({ bottom: "9%"},anima);
		}
		$("#desplegadaExplicacion").hide(anima);
		$("#desplegarExplicacion").css("background-image", "url(imagenes/flecha_azulder.png)");
	}
 });
 
$("#iniciarComparacion").click(onclick, function(){
	$("#ocultarCluster").hide();
	if($(this).hasClass("comparacionGradiante1")){
		$(".indicadoresSector").show(anima);
		$(this).removeClass("comparacionGradiante1");
		$(this).addClass("comparacionGradiante2");
		$("#iniciarComparacion p").css("color", "white");
		$(".cambiarComparacionMapas").addClass("comparacionGradiante1");
		$("#mapasParalelos").css("color", "white");
		$("#mapasParalelos").addClass("comparacionGradiante2");
		$("#botoneraSiMapa").hide(anima);
		$("#sidebar").hide();
		$("#contenedorParalelos").show(anima);
		$(".cambiarComparacionMapas").css("cursor", "pointer"); 
		setTimeout(function(){
			paralelos();
		}, 501)
	}else{
		$(".indicadoresSector").hide(anima);
		$(this).removeClass("comparacionGradiante2");
		$(this).addClass("comparacionGradiante1");
		$("#iniciarComparacion p").css("color", "#333");
		$(".cambiarComparacionMapas").removeClass("comparacionGradiante1");
		$(".cambiarComparacionMapas").removeClass("comparacionGradiante2");
		$(".cambiarComparacionMapas").css("color","#333");
		$("#botoneraSiMapa").show(anima);
		$("#sidebar").hide();
		mapaCalor(idCalor);
		$("#barraCalor1").hide(anima);
		$("#contenedorParalelos").hide(anima);
		$(".cambiarComparacionMapas").css("cursor", "default");
		cargarMapa();
	}
})

$(".cambiarComparacionMapas").click(onclick, function (){
	if($("#iniciarComparacion").hasClass("comparacionGradiante2")){
		$(".cambiarComparacionMapas").removeClass("comparacionGradiante2");
		$(".cambiarComparacionMapas").css("color","#333");
		$(this).addClass("comparacionGradiante2");
		$(this).css("color","white");
		inicializarSitiosIni();
		if($("#mapasContinuos").hasClass("comparacionGradiante2")){
			$("#contenedorParalelos").hide(anima);
			deslizar();
		}else{
			if($("#mapasParalelos").hasClass("comparacionGradiante2")){
				$("#sidebar").hide();
				$("#contenedorParalelos").show(anima);
				setTimeout(function(){
					paralelos();
				}, 501)
			}
		}
		
		
	}
})

function desplegarGrafica(){
	$("#graficaFuncion").show(anima);
	//console.log(variableSiMapa);
	var abajo = parseFloat($("#barrainferior").height());
	abajo+= 120;
	$("#comparacionMapas").css("bottom", abajo + "px")
}

function agregarAFavoritos (){
	var numeroDato = cambiaraNumeroDoc(datossesion.tipodocumento);
	var uri = "";
	var palabra= "";
    
    
    
	if (favorito == false){
		$("#estrellaColegioFavorito").css("background-image", "url(imagenes/agregado.png)");
		uri = "http://geoportal.dane.gov.co/wssicole/favoritos.php?operacion=crear";
		uri+="&tipo_documento=" + numeroDato;
		uri+= "&numero_documento=" + datossesion.cedula;
		uri+= "&codigo_sede=" +codsedeActiva;	
		$("#agregarColegioFavorito").text("Agregado a favoritos");
		favorito = true;
		palabra = "Se ha agregado la sede a la lista de tus favoritos";
	}else if (favorito == true){
		$("#estrellaColegioFavorito").css("background-image", "url(imagenes/agregar.png)");
		$("#agregarColegioFavorito").text("Agregar a favoritos");
		uri = "http://geoportal.dane.gov.co/wssicole/favoritos.php?operacion=borrar";
		uri+="&tipo_documento=" + numeroDato;
		uri+= "&numero_documento=" + datossesion.cedula;
        uri+= "&codigo_sede=" +codsedeActiva;
        
		palabra = "Se ha eliminado esta sede de la lista de tus favoritos";	
        favorito = false; 
	}

	d3.json(encodeURI(uri), function(error, data) {
		if(data.estado==true){
			mensaje("¡Felicitaciones!", palabra );
		}else{
			mensaje("¡Error!", "No se pudo completar la acción");
		}
	});
}

function llenarFavoritos(){
	var tipoDoc = cambiaraNumeroDoc(datossesion.tipodocumento);
	uriPrefere ="http://geoportal.dane.gov.co/wssicole/favoritos.php?operacion=consultar&tipo_documento=" +tipoDoc+"&numero_documento=" + datossesion.cedula;
	d3.json(uriPrefere, function(error, sedestotal) {
		console.log(uriPrefere);
		if(sedestotal.favorito== true){
			numeroPrefere = sedestotal.sedes.length;
			colegiosfound = [];
			$("#contenedorFavoritos").html("");
			imprimirFavoritos(sedestotal.sedes);
		}
	});


}

function cambiarColorGraficas(arrayColor){
	var nombres = ["Desercion", "Aprobacion", "Reprobacion", "Transferencia"];
	for(i=0; i<nombres.length; i++){
		$("#tasa" + nombres[i] + "").css("background-color", arrayColor[i])
		$("#circulo" + nombres[i] + "").css("fill", arrayColor[i]);
	}

}


/*******************************************************************************************************************************************************************
														Cargar Donas
********************************************************************************************************************************************************************/


function hacerDona(data, total){
	var width = ($("body").width() * 0.11) -10,
		height = 140,
		radius = Math.min(width, height) / 2;
	var color = d3.scale.ordinal()
		.range(colorDonut);
	
	var arc = d3.svg.arc()
    .outerRadius(radius - 20)
    .innerRadius(radius - 40);
	var pi = (Math.PI)/2;
	
	var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {return d.population; });
	var svg = d3.select("#donaJornada").append("svg")
		.attr("id", "svgJornada")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");	
	
			 var g = svg.selectAll(".arc")
			.data(pie(data))
			.enter().append("g")
			.attr("class", "arc");
			
			g.append("path")
				.attr("d", arc)
				.style("fill", function(d) { return color(d.data.jornada); });
			
			
			
			var image_width = 20;
			var image_height = 20;

// add the image



			g.append("svg:image")
				.attr("xlink:href",function (d){
					switch(d.data.jornada){
						case "MANANA":
							return "imagenes/manana3.png"	
							break;
						case "TARDE":
							return "imagenes/tarde3.png"	
							break;
						case "NOCHE":
							return "imagenes/noche3.png"	
							break;
						case "FINDESEMANA":
							return "imagenes/sf3.png"	
							break;
						case "COMPLETA":
							return "imagenes/continua3.png"	
							break;	
					}	
				})
				.attr("transform", function(d){
					var x = arc.centroid(d)[0] - image_width/2;
					var y = arc.centroid(d)[1] - image_height/2;
					if(x>(-image_width/2) && x<0){
						x-= 10;
					}
					return "translate(" + x + "," + y + ")";
				})
				.attr("width", image_width)
				.attr("height", image_height);

					
			g.append("text")
				.attr("transform", "rotate(90)")
				.attr("class", "textoPromedio")
				.attr("transform", function(d){
				var x = arc.centroid(d)[0];
				var y = arc.centroid(d)[1];
				if(Math.abs(x)>2){
					x-=10;
					y-=12;
					
				}
				return "translate(" + x + "," + y + ")";
				})
				.style("font-size", "0.6rem")
				.text(function(d) { 
					var promedio = Math.round((d.data.population/total)*100);
					return promedio + "%"; 
				});
				
				g.append("text")
						.attr("id", "textoCentralN")
						.attr("transform", "translate(-18,0)")
						.style("font-size", "1rem")
						.style("width", "100")
						.text(function() {
							if(bandera1 == false){
								bandera1 = true; 
								return total
							}else{
								return "";
							}
						})
						
				g.append("text")
					.attr("id", "textoCentral")
					.attr("transform", "translate(-22,10)")
					.style("font-size", "0.5rem")
					.text(function() {
						if(bandera2 == false){
							bandera2 = true;
							return "Estudiantes"
						}else{
							return "";
						}
					})
}

function type(d) {
  d.population = +d.population;
  return d;
}

function hacerDona2(data, total, contenedor){
	var width = ($("body").width() * 0.11) -10,
		height = 140,
		radius = (Math.min(width, height) / 2);	
		
	var color = d3.scale.ordinal()
		.range(colorDonut);
	
	var arc = d3.svg.arc()
    .outerRadius(radius - 20)
    .innerRadius(radius - 40);
	var pi = (Math.PI)/2;
	
	var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {return d.population; });
	var svg = d3.select("#" + contenedor +"").append("svg")
		.attr("id", "svgNivel")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");	
	
			 var g = svg.selectAll(".arc")
			.data(pie(data))
			.enter().append("g")
			.attr("class", "arc");
			
			g.append("path")
				.attr("d", arc)
				.style("fill", function(d) { return color(d.data.jornada); });
			
			
			if(data.length == 1){
				var image_width = 20;
				var image_height = 20;
			}else{
				var image_width = 15;
				var image_height = 15;
			}
// add the image



			g.append("svg:image")
				.attr("xlink:href",function (d){
					switch(d.data.jornada){
						case "Preescolar":
							return "imagenes/preescolar1.png"	
							break;
						case "Primaria":
							return "imagenes/primaria1.png"	
							break;
						case "Secundaria":
							return "imagenes/secundaria1.png"	
							break;
						case "Media":
							return "imagenes/media1.png"	
							break;	
					}	
				})
				.attr("transform", function(d){
					if(data.length == 1){
						var x = -60;
						var y =-60;
					}else{
						var x = arc.centroid(d)[0]*1.6 - image_width/2;
						var y = arc.centroid(d)[1]*1.6 - image_height/2;
						
						if(x>60){
							y-=45;
							x-=20;
						}else if (y<-72){
							y+=5;
						}
					}
					
					return "translate(" + x + "," + y + ")";
				})
				.attr("width", image_width)
				.attr("height", image_height);

					
			g.append("text")
				.attr("class", "textoPromedio")
				.attr("transform", function(d){
				var x = arc.centroid(d)[0]-5;
				var y = arc.centroid(d)[1];
				return "translate(" + x + "," + y + ")";
				})
				.style("font-size", "0.6rem")
				.text(function(d) { 
					var promedio = Math.round((d.data.population/total)*100);
					return promedio + "%"; 
				});	
			
					g.append("text")
						.attr("id", "textoCentralN")
						.attr("transform", "translate(-18,0)")
						.style("font-size", "1rem")
						.style("width", "100")
						.text(function() {
							if(bandera1 == false){
								bandera1 = true; 
								return total;
							}else{
								return "";
							}
						})
						
					g.append("text")
						.attr("id", "textoCentral")
						.attr("transform", "translate(-22,10)")
						.style("font-size", "0.5rem")
						.text(function() {
							if(bandera2 == false){
								bandera2 = true;
								return "Estudiantes"
							}else{
								return "";
							}
						})
};


function hacerDona3(data, total, contenedor){
	var width = ($("body").width() * 0.085)-3,
		height = 150,
		radius = (Math.min(width, height) / 2);	
	var color = d3.scale.ordinal()
		.range(colorDonut);
	
	var arc = d3.svg.arc()
    .outerRadius(radius - 0)
    .innerRadius(radius - 20);
	var pi = (Math.PI)/2;
	
	var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {return d.population; });
	var svg = d3.select("#" + contenedor +"").append("svg")
		.attr("id", "svgInsumo")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");	
	
			 var g = svg.selectAll(".arc")
			.data(pie(data))
			.enter().append("g")
			.attr("class", "arc");
			
			g.append("path")
				.attr("d", arc)
				.style("fill", function(d) { return color(d.data.jornada); });
			
			
			if(data.length == 1){
				var image_width = 20;
				var image_height = 20;
			}else{
				var image_width = 15;
				var image_height = 15;
			}
// add the image					
			g.append("text")
				.attr("class", "textoPromedio")
				.attr("transform", function(d){
				var x = arc.centroid(d)[0]-5;
				var y = arc.centroid(d)[1];
				return "translate(" + x + "," + y + ")";
				})
				.style("font-size", "0.6rem")
               .style("fill" , "#f77f77")
            
				.text(function(d) { 
					var promedio = d.data.population;
					promedio = Math.round(promedio);
					return promedio + "%"; 
				});	
			
					g.append("text")
						.attr("id", "textoCentralN")
						.attr("transform", function () {
							if(total<10){
								return "translate(-10,0)"
							}else if(total<100){
								return "translate(-20,0)"
							}else{
								return "translate(-17,0)"
							}
						})
						.style("font-size", "1.8rem")
						.style("width", "100")
						.text(function() {
							if(bandera1 == false){
								bandera1 = true;
								return total;
							}else{
								return "";
							}
						})
						
					g.append("text")
						.attr("id", "textoCentral")
						.attr("transform", "translate(-30,20)")
						.style("font-size", "0.9rem")
						.style("color" , "rgb(49, 141, 166)")
						.text(function() {
							if(bandera2 == false){
								bandera2 = true;
								return "Docentes"
							}else{
								return "";
							}
						})
}; 
		
function crearFuncion(vector, posicionCod, valorCod, constante){
	var margin = {top: 10, right: 20, bottom: 10, left: 40},
	    width = parseFloat($("body").width())*0.36 - margin.left - margin.right,
		height = 75 - margin.top - margin.bottom;
	// Parse the date / time
	//var parseDate = d3.time.format("%d-%b-%y").parse;

	// Set the ranges
	var x = d3.time.scale().range([0, width]);
	var y = d3.scale.linear().range([height, 0]);

	// Define the axes
	var xAxis = d3.svg.axis().scale(x)
		.orient("bottom").ticks(0);

	var yAxis = d3.svg.axis().scale(y)
		.orient("left").ticks(3);

	// Define the line
	var valueline = d3.svg.line()
		.x(function(d) { return x(d.label); })
		.y(function(d) { return y(d.value); })
		.interpolate("linear");
		
	// Adds the svg canvas
	var svg = d3.select(".graficaLinea")
		.append("svg")
			.attr("id", "linea1")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", 
				  "translate(" + margin.left + "," + margin.top + ")");

	// Get the data
	//d3.csv("data.csv", function(error, data) {

		// Scale the range of the data
		x.domain(d3.extent(vector, function(d) { return d.label; }));
		y.domain([0, d3.max(vector, function(d) {  return d.value; })]);

		// Add the valueline path.
		svg.append("path")
			.attr("class", "line")
			.attr("id", "myPath")
			.attr("d", valueline(vector));

		// Add the X Axis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

		// Add the Y Axis
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis);

	//});
	svg.append("line")
		.attr("x1", 0)
        .attr("y1", constante + "%")
        .attr("x2", "100%")
        .attr("y2", constante + "%")
		.style("stroke", "rgb(143, 190, 43)");
	
	$("#circuloGrafica").remove();
	$("#circuloGrafica2").remove();
	$("#circuloGrafica3").remove();
	$("#lineaGrafica2").remove();
	$("#textoCirculo").remove();
	if(posicionCod!= -1){
		var variable = posicionCod/vector.length;
		variable = variable * myPath.getTotalLength()
		var myPoint = myPath.getPointAtLength(variable);
		d3.select("g").append("svg:circle")
			.attr("id","circuloGrafica")
			.attr("cx", myPoint.x)
			.attr("cy", function () {
				console.log(myPoint.y)
				if(myPoint.y<17.5)
					return 17.5;
				else if(myPoint.y>39.5){
					return 39.5;
				}else{ 
					console.log(parseFloat(myPoint.y)/57) *57;
					return (parseFloat(myPoint.y)/57) *57;
				}	
			})
			.attr("r", 13)
			.style("fill", "#B6134E");
			
		d3.select("g").append("svg:circle")
			.attr("id","circuloGrafica2")
			.attr("cx", myPoint.x)
			.attr("cy", "75%")
			.attr("r", 5)
			.style("fill", "#B6134E");
		
		d3.select("g").append("svg:circle")
			.attr("id","circuloGrafica3")
			.attr("cx", myPoint.x)
			.attr("cy", 0)
			.attr("r", 5)
			.style("fill", "#B6134E");
		
		d3.select("g").append("svg:line")
		.attr("id","lineaGrafica2")
		.attr("x1", myPoint.x)
        .attr("y1", "0")
        .attr("x2", myPoint.x)
        .attr("y2", "80%")
		.style("stroke", "#B6134E")
		.style("stroke-width", 3)

		d3.select("g").append("text")
			.attr("id","textoCirculo")
			.text(function (){
				if(valorCod<=1){
					return valorCod.toFixed(2);
				}else{
					return valorCod.toFixed(0);
				}
				
				
			})
			.attr("x",function(){
				if(valorCod<=1){
					return myPoint.x-12
				}else if(valorCod<10){
					return myPoint.x-8
				}else{
					return myPoint.x-8
				}
			
			})
			.attr("y", function () {
				if(myPoint.y<17.5){
					return 20.5;
				}else if(myPoint.y>39.5){
					return 42.5;
				}else{ 
					return myPoint.y+3
				}	
			})
			.style("fill","white")
			.style("font-size", "0.8rem")
	}
}

$(".volverMenu").click(onclick, function(){
	cerrarTodos();
	$(".encuestaOculta").hide();
	$("#sedeEncuesta").show();
	$("#sedeCuentanos").show(anima);
	if(entransporte == true){
		
		estadoRuta == 0;
		entransporte = false;
		salirTransporte();
	}
	$("#yourSchoolTellUs").focus();
});

function animarTips(){
	ciclo = setTimeout(function(){
		randomTip++;
		if(randomTip>4){
			randomTip = 1; 
		}
		cambiarTips();
	}, 20000);
}


function variableGrafica(){
//CodsedeActiva
	var palabraClave =  variableSiMapa;
	var numero = variableSiMapa.length-1;
	var posicion2 = parseFloat(variableSiMapa.slice(variableSiMapa.length-1,variableSiMapa.length))-1
	var uriGrafica = "http://geoportal.dane.gov.co/wssicole/servicio";
	var vectorGrafica = [];
	var posicionCod = -1;
	var valorCod = 0;
	var constante = 0;
	
	palabraClave = palabraClave.slice(0, palabraClave.length-1)
	palabraClave = palabraClave.toLowerCase();
	console.log("LE mot" + palabraClave);
	if(palabraClave == "calidad"){
		uriGrafica+= "calidad.php"
	}else if(palabraClave == "recursos"){
		uriGrafica+= "insumos.php"
	}else if(palabraClave == "desercion" || palabraClave == "aprobacion" || palabraClave == "reprobacion" || palabraClave == "transferencia"){
		uriGrafica+= "eficiencia.php?tipotasa=" + palabraClave;
	}else if(palabraClave == "caracteristicas"){
		
		uriGrafica= "http://geoportal.dane.gov.co/wssicole/colegio2.php";
	}else{
		uriGrafica = "";
	}
	if(uriGrafica != ""){
		d3.json(uriGrafica, function(error, data) {
			
			var arreglonombres = Object.getOwnPropertyNames(data[0]);
			var nombresCampos = [];
			var vectorGrafica = [];
			var posicionCod = -1;
			for(a = 0; a < arreglonombres.length; a++){
				if(arreglonombres[a] != "CODIGOSEDE" && arreglonombres[a] !="CLASIFICACION_SEDE" && arreglonombres[a]!= "NOM_COL" && arreglonombres[a]!= "COD_COL"){
					nombresCampos.push(arreglonombres[a]);
				}
			}
			console.log("posición: " + nombresCampos[posicion2]);
			var valoracumulado = 0;
			for(i=0; i< data.length;i++){
				var valor = data[i][nombresCampos[posicion2]];
				
				if(palabraClave == "caracteristicas" && valor == 0){
					valor = "";
				}
				
				if(valor=="" || valor == "NO APLICA"){
					valor = 0;
				}else{
					valor = parseFloat(data[i][nombresCampos[posicion2]].replace(",","."))
					vectorGrafica.push({label: i,  value: valor});
					if(data[i]["CODIGOSEDE"]==CodsedeActiva || data[i]["COD_COL"]==CodsedeActiva){
						posicionCod = i;
						valorCod = parseFloat(data[i][nombresCampos[posicion2]].replace(",","."));
					}
					valoracumulado+= valor;
					
				}
				
			}
			
			
			valoracumulado = valoracumulado/vectorGrafica.length;
			vectorGrafica.sort(function (a,b) {
				if (a.value >b.value) return  1;
				if (a.value < b.value) return -1;
				return 0;
			});
			

			constante = (-1*(valoracumulado/vectorGrafica[vectorGrafica.length-1].value)*73)+73;
			constante = constante.toFixed(2);
			console.log("Constante " + constante)
			var encontrado = false; 
			for(i=0;i<vectorGrafica.length;i++){
				
				if(vectorGrafica[i].label == posicionCod&& encontrado == false){
					posicionCod=i;
					encontrado = true;	
				}
				vectorGrafica[i].label = i;
			}
			$(".graficaLinea").html("");
			//crearFuncion(vectorGrafica, posicionCod, valorCod,constante);
			histograma(vectorGrafica,constante);		
		});
	}
	
}


$("#recuadroMapa").click(onclick, function(){
		$("#menuAyuda").hide(anima);
		if($(this).css("background-color")== "#B6134E"|| $(this).css("background-color")== "rgb(182, 19, 78)"){
			$(this).css("background-color", "transparent");
			$("#canvasRecuadro").hide(anima);
		}else{
			var html2 = "";
			var width2 = $( document ).width();
			var height2 = $( document ).height() * 0.87;
			html2= '<canvas id = "canvasRecuadro" width= "'+ width2 +'" height = "' + height2+ '"></canvas>'
			$("#recuadroDiv").html(html2).show(anima);
			$(this).css("background-color", "#B6134E");
			prepareCanvas();
		}	
})
$("#alejarMapa").click(onclick, function (){
	$("#menuAyuda").hide(anima);
	if(parseFloat(map.getZoom()) != 11){
		map.setZoom(11);
	}
})

$("#prevMapa").click(onclick, function (){
	clicPosicion = true;
	if(posicionActualMapa>0){
		$("#menuAyuda").hide(anima);
		posicionActualMapa--;
		map.setZoom(vectorPosicion[posicionActualMapa]);
		console.log(vectorPosicion[posicionActualMapa])
	}
	
	if(posicionActualMapa > 0){
		$(this).css("opacity", "1");
	}else{
		$(this).css("opacity", "0.4");
	}
	
	console.log(vectorPosicion);
	if($("#nextMapa").css("opacity")=="0.4"){
		$("#nextMapa").css("opacity", "1");
	}
});

$("#nextMapa").click(onclick, function (){
	clicPosicion = true;
	if(posicionActualMapa < vectorPosicion.length - 1 ){
		$("#menuAyuda").hide(anima);
		$(this).css("opacity", "1");
		posicionActualMapa++;
		map.setZoom(vectorPosicion[posicionActualMapa]);
		console.log(vectorPosicion[posicionActualMapa])		
	}else{
		$(this).css("opacity", "0.4");
	}
	if(posicionActualMapa < vectorPosicion.length - 1){
		$(this).css("opacity", "1");
	}else{
		$(this).css("opacity", "0.4");
	}
	if($("#prevMapa").css("opacity")=="0.4"){
		$("#prevMapa").css("opacity", "1");
	}
	console.log(vectorPosicion);
})


function prepareCanvas(){
	$("#canvasRecuadro").show(anima);
	miLienzo=document.getElementById("canvasRecuadro");
	contexto= miLienzo.getContext("2d"); // obtenemos el contexto ( dibujar en 2d);
	canvasLimites=miLienzo.getBoundingClientRect(); // obtenemos los limites del canvas
	miLienzo.addEventListener('mousedown',down,false);
	miLienzo.addEventListener('mouseup',up,false);
	miLienzo.addEventListener('mousemove',pintarCuadro,false);
	miLienzo.style.cursor="pointer";
}


function down(e) {
	mbegin=obtenerCoordenadas(e);
	paint= true;
}

function up() {
	paint= false;
	var coordenadas1 = deMouseAMapa(mbegin.x, mbegin.y+50);
	var coordenadas2 = deMouseAMapa(mend.w+mbegin.x, mend.h+mbegin.y);
	coordenadas1 = new google.maps.LatLng(coordenadas1.lati, coordenadas1.lon);
	coordenadas2 = new google.maps.LatLng(coordenadas2.lati, coordenadas2.lon);
	var bounds = new google.maps.LatLngBounds();
	bounds.extend(coordenadas1);
	bounds.extend(coordenadas2);
	map.fitBounds(bounds);	
	map.setZoom(map.getZoom()+1);
	$("#canvasRecuadro").animate({
		opacity: 0
	},100,function (){
		$("#recuadroDiv").hide();
		$("#recuadroDiv").html("");
		$("#recuadroMapa").css("background-color","transparent");
	});
	
}


function deMouseAMapa(coordenada1, coordenada2){

	var bounds = map.getBounds(),
		neLatlng = bounds.getNorthEast(),
		swLatlng = bounds.getSouthWest(),
		startLat = neLatlng.lat(),
		endLng = neLatlng.lng(),
		endLat = swLatlng.lat(),
        startLng = swLatlng.lng(),
        lat = startLat + ((coordenada2/(miLienzo.height)) * (endLat - startLat)),
        lng = startLng + ((coordenada1/(miLienzo.width)) * (endLng - startLng));
		return {
			lati:lat,
			lon:lng
		};

}
function pintarCuadro(e) {
	if(paint){
		mend=obtenerBounds(e);
		contexto.clearRect(0,0,miLienzo.width,miLienzo.height);
		dibujarCuadro();
	}
}
/*function  getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

  return {
    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
}*/
function obtenerCoordenadas(event){
	var posX;
	var posY;

	if (event.pageX || event.pageY){ 
		posX = (event.pageX)
		posY = (event.pageY- canvasLimites.top);
	}
	else {
		posX = (event.clientX - canvasLimites.left);
		posY = (event.clientY - canvasLimites.top);
	}
	return {
		x:posX,
		y:posY
		}
}

function obtenerBounds(event){
	var width;
	var height;
	var razon = $(document).width()/$(document).height();
	if (event.pageX || event.pageY) {
	width= (event.pageX-canvasLimites.left)-mbegin.x;
	height= (event.pageY- canvasLimites.top)-mbegin.y;
	}
	else {
	width= (event.clientX - canvasLimites.left)-mbegin.x;
	height= (event.clientY - canvasLimites.top)-mbegin.y;
	}
	return {
	w:width,
	h:width/razon
	};
}

function dibujarCuadro(){
	contexto.fillStyle="rgba(22,87,122,0.3)";
	contexto.fillRect(mbegin.x, mbegin.y,mend.w,mend.h);
}

$(".ubicadorTransporte").click(onclick, function (){
	$(".ubicadorTransporte").css("opacity",0.5);
	$(this).css("opacity",1);
	var id = $(this).attr("id");
	console.log(id);
	if(id == "ubicadorOrigen"){
		markerOrigen.setMap(map);
		estadoOrigen = 1;
		estadoDestino = 0;
        markerOrigen.setAnimation(google.maps.Animation.BOUNCE);
        markerDestino.setAnimation(null);
	}else if(id =="ubicadorDestino"){
		markerDestino.setMap(map);
		estadoOrigen = 0;
		estadoDestino = 1;	
        markerDestino.setAnimation(google.maps.Animation.BOUNCE);
        markerOrigen.setAnimation(null);
        
	}
})

$("#filtrosOtros").click(onclick, function(){
    $("#filtrosNormales").attr("aria-expanded","false");
    $("#filtrosOtros").attr("aria-expanded","true");
	$("#filtrosAdicionales").show(anima);
	$("#filtrosPrincipales").hide(anima);
	$("#filtrosNormales").css("background-color","#01B4ED");
	$("#filtrosNormales p").css("color","white");
	$(this).css("background-color","white");
	$("#filtrosOtros p").css("color","#01B4ED");
	$(this).removeClass("sombra");
	$("#filtrosNormales").addClass("sombra2");
});

$("#filtrosOtros").keypress(function(e){
    if(e.which==13){
        $("#filtrosNormales").attr("aria-expanded","false");
        $("#filtrosOtros").attr("aria-expanded","true");
        $("#filtrosAdicionales").show(anima);
        $("#filtrosPrincipales").hide(anima);
        $("#filtrosNormales").css("background-color","#01B4ED");
        $("#filtrosNormales p").css("color","white");
        $(this).css("background-color","white");
        $("#filtrosOtros p").css("color","#01B4ED");
        $(this).removeClass("sombra");
        $("#filtrosNormales").addClass("sombra2");
    }
});

$("#filtrosNormales").click(onclick, function(){
    $("#filtrosNormales").attr("aria-expanded","true");
    $("#filtrosOtros").attr("aria-expanded","false");
	$("#filtrosAdicionales").hide(anima);
	$("#filtrosPrincipales").show(anima);
	$("#filtrosOtros").css("background-color","#01B4ED");
	$("#filtrosOtros p").css("color","white");
	$(this).css("background-color","white");
	$("#filtrosNormales p").css("color","#01B4ED");
	$(this).removeClass("sombra2");
	$("#filtrosOtros").addClass("sombra");
})

$("#filtrosNormales").keypress(function(e){
	if(e.which==13){
        $("#filtrosNormales").attr("aria-expanded","true");
        $("#filtrosOtros").attr("aria-expanded","false");
        $("#filtrosAdicionales").hide(anima);
        $("#filtrosPrincipales").show(anima);
        $("#filtrosOtros").css("background-color","#01B4ED");
        $("#filtrosOtros p").css("color","white");
        $(this).css("background-color","white");
        $("#filtrosNormales p").css("color","#01B4ED");
        $(this).removeClass("sombra2");
        $("#filtrosOtros").addClass("sombra");
	}
});


/*
<div id = "filtrosNormales" class= "pestana"><p style = "color:#01B4ED">Filtros</p></div>
					<div id = "filtrosOtros" class= "pestana" style = "background-color:#01B4ED"><p style = "color: white">Otros filtros</p></div>
*/

$("#mostrarResultados").click(onclick, function(){
	mostrarPaneles();
	$("#infoColeEsp").hide(anima);
	nombreTitulo = "Resultados filtro";
	$("#tituloColegiosCercanos").html("");
	$("#tituloColegiosCercanos").html(nombreTitulo);
	$("#ventanaCategoriasDer").show(anima);
	$(this).hide(anima);
	conInfocolegio();
	
})
	
$("#borrarFiltros").click(onclick, function(){
    onClickDeleteFilters();
})

$("#borrarFiltros").keypress(function(e){
    if(e.which==13){
        onClickDeleteFilters();
    }
});

function onClickDeleteFilters(){
    reiniciarFiltros();
    $("#tituloColegiosCercanos").text()=="Resultados filtro"
    $("#ventanaCategoriasDer").hide(anima);
    $("#numeroSedesFiltro").hide(anima);
    $("#preaload").show();
    nombreTitulo = "Resultados filtro";
    $("#contenedorColegiosCercanos").html("");
    enFiltro = false;
    lugaresCercanos();
    map.setCenter(markerini.getPosition());
    $("#infoColeEsp").hide(anima);
    $("#mostrarResultados").show(anima);
    $("#ventanaCategoriasDer").show();
    salirIsocrona();
}

function salirIsocrona(){
		//mostrarPaneles();		
		zoomInicial = 16;
		MapOperative.init();
		map = MapOperative.loadMap('map_canvas');
		maps.push(map);
		initializeMap2();
        activar = false;
}


function reiniciarFiltros(){
	filtroAbierto = false;
	$("#filtrosPrincipales :input").prop( "checked", "true");
	$("#filtroDistanciaR").val(2000);
	ubicarIndicador($("#filtroDistanciaR"));
	$( "#slider-range" ).slider( "values", [0,100] );
    $( "#numeroEstudiantes" ).slider( "values", [1,100] );
	ubicarIndicador2(0,"profes1Output", 1);
	ubicarIndicador2(100,"profes2Output", 0);
	$('#filtrosAdicionales :input').val(1.0);
	$('#filtrosAdicionales output').css("margin-left", "95%").text("1.0");
	$('#filtrosPrincipales output').css("margin-left", "92%");
	$('#outputDistancia1').css("margin-left", "42%");
	$("#profes2Output").css("margin-left","42%");
	$("#profes1Output").css("margin-left","42%");
	$("#profes1Output").css("left","-43%");
	$("#sectorOficial").prop("checked", true);
	$("#sectorNoOficial").prop("checked", true);
    $("#docenteEst1").css("margin-left","-2%");
    $("#docenteEst2").css("margin-left","81%");
}



$("#favoritos").click(onclick, function (){
    var focusTrapHelpMenu=returnFocusTrapHelpMenu();
    focusTrapHelpMenu.deactivate();
	$("#formularioActualizar").hide();
	$(".subventana").hide(anima);
	$("#menuInicial").hide();
	$("#seccionPerfil").hide();
	$("#cambiarmapa").hide();   
	$("#cambiartrafico").hide();   
	$("#sicoleLogo").hide(); 
	$("#listaFavoritos").show(anima);
    $("#barraSesion").show(anima);
	$("#menuSesionIniciada").hide(anima);
	var tipoDoc = cambiaraNumeroDoc(datossesion.tipodocumento);
	uriPrefere ="http://geoportal.dane.gov.co/wssicole/favoritos.php?operacion=consultar&tipo_documento=" +tipoDoc+"&numero_documento=" + datossesion.cedula;
	d3.json(uriPrefere, function(error, sedestotal) {
		if(sedestotal.favorito== true){
			numeroPrefere = sedestotal.sedes.length;
			colegiosfound = [];
			$("#listaFavoritos #contenedorColegiosCercanos").html("");
			imprimirFavoritos(sedestotal.sedes);
		}
	});
	$("#favoritesTitle").focus();
	var focusTraFavoriteSchools=returnFocusTraFavoriteSchools();
    focusTraFavoriteSchools.activate();
});
	
	function imprimirFavoritos(id){
		var htmlpri = "";
		var imagenSector = "";
		var colorLetras = "";
		idEsp = id[numeroPrefere-1]["ID_SEDE"]
		
		codigoPrefere("http://geoportal.dane.gov.co/wssicole/serviciobusqueda.php?&codigosede=" + idEsp, id);
		
		
	}
	
	function codigoPrefere(url,id){
		d3.json(encodeURI(url), function(error, data4) {
			mostrarCercania2(data4[0]);
			numeroPrefere--;
			if(numeroPrefere>0){
				imprimirFavoritos(id);
			}else{
				var imagenSector = "",
				colorLetras = "",
				htmlpri = "";
				if(colegiosfound.length!=0) {
					colegiosfound.sort(function (a,b) {
					if (a[0] > b[0]) return  1;
					if (a[0] < b[0]) return -1;
					return 0;
				});
					for(i =0 ; i<colegiosfound.length; i++){
						if(colegiosfound[i][4] == "OFICIAL"){
							imagenSector = "imagenes/oficial.png";
							colorLetras = "#0A738C"
						}else if(colegiosfound[i][4] == "NO OFICIAL"){
							imagenSector = "imagenes/no-oficial.png"; 
							colorLetras = "#70A12E";
						}
						if($("#agregarSede").css("display")=="block"){
							htmlpri += "<div tabindex='0' id = '" + colegiosfound[i][2] + " 'class ='contenedorColegio' onkeypress='sedeEnter(event,"+ colegiosfound[i][1] +")' onclick='sedeClick(" + colegiosfound[i][1] + ")'><div class = 'tipoColegio' style = 'background-image:url(" + imagenSector + ")'></div><div class = 'infoColegio'><h3 style='color:" + colorLetras + "'>" + colegiosfound[i][2] +"</h3><p class ='direccionColegio'>" + colegiosfound[i][3] + "</p><p class = 'distanciaColegio' style='color:" + colorLetras + "'>" +  colegiosfound[i][0] +"m</p></div></div>";
						}else{
							htmlpri += "<div tabindex='0' role='button' id = '" + colegiosfound[i][2] + " 'class ='contenedorColegio' onkeypress='ubicarCentroKeyPress(event,"+ colegiosfound[i][1] +", 0)' onclick='ubicarCentro("+ colegiosfound[i][1] +", 0)'><div class = 'tipoColegio' style = 'background-image:url(" + imagenSector + ")'></div><div class = 'infoColegio'><h3 style='color:" + colorLetras + "'>" + colegiosfound[i][2] +"</h3><p class ='direccionColegio'>" + colegiosfound[i][3] + "</p><p class = 'distanciaColegio' style='color:" + colorLetras + "'>" +  colegiosfound[i][0] +"m</p></div></div>";
						}
					}
					
					$("#listaFavoritos #contenedorColegiosCercanos").append(htmlpri);
					$("#contenedorFavoritos").append(htmlpri);
				}
				
			}
		
		
			
		});
	}

$("#filtroDistanciaR").change(function (){
	radioini = $(this).val();
})

function MoverCerrar(){
	if($$("#infoColeEsp").css("display") == "block"){
		var right = parseFloat($("#infoColeEsp").width());
		var right1 = parseFloat($( window ).width()) * 0.05;
		right1 = right1 + right;	
		$("#funcionalidadActual").css("right",right1);
		right1 = parseFloat($( window ).width()) * 0.01;
		right1 = right1 + right;
		$("#cerrarFuncionalidad").css("right",right1);	
        
	}
}

$("#circleCluster2").click(function(){
	if($(this).css("fill") == "rgb(182, 19, 78)"){
		$(this).css("fill", "rgb(204, 204, 204)");
		inicializarSitiosIni();
        $("#textoCluster").text("Mostrar");
	}else if($(this).css("fill") == "rgb(204, 204, 204)"){
		$(this).css("fill","rgb(182, 19, 78)");
		cargarMapa();
        $("#textoCluster").text("Ocultar");
	}
})

$("#tituloIcronas").click(function (){
    openTimeTravelFilterMenu();
});

$("#tituloIcronas").keypress(function (e){
	if(e.which==13){
        openTimeTravelFilterMenu();
	}
});

function openTimeTravelFilterMenu(){
    if($("#poligono2Titulo").css("display")== "none"){
    	$("#tituloIcronas").attr('aria-expanded','true');
        $("#distanciaFiltro").show(anima);

    }else{
        $("#tituloIcronas").attr('aria-expanded','false');
        $("#mostrarIsocronas").hide(anima);
        $("#distanciaFiltro").hide(anima);
    }
    cambiarTriangulos($("#poligono1Titulo"), $("#poligono2Titulo"), $("#distanciaFiltro2"));
}

$("#checkIsocronas").click(function (){
	if($("#activarIso").is(':checked')){
		$("#isocronas2").show(anima);
        $("#activarDistancia").prop("checked", false);
        $("#distancia2").hide(anima);
		
	}else{
		$("#isocronas2").hide(anima);
        $("#activarDistancia").prop("checked", true);
        $("#distancia2").show(anima);
		
	}
	
});

$("#tituloTematicos").click(function (){
	cambiarTriangulos($("#poligono3Titulo"), $("#poligono4Titulo"), $("#filtrosTema"));
});

$("#tituloTematicos").keypress(function (e){
    if(e.which==13){
        cambiarTriangulos($("#poligono3Titulo"), $("#poligono4Titulo"), $("#filtrosTema"));
    }
});

 $("#activarDistancia").click(function (){
    if($(this).is(":checked")){        
            $("#distancia2").show(anima);
            $("#activarIso").prop("checked", false);
            $("#isocronas2").hide(anima);
        }else{
          $("#distancia2").hide(anima);
            if($("#isocronas2").css("display")== "none"){
                 $("#activarIso").prop("checked", true);
            }
            
        }
    
    })


//filtrosTematicos

function cambiarTriangulos(cont1, cont2,cont3){
	if(cont2.css("display")== "none"){
        $("#tituloTematicos").attr('aria-expanded','true');
		cont1.hide(anima);
		cont2.show(anima);
		cont3.show(anima);
	}else{
        $("#tituloTematicos").attr('aria-expanded','false');
		cont2.hide(anima);
		cont1.show(anima);
		cont3.hide(anima);
	}

}

function histograma(data, valor){
    
 var formatCount = d3.format(",0f");
	var margin = {top: 10, right: 20, bottom: 20, left: 40},
	    width = parseFloat($("body").width())*0.36 - margin.left - margin.right,
		height = 75 - margin.top - margin.bottom;
	// Parse the date / time
	//var parseDate = d3.time.format("%d-%b-%y").parse;
	var values = [];
	var longitud = data.length*0.9; 
	for(i = 0; i<longitud; i++){
		values.push(data[i].value);
	}
    
	 var x = d3.scale.linear()
                .domain([d3.min(values), d3.max(values)])

                .nice()
                .range([0, width]);

        // Generate a histogram using twenty uniformly-spaced bins.
        var data = d3.layout.histogram()
                .bins(x.ticks(30))
                (values);

   var intervalo = data[1].x - data[0].x;
    
        var y = d3.scale.linear()
                .domain([0, d3.max(data, function(d) { return d.y; })])
                .range([height, 0])

        

        var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");
				
		var yAxis = d3.svg.axis()
                .scale(y)
				.orient("left")
                .ticks(2)
				
				
		var tip = d3.tip()
			.attr('class', 'd3-tip')
			.offset([-10, 0])
			
        var svg = d3.select(".graficaLinea").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
        svg.call(tip);	
		
		var bar = svg.selectAll(".bar")
                .data(data)
                .enter().append("g")
                .attr("class", "bar")
				
                .attr("transform", function(d) { 
					var position = x(d.x) - 8;
					return "translate(" + position + "," + y(d.y) + ")"; })
				
        bar.append("rect")
                .attr("x", 10)
                .attr("width", x(data[0].dx) - 1)
                .attr("height", function(d) { return height - y(d.y); })
				.style("fill", function(d){
                    var valor1 = d.x + intervalo;
                    if(valor >= d.x && valor<= valor1){
                        return "rgb(143, 190, 43)"
                    }else{
                        return "#b6134e"
                    }
                         
                })
				.style("color","white")
                .on("mouseover", function(d){
					$(this).css("fill", "rgb(143, 190, 43)")
					var y = d.y;
					var x = d.x;
					var sigValor = x + intervalo
					tip.html(function(d) {
						return "<span>" + y + " colegios. De " + x + " a " + sigValor + "</span>";
					})
					tip.show();
					
				})
				.on("mouseout", function(d){
					var valor1 = d.x + intervalo;
                    if(valor >= d.x && valor<= valor1){
                        $(this).css("fill", "rgb(143, 190, 43)");
                    }else{
                        $(this).css("fill", "#b6134e");
                    }
					tip.hide();
				});
                
			
				
							
	
        svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);
	
		svg.append("g")
                .attr("class", "y axis")
               // .attr("transform", "translate(0," + height + ")")
                .call(yAxis);
		
}
/*
$("#letrasAno").click(function (){
    $("#ventanaAno").toggle(anima);
    $("#ventanaTipoBusqueda").hide();
})*/

$(".ventanaAnoLetras").click(function (){
    
    var id = $(this).attr("id");
    id = id.replace("Cab", "");
    $("#ventanaAno").hide(anima);
    $("#textosAno1").text(id);
    $("#circle" + id + "").show(anima)
    if(id == "2015"){
       $("#circle2013").hide(anima);  
    }else{
        $("#circle2015").hide(anima);
    }
})

$("#busquedaPopup").click(function (){
    esconderVentanas();
})

function esconderVentanas(){
    
     $("#ventanaAno").hide();
}

$(".botonVolverCole").click(function (){
     $(".botonVolverCole").hide();
    $(".selectores").removeClass("botonPresionado"); 
	$("#imagenSexo1").hide();
	$("#imagenSexo").show();
    coloresSecciones("#318DA6", "#CDEAFB");
    $("#tituloJornadas").show(anima);
	$(".columnaGraficas").hide();
	$(".columnaInfo").hide();
	$("#donaNivel").show(anima);
	$("#columnaInfoNiveles").show(anima);
	$("#donaJornada").show(anima);
	$("#columnaInfoJornadas").show(anima);
	var longitud = desercionjor.length - 1;
	convertirEficiencia("Desercion",desercionjor[longitud]);
	convertirEficiencia("Aprobacion", aprobacionjor[longitud]);
	convertirEficiencia("Reprobacion", reprobacionjor[longitud]);
	convertirEficiencia("Transferencia", transferenciajor[longitud]);
	cambiarColorGraficas(color1Dona);
	llenarDonaRecursos(0,color1Dona);
	numeroEstuPorProfe(0)
	jActiva = "";
})


$.validate({
    modules : 'location, date, security, file, html5',
    errorMessagePosition : 'inline',
    borderColorOnError : '#B6134E',
    addValidClassOnAll : true,
    onModulesLoaded : function() {

    }
});

$(".errorMinute").css("display","none");
$(".errorHour").css("display","none");


var horas = /^(0|[1-9]\d*)$/;

$("#horasTransporte").blur(function(){

    /*if(!($(this).val().match(horas))  ){
        $(".errorHour").css("display","block").css("color","red");

    }else*/
    if( $(this).val().length == 0 ){
        $(".errorHour").css("display","block").css("color","#B6134E");
	}else{
        $(".errorHour").css("display","none");
    }

});

$("#minTransporte").blur(function(){
    if( $(this).val().length == 0  ){
        $(".errorMinute").css("display","block").css("color","#B6134E");

    }else{
        $(".errorMinute").css("display","none");
    }

});



$("#inputRecuCorreo").keyup(function(e) {
	
	var palabra = $("#inputRecuCorreo").val();
	if(palabra.length>2){
		if(validateEmail(palabra)){
			$("#errorMail p").hide(500);
			$("#botonRecuperaMail").css("background-color", "#19B3E9");
		}else{
			$("#errorMail p").show(500);
			$("#botonRecuperaMail").css("background-color", "#BBB");
		}
		
	}else{
		$("#errorMail p").hide(500);
		$("#botonRecuperaMail").css("background-color", "#19B3E9");
	}

});

$("#botonRecuperaMail").click(function(){
    $("#errorMail").hide(anima);
    $("#digitarcorreo").hide(anima);
    $("#mensajeEnviocorreo").show(anima);
    
    var uriCorreo = "http://geoportal.dane.gov.co/wssicole/view/?oper=busca_correo&email=" + $("#inputRecuCorreo").val();
    $.getJSON(uriCorreo, function(data){	
        if(data.estado ==true){
            $("#mensajeConfirmación").html("Se ha enviado un mensaje al correo <i><strong>" + $("#inputRecuCorreo").val()  + " </strong></i> con las instrucciones para el cambio de contraseña.")
        }else{
            $("#mensajeConfirmación").html("El correo <i><strong>" + $("#inputRecuCorreo").val()  + " </strong></i> no se encuentra registrado en el sistema. Inténtelo de nuevo.")
            
        }
            
    
    });
    
  /*  
    */
})

$("#errorEmail").click(function () {
    $("#errorMail").show(anima);
    $("#digitarcorreo").show(anima);
    $("#mensajeEnviocorreo").hide(anima);
    
}) 
   

$("#olvidoSuContrasena").click(function (){
	
	$("#atrasRecuperar").css("display","flex")
	$("#ventanaRecuperar").show(anima);
})

$("#atrasRecuperar").click(function(){
	$("#atrasRecuperar").hide(anima);
	$("#ventanaRecuperar").hide(anima);
})

function ubicarAyuda(id){
    var id2 = id.replace("botonPregunta","ayuda");
    $(".microAyudaCate").hide();
    $("#" + id2 + "").show();
    var top =$("#" + id + "").offset().top - $("#displayMicroAyuda").height()/2 + 14;
    var left = $("#ventanaCategoriasIzq").width() - 10;
    if(top<400){
        $("#displayMicroAyuda").css("margin-top",top).css("margin-left", left).css("bottom","inherit");    
    }else{
        $("#displayMicroAyuda").css("margin-top","inherit").css("margin-left", left).css("bottom",30);
        
    }
    
    $("#displayMicroAyuda").show(anima);
}

$(".botonPregunta").click(function (){
    
    var color = $(this).css("background-color");
    if(color == "rgb(58, 184, 218)"){        
        ubicarAyuda($(this).attr("id"));
        $(this).css("background-color","#C4C4C4");
        
    }else{
        $("#displayMicroAyuda").hide(anima);
        $(this).css("background-color", "rgb(58, 184, 218)");
    }            
});

$("#contenedorFuncionalidades").scroll(function(){
   cerrarAyudaMicro();
});

function cerrarAyudaMicro() {
    if($("#displayMicroAyuda").css("display") == "block"){
        $("#displayMicroAyuda").hide(anima);
        $(".botonPregunta").css("background-color", "rgb(58, 184, 218)");
    }
}

var input = document.getElementById('buscarCiudad');
var options = {
  types: ['(cities)'],
  componentRestrictions: {country: 'co'}
};

var autoComplete4 = new google.maps.places.Autocomplete(input, options);


autoComplete4.addListener('place_changed', function() {
    infowindow.close();
    var place = autoComplete4.getPlace();
    
     if (!place.geometry) {
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
     cargarMapa();
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
      cargarMapa();
    }
  });

function closeRegisterForm(){
    $("#registrarse").focus();
    isRegisterFormVisible=false;
    $("#formularioSesion").hide();
    $("#formularioActualizar").hide();
    $("#botonSalir").hide();
    $("#barraSesion").hide(anima);
    $("#circuloPlegar2").hide(anima);
}

function pauseRegisterFocusTrap(){
    var focusTrapRegisterForm=returnFocusTrapRegisterForm();
    focusTrapRegisterForm.pause();
}

function unpauseRegisterFocusTrap(){
    var focusTrapRegisterForm=returnFocusTrapRegisterForm();
    focusTrapRegisterForm.unpause();
    $("#roles").focus()
}

Number.prototype.toRad = function() {
   return this * Math.PI / 180;
}

Number.prototype.toDeg = function() {
   return this * 180 / Math.PI;
}

google.maps.LatLng.prototype.destinationPoint = function(brng, dist) {
   dist = dist / 6371;  
   brng = brng.toRad();  

   var lat1 = this.lat().toRad(), lon1 = this.lng().toRad();

   var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) + 
                        Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));

   var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) *
                                Math.cos(lat1), 
                                Math.cos(dist) - Math.sin(lat1) *
                                Math.sin(lat2));

   if (isNaN(lat2) || isNaN(lon2)) return null;

   return new google.maps.LatLng(lat2.toDeg(), lon2.toDeg());
}