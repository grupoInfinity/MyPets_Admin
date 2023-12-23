
angular.module('authorizationService',[]).
    factory('Authorization', function($http, URL_API){
    	
   	 var service = {};
	 
     service.GetOpcionesPpal = GetOpcionesPpal;
     service.GetOpciones = GetOpciones;
     
     function GetOpcionesPpal(usuario, callback) {
		  var url=URL_API + '/servicios/sec/sec_opc_rol.php?accion=OP&user=' + usuario;
		  
		  //console.log("1 "+url);
	      $http.get(url).
	      then(function(response) {
	          callback(response);
	      });	
     };

     function GetOpciones(usuario, callback) {
		var url = URL_API + '/servicios/sec/sec_opc_rol.php?accion=OU&user=' + usuario;
		//console.log("2 "+url);
	    $http.get(url).
	      then(function(response) {
	          callback(response);
	      });	
     	
     };
        
     return service;
});