var google = {
    maps : {
        OverlayView : function () {
        },
        Marker : function () {
        },
        InfoWindow : function () {
        },
        LatLng: function(lat, lng){
            return [lat, lng];
        },
        Map: function(obj){
            return {Map:'map'}
        },
        LatLngBounds: function(){

        },
        StreetViewCoverageLayer:function(){

        },
        Animation : function(){},
        MapTypeId: {ROADMAP: true},
        places: {
            AutocompleteService: function(){

            },
            Autocomplete:function(x,y){
                return {
                    addListener:function(){}
                }
            },
            PlacesService: function(obj){
                return {
                    PlacesServiceStatus: {
                        OK: true
                    },
                    textSearch: function(query){
                        return [];
                    },
                    nearbySearch: function(query){
                        return [];
                    }
                };
            }
        }
    }
};