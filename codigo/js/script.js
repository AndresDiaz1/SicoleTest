// Code goes here
	var contador = 0;
			var app = {
			  initialize: function() {
					this.loader = new LoaderJS('0.0.1');
					this.loader.require({walkScore:'http://apicdn.walkscore.com/api/v1/traveltime/js?wsid=8a2fb5b52be7a7c2da9a291288a9f99f'},this.onReady, this.error);
					
					
			  },
			  onReady: function() {
			  contador++;
			  console.log(contador);
				this.loader2 = new LoaderJS('0.0.1');
				this.loader2.require({walkScore2:'http://apicdn.walkscore.com/api/v1/traveltime_widget/js?wsid=8a2fb5b52be7a7c2da9a291288a9f99f'},this.onReady2, this.error);
			},
			  bindEvents: function() {
					$('a').click(app.clickHandler);
			  },
			  clickHandler: function(el) {
					var toLoad = {};
					toLoad["s{0}".format(($(this).index() + 1))] = "s{0}.js".format(($(this).index() + 1));
					app.loader.require(toLoad, app.callRender);
			  },
			  callRender: function(modulos) {
			    console.log(modulos,'loaded');
				for(var fn in modulos) modulos[fn].render();
			  },
			  
			  error:function(){
				alert("oauis");
			  }
			};
app.initialize();