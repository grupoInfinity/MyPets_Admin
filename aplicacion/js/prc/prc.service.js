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
        $http.get(URL_API + '/servicios/prc/prc_vacuna.php?accion=C').
        then(function(response) {
           callback(response);
        });
    };
	
	function findByMasc(idMasc, callback){
		var url =URL_API + '/servicios/prc/prc_vacuna.php?accion=C&idmasc='+idMasc;
		console.log(url);
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(id, callback){
		var url = URL_API + '/servicios/prc/prc_vacuna.php?accion=C&id=' + id;

        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(id, callback){
        $http.post(URL_API + '/servicios/prc/prc_vacuna.php?accion=D&id=' + id, id).
        then(function(response) {
           callback(response);
        });
    };
	
	/*function activar(id, usuario, callback){
        $http.post(URL_API + '/servicios/prc/prc_vacuna.php?accion=A&id=' + id + '&user=' + usuario, id).
        then(function(response) {
           callback(response);
        });
    };*/

    function insertar(vacuna, callback){
		
		var url=URL_API + '/servicios/prc/prc_vacuna.php?accion=I'+
		'&idmasc=' + vacuna.idmasc + 
        '&idtpvac=' + vacuna.idtpvac +       
        '&user=' + vacuna.usuario;
		
        $http.post(url ,vacuna).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(vacuna, callback){
        
		var url = URL_API + '/servicios/prc/prc_vacuna.php?accion=U'+
		'&idmasc=' + vacuna.idmasc + 
        '&idtpvac=' + vacuna.idtpvac +       
        '&user=' + vacuna.usuario;
		
        $http.post(url,vacuna).
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


//////*********//////////////////MASCOTA SERVICE /////////////////**********////////

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

