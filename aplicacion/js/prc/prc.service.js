angular.module('vacunaService', []).
factory('Vacuna', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findById = findById;
	service.findByMasc = findByMasc;
    service.borrar = borrar;
    service.activar = activar;
    service.insertar = insertar;
    service.actualizar = actualizar;

    function findAll(callback){
        $http.get(URL_API + '/servicios/sec/sec_opcion.php?accion=C').
        then(function(response) {
           callback(response);
        });
    };
	
	function findByMasc(idMasc, callback){
		var url =URL_API + '/servicios/sec/sec_opcion.php?accion=C&padre=1&estado=A&id_opc_ppal='+idMasc;
		console.log(url);
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(id, callback){
		var url = URL_API + '/servicios/sec/sec_opcion.php?accion=C&id=' + idOpcion;

        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(id, usuario, callback){
        $http.post(URL_API + '/servicios/sec/sec_opcion.php?accion=D&id=' + id + '&user=' + usuario, id).
        then(function(response) {
           callback(response);
        });
    };
	
	function activar(id, usuario, callback){
        $http.post(URL_API + '/servicios/sec/sec_opcion.php?accion=A&id=' + id + '&user=' + usuario, id).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(opcion, callback){
		
        var idOpcPadre = '';
        var padre = 0;
        if(opcion.id_opc_padre.trim().length>0){
            idOpcPadre = opcion.id_opc_padre;
        }
		else{
			idOpcPadre = null;
		}
		
		if(opcion.id_opc_padre!=null && opcion.padre.trim().length>0){
            padre = opcion.padre;
        }
		else{
			padre = 0;
		}
		
		var url=URL_API + '/servicios/sec/sec_opcion.php?accion=I'+
		'&id_opc_ppal=' + opcion.id_opc_ppal + 
        '&id_opc_padre=' + idOpcPadre +
        '&padre=' + padre +
        '&desc=' + opcion.descripcion +
        '&url=' + opcion.url +        
        '&orden=' + opcion.orden +        
        '&user=' + opcion.usuario +
		'&estado=' + opcion.estado;
		
        $http.post(url ,opcion).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(opcion, callback){
        
        var idOpcPadre = '';
        var padre = 0;
		 if(opcion.id_opc_padre!=null && opcion.id_opc_padre.trim().length>0){
            idOpcPadre = opcion.id_opc_padre;
        }
		else{
			idOpcPadre = null;
		}
		
		if(opcion.padre!=null && opcion.padre.trim().length>0){
            padre = opcion.padre;
        }
		else{
			padre = 0;
		}
		var url = URL_API + '/servicios/sec/sec_opcion.php?accion=U'+
		'&id=' + opcion.id + 
        '&id_opc_ppal=' + opcion.id_opc_ppal + 
        '&id_opc_padre=' + idOpcPadre +
        '&padre=' + padre +
        '&desc=' + opcion.descripcion +
        '&url=' + opcion.url +        
        '&orden=' + opcion.orden +        
        '&user=' + opcion.usuario +        
        '&estado=' + (opcion.estado?'A':'I');
		
        $http.post(url
        ,opcion).
        then(function(response) {
            callback(response);
         });
    };

    return service;
  
}).service('popupService', function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});

angular.module('mascService', []).
factory('Masc', function($http, URL_API){

    var service = {};

    service.findAlls = findAlls;
    service.borrar = borrar;
    service.activar = activar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findByCo = findByCo;
    service.findById = findById;
    service.findAllA = findAllA; 
    /*    service.getUser = getUser;

   function getUser(usuario, callback) {

        $http.get(URL_API + '/servicios/usuario.php?accion=C&usr=' + usuario).
        then(function(response) {
           
            callback(response);
        });
    
    };*/

    function findAlls(callback){
    	var url = URL_API + '/servicios/prc/prc_mascota.php?accion=C';
		
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/prc/prc_mascota.php?accion=C&estado=A';
		
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
    function findById(mascId, callback){
		var url = URL_API + '/servicios/prc/prc_mascota.php?accion=C&id=' + mascId ;
		
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findByCo(mascId, callback){
		var url = URL_API + '/servicios/prc/prc_mascota.php?accion=C&codigo=' + mascId ;
		
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	

    function borrar(mascId,usuario, callback){
		var url = URL_API + '/servicios/prc/prc_mascota.php?accion=D&id=' + mascId
        +'&user='+usuario;
		
		//console.log(url);
        $http.post(url, mascId).
        then(function(response) {
           callback(response);
        });
    };
	
	function activar(mascId, usuario, callback){
		var url = URL_API + '/servicios/prc/prc_mascota.php?accion=A&id=' + mascId
        +'&user='+usuario;
		
		//console.log(url);
        $http.post(url, mascId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(usuario, callback){
		var url = URL_API + '/servicios/prc/prc_mascota.php?accion=I'+
		'&dueno=' + usuario.dueno + 
		'&tpmascota=' + usuario.tpmascota + 
		'&muni=' + usuario.muni + 
		'&direccion=' + usuario.direccion + 
        '&estadodir=' + usuario.estadodir + 
        '&nmasc=' + usuario.nmasc + 
        '&codigo=' + usuario.codigo + 
        '&nacim=' + usuario.nacim + 
        '&foto=' + usuario.foto + 
		'&estado=' + usuario.estado +
		'&user=' + usuario.usuario ;
		
        $http.post(url, usuario).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(usuario, callback){
		var url = URL_API + '/servicios/prc/prc_mascota.php?accion=U'+
		'&id=' + usuario.id +
		'&tpmascota=' + usuario.tpmascota + 
		'&muni=' + usuario.muni + 
		'&direccion=' + usuario.direccion + 
        '&estadodir=' + usuario.estadodir + 
        '&nmasc=' + usuario.nmasc + 
        '&codigo=' + usuario.codigo + 
        '&nacim=' + usuario.nacim + 
        '&foto=' + usuario.foto + 
		'&estado=' + usuario.estado +
		'&user=' + usuario.usuario ;
		
		//console.log(url);
        $http.post(url, usuario).
        then(function(response) {
            callback(response);
         });
    };

    return service;
  
}).service('popupService', function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});

