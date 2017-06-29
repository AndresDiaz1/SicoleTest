var createFocusTrap = require('../node_modules/focus-trap');
var focusTrapLogInDialog;

var focusTypeOfSearch = createFocusTrap('#ventanaTipoBusqueda', {
    onActivate: function () {
    },
    onDeactivate: function () {
        onCloseSearchTypeMenu();
    },
    initialFocus: '#tipoDeBusqueda',
    clickOutsideDeactivates:true
});

window.returnFocusTypeOfSearch=function(){
    return focusTypeOfSearch;
};


var focusTrapLogInMenu = createFocusTrap('#menulogueo', {
    onActivate: function () {
    },
    onDeactivate: function () {
        var login = $("#menulogueo");
        onCloseLogInMenu(login);
        if(isRegisterFormVisible){
            $("#registerTitle").focus();
        }else{
            $("#registrarse").focus();
        }
    },
    initialFocus: '#registrarse',
    returnFocusOnDeactivate:false,
    clickOutsideDeactivates:true
});

document.getElementById('registrarse').addEventListener('click', function () {
    focusTrapLogInMenu.activate();
});

window.returnFocusTrapLogInMenu=function(){
    return focusTrapLogInMenu;
};

var focusTrapHelpMenu = createFocusTrap('#menuAyuda', {
    onActivate: function () {
    },
    onDeactivate: function () {
        onCloseHelpMenu();
    },
    initialFocus: '#iconoAyuda',
    returnFocusOnDeactivate:false,
    clickOutsideDeactivates:true
});

document.getElementById('iconoAyuda').addEventListener('click', function () {
    focusTrapHelpMenu.activate();
});

window.returnFocusTrapHelpMenu=function(){
    return focusTrapHelpMenu;
};

var focusTrapHamburgMenu = createFocusTrap('#menuSesionIniciada', {
    onActivate: function () {

    },
    onDeactivate: function () {
        onClickHamburgMenu();
    },
    initialFocus: '#menuHamburguesa',
    returnFocusOnDeactivate:false,
    clickOutsideDeactivates:true
});

document.getElementById('menuHamburguesa').addEventListener('click', function () {
    focusTrapHamburgMenu.activate();
});

window.returnFocusTrapHelpMenu=function(){
    return focusTrapHamburgMenu;
};

var focusTrapRightPnaleSchoolsNearMenu = createFocusTrap('#ventanaCategoriasDer', {
    onActivate: function () {

    },
    onDeactivate: function () {
        onClickCloseRighNearSchoolsPanel();
    },
    initialFocus: '#tituloColegiosCercanos',
    clickOutsideDeactivates:true
});

document.getElementById('menuDesplegableDer').addEventListener('click', function () {
    focusTrapRightPnaleSchoolsNearMenu.activate();
});

var focusTrapLeftPanelMenu = createFocusTrap('#ventanaCategoriasIzq', {
    onActivate: function () {

    },
    onDeactivate: function () {

    },
    returnFocusOnDeactivate:false,
    clickOutsideDeactivates:true
});

document.getElementById('menuDesplegableIzq').addEventListener('click', function () {
    focusTrapLeftPanelMenu.activate();
});

window.returnFocusTrapLeftPanelMenu=function(){
    return focusTrapLeftPanelMenu;
};

var focusTrapRegisterForm = createFocusTrap('#barraSesion', {
    onActivate: function () {

    },
    onDeactivate: function () {
        closeRegisterForm();
    },
    returnFocusOnDeactivate:false,
    clickOutsideDeactivates:true
});

document.getElementById('crearCuenta').addEventListener('click', function () {
    focusTrapRegisterForm.activate();
});

window.returnFocusTrapRegisterForm=function(){
    return focusTrapRegisterForm;
};

var focusTrapPhotoForm = createFocusTrap('#barraSesion', {
    onActivate: function () {

    },
    onDeactivate: function () {
    },
    returnFocusOnDeactivate:false,
    clickOutsideDeactivates:true
});

window.returnFocusTrapPhotoForm=function(){
    return focusTrapPhotoForm;
};

var focusTrapLogInForm =  createFocusTrap('#barraSesion', {
    onActivate: function () {
    },
    onDeactivate: function () {
        if(hasRegisterLinkBeenPressed){
            crearCuentaUsuario();
        }else{
            closeLoginForm();
        }

    },
    returnFocusOnDeactivate:false,
    clickOutsideDeactivates:true
});

document.getElementById('ingresarUsuario').addEventListener('click', function () {
    focusTrapLogInForm.activate();
});

window.returnFocusTrapLogInForm=function(){
    return focusTrapLogInForm;
};

var focusTrapContactForm =  createFocusTrap('#barraSesion', {
    onActivate: function () {
    },
    onDeactivate: function () {
        onClickCloseRighNearSchoolsPanel();
        $("#iconoAyuda").focus()
    },
    returnFocusOnDeactivate:false,
    clickOutsideDeactivates:true
});

document.getElementById('contacto').addEventListener('click', function () {
    focusTrapContactForm.activate();
});

var focusTrapAboutForm =  createFocusTrap('#barraSesion', {
    onActivate: function () {
    },
    onDeactivate: function () {
        onClickCloseRighNearSchoolsPanel();
        $("#iconoAyuda").focus()
    },
    returnFocusOnDeactivate:false,
    clickOutsideDeactivates:true
});

document.getElementById('acercade').addEventListener('click', function () {
    focusTrapAboutForm.activate();
});

window.createFocusTrapLogInDialog=function(){
     focusTrapLogInDialog =  createFocusTrap('.jconfirm-box', {
        onActivate: function () {

        },
        onDeactivate: function () {
            if(isUserLoggedIn){
                $("#contenedorLogin").focus();
            }else{
                $("#registrarse").focus();
            }
        },
        returnFocusOnDeactivate:false,
        clickOutsideDeactivates:true
    });
}

window.returnFocusTrapLogInDialog=function(){
    return focusTrapLogInDialog;
};


var focusTrapAddSchoolOnRegister =  createFocusTrap('#agregarSede', {
    onActivate: function () {
    },
    onDeactivate: function () {

    },
    returnFocusOnDeactivate:false,
    clickOutsideDeactivates:true
});

window.returnFocusTrapAddSchoolOnRegister=function(){
    return focusTrapAddSchoolOnRegister;
};

var focusTrapSchoolSchedules =  createFocusTrap('#contenedorJornadas', {
    onActivate: function () {
    },
    onDeactivate: function () {

    },
    returnFocusOnDeactivate:false,
    clickOutsideDeactivates:true
});

window.returnFocusTrapSchoolSchedules=function(){
    return focusTrapSchoolSchedules;
};

var focusTrapDeleteSchoolPopUp =  createFocusTrap('#containerPopUpConfirmar', {
    onActivate: function () {
    },
    onDeactivate: function () {

    },
    returnFocusOnDeactivate:false,
    clickOutsideDeactivates:true
});

window.returnFocusTrapDeleteSchoolPopUp=function(){
    return focusTrapDeleteSchoolPopUp;
};

var focusTrapUpdateForm =  createFocusTrap('#formularioActualizar', {
    onActivate: function () {
    },
    onDeactivate: function () {

    },
    returnFocusOnDeactivate:false,
    clickOutsideDeactivates:true
});

window.returnFocusTrapUpdateForm=function(){
    return focusTrapUpdateForm;
};

var focusTrapTellUsAboutYourSchool =  createFocusTrap('#sedeCuentanos', {
    onActivate: function () {
    },
    onDeactivate: function () {
        $("#barraSesion").hide(anima);
        $("#botonPlegar2").hide(anima);
        $("#menuHamburguesa").focus();
    },
    returnFocusOnDeactivate:false,
    clickOutsideDeactivates:true
});

window.returnFocusTrapTellUsAboutYourSchool=function(){
    return focusTrapTellUsAboutYourSchool;
};

var focusTrapSurveyForm =  createFocusTrap('#barraSesion', {
    onActivate: function () {
    },
    onDeactivate: function () {
        $("#barraSesion").hide(anima);
        $("#botonPlegar2").hide(anima);
        $("#menuHamburguesa").focus();
    },
    returnFocusOnDeactivate:false,
    clickOutsideDeactivates:true
});

window.returnFocusTrapSurveyForm=function(){
    return focusTrapSurveyForm;
};

var focusTraFavoriteSchools =  createFocusTrap('#barraSesion', {
    onActivate: function () {
    },
    onDeactivate: function () {

    },
    returnFocusOnDeactivate:false,
    clickOutsideDeactivates:true
});

window.returnFocusTraFavoriteSchools=function(){
    return focusTraFavoriteSchools;
};

var focusTrapInfoSchool =  createFocusTrap('#infoColeEsp', {
    onActivate: function () {
    },
    onDeactivate: function () {
        $("#infoColeEsp").hide(anima);
        $("#botonPlegar2").hide(anima);
        $("#inputBusqueda").focus();
    },
    returnFocusOnDeactivate:false,
    clickOutsideDeactivates:true
});

window.returnFocusTrapInfoSchool=function(){
    return focusTrapInfoSchool;
};

var focusTrappopUpFotoCole =  createFocusTrap('#popUpFotoCole', {
    onActivate: function () {
    },
    onDeactivate: function () {

    },
    returnFocusOnDeactivate:false,
    clickOutsideDeactivates:true
});

window.returnFocusTrappopUpFotoCole=function(){
    return focusTrappopUpFotoCole;
};

var focusTrapSicoleSearchPanel =  createFocusTrap('#busqueda', {
    onActivate: function () {
    },
    onDeactivate: function () {

    },
    returnFocusOnDeactivate:false,
    clickOutsideDeactivates:true
});

window.returnFocusTrapSicoleSearchPanel=function(){
    return focusTrapSicoleSearchPanel;
};

var focusTrapNearSchoolsPanel =  createFocusTrap('#contenedorColegiosCercanos', {
    onActivate: function () {
    },
    onDeactivate: function () {
        isSearchingUsingSicoleType=false;
    },
    returnFocusOnDeactivate:false,
    clickOutsideDeactivates:true
});

window.returnFocusTrapNearSchoolsPanel=function(){
    return focusTrapNearSchoolsPanel;
};

var focusTrapTipsPopUp =  createFocusTrap('#landing', {
    onActivate: function () {
    },
    onDeactivate: function () {
    },
    returnFocusOnDeactivate:false,
    clickOutsideDeactivates:true
});

window.returnFocusTrapTipsPopUp=function(){
    return focusTrapTipsPopUp;
};


var focusTrapLoginMenuFromLanding =  createFocusTrap('#iniciar', {
    onActivate: function () {
    },
    onDeactivate: function () {
        var login = $("#barraSesion");
        onCloseLogInMenu(login);
        $("#registrarse").focus();
    },
    returnFocusOnDeactivate:false,
    clickOutsideDeactivates:true
});

window.returnfocusTrapLoginMenuFromLanding=function(){
    return focusTrapLoginMenuFromLanding;
};






