
var traveltime = new walkscore.TravelTime({
   map    : map,
  mode   : walkscore.TravelTime.Mode.BIKE
}),
    distanciaIsocrona = 0,
    banderaDistancia = false;


//** Variables para la posición inicial **\\

function confirmarIsocrona(posicion){
    activar = true;
	var tiempo = parseFloat($("#minutos").val());
	var latitud = parseFloat(posicion.lat());
	var longitud = parseFloat(posicion.lng());
		
    var coordenadas123 =  latitud + "," + longitud;
	$("#preaload").show();
        

	setTimeout(function (){
		traveltime.setOrigin(coordenadas123);
	}, anima); 
			
			
	 traveltime.setOptions({
	  map    : map,
	  //mode   : walkscore.TravelTime.Mode.WALK,
	  time   : tiempo,
	  color  : '#3AB8DA'
	});
    
    
			
	traveltime.on('show', function(){
		$("#preaload").hide();
		map.fitBounds(traveltime.getBounds());
         var limitesIsocrona = traveltime.getBounds();
        distanciaIsocrona = encontrarDistancia(limitesIsocrona)/2;
        
        if(enFiltro == true){
            distanciaIsocrona = distanciaIsocrona*0.6;
            lugaresCercanos(); 
        }else{
            distanciaIsocrona = distanciaIsocrona*0.8;
            setTimeout(function(){
                sitiosCerca(posicionSedeActual)},anima);    
        }
	});	
    
    traveltime.on('ready',function(){  
        var limitesIsocrona = traveltime.getBounds();
        distanciaIsocrona = encontrarDistancia(limitesIsocrona)/2 - limitesIsocrona*0.1;
    })
   
			
   
		traveltime.on('error', function (){
			$("#preaload").hide();
			//mensaje("¡Error!","No se pudo dibujar la isócrona. Inténtelo de nuevo con otros parámetros");    
		});    
	
    
    
	switch(tipoIsocrona){
		case 1:
			traveltime.setMode(walkscore.TravelTime.Mode.DRIVE);
            traveltime.setCongestion(true);
			break;
			
		case 2:
            traveltime.setMode(walkscore.TravelTime.Mode.BIKE);
            traveltime.setCongestion(false);
			break;    
		case 3:
			traveltime.setMode(walkscore.TravelTime.Mode.WALK);
            traveltime.setCongestion(false);
			break;  
	} 
    
}

function encontrarDistancia(limites){
	if(limites != undefined){
        var x1 = new google.maps.LatLng(limites.getNorthEast().lat(),limites.getNorthEast().lng());	
        var x2 = new google.maps.LatLng(limites.getSouthWest().lat(), limites.getSouthWest().lng());
        var distancia = Math.round(google.maps.geometry.spherical.computeDistanceBetween(x1, x2));
        return distancia;
    }
}

function showVal(valor){
	$("#sliderisocronas p").text(valor+ " Minutos");
	//traveltime.setTime(valor);
}

function modo(tipo, num){
	tipoIsocrona = tipo; 
    var mode= "";
	
	modoIsocrona = tipo;
	if(num == 0){
		num = "";
	}
	switch(tipo)
	{
		case 1:
			$("#drive" + num + "").css("background-image","url(imagenes/carro2.png)");
			$("#bicycle" + num + "" ).css("background-image","url(imagenes/bici1.png)");
			$("#caminar" + num + "").css("background-image","url(imagenes/camina1.png)");
			
			break;
			
		case 2:

			$("#drive" + num + "").css("background-image","url(./imagenes/carro1.png)");
			$("#bicycle" + num + "").css("background-image","url(./imagenes/bici2.png)");
			$("#caminar" + num + "").css("background-image","url(./imagenes/camina1.png)");
			break;    
		case 3:
   
			$("#drive" + num + "").css("background-image","url(imagenes/carro1.png)");
			$("#bicycle" + num + "").css("background-image","url(imagenes/bici1.png)");
			$("#caminar" + num + "").css("background-image","url(imagenes/camina2.png)");
			break;  
	}
    if(num  !=2){
        switch(tipo){
            case 1: 
                traveltime.setMode(walkscore.TravelTime.Mode.DRIVE);
                break;
            case 2: 
                traveltime.setMode(walkscore.TravelTime.Mode.BIKE);
                break;    
            case 3:
                traveltime.setMode(walkscore.TravelTime.Mode.WALK);
                break;
        }
    }
}

$("#minutos2").click(function(){
    traveltime.setTime($("#minutos2").val());
    $("#pminutos2").text($("#minutos2").val() + " minutos");
})


