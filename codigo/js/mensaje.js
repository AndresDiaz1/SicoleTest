function mensaje(title1, content1){
   $.alert({
		title: title1,
		content: content1,
		confirmButton: 'Aceptar',
		confirm: function () {
			try{
                var focusTrapLogInDialog=returnFocusTrapLogInDialog();
                focusTrapLogInDialog.deactivate();
			}catch(e){}

			try{
                var focusTrapRegisterForm=returnFocusTrapRegisterForm();
                focusTrapRegisterForm.unpause();
			}catch(e){}

			if(isUserLoggedIn && !isOnAddScheduleShool){
				$("#contenedorLogin").focus();
			}

            if(isUserLoggedIn && isOnAddScheduleShool){
                $("#SchedulesSchoolTitle").focus();
            }

            if(isUserLoggedIn && isOnAddScheduleShool){
                $("#SchedulesSchoolTitle").focus();
            }

            if(isOnUpdateInfo && !isAnErrorOnUpdateData){
                isOnUpdateInfo=false;
                $("#tituloNombre").focus();
                var focusTrapPhotoForm=returnFocusTrapPhotoForm();
                focusTrapPhotoForm.activate();
            }

            if(isOnUpdateInfo && isAnErrorOnUpdateData){
                isOnUpdateInfo=true;
                $("#updateDataTitle").focus();
                var focusTrapUpdateForm=returnFocusTrapUpdateForm();
                focusTrapUpdateForm.activate();
            }

            if(isSearchingUsingSicoleType){
                $("#advancedOptionsSearch").focus();
                var focusTrapSicoleSearchPanel=returnFocusTrapSicoleSearchPanel();
                focusTrapSicoleSearchPanel.activate();
            }

            if(hasPressedDownloadReport){
                var focusTrapLeftPanelMenu=returnFocusTrapLeftPanelMenu();
                focusTrapLeftPanelMenu.unpause();
                $("#descargarReporte").focus();
                hasPressedDownloadReport=false;
            }
		}
	});
}

if(document.getElementById("influence"))
    {
        
        alert("ouais");
    }
