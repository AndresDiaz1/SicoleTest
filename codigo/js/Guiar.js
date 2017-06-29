var distanciaGuiar = 750;
var historial_navegacion = 0;

$("#botonra").click(function (event) {
    ejecutarGuiar()
});

function ejecutarGuiar(){
 window.Guiar.ejecutarGuiar(distanciaGuiar + 250);
}

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	$("#botonra").show();
	document.addEventListener("backbutton", onBackKeyDown, false);
}
function onBackKeyDown() {
	if(activar == true){
		$("#isocronas").hide();
		mostrarPaneles();		
		zoomInicial = 15;
		MapOperative.init();
		map = MapOperative.loadMap('map_canvas', panorama);
		maps.push(map);
		initializeMap2();
		return 0;
	}
	if(sesionactiva == "b"){
		$("#cambiarmapa").show();
		$("#menuInicial").show();	
		$("#menuInicial").show();
		$("#iniciar").hide();
        isRegisterFormVisible=false;
		$("#formularioSesion").hide();
		$("#formularioActualizar").hide();
		$("#botonSalir").hide();
		sesionactiva = "a";
		return 0;
	}
	if(sesionactiva == "c"){
		$("#cambiarmapa").show();
		$("#contactoVentana").hide();
		$("#menuInicial").show();
		$("#sicoleLogo").show();
		sesionactiva = "a";
		return 0;
	}
	if(sesionactiva == "d"){
		$("#cambiarmapa").show();
		$("#menuInicial").show();
		$("#infoSicole").hide();
		$("#sicoleLogo").show();
		sesionactiva = "a";
		return 0;
	}
	if(sesionactiva == "e"){
		d3.json(encodeURI(urlsesion), function(error, data) {	
			datossesion = data[3];
			$("#menuInicial").show();
			$("#cambiarmapa").show();
			$("#seccionPerfil").hide();
			$("#sicoleLogo").show(); 
			sesionactiva = "a";
		});	
		return 0;
	}
	if(historial_navegacion <= 0){
		navigator.app.exitApp();
	}
	else {
		Regresar();
	}	
}
