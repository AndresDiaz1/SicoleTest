var tipoConectividad = -1;
var divActual = 0;
var divMaximo = 0; 
var encuestaUsuario = "";
var tipoUsuario = ""
function habilitarseccion(rol){
	$('#infraestructura').css("opacity","0.4");
	$('#infraestructura').removeClass("Activo");
 
    $("#infraestructura .contened ").css("opacity","0.4");
    
	$('#transporte').css("opacity","0.4");
	$('#transporte').removeClass("Activo");
   
    
	$('#convivencia').css("opacity","0.4");
	$('#convivencia').removeClass("Activo");
    
	$('#asistencia').css("opacity","0.4");
	$('#asistencia').removeClass("Activo");
  
    $('#dotacion').css("opacity","0.4").removeClass("Activo");
 

    
	switch (rol) {
	case "Directivo":
		$('#infraestructura').css("opacity","1").addClass("Activo");     
		$('#transporte').css("opacity","1").addClass("Activo");   
		break;
	case "Docente":
		$('#transporte').addClass("Activo").css("opacity","1")
		break;
	case "Administrativo":
		$('#transporte .imagenMenuGrafico').css("background-image","url(./imagenes/transp.png)").css("opacity","1");
		$('#transporte').addClass("Activo");
        $("#transporte .contenedorNombre ").css("opacity","1")    
		break;
	case "Estudiante":
		$('#convivencia').css("opacity","1").addClass("Activo"); 
		$('#asistencia').css("opacity","1").addClass("Activo");    
		$('#transporte').css("opacity","1").addClass("Activo");  
		break;
	}
}


function comprobacionSede(){
		var uriConvEntrada = "http://geoportal.dane.gov.co/wssicole/servicioconvivencia.php?operacion=verificarconvivencia&rol=" + datossesion.rolusuario + "&documento_usuario=" + datossesion.cedula + "&codigo_sede=" + $("#nombreSede").val();
			console.log(uriConvEntrada);
			console.log("elementos " + $("#nombreSede").val());
			d3.json(encodeURI(uriConvEntrada), function(error, data) {
				if(data[1]=="false"){
					
					if($("#nombreSede").val()== null){
						$("#mensajeError").html("Debes tener una sede agregada a tu perfil.");
						$("#convivenciaEscolar").hide(anima);
						$("#avisoConvivencia").show();
					}else{
						$("#convivenciaEscolar").show(anima);
						$("#avisoConvivencia").hide();
					}
					
				}else{
					$("#mensajeError").html("Ya has llenado esta encuesta");
					$("#convivenciaEscolar").hide(anima);
					$("#avisoConvivencia").show();
				}
			
			});
	}


$("#asistencia").click(onclick, function () {
		console.log("log");
		var asd = $("#asistencia").attr('class').split(" ");
		var cont = 0;
		for(i = 0; i < asd.length; i++){
			if(asd[i] == "Activo"){
				cont++;
			}
		}
		if(cont == 1){
			$("#sedeCuentanos").hide();
			$("#encabezadoInstitucion").show();
			$("#encabezado h1").text("¿Tu profesor ha faltado a clase?");
			if($("#nombreSede").val()== null){
				$("#mensajeError").html("Debes tener una sede agregada a tu perfil.");
				$("#asistenciaDocente").hide(anima);
				$("#avisoConvivencia").show();
			}
			
			else{
				$( "#AsistenciaSi" ).prop( "checked", false );
				$( "#AsistenciaNo" ).prop( "checked", false );
				$( "#gradoDocente" ).val("");
				$( "#materiaDocente" ).val("");
				$( "#mesDocente" ).val("");
				$("#botonAsistencia").css("background-color", "#EEE");
				$('input:radio[name=asistenciaDocente]:checked').val("1");
				$("#asistenciaDocente").show();
				
			}
			
		}
});

	$("#convivencia").click(onclick, function () {
		var asd = $("#convivencia").attr('class').split(" ");
		var cont = 0;
		for(i = 0; i < asd.length; i++){
			if(asd[i] == "Activo"){
				cont++;
			}
		}
		if(cont == 1){	
			$("#sedeCuentanos").hide();
			$("#encabezadoInstitucion").show();
			$("#encabezado h1").text("Clima escolar*");
			$("#cambiarmapa").hide();
			$("#cambiartrafico").hide();
			$("#sicoleLogo").hide();
			$( "#seguridad1Si" ).prop( "checked", false );
			$( "#seguridad1No" ).prop( "checked", false );
			$( "#seguridad2Si" ).prop( "checked", false );
			$( "#seguridad2No" ).prop( "checked", false );
			$( "#manoteoOtro" ).prop( "checked", false );
			$( "#manoteo" ).prop( "checked", false );
			$("#agresividad3").val("1");
			$("#agresividad4Si").prop( "checked", false );
			$("#agresividad4No").prop( "checked", true );
			$("#agresividad5").val("1");
			$("#agresividad6Si").prop( "checked", false );
			$("#agresividad6No").prop( "checked", true );
			$("#agresividad7").val("1");
			$("#agresividad8Si").prop( "checked", false );
			$("#agresividad8No").prop( "checked", true );
			$("#discriminacion1").val("1");
			$( "#discriminacion2Si" ).prop( "checked", false );
			$( "#discriminacion2No" ).prop( "checked", false );
			$("#peleas1").val("1");
			$("#peleas2").val("1");
			$("#peleas3").val("1");
			$( "#armas1Si" ).prop( "checked", false );
			$( "#armas1No" ).prop( "checked", false );
			$("#armas2").val("1")
			$("#guardarConvivencia").css("background-color","#EEE");
			
			comprobacionSede();
		}
        $("#surveyTitle").focus();
		var focusTrapSurveyForm=returnFocusTrapSurveyForm();
        focusTrapSurveyForm.activate();
	});


function cambiaraNumeroDoc(letra){
letra= letra.replace("Ö", "Ó");
	var tipoDoc= "";
	switch(letra){       
            case "CÉDULA DE CIUDADANÍA":
                tipoDoc = 1;
                break;
                
            case "TARJETA DE IDENTIDAD":
			    tipoDoc = 2;
                break;    
            case "CÉDULA DE EXTRANJERÍA":
			    tipoDoc = 3;
                break;  
            case "REGISTRO CIVIL DE NACIMIENTO":
			    tipoDoc = 4;
                break;   
                
            case "NÚMERO DE IDENTIFICACIÓN PERSONAL":
			    tipoDoc = 5;
                break;  
            case "NÚMERO ÚNICO DE IDENTIFICACIÓN PERSONAL":
			    tipoDoc = 6;
                break;
            case "NÚMERO DE IDENTIFICACIÓN - SECRETARÍA DE EDUCACIÓN":
			    tipoDoc = 7;
                break  
            case "CERTIFICACIÓN DE CABILDO":
			    tipoDoc = 8;
                break;
            default:
                
                break;
        }
		return tipoDoc;

}
$("#movilMenu").click(onclick, function (){
		tipoConectividad = 2;
		var tipoDoc = cambiaraNumeroDoc(datossesion.tipodocumento);
		console.log(datossesion.tipodocumento);
		var uri = "http://geoportal.dane.gov.co/wssicole/servicioconectividad.php?operacion=verificarconectividad&tipo_documento=" + tipoDoc + "&documento_usuario=" + datossesion.cedula;
		
		d3.json(encodeURI(uri), function(error, data) {
		console.log(uri)
		//{"operacion":"verificarconectividad","estado":true,"mensaje":"No existen datos asociados al usuario en esta encuesta","acceso":true}
			if(data.acceso == true){
				if(data.estado == true){
					$("#contenedorEncuesta").show(anima);
					$("#ventanaEncuesta").show(anima);
					$("#barraSesion").hide(anima);
					validarDocumentoConectividad(uri);
				}else if(data.estado == false){
					console.log("Entró");
					$("#sedeCuentanos").hide();
					$("#mensajeError").html("Ya has llenado esta encuesta");
					$("#avisoConvivencia").show();
					$("#botonMoviles").hide();
					$("#encabezadoInstitucion").show();
					$("#sedeEncuesta").hide();
				}
			}else if(data.acceso == false){
				console.log("Entró2");
				$("#sedeCuentanos").hide();
				$("#encabezadoInstitucion").show();
				$("#sedeEncuesta").hide();
				$("#mensajeError").html("No estás inscrito en la base de datos del SIMAT. Contáctanos al correo japalaciosm@dane.com.co para agregarte ");
				$("#avisoConvivencia").show()
				console.log("2");
			}
		});
})

function verificacionMovil(){
	if($('input:radio[name=resp1-1]:checked').val()!= undefined && $('input:radio[name=resp2]:checked').val()!=undefined && $('input:radio[name=resp4]:checked').val()!=undefined && $('input:radio[name=resp51]:checked').val()!=undefined && $('input:radio[name=resp52]:checked').val()!=undefined && $('input:radio[name=resp53]:checked').val()!=undefined && $('input:radio[name=resp41]:checked').val()!=undefined && $('input:radio[name=resp42]:checked').val()!=undefined && $('input:radio[name=resp43]:checked').val()!=undefined &&  $('input:radio[name=resp44]:checked').val()!=undefined){
		$("#botonMoviles"). css("background-color", "#B6134E");
	}else{
		$("#botonMoviles"). css("background-color", "#EEE");
	}	
}											


$("#tipoDocMovil").change(function(){
	if($("#NumerodeDocumentoMoviles").val()== "" || $(this).val() ==""){
		$("#botonComprobarId").animate ({
			backgroundColor: "#EEE"
		},anima)
	}else{
		$("#botonComprobarId").animate ({
			backgroundColor: "#B6134E"
		},anima)
	}
});

$("#NumerodeDocumentoMoviles").keypress(function (e){
	if( e.which== 8){
		if($(this).val().length <2){
			$("#botonComprobarId").animate ({
			backgroundColor: "#EEE"
		},50);

		}
	}else if($(this).val().length >2 && $("#tipoDocMovil").val() != ""){
		$("#botonComprobarId").animate ({
			backgroundColor: "#B6134E"
		},50)
	}else{
		$("#botonComprobarId").animate ({
			backgroundColor: "#EEE"
		},50)
	}
})

$("#botonComprobarId").click(function(){
	if($(this).css("background-color")=="rgb(182, 19, 78)"){
		url = "http://geoportal.dane.gov.co/wssicole/servicioconectividad.php?operacion=verificarconectividad"
		url+= "&documento_usuario=" + $("#NumerodeDocumentoMoviles").val();
		url+= "&tipo_documento=" + $("#tipoDocMovil").val();
		validarDocumentoConectividad(url);
		botonesAdelantar();
	}else{
		mensaje("¡Error!", "Los campos tipo y número de documento son requeridos");
	}
		
		
})

function validarDocumentoConectividad(uri){
	d3.json(uri, function(error, data) {
			if(data.acceso== true){
				console.log(uri);
				if(data.estado == true){
					console.log(uri);
					$("#otrasApp1").val("");
					$("#otrasApp2").val("");
					$("#otrasApp3").val("");
					$("#avisoConvivencia").hide()
					$("#encuestaMovil").show(anima);
					$("#loginMovil").hide(anima);
					$("#contenedorEncuesta").width("40%");
					$("#contenedorEncuesta").css("margin-left", "30%");
					$("#tituloConectividad").width("50%");
					$("#tituloConectividad").css("margin-left","25%");
					$(".botonEncuestaMover").show(anima);
					$("#lugarPregunta").show();
					$("#encuestaMovil input").prop("checked", false);
					$(".encuestaOculta").hide();
					$(".encuestaOculta2").hide();
					$("#conQueFrec").hide();
					$("#quienTeComunicas").hide()
					$("#guardarConect").hide();
					encuestaUsuario = $("#NumerodeDocumentoMoviles").val();
					tipoUsuario = $("#tipoDocMovil").val();
					if(data.fuente==""){
						$("#0Movil").show(anima);
						$("#0Movil").show(anima);
						divActual = 0;
						divMaximo = 0;
					}else{
						adelantarpreguntas();
					}
					setTimeout(function(){
						var alto = parseInt($("#encuestaMovil").height())/2 - 7.5;
						$(".botonEncuestaMover").css("margin-top",alto);
					},503)
					
				}
				else{
					mensaje("¡Error!", "Ya has llenado esta encuesta.");
					
				}
			}else{
				mensaje("¡Error!","No te encuentras registrado en la base de datos del SIMAT. Para ser agregado contáctenos al correo: <a>japalaciosm@dane.gov.co</a>");
				
			}
	});	

}

function adelantarpreguntas(){
	var uri = "http://geoportal.dane.gov.co/wssicole/servicioconectividad.php?operacion=verificarconectividad";
	uri+= "&documento_usuario=" + encuestaUsuario
	uri+= "&tipo_documento=" + tipoUsuario;

	d3.json(uri, function(error, data){
		var ultima = parseInt(data.datos[0]["ULTIMA_PREGUNTA"]);
		var ultima1 = ultima + 1;
		$("#lugarPregunta").text(ultima1 + "/15");
		console.log("Última" + ultima);
		divActual = ultima + 1;
		divMaximo = ultima+ 1; 
		if(ultima == 1 && data.datos[0]["ACCESO_SMARTPHONE_POR"]== "3"){
			pasaPregunta = 15;
			$("#guardarConect").show(anima);
			$("#botonMoviles").css("background-color","#B6134E");
			$("#botonMoviles").show(anima);
			divActual = 15;
			divMaximo = 15;
			$('input[name="resp0"][value="0"]').prop('checked', true);
			$('input[name="resp1"][value="3"]').prop('checked', true);
			botonesAdelantar();
			
		}
		else{
		for(i = 0; i<=ultima; i++){
			if(i == 3 || i == 9 || i == 10 || i == 11){
			console.log("valor " + i + "" + valor + "");
				var id = i* 10 +1;
				var palabra = convertirPregunta(id);
				var valor = data.datos[0][palabra] 
				if(valor == ""){
					 $('input[name="resp' + i+ '"][value="0"]').prop('checked', true);
					
				}else{
					$('input[name="resp' + i+ '"][value="1"]').prop('checked', true);
					$('input[name="resp' + id+ '"][value="' + valor +'"]').prop('checked', true);
					if(i != 9){
						$("#otrasApp1").val(data.datos[0]["OTRAS_APLICACIONES_ENTRE"]);
					}else if(i != 10){
						$("#otrasApp2").val(data.datos[0]["OTRAS_APLICACIONES_GEO"]);
					}else if (i!=11){
						$("#otrasApp3").val(data.datos[0]["OTRAS_APLICACIONES_DIF"]);
						
					}
					
				}

			}else if(i<14){
				var palabra = convertirPregunta(i);
				var valor = data.datos[0][palabra]
				console.log("valor " + i + "" + valor + "");	
				$('input[name="resp' + i+ '"][value="' + valor +'"]').prop('checked', true);
			}	
		}
		
		
		
		$("#" + divActual + "Movil").show(anima);
		$("#regresarPregunta").css("background-color","#52B8DA");
		if(divActual>=5 && divActual<=8)
		{
			$("#conQueFrec").show();
		}else if(divActual>=12 && divActual<=14){
			$("#quienTeComunicas").show()
		}
		else if (ultima==14){
				$("#guardarConect").show(anima);
				$("#botonMoviles").css("background-color","#B6134E");
				$("#botonMoviles").show(anima);
		}
		botonesAdelantar();
		}
	});
}

function convertirPregunta(id){
		switch(id){
		case 0: 
			return "TIENES_SMARTPHONE";
			break;
		case 1:	
			return "ACCESO_SMARTPHONE_POR";
			break;
		case 2:	
			return "LUGAR_USO";
			break;
		case 3:
			return "CONEXION_INTERNET";
			break;
		case 31:
		
			return "TIPO_CONEXION";
			break;
		case 4: 
			return "FRECUENCIA_DE_USO";
			break;
		case 5: 
			return "FRECUENCIA_USO_FACEBOOK";
			break;
		case 6: 
			return "FRECUENCIA_USO_WHATSAPP";
			break;
		case 7: 
			return "FRECUENCIA_USO_YOUTUBE";
			break;
		case 8: 
			return "FRECUENCIA_USO_PAGINAS";
			break;		
		case 91:
			return"APLICACIONES_ENTRETENIMIENTO";
			break;
		case 101:
			return "APLICACIONES_GEOGRAFICAS";	
			break;
		case 111:
			return "OTRAS_APLICACIONES"; 	
			break;
		case 12:
			return "COMUNICACION_PAPAS";
			break;	
		case 13:
			return "COMUNICACION_FAMILIARES";
			break;
		case 14:
			return "COMUNICACION_AMIGOS";
			break;		
	}

}
	
$("#encuestaConectividad").click(onclick, function (){
		tipoConectividad = 1;
		$("#barraSesion").hide();
		$("#encuestaMovil input").prop("checked", false);
		$("#botonMoviles").css("background-color","#EEE");
		$("#menulogueo").hide();
		$("#NumerodeDocumentoMoviles").val("");
		$("#tipoDocMovil").val("");
		$("#noUsaMovil").hide();
		$("#siUsaMovil").hide();
		$("#encuestaMovil").hide();
		$("#loginMovil").show();
		$("#ventanaEncuesta").show(anima);
		$("#contenedorEncuesta").show(300);
		$(".botonEncuestaMover").hide();
		$("#tituloConectividad").width("74%");
		$("#tituloConectividad").css("margin-left","13%");
		$("#contenedorEncuesta").css("margin-left", "30%")
		$("#lugarPregunta").hide();
		setTimeout(function (){
			$("#contenedorEncuesta").width("26%");
			var heightW = (parseFloat($("body").height()) - parseFloat($("#contenedorEncuesta").height()))/2
			console.log(heightW);
			$("#contenedorEncuesta").animate({
				marginTop: heightW,
				marginLeft: "37%"
			},anima)
		},301)
})

$("#ventanaEncuesta").click(function(){
	$(this).hide(anima);
	$("#contenedorEncuesta").hide(anima);
})
	
	
$("#transporteMenu").click(onclick, function () {
		entransporte = true;
        $("#letrasOrigen").text("Casa");
        $("#letrasDestino").text("Colegio");
		cambiarSede();
});
	
	
	
function cambiarSede(){	
		var ubicacion = ""; 
		$("#cambiarmapa").hide();
		$("#cambiartrafico").hide();
		$("#sedeCuentanos").hide();
		$("#encabezadoInstitucion").show();
		$("#encabezado h1").text("Transporte");
		$("#sicoleLogo").hide();
			
		if($("#nombreSede").val()== null){
			$("#mensajeError").html("Debes tener una sede agregada a tu perfil.");
			$("#asistenciaDocente").hide(anima);
			$("#avisoConvivencia").show();
		}else{
		
			var urlCol = "http://geoportal.dane.gov.co/wssicole/colegio2.php?cod_col=" + $("#nombreSede").val()
			
			$("#transporteFormulario").show(anima);
			$("#rutaOrigen").val("");
			$("#rutaDestino").val("");
			$("#horasTransporte").val("");
			$("#minTransporte").val("");
			$("#medioTransporte").val("");
			
			d3.json(urlCol, function(error, data) {
				if(data.length>0){
				var lat = data[0]['LATITUD'],
					longi = data[0]['LONGITUD'],
					latcor = lat.replace(",","."),
					longcor = longi.replace(",",".");
				
				var latitud = parseFloat(latcor);
				var longitud = parseFloat(longcor);
				ubicacion = { lat: latitud, lng: longitud};
				markerini.setPosition(ubicacion);
				map.setCenter(ubicacion);
				cargarMapa();
				} else{
					ubicacion = markerini.getPosition();
				}
				
				
				markerOrigen.setPosition(ubicacion);
				markerDestino.setPosition(ubicacion);
				markerOrigen.setMap(null);
				markerDestino.setMap(null);
				estadoOrigen =1;
				setGeoTransporte(ubicacion);
				modoRecorrido = "";
				setTimeout(function () {
					estadoDestino = 1;
					setGeoTransporte(ubicacion);
				},100);
				
				});	
			
		}
	
	}
	
	$("#nombreSede").change(function(){
		if(entransporte == true){
			cambiarSede();
		}
			
	});	
 
 function comprobarConvivencia(){
  if($('input:radio[name=seguridad1]:checked').val() != undefined && $('input:radio[name=seguridad2]:checked').val() != undefined && $('input:radio[name=discriminado]:checked').val()!=undefined&&$('input:radio[name=armas1]:checked').val()!=undefined){
	$("#GuardarConvivencia").css("background-color", "#B6134E");	
  }else{
	$("#GuardarConvivencia").css("background-color", "#EEE");
  }
 }
 
 
 function ningunaVez(id){
	if($("#" + id).val() == "1"){
		var numero = parseInt(id.replace("agresividad", "")) + 1;
		document.getElementById('agresividad' + numero + 'No').checked = true;
		document.getElementById('agresividad' + numero + 'Si').checked = false;
	}
	
	
}
 
function conTelefono(){
	var valor = $('input:radio[name=resp0]:checked').val();
	if(valor == "1"){
		$("#2Movil").show(anima);
		$("#1Movil").hide();
		divActual = 2;
	}else if(valor == "0"){
		$("#1Movil").show(anima);
		$("#2Movil").hide();
		divActual = 1;
	}
}

function otrosAccesos(){
	divActual = 2;
	var valor = $('input:radio[name=resp1]:checked').val();
	if(valor == "3"){
		$("#botonMoviles").css("background-color","#B6134E");
		$("#guardarConect").show(anima);
		$("#botonMoviles").show(anima);
	}else{
		$("#2Movil").show(anima);
		$("#guardarConect").hide(anima);
		$("#botonMoviles").css("background-color","#EEE");
	}
}

function moverDiv(idInput){
	$(".encuestaOculta").hide(anima);
	if(idInput==4&& $('input:radio[name=resp3]:checked').val()== "1" ){
		$("#3Movil").show();
		$("#9Movil").hide();
		$("#10Movil").hide();
		$("#11Movil").hide();
	}else if(idInput ==10 && $('input:radio[name=resp9]:checked').val()== "1" ){
		$("#9Movil").show();
		$("#3Movil").hide();
		$("#10Movil").hide();
		$("#11Movil").hide();
	}else if(idInput ==11 && $('input:radio[name=resp10]:checked').val()== "1" ){
		$("#10Movil").show();
		$("#3Movil").hide();
		$("#9Movil").hide();
		$("#11Movil").hide();
	}else if(idInput ==12 && $('input:radio[name=resp11]:checked').val()== "1" ){
		$("#11Movil").show();
		$("#3Movil").hide();
		$("#10Movil").hide();
		$("#9Movil").hide();
	}else{
		$(".encuestaOculta2").hide(anima);
	}
	
	divActual = idInput;
	console.log("actual1 " + divActual);
	switch(idInput){
		
		case 1:
			conTelefono();
			break;
		case 2:
			otrosAccesos();
			break;
		case 4 :
			idInput--;
			tipoConexion(idInput);
			break;
		case 9:
			$("#" + idInput + "Movil").show(anima);
			break;
		case 10 :
			var valor = $('input:radio[name=resp' + idInput +']:checked').val();	
			idInput--;
			tipoConexion(idInput);
	
			break;
		case 11 :	
			var valor = $('input:radio[name=resp' + idInput +']:checked').val();	
			
			idInput--;
			tipoConexion(idInput);
			$("#quienTeComunicas").hide(anima);
		
			break;
		case 12 :
			idInput--;
			var valor = $('input:radio[name=resp' + idInput +']:checked').val();
			tipoConexion(idInput);
			if(valor == '0'){
				$("#quienTeComunicas").show(anima);
			}
			break;	
		default:
			
			if(idInput>15){
				idInput = Math.floor(idInput/10) +1;
				divActual=idInput;
			}
			if(idInput>=12&&idInput<15){
			
				$("#quienTeComunicas").show(anima);
			}else{
				$("#quienTeComunicas").hide(anima);
			}
			if(idInput<=14){
				
				$("#" + idInput + "Movil").show(anima);
				$("#guardarConect").hide();
			}else{
				$("#guardarConect").show(anima);
				$("#botonMoviles").show(anima);
				$("#botonMoviles").css("background-color", "#B6134E");
			}
		
			break;
			
	}
	console.log("actual2 " + divActual);
	if(divActual>divMaximo){
		divMaximo= divActual;
	}
	
	if(idInput>4&&idInput<9){
		$("#conQueFrec").show(anima);
	}else{
		$("#conQueFrec").hide(anima);
	}
	
	setTimeout(function(){
		var alto = parseInt($("#encuestaMovil").height())/2 - 7.5;
		
		$(".botonEncuestaMover").animate({
			"marginTop" : alto
		},200);	
	},503)
	botonesAdelantar();
	$("#lugarPregunta").text(divActual + "/15");
	
}

$("#encuestaMovil :input").change(function(){
	
	var idInput = $(this).attr('id');
	if(otrasApp1 != idInput && otrasApp2 != idInput && otrasApp3 != idInput ){
		idInput = parseInt(idInput.replace("resp",""));
		botonesAdelantar()
		if(isNaN(idInput)== false){
			moverDiv(idInput+1);
		}
		if(idInput != 9 && idInput!= 10 && idInput!=11){
			enviarRespuestaParcial(idInput);
		}
	}
})

function enviarRespuestaParcial(id){
	var uri = "http://geoportal.dane.gov.co/wssicole/servicioconectividad.php?operacion=crearconectividad";
	if(tipoConectividad == 1){
			uri+= "&documento_usuario=" + encuestaUsuario;
			uri+="&tipo_documento=" + tipoUsuario;
	}else if(tipoConectividad == 2){
			uri+= "&documento_usuario=" + datossesion.cedula;
			uri+="&tipo_documento=" + cambiaraNumeroDoc(datossesion.tipodocumento);
	}
	var ultima = divMaximo -1
		var valor = $('input:radio[name=resp' + id +']:checked').val();
	switch(id){
		case 0: 
			uri+="&tienes_smartphone=" +valor;
				ultima = 0;
				"&acceso_smartphone_por=''"; 
		
			break;
		case 1:	
			uri+= "&acceso_smartphone_por=" +valor;
			ultima = 1;
		
			break;
		case 2:	
			uri+= "&lugar_uso=" + valor;
			break;
		case 3:
			uri+= "&conexion_internet=" +valor;
			break;
		case 31:
		
			uri+= "&tipo_conexion=" + valor;
			break;
		case 4: 
			uri+= "&frecuencia_de_uso=" + valor;
			break;
		case 5: 
			uri+= "&frecuencia_uso_facebook=" + valor;
			break;
		case 6: 
			uri+= "&frecuencia_uso_whatsapp=" + valor;
			break;
		case 7: 
			uri+= "&frecuencia_uso_youtube=" + valor;
			break;
		case 8: 
			uri+= "&frecuencia_uso_paginas=" + valor;
			break;
		case 9: 
			if($('input:radio[name=resp' + id +']:checked').val()== "0"){
				uri+= "&otras_aplicaciones_entre=''" ;
				uri+= "&aplicaciones_entretenimiento=''";
			}
			break;	
		case 91:
			if($("#otrasApp1").val()!=""){
				uri+= "&otras_aplicaciones_entre=" + $("#otrasApp1").val();
				uri+= "&aplicaciones_entretenimiento=" + valor;
			}	
			break;
		case 101:
			if($("#otrasApp2").val()!=""){
				uri+= "&otras_aplicaciones_geo=" + $("#otrasApp2").val();
				uri+= "&aplicaciones_geograficas=" + valor;
			}	
			break;
		case 10: 
			if($('input:radio[name=resp' + id +']:checked').val()== "0"){
				uri+= "&otras_aplicaciones_geo=''" ;
				uri+= "&aplicaciones_geograficas=''";
			}
			break;
		case 11: 
			if($('input:radio[name=resp' + id +']:checked').val()== "0"){
				uri+= "&otras_aplicaciones_dif=''" ;
				uri+= "&otras_aplicaciones=''";
			}
			break;	
		case 111:
			if($("#otrasApp3").val()!=""){
				uri+= "&otras_aplicaciones_dif=" + $("#otrasApp3").val();
				uri+= "&otras_aplicaciones=" + valor; 
			}	
			break;
		case 12:
			uri+= "&comunicacion_papas=" +valor;
			break;	
		case 13:
			uri+= "&comunicacion_familiares=" + valor;
			break;
		case 14:
			uri+= "&comunicacion_amigos=" + valor;
			break;		
	}
	
	uri+= "&ultima_pregunta=" + ultima;
	console.log(uri);
	d3.json(encodeURI(uri), function(error, data) {
		
	});
}	



function botonesAdelantar(){
	if(divActual ==divMaximo){
		$("#adelantarPregunta").css("background-color","#EEE");
	}else{
		$("#adelantarPregunta").css("background-color","#52B8DA");
	}
	
	if(divActual ==0){
		$("#regresarPregunta").css("background-color","#EEE");
	}else{
		$("#regresarPregunta").css("background-color","#52B8DA");
	}
}

$(".botonEncuestaMover").click(function (){
	var id =  $(this).attr("id");
	var pasaPregunta = divActual;
	console.log("Actual " + divActual)
	var valor = $('input:radio[name=resp0]:checked').val();
	var valor2 = $('input:radio[name=resp1]:checked').val()
	if(id == "regresarPregunta"){
		pasaPregunta--;
		if(pasaPregunta==1){
			if(valor=="0"){
				pasaPregunta = 1;
			}else if (valor == "1"){
				pasaPregunta = 0;
			}
		}else{
			
		}
		if(pasaPregunta == 14 && valor2 == "3"){
			pasaPregunta = 1;
			}
			console.log("pasa" +pasaPregunta);
	}else if (id == "adelantarPregunta"){
		if(pasaPregunta==1){
			if(valor2=="3"){
				pasaPregunta = 15; 
				divActual=pasaPregunta;
				divMaximo= 15;
			}else{
				pasaPregunta = 2;
			}
		}else{
			pasaPregunta++;
		}
		
		
	}
	if(pasaPregunta>=0 && pasaPregunta<=divMaximo){
		$(".encuestaOculta").hide(anima);
		$(".encuestaOculta2").hide(anima);
		
		if(pasaPregunta >=12 && pasaPregunta<15){
			$("#quienTeComunicas").show();
		}
		else{
			$("#quienTeComunicas").hide();
		}
		if(pasaPregunta >= 5 && pasaPregunta<9){
			$("#conQueFrec").show();
		}else{
			$("#conQueFrec").hide();
		}
		if(pasaPregunta==3 ||pasaPregunta==9||pasaPregunta==10||pasaPregunta==11){
			var valor1 = $('input:radio[name=resp' + pasaPregunta +']:checked').val();
			if(valor1=="1"){
				$("#" + pasaPregunta +"1Movil").show(anima);
			}
		}
			
		
			$("#" + pasaPregunta +"Movil").show(anima);
			divActual=pasaPregunta;
			$("#guardarConect").hide(anima);
			$("#botonMoviles").hide();
		
		
		if(pasaPregunta==15){
			$("#guardarConect").show(anima);
			$("#botonMoviles").show(anima);
			$("#botonMoviles").css("background-color", "#B6134E");
		}
		setTimeout(function(){
		var alto = parseInt($("#encuestaMovil").height())/2 - 7.5;
		
		$(".botonEncuestaMover").animate({
			"marginTop" : alto
		},200);	
		},503)
	}
	$("#lugarPregunta").text(divActual + "/15")
	botonesAdelantar();
})

function tipoConexion(id){
	var valor = $('input:radio[name=resp' + id +']:checked').val();
	if(valor== "1"){
		$("#" + id + "1Movil").show(anima);
		
	}else if(valor== "0"){
		var id1 = id + 1;
		$("#" + id + "1Movil").hide(anima)
		$("#" + id1 +"Movil").show(anima);
	}
}



function asistenciaDocenteClic (){
	if($("#mesDocente").val()!= "" && $("#gradoDocente").val()!= "" && $("#materiaDocente").val()!= "" && $('input:radio[name=asistenciaDocente]:checked').val() != undefined ){
		$("#botonAsistencia"). css("background-color", "#B6134E");
	}else{
		$("#botonAsistencia"). css("background-color", "#EEE");
	}
}	

function verificacionMovil(){
	if($('input:radio[name=resp1-1]:checked').val()!= undefined && $('input:radio[name=resp2]:checked').val()!=undefined && $('input:radio[name=resp4]:checked').val()!=undefined && $('input:radio[name=resp51]:checked').val()!=undefined && $('input:radio[name=resp52]:checked').val()!=undefined && $('input:radio[name=resp53]:checked').val()!=undefined && $('input:radio[name=resp41]:checked').val()!=undefined && $('input:radio[name=resp42]:checked').val()!=undefined && $('input:radio[name=resp43]:checked').val()!=undefined &&  $('input:radio[name=resp44]:checked').val()!=undefined){
		$("#botonMoviles"). css("background-color", "#B6134E");
	}else{
		$("#botonMoviles"). css("background-color", "#EEE");
	}	
}											


$("#tipoDocMovil").change(function(){
	if($("#NumerodeDocumentoMoviles").val()== "" || $(this).val() ==""){
		$("#botonComprobarId").animate ({
			backgroundColor: "#EEE"
		},anima)
	}else{
		$("#botonComprobarId").animate ({
			backgroundColor: "#B6134E"
		},anima)
	}
});

$("#NumerodeDocumentoMoviles").keypress(function (e){
	if( e.which== 8){
		if($(this).val().length <2){
			$("#botonComprobarId").animate ({
			backgroundColor: "#EEE"
		},50);

		}
	}else if($(this).val().length >2 && $("#tipoDocMovil").val() != ""){
		$("#botonComprobarId").animate ({
			backgroundColor: "#B6134E"
		},50)
	}else{
		$("#botonComprobarId").animate ({
			backgroundColor: "#EEE"
		},50)
	}
})


function validarTransporte(){
    validarOrigenDestino();
	console.log("medio " + $("#horasTransporte").val());
	if($("#rutaOrigen").val()!= $("#rutaDestino").val()&& $("#medioTransporte").val()!= "") {
		$("#transportesub").css("background-color","#B6134E");
	}else{
		$("#transportesub").css("background-color","#EEE");
	} 
}


$("#horasTransporte").keyup(function (e){
	if($(this).val().length <1){
		$("#transportesub").css("background-color","#EEE");
	}else{
		validarTransporte()
	}
});

$("#minTransporte").keyup(function (e){

	if($(this).val().length <1){
		$("#transportesub").css("background-color","#EEE");
	}else{
		validarTransporte();
	}
});

$("#iniciar").click(function (){
	$("#crearCuenta").hide();
	$("#menuAyuda").hide();
})

$("#medioTransporte").change(function (){

	switch($(this).val()){
		case '1':
			modoRecorrido = "TRANSIT"
			break;
		case '2':
			modoRecorrido = "DRIVING"
			break;
		case '3':
			modoRecorrido = "TRANSIT"
			break;
		case '4':
			modoRecorrido = "BICYCLING"
			break;
		case '5':
			modoRecorrido = "WALKING"
			break;
		case '6':
			modoRecorrido = "BICYCLING"
			break;
			
	}
	if(modoRecorrido != ""){
		ruta();
		
	}	
})

 $('input[type=radio][name=transporte1]').change(function() {
    if($(this).val() == "casacolegio"){
         $("#letrasOrigen").text("Casa");
        $("#letrasDestino").text("Colegio");
    }else{
        $("#letrasOrigen").text("Colegio");
        $("#letrasDestino").text("Casa");
    }
    enCalcularSitios = false;
	renderer.setMap(null);
	$("#desde_distancia").val("");
	$("#hasta_distancia").val("");
	$("#infocoledistancia").empty();
	markerOrigen.setMap(null);
	markerDestino.setMap(null);
	setGeoBuscadores();
	setMiUbicacion();
  
 });
	
	/******** Formulario Transporte***/
	$("#transportesub").click(function (event) {
		var uri = "http://geoportal.dane.gov.co/wssicole/serviciotransporte.php?operacion=creartransporte";
		var tipo = $("#formularioActualizar #tipoDoc").val();
		uri+= "&tipo_documento="+tipo;
		uri+="&rol=" + datossesion.rolusuario;
		uri+= "&documento_usuario=" + datossesion.cedula;
		uri+= "&codigo_sede=" + $("#nombreSede").val();
		uri+= "&desde_hasta=" + $('input:radio[name=transporte1]:checked').val();
		
		uri+= "&latitud_origen=" + markerOrigen.getPosition().lat();
		uri+= "&longitud_origen=" + markerOrigen.getPosition().lng();
		uri+= "&latitud_destino=" + markerDestino.getPosition().lat();
		uri+= "&longitud_destino=" + markerDestino.getPosition().lng();
		uri+= "&tipo_transporte=" + $("#medioTransporte").val();
		uri+= "&horas=" + $("#horasTransporte").val();
		uri+= "&minutos=" +	$("#minTransporte").val();
		console.log(uri);
		d3.json(encodeURI(uri), function(error, data) {
			if(data[1]== "true"){
				mensaje("¡Felicitaciones!","La encuesta se envió con éxito");
				cerrarTodos();
				salirTransporte();
				$("#sedeCuentanos").show(anima);
			}else{
				mensaje("Error", data[2]);
			}
		});
		
	});
		
	
	
	
	//******** Formulario Infraestructura
	
	$("#GuardarInfraestructura").click(function (event) {
		//var url = "http://192.168.0.163/wssicole/serviciotransporte.php?operacion=creartransporte";
	/*	var url = "http://geoportal.dane.gov.co/wssicole/servicioinfra.php?operacion=crearinfraestructura";
	
		var rol = datossesion.rolusuario;
		url += "&rol=" + rol;
		var sede = $("#nombreSede").val();
		url += "&codigo_dane=" + sede;
		var propiedadLote = $("#propiedadLote").val();
		url += "&propiedad_lote=" + propiedadLote;
		var propiedadEdificacion = $("#propiedadEdificacion").val();
		url += "&propiedad_edifica=" + propiedadEdificacion;
		var bibliotecaCentral = $("#bibliotecaCentral").val();
		url += "&biblioteca_central=" + bibliotecaCentral;
		var bibliotecaAula = $("#bibliotecaAula").val();
		url += "&biblioteca_x_aula=" + bibliotecaAula;	
		
		if($('#urbano').is(':checked')){
			var categoria = $('#urbano').val();
			url += "&categoria=" + categoria;
		}
		if($('#rural').is(':checked')){
			var categoria = $('#rural').val();
			url += "&categoria=" + categoria;
		}
		console.log(encodeURI(url));		
		d3.json(encodeURI(url), function(error, data) {
				if(data[1] == "true"){
					mensaje("¡Felicitaciones!",data[2]);
					//alert(data[2]);
					$(".subventana").hide();
					$("#sedeCuentanos").show();
				}
				else{
					mensaje("¡Error!",data[2]);
					//alert(data[2]);
					console.log(data[2])
					if("El nuevo registro de infraestructura no se pudo crear correctamente en el Sistema SICOLE, puesto que los datos están incompletos" == data[2]){
						
					}else{
						$(".subventana").hide();
						$("#sedeCuentanos").show();
					}	
				}
		});*/
		
		mensaje("¡Felicitaciones!","La encuesta se envió con éxito");
		cerrarTodos();
		$("#sedeCuentanos").show(anima);
	
	});
	
	//******** Formulario Convivencia
	
	$("#GuardarConvivencia").click(function (event) {
	
	if($(this).css("background-color")== "rgb(182, 19, 78)"){
		var url = "http://geoportal.dane.gov.co/wssicole/servicioconvivencia.php?operacion=crearconvivencia";
		var numeroPregunta = [];
		url+="&rol=" + datossesion.rolusuario;
		url+="&existe_ambiente=" +  $('input:radio[name=seguridad1]:checked').val();
		url+="&sentimiento_seguridad=" +  $('input:radio[name=seguridad2]:checked').val();
		
		var matoneo = "";
		if($("#manoteo").prop("checked")== true){
			matoneo = "Curso";
			if($("#manoteoOtro").prop("checked")== true){
				matoneo= "Ambos"
			}
		}else if($("#manoteoOtro").prop("checked")== false){
				matoneo = "Ninguno";
				
		}else{
			matoneo+= "Otroscursos"
		}
		url+="&lugar_agresividad_acoso=" +  matoneo;
		url+="&insulto_sentir_mal=" + $("#agresividad3").val();
		url+="&repetidamente_insulto=" + $('input:radio[name=agresividad4]:checked').val();
		url+="&amenaza_pegar=" + $("#agresividad5").val();
		url+="&repetidamente_amenaza=" + $('input:radio[name=agresividad6]:checked').val();
		url+="&dano_intencional_golpes=" + $("#agresividad7").val();
		url+="&repetidamente_dano_intencional=" + $('input:radio[name=agresividad8]:checked').val();
		
		url+="&discriminacion_vista=" + $("#discriminacion1").val();
		url+="&te_discriminaron=" + $('input:radio[name=discriminado]:checked').val();

		url+="&insulto_amenaza_pegar=" + $("#peleas1").val();
		url+="&cantidad_peleas_persona=" + $("#peleas2").val(); 
		url+="&cantidad_peleas_grupo=" + $("#peleas3").val(); 
		
		url+="&uso_armas=" + $('input:radio[name=armas1]:checked').val();
		url+="&amenaza_arma=" + $("#armas2").val();
		url+= "&codigo_sede=" + $("#nombreSede").val();
		url+= "&documento_usuario=" + datossesion.cedula;
		
		console.log(url);
		d3.json(encodeURI(url), function(error, data){
			if(data[1] == true){
				mensaje("¡Felicitaciones!","La encuesta se envió con éxito");
			}else{
				mensaje("¡Error!",data[2]);
			}
		});
		
		cerrarTodos();
		$("#sedeCuentanos").show(anima);
	}
	else{
		mensaje("¡Error!","Debes llenar todas las preguntas");
	}	
	});


	//******** Formulario Asistencia
	
	$("#botonAsistencia").click(function (event) {	
	
		if($(this).css("background-color") == "rgb(182, 19, 78)"){
			var uri = "http://geoportal.dane.gov.co/wssicole/servicioasistencia.php?operacion=crearasistencia";
			uri+= "&rol=" + datossesion.rolusuario;
			uri+= "&documento_usuario=" + datossesion.cedula;
			uri+= "&codigo_sede=" + $("#nombreSede").val();
			uri+= "&mes=" + $("#fechaDoc").val();
			uri+= "&id_grado=" + $("#gradoDocente").val(); 
			uri+= "&area_conocimiento=" + $("#materiaDocente").val();
			uri+= "&asistencia=" + $('input:radio[name=asistenciaDocente]:checked').val()	
			console.log(uri);
			d3.json(encodeURI(uri), function(error, data){
				if(data[1] == "true"){
					mensaje("¡Felicitaciones!","La encuesta se envió con éxito");
					cerrarTodos();
					$("#sedeCuentanos").show(anima);
				}else{
					mensaje("¡Error!",data[2]);
				}
			});
			
		}else{
			mensaje("¡Error!","Debes llenar todos los campos");
		}
	});	
	
	$("#irAPerfil").click(onclick, function (){
		abrirPerfil()
	})
	
	
	$("#datosDocumentos1").click(onclick, function (){
		$("#barraSesion").hide(anima);
		$("#introduccion").hide();
		$("#encuestaMovil").hide();
	});
	
	
$("#botonMoviles").click(function(){
	if($(this).css("background-color") == "rgb(182, 19, 78)"){
		        
		var uri = "http://geoportal.dane.gov.co/wssicole/servicioconectividad.php?operacion=crearconectividad";
		if(tipoConectividad == 1){
			uri+= "&documento_usuario=" + $("#NumerodeDocumentoMoviles").val();
			uri+="&tipo_documento=" + $("#tipoDocMovil").val();
		}else if(tipoConectividad == 2){
			uri+= "&documento_usuario=" + datossesion.cedula;
			uri+="&tipo_documento=" + cambiaraNumeroDoc(datossesion.tipodocumento);
		}
		uri+= "&tienes_smartphone=" + + $('input:radio[name=resp0]:checked').val();
		if($('input:radio[name=resp1]:checked').val()=="0"){
			uri+= "&acceso_smartphone_por=" + $('input:radio[name=resp1]:checked').val();
			
		}
		if($('input:radio[name=resp1]:checked').val() != "3"){
			uri+= "&lugar_uso=" + $('input:radio[name=resp2]:checked').val();
			uri+= "&conexion_internet=" + $('input:radio[name=resp3]:checked').val();
			if($('input:radio[name=resp3]:checked').val()== "1"){
				uri+= "&tipo_conexion=" + $('input:radio[name=resp31]:checked').val();
			}
			uri+= "&frecuencia_de_uso=" + $('input:radio[name=resp4]:checked').val();
			uri+= "&frecuencia_uso_facebook=" + $('input:radio[name=resp5]:checked').val();
			uri+= "&frecuencia_uso_whatsapp=" + $('input:radio[name=resp6]:checked').val();
			uri+= "&frecuencia_uso_youtube=" + $('input:radio[name=resp7]:checked').val();
			uri+= "&frecuencia_uso_paginas=" + $('input:radio[name=resp8]:checked').val();
			
			
			if($("#resp9").val()=="1" && $("#otrasApp1").val()!="" && $('input:radio[name=resp91]:checked').val()!= undefined){
			console.log("entró");
				uri+= "&otras_aplicaciones_entre=" + $("#otrasApp1").val();
				uri+= "&aplicaciones_entretenimiento=" + $('input:radio[name=resp91]:checked').val();
			}
			
			if($("#resp10").val()=="1" && $("#otrasApp2").val()!="" && $('input:radio[name=resp101]:checked').val()!= undefined){
				uri+= "&otras_aplicaciones_geo=" + $("#otrasApp2").val();
				uri+= "&aplicaciones_geograficas=" + $('input:radio[name=resp101]:checked').val();
			}
			
			if($("#resp11").val()=="1" && $("#otrasApp3").val()!="" && $('input:radio[name=resp111]:checked').val()!= undefined){
				uri+= "&otras_aplicaciones_dif=" + $("#otrasApp3").val();
				uri+= "&otras_aplicaciones=" + $('input:radio[name=resp111]:checked').val();
			}
			
			uri+= "&comunicacion_papas=" + $('input:radio[name=resp12]:checked').val();
			uri+= "&comunicacion_familiares=" + $('input:radio[name=resp13]:checked').val();
			uri+= "&comunicacion_amigos=" + $('input:radio[name=resp14]:checked').val();
		}
			console.log(uri);
		d3.json(encodeURI(uri), function(error, data){
		
			if(data[1]== "true"){
				console.log("yeah")
				mensaje("¡Felicitaciones!", data[2]);
				$("#ventanaEncuesta").hide(anima);
				$("#contenedorEncuesta").hide(anima);
				
				
			} else{
				console.log("yeah");
				//mensaje("¡Error!", data[2]);
				mensaje("¡Felicitaciones!", "Ha llenado la encuesta con éxito");
				$("#ventanaEncuesta").hide(anima);
				$("#contenedorEncuesta").hide(anima);
			}
		});
		
	}else{
		mensaje("¡Error!","Debes llenar todos los campos requeridos");
	}	
});
