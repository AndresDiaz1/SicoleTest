(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
        console.log("Se activa")
    },
    onDeactivate: function () {
        console.log("Se cierra");
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







},{"../node_modules/focus-trap":2}],2:[function(require,module,exports){
var tabbable = require('tabbable');

var listeningFocusTrap = null;

function focusTrap(element, userOptions) {
  var tabbableNodes = [];
  var nodeFocusedBeforeActivation = null;
  var active = false;
  var paused = false;

  var container = (typeof element === 'string')
    ? document.querySelector(element)
    : element;

  var config = userOptions || {};
  config.returnFocusOnDeactivate = (userOptions && userOptions.returnFocusOnDeactivate !== undefined)
    ? userOptions.returnFocusOnDeactivate
    : true;
  config.escapeDeactivates = (userOptions && userOptions.escapeDeactivates !== undefined)
    ? userOptions.escapeDeactivates
    : true;

  var trap = {
    activate: activate,
    deactivate: deactivate,
    pause: pause,
    unpause: unpause,
  };

  return trap;

  function activate(activateOptions) {
    if (active) return;

    var defaultedActivateOptions = {
      onActivate: (activateOptions && activateOptions.onActivate !== undefined)
        ? activateOptions.onActivate
        : config.onActivate,
    };

    active = true;
    paused = false;
    nodeFocusedBeforeActivation = document.activeElement;

    if (defaultedActivateOptions.onActivate) {
      defaultedActivateOptions.onActivate();
    }

    addListeners();
    return trap;
  }

  function deactivate(deactivateOptions) {
    if (!active) return;

    var defaultedDeactivateOptions = {
      returnFocus: (deactivateOptions && deactivateOptions.returnFocus !== undefined)
        ? deactivateOptions.returnFocus
        : config.returnFocusOnDeactivate,
      onDeactivate: (deactivateOptions && deactivateOptions.onDeactivate !== undefined)
        ? deactivateOptions.onDeactivate
        : config.onDeactivate,
    };

    removeListeners();

    if (defaultedDeactivateOptions.onDeactivate) {
      defaultedDeactivateOptions.onDeactivate();
    }

    if (defaultedDeactivateOptions.returnFocus) {
      setTimeout(function () {
        tryFocus(nodeFocusedBeforeActivation);
      }, 0);
    }

    active = false;
    paused = false;
    return this;
  }

  function pause() {
    if (paused || !active) return;
    paused = true;
    removeListeners();
  }

  function unpause() {
    if (!paused || !active) return;
    paused = false;
    addListeners();
  }

  function addListeners() {
    if (!active) return;

    // There can be only one listening focus trap at a time
    if (listeningFocusTrap) {
      listeningFocusTrap.pause();
    }
    listeningFocusTrap = trap;

    updateTabbableNodes();
    tryFocus(firstFocusNode());
    document.addEventListener('focus', checkFocus, true);
    document.addEventListener('click', checkClick, true);
    document.addEventListener('mousedown', checkPointerDown, true);
    document.addEventListener('touchstart', checkPointerDown, true);
    document.addEventListener('keydown', checkKey, true);

    return trap;
  }

  function removeListeners() {
    if (!active || listeningFocusTrap !== trap) return;

    document.removeEventListener('focus', checkFocus, true);
    document.removeEventListener('click', checkClick, true);
    document.removeEventListener('mousedown', checkPointerDown, true);
    document.removeEventListener('touchstart', checkPointerDown, true);
    document.removeEventListener('keydown', checkKey, true);

    listeningFocusTrap = null;

    return trap;
  }

  function getNodeForOption(optionName) {
    var optionValue = config[optionName];
    var node = optionValue;
    if (!optionValue) {
      return null;
    }
    if (typeof optionValue === 'string') {
      node = document.querySelector(optionValue);
      if (!node) {
        throw new Error('`' + optionName + '` refers to no known node');
      }
    }
    if (typeof optionValue === 'function') {
      node = optionValue();
      if (!node) {
        throw new Error('`' + optionName + '` did not return a node');
      }
    }
    return node;
  }

  function firstFocusNode() {
    var node;
    if (getNodeForOption('initialFocus') !== null) {
      node = getNodeForOption('initialFocus');
    } else if (container.contains(document.activeElement)) {
      node = document.activeElement;
    } else {
      node = tabbableNodes[0] || getNodeForOption('fallbackFocus');
    }

    if (!node) {
      throw new Error('You can\'t have a focus-trap without at least one focusable element');
    }

    return node;
  }

  // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event
  function checkPointerDown(e) {
    if (config.clickOutsideDeactivates && !container.contains(e.target)) {
      deactivate({ returnFocus: false });
    }
  }

  function checkClick(e) {
    if (config.clickOutsideDeactivates) return;
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  function checkFocus(e) {
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    // Checking for a blur method here resolves a Firefox issue (#15)
    if (typeof e.target.blur === 'function') e.target.blur();
  }

  function checkKey(e) {
    if (e.key === 'Tab' || e.keyCode === 9) {
      handleTab(e);
    }

    if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
      deactivate();
    }
  }

  function handleTab(e) {
    e.preventDefault();
    updateTabbableNodes();
    var currentFocusIndex = tabbableNodes.indexOf(e.target);
    var lastTabbableNode = tabbableNodes[tabbableNodes.length - 1];
    var firstTabbableNode = tabbableNodes[0];

    if (e.shiftKey) {
      if (e.target === firstTabbableNode || tabbableNodes.indexOf(e.target) === -1) {
        return tryFocus(lastTabbableNode);
      }
      return tryFocus(tabbableNodes[currentFocusIndex - 1]);
    }

    if (e.target === lastTabbableNode) return tryFocus(firstTabbableNode);

    tryFocus(tabbableNodes[currentFocusIndex + 1]);
  }

  function updateTabbableNodes() {
    tabbableNodes = tabbable(container);
  }
}

function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
}

function tryFocus(node) {
  if (!node || !node.focus) return;
  node.focus();
  if (node.tagName.toLowerCase() === 'input') {
    node.select();
  }
}

module.exports = focusTrap;

},{"tabbable":3}],3:[function(require,module,exports){
module.exports = function(el) {
  var basicTabbables = [];
  var orderedTabbables = [];

  // A node is "available" if
  // - it's computed style
  var isUnavailable = createIsUnavailable();

  var candidateSelectors = [
    'input',
    'select',
    'a[href]',
    'textarea',
    'button',
    '[tabindex]',
  ];

  var candidates = el.querySelectorAll(candidateSelectors);

  var candidate, candidateIndex;
  for (var i = 0, l = candidates.length; i < l; i++) {
    candidate = candidates[i];
    candidateIndex = parseInt(candidate.getAttribute('tabindex'), 10) || candidate.tabIndex;

    if (
      candidateIndex < 0
      || (candidate.tagName === 'INPUT' && candidate.type === 'hidden')
      || candidate.disabled
      || isUnavailable(candidate)
    ) {
      continue;
    }

    if (candidateIndex === 0) {
      basicTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        tabIndex: candidateIndex,
        node: candidate,
      });
    }
  }

  var tabbableNodes = orderedTabbables
    .sort(function(a, b) {
      return a.tabIndex - b.tabIndex;
    })
    .map(function(a) {
      return a.node
    });

  Array.prototype.push.apply(tabbableNodes, basicTabbables);

  return tabbableNodes;
}

function createIsUnavailable() {
  // Node cache must be refreshed on every check, in case
  // the content of the element has changed
  var isOffCache = [];

  // "off" means `display: none;`, as opposed to "hidden",
  // which means `visibility: hidden;`. getComputedStyle
  // accurately reflects visiblity in context but not
  // "off" state, so we need to recursively check parents.

  function isOff(node, nodeComputedStyle) {
    if (node === document.documentElement) return false;

    // Find the cached node (Array.prototype.find not available in IE9)
    for (var i = 0, length = isOffCache.length; i < length; i++) {
      if (isOffCache[i][0] === node) return isOffCache[i][1];
    }

    nodeComputedStyle = nodeComputedStyle || window.getComputedStyle(node);

    var result = false;

    if (nodeComputedStyle.display === 'none') {
      result = true;
    } else if (node.parentNode) {
      result = isOff(node.parentNode);
    }

    isOffCache.push([node, result]);

    return result;
  }

  return function isUnavailable(node) {
    if (node === document.documentElement) return false;

    var computedStyle = window.getComputedStyle(node);

    if (isOff(node, computedStyle)) return true;

    return computedStyle.visibility === 'hidden';
  }
}

},{}]},{},[1]);
