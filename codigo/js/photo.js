$(document).ready(function () {
	
	$('#form').ajaxForm(function(data) { 
        console.log(data);
		$("#botonload").hide(500); 
		if(data == true){  
		}
		else{
			alert("Error al subir la foto de perfil");
		}
    });	
	
	$('#form1').ajaxForm(function(data) { 
		$("#seccionPerfil #botonload").hide(500); 
		if(data == true){  
		}
		else{
			alert("Error al subir la foto de perfil");
		}
    });	
	
	
	//Function for preview image.
    function imageIsLoaded(e) {

        $('#seccionFoto #fotoUsuarioMask').css("background-image", "url(" + e.target.result + ")");  
        $("#seccionFoto #botonload").show(500);   
		
    }
		//Function for preview image.
    function imageIsLoaded2(e) {
		//console.log(e.target.result )
        $('#seccionPerfil #fotoUsuarioMask').css("background-image", "url(" + e.target.result + ")");  
        $("#seccionPerfil #botonload").show(500);   
    }
    
    $(function () {
        $("#file").change(function () {
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = imageIsLoaded;
                reader.readAsDataURL(this.files[0]);	
            }
        });
		$("#file2").change(function () {
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = imageIsLoaded2;
                reader.readAsDataURL(this.files[0]);		
            }
        });
    });
	
   /* $('#contactoVentana').ajaxForm(function(data) { 
        console.log(data); 
    });*/
   
});


/*


console.log(encodeURI(urlregistro));
			d3.json(encodeURI(urlregistro), function(error, data) {
				console.log(data);	
				if(data[1] == "true"){
					alert(data[2]);						
				}
				else{
					alert("Error \n" + data[2]);
				}
			});	
*/