var map;
var panorama;
var markerGeo;
var satelite = false;
var infowindow = new google.maps.InfoWindow();
var strictBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-6.4113973, -86.835912),
    new google.maps.LatLng(13.573363, -62.0507562)
);

var limitesBogota = new google.maps.LatLngBounds(
    new google.maps.LatLng(4.591905802893342, -74.26778596972656),
    new google.maps.LatLng(4.764363954337591, -73.99587434863281)
);
var auxSitios = 8;

//** Variables para el servicio de ubicación **//
var markerini;
var numeroElemento = 0;
var streetViewLayer = new google.maps.StreetViewCoverageLayer();
var markerLatLngIni = null;
var dir = '';
var bandera = false;
var marcasMarkerini = [];
var infoPlaceini = new google.maps.InfoWindow();
var markersSitiosini = [];
var radioini = 50000;
var markerClusterOf = null;
var markerClusterNOf = null;
var posicionini;
var infoMarker;
var nivel = [];
var CodsedeActiva = "";
var posicionSedeActual = "";
var arrayCercaSitios = ["hospital", "library", "church", "storage", "bus_station", "local_government_office", "bank", "park"];
var arrayJornadas = ["Completa", "Manana", "Tarde", "Noche", "Sabado"];
var contadorFiltro = false;
var entransporte = false;
var enFiltro = false;
var plegarMenus = 0;

//** Variables para la busqueda de sitios **//
var markersSitios = [];
var direccionCaja = "";
var direccionCaja = "";
var auxiliarCategoria = 2;
var auxiliarJornadas = 0;
var enCalcularSitios = false;

//** Variables Sicole **//
var colegiosfound = [];
var colegiosordfound = [];
var distanfound = [];
var isMobile = false;
var radioarea = 500;
var radio_tot = 6668;
var estadoini = 1;
var estadoOrigen = 0;
var estadoDestino = 0;
var estadoRuta = 0;
var origen;
var destino;
var markerOrigen;
var markerDestino;
var jorna = [];
var prima = [];
var prees = [];
var secun = [];
var media = [];
var total = [];
var anima = 500;
var jor = [];
var desercionjor = [];
var reprobacionjor = [];
var aprobacionjor = [];
var transferenciajor = [];
var totdoc = [];
var pordoc = [];
var numestdoc = [];
var autocomplete = "";

var cercaHabilitado = false;
var circulo;
var radio;
var servicioPlaces;
var infoPlace = new google.maps.InfoWindow();
var posicionSitios;
var markersSitios = [];
var modoIsocrona = "BIKE";
//** Variables Sesion **\\

var datossesion;
var datossedesession = [];
var sedeActiva = [];
var urlregistro;
var urlsesion;
var fotoarriba = 0;
var opacidad = 1;
var clasePerfil = 0;
//** Variables Regresar**\\

var sesionactiva = "a";


//**  Donas Info Colegio**//
var bandera1 = false;
var bandera2 = false;
var color1Dona = ["#2C519F", "#5FBEEC", "#139064", "#6351A7", "#A4FF5F"];
var color2Dona = ["#E95D16", "#FCD200", "#E4191D", "#71150A", "#E86F00"];


//** Variables Generales **\\

var pos = 0;
var activar = false;
var anima = 500;
var nombreTitulo = "Instituciones cercanas";
var tipoIsocrona = 2;


var latInicial = 4.598056000000001;
var lngInicial = -74.07583299999999;
var zoomInicial = 0; // 17
var centroInicial = new google.maps.LatLng(latInicial, lngInicial);
//***********  Variables como llegar school  ***************
var posicionMover = centroInicial;
var dejarPosicion = false;
var destinlat;
var destinlon;
var modoIsocrona = 2;

var hasPressedDownloadReport=false;

if (obtenerQueryVariable("lng") && obtenerQueryVariable("lng") != "") {
	lngInicial = obtenerQueryVariable("lng");
}

if (obtenerQueryVariable("lat") && obtenerQueryVariable("lat") != "") {
	latInicial = obtenerQueryVariable("lat");
}
 
if (obtenerQueryVariable("zoom") && obtenerQueryVariable("zoom") != "") {
	zoomInicial = obtenerQueryVariable("zoom");
	zoomInicial = parseInt(zoomInicial);
}

var markersArrayRuta = [];
var directionsDisplay;
var maps = [];
var centrolocal = [["1", -74.0333,	4.7],["2", -74.062,	4.656],["3", -74.072083,	4.583478],["4", -74.087912,	4.554747],["5", -74.110219,	4.515807],["6", -74.135989,	4.574841],["7", -74.19162,	4.618586],["8", -74.152044,	4.627494],["9", -74.137813,	4.677564],["10", -74.111893,	4.700079],["11", -74.0749,	4.742331],["12", -74.073552,	4.669567],["13", -74.085769,	4.641174],["14", -74.087948,	4.607156],["15", -74.102842,	4.588771],["16", -74.11158,	4.616245],["17", -74.072071,	4.596605],["18", -74.113363,	4.566477],["19", -74.149861,	4.552642],["20", -74.256979,	4.036569]];

var directions;
var transitLayer;
var uriBusquedaAvanza = "";
var busquedaAvanza = false;

var hasPressedFilter=false;
var hasPressedContact=false;
var hasPressedAbout=false;
var isUserLoggedIn=false;

var isOnAddScheduleShool=false;
var isAnErrorOnUpdateData=false;
var isSearchingUsingSicoleType=false;
var isAdvancedSearchVisible=false;
///////////////////////////////////////SICOLE////////////////////////////////////

//* Creando el Mapa Mapcontroller*//
var MapOperative = {
    init:function(){
        directions = new google.maps.DirectionsService();
		renderer = new google.maps.DirectionsRenderer();
    },
	
    loadMap:function(el){

        if($('#'+el).length == 0){
            console.log('-- '+el+' doesnt exist, loadMap Aborted');
            return;
        }


		var mapOptions = {
			zoom: 16,
			center: centroInicial,
			panControl: true,
			zoomControl: false, //true
			zoomControlOptions: {
				 style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_LEFT
			},
			streetViewControl: true,
			streetViewControlOptions: {
				position: google.maps.ControlPosition.LEFT
			},

			scaleControl: true, //true
			mapTypeControl: false, //true
			mapTypeControlOptions: {
				mapTypeIds: ['SICOLE', google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID],
				//style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
				style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
				//position: google.maps.ControlPosition.TOP_CENTER
				position: google.maps.ControlPosition[isMobile?'TOP_RIGHT':'TOP_CENTER']
			}
		};	

		
        var map = new google.maps.Map(document.getElementById(el), mapOptions);
				
		/*
		var masControlDiv = document.createElement('div');
		var masControl = new MasControl(masControlDiv, map);
		
		masControlDiv.index = 1000;
		map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(masControlDiv);
		
		var slideControlDiv = document.createElement('div');
		var slideControl = new SliderControl(slideControlDiv, map);
	
		slideControlDiv.index = 1000;
		map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(slideControlDiv);
				
		var menosControlDiv = document.createElement('div');
		var menosControl = new MenosControl(menosControlDiv, map);
		
		menosControlDiv.index = 1000;
		map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(menosControlDiv);
		*/
		
		/************************************/
		/************************************/
		/************************************/
					 
		/*$( "#sliderzoom" ).slider({ 
		  orientation: "vertical",
		  value: 500,
		  min: 100,
		  max: 1000,
		  step: 50,
		  slide: function( event, ui ) {
			//$( "#area" ).html( "Área de Influencia - " + ui.value + " m" );
			//radioarea = ui.value;
		  }
		});*/
		
		
		/*map.addListener('click', function() {
			if(estadoini == 0){
				ocultarPaneles();
				estadoini = 1;
			}
			else{}
				estadoini = 0;
			}
		});*/
		
		
        map.addListener('mousedown', function() {
            ocultarPaneles();
                $("#ventanaCategoriasDer").hide();
        });
        
		
	

		map.addListener('click', function(e) {
			onClickMap();
		});	
		
			

        this.addMapsTypes(map, el);
        //directionsDisplay.setMap(map);

        var inputDesde = document.getElementById('desde_distancia');
        var autocompleteFrom = new google.maps.places.Autocomplete(inputDesde);
        autocompleteFrom.bindTo('bounds', map);
		autocompleteFrom.addListener('place_changed', function() {
			var place = autocompleteFrom.getPlace();
			origen = place.geometry.location;
		});

        var inputHasta = document.getElementById('hasta_distancia');
        var autocompleteTo = new google.maps.places.Autocomplete(inputHasta);
        autocompleteTo.bindTo('bounds', map);		
		autocompleteTo.addListener('place_changed', function() {
			var place = autocompleteTo.getPlace();
			destino = place.geometry.location;
		});
		
		
        this.addMapListeners(map);

		
		google.maps.event.addDomListener(window, "resize", function() {
			var anch = $(window).width();
			var dispositivo = navigator.userAgent.toLowerCase();
			if( dispositivo.search(/iphone|ipod|ipad|android/) > -1 ){
				isMobile = true;	
			}
			else{
				isMobile = false;
			}
			
			var mapOps = {
				mapTypeControlOptions: {
					mapTypeIds: ['SICOLE', google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID],
					//style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
					style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
					//position: google.maps.ControlPosition.TOP_CENTER
					position: google.maps.ControlPosition[isMobile?'TOP_RIGHT':'TOP_CENTER']
				}
			};
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize");
			map.setCenter(center); 
			map.setOptions(mapOps);
		});
		
		//zoomTo();
		var pinColor = "01B4ED";
		var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
		var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(25, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));
		
		markerOrigen = new google.maps.Marker({
			map: map,
			draggable: true,
			icon: pinImage,
			shadow: pinShadow,
			animation: google.maps.Animation.DROP

		});
		
		
		
		markerOrigen.addListener('dragend', function() {
			estadoOrigen =1;
            markerOrigen.setAnimation(null)
			if(entransporte == true){
				setGeoTransporte(markerOrigen.getPosition());
			}
			else{	
				setGeocode(markerOrigen.getPosition());
			}	
		});
	
	  
		pinColor = "8FBE2B";
		pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
		pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(25, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));
		
		markerDestino = new google.maps.Marker({
			map: map,
			draggable: true,
			icon: pinImage,
			shadow: pinShadow,
			animation: google.maps.Animation.DROP
		});
		
		markerDestino.addListener('dragend', function() {
            markerDestino.setAnimation(null)
			estadoDestino =1;
			if(entransporte == true){
				setGeoTransporte(markerDestino.getPosition());
			}else{
				setGeocode(markerDestino.getPosition());
			}	
		});
		
        return map;
    },
    addMapsTypes:function(map, el){
					
		var mapbox2TypeOptions = {
			getTileUrl: function (coord, zoom) {
			// Y coordinate is flipped in Mapbox, compared to Google
			// Simplistic predictable hashing
			   var y = coord.y;
			   var x = coord.x;
			   var z = zoom;

			return 'http://'
				+ ['a', 'b', 'c', 'd'][(x + y) % 4]
				+ '.tiles.mapbox.com/v4/danemoderno.o2hh5del'
				+ '/' + z
				+ '/' + x
				+ '/' + y + '.png'
				+ '?access_token=pk.eyJ1IjoiZGFuZW1vZGVybm8iLCJhIjoiZkV6WFdXOCJ9.LNzA9X_DLgx5TRfDDgYq5g';
			},
		   tileSize: new google.maps.Size(256, 256),
		   opacity: 1,
		   name: 'SICOLE',
		   alt: 'SICOLE',
		   maxZoom: 19
		};
		var mapBox2MapType = new google.maps.ImageMapType(mapbox2TypeOptions);		
		map.mapTypes.set('SICOLE', mapBox2MapType);		
				
				
		map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    },
    addMapListeners:function(map){
        google.maps.event.addListener(map, 'center_changed', function() {
            if(maps.length == 1){
                return;
            }
			
            //map1.setCenter(map.getCenter());
            //alert("center");
            //console.log(map.getCenter());
			//map_izquierdo.setCenter(map.getCenter());
            for(var i = 0; i<maps.length;i++){
                if(maps[i].getDiv() != map.getDiv()){
                    if(map.getCenter() != maps[i].getCenter())
                    maps[i].setCenter(map.getCenter())
					
                }
            }
            
           
            
        });
        google.maps.event.addListener(map, 'zoom_changed', function() {
			if(map_izquierdo){
				map_izquierdo.setZoom(map.getZoom());
				map_izquierdo.setCenter(map.getCenter());
			}
		
			
			var anterior = vectorPosicion[vectorPosicion.length-1];
			var posterior = map.getZoom();
			var resta = Math.abs(posterior -anterior);
			markerini.setPosition(map.getCenter());
			var valor = 32 - map.getZoom();
			if(valor>20){
				valor = 20;
			}else if(valor<12){
				valor = 12; 
			}
			$("#rangeZoom").val(valor);
			if(resta>1&& clicPosicion !=true){
				vectorPosicion.push(map.getZoom());
				posicionActualMapa = vectorPosicion.length-1;
				if($("#prevMapa").css("opacity")=="0.4"){
					$("#prevMapa").css("opacity", "1");
				}
				
			}
			clicPosicion = false;
			
        });
  
       

        // Listen for the dragend event
        google.maps.event.addListener(map, 'dragend', function() {
			markerini.setPosition(map.getCenter());
			if(map_izquierdo){
				map_izquierdo.setCenter(map.getCenter());
			}
			if(enFiltro == true){
				$("#preaload").show();
				cargarMapa();
			}else{
				recargarCercanas();
				if(busquedaAvanza == true){
					var right1 = parseFloat($( window ).width()) * 0.05;	
					$("#funcionalidadActual").css("right",right1);
					right1 = parseFloat($( window ).width()) * 0.01;
					$("#cerrarFuncionalidad").css("right",right1);	
				}
				
			}
			
        });
		
		


    }
}

function onClickMap(){
    console.log("se hizo click en el mapa	")
    $("#bocadillo").hide();
    cerrarAyudaMicro();
    $("#ventanaCategoriasIzq").hide(anima);
    $("#botonPlegar").hide();
    mostrarPaneles();
    $("#ventanaAno").hide(anima);
    posicionSedeActual = "";
    $("#botonPlegar2").hide();
    $("#ocultarClusters").css("left", "0");
    CodsedeActiva = "";
    if($("#ventanaCategoriasIzq").css("display") == "block" && $("#mapasContinuos").hasClass("comparacionGradiante2")){
        $("#sidebar").width("50%");
        map.setCenter(new google.maps.LatLng(4.619700739758193, -74.10796197265621));
        map_izquierdo.setCenter(map.getCenter());
    }
    //if($("#divPanorama").css("display")== "block"){
    //	cerrarPanorama();
    //}

    if ($("#mapasContinuos").hasClass("comparacionGradiante2")){
        var ancho = 3;
        var tamano = parseFloat($("#sidebar").width());
        var left = tamano - parseFloat($("#indicadorOficial").width()) - ancho;
        $("#indicadorOficial").css("right","inherit");
        $("#indicadorOficial").css("left",left);

        left = tamano - ancho;
        $("#indicadorNoOficial").css("left",left);
        $("#sidebar").show();
    }
    if (enFiltro==true){
        $("#mostrarResultados").show(anima);
    }
    if ($("#barraCercaAtuSede").css("display")=="block"){
        $("#barraCercaAtuSede").hide(anima);
        $("#seleccioneSede").show();
        if(circulo != null){
            circulo.setMap(null);
        }

        for (var i = 0; i < markersSitios.length; i++){
            markersSitios[i].setMap(null);
        }
        markersSitios = [];
    }
    if ($("#explicacionMapa").css("display") == "block"){
        $("#desplegadaExplicacion").hide(anima);
        $("#desplegarExplicacion").css("background-image", "url(imagenes/flecha_azulder.png)");
        $("#explicacionMapa").css("bottom","auto");
        $("#explicacionMapa").animate({
            width: "20%",
            top: "55px"
        },anima)
    }
    if ($("#graficaFuncion").css("display")!= "none"){
        $("#graficaFuncion").hide(anima);
        var abajo = parseFloat($("#comparacionMapas").css("bottom").replace("px",""));
        abajo-= 100;
        $("#comparacionMapas").css("bottom", abajo + "px")
    }
    if (estadoOrigen == 0 && estadoDestino == 0 && estadoRuta == 0){
        inputSeleccionado.val("");
        quitarEmergentes();
        if(entransporte == true){
            entransporte = false;
            salirTransporte();
        }
        if($("#isocronas").css("display") == "none"){
            mostrarPaneles();
        }

        $("#barraSesion").hide(anima);
        coloresSecciones("#01B4ED", "#CDEAFB");
        cerrarInfocole();
        $(".autocomplete-jquery-results").css("display","none");

        $("#inputBusqueda").val("");
        direccionCaja="";
        $("#ventanaTipoBusqueda").hide(anima);
        $("#busquedaPopup").css("z-index","100");
        $("#ui-id-1").hide(anima);
        markerini.setPosition(map.getCenter());

    }else{
        if(entransporte == true){
            setGeoTransporte(e.latLng);
        }else{
            setGeocode(e.latLng);
        }


    }

    if($("#functionOpen").css("display") == "block"){
        var right1 = parseFloat($( window ).width()) * 0.05;
        $("#funcionalidadActual").css("right",right1);
        right1 = parseFloat($( window ).width()) * 0.01;
        $("#cerrarFuncionalidad").css("right",right1);
    }
}

function cargarMapa(){
			if(activar == true){
						var tiempo = parseFloat($("#minutos").val());
						 $("#preaload").show();
					   // traveltime.setOrigin(map.getCenter()); 
			}
			inicializarSitiosIni()		
					var c = map.getCenter(),
						x = c.lng(),
						y = c.lat(),
						maxX = strictBounds.getNorthEast().lng(),
						maxY = strictBounds.getNorthEast().lat(),
						minX = strictBounds.getSouthWest().lng(),
						minY = strictBounds.getSouthWest().lat();

					if (x < minX) x = minX;
					if (x > maxX) x = maxX;
					if (y < minY) y = minY;
					if (y > maxY) y = maxY;
					nombreTitulo = "Instituciones Cercanas";
					map.setCenter(new google.maps.LatLng(y, x));
				  openInfoWindowUbicacionIni(markerini);
				  markerLatLngIni = markerini.getPosition();
				  uricolegios = "http://geoportal.dane.gov.co/wssicole/colegio1.php?latitud="+markerLatLngIni.lat()+"&longitud="+markerLatLngIni.lng()+"&distancia="+radioini + "&tipo=reducido";
					d3.json(uricolegios, function(error, data) {
					colegiosfound = [];
					distanfound = [];
					if(activar == false){
						//$("#preaload").hide();
					}
					if(enFiltro == false){
						for (var i = 0; i < data.length; i++) {
							var sitioini = data[i];
							mostrarCercania(sitioini);	
						}	
					}
			});
					
					
					$("#busquedaPopup").show();
					//mostrarPaneles();


		}

function recargarCercanas(){
	markerLatLngIni = markerini.getPosition();
	if(busquedaAvanza == true){
		var uricol = uriBusquedaAvanza;
	}else{
		var uricol = "http://geoportal.dane.gov.co/wssicole/colegio1.php?latitud="+markerLatLngIni.lat()+"&longitud="+markerLatLngIni.lng()+"&distancia=4000&tipo=reducido";
	}
	d3.json(uricol, function(error, data) {
		colegiosfound = [];
		distanfound = [];
		for (var i = 0; i < data.length; i++) {
			var sitioini = data[i];
			mostrarCercania(sitioini);	
		}	
		sitiosCercanos();
	});
}
	
function mostrarCercania(sitioini){
	var lati = parseFloat(sitioini.LATITUD.replace(",","."));
	var longi = parseFloat(sitioini.LONGITUD.replace(",","."));
	var myLatlng = new google.maps.LatLng(lati,longi);
	var x1 = new google.maps.LatLng(markerLatLngIni.lat(),markerLatLngIni.lng());	
	var x2 = new google.maps.LatLng( myLatlng.lat(),myLatlng.lng());
	var distancia = Math.round(google.maps.geometry.spherical.computeDistanceBetween(x1, x2));			
	if(busquedaAvanza == false){
		colegiosfound.push([distancia,sitioini.COD_COL,sitioini.NOM_COL, sitioini.DIR_COL, sitioini.SECTOR]);
	}else{
		colegiosfound.push([distancia,sitioini.CODIGO_SEDE,sitioini.NOMBRE_IES, sitioini.DIRECCION, sitioini.SECTOR]);
	}
}

var modoRecorrido = "TRANSIT";

function setOrigenDestino(origen, destino){
	this.origen = origen;
	this.destino = destino;
	ruta();
}

function setModoRecorrido(modoRecorrido){
	this.modoRecorrido = modoRecorrido;
	$("#TRANSIT").css("background-image","url(imagenes/bus1.png)");
	$("#WALKING").css("background-image","url(imagenes/camina1.png)");
	$("#DRIVING").css("background-image","url(imagenes/carro1.png)");

	switch(modoRecorrido){
		case 'WALKING':
			$("#WALKING").css("background-image","url(imagenes/camina2.png)");
			break;
		case "TRANSIT":
			$("#TRANSIT").css("background-image","url(imagenes/bus2.png)");
			break;
		case "DRIVING":	
			$("#DRIVING").css("background-image","url(imagenes/carro2.png)");
			break;
		default:
			break;	
	}
	
	if(modoRecorrido != ""&& destino != origen){
			ruta();
	}	
}

function ruta() {
	$("#infocoledistancia").show(anima);
	markerOrigen.setMap(null);
	markerDestino.setMap(null);
	renderer.setMap(null);
	renderer = new google.maps.DirectionsRenderer({
        polylineOptions: {
            strokeColor: "#B6134E"
        }
    });
	
	google.maps.Polyline.prototype.setMap=(function(f,r){  
            return function(map){
              if(
                this.get('icons')
                  &&
                this.get('icons').length===1
                  &&
                this.get('strokeOpacity')===0
                  &&
                !this.get('noRoute')
              ){
                if(r.get('polylineOptions')&& r.get('polylineOptions').strokeColor){

                  var icons=this.get('icons'),
                      color=r.get('polylineOptions').strokeColor;
                  icons[0].icon.fillOpacity=1;
                  icons[0].icon.fillColor=color;
                  icons[0].icon.strokeColor=color;
                  this.set('icons',icons);
              }}
            f.apply(this,arguments);
          }      
         })(
              google.maps.Polyline.prototype.setMap,
              renderer);
			  
	var request = {
	  //origin: $('#desde_distancia').val(),
	  //destination: $('#hasta_distancia').val(),
	  origin: origen,
	  destination: destino,
	  travelMode: google.maps.TravelMode[modoRecorrido],
	  provideRouteAlternatives: true,
	};
	
	directions.route(request, function(response, status) {
	  if (status == google.maps.DirectionsStatus.OK) {
		calcularDistanciaRuta(response.routes[0].legs[0].steps);
		renderer.setDirections(response);
		renderer.setMap(map);
	  } else {
		renderer.setMap(null);
	  }
	});
}



function Volverrecorrido (){
		$("#infocoledistancia").css("position", "static");		
		$("#infocoledistancia").css("display", "none");
		$("#volverrecorr").css("position", "static");
		$("#cabezoteruta").css("position", "static");
		$("#infocolepardist").css("display", "block");
		$("#infocoledist").before($("#cabezoteruta"));
		$("#infocoledist").after($("#infocoledistancia"));
		$("#hacerruta").after($("#volverrecorr"));
		$("#volverrecorr").attr("onclick","Regresar()");
		estadoRuta = 0;
}


function calcularDistanciaRuta(pasos){
	var arrayDistancia = new Array();
	var arrayTiempos = new Array();
	var arraySITP = new Array();
	var arraySITPTiempo = new Array();
	arrayDistancia["WALKING"] = 0;
	arrayDistancia["TRANSIT"] = new Array();
	arrayDistancia["DRIVING"] = 0;
	arrayTiempos["WALKING"] = 0;
	arrayTiempos["TRANSIT"] = new Array();
	arrayTiempos["DRIVING"] = 0;
	for(var i = 0; i < pasos.length; i++){
		if(pasos[i].travel_mode == "TRANSIT"){
			var nombre;
			if(pasos[i].transit.line.agencies[0].name == "Transmilenio-Urbana"){
				nombre = "Ruta SITP " + pasos[i].transit.line.short_name;
			}else {
				nombre = "Ruta Transmilenio " + pasos[i].transit.line.short_name;
			}
			arraySITP[nombre] = pasos[i].distance.value;
			arraySITPTiempo[nombre] = pasos[i].duration.value;
		} else {
			arrayDistancia[pasos[i].travel_mode] = arrayDistancia[pasos[i].travel_mode] + pasos[i].distance.value;	
			arrayTiempos[pasos[i].travel_mode] = arrayTiempos[pasos[i].travel_mode] + pasos[i].duration.value;	
		}
		
	}
	arrayDistancia["TRANSIT"] = arraySITP;
	arrayTiempos["TRANSIT"] = arraySITPTiempo;
	if(entransporte == false){
		$("#infocoledistancia").empty();
		var html = "";
		if(arrayDistancia["WALKING"] > 0){
			html += "Distancia caminando: " + arrayDistancia["WALKING"]/1000 + " Kilómetros - Tiempo" + redondeaTiempo(arrayTiempos["WALKING"]) + "</br>";
		}
		for (var ruta in arrayDistancia["TRANSIT"]){
			html += "Distancia en " + ruta + ": " + arrayDistancia["TRANSIT"][ruta]/1000 + " Kilómetros - Tiempo" + redondeaTiempo(arrayTiempos["TRANSIT"][ruta]) + "</br>";
		}
		if(arrayDistancia["DRIVING"] > 0){
			html += "Distancia conduciendo: " + arrayDistancia["DRIVING"]/1000 + " Kilómetros - Tiempo" + redondeaTiempo(arrayTiempos["DRIVING"]) + "</br>";
		}
		
		$("#infocoledistancia").html(html);
		if($("#transporte").css("display")== "block"){
			setTimeout(function(){
				
				var largo = parseFloat($("#infocoledistancia").height()) +25;
				$("#botonPreguntaTransp").animate({
					marginTop: largo
				})
			},502);
		}
		
	}else{
		var time = 0;
		if(arrayDistancia["WALKING"] > 0){
			time = arrayTiempos["WALKING"];
		}
		if(arrayDistancia["DRIVING"] > 0 || arrayDistancia["BICYCLING"] > 0){
			time = arrayTiempos["" + modoRecorrido + ""];
		}
			
			for (var ruta in arrayDistancia["TRANSIT"]){
				console.log("transit" + arrayTiempos["TRANSIT"][ruta]);
				time+= arrayTiempos["TRANSIT"][ruta];
			}
		
		llenarTiempo(time);
		
		
	}	
}

function llenarTiempo(tiempo){
	console.log("tiempo " +tiempo);
	var segundos = (tiempo % 3600);
	var horas = (tiempo - segundos) / 3600;
	$("#horasTransporte").val(horas);
	$("#minTransporte").val(Math.ceil(segundos/60));
}



function redondeaTiempo(tiempo){
	if(tiempo <= 3540){
		return " " + Math.ceil(tiempo/60) + " minutos";
	}else if(tiempo > 3540 && tiempo < 3660){
		return " una hora";
	}else{
		var segundos = tiempo % 3600;
		var horas = (tiempo - segundos) / 3600;
		return " " + horas + " horas " + Math.ceil(segundos/60) + " minutos"; 
	}
}

function convertirSitios(tipo){
	var noEsta = true;
	var arrayAux = [];
	for(i =0; i<arrayCercaSitios.length; i++){
		if(tipo == arrayCercaSitios[i]){
			noEsta = false;
			arrayCercaSitios.splice(i,1);
			$("#" + tipo + "Imagen").css("opacity", "0.3");
            auxSitios--;
            
		}
	}
	if(noEsta == true){
		arrayCercaSitios.push(tipo);
		$("#" + tipo + "Imagen").css("opacity", "1");
        auxSitios++;
	}
	calcularSitios();
}

function sitiosCerca(posicion){
	if(cercaHabilitado == true){
		posicionSitios = posicion;
		
		if(circulo != null){
			circulo.setMap(null);
		}
		
		var circuloOpciones = {
		  strokeColor: "#A91D4A",
		  strokeOpacity: 1,
		  strokeWeight: 2,
		  fillOpacity: 0,
		  clickable: false,
		  map: map,
		  center: posicionSitios,
		};
		
		circulo = new google.maps.Circle(circuloOpciones);
		
		radio = parseFloat($("#sliderCerca").val());
		circulo.setRadius(radio);
		
		map.fitBounds(circulo.getBounds());
		calcularSitios();
	}
}

function calcularSitios(){
    
	for (var i = 0; i < markersSitios.length; i++){
		markersSitios[i].setMap(null);

	}
	markersSitios = [];
	radio = parseFloat($("#sliderCerca").val());
	var tipoSitio = [];
	
	tipoSitio = arrayCercaSitios;
	
	circulo.setRadius(radio);
	map.fitBounds(circulo.getBounds());
	if(tipoSitio.length == 0){
		tipoSitio.push("atm ");
	}
	var request = {
		location: posicionSitios,
		radius: radio,
		types:  tipoSitio
	};
	//console.log(request.types);
	servicioPlaces = new google.maps.places.PlacesService(map);
	servicioPlaces.search(request, callbackSitio);
	
}

function cambiarRadio(){
	calcularSitios();
    ubicarIndicador($("#sliderCerca"));
}


function callbackSitio(results, status, pagination) {

	if (status == google.maps.places.PlacesServiceStatus.OK) {
  
		for (var i = 0; i < results.length; i++) {
			var sitio = results[i];
			mostrarSitio(sitio);	  
		}
		
		/*if (pagination.hasNextPage) {
			pagination.nextPage();
		}*/
	
	}
}

function mostrarSitio(sitio){

	var i = 0;
	var urlicono = sitio.types[0];
    
  
	if(auxSitios>0){
        if(urlicono == "bank"||urlicono == "hospital"||urlicono == "church"||urlicono == "library"||urlicono == "storage"||urlicono == "bus_station"||urlicono =="local_government_office" || urlicono =="park"){
            urlicono = "imagenes/iconosplaces/" + urlicono + ".png"
            //urlicono = "http://geoportal.dane.gov.co/tilesdirect/iconos_sitios/" + urlicono + ".png";
        }else{
            urlicono = "imagenes/iconosplaces/otros.png"
        }
    }else{
        urlicono = "imagenes/iconosplaces/otros.png"
    } 
	var icono = {url: urlicono};
	var markerPlace = new google.maps.Marker({
		icon: icono, 
		position: sitio.geometry.location,
		map: map
	});

	markerPlace.setTitle(sitio.name);
	markersSitios.push(markerPlace);
	
	google.maps.event.addListener(markerPlace, "click", function(){
		if(infoPlace != null){
			infoPlace.close();
		}
		$("#busqueda").hide();
		var html = "<div style='width:100%;height:100%'><strong>" + sitio.name + "</strong></br>";
		html += sitio.vicinity + "</br>";
		html += "</div>";
		infoPlace.setContent(html);
		infoPlace.open(map, markerPlace);
	});

}

function initializeMap() {
    geocoder = new google.maps.Geocoder();
 	MapOperative.init();
	map = MapOperative.loadMap('map_canvas');
	panorama = new google.maps.StreetViewPanorama(
    document.getElementById('divPanorama'), {
		position: centroInicial,
        pov: {
          heading:190,
          pitch: 0
        }
      
	});
  
  
	zoomTo();
	initializeMap2();
	 map.setStreetView(null);
	
	
}

function initializeMap2(){
	
	streetViewMapType = new google.maps.StreetViewCoverageLayer();
	trafficLayerMapType = new google.maps.TrafficLayer(); 	
	streetViewMapType.setMap(null);
	trafficLayerMapType.setMap(null);
    
	var input = /** @type {HTMLInputElement} */(document.getElementById('searchTextField'));
	var boundsAutocomplete = new google.maps.LatLngBounds( new google.maps.LatLng(4.469449196301327, -74.22391302490234), new              google.maps.LatLng(4.824121074757427, -74.0216895751953) );
	var opcionesAutocomplete = {
		bounds: boundsAutocomplete,
		types: ['establishment'],
		componentRestrictions: {country: 'co'}
	};
    autocomplete = new google.maps.places.Autocomplete(input, opcionesAutocomplete);
	/*codigo para google places */
   

	if (infoMarker != null) {
		infoMarker.close();
	}
 
    infoMarker = new google.maps.InfoWindow();
	
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        infoMarker.close();
        markerGeo.setVisible(false);
        //input.className = '';
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // Inform the user that the place was not found and return.
            //input.className = 'notfound';
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        markerGeo.setPosition(place.geometry.location);
        

        //markerGeo.setVisible(true);
		
        var address = '';
        if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
        $("#preaload").show();
		markerini.setPosition(place.geometry.location);
		$("#infocolepar").show();
		openInfoWindowUbicacionIni(markerini);

    });
	
	markerGeo = new google.maps.Marker({
        map: map,
		draggable: false
    });
	
    //** Eventos para la función de obtener el centro geográfico **//
	google.maps.event.addListenerOnce(map, "idle", obtenerUbicacionActual);

}



var MapUtil = {
     DDtoDMS:function(decimales, tipo) {
        // Convierte formato decimal a GMS
        var cardinal = "";

        if(decimales < 0){
            if(tipo == "lat"){
                cardinal = "S";
            }else if(tipo == "lng"){
                cardinal = "O";
            }
        } else {
            if(tipo == "lat"){
                cardinal = "N";
            }else if(tipo == "lng"){
                cardinal = "E";
            }
        }

        var grados = Math.floor(Math.abs(decimales));
        var tempma = Math.abs(decimales) - Math.abs(grados);

        tempma = tempma * 3600;
        var minutos = Math.floor(tempma / 60);
        var segundos = (tempma - (minutos * 60)).toFixed(2);

        return grados + "° " +  minutos + "' " + segundos + "'' " + cardinal;

    },
    addMark:function(lt,lg,title){
        if(typeof lt == 'string'){
            lt = lt.replace(',','.');
            lt = parseFloat(lt);
        }
        if(typeof lg == 'string'){
            lg = lg.replace(',','.');
            lg = parseFloat(lg);
        }
        var myLatlng = new google.maps.LatLng(lt,lg);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: title
        });
    },
     drawPolygon:function(points) {
        var paths = MapUtil.createGooglePath(points);

        var shape = new google.maps.Polygon({
            paths: paths,
            strokeColor: '#ff0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#ff0000',
            fillOpacity: 0.35
        });

        shape.setMap(map);
         map.setCenter(paths[0])
         if(maps.length > 1){

         }
    },

     createGooglePath:function(src) {
        var path = []
        for (var i = 0; i < src.length; i++) {
            path[i] = new google.maps.LatLng(src[i].x, src[i].y)

        }
        return path;
    },
    drawKML:function(url){
        var ctaLayer = new google.maps.KmlLayer({
            url: url
        });
        ctaLayer.setMap(map);
    }
}

window.onload = initializeMap;

function inicializarSitios(){

	if(circulo != null){
		circulo.setMap(null);
	}
	
	for (var i = 0; i < markersSitios.length; i++){
		markersSitios[i].setMap(null);
	}
	markersSitios = [];

}

/*
if (navigator.geolocation) {
    var etimeout = setTimout(onError, 10000);
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout:5000});
}
function onSuccess(pos) {
    clearTimeout(etimeout);
    // ...
}
function onError(err) {
    clearTimeout(etimeout);
    // Note `err` will actually be undefined if this is the result of our timeout
    // and anything you do here should be undone by `onSuccess` (in case the user
    // took longer than 5 seconds to approve the request; for that reason, you
    // shouldn't display any modal UI from here.

    // ...
}

*/

//Función para obtener Ubicación Actual
function obtenerUbicacionActual(){
	/* Determina si el navegador soporta Geolocalización */
    if(dejarPosicion == false){
	if (navigator.geolocation || navigator.geolocation == ""&& !obtenerQueryVariable("lng") || !obtenerQueryVariable("lat") || !obtenerQueryVariable("zoom")) {		
		centroInicial = new google.maps.LatLng(4.598168, -74.076065);
        posicionMover = centroInicial
		navigator.geolocation.getCurrentPosition(posicionActual, showError);
				
	  
	} else {

		centroInicial = new google.maps.LatLng(4.598168, -74.076065);
        posicionMover = centroInicial
		enbogota(centroInicial);
		setTimeout(function (){
			markersArrayRuta[0] = centroInicial;
			ubicarPosicionInicial();
		},100);	
	}
    }else{
       centroInicial = new google.maps.LatLng(posicionMover.lat(), posicionMover.lng());
		enbogota(centroInicial);
		setTimeout(function (){
			markersArrayRuta[0] = centroInicial;
			ubicarPosicionInicial();
		},100);	 
        dejarPosicion = false;
    }
}

function showError(error) {

      switch(error.code) {

        case error.PERMISSION_DENIED:

            

            break;

        case error.POSITION_UNAVAILABLE:

            alert("Location information is unavailable.");

            break;

        case error.TIMEOUT:

            alert("The request to get user location timed out.");

            break;

        case error.UNKNOWN_ERROR:

            alert("An unknown error occurred.");

            break;
		

    }
	centroInicial = new google.maps.LatLng(4.598168, -74.076065);
    posicionMover = centroInicial
	//centroInicial = new google.maps.LatLng(10.985192, -74.845874);
	//console.log(centroInicial);
	enbogota(centroInicial);
	setTimeout(function (){
		markersArrayRuta[0] = centroInicial;
		ubicarPosicionInicial();
	},100);	
}

//Función para ajustar el visor en la geolocalización del navegador
function posicionActual(position){

 //clearTimeout(etimeout);
	if(activar == false){
		centroInicial = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        posicionMover = centroInicial
	}
	else{
		activar=false;
		
	}
	enbogota(centroInicial);
	setTimeout(function (){
		markersArrayRuta[0] = centroInicial;
		ubicarPosicionInicial();
	},100);	
}

function ubicarPosicionInicial(){
		map.setCenter(centroInicial);
		for (p in marcasMarkerini) {
			marcasMarkerini[p].setMap(null);
		}
		addMarkerIni();
}

//Función para obtener variables URL
function obtenerQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}


//**********SERVICIO DE UBICACION*******//

var markerini;	
function addMarkerIni() {
	$("#preaload").show();
	markerini = new google.maps.Marker({
		icon: 'imagenes/sige/neogeografia/iconos-geoportal/gps-local.png',
		position: centroInicial,
		draggable: true,
		map: map
	});

	drawSitesNearCircle(markerini);

	drawUserLocationPin();

	
	var iconoPanoRojo = {url: 'imagenes/sige/neogeografia/iconos-geoportal/gps-local.png',
		size: new google.maps.Size(150, 150),
		scaledSize: new google.maps.Size(150, 150)
	};
	marcasMarkerini.push(markerini);

    infoWindow = new google.maps.InfoWindow();

	google.maps.event.addListener(markerini, 'dragend', function() {
		map.setCenter(markerini.getPosition());
		
		if(enFiltro == true){
			$("#preaload").show();
			cargarMapa();
            
		}else{
            
            var pointA = posicionMover; 
            //lng
            var pointB = pointA.destinationPoint(90, 30);
            var pointC = pointA.destinationPoint(-90, 30);
            //lat
            var pointD = pointA.destinationPoint(0, 30);
            var pointE = pointA.destinationPoint(0, -30);
            
            if($("#transporte").css("display")=="block"){
                cerrarTransporte();
                setDestinos();
            }
            if((markerini.getPosition().lng() < pointB.lng() && markerini.getPosition().lng() > pointC.lng()) && (markerini.getPosition().lat() < pointD.lat() && markerini.getPosition().lat() > pointE.lat())){
                
              recargarCercanas();
                
            }else{
                
                 posicionMover = markerini.getPosition();
                $("#preaload").show();
			     cargarMapa();
            }
            
			
		}
	});

	google.maps.event.addListener(markerini, 'click', function() {
		openInfoWindowUbicacionIni(markerini);
	});
	openInfoWindowUbicacionIni(markerini);
    
}

function drawSitesNearCircle(markerini){
    var circle = new google.maps.Circle({
        map: map,
        radius: 2000,
        fillColor: '#01B4ED',
        fillOpacity: 0.15,
        strokeColor: '#01B4ED'
    });
    circle.bindTo('center', markerini, 'position');

    google.maps.event.addListener(circle, 'click', function(ev) {
        onClickMap();
    	if(isAdvancedSearchVisible){
            $("#busqueda").hide();
            $("#contenedorZoom").css("margin", "4% 0 0 1%")
            isAdvancedSearchVisible=false;
		}
    });

}

function drawUserLocationPin(){
    var ubicaciónUsuario=centroInicial;

    var markerUserLocationIcon = {
        url: 'imagenes/UserLocation.png',
        labelOrigin: new google.maps.Point(22,50)
    };

    var markerUserLocation = new google.maps.Marker({
        icon: markerUserLocationIcon,
        position: ubicaciónUsuario,
        draggable: false,
        label:{
            text:"Tu ubicación",
            color:"#662D91",
            fontWeight: "bold"
        },
        map: map,
    });
    marcasMarkerini.push(markerUserLocation);

}

function openInfoWindowUbicacionIni(markerini) {
	geocoder = new google.maps.Geocoder();
	//centroInicial = markerini.getPosition();	
    markerLatLngIni = markerini.getPosition();	
	//traveltime.setOrigin(markerLatLngIni);
	markersArrayRuta[0] = markerini.getPosition();
    lugaresCercanos();
	geocoder.geocode({"latLng": markerLatLngIni}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0])
			{
			
			}
			
			else
			{
				dir = "No se ha podido obtener ninguna dirección en esas coordenadas.";
				alert(dir);
			}
		}
		else
		{
			dir = "El Servicio de Codificación Geográfica ha fallado con el siguiente error: " + status + ".";
			alert(dir);
		}
	});
}

function openInfoWindowUbicacionIni2(markerini) {
	geocoder = new google.maps.Geocoder();
    markerLatLngIni = markerini.getPosition();	
	markersArrayRuta[0] = markerini.getPosition();
	geocoder.geocode({"latLng": markerLatLngIni}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0])
			{
			}
			else
			{
				dir = "No se ha podido obtener ninguna dirección en esas coordenadas.";
				alert(dir);
			}
		}
		else
		{
			
		}
	});
}

function lugaresCercanos(){
	posicionini = markerLatLngIni;
	inicializarSitiosIni();
	calcularSitiosIni();
}

function inicializarSitiosIni(){
	for (var i = 0; i < markersSitiosini.length; i++){
		markersSitiosini[i].setMap(null);
	}
	
	
	if(bandera != false && markerClusterOf != null){
		for (var i =0; i<markerClusterOf.markers_.length; i++)
		{
			markerClusterOf.markers_[i].setMap(null);
		}
		markerClusterOf.markers_ =[];
		markerClusterOf.clearMarkers();
		//markerClusterOf= null;
		for (var i =0; i<markerClusterNOf.markers_.length; i++)
		{
			markerClusterNOf.markers_[i].setMap(null);
		}
		markerClusterNOf.markers_ =[];
		markerClusterNOf.clearMarkers();
		//markerClusterNOf = null;
	}
	bandera = true;
	markersSitiosini = [];
}

function calcularSitiosIni(){

	 $("#preaload").show();
	colegiosfound = [];
	distanfound = [];
    var primaria=[];
	var filtroTasas = []
	$( "#infocole" ).empty();

	var tipoSitioini = ["school"];
	if(enFiltro==true){
            radioini = $("#filtroDistanciaR").val();
		
	}else{
		radioini = 50000;
	}
	console.log("radio " + radioini);
	
	uricolegios = "http://geoportal.dane.gov.co/wssicole/colegio1.php?latitud="+markerLatLngIni.lat()+"&longitud="+markerLatLngIni.lng()+"&distancia="+radioini;
	if(enFiltro == false){
				uricolegios+= "&tipo=reducido";
	}
	console.log(uricolegios);
	d3.json(uricolegios, function(error, data) {
		if(activar == false){
			$("#preaload").hide();
            
		}
        
		markerClusterOf = new MarkerClusterer(map, {imagePath: "imagenes/oficial"});
		
		var	mcOptions = {styles: [{
			url: "/imagenes/no-oficial.png"
		}]};
		markerClusterNOf = new MarkerClusterer(map, {imagePath: "imagenes/no-oficial"});
		if(bandera == false){
				numeroColegios = datalength;
		}
		
		numeroColegios = data.length;
       
		for(j=0; j<vectorTasas.length; j++){
				
			for(k=0; k<tasasNiveles.length; k++){
				var mayuscula = vectorTasas[j].charAt(0).toUpperCase() + vectorTasas[j].slice(1);
				mayuscula= mayuscula.replace("ó", "o");
				var mayuscula1 = tasasNiveles[k].charAt(0).toUpperCase() + tasasNiveles[k].slice(1);
				var desliz = $("#" + mayuscula + mayuscula1 + "").val();
				if(desliz!=1){
					//filtroTasas.push([""])
					filtroTasas.push({ "nombre": mayuscula, "nivel": mayuscula1 , "valor": desliz})
				}	
			}
		}
		contadorFiltro = false;
		colegiosfound = [];
        numeroElemento =0;
		for (var k = 0; k < data.length; k++) {
			var sitioini = data[k];
			
			if(enFiltro == false){
				todosLossitios(sitioini);
			}else{
				mostrarSitioIni2(sitioini,filtroTasas, data.length-1, k);
								
			}
			
		}
		 $("#preaload").hide(700);
		
	});
}

function procesarJornada(variable){
	var jornadaValor = false;
	for(j=0;j<variable.length;j++){
		var posicion = parseInt(variable[j])-1;
		if($("#filtro" + arrayJornadas[posicion] + "").is(':checked')){
			jornadaValor = true;
		}
	}
	return jornadaValor;
}

function procesarCalendario (calendario){
	switch (calendario){
		case 'A':
			return $("#calendarioA").is(':checked');
			break;
		case 'B':
			return $("#calendarioB").is(':checked');
			break;	
		default:
			return $("#calendarioOtros").is(':checked');
			break;
	} 
	
}

function procesarGenero(genero){
		switch(genero){
			case '1':
				return 	false;
				break;
			case '2':
				return 	$("#masculino").is(':checked');
				break;
			case '3':
				return 	$("#femenino").is(':checked');
				break;	
			case '4':
				return 	$("#mixto").is(':checked');
				break;	
			default: 
				return false;
				break
		}
		
}

function procesarNivel(nivel){
	var niveles = nivel.split(",");
	var valores = 0
	for(i =0; i<niveles.length; i++){
		valores+= niveles[i]; 
	}
	
	if(valores == 0){
		return false;
	}else{
		return true;
	}
	
}
           
function todosLossitios(sitioini){
	if(sitioini.SECTOR ==	"1"){
		var id = "sectorOficial";
	}else if(sitioini.SECTOR ==	"2"){
		var id = "sectorNoOficial";
	}else{
		var id = "";
	}
	
	if(id != "" && $("#" + id + "").is(':checked')){
	if(sitioini.SECTOR == "1"){
		icon = "imagenes/oficial.png";
	}else if(sitioini.SECTOR == "2"){
		icon = "imagenes/no-oficial.png";
	}
	
	if(sitioini.COD_COL == CodsedeActiva)
	{
		//icon = "imagenes/seleccionado.png";
	}
	
	var icono = {url: icon};
						
	var iconoiniPano = {url: icon,
		scaledSize: new google.maps.Size(200, 200),
		point: new google.maps.Point(0,0),
		point: new google.maps.Point(0, 0)
	};
						
	var lati = parseFloat(sitioini.LATITUD.replace(",","."));
	var longi = parseFloat(sitioini.LONGITUD.replace(",","."));					
	var myLatlng = new google.maps.LatLng(lati,longi);

	var markerPlaceini = new google.maps.Marker({
		icon: icono, 
		position: myLatlng,
		map: map,
		sector: sitioini.SECTOR,
		codigo: sitioini.COD_COL
	});
		
			
	markerPlaceini.setIcon(icon);					
	markerPlaceini.setTitle(sitioini.NOM_COL);
	markersSitiosini.push(markerPlaceini);
	
	
	if(sitioini.SECTOR == "1"){
		markerClusterOf.addMarker(markerPlaceini);
	}else if(sitioini.SECTOR == "2"){
		markerClusterNOf.addMarker(markerPlaceini);
	}
	
	google.maps.event.addListener(markerPlaceini, "click", function(){
		clickenSede(sitioini);
	});
						
	var x1 = new google.maps.LatLng(markerLatLngIni.lat(),markerLatLngIni.lng());	
	var x2 = new google.maps.LatLng( myLatlng.lat(),myLatlng.lng());
	var distancia = Math.round(google.maps.geometry.spherical.computeDistanceBetween(x1, x2));				
	colegiosfound.push([distancia,sitioini.COD_COL,sitioini.NOM_COL, sitioini.DIR_COL, sitioini.SECTOR]);
	distanfound.push(distancia);
	}
}

function clickenSede(sitioini){
	favorito = false; 
    
    
    $(".contenidoIdentificacion").hide();
    $(".selectores").css("opacity", "0.6");
    
    $("#MANANA .imagenSelectores").css("background-image","url(imagenes/mananad.png)");
    $("#TARDE .imagenSelectores").css("background-image","url(imagenes/tarded.png)");
    $("#NOCHE .imagenSelectores").css("background-image","url(imagenes/noched.png)");
    $("#COMPLETA .imagenSelectores").css("background-image","url(imagenes/completad.png)"); 
    $("#FINDESEMANA .imagenSelectores").css("background-image","url(imagenes/sab-fesd.png)"); 
    
	var lati = parseFloat(sitioini.LATITUD.replace(",","."));
	var longi = parseFloat(sitioini.LONGITUD.replace(",","."));					
	var myLatlng = new google.maps.LatLng(lati,longi);	
	
		if(cercaHabilitado == true){
            //confirmarIsocrona(myLatlng);
            
			$("#barraCercaAtuSede").show(anima)
			$("#seleccioneSede").hide();
            sitiosCerca(myLatlng);
		}
		
		if(infoPlaceini != null){
			infoPlaceini.close();
			jActiva = "";
			codsedeActiva = sitioini.COD_COL
		}
		
		
	
		if(datossesion != "" && datossesion != undefined){
			$("#colegioFavorito").show();
			var documento = cambiaraNumeroDoc(datossesion.tipodocumento)
			url = "http://geoportal.dane.gov.co/wssicole/favoritos.php?operacion=consultar&tipo_documento=" + documento +"&numero_documento=" + datossesion.cedula  + "&codigo_sede=" + codsedeActiva;
			d3.json(encodeURI(url), function(error, data) {
				if (data.favorito == true){
					$("#estrellaColegioFavorito").css("background-image", "url(imagenes/agregado.png)");
					$("#agregarColegioFavorito").text("Agregado a favoritos");
					favorito = true;  
				}else if (data.favorito == false){
					$("#estrellaColegioFavorito").css("background-image", "url(imagenes/agregar.png)");
					$("#agregarColegioFavorito").text("Agregar a favoritos");
					favorito = false;  
				}						
			});				
		}else{
			$("#colegioFavorito").hide();
			
		}
		
		if($("#barrafiltro").css("display") == "block"&& filtroAbierto == true){
			$("#mostrarResultados").show(anima);
		}
							
		if($("#explicacionMapa").css("display")=="block"){
			$("#explicacionMapa").css("top", "auto");
			$("#explicacionMapa").animate({
				bottom: "9%",
				width: "26%"
			}, anima);
		}
							
		if($("#barraMapa").css("display")== "block" && $("#etiquetaMapa").css("display") == "block"){
			desplegarGrafica();
			setTimeout(function (){
				variableGrafica();
			},1000)
		}
		markersArrayRuta[1] = myLatlng;												
		var x1 = new google.maps.LatLng(markerLatLngIni.lat(),markerLatLngIni.lng());	
		var x2 = new google.maps.LatLng( myLatlng.lat(),myLatlng.lng());	
		var distancia = Math.round(google.maps.geometry.spherical.computeDistanceBetween(x1, x2));
		if(sitioini.COD_COL){
			var codigo = sitioini.COD_COL; 
		}else{
			var codigo = sitioini.CODIGO_SEDE
		}
		CodsedeActiva = codigo;
		cargarinfo(codigo, distancia);
		posicionSedeActual = myLatlng;	
}

function mostrarSitioIni2(sitioini, filtroTasas, todos , posicion){
	var uricalidad2 = "http://geoportal.dane.gov.co/wssicole/serviciocalidad.php?codigosede=" + sitioini.COD_COL;
	var uriaprobacion = "http://geoportal.dane.gov.co/wssicole/servicioeficiencia.php?tipotasa=aprobacion&codigoies=" + sitioini.COD_COL;
	var urireprobacion = "http://geoportal.dane.gov.co/wssicole/servicioeficiencia.php?tipotasa=reprobacion&codigoies=" + sitioini.COD_COL;
	var uridesercion = "http://geoportal.dane.gov.co/wssicole/servicioeficiencia.php?tipotasa=desercion&codigoies=" + sitioini.COD_COL;
	var uritransferencia = "http://geoportal.dane.gov.co/wssicole/servicioeficiencia.php?tipotasa=transferencia&codigoies=" + sitioini.COD_COL;
	
	d3.json(uricalidad2, function(error, data1){
	d3.json(uriaprobacion, function(error, aprobacion){
	d3.json(urireprobacion, function(error, reprobacion){
	d3.json(uridesercion, function(error, desercion){
	d3.json(uritransferencia, function(error, transferencia){


	var porceest = sitioini.EST_DOC,
		mapaJornadas = true,
		calendario = true,
		genero = true,
		filtroPreescolar = false,
		filtroPrimaria = false,
		filtroSecundaria = false,
		filtroMedia = false,
		filtroNivel = false,
		numeroTasas = 0,
		puntaje = data1[0]["PUNTAJE_PROMEDIO_PORSEDE"];
	if(porceest == null){
		porceest = 0;
	}
	
	if(puntaje == ""){
		if($( "#slider-range" ).slider( "values" )[0] == 0 && $( "#slider-range" ).slider( "values" )[1] == 100 ){
			puntaje = 0;
		}else{
			puntaje = -1;
		}	
	}else{
		puntaje = parseFloat(puntaje.replace(",", "."));
	}
	
	
	porceest = parseInt(porceest);	
	// Bandera es true cuando no se está inicializando la aplicación.
	if(bandera!=false){
		mapaJornadas = procesarJornada(sitioini.JORNADA);
		calendario = procesarCalendario (sitioini.ETIQUETA);
		if($("#masculino").is(':checked') && $("#femenino").is(':checked') && $("#mixto").is(':checked')){
				filtroNivel = true;
		}else{
			genero = procesarGenero(sitioini.GENERO);
		}

		if($("#preescolar").is(':checked') && $("#primaria").is(':checked') && $("#secundaria").is(':checked') && $("#media").is(':checked')){
			filtroNivel = true;
		}else{
			
			if($("#preescolar").is(':checked')){
				filtroPreescolar = procesarNivel(sitioini.PREESCOLAR);
			}
			if($("#primaria").is(':checked')){
				filtroPrimaria = procesarNivel(sitioini.PRIMARIA);
				
			}
			if($("#secundaria").is(':checked')){
				filtroSecundaria = procesarNivel(sitioini.SECUNDARIA);
			}
			if($("#media").is(':checked')){
				filtroMedia = procesarNivel(sitioini.MEDIA);
				
			}
			if(filtroPreescolar == true || filtroPrimaria == true || filtroSecundaria == true || filtroMedia == true){
				filtroNivel = true;
			
			}else{
				filtroNivel = false;
			}
		}
		for(i =0;i< filtroTasas.length; i++){
			var nivel = filtroTasas[i].nivel.toUpperCase(),
				tasa = filtroTasas[i].nombre.toUpperCase(),
				valorSlider = $("#" + filtroTasas[i].nombre + filtroTasas[i].nivel).val(),
				variable = 0;
			switch(filtroTasas[i].nombre){
				case "Aprobacion":
					variable = aprobacion;
					break;
				
				case "Reprobacion":
					variable = reprobacion;
					break;
				
				case "Desercion":
					variable = desercion;
					break;
				
				case "Transferencia":
					variable = transferencia;
					break;	
			}
			
			variable = variable[0]["" + tasa + "_" + nivel + ""];
			if(variable == "NO APLICA"){
				variable = 2;
			}else{
				variable = parseFloat(variable.replace(",", "."));
			}
			if(variable<= filtroTasas[i].valor){
				numeroTasas++;
			}
			
		}
		
	}else{
		filtroNivel = true;
	}
	
	if(porceest >= $("#numeroEstudiantes").slider( "values" )[0] && porceest <= $("#numeroEstudiantes").slider( "values" )[1]){
		if(puntaje >= $( "#slider-range" ).slider( "values" )[0] && puntaje <= $( "#slider-range" ).slider( "values" )[1] && numeroTasas == filtroTasas.length){ 
			if(mapaJornadas == true && calendario == true && genero == true && filtroNivel == true){ 
			
				if($('#Oficial').is(':checked')){ 
					if(sitioini.SECTOR == "1"){
						
						icon = "imagenes/oficial.png";
						if(sitioini.COD_COL == CodsedeActiva)
						{
							//icon = "imagenes/seleccionado.png";
						}
						var iconoofi = {url: icon};
						
						var iconoiniPano = {url: icon,
							scaledSize: new google.maps.Size(200, 200),
							point: new google.maps.Point(0,0),
							point: new google.maps.Point(0, 0)
						};
						
						var lati = parseFloat(sitioini.LATITUD.replace(",","."));
						var longi = parseFloat(sitioini.LONGITUD.replace(",","."));
						
						var myLatlng = new google.maps.LatLng(lati,longi);

						var markerPlaceini = new google.maps.Marker({
							icon: iconoofi, 
							position: myLatlng,
							map: map,
							sector: sitioini.SECTOR,
							codigo: sitioini.COD_COL
						});
						
						markerPlaceini.setIcon('imagenes/oficial.png');					
						markerPlaceini.setTitle(sitioini.NOM_COL);
						markersSitiosini.push(markerPlaceini);
						markerClusterOf.addMarker(markerPlaceini);
						
						google.maps.event.addListener(markerPlaceini, "click", function(){
							clickenSede(sitioini);
						});
						
						var x1 = new google.maps.LatLng(markerLatLngIni.lat(),markerLatLngIni.lng());	
						var x2 = new google.maps.LatLng( myLatlng.lat(),myLatlng.lng());
						var distancia = Math.round(google.maps.geometry.spherical.computeDistanceBetween(x1, x2));
						
						colegiosfound.push([distancia,sitioini.COD_COL,sitioini.NOM_COL, sitioini.DIR_COL, sitioini.SECTOR]);
						distanfound.push(distancia);
						
					}
				}
				if($('#NoOficial').is(':checked')){ //Verde
					if(sitioini.SECTOR == "2"){
						
						urlicononoofi = "./imagenes/no-oficial.png";
						if(sitioini.COD_COL == CodsedeActiva)
						{
							//urlicononoofi = "imagenes/seleccionado.png";
						}	
						
						
						var iconoofi = {url: urlicononoofi};
						
						var iconoiniPano = {url: urlicononoofi,
							scaledSize: new google.maps.Size(200, 200),
							point: new google.maps.Point(0,0),
							point: new google.maps.Point(0, 0)
						};
					
					
						var lati = parseFloat(sitioini.LATITUD.replace(",","."));
						var longi = parseFloat(sitioini.LONGITUD.replace(",","."));
						
						var myLatlng = new google.maps.LatLng(lati,longi);

						var markerPlaceini = new google.maps.Marker({
							icon: iconoofi, 
							position: myLatlng,
							map: map,
							sector: sitioini.SECTOR,						
							codigo: sitioini.COD_COL
						});
						
						

						markerPlaceini.setIcon('./imagenes/no-oficial.png');					
						markerPlaceini.setTitle(sitioini.NOM_COL);
						markersSitiosini.push(markerPlaceini);
						markerClusterNOf.addMarker(markerPlaceini);
						
			google.maps.event.addListener(markerPlaceini, "click", function(){
				favorito = false; 
				
				
				if(infoPlaceini != null){
					infoPlaceini.close();
					jActiva = "";
					codsedeActiva = sitioini.COD_COL
				}
				if(datossesion != "" && datossesion != undefined){
					$("#colegioFavorito").show();
					var documento = cambiaraNumeroDoc(datossesion.tipodocumento)
					url = "http://geoportal.dane.gov.co/wssicole/favoritos.php?operacion=consultar&tipo_documento=" + documento +"&numero_documento=" + datossesion.cedula  + "&codigo_sede=" + codsedeActiva;
					d3.json(encodeURI(url), function(error, data) {
						if (data.favorito == true){
							$("#estrellaColegioFavorito").css("background-image", "url(imagenes/agregado.png)");
							$("#agregarColegioFavorito").text("Agregado a favoritos");
							favorito = true;  
						}else if (data.favorito == false){
							$("#estrellaColegioFavorito").css("background-image", "url(imagenes/agregar.png)");
							$("#agregarColegioFavorito").text("Agregar a favoritos");
							favorito = false;  
						}						
					});				
				}else{
					$("#colegioFavorito").hide();
					
				}
				
				if($("#barrafiltro").css("display") == "block"&& filtroAbierto == true){
					$("#mostrarResultados").show(anima);
				}
				
				
				if($("#explicacionMapa").css("display")=="block"){
					$("#explicacionMapa").css("top", "auto");
					$("#explicacionMapa").animate({
						bottom: "9%",
						width: "26%"
					}, anima);
				}
									
				if($("#barraMapa").css("display")== "block" && $("#etiquetaMapa").css("display") == "block"){
					desplegarGrafica();
					setTimeout(function (){
						variableGrafica();
					},1000)
				}
				markersArrayRuta[1] = myLatlng;				
				destinlat = myLatlng.lat();
				destinlon = myLatlng.lng();								
				var x1 = new google.maps.LatLng(markerLatLngIni.lat(),markerLatLngIni.lng());	
				var x2 = new google.maps.LatLng( myLatlng.lat(),myLatlng.lng());	
				var distancia = Math.round(google.maps.geometry.spherical.computeDistanceBetween(x1, x2));
				cargarinfo(sitioini.COD_COL, distancia);
					//**Para los sitios cercanos**//
				posicionSedeActual = markerPlaceini.getPosition();	
				if(cercaHabilitado == true){
					sitiosCerca(markerPlaceini.getPosition());
					$("#barraCercaAtuSede").show(anima)
					$("#seleccioneSede").hide();
				}
				
				
									
			});
						
						var x1 = new google.maps.LatLng(markerLatLngIni.lat(),markerLatLngIni.lng());	
						var x2 = new google.maps.LatLng( myLatlng.lat(),myLatlng.lng());
						var distancia = Math.round(google.maps.geometry.spherical.computeDistanceBetween(x1, x2));
						
						colegiosfound.push([distancia,sitioini.COD_COL,sitioini.NOM_COL, sitioini.DIR_COL, sitioini.SECTOR]);
						distanfound.push(distancia);				
				}
			
			}
			
			
		}
	
	}
	
}else{
}	
	if(todos == numeroElemento){
		sitiosCercanos();
		setTimeout(function (){
			$("#numeroSedesFiltro p").html(colegiosfound.length + " de " + numeroColegios + " sedes");
			$("#numeroSedesFiltro").show(anima).css("display", "flex");
		}, 300);
		
	}
    numeroElemento++;
		
	
	});
	});
	});
	});
	});
	
}

function mostrarSitioIni3(sitioini){
	
	var i = 0;
	urliconoofi = "imagenes/oficial.png";
	urlicononoofi = "imagenes/no-oficial.png";
	
	var iconoofi = {url: urliconoofi};
	var icononoofi = {url: urlicononoofi};

	var iconoiniPano = {url: urliconoofi,
		scaledSize: new google.maps.Size(200, 200),
		point: new google.maps.Point(0,0),
		point: new google.maps.Point(0, 0)
	};

	var lati = parseFloat(sitioini.LATITUD.replace(",","."));
	var longi = parseFloat(sitioini.LONGITUD.replace(",","."));
	
	var myLatlng = new google.maps.LatLng(lati,longi);

	var bangalore = { 
		lat: lati,
		lng: longi
	};	
	
	var markerPlaceini = new google.maps.Marker({
		icon: iconoofi, 
		position: myLatlng,
		map: map,
		sector: sitioini.SECTOR,		
		codigo: sitioini.CODIGO_SEDE
	});

	if(sitioini.SECTOR == "OFICIAL"){
		markerPlaceini.setIcon('./imagenes/oficial.png');
		markerClusterOf.addMarker(markerPlaceini);
	} else if(sitioini.SECTOR == "NO OFICIAL"){
		markerPlaceini.setIcon('./imagenes/no-oficial.png');
		markerClusterNOf.addMarker(markerPlaceini);
	}
	
	markerPlaceini.setTitle(sitioini.NOMBRE_SEDE);
	markersSitiosini.push(markerPlaceini);
	
	google.maps.event.addListener(markerPlaceini, "click", function(){
		clickenSede(sitioini);					
	});
	
	var x1 = new google.maps.LatLng(markerLatLngIni.lat(),markerLatLngIni.lng());	
	var x2 = new google.maps.LatLng( myLatlng.lat(),myLatlng.lng());
	var distancia = Math.round(google.maps.geometry.spherical.computeDistanceBetween(x1, x2));
	
	colegiosfound.push([distancia,sitioini.CODIGO_SEDE,sitioini.NOMBRE_SEDE, sitioini.DIRECCION, sitioini.SECTOR]);
	distanfound.push(distancia);
}

function Regresar() {
			enCalcularSitios = false;
			$("#infocolepar").hide();
			$("#infocolepardist").hide();
			$("#infocolecerca").hide();
			$("#barramenu").hide();
			$("#busqueda").hide();			
			$("#barrafiltro").hide();
			$("#abajobotones").show();
			$("#botonmapas").show();
			$("#botonmostrar").show();
			$("#barraSesion").hide(anima);
			mostrarPaneles();
			
			renderer.setMap(null);
			$("#desde_distancia").val("");
			$("#hasta_distancia").val("");
			$("#infocoledistancia").empty();
			markerOrigen.setMap(null);
			markerDestino.setMap(null);
			setGeoBuscadores();

			setMiUbicacion();
			
			var ruteodiv = $('#infocoledist .divpresent');
			
			for(i=0; i < ruteodiv.length; i++){
				ruteodiv[i].style.backgroundImage = "-moz-linear-gradient(top, #ffffff, #cbcbcb)";
				ruteodiv[i].style.backgroundImage = "-ms-linear-gradient(top, #ffffff, #cbcbcb)";
				ruteodiv[i].style.backgroundImage = "-o-linear-gradient(top, #ffffff, #cbcbcb)";
				ruteodiv[i].style.backgroundImage = "-webkit-gradient(linear, center top, center bottom, from(#ffffff), to(#cbcbcb))";
				ruteodiv[i].style.backgroundImage = "-webkit-linear-gradient(top, #ffffff, #cbcbcb)";
				ruteodiv[i].style.backgroundImage = "linear-gradient(top, #ffffff, #cbcbcb)";
			}

			for(jr = 0; jr < markersSitiosini.length; jr++){
				if(markersSitiosini[jr].sector == "1" || markersSitiosini[jr].sector == "OFICIAL"){
					markersSitiosini[jr].setIcon('./imagenes/oficial.png');
                    markersSitiosini[jr].setAnimation(null);
				}
				if(markersSitiosini[jr].sector == "2" || markersSitiosini[jr].sector == "NO OFICIAL"){
					markersSitiosini[jr].setIcon('./imagenes/no-oficial.png');
                    markersSitiosini[jr].setAnimation(null);
				}
			}
			
			//**Reinicia los Sitios Cercanos**//
			$("#infocolecercatitulo").html("Seleccione una sede en el mapa");
            $("#infocolecercatitulo").css("margin-top","35px");
			cercaHabilitado = false;
            $("#infocolecercatipo").hide();
			//$("#slider_cerca").slider("disable");
			//$("#infocolecercatipo").prop("disabled", true);
			if(circulo != null){
				circulo.setMap(null);
			}
			for (var i = 0; i < markersSitios.length; i++){
				markersSitios[i].setMap(null);

			}
			markersSitios = [];
}


//**  Cargar Info Colegios **//


function sitiosCercanos(){
    var contenedorColegios =$("#contenedorColegiosCercanos");
	contenedorColegios.html("");
    var htmlpri = "";
    var imagenSector = "";
    var colorLetras = ""
    htmlpri+= "<div id='tituloColegiosCercanos' tabindex='=-1'><h1 tabindex='0' id='titleNearSites'>" + nombreTitulo +"</h1><img class='nearSitesIconTitle' src='imagenes/sige/neogeografia/iconos-geoportal/gps-local.png' alt='icono sedes cercanas'></img> </div><div id ='lineaTitulo'></div>";
		
	if(colegiosfound.length!=0) {
    colegiosfound.sort(function (a,b) {
		if (a[0] > b[0]) return  1;
		if (a[0] < b[0]) return -1;
		return 0;
	});
    //$("#tituloColegiosCercanos").text("Instituciones Cercanas");
	
	
	var i = 0;
    if(enFiltro == true){
        var limite = 50000;
    }else{
        if(nombreTitulo == "Resultado Búsqueda")
            var limite = 10000
        else{
            var limite = 2000;    
        }    
        
    }    
    while(i < colegiosfound.length && parseInt(colegiosfound[i][0]) <= limite){	
        colegiosfound[i][2] = colegiosfound[i][2].replace("?","Ñ");
        
        if(colegiosfound[i][4]==1 || colegiosfound[i][4]=="OFICIAL"){
            imagenSector = "imagenes/oficial.png";
            colorLetras = "#0A738C";
        }else if (colegiosfound[i][4]==2 || colegiosfound[i][4]=="NO OFICIAL"){
            imagenSector = "imagenes/no-oficial.png"; 
            colorLetras = "#70A12E";
        } 
        
        htmlpri += "<div id = '" + colegiosfound[i][1] + " 'class ='contenedorColegio' onkeypress='ubicarCentroKeyPress(event,"+ colegiosfound[i][1] +", "+ colegiosfound[i][0] +")' onclick='ubicarCentro("+ colegiosfound[i][1] +", "+ colegiosfound[i][0] +")' tabindex='0'><div class = 'tipoColegio' style = 'background-image:url(" + imagenSector + ")'></div><div class = 'infoColegio'><a href='#' class='a-tag-no-decoration school-name' style='color:" + colorLetras + "'>" + colegiosfound[i][2] +"</a><br><p class ='direccionColegio'>" + colegiosfound[i][3] + "</p><p class = 'distanciaColegio' style='color:" + colorLetras + "'>" + colegiosfound[i][0] +"m</p></div></div>";
		i++;
	} 
    
    /*setTimeout(function(){
        
        if (contenedorColegios.offsetHeight < contenedorColegios.scrollHeight){
            $("#scrollBajar").show(100);
        } else{
            $("#scrollBajar").hide();
        }
        
    }, 501);*/
	
	} 
	contenedorColegios.html(htmlpri);
    
}

function crearpreview(){
	for(jr = 0; jr < markersSitiosini.length; jr++){
		if(markersSitiosini[jr].sector == "1" || markersSitiosini[jr].sector == "OFICIAL"){
			markersSitiosini[jr].setIcon('./imagenes/oficial.png');
            markersSitiosini[jr].setAnimation(null);
			}
		if(markersSitiosini[jr].sector == "2" || markersSitiosini[jr].sector == "NO OFICIAL"){
			markersSitiosini[jr].setIcon('./imagenes/no-oficial.png');
            markersSitiosini[jr].setAnimation(null);
		}
	}
	
	$( "#infocolepar" ).empty();
	
	var urlsicole = "http://geoportal.dane.gov.co/v2/images/logo_sicole.png";
	
	var htmlpri = "<div style='height: 150px;width: 100%;'><div id='infocolecab' style='font-family: Arial, Helvetica, sans-serif;font-size: 25px;font-weight: bold;color: #278CA5;text-shadow: 1px 1px 1px rgba(24,63,75,.9);padding-left: 10px;padding-top: 5px;'><strong>Colegios cercanos</strong></div><div id='imgsicole' style='background-color:#E0E0E0;width:90%;height: 100px;background-image:url("+urlsicole+");background-repeat:no-repeat;background-size:50%;'></div></div>";
    
    //<div id='infocole'></div>";
	
	$("#infocolepar").append(htmlpri);
	
	colegiosfound.sort(function (a,b) {
		if (a[0] > b[0]) return  1;
		if (a[0] < b[0]) return -1;
		return 0;
	});
		
	for(i=0; i < colegiosfound.length; i++){
		
		var html = "";		
	
		html += "<div id='"+ colegiosfound[i][1] +"' class='divpresent' style='cursor: pointer; height: 180px; position:relative; overflow: hidden;/* height: 30px; */ padding: 10px; /*-moz-box-shadow: 0px 0px 15px #000000; -webkit-box-shadow: 0px 0px 15px #000000; box-shadow: 0px 0px 15px #000000;*/ background-color: #E0E0E0; /*background-image: -ms-linear-gradient(top, #ffffff, #cbcbcb);background-image: -o-linear-gradient(top, #ffffff, #cbcbcb); background-image: -webkit-gradient(linear, center top, center bottom, from(#ffffff), to(#cbcbcb)); background-image: -webkit-linear-gradient(top, #ffffff, #cbcbcb); background-image: linear-gradient(top, #ffffff, #cbcbcb);*/' onclick='cargarinfo("+ colegiosfound[i][1] +", "+ colegiosfound[i][0] +")' >";	
		
		html += "<img src='http://geoportal.dane.gov.co/wssicole/colegio3.php?cod_col="+colegiosfound[i][1]+"' style='height: auto;width: 100%;margin-top: -10px;' onerror='cargarimggene(this)'>";
		
		html += "<div style='bottom: 0px; position: absolute; width: 100%; color: black; padding-top: 5px; background-color: #E0E0E0;'><strong>" + colegiosfound[i][2] + "</strong>";
		
		html += "<div style='margin-top: 2px;'>"+colegiosfound[i][0] + " metros</div>";
		
		html += "</div>";
		
		html += "</div>";
		
		$("#infocole").append(html);
		
		
		var altu = $(window).height() - $("#barrainferior").height(); 
		$("#infocole").css("height", (altu - 150 - 60) + "px"); //"90%"		
		$("#infocole").css("position","static");
		$("#infocole").css("z-index","100");
	}
	
		html = "<div onclick='Regresar()' class='selectoressup' style='cursor:pointer;' >Regresar</div>";
		
		$("#infocolepar").append(html);		
			
}
			
function setMiUbicacion(){
	
	geocoder.geocode({"latLng": markerini.getPosition()}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0])
			{
			
				dir = results[0].formatted_address;
				if(estadoDestino == 1){
					$("#hasta_distancia").val(dir);
					markerDestino.setPosition(markerini.getPosition());
					origen = markerini.getPosition();
				} else {
					$("#desde_distancia").val(dir);	
					markerOrigen.setPosition(markerini.getPosition());
					destino = markerini.getPosition();
				}
			}
			else
			{
				dir = "<p>No se ha podido obtener ninguna dirección en esas coordenadas.</p>";
				alert(dir);
			}
		}
		else
		{
			dir = "<p>El Servicio de Codificación Geográfica ha fallado con el siguiente error: " + status + ".</p>";
			alert(dir);
		}
		
		setGeoBuscadores();
		
	});

}
function setGeoIsocrona(){

	var latlng = markerini.getPosition();
	geocoder.geocode({"latLng": latlng}, function(results, status) {
		if (results[0])
		{
			dir = results[0].formatted_address;
			$("#ubicacionIsocrona").val(dir);	
		}	
	});

}


function setGeoTransporte(latlng){
	geocoder.geocode({"latLng": latlng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0])
			{
				
				dir = results[0].formatted_address;
				
				if(estadoOrigen == 1){
					$("#rutaOrigen").val(dir);
					markerOrigen.setPosition(latlng);
					estadoOrigen = 0;
					origen = latlng;
				} else if(estadoDestino == 1){
					$("#rutaDestino").val(dir);	
					markerDestino.setPosition(latlng);
					estadoDestino = 0;
					destino = latlng;
				}
			}
			else
			{
				dir = "<p>No se ha podido obtener ninguna dirección en esas coordenadas.</p>";
				alert(dir);
			}
		}
		else
		{
			dir = "<p>El Servicio de Codificación Geográfica ha fallado con el siguiente error: " + status + ".</p>";
			alert(dir);
		}
		$(".ubicadorTransporte").css("opacity", "0.5");
		
		if(modoRecorrido != ""&& destino != origen){
			ruta();
		}
	});
	
				
}

function enbogota(latlng){
	
	geocoder.geocode({"latLng": latlng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0]){
				var dir = results[0].formatted_address;
				var direccion2 = dir.split(", ");
				if(direccion2[1]== "Bogotá"||direccion2[1]== "Soacha" ){
				}else{
				
					centroInicial = new google.maps.LatLng(4.598168, -74.076065);
				}
			}
		}
	});	
}
function setGeocode(latlng){

	geocoder.geocode({"latLng": latlng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0])
			{
				
				dir = results[0].formatted_address;
				if(estadoOrigen == 1){
					//$("#desde_distancia").val(dir);
					markerOrigen.setPosition(latlng);
					origen = latlng;
				} else if(estadoDestino == 1){
					//$("#hasta_distancia").val(dir);
					markerDestino.setPosition(latlng);
					destino = latlng;
				}
			}
			else
			{
				dir = "<p>No se ha podido obtener ninguna dirección en esas coordenadas.</p>";
				alert(dir);
			}
		}
		else
		{
			dir = "<p>El Servicio de Codificación Geográfica ha fallado con el siguiente error: " + status + ".</p>";
			alert(dir);
		}
		
		setGeoBuscadores();
		
		if(modoRecorrido != ""&& destino != origen){
			ruta();
		}

	});

}

function setUbicacionGeocodigo(marker_icono){
	$("#marker_origen").css({ opacity: 0.5 });
	$("#marker_destino").css({ opacity: 0.5 });
	$("#" + marker_icono).css({ opacity: 1 });
	
	if(marker_icono == "marker_origen"){
		
        markerOrigen.setMap(map);
		estadoOrigen = 1;
		estadoDestino = 0;
        markerOrigen.setAnimation(google.maps.Animation.BOUNCE);
        markerDestino.setAnimation(null);
        
	}else if(marker_icono == "marker_destino"){
		markerDestino.setMap(map);
		estadoOrigen = 0;
		estadoDestino = 1;
        markerDestino.setAnimation(google.maps.Animation.BOUNCE);
        markerOrigen.setAnimation(null);
	}
}



function setGeoBuscadores(){
	
	estadoOrigen = 0;
	estadoDestino = 0;
	$("#marker_origen").css({ opacity: 0.5 });
	$("#marker_destino").css({ opacity: 0.5 });
	
}

function variableTotal(palabra, vector, jornada){
	var mayusculas = palabra.toUpperCase();
	var total = 0; 
	var niveles = ["PREESCOLAR", "PRIMARIA", "SECUNDARIA", "MEDIA"];
	var contadorNumeros = 0,
		total1 =0,
		altoMulticolores = 0;
	for(i =0; i<niveles.length; i++){
		var resultado = cambiarComa(vector[0]["" + mayusculas + "_" + niveles[i]])
		if(isNaN(resultado) == true){
		
		}else{
			total+=resultado;
			contadorNumeros++;			
		}
	}
	if(contadorNumeros == 0){
		contadorNumeros = 1; 
	}
    total = total/contadorNumeros;
    total1 =(total*100);
    total1 = total1.toFixed(1);
    $("#texto" + palabra + jornada).text(total1 + "%");
    altoMulticolores = $("#barraMulticolorTotal").height()*total;
    $("#tasa" + palabra + jornada).height(altoMulticolores + "%");
    return total;
}

function cambiarComa(valor){
	var valor1 = 0
	if(valor == "NO APLICA"){
		valor1 = valor;
	}else{
		valor1 = parseFloat(valor.replace(",", ".")); 
	}

	return valor1
}

function textoinsumo(insumo, total){
	var numero = Math.round(total*insumo);
	var porcentajeInsumo = insumo *100;
	porcentajeInsumo = Math.round(porcentajeInsumo);
	$("#docenteConPosgrado").text(numero + " (" + porcentajeInsumo + "%)");
	numero = total - numero;
	porcentajeInsumo = Math.round((numero/total)*100);
	$("#docenteSinPosgrado").text(numero + " (" + porcentajeInsumo + "%)");
}
	
//**  Cargar Info Colegio Específico **//	
function cargarinfo(codcol,dist){
	codsedeActiva = codcol;
	console.log("codogico" + codcol);
	//$("#divcontenedorMulticolor").text("");
	$(".seccionMulticolor").show();
	$("#errorMulticolor").hide();
	$("#barraSesion").hide(anima);
	desercionjor = [];
	aprobacionjor = [];
	reprobacionjor = [];
	transferenciajor = [];
	totdoc = [];
	pordoc = [];
	numestdoc = [];
	$("#ventanaCategoriasDer").hide(anima);
    $("#preaload").show();
	uricol = "http://geoportal.dane.gov.co/wssicole/colegio2.php?cod_col="+codcol;	
	console.log(uricol);
	//uritamano = "http://geoportal.dane.gov.co/wssicole/serviciotamano.php?codigosede="+codcol;
	urisedes = "http://geoportal.dane.gov.co/wssicole/serviciousuario.php?operacion=obtenerSedesHermanas&sededane="+codcol;
	uricali = "http://geoportal.dane.gov.co/wssicole/serviciocalidad.php?codigosede="+codcol;
	uricaliTodo = "http://geoportal.dane.gov.co/wssicole/serviciocalidad.php";
	urideser = "http://geoportal.dane.gov.co/wssicole/servicioeficiencia.php?tipotasa=desercion&codigoies="+codcol;
	uriapro = "http://geoportal.dane.gov.co/wssicole/servicioeficiencia.php?tipotasa=aprobacion&codigoies="+codcol;
	urirepro = "http://geoportal.dane.gov.co/wssicole/servicioeficiencia.php?tipotasa=reprobacion&codigoies="+codcol;
	uritrans = "http://geoportal.dane.gov.co/wssicole/servicioeficiencia.php?tipotasa=transferencia&codigoies="+codcol;
	
	uriinsumo = "http://geoportal.dane.gov.co/wssicole/servicioinsumjornadas.php?codigosede="+codcol;
	var uriinsumo1 = "http://geoportal.dane.gov.co/wssicole/servicioinsumos.php?codigosede="+codcol;
	
	uritotal= "http://geoportal.dane.gov.co/wssicole/servicioinsumos.php";
	
	d3.json(urisedes, function(error, sedestota) { 
	
	d3.json(uricali, function(error, cali) { 
		if(cali[0]["PUNTAJE_PROMEDIO_PORSEDE"] == ""){
			valorCalidad = false;
		}else{
			var valor2 = parseFloat(cali[0]["PUNTAJE_PROMEDIO_PORSEDE"].replace(",", "."));
			var anchoBarra = 0;

            anchoBarra = parseFloat(valor2-100)/4;
			$("#estadoSaber").width(anchoBarra + "%");
			//$("#clasificacionSaber").text(cali[0]["CLASIFICACION_SEDE"])
			$("#porcentajePrueba").text(valor2.toFixed(0));
			valorCalidad = true;
			
		}
		
	});
	
	
	d3.json(urideser, function(error, deser) { 
					
		d3.json(uriapro, function(error, apro) { 
						
			d3.json(urirepro, function(error, repro) { 
						
				d3.json(uritrans, function(error, trans) { 
					desercionjor.push(variableTotal("Desercion",deser, ""));
					aprobacionjor.push(variableTotal("Aprobacion",apro, ""));
					reprobacionjor.push(variableTotal("Reprobacion",repro,""));
					transferenciajor.push(variableTotal("Transferencia",trans, ""));
					if($("#textoDesercion").text() == "0%" && $("#textoReprobacion").text() == "0%" && $("#textoAprobacion").text() == "0%" && $("#textoTransferencia").text() == "0%")
					{
						$("#errorMulticolor").show();
						$(".seccionMulticolor").hide();
					}	
					
				});
			});
		});
	});
	d3.json(uriinsumo1, function(error, insumo4) {
		d3.json(uriinsumo, function(error, insumoJornada) {
			var total =	0;
			var insumo1 = parseFloat(insumo4[0]["PORCENTAJE_DOCENTES_POSTGRADO"].replace(",", "."));
			pordoc.push(insumo1);
			numestdoc.push(parseFloat(insumo4[0]["NUMERO_ESTUDIANTES_DOCENTE"].replace(",",".")));
			for(i=0; i<insumoJornada.length; i++){
				total+= parseFloat(insumoJornada[i]["TOTAL_DOCENTES"].replace(",","."));
				pordoc.push(parseFloat(insumoJornada[i]["PORCENTAJE_DOCENTES_POSTGRADO"].replace(",",".")));
				numestdoc.push(parseFloat(insumoJornada[i]["NUMERO_ESTUDIANTES_DOCENTE"].replace(",",".")));
			}
			totdoc.push(total);

			for(i=0; i<insumoJornada.length; i++){
				totdoc.push(parseFloat(insumoJornada[i]["TOTAL_DOCENTES"].replace(",",".")));
			}
			
				llenarDonaRecursos(0,color1Dona);
				numeroEstuPorProfe(0);
			
		})
	});		
										
	d3.json(uricol, function(error, data) {
	
		if(data.length!=0){
			$("#nombreSedeCerca").html(data[0]["NOM_COL"]);
			lat = data[0]['LATITUD'];
			longi = data[0]['LONGITUD'];
			latcor = lat.replace(",",".");
			longcor = longi.replace(",",".");
										var latitud = parseFloat(latcor);
										var longitud = parseFloat(longcor);
										var ubicacion = new google.maps.LatLng(latitud, longitud);
										if($("#divPanorama").css("display") == "block"){
											svService = new google.maps.StreetViewService();
											svService.getPanoramaByLocation(ubicacion, 50, function(data, status){  
										   if (status != "OK"){  
												console.log("Centro no Valido"); 
												   panorama.setVisible(false);
												/*   $('#streetview').css("background-position", "center center");
												   $('#streetview').css("background-image", "url(imagenes/geonimo_nostreetview.png)");
												   $('#streetview').css("background-repeat", "no-repeat");*/
											  } else {  
												console.log("Centro Valido"); 
													var heading = google.maps.geometry.spherical.computeHeading(new google.maps.LatLng(latitud, longitud) ,data.location.latLng);
													panorama.setPano(data.location.pano);
													panorama.setPov({
														heading: heading,
														pitch: 0
													});
													panorama.setVisible(true);
											   }  
											});
											
											panorama.setPosition(ubicacion);
										
										}
										latitud =latitud-0.0023;
										var ubicacion2 = new google.maps.LatLng(latitud, longitud);
										map.setCenter(ubicacion2);
										
										for(jr = 0; jr < markersSitiosini.length; jr++){
											
												
                                            if(markersSitiosini[jr].getTitle() == data[0]["NOM_COL"] ){
                                            	//markersSitiosini[jr].setIcon('imagenes/distrital-seleccionado.png');
                                                markersSitiosini[jr].setAnimation(google.maps.Animation.BOUNCE);
                                                
											}
                                            else if(markersSitiosini[jr].sector == "1" || markersSitiosini[jr].sector == "OFICIAL"){
                                                setIconAndDeleteAnimation(jr,'imagenes/oficial.png');
													
											} else if(markersSitiosini[jr].sector == "2" || markersSitiosini[jr].sector == "NO OFICIAL"){
                                                setIconAndDeleteAnimation(jr,'imagenes/no-oficial.png');
											}
                                            
											
										}
										obtnerjornadasalumnos(data);
										jor = [];
										for(i = 0;i < jorna.length; i++){
											jor.push(invertirjornada(jorna[i]));
										}		
										var contjor = 0;		
										for(i = 0;i < jorna.length; i++){
											var nombre = jorna[i].replace(" ","");
											nombre = nombre.replace(" ", "");
											uriefijorna = "http://geoportal.dane.gov.co/wssicole/servicioeficienjornada.php?tipotasa=todastasas&codigoies="+codcol+"&codigojornada="+jor[i];
											d3.json(uriefijorna, function(error, datajor) {
												
												desercionjor.push(variableTotal("Desercion",datajor, ""));
												aprobacionjor.push(variableTotal("Aprobacion",datajor, ""));
												reprobacionjor.push(variableTotal("Reprobacion",datajor,""));
												transferenciajor.push(variableTotal("Transferencia",datajor, ""));	
												
												contjor++;
												if( contjor == jor.length){
                                                    setTimeout(crearInfoColegio(data, sedestota), 2000);
															
												}	
												
												if($("#infocolecerca").css("display") == "block") {
													$("#infoColeEsp").hide(anima);
												
												}else{
													$("#infoColeEsp").show(anima);
													map.setZoom(16);
													setTimeout(function (){
														var right = $("#infoColeEsp").width()-20;
														$("#botonPlegar2").css("right",right).css("left","inherit").show(200);
                                                        $("#InfoSchoolTitle").focus();
                                                        var focusTrapInfoSchool=returnFocusTrapInfoSchool();
                                                        focusTrapInfoSchool.activate();
													},500);
												}
                                                
												
											});
										}
										
									}
									});
									
								});	
}


function setIconAndDeleteAnimation(position,icon){
    markersSitiosini[position].setIcon(icon);
    markersSitiosini[position].setAnimation(null);
}




function changerCouleur(opcion, color1, color2){
    
   opcion.css({ background: "-moz-linear-gradient(top,"+color1+","+ color2+")"}).css({ background: "-ms-linear-gradient(top, "+color1+", "+color2+")"}).css({ background: "-o-linear-gradient(top, "+color1+", " +color2 +")"}).css({ background: "-webkit-gradient(linear, center top, center bottom, from("+color1+"), to("+color2+"))"}).css({ background: "-webkit-linear-gradient(top, "+color1+", "+color2+")"}).css({ background: "linear-gradient(top, color1, color2)"});
}













function activarJornadas(){
    
    for(i=0; i < jorna.length; i++){
		switch (jorna[i]){
            case "MAÑANA" : 
                $("#MANANA").css("opacity","1");  
                $("#MANANA .imagenSelectores").css("background-image","url(imagenes/manana.png)");     
            break;  
                
            case "TARDE" : 
                $("#TARDE").css("opacity","1");  
                $("#TARDE .imagenSelectores").css("background-image","url(imagenes/tarde.png)");     
            break;     
            
            case "NOCHE" : 
                $("#NOCHE").css("opacity","1");  
                $("#NOCHE .imagenSelectores").css("background-image","url(imagenes/noche.png)");     
            break;    
                
            case "COMPLETA" : 
                $("#COMPLETA").css("opacity","1");  
                $("#COMPLETA .imagenSelectores").css("background-image","url(imagenes/completa.png)");     
            break;
        
            case "FIN DE SEMANA" : 
                $("#FINDESEMANA").css("opacity","1");  
                $("#FINDESEMANA .imagenSelectores").css("background-image","url(imagenes/sab-fes.png)");     
            break;
                
            default:
            break;    
        
                
        }
    }
    
}
function cerrarInfocole(){
                $("#infoColeEsp").hide();
                $("#popUpFotoCole").hide(anima);
                $(".selectores").removeClass("botonPresionado").css("opacity","0.6");
                $("#manana .imagenSelectores").css("background-image","url(imagenes/mananad.png)");
                $("#tarde .imagenSelectores").css("background-image","url(imagenes/tarded.png)");
                $("#noche .imagenSelectores").css("background-image","url(imagenes/noched.png)");
                $("#completa .imagenSelectores").css("background-image","url(imagenes/completad.png)"); 
                $("#finDeSemana .imagenSelectores").css("background-image","url(imagenes/sab-fesd.png)");
                auxiliarCategoria = 1;
                $("#filaIzqNivel").show(anima);
                $(".nivelesPorJornada").hide();
				$("#contenidoCaracteristicas").hide();
    
                for(jr = 0; jr < markersSitiosini.length; jr++){
                    if(markersSitiosini[jr].sector == "1" || markersSitiosini[jr].sector == "OFICIAL"){
			             markersSitiosini[jr].setIcon('./imagenes/oficial.png');
                        markersSitiosini[jr].setAnimation(null);
			         }
		              if(markersSitiosini[jr].sector == "2" || markersSitiosini[jr].sector == "NO OFICIAL"){
			             markersSitiosini[jr].setIcon('./imagenes/no-oficial.png');
                          markersSitiosini[jr].setAnimation(null);
		              }
	           }
}

function cargarinfor(categoria){
	
   coloresSecciones("#318DA6", "#CDEAFB");
    var auxiliarCategoria = categoria;
    var auxiliarJornadas = 0;
    var contenedor = "";
    
    $("#MANANA .imagenSelectores").css("background-image","url(imagenes/mananad.png)");
    $("#TARDE .imagenSelectores").css("background-image","url(imagenes/tarded.png)");
    $("#NOCHE .imagenSelectores").css("background-image","url(imagenes/noched.png)");
    $("#COMPLETA .imagenSelectores").css("background-image","url(imagenes/completad.png)"); 
    $("#FINDESEMANA .imagenSelectores").css("background-image","url(imagenes/sab-fesd.png)"); 
    $(".selectores").removeClass("botonPresionado").css("opacity","0.6");
    if(categoria!=1 && categoria !=3){
      activarJornadas(); 
	  jornadaActivada();
    }
   //   $(".campodetextos .nombreBoton").css("border-bottom", "2px solid rgba(182,19,78,1)").css("color", "rgba(182,19,78,1)");
	if(auxiliarCategoria != 1 && auxiliarCategoria != 3){
		jornadaActivada();
	}
	switch(auxiliarCategoria){
        case 1: 
            contenedor = "Identificacion";
            break;
        case 2: 
			contenedor = "Caracteristicas"

			break;
		case 3:
			if(valorCalidad == true){
                contenedor = "Calidad"
                $("#contenidoCalidad1").hide();
			}else{
				$("#contenidoCalidad").hide();
				contenedor = "Calidad1"
			}	
			break;
		case 4:
            contenedor = "Eficiencia"
			break;
		case 5: 
            contenedor = "Recursos"
			break;	
        default:
            break;
    }
    
    contenedor = $("#contenido" + contenedor + "");
    $(".trianguloVerde").css("background-image", "url(imagenes/trianguloVerde.png)")
    if(contenedor.css("display") == "block"){
        setAriaExpanded(categoria, false);
        contenedor.hide(anima);
        $("#despliegue" + categoria).css("background-image", "url(imagenes/trianguloVerde.png)")
    }else{
        setAriaExpanded(categoria, true);
        $(".contenidoIdentificacion").hide();
        $("#despliegue" + categoria).css("background-image", "url(imagenes/trianguloVerde2.png)")
        contenedor.show(anima)
    }
    
}

function setAriaExpanded(option, state){
	switch(option){
		case 1:
            $("#uno").attr('aria-expanded',state);
            break;
        case 2:
            $("#dos").attr('aria-expanded',state);
            break;
        case 3:
            $("#tres").attr('aria-expanded',state);
            break;
        case 4:
            $("#cuato").attr('aria-expanded',state);
            break;
        case 5:
            $("#cinco").attr('aria-expanded',state);
            break;
	}
}

function cambiarColor(color,color1){
    
        $(".titulo5").css("background-color",color)
        $(".titulo5 h1").css("color",color1);
                                                                                                                           
}

function cambiarTipoJornadas(aux,aux1,aux2,aux3,aux4){
    changerCouleur(aux,"#bcbcbc","#969696");
    changerCouleur(aux1,"#FFF","#cbcbcb");
    changerCouleur(aux2,"#FFF","#cbcbcb");
    changerCouleur(aux3,"#FFF","#cbcbcb");
    changerCouleur(aux4,"#FFF","#cbcbcb");
}


function traerdesercion(jornada, nivel){
	for(h = 0; h < jorna.length; h++){
		if(jorna[h] == jornada){
			return desercionjor[h][nivel];
		}
	}
	return "NO APLICA";
}

function traerreprobacion(jornada, nivel){
	for(h = 0; h < jorna.length; h++){
		if(jorna[h] == jornada){
			return reprobacionjor[h][nivel];
		}
	}
	return "NO APLICA";
}

function traeraprobacion(jornada, nivel){
	for(h = 0; h < jorna.length; h++){
		if(jorna[h] == jornada){
			return aprobacionjor[h][nivel];
		}
	}
	return "NO APLICA";
}

function traertranferencia(jornada, nivel){
	for(h = 0; h < jorna.length; h++){
		if(jorna[h] == jornada){
			return transferenciajor[h][nivel];
		}
	}
	return "NO APLICA";
}

function traertotaldocentes(jornada){
	for(h = 0; h < jorna.length; h++){
		if(jorna[h] == jornada){
			return parseFloat(totdoc[h]);
		}
	}
	return "NO APLICA";
}

function traerporcentaje(jornada){
	for(h = 0; h < jorna.length; h++){
		if(jorna[h] == jornada){
			if(pordoc[h] != undefined){
				return parseFloat(pordoc[h].replace(",",".")) + "%";	
			}
			else{
					return "";
			}			
		}
	}
	return "NO APLICA";
}

function traerestudiantesdocentes(jornada){
	for(h = 0; h < jorna.length; h++){
		if(jorna[h] == jornada){
			return parseFloat(numestdoc[h]);
		}
	}
	return "NO APLICA";
}

function traerpre(entrada){
	var cont = 0;
	for(i = 0; i < entrada.length; i++){
		if(entrada[i] != "0"){
			cont++;
		}		
	}
	if(cont != 0){
		return "<pre style='padding-left: 10px;'>PREESCOLAR</pre>";
	}	
	else{
		return "";
	}
}

function traerpri(entrada){
	var cont = 0;
	for(i = 0; i < entrada.length; i++){
		if(entrada[i] != "0"){
			cont++;
		}		
	}
	if(cont != 0){
		return "<pre style='padding-left: 10px;'>PRIMARIA</pre>";
	}	
	else{
		return "";
	}
}

function traersec(entrada){
	var cont = 0;
	for(i = 0; i < entrada.length; i++){
		if(entrada[i] != "0"){
			cont++;
		}		
	}
	if(cont != 0){
		return "<pre style='padding-left: 10px;'>SECUNDARIA</pre>";
	}	
	else{
		return "";
	}
}

function traermed(entrada){
	var cont = 0;
	for(i = 0; i < entrada.length; i++){
		if(entrada[i] != "0"){
			cont++;
		}		
	}
	if(cont != 0){
		return "<pre style='padding-left: 10px;'>MEDIA</pre>";
	}	
	else{
		return "";
	}
}

function devolverSi(entrada){
	if(entrada == "0" || entrada == 0){
		return "NO";
	}
	if(entrada == "1" || entrada == 1){
		return "SI";
	}
}

function nombrelocalidad(entrada){
	if(entrada == "1" || entrada == 1){
		return "USAQUÉN";
	}
	if(entrada == "2" || entrada == 2){
		return "CHAPINERO";
	}
	if(entrada == "3" || entrada == 3){
		return "SANTA FE";
	}
	if(entrada == "4" || entrada == 4){
		return "SAN CRISTÓBAL";
	}
	if(entrada == "5" || entrada == 5){
		return "USME";
	}
	if(entrada == "6" || entrada == 6){
		return "TUNJUELITO";
	}
	if(entrada == "7" || entrada == 7){
		return "BOSA";
	}
	if(entrada == "8" || entrada == 8){
		return "KENNEDY";
	}
	if(entrada == "9" || entrada == 9){
		return "FONTIBÓN";
	}
	if(entrada == "10" || entrada == 10){
		return "ENGATIVA";
	}
	if(entrada == "11" || entrada == 11){
		return "SUBA";
	}
	if(entrada == "12" || entrada == 12){
		return "BARRIOS UNIDOS";
	}
	if(entrada == "13" || entrada == 13){
		return "TEUSAQUILLO";
	}
	if(entrada == "14" || entrada == 14){
		return "LOS MÁRTIRES";
	}
	if(entrada == "15" || entrada == 15){
		return "ANTONIO NARIÑO";
	}
	if(entrada == "16" || entrada == 16){
		return "PUENTE ARANDA";
	}
	if(entrada == "17" || entrada == 17){
		return "CANDELARIA";
	}
	if(entrada == "18" || entrada == 18){
		return "RAFAEL URIBE";
	}
	if(entrada == "19" || entrada == 19){
		return "CIUDAD BOLÍVAR";
	}
	if(entrada == "20" || entrada == 20){
		return "SUMAPÁZ";
	}
	return "";
}

/* Inicio de Sicole */

function ocultarPaneles(){
	$("#infocolepar").hide();
	$("#barramenu").hide();
	//$("#barrafiltro").hide();
	$("#busqueda").hide();    
}

function mostrarPaneles(){
	$("#menuDesplegableDer").show(anima);
	$("#barramenu").hide();
	$("#menuDesplegableIzq").show(anima);
	//$("#barrafiltro").hide();
	$("#ventanaMiniAyuda").hide(anima);
    $("#ventanaCategoriasIzq").hide(anima);
    
	if(plegarMenus == 1){
	
	}else{
		$("#ventanaCategoriasDer").hide(anima);
		$("#botonPlegar2").hide();
		$("#infocolepar").hide();
	}
	
	if(plegarMenus ==2){
	
	}else{
		$("#ventanaCategoriasIzq").hide(anima); 
		$("#contenedorZoom").css("margin-left", "1%");
		$("#numeroSedesFiltro").css("margin-left", "1%");
		$("#comparacionMapas").animate({
				marginLeft: "1%"
		}, 30)
		$("#botonPlegar").hide();
	}
}


	
$(document).ready(function () {
    $(".botonPlegar").hide();
    $("#activarIso").prop("checked", false);
	$("#movilesFormulario :input").prop( "checked", false );
   // radioini = $("#filtroDistanciaR").val();
	radioini = 50000;
	$(".derechosEncuestas").text("*Basada en Ávila Martínez, A.F., Broomberg Zilberstein, P., Pérez Salazar Estupiñan, B. Villamil Peñaranda, M.E., Velásquez Lasprilla, A., & Ortiz Fernánfez, M.J. (2015). Clima escolar y victimización en Bogotá 2013: encuesta de convivencia escolar.")
	var valor = $("#minutos").val();
	$("#sliderisocronas p").text(valor+ " Minutos");
	
	var anch = $(window).width();
	var altu = $(window).height() - $("#barrasuperior").height() - $("#barrainferior").height();
	//var direc;
	var inicio, fin;
	if(anch <= 700){ 
        ocultarPaneles();
		$("#infocolepar").css("top", (altu - 50) + "px"); //"90%"
		//$("#infocolepar").css("height", (altu) + "px"); 
		$("#infocolepardist").css("height", (altu) + "px"); 
		$("#menuInicial").css("height", (altu - 67) + "px"); 
		isMobile = true;		
			
        $("#infocolecerca").css("top", (altu - 145) + "px"); //"90%"	
	}
	else{
		$("#infocolepar").css("top", "0px"); 
		isMobile = false;
        $("#infocolecerca").css("top","0"); //"90%"
        
        
	}
	
	
/*	
	$( "#infocolepar" ).mouseover(function() {
		map.setOptions({draggable: false});	
	});
	$( "#infocolepar" ).mouseout(function() {
		map.setOptions({draggable: true});			
	});
*/	
	$("#infocolepardist").css("height", (altu) + "px"); 
	$("#menuInicial").css("height", (altu - 67) + "px"); 
	$("#infraestructuraVentana").css("height", ($(window).height() - $("#encabezadoInstitucion").height() - 66- $("#barrainferior").height()) + "px"); 
	$("#convivenciaEscolar").css("height", ($(window).height() - $("#encabezadoInstitucion").height() - 66 -$("#barrainferior").height()) + "px");
	$("#asistenciaDocente").css("height", ($(window).height() - $("#encabezadoInstitucion").height() - 66 -$("#barrainferior").height()) + "px");
	$("#transporteFormulario").css("height", ($(window).height() - $("#encabezadoInstitucion").height() - 66 - $("#barrainferior").height()) + "px");
	
	
	$("#infocolecab").click(function(){		
		var altu = $(window).height() - $("#barrasuperior").height() - $("#barrainferior").height(); 
		if($("#infocolepar").css("top") == "0px"){
			$("#infocolepar").css("top", (altu - 50) + "px");
		}
		else{
			$("#infocolepar").css("top","0px");
		}
	});
	

	
	
	
	
	$("#RegresarButton").click(function (event) {
		$("#infocolepar").hide();
		$("#barramenu").hide();
		$("#barrafiltro").hide();
		$("#abajobotones").show();
		$("#botonmapas").show();
		$("#botonmostrar").show();
	});
	
	$("#botonmostrar").click(function (event) {
          if($(window).width()>700){
            estadoini = 1;     
          }
          
		$("#infocolepar").show();
		$("#barramenu").hide();
		$("#abajobotones").hide();
		$("#botonmapas").hide();
	});	
	
	$("#botongps").click(function (event) {
		map.setCenter(centroInicial);
		markerini.setPosition(map.getCenter());
		cargarMapa();
	});
	
	
	
	
	
	$("#textoBusquedaAvanzada").click(function (event) {
		isAdvancedSearchVisible=true;
        displaySicoleSearchPanel();
	});

	$("#textoBusquedaAvanzada").keypress(function(e){
		if(e.which==13){
            displaySicoleSearchPanel();
		}
	});

	function displaySicoleSearchPanel(){
		console.log("Entro a busqueda avanzada");
        var focusTypeOfSearch=returnFocusTypeOfSearch();
        focusTypeOfSearch.deactivate();
        //$("#busquedaPopup").hide();
        $("#busqueda").show();
        $("#logoBusqueda").css("background-image","url(imagenes/si_ico.png)")
        $("#ventanaTipoBusqueda").hide(anima);
        $("#busquedaPopup").css("z-index","1100");
        //uriTipoBusqueda = "http://geoportal.dane.gov.co/wssicole/serviciobusqueda.php?palabrasclave=";
        setTimeout(function () {
            var margenIzq = parseFloat($("#ventanaCategoriasIzq").width()) +30;
            $("#contenedorZoom").animate({
                marginLeft: margenIzq
            }, 200)
            $("#comparacionMapas").animate({
                marginLeft: margenIzq
            }, 200)
            var margenIzq = $("#ventanaCategoriasIzq").width();
            var margender = $("#infoColeEsp").width();
            var ancho = $("body").width()-margenIzq-margender;
            $("#graficaFuncion").width(ancho);
            $("#graficaFuncion").css("margin-left", margenIzq);
            $("#advancedOptionsSearch").focus();
            var focusTrapSicoleSearchPanel=returnFocusTrapSicoleSearchPanel();
            focusTrapSicoleSearchPanel.activate();
        }, 510)
	}
    
    $("#menuHamburguesa").click(function(){
		onClickHamburgMenu();
    }); 
	
	$("#regresar").click(function (event) {
		mostrarPaneles();
	});
	
	$("#buttonaceptar").click(function (event) {
        $("#preaload").show();
		nombreTitulo = "Resultados filtros";
		lugaresCercanos();
        map.setCenter(markerini.getPosition());
        mostrarPaneles();
		$("#infoColeEsp").hide(anima);
		$("#ventanaCategoriasDer").show(anima);
	});	
    
	$("#reporteCompleto").click(function (event) {
        hasPressedFilter=true;
		var leftPanelTrapFocus = returnFocusTrapLeftPanelMenu();
        leftPanelTrapFocus.deactivate();
        hasPressedFilter=false;
        $("#preaload").show();
        filtroAbierto = true;
        enFiltro = true;
		nombreTitulo = "Resultados filtro";
		$("#contenedorColegiosCercanos").html("");
                
                lugaresCercanos();
        
        
        map.setCenter(markerini.getPosition());
		$("#infoColeEsp").hide(anima);
		$("#mostrarResultados").hide(anima);
		filtroAbierto = true;
		$("#ventanaCategoriasDer").show();
		$("#barraSesion").hide();
		$("#functionOpen").show();
		conInfocolegio();
       $("#contenedorColegiosCercanos").focus();
        
	});

    $("#descargarReporte").click(function (){
		openDownloadReportMessage();
    })

    $("#descargarReporte").keypress(function (e){
		if(e.which==13){
            openDownloadReportMessage();
        }
    });

	function openDownloadReportMessage(){
		hasPressedDownloadReport=true;
		var focusTrapLeftPanelMenu=returnFocusTrapLeftPanelMenu();
        focusTrapLeftPanelMenu.pause();
        mensaje("", "Funcionalidad no disponible. Se está trabajando para descargar los reportes de los filtros");
        createFocusTrapLogInDialog();
        var focusTrapLogInDialog=returnFocusTrapLogInDialog();
        focusTrapLogInDialog.activate();
	}

    $("#reporteCompleto").keypress(function (event) {
    	if(event.which==13){
            hasPressedFilter=true;
            var leftPanelTrapFocus = returnFocusTrapLeftPanelMenu();
            leftPanelTrapFocus.deactivate();
            hasPressedFilter=false;
            $("#preaload").show();
            filtroAbierto = true;
            enFiltro = true;
            nombreTitulo = "Resultados filtro";
            $("#contenedorColegiosCercanos").html("");

            lugaresCercanos();


            map.setCenter(markerini.getPosition());
            $("#infoColeEsp").hide(anima);
            $("#mostrarResultados").hide(anima);
            filtroAbierto = true;
            $("#ventanaCategoriasDer").show();
            $("#barraSesion").hide();
            $("#functionOpen").show();
            conInfocolegio();
            $("#contenedorColegiosCercanos").focus();
		}
    });
	
	$('#buscar').click(function(){
		if($("#codigo").val()==undefined || $("#codigo").val()==null || $("#codigo").val()==""){
            mensaje("¡Error!","Por favor ingresa un código de sede");
		}else{
            isSearchingUsingSicoleType=true;
            busquedaavanzada();
            $("#funcionalidadActual p").text("Busqueda Avanzada");
            $("#functionOpen").show(anima);
            $("#preaload").show();
            setTimeout(function () {
                conInfocolegio();
                var focusTrapSicoleSearchPanel=returnFocusTrapSicoleSearchPanel();
                focusTrapSicoleSearchPanel.deactivate();
            },502);
            setTimeout(function (){
                var margenDerecha = parseFloat($("#ventanaCategoriasDer").width()) - 20;
                $("#botonPlegar2").css({
                    "left": "inherit",
                    "right": margenDerecha
                })
                $("#botonPlegar2").show();
            },1000)
            $("#busquedaPopup").css("z-index","100");
            $("#contenedorZoom").css("margin", "8% 0 0 1%");
		}
	});
	
	$('#limpiar').click(function(){
		$("#clave").val("")
		$("#codigo").val("")
		$('#Publico').attr('checked', true);
		$('#Privado').attr('checked', true);
		$('#localidad').val(0);
		$('#barrio').val("")
		$('#Masculino').attr('checked', true);
		$('#Femenino').attr('checked', true);
		$('#Mixto').attr('checked', true);
		cerrarbusqueda();
		var margenIzq = parseFloat($("#ventanaCategoriasIzq").width()) +30;
			$("#contenedorZoom").animate({
				marginLeft: margenIzq
			}, 200)
	});
	$("#iconosSatelite").click(function(){
        
        if(satelite == false){
            $(this).css("background-image", "url(imagenes/mapa.png)");
            map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
            satelite = true;
        }else{
            $(this).css("background-image", "url(imagenes/satelite.png)");
            map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
            satelite = false;
        }
        
    })
	
	/*
	$(".cambiarMapaMenu").click(onclick, function (){
		$(".cambiarMapaMenu").removeClass("activoMapa");
		$(this).addClass("activoMapa");
	})
	$("#fijarMapa").click(onclick, function (){
		map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
	})
	$("#fijarSatelite").click(onclick, function (){
		map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
	})
	$("#fijarOSM").click(onclick, function (){
		var mapTypeIds = [];
            for(var type in google.maps.MapTypeId) {
                mapTypeIds.push(google.maps.MapTypeId[type]);
            }
            mapTypeIds.push("OSM");
			map.setMapTypeId("OSM");
               //mapTypeControlOptions: {
                 //   mapTypeIds: mapTypeIds
 
            map.mapTypes.set("OSM", new google.maps.ImageMapType({
                getTileUrl: function(coord, zoom) {
                    // See above example if you need smooth wrapping at 180th meridian
                    return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
                },
                tileSize: new google.maps.Size(256, 256),
                name: "OpenStreetMap",
                maxZoom: 18
            }));
	
	})*/

	
	$("#cambiartrafico").click(function (event) {
		if($("#textontrafico").html() == "Ocultar Tráfico"){
			trafficLayerMapType.setMap(null);
			if($("#textonmapa").html() == "Mapa por Defecto"){
				map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
			}
			$("#imagentrafico").attr("src","imagenes/satelital.png")
			$("#textontrafico").html("Mostrar Tráfico")
		}
		else{
			if($("#textontrafico").html() == "Mostrar Tráfico"){
				trafficLayerMapType.setMap(map);
				map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
				$("#imagentrafico").attr("src","imagenes/normal.png")
				$("#textontrafico").html("Ocultar Tráfico")
			}
		}
	});
    
    
	function salirIsocrona(){
		//mostrarPaneles();		
		zoomInicial = 16;
		MapOperative.init();
		map = MapOperative.loadMap('map_canvas');
		maps.push(map);
		initializeMap2();
        activar = false;
	}
	
	$("#botondist").click(function (event) {
		$("#bocadillo").hide();
		$("#desde_distancia").val("");
		$("#hasta_distancia").val("");	

		if($("#transporte").css("display") == "none"){

            if($("#divPanorama").css("display")== "block"){
				cerrarPanorama();
			}
			
			conInfocolegio();	
			markerOrigen.setPosition(map.getCenter());
			markerDestino.setPosition(map.getCenter());
			markerOrigen.setMap(null);
			markerDestino.setMap(null);
			estadoOrigen =1;
			estadoDestino = 0;
			setGeocode(map.getCenter());
			modoRecorrido = "";
			$("#WALKING").css("background-image", "url(imagenes/camina1.png)");
			$("#DRIVING").css("background-image", "url(imagenes/carro1.png)");
			$("#TRANSIT").css("background-image","url(imagenes/bus1.png)");
			setTimeout(function () {
				estadoDestino = 1;
				estadoOrigen = 0;
				setGeocode(map.getCenter());
            },100);
			
			$("#transporte").show(anima);
			if($("#barraCercaAtuSede").css("display")=="block"||$("#seleccioneSede").css("display")=="block"){
					cerrarCercaTuSede()
			}else if($("#barrafiltro").css("display") == "block"){
				cerrarFiltro()
			}else if($("#barraMapa").css("display") == "block"){
				cerrarSiMapas()
			}
			$("#despliegueTransporte").css("background-image","url(imagenes/trianguloVerde2.png)");
			$("#hombrecito").hide(anima);
			$("#funcionalidadActual p").text("Transporte");
			$("#functionOpen").show(anima);
		}else{
			salirTransporte();
		}

    });
    
    function salirTransporte() {
        cerrarAyudaMicro();
        $("#despliegueTransporte").css("background-image","url(imagenes/trianguloVerde.png)");
        $("#infocoledistancia").hide();
        enCalcularSitios = false;
        renderer.setMap(null);
        $("#desde_distancia").val("");
        $("#hasta_distancia").val("");
        $("#infocoledistancia").empty();
        markerOrigen.setMap(null);
        markerDestino.setMap(null);
        setGeoBuscadores();
        setMiUbicacion();
        $("#transporte").hide(anima);
        $("#botonPreguntaTransp").css("margin-top", "0");
        $("#functionOpen").hide(anima);
    }
	$("#botonmapas").click(onclick, function (){
        if($(this).css("opacity")==1){ 
		if($("#barraMapa").css("display") == "none"){
			if($("#divPanorama").css("display")== "block"){
				cerrarPanorama();
			}
			conInfocolegio();
			if($("#transporte").css("display") == "block"){
				salirTransporte()
			}else if($("#barraCercaAtuSede").css("display")=="block"||$("#seleccioneSede").css("display")=="block"){
				cerrarCercaTuSede();
			}else if($("#barrafiltro").css("display") == "block"){
				cerrarFiltro()
			}
			$("#hombrecito").hide(anima);
			idCalor = "";
			$("#barraMapa").show(anima);
			$("#barraMapa li").css("color","#01B4ED");
			$("#barraMapa li").children().addClass("colorLiMapa");
			$(".boton2SiMapa").removeClass("gradiente4");
			$(".boton2SiMapa").addClass("gradiente3");
			$("#contenedorVariablesSiMapa").hide();
			$("#despliegueMapas").css("background-image","url(imagenes/trianguloVerde2.png)");
			variableSiMapa = "";
			$("#funcionalidadActual p").text("Sí- mapa");
			$("#functionOpen").show(anima);
			
		}else{
			cerrarSiMapas();
		}
        }
         else{
             $("#bocadillo").css("left", $("#ventanaCategoriasIzq").width() + 20).show();
             var  top = document.getElementById('botonmapas').offsetTop;
             top = top+10;
             $("#bocadillo").css("top",top);
         }
	})
	
	
$("#cerrarFuncionalidad").click(function (){
	if(enFiltro == true|| $("#barrafiltro").css("display") == "block"){
		cerrarFiltro();
    }else if($("#transporte").css("display") == "block"){
            salirTransporte();
        }else if($("#barraCercaAtuSede").css("display")=="block"||$("#seleccioneSede").css("display")=="block"){
            cerrarCercaTuSede();
        }else if($("#barraMapa").css("display") == "block"){
            cerrarSiMapas();
        }else if(busquedaAvanza == true){
            cerrarbusqueda();
        }
   
	
});
	function cerrarbusqueda(){
		$("#funcionalidadActual p").text("Sedes Cercanas");
		$("#functionOpen").hide(anima);
		$("#preaload").show();
		busquedaAvanza = false;
		cargarMapa();
	}
	
	function cerrarSiMapas(){
        cerrarAyudaMicro()    
	   if($("#circleCluster2").css("fill") != "rgb(182, 19, 78)"){
           $("#circleCluster2").css("fill","rgb(182, 19, 78)");
           cargarMapa();
	   }
        
		$("#hombrecito").show(anima);
		$("#ocultarClusters").hide();
        if($("#iniciarComparacion").hasClass("comparacionGradiante2")){
			cargarMapa();
			$("#contenedorParalelos").hide(anima);
		}
		$("#funcionalidadActual").css("top", "8%");
		$("#cerrarFuncionalidad").css("top", "8%");
		$("#functionOpen").hide(anima);
		
		$("#barraCalor1").hide(anima);
		$(".indicadoresSector").hide(anima);
		$("#barraMapa").hide(anima);
		$("#despliegueMapas").css("background-image","url(imagenes/trianguloVerde.png)");
		$("#etiquetaMapa").hide(anima);
		$("#explicacionMapa").hide(anima);
		$("#desplegadaExplicacion").hide(anima);
		$("#comparacionMapas").hide(anima);
		$("#graficaFuncion").hide(anima);
		$("#botoneraSiMapa").show(anima);
		$("#sidebar").hide(anima);
		if(idCalor!=""){
			map.overlayMapTypes.setAt("0", null);
			idCalor = "";
			
			if($("#iniciarComparacion").hasClass("comparacionGradiante2")){
				$("#iniciarComparacion").removeClass("comparacionGradiante2");
				$("#iniciarComparacion").addClass("comparacionGradiante1");
				$("#iniciarComparacion p").css("color", "#333");
				$(".cambiarComparacionMapas").removeClass("comparacionGradiante1");
				$(".cambiarComparacionMapas").removeClass("comparacionGradiante2");
				$(".cambiarComparacionMapas").css("color","#333");
				$("#botoneraSiMapa").show(anima);
			}
			if(map_izquierdo){
				map_izquierdo.overlayMapTypes.setAt("0", null);
			}
		}
		 
		
	}
    
    
  
	
	$("#botonfiltro").click(function (event) {
	$("#bocadillo").hide();
        $("#activarDistancia").prop( "checked", false );    
		if($("#barrafiltro").css("display") == "none"){
			if($("#divPanorama").css("display")== "block"){
				cerrarPanorama();
			}
			
            enFiltro = false; 
            if($("#transporte").css("display") == "block"){
				salirTransporte();
			}else if($("#barraCercaAtuSede").css("display")=="block"||$("#seleccioneSede").css("display")=="block"){
				cerrarCercaTuSede();
			}else if($("#barraMapa").css("display") == "block"){
				cerrarSiMapas();
			}
			
            $("#funcionalidadActual p").text("Filtros");
			conInfocolegio();
			$("#functionOpen").show(anima);
			$("#hombrecito").hide(anima);
			$("#barrafiltro").show(anima);
			$("#despliegueFiltro").css("background-image","url(imagenes/trianguloVerde2.png)");
			}else{
			cerrarFiltro()
		}
	});

	
	function cerrarFiltro(){
        cerrarAyudaMicro()
		posicionMover = markerini.getPosition();
		dejarPosicion = true;
         $("#barrafiltro").hide(anima);
        $("#despliegueFiltro").css("background-image","url(imagenes/trianguloVerde.png)");	
        $("#numeroSedesFiltro").css("display","none");
        $("#mostrarResultados").css("display","none");
        $("#ventanaCategoriasDer").css("display", "none");
        $("#hombrecito").show(500);
        $("#functionOpen").hide(anima);
        
		if(enFiltro == true){
            enFiltro = false;
            reiniciarFiltros();
            radioini = 50000;
            filtroAbierto = false;
            salirIsocrona();
        }
	}
	
	$("#botonradar").click(function (event) {
	$("#bocadillo").hide();
        var margenIzq = $("#ventanaCategoriasIzq").width();
		setTimeout(function(){
          $("#ocultarClusters").css("left", margenIzq).show(anima);  
        },100);
        
        
		if($("#barraCercaAtuSede").css("display")=="none"&&$("#seleccioneSede").css("display")=="none"){
			if($("#transporte").css("display") == "block"){
				salirTransporte()
			}else if($("#barraMapa").css("display") == "block"){
				cerrarSiMapas()
			}else if($("#barrafiltro").css("display") == "block"){
				cerrarFiltro()
			}
			
			if($("#divPanorama").css("display")== "block"){
				cerrarPanorama();
			}
			$("#hombrecito").hide(anima);
			
			$("#despliegueCerca").css("background-image","url(imagenes/trianguloVerde2.png)");
			cercaHabilitado = true;
			if(posicionSedeActual != ""){
               // confirmarIsocrona(posicionSedeActual);
                sitiosCerca(posicionSedeActual);
				$("#barraCercaAtuSede").show(anima);
				$("#seleccioneSede").hide();
			}else{
				$("#barraCercaAtuSede").hide();
				$("#seleccioneSede").show(anima);
			}
			$("#funcionalidadActual p").text("Cerca a tu sede");
			$("#functionOpen").show(anima);
			conInfocolegio();
			
		}else{
			cerrarCercaTuSede();
		}
			
	});
	
	function cerrarCercaTuSede() {
        salirIsocrona();
		$("#ocultarClusters").hide();
		dejarPosicion = true;
		posicionMover = markerini.getPosition();		
        $("#ocultarClusters").hide();
		$("#circleCluster2").css("fill","rgb(182, 19, 78)");
	    $("#hombrecito").show(anima);
		$("#barraCercaAtuSede").hide(anima);
		$("#seleccioneSede").hide();
		$("#despliegueCerca").css("background-image","url(imagenes/trianguloVerde.png)");
		cercaHabilitado = false;
        
		if(circulo != null){
			circulo.setMap(null);
		}
		for (var i = 0; i < markersSitios.length; i++){
			markersSitios[i].setMap(null);
		}
		markersSitios = [];
		$("#functionOpen").hide(anima);
	}
	

     

	
   
});

$( window ).resize(function () {
	var anch = $(window).width();
	$("#map_canvas_izquierdo").width(anch);
	$("#map_canvas_izquierdo").css("top","59px");
	var altu = $(window).height() - $("#barrasuperior").height() - $("#barrainferior").height();
    $("#convivenciaEscolar").css("height", ($(window).height() - 66 - $("#encabezadoInstitucion").height() - $("#barrainferior").height()) + "px");
	$("#asistenciaDocente").css("height", ($(window).height() - 66 - $("#encabezadoInstitucion").height() - $("#barrainferior").height()) + "px");
	$("#transporteFormulario").css("height", ($(window).height() - 66 - $("#encabezadoInstitucion").height() - $("#barrainferior").height()) + "px");
	
	 estilosParteInferior();
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
	
	if($("#infoColeEsp").css("display") == "block"){
		cargarinfo(CodsedeActiva, "0");
	}
		
   
	ubicarIndicador($("#filtroDistanciaR"));
	
		if(anch <= 700){ 
		$("#menuInicial").css("height", (altu - 67) + "px"); 
		$("#infocolepardist").css("height", (altu) + "px"); 	    
		isMobile = true;				
         $("#infocolecerca").css("top", (altu - 145) + "px"); //"90%"    
        if($("#busquedaPopup").css("display")=="block"||$("#infocolepar").css("display")=="block"||$("#barramenu").css("display")=="block"||$("#barrafiltro").css("display")=="block"){
            
        }
        else{
            
            //ocultarPaneles();
        }    
	}
	else{
		$("#infocolepar").css("top", "0px"); //"90%"
		isMobile = false;
		$("#infocolepardist").css("height", (altu) + "px"); 
		$("#menuInicial").css("height", (altu - 67) + "px"); 
        $("#infocolecerca").css("top","0"); //"90%" 
        
        
        if($("#busquedaPopup").css("display")=="block"||$("#infocolepar").css("display")=="block"||$("#barramenu").css("display")=="block"||$("#barrafiltro").css("display")=="block"){
            
        }
        else{
            
            mostrarPaneles();
        }
	}
});

/* Funcion de ordenamiento */

function sortNumber(a,b) {
    return a - b;
}


/* Funcion imagen generica */

function cargarimggene(image){
    image.onerror = "";
    image.src = "imagenes/generica.jpg";
    return true;
}



/* Funcion Zoom */

var zoomFluid, zoomCoords;   //shared variables

function zoomTo(){
    zoomFluid = map.getZoom();            //Updates shared zoom var;
    map.panTo(centroInicial);  
    if(zoomFluid >= 15) {
		setTimeout(function(){
			$("#infocolepar").hide();
			$("#busquedaPopup").show();
			$("#barrabotones").show();
			$("#botonmapas").show();
			$("#botonmostrar").show();
			$("#sicoleimagen").fadeOut( "slow" );
			$("#daneimagen").fadeOut( "slow" );
            $("#cabezote").show(anima);
			$("#tips").animate({opacity: 1},1000);
	            $("#busquedaPopup").show(anima);
            $(".menusDesplegables").show(anima);
            $("#logoTips").focus();
            showLanding();
            var focusTrapTipsPopUp=returnFocusTrapTipsPopUp();
            focusTrapTipsPopUp.activate();
			if($(window).height>700){
                mostrarPaneles();
            }
		}, 500);
		return 0;
	}
    else {
         zoomFluid = zoomFluid + 3;
         map.setZoom(zoomFluid);
         setTimeout("zoomTo()", 250);
    }
}




function MasControl(controlDiv, map) {

	// Set CSS for the control border.
	var controlUI = document.createElement('div');
	controlUI.id = 'SumaMap';
	controlUI.style.backgroundColor = '#fff';
	controlUI.style.border = '2px solid #fff';
	controlUI.style.borderRadius = '3px';
	controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
	controlUI.style.cursor = 'pointer';
	controlUI.style.marginBottom = '22px';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Click to Zoom in map';
	controlDiv.appendChild(controlUI);

	// Set CSS for the control interior.
	var controlText = document.createElement('div');
	controlText.style.color = 'rgb(25,25,25)';
	controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
	controlText.style.fontSize = '16px';
	controlText.style.lineHeight = '38px';
	controlText.style.paddingLeft = '5px';
	controlText.style.paddingRight = '5px';
	controlText.innerHTML = '+';
	controlUI.appendChild(controlText);

	// Setup the click event listeners: simply set the map to Chicago.
	controlUI.addEventListener('click', function() {
		map.setZoom((map.getZoom()+1));
	});
}


function MenosControl(controlDiv, map) {

	// Set CSS for the control border.
	var controlUI = document.createElement('div');
	controlUI.id = 'MenosMap';
	controlUI.style.backgroundColor = '#fff';
	controlUI.style.border = '2px solid #fff';
	controlUI.style.borderRadius = '3px';
	controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
	controlUI.style.cursor = 'pointer';
	controlUI.style.marginBottom = '22px';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Click to Zoom out map';
	controlDiv.appendChild(controlUI);

	// Set CSS for the control interior.
	var controlText = document.createElement('div');
	controlText.style.color = 'rgb(25,25,25)';
	controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
	controlText.style.fontSize = '16px';
	controlText.style.lineHeight = '38px';
	controlText.style.paddingLeft = '5px';
	controlText.style.paddingRight = '5px';
	controlText.innerHTML = '-';
	controlUI.appendChild(controlText);

	// Setup the click event listeners: simply set the map to Chicago.
	controlUI.addEventListener('click', function() {
		map.setZoom((map.getZoom()-1));
	});
}

function SliderControl(controlDiv, map) {

	// Set CSS for the control border.
	var controlUI = document.createElement('div');
	controlUI.id = 'sliderzoom';
	controlUI.style.backgroundColor = '#fff';
	controlUI.style.border = '2px solid #fff';
	controlUI.style.borderRadius = '3px';
	controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
	controlUI.style.cursor = 'pointer';
	controlUI.style.marginBottom = '22px';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Click to Zoom out map';
	controlDiv.appendChild(controlUI);


	// Setup the click event listeners: simply set the map to Chicago.
	controlUI.addEventListener('click', function() {
		map.setZoom((map.getZoom()-1));
	});
}

function centrar(){   
		/*if (markerLatLngIni != null) {
			centroInicial = markerLatLngIni;		
		}*/
		map.setCenter(centroInicial);
}

function obtnerjornadasalumnos(data){
		
	jorna = [];
	prima = [];
	prees = [];
	secun = [];
	media = [];
	total = [];
	
	jorna = data[0]["JORNADA"].split(",");
	prees = data[0]["PREESCOLAR"].split(",");
	prima = data[0]["PRIMARIA"].split(",");
	secun = data[0]["SECUNDARIA"].split(",");
	media = data[0]["MEDIA"].split(",");
	total = data[0]["TOTAL_MATRICULADOS"].split(",");
	
	
	for(i=0; i < jorna.length; i++){
		jorna[i] = obtenerjornada(jorna[i]);
		prees[i] = parseFloat(prees[i]);
		prima[i] = parseFloat(prima[i]);
		secun[i] = parseFloat(secun[i]);
		media[i] = parseFloat(media[i]);
		total[i] = parseFloat(total[i]);
	}
}



function promediodoc(insumo){
	var asd = 0;
	for(j = 0; j < insumo.length; j++){
		asd +=  parseFloat(insumo[j]["TOTAL_DOCENTES"]);
	}
	return asd;
}

function promedioporce(insumo){
	var asd = 0;
	for(j = 0; j < insumo.length; j++){
		asd +=  parseFloat(insumo[j]["PORCENTAJE_DOCENTES_POSTGRADO"].replace(",",".")*100);
	}
	if(asd/insumo.length != 0){
		return (asd/insumo.length) + "%";
	}
	else{
		return "0%";
	}
}

function promedionum(insumo){
	var asd = 0;
	for(j = 0; j < insumo.length; j++){
		asd +=  parseFloat(insumo[j]["NUMERO_ESTUDIANTES_DOCENTE"]);
	}
	return Math.round(asd/insumo.length);
}

function convertirtasa(entrada){
	if(entrada != "NO APLICA"){
		asd = entrada.replace(",",".");
		if(parseFloat(Math.round(asd * 100) / 100)*100 != 0){
			return (parseFloat(Math.round(asd * 100) / 100)*100).toFixed(2) + "%";
		}
		else{
			return "0%";
		}		
	}
	else{
		return entrada;
	}
}

function obtenerjornada(entrada){
	if(entrada == "1"){
		return "COMPLETA";
	}
	if(entrada == "2"){
		return "MAÑANA";
	}
	if(entrada == "3"){
		return "TARDE";
	}
	if(entrada == "4"){
		return "NOCTURNA";
	}
	if(entrada == "5"){
		return "FIN DE SEMANA";
	}
}

function invertirjornada(entrada){
	if(entrada == "COMPLETA"){
		return "1";
	}
	if(entrada == "MAÑANA"){
		return "2";
	}
	if(entrada == "TARDE"){
		return "3";
	}
	if(entrada == "NOCTURNA"){
		return "4";
	}
	if(entrada == "FIN DE SEMANA"){
		return "5";
	}
}

function obtenergenero(entrada){
	if(entrada == "1"){
		return "NO INFORMA";
	}
	if(entrada == "2"){
		return "HOMBRES";
	}
	if(entrada == "3"){
		return "MUJERES";
	}
	if(entrada == "4"){
		return "MIXTO";
	}	
	return entrada;
}

function obtenersector(entrada){
	if(entrada == "1"){
		return "OFICIAL";
	}
	if(entrada == "2"){
		return "NO OFICIAL";
	}
	return entrada;
}



function activarrectificacion(){	
	var eles = document.getElementById('manana');
	eles.onclick = null;
	$("#manana center img").attr("src","imagenes/mananad.png");
	var eles = document.getElementById('tarde');
	eles.onclick = null;
	$("#tarde center img").attr("src","imagenes/tarded.png");
	var eles = document.getElementById('noche');
	eles.onclick = null;
	$("#noche center img").attr("src","imagenes/noched.png");
	var eles = document.getElementById('sab-fes');
	eles.onclick = null;
	$("#sab-fes center img").attr("src","imagenes/sab-fesd.png");
	var eles = document.getElementById('completa');
	eles.onclick = null;
	$("#completa center img").attr("src","imagenes/completad.png");
	
	for(i=0; i < jorna.length; i++){
		if(jorna[i] == "MAÑANA"){
			var eles = document.getElementById('manana');
			eles.onclick = cargarmanana;
			$("#manana center img").attr("src","imagenes/manana.png");
		}
		if(jorna[i] == "TARDE"){
			var eles = document.getElementById('tarde');
			eles.onclick = cargartarde;
			$("#tarde center img").attr("src","imagenes/tarde.png");
		}
		if(jorna[i] == "NOCTURNA"){
			var eles = document.getElementById('noche');
			eles.onclick = cargarnoche;
			$("#noche center img").attr("src","imagenes/noche.png");
		}
		if(jorna[i] == "FIN DE SEMANA"){
			var eles = document.getElementById('sab-fes');
			eles.onclick = cargarsabados;
			$("#sab-fes center img").attr("src","imagenes/sab-fes.png");
		}
		if(jorna[i] == "COMPLETA"){
			var eles = document.getElementById('completa');
			eles.onclick = cargarcompleta;
			$("#completa center img").attr("src","imagenes/completa.png");
		}
	}
	
	
	var eles = document.getElementById('mananaefi');
	eles.onclick = null;
	$("#mananaefi center img").attr("src","imagenes/mananad.png");
	var eles = document.getElementById('tardeefi');
	eles.onclick = null;
	$("#tardeefi center img").attr("src","imagenes/tarded.png");
	var eles = document.getElementById('nocheefi');
	eles.onclick = null;
	$("#nocheefi center img").attr("src","imagenes/noched.png");
	var eles = document.getElementById('sab-fesefi');
	eles.onclick = null;
	$("#sab-fesefi center img").attr("src","imagenes/sab-fesd.png");
	var eles = document.getElementById('completaefi');
	eles.onclick = null;
	$("#completaefi center img").attr("src","imagenes/completad.png");
	
	for(i=0; i < jorna.length; i++){
		if(jorna[i] == "MAÑANA"){
			var eles = document.getElementById('mananaefi');
			eles.onclick = cargarmanana3;
			$("#mananaefi center img").attr("src","imagenes/manana.png");
		}
		if(jorna[i] == "TARDE"){
			var eles = document.getElementById('tardeefi');
			eles.onclick = cargartarde3;
			$("#tardeefi center img").attr("src","imagenes/tarde.png");
		}
		if(jorna[i] == "NOCTURNA"){
			var eles = document.getElementById('nocheefi');
			eles.onclick = cargarnoche3;
			$("#nocheefi center img").attr("src","imagenes/noche.png");
		}
		if(jorna[i] == "FIN DE SEMANA"){
			var eles = document.getElementById('sab-fesefi');
			eles.onclick = cargarsabados3;
			$("#sab-fesefi center img").attr("src","imagenes/sab-fes.png");
		}
		if(jorna[i] == "COMPLETA"){
			var eles = document.getElementById('completaefi');
			eles.onclick = cargarcompleta3;
			$("#completaefi center img").attr("src","imagenes/completa.png");
		}
	}
	
	
	var eles = document.getElementById('manana4');
	eles.onclick = null;
	$("#manana4 center img").attr("src","imagenes/mananad.png");
	var eles = document.getElementById('tarde4');
	eles.onclick = null;
	$("#tarde4 center img").attr("src","imagenes/tarded.png");
	var eles = document.getElementById('noche4');
	eles.onclick = null;
	$("#noche4 center img").attr("src","imagenes/noched.png");
	var eles = document.getElementById('sab-fes4');
	eles.onclick = null;
	$("#sab-fes4 center img").attr("src","imagenes/sab-fesd.png");
	var eles = document.getElementById('completa4');
	eles.onclick = null;
	$("#completa4 center img").attr("src","imagenes/completad.png");
	
	for(i=0; i < jorna.length; i++){
		if(jorna[i] == "MAÑANA"){
			var eles = document.getElementById('manana4');
			eles.onclick = cargarmanana4;
			$("#manana4 center img").attr("src","imagenes/manana.png");
		}
		if(jorna[i] == "TARDE"){
			var eles = document.getElementById('tarde4');
			eles.onclick = cargartarde4;
			$("#tarde4 center img").attr("src","imagenes/tarde.png");
		}
		if(jorna[i] == "NOCTURNA"){
			var eles = document.getElementById('noche4');
			eles.onclick = cargarnoche4;
			$("#noche4 center img").attr("src","imagenes/noche.png");
		}
		if(jorna[i] == "FIN DE SEMANA"){
			var eles = document.getElementById('sab-fes4');
			eles.onclick = cargarsabados4;
			$("#sab-fes4 center img").attr("src","imagenes/sab-fes.png");
		}
		if(jorna[i] == "COMPLETA"){
			var eles = document.getElementById('completa4');
			eles.onclick = cargarcompleta4;
			$("#completa4 center img").attr("src","imagenes/completa.png");
		}
	}	
	
}

function traernivelpree(entrada){
	var numjor = 0;
	for(i=0; i < jorna.length; i++){
		if (jorna[i] == entrada){
			numjor = i;
		}
	}
	if(prees[numjor] != 0){
		return "<pre style='padding-left: 10px;'>PREESCOLAR</pre>";
	}	
	else{
		return "";
	}
}

function traernivelpri(entrada){
	var numjor = 0;
	for(i=0; i < jorna.length; i++){
		if (jorna[i] == entrada){
			numjor = i;
		}
	}
	if(prima[numjor] != 0){
		return "<pre style='padding-left: 10px;'>PRIMARIA</pre>";
	}	
	else{
		return "";
	}
}

function traernivelsec(entrada){
	var numjor = 0;
	for(i=0; i < jorna.length; i++){
		if (jorna[i] == entrada){
			numjor = i;
		}
	}
	if(secun[numjor] != 0){
		return "<pre style='padding-left: 10px;'>SECUNDARIA</pre>";
	}	
	else{
		return "";
	}
}

function traernivelmed(entrada){
	var numjor = 0;
	for(i=0; i < jorna.length; i++){
		if (jorna[i] == entrada){
			numjor = i;
		}
	}
	if(media[numjor] != 0){
		return "<pre style='padding-left: 10px;'>MEDIA</pre>";
	}	
	else{
		return "";
	}
}

function traerestudiantes (entrada){
	var numjor = -1;
	for(i=0; i < jorna.length; i++){
		if (jorna[i] == entrada){
			numjor = i;
            return total[numjor];
		}
	}
	return 0;
}

function verificar(entrada){
	if(entrada == null || entrada == "null"){
		return "";
	}else{
		return entrada;
	}
}
/*
function Cargarmarcador(){
	var aux = $("#marcador").attr("class");
	//aux.substring(1,aux.length);
	cargarinfo(aux.substring(1,aux.length));	
}*/

function busquedaavanzada(){
	busquedaAvanza = true;
	var url = "http://geoportal.dane.gov.co/wssicole/serviciobusqueda.php?";
	var codigo = $("#codigo").val();
	var clave = $("#inputBusqueda2").val();
    
    console.log("Calve " + clave);
	if (clave != ""){
		url += "palabrasclave=" + clave.toUpperCase();
	}
	if(codigo != ""){
		url += "&codigosede=" + codigo;
	}
	
	
	if(codigo != ""){
		url += "&codigosede=" + codigo;
	}
	if($('#Publico').is(':checked') && $('#Privado').is(':checked') ){
		url += "&sector=todos";
	}
	else{
		if($('#Publico').is(':checked')){
			url += "&sector=oficial";
		}
		if($('#Privado').is(':checked')){
			url += "&sector=nooficial";
		}
	}
	/*var local = $('#localidad').val();
	if(local != "0"){
		url += "&localidad="+local;
		for(i=0;i<centrolocal.length;i++){
			if(centrolocal[i][0] == local){
				centro = new google.maps.LatLng(centrolocal[i][2], centrolocal[i][1]);
				markerini.setPosition(centro);
				map.setCenter(centro);
				openInfoWindowUbicacionIni2(markerini);
			}
		}
	}
	var barrio = $('#barrio').val();
	if(barrio != ""){
		url += "&barrio="+barrio.toUpperCase();
	}*/	
	if($('#Masculino').is(':checked') && $('#Femenino').is(':checked') && $('#Mixto').is(':checked')){
		url += "&sexo=otros";
	}
	else{
		if($('#Masculino').is(':checked') && $('#Femenino').is(':checked')){
			url += "&sexo=hombresmujeres";
		}
		else{
			if($('#Masculino').is(':checked') && $('#Mixto').is(':checked')){
				url += "&sexo=hombresMIXTO";
			}
			else{
				if($('#Femenino').is(':checked') && $('#Mixto').is(':checked')){
					url += "&sexo=Femenino";
				}
				else{
					if($('#Masculino').is(':checked')){
						url += "&sexo=hombres";
					}
					else{
						if($('#Femenino').is(':checked')){
							url += "&sexo=mujeres";
						}
						else{
							if($('#Mixto').is(':checked')){
								url += "&sexo=MIXTO";
							}
						}
					}
				}
			}
		}
	}
	 

	colegiosfound = [];
	distanfound = [];
	uriBusquedaAvanza = url;
    console.log(uriBusquedaAvanza);
	inicializarSitiosIni();
	d3.json(url, function(error, data) {		
		for (var i = 0; i < data.length; i++) {
			var sitioini = data[i];
			mostrarSitioIni3(sitioini);	  
		}	
		$("#preaload").hide();		
		//crearpreview();
		//crearpreviewdist();	
		$("#busqueda").hide();
		//$("#infocolepar").show();
		if(colegiosfound.length == 0) {
			mensaje("¡Error!","No hay resultados para esta búsqueda. Intente de nuevo");
			$("#busqueda").show(anima);
            createFocusTrapLogInDialog();
            var focusTrapLogInDialog=returnFocusTrapLogInDialog();
            focusTrapLogInDialog.activate();
		} else {
			nombreTitulo = "Resultado Búsqueda";
			ocultarPaneles();
			$("#ventanaTipoBusqueda").hide();
			sitiosCercanos();
			$("#ventanaCategoriasDer").show(anima);

            $("#titleNearSites").focus();
            var focusTrapNearSchoolsPanel=returnFocusTrapNearSchoolsPanel();
            focusTrapNearSchoolsPanel.activate();
		}
	});
}

function traerestudiantesNivel(entrada){
	var total=0;
    for(i=0;i<entrada.length;i++){
        
        total+=entrada[i];
    }
    return total;
}
  $( function() {
    $( "#hombrecito" ).draggable({
		start: function (){
			streetViewLayer.setMap(map);
		},
		stop: function(){
            var offset = $(this).offset();
            var xPos = offset.left + 15;
            var yPos = offset.top + 12;
			streetViewLayer.setMap(null);
            var coordenadas = dePantallaAMapa(xPos,yPos);
			visualizarPanorama(coordenadas);
			
			
			
        }
		 
	});
    $("#graficaFuncion").draggable();  
      
  } );
  
function visualizarPanorama(coordenada){
	panorama.setPosition(coordenada);
	$("#divPanorama").show(anima);
	$("#map_canvas").width("50%");
	google.maps.event.trigger(map, "resize");
	setTimeout(function () {
		map.setStreetView(panorama);
		$("#hombrecito").hide(anima);
		map.panTo(coordenada);
		$("#cerrarStreet").show(anima);
		markerini.setPosition(coordenada)
	},501);
}  

function cerrarPanorama(){
    cerrarAyudaMicro();
	dejarPosicion = true;
	posicionMover =  markerini.getPosition();
	$("#divPanorama").hide(anima);
	$("#map_canvas").width("100%");
	google.maps.event.trigger(map, "resize");
	$("#hombrecito").show(anima).animate({
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	})
	$("#cerrarStreet").hide(anima);
	initializeMap();
}

function dePantallaAMapa(x,y){
	var latLngBounds = map.getBounds();
	var neBound = latLngBounds.getNorthEast();
	var swBound = latLngBounds.getSouthWest();
	
	//convertir los límites en coordenadas de pantalla.
	var neBoundInPx = map.getProjection().fromLatLngToPoint(neBound);
	var swBoundInPx = map.getProjection().fromLatLngToPoint(swBound);
	
	var procX = x/window.innerWidth;
	var procY = y/window.innerHeight;
	var newLngInPx = (neBoundInPx.x - swBoundInPx.x) * procX +swBoundInPx.x; 
	var newLatInPx = (swBoundInPx.y - neBoundInPx.y) * procY + neBoundInPx.y;
	var newLatLng = map.getProjection().fromPointToLatLng(new google.maps.Point(newLngInPx, newLatInPx));
	return newLatLng;
  }
  
function crearInfoColegio (data,sedestota) {
	donaNiveles = [];
	
    $("#preaload1").hide();
	$("#preaload").hide();
	codigoact = data[0]["COD_COL"];
    var htmlpri = "";
    var localidad= nombrelocalidad(data[0]["COD_LOCAL"]);
	var infoJornadas = [];
	var infoNiveles = [];
	var valorNiveles = 0;
    if(localidad ==""){
        
        localidad = verificar(data[0]["SCANOMBRE"]);
    }
			if (data[0]["NOM_INST"] == null){
				var colegioNom =  data[0]["NOM_COL"].replace("?","Ñ");
			}else{
				var colegioNom = data[0]["NOM_INST"].replace("?","Ñ"); 
			}
			
			htmlpri+= '<div tabindex="0" class = "subtituloIdenficacion">Nombre de Sede:</div>';
            htmlpri+= "<p tabindex='0' style= 'padding-left:0'>" + data[0]["NOM_COL"].replace("?","Ñ") + "</p><div tabindex='0' class = 'subtituloIdenficacion'>Nombre institución educativa:</div><p tabindex='0' style= 'padding-left:0'>" + colegioNom + "</p><select id='massedes' name='massedes' class='inputAzul' style=' margin-top:6%'><option value='' disabled selected>Más Sedes</option></select><div class ='itemsIdentificacion'><div tabindex='0' class = 'subtituloIdenficacion' style='float:left; width:100%'>Localidad:&nbsp</div><p tabindex='0'>" + localidad + "</p></div><div class ='itemsIdentificacion'><div tabindex='0' class = 'subtituloIdenficacion' style='float:left width:100%;'>Barrio:&nbsp</div><p tabindex='0'>" + verificar(data[0]["SCANOMBRE"]) + "</p></div><div class ='itemsIdentificacion'><div tabindex='0' class = 'subtituloIdenficacion' style='float:left;'>Dirección:&nbsp</div><p tabindex='0'>" + verificar(data[0]["DIR_COL"]) + "</p></div><div class ='itemsIdentificacion'><div tabindex='0' class = 'subtituloIdenficacion' style='float:left;'>Teléfono:&nbsp</div><p tabindex='0'>" + verificar(data[0]["TEL_COL"]) +"</p></div><div class ='itemsIdentificacion'><div tabindex='0' class = 'subtituloIdenficacion' style='width: 100%; float:left;'>E-mail:&nbsp</div><a href='mailto:" + data[0]["EMAIL"] + "?Subject=Enviar%20correo'target='_top'>" + verificar(data[0]["EMAIL"]) + "</a></div><div class ='itemsIdentificacion'><div tabindex='0' class = 'subtituloIdenficacion' style='float:left; padding-bottom: 6%;'>Web:&nbsp</div><a href='http://'" + data[0]["WEB_INST"] + "></a></div>";
    		htmlpri+="<div class='fuentesCole'>*Fuente: Investigación de Educación Formal, DANE. 2015</div>"
             $("#contenidoIdentificacion").html(htmlpri);
   
            
            //htmlpri= "<div class ='celdaTabla' style= 'margin-top:6%'><p>" + traerestudiantes('MAÑANA') + "</p></div><div class ='celdaTabla'><p>" + traerestudiantes('TARDE') + "</p></div><div class ='celdaTabla'><p>" + traerestudiantes('NOCTURNA') +  "</p></div><div class ='celdaTabla'><p> " + traerestudiantes('COMPLETA') + "</p></div><div class ='celdaTabla' style= 'margin-bottom:2%'><p>" + traerestudiantes('FIN DE SEMANA') +"</p></div>";
    
           // $("#filaIzqJornada").html(htmlpri);
    
			//infoNiveles.push({ "jornada": Preescolar, "population": total[i]});
			
			valorNiveles = traerestudiantesNivel(prees);
			$("#tablaNiveles").html("");
			htmlpri = '<div class = "lineaGraficas"></div><div id = "donaNivel" class= "columnaGraficas"></div><div tabindex="0" id = "columnaInfoNiveles" class= "columnaInfo"></div>';
			$("#tablaNiveles").html(htmlpri);
			capturarNiveles(valorNiveles, "Preescolar", "");
			capturarNiveles(traerestudiantesNivel(prima), "Primaria","");
			capturarNiveles(traerestudiantesNivel(secun), "Secundaria","");
			capturarNiveles(traerestudiantesNivel(media), "Media","");
			colorDonut = color1Dona;
			bandera1 = false;
			bandera2 = false;
			if(donaNiveles.length != 0){
				hacerDona2(donaNiveles, data[0]["TOR_MAT"], "donaNivel");	
			}else{
				var error = "<center><p>No se encuetra información</p></center>"
				$("#donaNivel").html(error);
			}
					
			
    
		$("#calendarioColegio").html(data[0]["ETIQUETA"]);
		if(data[0]["ETIQUETA"] == "A" || data[0]["ETIQUETA"] == "B"){
			$("#calendarioColegio").css("font-size", "3.8rem");
		}else{
			$("#calendarioColegio").css("font-size", "0.8rem");
		}
		if(obtenersector(data[0]["SECTOR"])== "OFICIAL"){
			$("#sectorColegio").css("font-size", "1.5rem");
			$("#sectorColegio").html("Oficial");
		}else if(obtenersector(data[0]["SECTOR"])== "NO OFICIAL"){
			$("#sectorColegio").css("font-size", "1.05rem");
			$("#sectorColegio").html("No oficial");
		}
		
		if(obtenergenero(data[0]["GENERO"])=="MIXTO"){
			$("#imagenSexo").css("background-image", "url(imagenes/mixto3.png)")
			$("#imagenSexo1").css("background-image", "url(imagenes/mixto2.png)")
		}else if(obtenergenero(data[0]["GENERO"])=="HOMBRES"){
			$("#imagenSexo").css("background-image", "url(imagenes/hombre1.png)")
			$("#imagenSexo1").css("background-image", "url(imagenes/hombre3.png)")
		}else if(obtenergenero(data[0]["GENERO"])=="MUJERES"){
			$("#imagenSexo").css("background-image", "url(imagenes/mujer1.png)")
			$("#imagenSexo1").css("background-image", "url(imagenes/mujer3.png)")
		}else{
		
		}
        $("#imagenSexo1").hide();
		$("#imagenSexo").show();
            
    //$(htmlpri).insertAfter("#tablaNiveles");
	
	
	$("#columnaInfoJornadas").html("");
	donaNiveles = [];
	colorDonut = color2Dona;
	var totalporJornada = data[0]["TOTAL_MATRICULADOS"].split(",");
	for(i=0; i<jorna.length;i++){
        var nombre = jorna[i].replace("Ñ","N");
		var nombre2 = jorna[i].toLowerCase();
		nombre2 = nombre2.charAt(0).toUpperCase() + nombre2.slice(1);
        nombre = nombre.replace(" ","");
		nombre = nombre.replace(" ","");
		//htmlpri = '<div id ="tablaNiveles' + nombre +'" class ="tablacarac"><div class = "lineaGraficas"></div><div id = "donaNivel' + nombre +'" class= "columnaGraficas"></div><div id = "columnaInfoNiveles' + nombre +'" class= "columnaInfo">'
		//$(htmlpri).insertAfter("#tablaNiveles");
		nivelesporJornada(nombre,i);
		htmlpri = '<div id="donaNivel' + nombre+'" class="columnaGraficas" style= "display:none">';
		$(htmlpri).insertAfter("#donaNivel");
		bandera1 = false;
		bandera2 = false;
		if(donaNiveles != []){
		hacerDona2(donaNiveles,totalporJornada[i], "donaNivel"+ nombre);
		}else{
			var error = "<center><p>No se encuetra información</p></center>"
			$("#donaNivel").html(error);
		}
		infoJornadas.push({ "jornada": nombre, "population": total[i]});
		htmlpri = '<div class= "infoDonas">';
		switch(nombre){
			case "MANANA":
				htmlpri+= '<div class = "infoDonasImagen" style = "background-image: url(imagenes/filtromanana.png)"></div>'
				break;
			case "TARDE":
				htmlpri+= '<div class = "infoDonasImagen" style = "background-image: url(imagenes/filtrotarde.png)"></div>'
				break;
			case "NOCHE":
				htmlpri+= '<div class = "infoDonasImagen" style = "background-image: url(imagenes/filtronoche.png)"></div>'
				break;
			case "COMPLETA":
				htmlpri+= '<div class = "infoDonasImagen" style = "background-image: url(imagenes/filtrocontin.png)"></div>'
				nombre2 = "Continua"
				break;
			case "FINDESEMANA":
				htmlpri+= '<div class = "infoDonasImagen" style = "background-image: url(imagenes/filtrosf.png)"></div>'
				nombre2 = "Sábados y festivos"
				break;	
		}
		
		htmlpri+= "<p>" + nombre2 + ": " + total[i] + " est. </p></div>" 
		$("#columnaInfoJornadas").append(htmlpri);
    }
	colorDonut = color1Dona;
	$("#donaJornada").html("");
	bandera1 = false;
	bandera2 = false;
	if(data[0]["TOR_MAT"] != "0"){
		hacerDona(infoJornadas, data[0]["TOR_MAT"]);
	}else{
		var error = "<center><p>No se encuetra información</p></center>"
		$("#donaJornada").html(error);
	}
	//cargarinfor(1);
	$("#contenidoIdentificacion").scrollTop( "0" );
        
    
    $("#barraTitulo h1").text(data[0]["NOM_COL"].replace("?","Ñ"));
   
    
    for(i=0; i < sedestota.length; i++){
		$('#massedes').append($('<option>', {
			value: sedestota[i]["CODIGOSEDE"],
			text: sedestota[i]["NOMBRESEDE"]
		}));
	}
    coloresSecciones("#318DA6", "#CDEAFB");
    var urlimg = "http://geoportal.dane.gov.co/wssicole/colegio3.php?cod_col=" + data[0]["COD_COL"];	
    $("#ventanaFotoCole").css("background-image","url(" + urlimg + ")");
    eventosInfo ();
	
	
	$('#massedes').change(function(){
		if($('#massedes').val() != "0" && $('#massedes').val() != codigoact){
			cargarinfo($(this).val(), "0");
            var ubicacion = "http://geoportal.dane.gov.co/wssicole/colegio2.php?cod_col=" + $('#massedes').val();
            $("#preaload1").show();
            var ua= navigator.userAgent.toLocaleLowerCase();
            var isAndroid= ua.indexOf("android")>-1
           if(isAndroid){    
                
            }
            else{
                $("#preaload1").show();
		$.getJSON(ubicacion, function(data){
			//*********************************************************************
			//*********************************************************************
			$('#fondo').hide();
			$('#ventana_modal').hide();
			//********************************************************************
			//*********************************************************************
			//datos = data;
			if (data.length > 0)
			{

		    	var lat = "";
		    	var longi = "";
		    	var latcor = "";
		    	var longcor = "";

		    	lat = data[0]['LATITUD'];
		    	longi = data[0]['LONGITUD'];
                latcor = lat.replace(",",".");
		    	longcor = longi.replace(",",".");
                var latitud = parseFloat(latcor);
		    	var longitud = parseFloat(longcor);

		    	var ubicacion = { lat: latitud, lng: longitud};
                infoMarker.close();
                markerGeo.setVisible(false);
               // latitud= latitud-0.0025;
				//ubicacion = { lat: latitud, lng: longitud};
				map.setCenter(ubicacion);
                markerini.setPosition(ubicacion);
               openInfoWindowUbicacionIni(markerini,cargarinfo(data[pos]['CODIGO_SEDE'],0));
                
                }else{
                    $("#preaload").hide();
                }
        });
            
            }
            
            
		}
	$("#tablaJornadas").css("display","none");
	$("#tablaNiveles").css("display","none");
	});
	
	if($("#functionOpen").css("display") == "block"){
		setTimeout(function () {
			conInfocolegio();
		},502);
	}
	
}

function capturarNiveles(valorNivel, nombre, nivel){
	var htmlpri = ""
	if(valorNivel != 0){
		//htmlN = 
		//$("#columnaInfoNiveles")
		htmlpri = '<div class= "infoDonas">';
		switch(nombre){
			case "Preescolar":
				htmlpri+= '<div class = "infoDonasImagen" style = "background-image: url(imagenes/preescolar.png); border-color: #F39C1F"></div>'
				break;
			case "Primaria":
				htmlpri+= '<div class = "infoDonasImagen" style = "background-image: url(imagenes/primaria.png); border-color: #F39C1F" ></div>'
				break;
			case "Secundaria":
				htmlpri+= '<div class = "infoDonasImagen" style = "background-image: url(imagenes/secundaria.png); border-color: #F39C1F"></div>'
				break;
			case "Media":
				htmlpri+= '<div class = "infoDonasImagen" style = "background-image: url(imagenes/media.png);  border-color: #F39C1F"></div>'
				break;	
		}
		
		htmlpri+= "<p>" + nombre + ": " + valorNivel + " est. </p></div>" 
		$("#columnaInfoNiveles" + nivel + "").append(htmlpri);
		donaNiveles.push({ "jornada": nombre, "population": valorNivel});
	}else{
	
	}
	
}
function nivelesporJornada(nombre, contador){
	donaNiveles = [];
	var htmlpri = '<div tabindex="0" class = "columnaInfo" id = "columnaInfoNiveles' + nombre+ '" style = "border-color: rgb(243, 156, 31)">';
	
	$("#columnaInfoNiveles").after(htmlpri);
	capturarNiveles(prees[contador], "Preescolar", nombre);
	capturarNiveles(prima[contador], "Primaria", nombre);
	capturarNiveles(secun[contador], "Secundaria", nombre);
	capturarNiveles(media[contador], "Media", nombre);
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


$.datepicker.regional['es'] = {
 closeText: 'Cerrar',
 prevText: '<Ant',
 nextText: 'Sig>',
 currentText: 'Hoy',
 monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
 monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
 dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
 dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
 dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
 weekHeader: 'Sm',
 dateFormat: 'dd/mm/yy',
 firstDay: 1,
 isRTL: false,
 showMonthAfterYear: false,
 yearSuffix: ''
 };
 $.datepicker.setDefaults($.datepicker.regional['es']);

 $( function() {

     $("#fechaNac").datepicker({
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        yearRange: "1930:2016" 
    });
     
    $("#fechaNacAct").datepicker({
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        yearRange: "1930:2016" 
    }); 
     
      $("#fechaDoc").datepicker({
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        yearRange: "2000:2016" 
    });  
     
     
 });
$(document).ready(function () {	
   
	$("#cerrarStreet").hover(function(){
		$("#circuloSalir").css("fill", "white"); 
		$("#textoStreet").css("fill", "#B6134E");
		$(this).css("cursor", "pointer");
	}, function(){
		$("#circuloSalir").css("fill", "#B6134E"); 
		$("#textoStreet").css("fill", "white");
	});
	$("#botonPlegar").hover(function(){
		$("#circuloPlegar").css({
			"fill": "#B6134E",
		});	
		$(this).css("cursor", "pointer");
	}, function (){
		$("#circuloPlegar").css({
			"fill": "#01B4ED"
		});
		$(this).css("cursor", "default");
	});
	
	$("#botonPlegar").click(onclick, function(){
		onCloseLeftPanel();
	});
	
	$("#botonPlegar2").hover(function(){
		$("#circuloPlegar2").css({
			"fill": "#B6134E"
		});	
		$(this).css("cursor", "pointer");
	}, function (){
		$("#circuloPlegar2").css({
			"fill": "#01B4ED"
		});
		$(this).css("cursor", "default");
	});
	
	$("#botonPlegar2").click(onclick, function(){
		onClickCloseRighNearSchoolsPanel();
	});
	
	$("#cerrarStreet").click(function (){
		cerrarPanorama();
	});
	
	$("#cerrarFuncionalidad").hover(function(){
		$("#salirFuncion").css("fill", "white"); 
		$("#textoFuncion").css("fill", "#B6134E");
		$(this).css("cursor", "pointer");
	}, function(){
		$("#salirFuncion").css("fill", "#B6134E"); 
		$("#textoFuncion").css("fill", "white");
	});
	


	$( "#slider-range" ).slider({
		range: true,
		min: 0,
		max: 100,
		step: 10,
		values: [ 0, 100 ],
		slide: function( event, ui ) {
			ubicarIndicador2(ui.values[0],"profes1Output", ui.values[100])
			ubicarIndicador2(ui.values[1],"profes2Output", ui.values[0])
		 }		
	});
	
    $("#numeroEstudiantes").slider({
		range: true,
		min: 1,
		max: 100,
		step: 1,
		values: [ 1, 100 ],
		slide: function( event, ui ) {
			ubicarIndicador2(ui.values[0],"docenteEst1", ui.values[1])
			ubicarIndicador2(ui.values[1],"docenteEst2", ui.values[0])
		 }		
	});
	
  
	reiniciarFiltros();

	$("#filtroDistanciaR").change(function() {
		ubicarIndicador($(this));
		radioini = $("#filtroDistanciaR").val();
	})
	
	
    estilosParteInferior();
	cambiarTips();
	
	$("#sectornNoOficial").prop( "checked", "true");
	$("#sectornOficial").prop( "checked", "true");
	$("#NoOficial").prop( "checked", "true");
	$("#Oficial").prop( "checked", "true");
	var anch = $(window).width();
	var altu = $(window).height() - $("#barrasuperior").height() - $("#barrainferior").height();
	
	function convertirFecha(fecha){
        
        var dia = parseInt(fecha.getDay());
        var month = parseInt(fecha.getMonth());
        var ano = parseInt(fecha.getFullYear());
        var convertida = "";
        month+= 2;
        convertida = dia + "-" + month + "-" + ano;
        return convertida;
        
    }
    
	$("#botonGuardar").click(function (event) {   
        
        var fecha = $("#fechaNac").val()
		fecha = fecha.replace("/","-").replace("/","-");
		console.log(fecha);
		urlregistro = "http://geoportal.dane.gov.co/wssicole/serviciousuario.php?operacion=crearusuario";
		clasePerfil = 1;
		if($("#nombres").val() != "" && $('#fechaNac').val() != "-" && $("#apellidos").val() != "" && $("#numeroDoc").val() != "" && $("#correo").val() != "" && $("#password").val() != ""){
			if(validateEmail($("#correo").val()) == true && /^[A-Za-z ñÑáÁéÉíÍóÓúÚ]+$/.test($("#nombres").val())==true && /^[A-Za-z ñÑáÁéÉíÍóÓúÚ]+$/.test($("#apellidos").val())==true){
				if($("#password").val() == $("#repassword").val()){
					var uri= "http://geoportal.dane.gov.co/wssicole/serviciousuario.php?operacion=verificarusuario";
					uri+= "&usuario=" + $("#correo").val()
					uri+= "&numero_documento=" + $('#numeroDoc').val(); 	
					d3.json(uri, function(error, data) {
						if(data[1] =="true"){
							var nombres = $("#nombres").val();
							urlregistro += "&nombres=" + nombres;
							var apellidos = $("#apellidos").val();
							urlregistro += "&apellidos=" + apellidos;
							var tipo = $("#tipoDoc").val();
							urlregistro += "&id_tipo="+tipo;
							var numero = $('#numeroDoc').val();
							urlregistro += "&numero_documento="+numero;
				            urlregistro += "&fecha_nacimiento=" + fecha;
							var rol = $('#roles').val();
							urlregistro += "&id_rol="+rol;	
							var usuario = $("#correo").val();				
							urlregistro += "&foto_usuario=" + usuario + ".jpg";
							urlregistro += "&usuario=" + usuario;
							var password = $("#password").val();
							urlregistro += "&clave=" + password;
							$("#nombre").val(usuario);
                            var focusTrapRegisterForm=returnFocusTrapRegisterForm();
                            focusTrapRegisterForm.pause();
							cargarformufoto();


						}else if(data[1]== "false"){
							data[2] = data[2].replace("numero","número");
							data[2] = data[2].replace("nombre de usuario","correo electrónico");
							data[2] = data[2].replace("documento","documento ya");
                            throwErrorMessage("¡Error!",data[2]);
						}
					});
					
					
				}else{
                    throwErrorMessage("¡Error!","Los campos contraseña y repetir contraseña deben coincidir");
				}
			}else if(validateEmail($("#correo").val()) == false){
                throwErrorMessage("¡Error!","Debe ingresar un correo válido");
                //alert("Debe ingresar un correo válido")
                
            }
			else if(/^[A-Za-z ñÑáÁéÉíÍóÓúÚ]+$/.test($("#nombres").val())==false){
                throwErrorMessage("¡Error!","Los nombres deben contener sólo letras y espacios en blanco.");
				//alert("Los nombres deben contener sólo letras y espacios en blanco.")
			}
            else if(/^[A-Za-z ñÑáÁéÉíÍóÓúÚ]+$/.test($("#apellidos").val())==false){
                throwErrorMessage("¡Error!","Los apellidos deben contener sólo letras y espacios en blanco.");

                //alert("Los apellidos deben contener sólo letras y espacios en blanco.")
			}
		}
		else{
            throwErrorMessage("¡Error!","Algún campo está vacío");

            //alert("Algún campo esta vacío");
        }
	 
	});

	$("#botonActualizar").click(function (event) {
		urlactualizar = "http://geoportal.dane.gov.co/wssicole/serviciousuario.php?operacion=modificarusuario";
		if($("#formularioActualizar #nombres").val() != "" && $("#formularioActualizar #apellidos").val() != "" && $("#formularioActualizar #numeroDoc").val() != "" && $('#formularioActualizar #diaNac').val() != "-" && $('#formularioActualizar #mesNac').val() != "-" && $('#formularioActualizar #anoNac').val() != "-"){
			if(/^[A-Za-z ñÑáÁéÉíÍóÓúÚ]+$/.test($("#formularioActualizar #nombres").val())==true && /^[A-Za-z ñÑáÁéÉíÍóÓúÚ]+$/.test($("#formularioActualizar #apellidos").val())==true){
				if($("#password").val() == $("#repassword").val()){
					var nombres = $("#formularioActualizar #nombres").val();
					urlactualizar += "&nombres=" + nombres;
					datossesion.nombres = nombres; 
					var apellidos = $("#formularioActualizar #apellidos").val();
					urlactualizar += "&apellidos=" + apellidos;
					datossesion.apellidos = apellidos;
					var tipo = $("#formularioActualizar #tipoDoc").val();
					urlactualizar += "&id_tipo="+tipo;
					datossesion.tipodocumento = tipo;
					var numero = $('#formularioActualizar #numeroDoc').val();
					urlactualizar += "&numero_documento="+numero;
					datossesion.cedula = numero;

					var fecha = $("#fechaNacAct").val().replace("/","-");
                    fecha = fecha.replace("/","-");
					urlactualizar += "&fecha_nacimiento="+fecha;
					var rol = $('#formularioActualizar #roles').val();
					datossesion.rolusuario = $('#formularioActualizar #roles :selected').text(); 
					urlactualizar += "&id_rol="+rol;
					var tipoDocumento = cambiarTipo(tipo);
					$("#UsuarioNombre").text(nombres + " " + apellidos);
					$("#rolEscogido").text($('#formularioActualizar #roles :selected').text());
                    console.log("url " + urlactualizar);
					d3.json(encodeURI(urlactualizar), function(error, data) {
						if(data[1] == "true"){
                            throwMessagesUpdateForm("¡Felicitaciones!",data[2], false);
							//alert(data[2]);
							$("#seccionPerfil #tituloNombre").html(nombres + " " + apellidos);
							$("#seccionPerfil #infoUsuario").empty();
							
							var html = "";
								
							html += "<div id='informacionvisible' tabindex='0'>" + $('#formularioActualizar #roles :selected').text() + "<br>";
							html += datossesion.username + "<br>";
							html += tipoDocumento + "<br>";
							html += $('#formularioActualizar #numeroDoc').val() + "<br>";
							html += $("#fechaNacAct").val() + "<br>";
							html += "</div>";	
							
							
							html += "<button id='actualizarInformacion' tabindex='0' aria-label='Abrir menú para actualizar los datos'>";
							html += "<img style='position:relative; float:left' src='imagenes/actualizar.png' width='30px'>"
							html += "<h3>Actualizar datos</h3>";
							html += "</button>";

							$("#seccionPerfil #infoUsuario").append(html);	
							
							$("#seccionPerfil").show();
							$("#formularioActualizar").hide();
							$("#botonSalir2").hide();
							
						}
						else{
                            throwMessagesUpdateForm("¡Error!",data[2],true);
							//alert(data[2]);
						}
					});
				} else{
                    throwMessagesUpdateForm("¡Error!","Los campos contraseña y repetir contraseña deben coincidir",true);
				}
			}else if(/^[A-Za-z ñÑáÁéÉíÍóÓúÚ]+$/.test($("#formularioActualizar #nombres").val())==false){
                throwMessagesUpdateForm("¡Error!","Los nombres deben contener sólo letras y espacios en blanco",true);
				//alert("Los nombres deben contener sólo letras y espacios en blanco.")
			}else if(/^[A-Za-z ñÑáÁéÉíÍóÓúÚ]+$/.test($("#formularioActualizar #apellidos").val())==false){
                throwMessagesUpdateForm("¡Error!","Los apellidos deben contener sólo letras y espacios en blanco",true);
				//alert("Los apellidos deben contener sólo letras y espacios en blanco.")
			}
			
		}
		else{
            throwMessagesUpdateForm("¡Error!","Algún campo esta vacío",true);
            //alert("Algún campo esta vacío");
		}
	
	});
    
    
 
	
    
	$("#botonIniciar").click(function (event) {

		var focusTrapLogInForm=returnFocusTrapLogInForm();
        focusTrapLogInForm.deactivate();

        $("#botonSalir").hide();
		$("#menulogueo").hide();
        clicInicial();
    });

    
$("#contrasena").keypress(function(e){
	if(e.which == 13) {
		 $("#botonSalir").hide();
		$("#menulogueo").hide();
        clicInicial();
	}
});
	
    function clicInicial(){
        $("#botonPlegar2").hide();
		$("#colegioFavorito").show();
        $(".botonesIniciar").hide();
        $("#preaload").show();
		urlsesion = "http://geoportal.dane.gov.co/wssicole/serviciousuario.php?operacion=autenticar";
		var usuario = $("#usuario").val();
		urlsesion += "&login=" + usuario;
		var contrasena = $("#contrasena").val();
		urlsesion += "&clave=" + contrasena;
         $(this).prop("disabled",true);
		d3.json(encodeURI(urlsesion), function(error, data) {
			if(data[1] == "true"){
                isUserLoggedIn=true;
				$("#iniciar").hide();
				datossesion = data[3];
				mensaje("¡Felicitaciones!", data[2]);
				llenarBarra();

				var urlsede ="http://geoportal.dane.gov.co/wssicole/serviciousuario.php?operacion=obtenerSedesUsuario&numerodoc=" + datossesion.cedula;
				d3.json(urlsede, function(error, data) {
					datossedesession = data;
					sedeActiva = [];
					for(i=0; i < data.length; i++){
                        
						$('#nombreSede').append($('<option>', {
							value: data[i]["CODIGOSEDE"],
							text: data[i]["NOMBRE_SEDE"]
						}));						
						//html = "<p style='font-size: 15px; font-weight: bold; color: #666;'>" + data[i]["NOMBRE_SEDE"] + "</p>";
						html = '<div tabindex="0" class = "colegioAgregado" aria-label="'+ data[i]["NOMBRE_SEDE"] +'">' + data[i]["NOMBRE_SEDE"] + ' <img alt="Botón editar sede" role="button" tabindex="0" id = "actualizarSede' +  data[i]["CODIGOSEDE"] +'" class="imagenControlSede" src="imagenes/actualizar.png" style= "right:18%" onkeypress="keyPressactualizarfuncion(event,this.id)" onclick= "actualizarfuncion(this.id)"/><img alt="Botón eliminar sede" role="button" tabindex="0" id = "eliminarSede' + data[i]["CODIGOSEDE"] + '" class="imagenControlSede" src="imagenes/eliminar.png" onkeypress="keyPresseliminarfuncion(event,this.id)" onclick= "eliminarfuncion(this.id)"/></div>';
						sedeActiva.push(data[i]["CODIGOSEDE"]) 
						$("#sedesAgregadasPerfil").append(html);
						$("#seccionPerfil #nombre").val(datossesion.username);
					}
                        
                        $("#preaload").hide();
                    $(".title").focus();
                    turnOnFocusTrapLogInDialog();
				});
			}
			else{
				mensaje("¡Error!",data[2]);
				$("#contrasena").val("");
                 $(this).prop("disabled",false);
                $("#preaload").hide();
                $(".botonesIniciar").show();
                $(".title").focus();
                turnOnFocusTrapLogInDialog();
	       }
	});				

}
    
	
	//****** Busqueda Colegio
	$("#inputBusqueda2").keypress(function(e) {
		$("#busquedaPopup").css("z-index","100");
		if(e.which == 13){
				busquedaavanzada();
		}
	});
	
	$("#volver6").click(onclick, function () {
        $("#contenedorLogin").attr('aria-expanded','false');
		var focusTrapPhotoForm=returnFocusTrapPhotoForm();
        focusTrapPhotoForm.deactivate();
		$("#barraSesion").hide(anima);
		$("#contenedorLogin").focus();
	});
	
	$("#tusede").click(onclick, function () {
		var focusTrapHelpMenu=returnFocusTrapHelpMenu();
        focusTrapHelpMenu.deactivate();
		$("#formularioActualizar").hide();
		$(".subventana").hide(anima);
		habilitarseccion(datossesion.rolusuario);
		$("#menuInicial").hide();
		$("#seccionPerfil").hide();
		$("#sedeCuentanos").show(anima);   
		$("#cambiartrafico").hide();   
		$("#sicoleLogo").hide();  
        $("#barraSesion").show(anima);
		$("#menuSesionIniciada").hide(anima);
		$("#sedeEncuesta").show();
		$("#introduccion").hide();
		$("#listaFavoritos").hide();
		$("#yourSchoolTellUs").focus();
	});
	
	$("#contacto").click(onclick, function () {
        hasPressedContact=true;
		var focusTrapHelpMenu= returnFocusTrapHelpMenu();
        focusTrapHelpMenu.deactivate();
        hasPressedContact=false;
		sesionactiva = "c";
		cerrarTodos();
		$("#barraSesion").show(anima)
		$("#cambiartrafico").hide();
		$("#contactoVentana").show();
		$("#menuInicial").hide();
		$("#sicoleLogo").hide();
		$("#infraestructuraVentan").hide();
		$("#contactTitle").focus();
		
	});
	
	$("#volver4").click(onclick, function () {
		$("#menuInicial").show();
		$("#infoSicole").hide();
		$("#sicoleLogo").show();  
		sesionactiva = "a";
        $("#barraSesion").width("70%");
	});
	$("#volver5").click(onclick, function () {
		$("#contactoVentana").hide();
		$("#menuInicial").show();
		$("#sicoleLogo").show();
		sesionactiva = "a";
	});
	
	$("#acercade").click(onclick, function () {
        hasPressedAbout=true;
        var focusTrapHelpMenu= returnFocusTrapHelpMenu();
        focusTrapHelpMenu.deactivate();
        hasPressedAbout=false;
		cerrarTodos();
		$("#cambiartrafico").hide();
		$("#menuInicial").hide();
		$("#sicoleLogo").hide();
		$("#infoSicole").show(); 
		$("#barraSesion").show(anima)
		sesionactiva = "d";
		$("#aboutSicole").focus();
	});


                
         

	$("#cerrarSesion").click(onclick, function () {
        isUserLoggedIn=false;
        var focusTrapHelpMenu=returnFocusTrapHelpMenu();
        focusTrapHelpMenu.deactivate();
		cerrarTodos();
		$("#crearCuenta").show();
		$("#listaFavoritos").hide();
		$("#colegioFavorito").hide();
		$("#menuSesionIniciada").hide(anima);
		$("#menuHamburguesa").hide(anima);
		$("#contenedorLogin").hide(anima);
		$("#registrarse").show(anima);
		$("#botonIniciar").show();
		$("#barraSesion").show(anima);
		$("#seccionPerfil").hide();
		$("#sedeCuentanos").hide(anima);
		$("#menuInicial").hide();
		$("#iniciar").show();
		$("#usuario").val("");		
		$("#contrasena").val("");	
		datossedesession = 0;
		sesionactiva = "b";
		datossesion = [];
		$('#nombreSede').find('option').remove();
		$("#sedesAgregadasPerfil").html("");
		$('#infraestructura').removeClass("Activo");
		$('#transporte').removeClass("Activo");
		$('#convivencia').removeClass("Activo");
		$('#asistencia').removeClass("Activo");
		$('#nombreSede').html("");
		$("#crearCuenta").show();
		$("#LoginTitle").focus();
	});
	
	$("#seccionFoto #buscarSede").click(onclick, function () {
		$("#seccionFoto").hide();
		$("#sicoleLogo").hide();
		$("#agregarSede").show(); 
		clasePerfil = 1;
		$("#contenedorSedes").hide();
		$("#busquedacolegio").val("");
		$("#favoritosSede").hide();
		$("#contenedorFavoritos").hide();
		$("#tituloNombre3").html("Agregar nueva sede");
	});
	
	$("#seccionPerfil #buscarSede").click(onclick, function () {
		var focusTrapPhotoForm=returnFocusTrapPhotoForm();
        focusTrapPhotoForm.pause();
        $("#seccionPerfil").hide();
		$("#sicoleLogo").hide();
		$("#agregarSede").show();
		clasePerfil = 2;
		llenarFavoritos();
		$("#contenedorSedes").hide();
		$("#busquedacolegio").val("");
		$("#favoritosSede").show();
		$("#contenedorFavoritos").show();
		$("#tituloNombre3").html("Agregar nueva sede");
		$("#tituloNombre3").focus();
		var focusTrapAddSchoolOnRegister=returnFocusTrapAddSchoolOnRegister();
        focusTrapAddSchoolOnRegister.activate();
	});
	
	$("#botonCancelar").click(onclick, function () {
		$("#seccionFoto").show();
		$("#agregarSede").hide();
    });
	
	
	$("#volver96").click(onclick, function () {
		$(".subventana").hide();
		$("#sedeCuentanos").show();
		
    });
	
	$("#volver97").click(onclick, function () {
		$(".subventana").hide();
		$("#sedeCuentanos").show();
		
    });
	
	$("#volver98").click(onclick, function () {
		$(".subventana").hide();
		$("#sedeCuentanos").show();
		
    });
	
	$("#volver99").click(onclick, function () {
		$(".subventana").hide();
		$("#sedeCuentanos").show();
		
    });
	
	$("#retornar").click(onclick, function () {
		$("#menuInicial").show();
		$("#sedeCuentanos").hide();
		$("#sicoleLogo").show();
        $("#barraSesion").width("70%");
    });

	$("#GuardarJornada").click(onclick, function () {
        isOnAddScheduleShool=true;
		var focusTrapSchoolSchedules=returnFocusTrapSchoolSchedules();
        focusTrapSchoolSchedules.deactivate();


		sedeActiva.push(CodsedeActiva);
		cont = 0;
		jorselc = "";
		if($("input[name=manana]:checked").val() != undefined){
			cont++;
			jorselc += "- Jornada Mañana";
		}
		if($("input[name=tarde]:checked").val() != undefined){
			cont++;
			jorselc += "- Jornada Tarde";
		}
		if($("input[name=noche]:checked").val() != undefined){
			cont++;
			jorselc += "- Jornada Noche";
		}
		if($("input[name=festivos]:checked").val() != undefined){
			cont++;
			jorselc += "- Jornada Fin de Semana";
		}
		if($("input[name=completa]:checked").val() != undefined){
			cont++;
			jorselc += "- Jornada Completa";
		}
		if(cont > 0){
			if(clasePerfil == 1){
				$("#seccionFoto").show();
				$("#contenedorJornadas").hide();						
				//html = "<p class = 'colegioAgregado'>" + NsedeActiva + " " + jorselc + "</p>";
				html = '<div tabindex="0" class = "colegioAgregado" aria-label="'+ NsedeActiva + " " + jorselc +'">' + NsedeActiva + " " + jorselc + ' <img alt="Botón editar sede" role="button" tabindex="0" id = "actualizarSede' +  CodsedeActiva +'" class="imagenControlSede" src="imagenes/actualizar.png" style= "right:18%" onkeypress="keyPressactualizarfuncion(event,this.id)" onclick= "actualizarfuncion(this.id)"/><img alt="Botón eliminar sede" role="button" tabindex="0" id = "eliminarSede' + CodsedeActiva + '" class="imagenControlSede" src="imagenes/eliminar.png" onkeypress="keyPresseliminarfuncion(event,this.id)" onclick= "eliminarfuncion(this.id)"/></div>'
				$("#sedesAgregadas").append(html);
			}
			
			if(clasePerfil == 2){
				$("#seccionPerfil").show();
				$("#contenedorJornadas").hide();						
				html = '<div tabindex="0" class = "colegioAgregado" aria-label="'+ NsedeActiva + " " + jorselc +'">' + NsedeActiva + " " + jorselc + ' <img alt="Botón editar sede" role="button" tabindex="0" id = "actualizarSede' +  CodsedeActiva +'" class="imagenControlSede" src="imagenes/actualizar.png" style= "right:18%" onkeypress="keyPressactualizarfuncion(event,this.id)" onclick= "actualizarfuncion(this.id)"/><img alt="Botón eliminar sede" role="button" tabindex="0" id = "eliminarSede' + CodsedeActiva + '" class="imagenControlSede" src="imagenes/eliminar.png" onkeypress="keyPresseliminarfuncion(event,this.id)" onclick= "eliminarfuncion(this.id)"/></div>'
				$("#sedesAgregadasPerfil").append(html);
				
            }
			/*var aux = $("#seccionFoto #borde").css("height")
            var cadena= aux.indexOf("p");
            cadena=parseFloat(aux.substring(0,cadena))+25;
            $("#seccionFoto #borde").css("height",cadena + "px");*/
            isOnAddScheduleShool=false;
            $("#tituloNombre").focus();
            var focusTrapPhotoForm=returnFocusTrapPhotoForm();
            focusTrapPhotoForm.unpause();
        }
		else{
			mensaje("¡Error!","Debe escoger una opción disponible");
			//alert("Debe escoger una opción disponible");
            $(".title").focus();
            createFocusTrapLogInDialog();
            var focusTrapLogInDialog=returnFocusTrapLogInDialog();
            focusTrapLogInDialog.activate();
		}
    });
	
	
	$("#infraestructura").click(onclick, function () {
		var asd = $("#infraestructura").attr('class').split(" ");
		var cont = 0;
		for(i = 0; i < asd.length; i++){
			if(asd[i] == "Activo"){
				cont++;
			}
		}
		if(cont == 1){
			$("#sedeCuentanos").hide();
			$("#infraestructuraVentana").show();
			$("#encabezadoInstitucion").show();
			$("#encabezado h1").text("Infraestructura");
			$("#cambiartrafico").hide();
			$("#sicoleLogo").hide();
		}
	});
});	


function cambiarTipo(tipo){
    
    switch(tipo){
        case "1": 
            return("Cédula de ciudadanía");
            break;
        case "2":
            return("Tarjeta de Identidad");
            break;
        case "3":
            return("Cédula de extranjería o Identificación de Extranjería");
            break;   
        case "4":
            return("Registro Civil de Nacimiento");
            break;  
        case "5":
            return("Número de Identificación Personal (NIP)");
            break;
        case "6":
            return("Número Único de Identificación Personal (NUIP)");
            break;
        case "7":
            return("No de Identificación - Secretaría de Educación");
            break;
        case "8":
            return("Certificado de Cabildo");
            break;   
		default:
			return("tipo")	
            break;     
            
    }
    
}

function cargarformufoto(){
	
	$("#seccionFoto").show();
	$("#botonSalir").hide();
    isRegisterFormVisible=false;
	$("#formularioSesion").hide();
	$("#tituloNombre").focus();
    var focusTrapPhotoForm=returnFocusTrapPhotoForm();
    focusTrapPhotoForm.activate();

	$("#seccionFoto #tituloNombre").html($("#nombres").val() + " " + $("#apellidos").val());
	$("#seccionFoto #infoUsuario").empty();
	
    var tipoDocumento = cambiarTipo($('#tipoDoc').val());
	var html = "";
	html += "<div id='informacionvisible' tabindex='0'>" + $('#roles :selected').text() + "<br>";
	html += $("#correo").val() + "<br>";
    html += tipoDocumento + "    ";
	html += $('#numeroDoc').val() + "<br>";
	html += $('#fechaNac').val() + "<br>";
	html += "</div>";	
	
	
	html += "<button id='actualizarInformacion' tabindex='0' aria-label='Abrir menú para actualizar los datos'>";
	html += "<img style='position:relative; float:left' src='imagenes/actualizar.png' width='30px'>"
	html += "<h3>Actualizar datos</h3>";
	html += "</button>";
	
	$("#seccionFoto #infoUsuario").append(html);	
	
}

function sedeClick(sede) {		
	url = "http://geoportal.dane.gov.co/wssicole/colegio2.php?cod_col=" + sede;
    console.log(url);

    var focusTrapAddSchoolOnRegister=returnFocusTrapAddSchoolOnRegister();
    focusTrapAddSchoolOnRegister.deactivate();

	d3.json(url, function(error, data) {
		NsedeActiva = data[0]["NOM_COL"].replace("?","Ñ");
		CodsedeActiva = data[0]["COD_COL"];
		var jornased = data[0]["JORNADA"].split(",");
		$("#agregarSede").hide();
		$("#contenedorJornadas").show();
		$("input[name=manana]").removeAttr('checked');
		$("input[name=tarde]").removeAttr('checked');
		$("input[name=noche]").removeAttr('checked');
		$("input[name=festivos]").removeAttr('checked');
		$("input[name=completa]").removeAttr('checked');
		$(".textoCheck").css("color", "#AAA")
		$(".squaredOne label").css("background-color", "#CCC")
		$("#contenedorHorarios h1").text(NsedeActiva);
		$("#volverJornada").css("background-color","#B6134E");
		
		for(i=0; i < jornased.length; i++){
			if(obtenerjornada(jornased[i]) == "MAÑANA"){
				$("input[name=manana]").removeAttr('disabled');
				$("#ContenidoManana .textoCheck").css("color", "#000")
				$("#ContenidoManana label").css("background-color", "#727272")
			}
			if(obtenerjornada(jornased[i]) == "TARDE"){
				$("input[name=tarde]").removeAttr('disabled');
				$("#ContenidoTarde .textoCheck").css("color", "#000")
				$("#ContenidoTarde label").css("background-color", "#727272")
			}
			if(obtenerjornada(jornased[i]) == "NOCHE"){
				$("input[name=noche]").removeAttr('disabled');
				$("#ContenidoNoche .textoCheck").css("color", "#000")
				$("#ContenidoNoche label").css("background-color", "#727272")
			}
			if(obtenerjornada(jornased[i]) == "FIN DE SEMANA"){
				$("input[name=festivos]").removeAttr('disabled');
				$("#ContenidoFestivo .textoCheck").css("color", "#000")
				$("#ContenidoFestivo label").css("background-color", "#727272")
			}
			if(obtenerjornada(jornased[i]) == "COMPLETA"){
				$("input[name=completa]").removeAttr('disabled');
				$("#ContenidoCompleta .textoCheck").css("color", "#000")
				$("#ContenidoCompleta label").css("background-color", "#727272")
			}
		}
		$("#SchedulesSchoolTitle").focus();
		var focusTrapSchoolSchedules=returnFocusTrapSchoolSchedules();
        focusTrapSchoolSchedules.activate();

	});
}




function ubicarCentro (codigo, distancia){
	var focusTraFavoriteSchools=returnFocusTraFavoriteSchools();
    focusTraFavoriteSchools.deactivate();
	uricol = "http://geoportal.dane.gov.co/wssicole/colegio2.php?cod_col="+codigo;
	codsedeActiva = codigo;
	
	$.getJSON(uricol, function(data)
	{
		if (data.length > 0){

		    	var lat = "";
		    	var longi = "";
		    	var latcor = "";
		    	var longcor = "";
		    	lat = data[0]['LATITUD'];
		    	longi = data[0]['LONGITUD'];
                latcor = lat.replace(",",".");
		    	longcor = longi.replace(",",".");
                var latitud = parseFloat(latcor);
		    	var longitud = parseFloat(longcor);
		    	var ubicacion = { lat: latitud, lng: longitud};
                infoMarker.close();
                markerGeo.setVisible(false);
                //latitud= latitud-0.0025;
				//ubicacion = { lat: latitud, lng: longitud};
				map.setCenter(ubicacion);
                markerini.setPosition(ubicacion);
                //openInfoWindowUbicacionIni(markerini,cargarinfo(data[0][COD_COL],0));
                cargarinfo(codigo,distancia);
				if(filtroAbierto == true){
					$("#mostrarResultados").show(anima);
                }
				}else{
                    
                    $("#preaload").hide();
                }
				
				
        });
		
		if(datossesion != "" && datossesion != undefined){
			var documento = cambiaraNumeroDoc(datossesion.tipodocumento)
			url = "http://geoportal.dane.gov.co/wssicole/favoritos.php?operacion=consultar&tipo_documento=" + documento +"&numero_documento=" + datossesion.cedula  + "&codigo_sede=" + codsedeActiva;
			console.log("favorito" + url);
			d3.json(encodeURI(url), function(error, data) {
				if (data.favorito == true){
					$("#estrellaColegioFavorito").css("background-image", "url(imagenes/agregado.png)");
					$("#agregarColegioFavorito").text("Agregado a favoritos");
					favorito = true;  
				}else if (data.favorito == false){
					$("#estrellaColegioFavorito").css("background-image", "url(imagenes/agregar.png)");
					$("#agregarColegioFavorito").text("Agregar a favoritos");
					favorito = false;  
				}						
			});				
		}else{
			
		}
	//
}

function ubicarCentroKeyPress(e, codigo, distancia){
	if(e.which==13){
		ubicarCentro(codigo, distancia);
	}
}

function ubicarCentroKeyPress(e, code,distance){
	if(e.which==13){
        ubicarCentro(code,distance);
	}
}

function realizarBusquedaPredio(nombreColegio){
     var pos = 0;

     var direccion = $("#inputBusqueda").val();
	  $("#preaload").show();
     direccion=direccion.toUpperCase();       
    	uribusqueda = "http://geoportal.dane.gov.co/wssicole/serviciobusqueda.php?palabrasclave="+direccion;
        var uribusqueda2 = "http://geoportal.dane.gov.co/wssicole/serviciobusqueda.php?direccion="+direccion;  
        uribusqueda2 = encodeURI(uribusqueda);
        busqueda2 =uribusqueda2.replace("%C2%91","");
        uribusqueda=encodeURI(uribusqueda);
        busqueda=uribusqueda.replace("%C2%91","");
     
  
		$.getJSON(busqueda, function(data){	
            $.getJSON(busqueda, function(data2){   
                var vectorAux = [];
                if(data.length > 0){
                    vectorAux = data;
                }else if(data2.lenght> 0){
                    vectorAux = data2;
                }
                for(i =0;i<vectorAux.length;i++){
				        if(nombreColegio==vectorAux[i]["COD_COL"]){
					       pos = i;
				        }
			     }    
            
			//*********************************************************************
			//*********************************************************************
			$('#fondo').hide();
			$('#ventana_modal').hide();
			//********************************************************************
			//*********************************************************************
			//datos = data;
			if (vectorAux.length > 0){

		    	var lat = "";
		    	var longi = "";
		    	var latcor = "";
		    	var longcor = "";
		    	lat = vectorAux[pos]['LATITUD'];
		    	longi = vectorAux[pos]['LONGITUD'];
                latcor = lat.replace(",",".");
		    	longcor = longi.replace(",",".");
                var latitud = parseFloat(latcor);
		    	var longitud = parseFloat(longcor);
		    	var ubicacion = { lat: latitud, lng: longitud};
                infoMarker.close();
                markerGeo.setVisible(false);
				map.setCenter(ubicacion);
                map.setZoom(17);
                markerini.setPosition(ubicacion);
                var pointA = posicionMover; 
                //lng
                var pointB = pointA.destinationPoint(90, 30);
                var pointC = pointA.destinationPoint(-90, 30);
                //lat
                var pointD = pointA.destinationPoint(0, 30);
                var pointE = pointA.destinationPoint(0, -30);


                if((markerini.getPosition().lng() < pointB.lng() && markerini.getPosition().lng() > pointC.lng()) && (markerini.getPosition().lat() < pointD.lat() && markerini.getPosition().lat() > pointE.lat())){

                  recargarCercanas();

                }else{

                     posicionMover = markerini.getPosition();
                    $("#preaload").show();
                     cargarMapa();
                }
                
                
                //openInfoWindowUbicacionIni(markerini);
				cargarinfo(vectorAux[pos]['CODIGO_SEDE'],0);
				if(datossesion != "" && datossesion != undefined){
					codsedeActiva = vectorAux[pos]['CODIGO_SEDE'];
					var documento = cambiaraNumeroDoc(datossesion.tipodocumento)
					url = "http://geoportal.dane.gov.co/wssicole/favoritos.php?operacion=consultar&tipo_documento=" + documento +"&numero_documento=" + datossesion.cedula  + "&codigo_sede=" + codsedeActiva;
					d3.json(encodeURI(url), function(error, data) {
						if (data.favorito == true){
							$("#estrellaColegioFavorito").css("background-image", "url(imagenes/agregado.png)");
							$("#agregarColegioFavorito").text("Agregado a favoritos");
							favorito = true;  
						}else{
							$("#estrellaColegioFavorito").css("background-image", "url(imagenes/agregar.png)");
							$("#agregarColegioFavorito").text("Agregar a favoritos");
							favorito = false;  
						}						
					});	
					
				}else{
					
				}
                }else{
                    
                    $("#preaload").hide();
               }
                    
                    });
            });
           
                
 }

 function onClickCloseRighNearSchoolsPanel(){
     $("#menuDesplegableDer").attr("aria-expanded","false");
     //$("#ventanaCategoriasIzq").hide(anima);
     plegarMenus = 2;
     var right1 = parseFloat($( window ).width()) * 0.05;
     $("#funcionalidadActual").css("right",right1);
     right1 = parseFloat($( window ).width()) * 0.01;
     $("#cerrarFuncionalidad").css("right",right1);
     mostrarPaneles();
     plegarMenus = 0;
     if($("#infoColeEsp").css("display") == "block"){
         cerrarInfocole();
         $("#infoColeEsp").hide(anima);
     }
     if($("#barraSesion").css("display") == "block"){
         $("#barraSesion").hide(anima);
     }
 }

 function onCloseLeftPanel(){
 	var focusTrapLeftPanelMenu=returnFocusTrapLeftPanelMenu();
     focusTrapLeftPanelMenu.deactivate();
     $("#menuDesplegableIzq").attr("aria-expanded","false");
     //$("#ventanaCategoriasIzq").hide(anima);
     plegarMenus = 1;

     mostrarPaneles();
     plegarMenus = 0;
 }

 function turnOnFocusTrapLogInDialog(){
     createFocusTrapLogInDialog();
     var focusTrapLogInDialog=returnFocusTrapLogInDialog();
     focusTrapLogInDialog.activate();
 }

 function onClickHamburgMenu(){
     if($("#menuSesionIniciada").css("display")=="none"){
         $("#menuHamburguesa").attr('aria-expanded','true');
         $("#menuSesionIniciada").show(anima);
     } else {
         $("#menuHamburguesa").attr('aria-expanded','false');
         $("#menuSesionIniciada").hide(anima);
     }
 }
 
function throwErrorMessage(error,content){
    var focusTrapRegisterForm=returnFocusTrapRegisterForm();
    focusTrapRegisterForm.pause();
    mensaje(error,content);
    $(".title").focus();
    createFocusTrapLogInDialog();
    var focusTrapLogInDialog = returnFocusTrapLogInDialog();
    focusTrapLogInDialog.activate();
}

function throwMessagesUpdateForm(updatePopUpTitle,updatePopUpContent,formHasError){
    isAnErrorOnUpdateData=formHasError;
    var focusTrapUpdateForm=returnFocusTrapUpdateForm();
    focusTrapUpdateForm.deactivate();
    mensaje(updatePopUpTitle,updatePopUpContent);
    $(".title").focus();
    createFocusTrapLogInDialog();
    var focusTrapLogInDialog=returnFocusTrapLogInDialog();
    focusTrapLogInDialog.activate();
}
