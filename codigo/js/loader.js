(function(window) {
  "use strict";
  /**
   * Clase que permite carga asíncrona de archivos js
   * @class LoaderJS
   * @constructor {string} version - Version que se le asignara a los archivos js para la caché
   * Ejemplo: new LoaderJS('0.0.3').require({angular:'js/angular.js'});
   */
window.LoaderJS = function(version) {
	var className = 'LoaderJS';
	this.version = version || '0.0.1';
	this.totalRequired = 0;
	this.fails = [];
	var _this = this;
	this.callback = function(modrequests) { console.log("{0}: {1}".format(className,"All scripts were loaded")); };
	this.onError = function() { console.log("{0}: {1} [{2}]".format(className,"Some scripts were not loaded",this.fails.toString()));};
	
	/**
	 * Función que hace la petición de los archivos JS
	 * @param {Object} scripts - Objeto con los archivos JS y nombre del módulo, ej {jquery:'jquery.js'}
	 * @param {function} callback - Función que se ejecutará cuando la carga sea satisfactoia
	 * @param {function} onError - Función que se ejecutará cuando al menos 1 archivo no sea cargado
	 */
	this.require = function(scripts, callback, onError) {		
		cacheLJS.modrequests = {};
		this.fails = [];
		this.totalRequired = 0;
		this.callback = callback || this.callback;
		this.onError = onError || this.onError;
		for(var mod in scripts) {
		  this.totalRequired++;
		  cacheLJS.modrequests[mod] = false;
		  if(cacheLJS.scripts.hasOwnProperty(mod)) {
			onFinish(mod);
		  } else {
			  writeScript(mod, scripts[mod] + '?' + this.version);
		  }
		}
	}
	
	var writeScript = function(modname, src) {
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.async = true;
		s.src = src;
		s.onload = function (e) { onFinish(modname); };
		s.addEventListener("error", function() { onErrorLoad(src); });
		(document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(s);
	}
	
	var onErrorLoad = function(src) {
		_this.fails.push(src);
		onFinish();
	}
	
	var onFinish = function(moduleName) {
	  if(moduleName) {	  
	    cacheLJS.modrequests[moduleName] = cacheLJS.scripts[moduleName];
	  }
		_this.totalRequired--;
		if(!_this.totalRequired) {
			if(_this.fails.length) {
				_this.onError();
			} else {
				_this.callback(cacheLJS.modrequests);
			}
		}		
	}
};

/**
 * Función para definir los módulos que serán cargados
 * @param {string} nombre del módulo
 * @param {Object} objeto de la función
 */
window.defineJS = function(name, fn) {
  cacheLJS.scripts[name] = fn;
}
  
var cacheLJS = {
  scripts : {},     //Cache all modules
  modrequests: {}   //Modules requested
}

})(window);