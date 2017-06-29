window.showLanding=function(){

    var id = '#landing';

    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    $('#mask').css({'width':maskWidth,'height':maskHeight});

    $('#mask').fadeIn(500);
    $('#mask').fadeTo("slow",0.9);

    var winH = $(window).height();
    var winW = $(window).width();

    $(id).css('top',  winH/2-$(id).height()/2);
    $(id).css('left', winW/2-$(id).width()/2);

    $(id).fadeIn(500);

    $('.window .close').click(function (e) {
        closeLanding(e);
    });

    $('#mask').click(function () {
        $(this).hide();
        $('.window').hide();
    });

    $("#botonPlegar2").hide();

};

window.closeLanding=function(e){
    $("#botonPlegar2").hide();
    try{
        e.preventDefault();
    }catch (error){

    }

    $('#mask').hide();
    $('.window').hide();
}

function onClickCloseLandingpage(){
    $("#iconoAyuda").attr("aria-expanded", "false");
    $("#menuAyuda").hide(anima);
    closeLandingFocusTrap();
    closeLanding();
    $("#inputBusqueda").focus();
}

function onClickLaningFrommenu(){
    showLanding();
    var focusTrapTipsPopUp=returnFocusTrapTipsPopUp();
    focusTrapTipsPopUp.activate();
}

function openRegisterMenu(){
    closeLandingFocusTrap();
    closeLanding();
    crearCuentaUsuario();
    $("#registerTitle").focus();
    var focusTrapRegisterForm=returnFocusTrapRegisterForm();
    focusTrapRegisterForm.activate();
}

function openloginMenu(){
    closeLandingFocusTrap();
    closeLanding();
    onClickLogIn();
    $("#LoginTitle").focus();
    var focusTrapLogInMenu=returnfocusTrapLoginMenuFromLanding();
    focusTrapLogInMenu.activate();
}

function closeLandingFocusTrap(){
    var focusTrapTipsPopUp=returnFocusTrapTipsPopUp();
    focusTrapTipsPopUp.deactivate();
}