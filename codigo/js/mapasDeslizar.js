var map2; 
var map_izquierdo;
var geocoder = "";
var map2;
var map3;
var variable = false;
var userZoom = true;
function deslizar(){
	//inicializarSitiosIni();
	if($("#mapasContinuos").hasClass("comparacionGradiante1")){
		if($("#ventanaCategoriasIzq").css("display") == "block"){
			$("#sidebar").width("61%");
		}else{
			$("#sidebar").width("49.5%");
		}
		var ancho = 3;
		var tamano = parseFloat($("#sidebar").width());
		var left = tamano - parseFloat($("#indicadorOficial").width()) - ancho;
        $("#indicadorOficial").css("right","inherit");
		$("#indicadorOficial").css("left",left);
		
		left = tamano - ancho;
		$("#indicadorNoOficial").css("left",left);	
		$("#sidebar").show();
		
		initializeMapIzquierdo();
	
	}else if($("#mapasContinuos").hasClass("comparacionGradiante2")){
		$("#sidebar").hide();
	}
}

function mapaCalorComparacion(sector, mapa){
	var	servicio = "";
	id = idCalor;
	
	servicio = escogerMapa(id, sector);
	servicio = servicio + "_" + sector +"_v";
	if(servicio == "idw_reprob_secu_oficial_v"){
			servicio = "idw_reprob_secu_oficial_f1";
	}
	if("idw_sb11_nooficial_v" == servicio || "idw_sb11_todos_v" == servicio){
			servicio = servicio.replace("_v", "");
		}
		var clave = "I4YYbPSw13ugmbAP";
		
		if(servicio == "idw_reprob_secu_oficial_f1"){
			clave = "omnq4yUY2D8TpiDa";
			console.log("clave" + clave)
			
		}
		
		if(servicio == "idw_aprob_prim_nooficial_v" || servicio == "idw_aprob_prees_nooficial_v" || servicio == "idw_aprob_secu_nooficial_v" || servicio == "idw_aprob_med_nooficial_v"){
			servicio = servicio.replace("_v", "_d");
		}
	
	capaMapTypeOptions = {
		getTileUrl: function (coord, zoom) {
			var url = "http://tiles.arcgis.com/tiles/" + clave + "/arcgis/rest/services/" + servicio + "/MapServer/tile/" + zoom + "/" + coord.y + "/" + coord.x;
			console.log(url);
			return url;
		},
		tileSize: new google.maps.Size(256, 256),
		opacity: 0.8
	};
	
	var capaMapType = new google.maps.ImageMapType(capaMapTypeOptions); 
	mapa.overlayMapTypes.setAt("0", null);
	mapa.overlayMapTypes.setAt("0", capaMapType);
	mapa.setZoom(11);

}


function initializeMapIzquierdo() {
    geocoder = new google.maps.Geocoder();
    var panoramaOptions = {
        enableCloseButton: true,
        visible: false,
        pov: {
        	heading: 34,
        	pitch: 0
        }
    };
	
	var longitud = -74.22606499999998;
	var latitud = 4.599168000000001;
	map.setCenter(new google.maps.LatLng(latitud, longitud));
	//MapOperative.init();
	//map_izquierdo = map;
	//map_izquierdo = MapOperative.loadMap('map_canvas_izquierdo');
	map_izquierdo = new google.maps.Map(document.getElementById('map_canvas_izquierdo'), {
		center: map.getCenter(),
		zoom: map.getZoom(),
		panControl: false,
		zoomControl: false, //true
		streetViewControl: false,
		scaleControl: false, //true
	});
	map_izquierdo.setMapTypeId(google.maps.MapTypeId.ROADMAP);	
	mapaCalorComparacion("oficial", map_izquierdo);
	mapaCalorComparacion("nooficial", map);
	
}

$('#dragbar').mousedown(function (e) {
    e.preventDefault();
    $('#mousestatus').html("mousedown" + i++);
    var limits = {
        min:  10,
        max:  $(document).width() - 10
    };
    
    $(document).mousemove(function (e) {
        var newX = e.pageX + 2;
        if (newX >= limits.min && newX <= limits.max) {
            $('#position').html(e.pageX + ', ' + e.pageY);
            $('#sidebar').css("width", newX);
            $('#main').css("left", newX);
			if($("#mapasContinuos").hasClass("comparacionGradiante2")){
				var left = newX - parseFloat($("#indicadorOficial").width()) - parseFloat($("#dragbar").width())/2;
				$("#indicadorOficial").css("right","inherit");
				$("#indicadorOficial").css("left",left);
				left = newX - parseFloat($("#dragbar").width())/2;
				$("#indicadorNoOficial").css("left",left);
			}	

        }
    });
	
	$(document).mouseup(function (e) {
		$(document).unbind('mousemove');
	});
	
	
    
});



$(document).mouseup(function (e) {
    $('#clickevent').html('in another mouseUp event' + i++);
    $(document).unbind('mousemove');
});

function paralelos(){
	if($("#ventanaCategoriasIzq").css("display") == "block"){
		var izq = parseFloat($("#ventanaCategoriasIzq").width());
		var anchoBarra = parseFloat($( window ).width()) - parseFloat($("#ventanaCategoriasIzq").width());
		$("#contenedorParalelos").width(anchoBarra); 
		$("#contenedorParalelos").css("left",izq);
		var tamano = parseFloat($("#map2_canvas").width()) + parseFloat($("#lineaParalelo").width())/2 + parseFloat($("#ventanaCategoriasIzq").width());  
		
	}else{
		$("#contenedorParalelos").width("100%"); 
		$("#contenedorParalelos").css("left","0");
		var tamano = parseFloat($("#map2_canvas").width()) + parseFloat($("#lineaParalelo").width())/2;  
	}
	
	var left = tamano - parseFloat( $("#indicadorOficial").width());
    $("#indicadorOficial").css("right","inherit");
	$("#indicadorOficial").css("left",left);
		
	left = tamano;
	console.log("left" + left)
	$("#indicadorNoOficial").css("left",left);	
	
	
	cargarMapaN();
	mapaCalorComparacion("oficial", map2);
	$("#barraCalor1").css("background", $("#barraCalor").css("background") );
	$("#barraCalor1").show(anima);
	mapaCalorComparacion("nooficial", map3);
}
function cargarMapaN(){

	var lat = 4.634709594957594;
	var lng = -74.16181800598144
	var centro = new google.maps.LatLng(lat,lng); 
	map2 = new google.maps.Map(document.getElementById("map2_canvas"), {
		center: centro,
		zoom: 11,
		panControl: false,
		zoomControl: false, //true
		streetViewControl: false,
		scaleControl: false, //true
	});
	
	map3 = new google.maps.Map(document.getElementById("map3_canvas"), {
		center: centro,
		zoom: 11,
		panControl: false,
		zoomControl: false, //true
		streetViewControl: false,
		scaleControl: false, //true
	});
	
	google.maps.event.addListener(map3, 'click', function() {
		clicenMapasAux()
	})
	google.maps.event.addListener(map2, 'click', function() {
		clicenMapasAux()
	})
	
	function clicenMapasAux(){
		mostrarPaneles();
		$("#contenedorParalelos").width("100%"); 
		$("#contenedorParalelos").css("left",0); 
		cargarMapaN();
		mapaCalorComparacion("oficial", map2);
		$("#barraCalor1").css("background", $("#barraCalor").css("background") );
		$("#barraCalor1").show(anima);
		mapaCalorComparacion("nooficial", map3);
		
		var tamano = parseFloat($("#map2_canvas").width()) + parseFloat($("#lineaParalelo").width())/2;  
		var left = tamano - parseFloat( $("#indicadorOficial").width());
		console.log("left" + left)
		$("#indicadorOficial").css("right","inherit");
		$("#indicadorOficial").css("left",left);
			
		left = tamano;
		console.log("left" + left)
		$("#indicadorNoOficial").css("left",left);
		
	}
	userZoom = true;
	google.maps.event.addListener(map2, 'zoom_changed', function() {
		
		userZoom = false;
			map3.setCenter(map2.getCenter());
			map3.setZoom(map2.getZoom());
	})

	google.maps.event.addListener(map3, 'zoom_changed', function() {
		if (userZoom == true) {      
			map2.setCenter(map3.getCenter());
			map2.setZoom(map3.getZoom());
		}
		else {
			userZoom = true; 
		}
		     
	});

  google.maps.event.addListener(map2, 'dragend', function() {
		map3.setCenter(map2.getCenter());
	})
	
	google.maps.event.addListener(map3, 'dragend', function() {
		map2.setCenter(map3.getCenter());
	})

}

