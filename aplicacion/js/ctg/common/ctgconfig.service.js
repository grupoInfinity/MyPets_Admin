//*****************************************APP***********************************************

//TIPO VEHICULO
angular.module('tipoVehiculoService', []).
factory('TipoVehiculo', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function activar(tipoVehiculoId, usuario, callback){
            $http.post(URL_API + '/servicios/ctg/ctg_tipo_vehiculo.php?accion=A&id=' + tipoVehiculoId + '&user=' + usuario, tipoVehiculoId).
            then(function(response) {
               callback(response);
            });
        };
        
    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_vehiculo.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_vehiculo.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };


    function findById(tipoVehiculoId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_tipo_vehiculo.php?accion=C&id=' + tipoVehiculoId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(tipoVehiculoId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_vehiculo.php?accion=D&id=' + tipoVehiculoId + '&user=' + usuario, tipoVehiculoId).
        then(function(response) {
           callback(response);
        });
    };
    

    function insertar(tipoVehiculo, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_vehiculo.php?accion=I&desc=' + tipoVehiculo.descripcion + '&user=' + tipoVehiculo.usuario, tipoVehiculo).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(tipoVehiculo, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_vehiculo.php?accion=U&id=' + tipoVehiculo.id + '&desc=' + tipoVehiculo.descripcion + '&estado=' + tipoVehiculo.estado + '&user=' + tipoVehiculo.usuario, tipoVehiculo).
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

//TIPO DE DOCUMENTO  
angular.module('tipoDocService', []).
factory('TipoDoc', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_doc.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_doc.php?accion=C&estado='+filtro.estado;
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(tipoDocId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_tipo_doc.php?accion=C&id=' + tipoDocId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(tipoDocId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_doc.php?accion=D&id=' + tipoDocId + '&user=' + usuario, tipoDocId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(tipoDocId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_doc.php?accion=A&id=' + tipoDocId + '&user=' + usuario, tipoDocId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(tipoDoc, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_doc.php?accion=I&desc=' + tipoDoc.descripcion + '&user=' + tipoDoc.usuario ,tipoDoc).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(tipoDoc, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_doc.php?accion=U'+
		'&id=' + tipoDoc.id + 
		'&desc=' + tipoDoc.descripcion + 
		'&estado=' + (tipoDoc.estado?'A':'I') +  
		'&user=' + tipoDoc.usuario ,tipoDoc).
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

//TIPO GASTO
angular.module('tipoGastoService', []).
factory('TipoGasto', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;
    
    
    function activar(tipoGastoId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_gasto.php?accion=A&id=' + tipoGastoId + '&user=' + usuario, tipoGastoId).
        then(function(response) {
           callback(response);
        });
    };

 
    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_gasto.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_gasto.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(tipoGastoId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_tipo_gasto.php?accion=C&id=' + tipoGastoId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(tipoGastoId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_gasto.php?accion=D&id=' + tipoGastoId + '&user=' + usuario, tipoGastoId).
        then(function(response) {
           callback(response);
        });
    };
    

    function insertar(tipoGasto, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_gasto.php?accion=I&desc=' + tipoGasto.descripcion + '&tipo=' + tipoGasto.tipo + '&user=' + tipoGasto.usuario ,tipoGasto).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(tipoGasto, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_gasto.php?accion=U'+
		'&id=' + tipoGasto.id + 
		'&desc=' + tipoGasto.descripcion + 
		'&estado=' + (tipoGasto.estado?'A':'I') +
		'&user=' + tipoGasto.usuario ,tipoGasto).
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

//TIPO GASTO RETACEO
angular.module('tipoGastoRetaceoService', []).
factory('TipoGastoRetaceo', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;
    
    
    function activar(tipoGastoId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_gasto_retaceo.php?accion=A&id=' + tipoGastoId + '&user=' + usuario, tipoGastoId).
        then(function(response) {
           callback(response);
        });
    };

 
    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_gasto_retaceo.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_gasto_retaceo.php?accion=C&estado='+filtro.estado;
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(tipoGastoId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_tipo_gasto_retaceo.php?accion=C&id=' + tipoGastoId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(tipoGastoId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_gasto_retaceo.php?accion=D&id=' + tipoGastoId + '&user=' + usuario, tipoGastoId).
        then(function(response) {
           callback(response);
        });
    };
    

    function insertar(tipoGasto, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_gasto_retaceo.php?accion=I&desc=' + tipoGasto.descripcion + '&user=' + tipoGasto.usuario ,tipoGasto).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(tipoGasto, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_gasto_retaceo.php?accion=U'+
		'&id=' + tipoGasto.id + 
		'&desc=' + tipoGasto.descripcion + 
		'&estado=' + (tipoGasto.estado?'A':'I') +
		'&user=' + tipoGasto.usuario ,tipoGasto).
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

//TIPO DE PRODUCTO  
angular.module('tipoProdService', []).
factory('TipoProd', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllA = findAllA;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_prod.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_prod.php?accion=C&estado=A';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_prod.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(tipoProdId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_tipo_prod.php?accion=C&id=' + tipoProdId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(tipoProdId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_prod.php?accion=D&id=' + tipoProdId + '&user=' + usuario, tipoProdId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(tipoProdId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_prod.php?accion=A&id=' + tipoProdId + '&user=' + usuario, tipoProdId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(tipoProd, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_prod.php?accion=I&desc=' + tipoProd.descripcion + '&user=' + tipoProd.usuario ,tipoProd).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(tipoProd, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_prod.php?accion=U'+
		'&id=' + tipoProd.id + 
		'&desc=' + tipoProd.descripcion + 
		'&estado=' + (tipoProd.estado?'A':'I') +
		'&user=' + tipoProd.usuario ,tipoProd).
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

//TIPO DE DOCUMENTO PARA EL PROVEEDOR   
angular.module('tipoDocProvService', []).
factory('TipoDocProv', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;
    
    
    function activar(tipoDocProvId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_doc_prov.php?accion=A&id=' + tipoDocProvId + '&user=' + usuario, tipoDocProvId).
        then(function(response) {
           callback(response);
        });
    };

   

    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_doc_prov.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_doc_prov.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(tipoDocProvId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_tipo_doc_prov.php?accion=C&id=' + tipoDocProvId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(tipoDocProvId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_doc_prov.php?accion=D&id=' + tipoDocProvId + '&user=' + usuario, tipoDocProvId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(tipoDocProv, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_doc_prov.php?accion=I&desc=' + tipoDocProv.descripcion + '&user=' + tipoDocProv.usuario ,tipoDocProv).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(tipoDocProv, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_doc_prov.php?accion=U'+
		'&id=' + tipoDocProv.id + 
		'&desc=' + tipoDocProv.descripcion + 
		'&estado=' + (tipoDocProv.estado?'A':'I') + 
		'&user=' + tipoDocProv.usuario ,tipoDocProv).
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

//CARGO
angular.module('cargoService', []).
factory('Cargo', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllA = findAllA;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;
    
    
    function activar(cargoId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_cargo.php?accion=A&id=' + cargoId + '&user=' + usuario, cargoId).
        then(function(response) {
           callback(response);
        });
    };


    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_cargo.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/ctg/ctg_cargo.php?accion=C&estado=A';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_cargo.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(cargoId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_cargo.php?accion=C&id=' + cargoId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(cargoId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_cargo.php?accion=D&id=' + cargoId + '&user=' + usuario, cargoId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(cargo, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_cargo.php?accion=I&desc=' + cargo.descripcion + '&user=' + cargo.usuario, cargo).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(cargo, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_cargo.php?accion=U'+
		'&id=' + cargo.id + 
		'&desc=' + cargo.descripcion + 
		'&estado=' + (cargo.estado?'A':'I') + 
		'&user=' + cargo.usuario, cargo).
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

//TIPO INVENTARIO
angular.module('tipoInventarioService', []).
factory('TipoInventario', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;
    
    
    function activar(tipoInventario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_inventario.php?accion=A&id=' + tipoInventario.id + '&user=' + tipoInventario.usuario).
        then(function(response) {
           callback(response);
        });
    };


    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_inventario.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_inventario.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(id, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_tipo_inventario.php?accion=C&id=' + id).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(tipoInventario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_inventario.php?accion=D&id=' + tipoInventario.id + '&user=' + tipoInventario.usuario).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(tipoInventario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_inventario.php?'+
                   'accion=I&'+
                   'descripcion=' + tipoInventario.descripcion + '&'+
                   'referencia=' + tipoInventario.referencia +'&'+
                   'user=' + tipoInventario.usuario).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(tipoInventario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_inventario.php?'+
                   'accion=U&id=' + tipoInventario.id + '&'+
                   'descripcion=' + tipoInventario.descripcion + '&'+
                   'referencia=' + tipoInventario.referencia + '&'+
                   'estado=' + tipoInventario.estado + '&'+
                   'user=' + tipoInventario.usuario).
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

//TIPO DE RETENCION
angular.module('tipoRetService', []).
factory('TipoRet', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;

    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_retencion.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_retencion.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(tipoRetId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_tipo_retencion.php?accion=C&id=' + tipoRetId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(tipoRetId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_retencion.php?accion=D&id=' + tipoRetId + '&user=' + usuario, tipoRetId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(tipoRetId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_retencion.php?accion=A&id=' + tipoRetId + '&user=' + usuario, tipoRetId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(tipoRet, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_retencion.php?accion=I&desc=' + tipoRet.descripcion + '&user=' + tipoRet.usuario, tipoRet).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(tipoRet, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_retencion.php?accion=U'+
		'&id=' + tipoRet.id + 
		'&desc=' + tipoRet.descripcion + 
		'&estado=' + (tipoRet.estado?'A':'I') +  
		'&user=' + tipoRet.usuario, tipoRet).
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

//TIPO DE CONTRIBUYENTE
angular.module('tipoContrService', []).
factory('TipoContr', function($http, URL_API){

var service = {};

service.findAll = findAll;
service.findAllA = findAllA;
service.borrar = borrar;
service.insertar = insertar;
service.actualizar = actualizar;
service.findById = findById;
service.activar = activar;


function activar(tipoContrId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_contribuyente.php?accion=A&id=' + tipoContrId + '&user=' + usuario, tipoContrId).
        then(function(response) {
           callback(response);
        });
    };
    

function findAll(callback){
	var url = URL_API + '/servicios/ctg/ctg_tipo_contribuyente.php?accion=C';
	$http.get(url).
    then(function(response) {
       callback(response);
    });
};
function findAllA(callback){
	var url = URL_API + '/servicios/ctg/ctg_tipo_contribuyente.php?accion=C&estado=A';
	$http.get(url).
    then(function(response) {
       callback(response);
    });
};

function findById(tipoContrId, callback){
    $http.get(URL_API + '/servicios/ctg/ctg_tipo_contribuyente.php?accion=C&id=' + tipoContrId).
    then(function(response) {
       callback(response);
    });
};

function borrar(tipoContrId, usuario, callback){
    $http.post(URL_API + '/servicios/ctg/ctg_tipo_contribuyente.php?accion=D&id=' + tipoContrId + '&user=' + usuario, tipoContrId).
    then(function(response) {
       callback(response);
    });
};

function insertar(tipoContr, callback){
    $http.post(URL_API + '/servicios/ctg/ctg_tipo_contribuyente.php?accion=I&desc=' + tipoContr.descripcion + '&user=' + tipoContr.usuario, tipoContr).
    then(function(response) {
        callback(response);
     });
};

function actualizar(tipoContr, callback){
    $http.post(URL_API + '/servicios/ctg/ctg_tipo_contribuyente.php?accion=U'+
	'&id=' + tipoContr.id + 
	'&desc=' + tipoContr.descripcion +
	'&estado=' + (tipoContr.estado?'A':'I') +  
	'&user=' + tipoContr.usuario, tipoContr).
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

//TIPO PERSONA
angular.module('tipoPerService', []).
factory('TipoPer', function($http, URL_API){

  var service = {};

  service.findAll = findAll;
  service.findAllByFilters = findAllByFilters;
  service.borrar = borrar;
  service.insertar = insertar;
  service.actualizar = actualizar;
  service.findById = findById;
  service.activar = activar;


  function activar(tipoPerId, usuario, callback){
          $http.post(URL_API + '/servicios/ctg/ctg_tipo_persona.php?accion=A&id=' + tipoPerId + '&user=' + usuario, tipoPerId).
          then(function(response) {
             callback(response);
          });
      };
      
  function findAll(callback){
  	var url = URL_API + '/servicios/ctg/ctg_tipo_persona.php?accion=C';
  	$http.get(url).
      then(function(response) {
         callback(response);
      });
  };

  function findAllByFilters(filtro, callback){
    var url = URL_API + '/servicios/ctg/ctg_tipo_persona.php?accion=C&estado='+filtro.estado;
    $http.get(url).
    then(function(response) {
       callback(response);
    });
};

  function findById(tipoPerId, callback){
      $http.get(URL_API + '/servicios/ctg/ctg_tipo_persona.php?accion=C&id=' + tipoPerId).
      then(function(response) {
         callback(response);
      });
  };

  function borrar(tipoPerId, usuario, callback){
      $http.post(URL_API + '/servicios/ctg/ctg_tipo_persona.php?accion=D&id=' + tipoPerId + '&user=' + usuario, tipoPerId).
      then(function(response) {
         callback(response);
      });
  };

  function insertar(tipoPer, callback){
      $http.post(URL_API + '/servicios/ctg/ctg_tipo_persona.php?accion=I&desc=' + tipoPer.descripcion + '&user=' + tipoPer.usuario, tipoPer).
      then(function(response) {
          callback(response);
       });
  };

  function actualizar(tipoPer, callback){
      $http.post(URL_API + '/servicios/ctg/ctg_tipo_persona.php?accion=U'+
	  '&id=' + tipoPer.id + 
	  '&desc=' + tipoPer.descripcion + 
	  '&estado=' + (tipoPer.estado?'A':'I') +  
	  '&user=' + tipoPer.usuario, tipoPer).
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

//MARCA 
angular.module('marcaService', []).
factory('Marca', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllA = findAllA;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.activar = activar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;


    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_marca.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/ctg/ctg_marca.php?accion=C&estado=A';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_marca.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };


    function findById(marcaId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_marca.php?accion=C&id=' + marcaId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(marcaId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_marca.php?accion=D&id=' + marcaId + '&user=' + usuario, marcaId).
        then(function(response) {
           callback(response);
        });
    };
    
    
    function activar(marcaId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_marca.php?accion=A&id=' + marcaId + '&user=' + usuario, marcaId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(marca, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_marca.php?accion=I&desc=' + marca.descripcion + '&user=' + marca.usuario, marca).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(marca, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_marca.php?accion=U'+
		'&id=' + marca.id + 
		'&desc=' + marca.descripcion + 
		'&estado=' + (marca.estado?'A':'I') +
		'&user=' + marca.usuario, marca).
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

//MODELO
angular.module('modeloService', []).
factory('Modelo', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllA = findAllA;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.findById = findById;
    service.findByIdMarca = findByIdMarca;
    service.findByIds = findByIds;
    service.activar = activar;
    service.actualizar = actualizar;

    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_modelo.php?accion=C';
		
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/ctg/ctg_modelo.php?accion=C&estado=A';
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_modelo.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(marcaId, modeloId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_modelo.php?accion=C&id=' + modeloId + '&idmarca=' + marcaId).
        then(function(response) {
           callback(response);
        });
    };
	
	function findByIdMarca(marcaId, callback){
		var url = URL_API + '/servicios/ctg/ctg_modelo.php?accion=C' +
		'&idmarca=' + marcaId +
		'&estado=A'
		;
		//console.log(url);
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };
    
    function findByIds(marcaId, modeloId, callback){
		var url = URL_API + '/servicios/ctg/ctg_modelo.php?accion=C'+
		'&id=' + modeloId+
		'&idmarca=' + marcaId
		;
		//console.log(url);
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };
    function borrar(modeloId, marcaId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_modelo.php?accion=D&id=' + modeloId + '&idmarca=' + marcaId + '&user=' + usuario, modeloId, marcaId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(marcaId, modeloId, usuario, callback){
		var url = URL_API + '/servicios/ctg/ctg_modelo.php?accion=A'+
		'&id=' + modeloId + 
		'&idmarca=' + marcaId + 
		'&user=' + usuario;
        $http.post(url, modeloId).
        then(function(response) {
           callback(response);
        });
    };
    								
    function insertar(modelo, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_modelo.php?accion=I&desc=' + modelo.descripcion + '&idmarca=' + modelo.id_marca + '&user=' + modelo.usuario, modelo).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(modelo, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_modelo.php?accion=U'+
		'&id=' + modelo.id + 
		'&idmarca=' + modelo.id_marca + 
		'&desc=' + modelo.descripcion + 
		'&estado=' + (modelo.estado?'A':'I') +
		'&user=' + modelo.usuario, modelo).
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

//COLOR 
angular.module('colorService', []).
factory('Color', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.activar = activar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;


    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_color.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_color.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };


    function findById(colorId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_color.php?accion=C&id=' + colorId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(colorId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_color.php?accion=D&id=' + colorId + '&user=' + usuario, colorId).
        then(function(response) {
           callback(response);
        });
    };
    
    
    function activar(colorId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_color.php?accion=A&id=' + colorId + '&user=' + usuario, colorId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(color, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_color.php?accion=I&desc=' + color.descripcion + '&user=' + color.usuario, color).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(color, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_color.php?accion=U&id=' + color.id + '&desc=' + color.descripcion + '&estado=' + color.estado + '&user=' + color.usuario, color).
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

//TALLER  tallerService
angular.module('tallerService', []).
factory('Taller', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;

    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_taller.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_taller.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(tallerId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_taller.php?accion=C&id=' + tallerId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(tallerId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_taller.php?accion=D&id=' + tallerId + '&user=' + usuario, tallerId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(tallerId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_taller.php?accion=A&id=' + tallerId + '&user=' + usuario, tallerId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(taller, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_taller.php?accion=I&desc=' + taller.descripcion + '&user=' + taller.usuario, taller).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(taller, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_taller.php?accion=U&id=' + taller.id + '&desc=' + taller.descripcion + '&estado=' + taller.estado + '&user=' + taller.usuario, taller).
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

//ESTILO DE MOTO  estilMotoService
angular.module('estilMotoService', []).
factory('EstilMoto', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;

    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_estilo_moto.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_estilo_moto.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(estilMotoId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_estilo_moto.php?accion=C&id=' + estilMotoId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(estilMotoId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_estilo_moto.php?accion=D&id=' + estilMotoId + '&user=' + usuario, estilMotoId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(estilMotoId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_estilo_moto.php?accion=A&id=' + estilMotoId + '&user=' + usuario, estilMotoId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(estilMoto, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_estilo_moto.php?accion=I&desc=' + estilMoto.descripcion + '&user=' + estilMoto.usuario, estilMoto).
        then(function(response) {
            callback(response);
         });
    };
    

    function actualizar(estilMoto, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_estilo_moto.php?accion=U&id=' + estilMoto.id + '&desc=' + estilMoto.descripcion + '&estado=' + estilMoto.estado + '&user=' + estilMoto.usuario, estilMoto).
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

//ACCS MOTO
angular.module('accsMotoService', []).
factory('AccsMoto', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;
 
    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_accs_moto.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_accs_moto.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(accsMotoId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_accs_moto.php?accion=C&id=' + accsMotoId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(accsMotoId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_accs_moto.php?accion=D&id=' + accsMotoId + '&user=' + usuario, accsMotoId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(accsMotoId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_accs_moto.php?accion=A&id=' + accsMotoId + '&user=' + usuario, accsMotoId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(accsMoto, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_accs_moto.php?accion=I&desc=' + accsMoto.descripcion + '&user=' + accsMoto.usuario, accsMoto).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(accsMoto, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_accs_moto.php?accion=U&id=' + accsMoto.id + '&desc=' + accsMoto.descripcion + '&estado=' + accsMoto.estado + '&user=' + accsMoto.usuario, accsMoto).
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

//ALMACEN
angular.module('almacenService', []).
factory('Almacen', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllA = findAllA;
    service.findAllByFilters = findAllByFilters;
    service.findAllByEmpresaId = findAllByEmpresaId;
    service.findByProdId = findByProdId;
    service.findAllByEmpresaIdA = findAllByEmpresaIdA;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.findByIds = findByIds;
    service.activar = activar;
    service.busquedaAlmacen = busquedaAlmacen;

    function busquedaAlmacen (id_empresa, callback){
		var url = URL_API + '/servicios/ctg/ctg_almacen.php?accion=C&idemp='+ id_empresa+'&estado=A';
		
		//console.log(url);
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    }; 

    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_almacen.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/ctg/ctg_almacen.php?accion=C&estado=A';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_almacen.php?accion=C&idemp='+filtro.id_empresa+'&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
    
    
    function findById(empresaId, almacenId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_almacen.php?accion=C&id=' + almacenId + '&idemp=' + empresaId).
        then(function(response) {
           callback(response);
        });
    };
   
    function findByIds(almacenId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_almacen.php?accion=C&id=' + almacenId).
        then(function(response) {
           callback(response);
        });
    };
    function borrar(empresaId, almacenId, usuario, callback){
		var url = URL_API + '/servicios/ctg/ctg_almacen.php?accion=D&id=' + almacenId + '&idemp=' + empresaId + '&user=' + usuario;
		//console.log(url);
        $http.post(url, empresaId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(empresaId, almacenId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_almacen.php?accion=A&id=' + almacenId + '&idemp='+empresaId+'&user=' + usuario, empresaId).
        then(function(response) {
           callback(response);
        });
    };
    
    function findAllByEmpresaId (id_empresa, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_almacen.php?accion=C&idemp='+ id_empresa).
        then(function(response) {
           callback(response);
        });
    }; 

    function findByProdId (id_prod, id_empresa, id_almacen, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_almacen.php?accion=C&idemp='+ id_empresa + '&id_prod=' + id_prod + '&id=' + id_almacen).
        then(function(response) {
           callback(response);
        });
    }; 
	
	function findAllByEmpresaIdA (id_empresa, callback){
		var url = URL_API + '/servicios/ctg/ctg_almacen.php?accion=C&idemp='+ id_empresa+'&estado=A';
		//console.log(url);
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(almacen, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_almacen.php?accion=I'+
		'&desc=' + almacen.descripcion + 
		'&idemp=' + almacen.id_empresa + 
		'&id_depto=' + almacen.id_depto + 
		'&tel1=' + almacen.tel1 + 
		'&tel2=' + almacen.tel2 + 
		'&dir1=' + almacen.direccion1 + 
		'&dir2=' + almacen.direccion2 + 
		'&trans=' + (almacen.transferible?'Y':'N') + //almacen.transferible + 
		'&estado=' + (almacen.estado?'A':'I') + 
		//CONTABILIDAD
		'&id_cuenta_efectivo=' + almacen.id_cuenta_efectivo + 
		'&id_cuenta_inventarios=' + almacen.id_cuenta_inventarios + 
		'&id_cuenta_costos=' + almacen.id_cuenta_costos + 
		'&id_cuenta_ventas=' + almacen.id_cuenta_ventas + 
		'&user=' + almacen.usuario, almacen).
        then(function(response) {
            callback(response);
         });
    };
   
    function actualizar(almacen, callback){
		var url = URL_API + '/servicios/ctg/ctg_almacen.php?accion=U'+
		'&id=' + almacen.id + 
		'&idemp=' + almacen.id_empresa + 
		'&desc=' + almacen.descripcion + 
		'&id_depto=' + almacen.id_depto + 
		'&estado=' + (almacen.estado?'A':'I') + 
		'&tel1=' + almacen.tel1 + 
		'&tel2=' + almacen.tel2 + 
		'&dir1=' + almacen.direccion1 + 
		'&dir2=' + almacen.direccion2 + 
		'&trans=' + (almacen.transferible?'Y':'N') + //almacen.transferible + 
		//CONTABILIDAD
		'&id_cuenta_efectivo=' + almacen.id_cuenta_efectivo + 
		'&id_cuenta_inventarios=' + almacen.id_cuenta_inventarios + 
		'&id_cuenta_costos=' + almacen.id_cuenta_costos + 
		'&id_cuenta_ventas=' + almacen.id_cuenta_ventas + 
		'&user=' + almacen.usuario;
		
		//console.log(url);
        $http.post(url, almacen).
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

//CATEGORIA 
angular.module('categoriaService', []).
factory('Categoria', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllA = findAllA;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;

    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_categoria.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllA(excluir, callback){
    	var url = URL_API + '/servicios/ctg/ctg_categoria.php?accion=C&estado=A&excluir='+excluir;
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_categoria.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(categoriaId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_categoria.php?accion=C&id=' + categoriaId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(categoriaId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_categoria.php?accion=D&id=' + categoriaId + '&user=' + usuario, categoriaId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(categoriaId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_categoria.php?accion=A&id=' + categoriaId + '&user=' + usuario, categoriaId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(categoria, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_categoria.php?accion=I&desc=' + categoria.descripcion + '&user=' + categoria.usuario, categoria).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(categoria, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_categoria.php?accion=U'+
		'&id=' + categoria.id + 
		'&desc=' + categoria.descripcion + 
		'&estado=' + (categoria.estado?'A':'I') +
		'&user=' + categoria.usuario, categoria).
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

//CIUDAD
angular.module('ciudadService', []).
factory('Ciudad', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.findByIdS = findByIdS;
    service.activar = activar;

    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_ciudad.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_ciudad.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(ciudadId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_ciudad.php?accion=C&id=' + ciudadId ).
        then(function(response) {
           callback(response);
        });
    };
    
    function findByIdS(ciudadId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_ciudad.php?accion=C&id=' + ciudadId ).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(ciudadId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_ciudad.php?accion=D&id=' + ciudadId  + '&user=' + usuario, ciudadId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(ciudadId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_ciudad.php?accion=A&id=' + ciudadId + '&user=' + usuario, ciudadId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(ciudad, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_ciudad.php?accion=I&desc=' + ciudad.descripcion + '&idDepto=' + ciudad.id_depto + '&idMuni=' + ciudad.id_municipio + '&user=' + ciudad.usuario, ciudad).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(ciudad, callback){
	$http.post(URL_API + '/servicios/ctg/ctg_ciudad.php?accion=U'+
	'&id=' + ciudad.id + 
	'&desc=' + ciudad.descripcion + 
	'&estado=' + (ciudad.estado?'A':'I') + 
	'&idDepto=' + ciudad.id_depto + 
	'&idMuni=' + ciudad.id_municipio +
	'&user=' + ciudad.usuario, ciudad).
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

//CLIENTE
angular.module('clienteService', []).
factory('Cliente', function($http, URL_API){

    var service = {};

    service.findAll = findAll;   
    service.findAllA = findAllA;   
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    //service.busquedaFiltro = busquedaFiltro;
    service.busquedaFiltro = busquedaFiltro; 
    service.activar = activar;

    function findAll(busquedaCliente, callback){
    	if (busquedaCliente.cantidad_maxima_a_mostrar==null) busquedaCliente.cantidad_maxima_a_mostrar = "";
    	//if (busquedaCliente.listInventario==null) busquedaInventario.listInventario = "";
    	
    	var url = URL_API + '/servicios/ctg/ctg_cliente.php?accion=C'+'&cantidad_maxima_a_mostrar='+busquedaCliente.cantidad_maxima_a_mostrar+'&estado='+busquedaCliente.estado;
		console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllA(callback){
    	    	
    	var url = URL_API + '/servicios/ctg/ctg_cliente.php?accion=C&estado=A';
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    /*function findAllA(callback){
    	var url = URL_API + '/servicios/ctg/ctg_cliente.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };*/
    
    function busquedaFiltro(busquedaCliente, callback){
		//console.log(busquedaCliente);
		var busca_ult_creado = busquedaCliente.busca_ult_creado!=undefined? busquedaCliente.busca_ult_creado: "";
		var usuario = busquedaCliente.usuario!=undefined? busquedaCliente.usuario: "";
		var id = busquedaCliente.id!=undefined? busquedaCliente.id: "";
		
        var url = URL_API + '/servicios/ctg/ctg_cliente.php?accion=c'+
        					'&nombre='+busquedaCliente.nombre+
					        '&nit='+busquedaCliente.nit+
					        '&reg_fisc='+busquedaCliente.registro_fiscal+
					        '&idTDoc='+busquedaCliente.id_tipo_doc+
					        '&noDoc='+busquedaCliente.numero_doc+
                            '&cantidad_maxima_a_mostrar='+busquedaCliente.cantidad_maxima_a_mostrar+
                            '&busca_ult_creado='+busca_ult_creado+
                            '&user='+usuario+
                            '&id='+id;
		//console.log(url);
		
        $http.get(url).
        then(function(response) {
            callback(response);
         });
    };
    

    function findById(clienteId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_cliente.php?accion=C&id=' + clienteId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(clienteId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_cliente.php?accion=D&id=' + clienteId + '&user=' + usuario, clienteId).
        then(function(response) {
           callback(response);
        });
    };
	
    function activar(clienteId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_cliente.php?accion=A&id=' + clienteId + '&user=' + usuario, clienteId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(cliente, callback){
		var url = URL_API + '/servicios/ctg/ctg_cliente.php?accion=I&nombre=' + cliente.nombre  
		+ '&iddepto=' + cliente.id_depto 
		+ '&idTContr=' + cliente.id_tipo_contribuyente 
		+ '&idTPer=' + cliente.id_tipo_persona 
		+ '&idTRet=' + cliente.id_tipo_retencion 
		+ '&idTDoc=' + cliente.id_tipo_doc 
		+ '&noDoc=' + cliente.numero_doc 
		+ '&idmuni=' + cliente.id_municipio 
		+ '&idciudad=' + cliente.id_ciudad 
		+ '&coment=' + cliente.comentarios 
		+ '&email=' + cliente.email 
		+ '&lim_cred=' + cliente.limite_credito 
		+ '&fax=' + cliente.fax 
		+ '&tel1=' + cliente.telefono1 
		+ '&tel2=' + cliente.telefono2 
		+ '&descuento=' + cliente.descuento 
		+ '&exento=' + cliente.exento 
		+ '&giro=' + cliente.giro 
		+ '&nit=' + cliente.nit 
		+ '&reg_fisc=' + cliente.registro_fiscal 
		+ '&direc=' + cliente.direccion 
		+ '&percep=' + cliente.percepcion         														  
		+ '&dias_credito=' + cliente.dias_credito         														  
		+ '&id_cuenta=' + cliente.id_cuenta
		+ '&user=' + cliente.usuario;
		console.log(url);
        $http.post(url, cliente).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(cliente, callback){
		var url = URL_API + '/servicios/ctg/ctg_cliente.php?accion=U&id=' + cliente.id 
		+ '&nombre=' + cliente.nombre 
		+ '&iddepto=' + cliente.id_depto 
		+ '&idTContr=' + cliente.id_tipo_contribuyente 
		+ '&idTPer=' + cliente.id_tipo_persona 
		+ '&idTRet=' + cliente.id_tipo_retencion 
		+ '&idTDoc=' + cliente.id_tipo_doc 
		+ '&noDoc=' + cliente.numero_doc 
		+ '&idmuni=' + cliente.id_municipio 
		+ '&idciudad=' + cliente.id_ciudad 
		+ '&coment=' + cliente.comentarios 
		+ '&email=' + cliente.email 
		+ '&lim_cred=' + cliente.limite_credito 
		+ '&fax=' + cliente.fax 
		+ '&tel1=' + cliente.telefono1 
		+ '&tel2=' + cliente.telefono2 
		+ '&descuento=' + cliente.descuento 
		+ '&exento=' + cliente.exento 
		+ '&giro=' + cliente.giro 
		+ '&nit=' + cliente.nit 
		+ '&reg_fisc=' + cliente.registro_fiscal 
		+ '&direc=' + cliente.direccion 
		+ '&percep=' + cliente.percepcion 
		+ '&dias_credito=' + cliente.dias_credito
		+ '&id_cuenta=' + cliente.id_cuenta
		+ '&estado=' + (cliente.estado?'A':'I') 
		+ '&user=' + cliente.usuario;
		
		//console.log(url);
        $http.post(url, cliente).
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

//EMPLEADO 
angular.module('empleadoService', []).
factory('Empleado', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters; 
    service.findAllA = findAllA;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.findByIds = findByIds;
    service.findAllSalesPerson = findAllSalesPerson;
    service.findAllByEmpresaA = findAllByEmpresaA;
    service.findAllByPosition = findAllByPosition;
    service.findAllByAlmacenA = findAllByAlmacenA;
    service.activar = activar;

    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_empleado.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_empleado.php?accion=C&idempr='+filtro.id_empresa+'&idcargo='+filtro.id_cargo+'&estado='+filtro.estado;
		
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/ctg/ctg_empleado.php?accion=C&estado=A';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
    
    function findAllSalesPerson(empresaId, callback){
    	var url = URL_API + '/servicios/ctg/ctg_empleado.php?accion=c&idempr='+empresaId+'&idcargo=1';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllByEmpresaA(empresaId, callback){
    	var url = URL_API + '/servicios/ctg/ctg_empleado.php?accion=c&idempr='+empresaId+'&estado=A';
		
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByPosition(empresaId, idcargo, callback){
    	var url = URL_API + '/servicios/ctg/ctg_empleado.php?accion=c&idempr='+empresaId+'&idcargo='+idcargo;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    }; 
	
	function findAllByAlmacenA(idEmpresa, idAlmacen, callback){
    	var url = URL_API + '/servicios/ctg/ctg_empleado.php?accion=c&idempr='+idEmpresa+'&idalm='+idAlmacen+'&estado=A';
        //console.log(url);
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(empleadoId, empresaId, almacenId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_empleado.php?accion=C&id=' + empleadoId + '&idempr=' + empresaId + '&idalm=' + almacenId).
        then(function(response) {
           callback(response);
        });
    };
    
    function findByIds(empleadoId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_empleado.php?accion=C&id=' + empleadoId).
        then(function(response) {
           callback(response);
        });
    };
    
    function borrar(empleadoId, empresaId, almacenId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_empleado.php?accion=D&id=' + empleadoId + '&idempr=' + empresaId + '&idalm=' + almacenId + '&user=' + usuario, empleadoId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(empleadoId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_empleado.php?accion=A&id=' + empleadoId + '&user=' + usuario, empleadoId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(empleado, callback){
		var url = URL_API + '/servicios/ctg/ctg_empleado.php?accion=I'+
		'&nombre=' + empleado.nombre + 
		'&idempr=' + empleado.id_empresa + 
		'&idalm=' + empleado.id_almacen + 
		'&idcargo=' + empleado.id_cargo + 
		'&id_puesto=' + empleado.id_puesto + 
		'&email=' + empleado.email + 
		'&user=' + empleado.usuario;
		
        $http.post(url, empleado).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(empleado, callback){
		var url = URL_API + '/servicios/ctg/ctg_empleado.php?accion=U'+
		'&id=' + empleado.id + 
		'&nombre=' + empleado.nombre + 
		'&idempr=' + empleado.id_empresa + 
		'&idalm=' + empleado.id_almacen + 
		'&estado=' + (empleado.estado?'A':'I') + 
		'&idcargo=' + empleado.id_cargo + 
		'&id_puesto=' + empleado.id_puesto + 
		'&email=' + empleado.email + 
		'&user=' + empleado.usuario;
		//console.log(url);
        $http.post(url, empleado).
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

//EMPRESA
angular.module('empresaService', []).
factory('Empresa', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters; 
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.findByIds = findByIds;
    service.uploadFile = uploadFile;
    service.deleteImg = deleteImg;
    service.activar = activar;
    service.findAllA = findAllA;

    
    function findAllA(callback){
    	var url = URL_API + '/servicios/ctg/ctg_empresa.php?accion=C&estado=A';
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };


    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_empresa.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_empresa.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(empresaId, callback){
		var url = URL_API + '/servicios/ctg/ctg_empresa.php?accion=C&id=' + empresaId;
		//console.log(url);
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findByIds(id, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_empresa.php?accion=C&id=' + id).
        then(function(response) {
           callback(response);
        });
    };

    function uploadFile(files, imagen, callback) {
		var fd = new FormData();
		fd.append("fileToUpload", files[0]);
		fd.append("tabla", imagen.tabla);
		fd.append("accion", imagen.accion);
		fd.append("campo", imagen.campo);
		fd.append("id", imagen.id);

        var url = URL_API + '/servicios/ctg/uploadFile.php';
		
		$http.post(url, fd, {
			withCredentials: true,
			headers: {'Content-Type': undefined },
			transformRequest: angular.identity
		}).then(
			function(response) {
				callback(response);
			}, function(error) {
				console.log(error);
			});
    };
	
  /*  function uploadFile(files, imagen, callback) {
		var fd = new FormData();
		fd.append("fileToUpload", files[0]);
        var url = URL_API + '/servicios/ctg/uploadFile.php?accion='+imagen.accion+
        '&id='+imagen.id;
        
		$http.post(url, fd, {
			withCredentials: true,
			headers: {'Content-Type': undefined },
			transformRequest: angular.identity
		}).then(
			function(response) {
				callback(response);
			}, function(error) {
				console.log(error);
			});
	};*/
	
    function deleteImg(imagen, callback){
        var url = URL_API + '/servicios/ctg/ctg_empresa.php?accion='+imagen.accion+
					        '&tabla='+imagen.tabla+
					        '&id='+imagen.id;
        $http.post(url).
        then(function(response) {
            callback(response);
         });
    };

/*
    
    function uploadFile(files, imagen, callback) {
		var fd = new FormData();
		fd.append("fileToUpload", files[0]);
        var url = URL_API + '/servicios/ctg/uploadFile.php?accion='+imagen.accion+
					    
					        '&id='+imagen.id;
        
		$http.post(url, fd, {
			withCredentials: true,
			headers: {'Content-Type': undefined },
			transformRequest: angular.identity
		}).then(
			function(response) {
				callback(response);
			}, function(error) {
				console.log(error);
			});
	};
	*/

    function borrar(empresaId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_empresa.php?accion=D&id=' + empresaId + '&user=' + usuario, empresaId).
        then(function(response) {
           callback(response);
        });
    };

    function activar(empresaId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_empresa.php?accion=A&id=' + empresaId + '&user=' + usuario, empresaId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(empresa, callback){    	
    	var url = URL_API + '/servicios/ctg/ctg_empresa.php?accion=I'
		+ '&desc=' + empresa.descripcion 
		+ '&razonSocial=' + empresa.razon_social 
		+ '&nit=' + empresa.nit 
		+ '&nrc=' + empresa.nrc 
		+ '&iva=' + empresa.iva 
		+ '&autorizacionMH=' + empresa.autorizacion_mh 
		+ '&fecha_autorizacion=' + empresa.fecha_autorizacion 
		+ '&id_tipo_contribuyente=' + empresa.id_tipo_contribuyente 
		+ '&id_giro=' + empresa.id_giro 
		+ '&direccion=' + empresa.direccion 
		+ '&tel1=' + empresa.tel1 
		+ '&tel2=' + empresa.tel2 
		+ '&fax=' + empresa.fax 
		+ '&user=' + empresa.usuario;
        $http.post(url, empresa).
        then(function(response) {
            callback(response);
         });
	};
    
/*    function insertar(files, empresa, callback){
    	
    	var fd = new FormData();
		fd.append("fileToUpload", files[0]);
        $http.post(URL_API + '/servicios/ctg/ctg_empresa.php?accion=I&desc=' + empresa.descripcion + '&id_tipo_contribuyente=' + empresa.id_tipo_contribuyente + '&logo=' + empresa.logo + '&user=' + empresa.usuario, empresa).
     
        $http.post(url, fd, {
			withCredentials: true,
			headers: {'Content-Type': undefined },
			transformRequest: angular.identity
		}).then(
			function(response) {
				callback(response);
			}, function(error) {
				console.log(error);
			});
	};
	*/
	
    function deleteImgPrd(imagen, callback){
        var url = URL_API + '/servicios/ctg/ctg_empresa.php?accion='+imagen.accion+
					        '&id='+imagen.id;
        $http.post(url).
        then(function(response) {
            callback(response);
         });
    };
    
    function actualizar(empresa, callback){
		var url = URL_API + '/servicios/ctg/ctg_empresa.php?accion=U'
		+ '&id=' + empresa.id
		+ '&desc=' + empresa.descripcion 
		+ '&razonSocial=' + empresa.razon_social 
		+ '&nit=' + empresa.nit 
		+ '&nrc=' + empresa.nrc 
		+ '&iva=' + empresa.iva 
		+ '&autorizacionMH=' + empresa.autorizacion_mh 
		+ '&fechaAutorizacion=' + empresa.fecha_autorizacion 
		+ '&id_tipo_contribuyente=' + empresa.id_tipo_contribuyente 
		+ '&id_giro=' + empresa.id_giro 
		+ '&direccion=' + empresa.direccion 
		+ '&tel1=' + empresa.tel1  
		+ '&tel2=' + empresa.tel2 
		+ '&fax=' + empresa.fax 
		+ '&estado=' + (empresa.estado?'A':'I') 
		//+ '&logo=' + empresa.logo
		+ '&user=' + empresa.usuario;
		
		//console.log(url);
        $http.post(url, empresa).
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

//ESTILO 
angular.module('estiloService', []).
factory('Estilo', function($http, URL_API){

  var service = {};

  service.findAll = findAll;
  service.findAllByFilters = findAllByFilters; 
  service.borrar = borrar;
  service.insertar = insertar;
  service.actualizar = actualizar;
  service.findById = findById;
  service.activar = activar;


  function findAll(callback){
  	var url = URL_API + '/servicios/ctg/ctg_estilo.php?accion=C';
  	$http.get(url).
      then(function(response) {
         callback(response);
      });
  };

  function findAllByFilters(filtro, callback){
    var url = URL_API + '/servicios/ctg/ctg_estilo.php?accion=C&estado='+filtro.estado;
    $http.get(url).
    then(function(response) {
       callback(response);
    });
};

  function findById(estiloId, callback){
      $http.get(URL_API + '/servicios/ctg/ctg_estilo.php?accion=C&id=' + estiloId).
      then(function(response) {
         callback(response);
      });
  };

  function borrar(estiloId, usuario, callback){
      $http.post(URL_API + '/servicios/ctg/ctg_estilo.php?accion=D&id=' + estiloId + '&user=' + usuario, estiloId).
      then(function(response) {
         callback(response);
      });
  };
  
  function activar(estiloId, usuario, callback){
      $http.post(URL_API + '/servicios/ctg/ctg_estilo.php?accion=A&id=' + estiloId + '&user=' + usuario, estiloId).
      then(function(response) {
         callback(response);
      });
  };

  function insertar(estilo, callback){
      $http.post(URL_API + '/servicios/ctg/ctg_estilo.php?accion=I&desc=' + estilo.descripcion + '&user=' + estilo.usuario, estilo).
      then(function(response) {
          callback(response);
       });
  };

  function actualizar(estilo, callback){
      $http.post(URL_API + '/servicios/ctg/ctg_estilo.php?accion=U'+
	  '&id=' + estilo.id + 
	  '&desc=' + estilo.descripcion + 
	  '&estado=' + (estilo.estado?'A':'I') +
	  '&user=' + estilo.usuario, estilo).
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

//FORMA DE PAGO 
angular.module('formPagoService', []).
factory('FormPago', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.findAllSinOtros = findAllSinOtros;
    service.findAllSinOtros2 = findAllSinOtros2;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function activar(formPagoId, usuario, callback){
            $http.post(URL_API + '/servicios/ctg/ctg_forma_pago.php?accion=A&id=' + formPagoId + '&user=' + usuario, formPagoId).
            then(function(response) {
               callback(response);
            });
        };

    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_forma_pago.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_forma_pago.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    }; 
	
	function findAllSinOtros(filtro,callback){
    	var url = URL_API + '/servicios/ctg/ctg_forma_pago.php?accion=C&estado=A&excluir='+filtro.id;
		
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllSinOtros2(filtro,callback){
    	var url = URL_API + '/servicios/ctg/ctg_forma_pago.php?accion=C2&estado=A&excluir='+filtro.id+'&id_empresa='+filtro.id_empresa+'&id_almacen='+filtro.id_almacen+'&estado='+filtro.estado;
		
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(formPagoId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_forma_pago.php?accion=C&id=' + formPagoId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(formPagoId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_forma_pago.php?accion=D&id=' + formPagoId + '&user=' + usuario, formPagoId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(formPago, callback){
		var url = URL_API + '/servicios/ctg/ctg_forma_pago.php?accion=I'+
		'&desc=' + formPago.descripcion + 
		'&user=' + formPago.usuario + 
		'&id_cuenta=' + formPago.id_cuenta;
		
        $http.post(url, formPago).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(formPago, callback){
		var url = URL_API + '/servicios/ctg/ctg_forma_pago.php?accion=U' +
		'&id=' + formPago.id + 
		'&desc=' + formPago.descripcion + 
		'&estado=' + (formPago.estado?'A':'I') +
		'&user=' + formPago.usuario + 
		'&id_cuenta=' + formPago.id_cuenta;
		
		//console.log(url);
        $http.post(url, formPago).
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

//GIRO 
angular.module('giroService', []).
factory('Giro', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllA = findAllA;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function activar(giroId, usuario, callback){
            $http.post(URL_API + '/servicios/ctg/ctg_giro.php?accion=A&id=' + giroId + '&user=' + usuario, giroId).
            then(function(response) {
               callback(response);
            });
        };


    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_giro.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/ctg/ctg_giro.php?accion=C&estado=A';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_giro.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(giroId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_giro.php?accion=C&id=' + giroId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(giroId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_giro.php?accion=D&id=' + giroId + '&user=' + usuario, giroId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(giro, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_giro.php?accion=I&desc=' + giro.descripcion + '&user=' + giro.usuario, giro).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(giro, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_giro.php?accion=U'+
		'&id=' + giro.id + 
		'&desc=' + giro.descripcion + 
		'&estado=' + (giro.estado?'A':'I') +  
		'&user=' + giro.usuario, giro).
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

//MOTO IMG
angular.module('motoImgService', []).
factory('MotoImg', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;


    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_moto_img.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_moto_img.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(motoImgId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_moto_img.php?accion=C&id=' + motoImgId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(motoImgId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_moto_img.php?accion=D&id=' + motoImgId + '&user=' + usuario, motoImgId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(motoImg, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_moto_img.php?accion=I&img=' + motoImg.image + '&user=' + motoImg.usuario, motoImg).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(motoImg, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_moto_img.php?accion=U&id=' + motoImg.id + '&img=' + motoImg.image + '&estado=' + motoImg.estado + '&user=' + motoImg.usuario, motoImg).
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

//PRODUCTO IMG
angular.module('prodImgService', []).
factory('ProdImg', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.findByIds = findByIds;


    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_prod_img.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_prod_img.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(prodImgId, prodId, callback){
		var url = URL_API + '/servicios/ctg/ctg_prod_img.php?accion=C&id=' + prodImgId + 'idprod' + prodId;
		
		//console.log(url);
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };
    

    function findByIds(prodImgId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_prod_img.php?accion=C&id=' + prodImgId ).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(prodImgId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_prod_img.php?accion=D&id=' + prodImgId +'&user=' + usuario, prodImgId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(prodImg, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_prod_img.php?accion=I&img=' + prodImg.image + '&idprod=' + prodImg.id_prod + '&user=' + prodImg.usuario, prodImg).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(prodImg, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_prod_img.php?accion=U&id=' + prodImg.id + '&img=' + prodImg.image + '&idprod=' + prodImg.id_prod +  '&estado=' + prodImg.estado + '&user=' + prodImg.usuario, prodImg).
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

//PRODUCTO MOTO
angular.module('prodMotoService', []).
factory('ProdMoto', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;
    service.busquedaFiltro = busquedaFiltro;
    


    function findAll(busquedaInventario, callback){
    	if (busquedaInventario.cantidad_maxima_a_mostrar==null) busquedaInventario.cantidad_maxima_a_mostrar = "";
    	if (busquedaInventario.listInventario==null) busquedaInventario.listInventario = "";
    	
    	var url = URL_API + '/servicios/ctg/ctg_prod_moto.php?accion=C'+'&cantidad_maxima_a_mostrar='+busquedaInventario.cantidad_maxima_a_mostrar+'&estado='+busquedaInventario.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
    
    function busquedaFiltro(busquedaInventario, callback){
        var url = URL_API + '/servicios/ctg/ctg_prod_moto.php?accion=c'+
        					'&chasis='+busquedaInventario.chasis+
					        '&desc='+busquedaInventario.desc+
					        '&idmarca='+busquedaInventario.id_marca+
					        '&idmodl='+busquedaInventario.id_modelo+
        					'&cantidad_maxima_a_mostrar='+busquedaInventario.cantidad_maxima_a_mostrar;
		
        $http.get(url).
        then(function(response) {
            callback(response);
         });
    };
    function findById(prodMotoId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_prod_moto.php?accion=C&id=' + prodMotoId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(prodMotoId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_prod_moto.php?accion=D&id=' + prodMotoId + '&user=' + usuario, prodMotoId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(prodMotoId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_prod_moto.php?accion=A&id=' + prodMotoId + '&user=' + usuario, prodMotoId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(prodMoto, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_prod_moto.php?accion=I&desc=' + prodMoto.descripcion +        			
				  													  '&anio=' + prodMoto.anio + 
				  													  '&idmarca=' + prodMoto.id_marca + 
				  													  '&desc=' + prodMoto.descripcion + 
				  													  '&idmodel=' + prodMoto.id_modelo + 
				  													  '&idestil=' + prodMoto.id_estilo + 
				  													  '&id_color=' + prodMoto.id_color +  
				  													  '&chasis=' + prodMoto.chasis + 
				  													  '&motor=' + prodMoto.motor + 
				  													  '&nopoliza=' + prodMoto.no_poliza + 
				  													  '&fechpoliza=' + prodMoto.fecha_poliza + 
				  													  '&costcompra=' + prodMoto.costo_compra + 
				  													  '&costfob=' + prodMoto.costo_fob + 
				  													  '&costcontable=' + prodMoto.costo_contable + 
				  													  '&costsimp=' + prodMoto.costo_s_impuesto + 
				  													  '&costcimp=' + prodMoto.costo_c_impuesto + 
				  													  '&margutil1=' + prodMoto.margen_utilidad_2 + 
				  													  '&prec1=' + prodMoto.precio_1 + 
				  													  '&margutil2=' + prodMoto.margen_utilidad_1 + 
				  													  '&prec2=' + prodMoto.precio_2 +
        															  '&user=' + prodMoto.usuario , prodMoto).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(prodMoto, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_prod_moto.php?accion=U&id=' + prodMoto.id + 
        															  '&desc=' + prodMoto.descripcion + 	
        															  '&anio=' + prodMoto.anio + 
        															  '&idmarca=' + prodMoto.id_marca + 
        															  '&desc=' + prodMoto.descripcion + 
        															  '&idmodel=' + prodMoto.id_modelo + 
        															  '&idestil=' + prodMoto.id_estilo + 
        															  '&id_color=' + prodMoto.id_color +  
        															  '&chasis=' + prodMoto.chasis + 
        															  '&motor=' + prodMoto.motor + 
        															  '&nopoliza=' + prodMoto.no_poliza + 
        															  '&fechpoliza=' + prodMoto.fecha_poliza + 
        															  '&costcompra=' + prodMoto.costo_compra + 
        															  '&costfob=' + prodMoto.costo_fob + 
        															  '&costcontable=' + prodMoto.costo_contable + 
        															  '&costsimp=' + prodMoto.costo_s_impuesto + 
        															  '&costcimp=' + prodMoto.costo_c_impuesto + 
        															  '&margutil1=' + prodMoto.margen_utilidad_2 + 
        															  '&prec1=' + prodMoto.precio_1 + 
        															  '&margutil2=' + prodMoto.margen_utilidad_1 + 
        															  '&prec2=' + prodMoto.precio_2 + 
        															  '&estado=' + prodMoto.estado + 
        															  '&user=' + prodMoto.usuario, prodMoto).
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

//PRODUCTO 
angular.module('prodService', []).
factory('Prod', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllServicios = findAllServicios;
    service.findAllServiciosA = findAllServiciosA;
    service.findAllProvByProd = findAllProvByProd;
    service.borrar = borrar;
    service.borrarReal = borrarReal;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.findImgByProdId = findImgByProdId;
    service.busquedaFiltro = busquedaFiltro;
    service.activar = activar;
    service.insertarDetalle =insertarDetalle;

    function findAll(busquedaInventario, callback){
    	if (busquedaInventario.cantidad_maxima_a_mostrar==null) busquedaInventario.cantidad_maxima_a_mostrar = "";
    	if (busquedaInventario.listInventario==null) busquedaInventario.listInventario = "";
    	
    	var url = URL_API + '/servicios/ctg/ctg_prod.php?accion=C'+'&cantidad_maxima_a_mostrar='+busquedaInventario.cantidad_maxima_a_mostrar+'&estado='+busquedaInventario.estado+'&id_empresa='+busquedaInventario.id_empresa;
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllServicios(filtro, callback){
    	
    	var url = URL_API + '/servicios/ctg/ctg_prod.php?accion=C'+'&id_empresa='+filtro.id_empresa+'&cod='+filtro.codigo+'&desc='+filtro.desc+'&serv=1&idcat=1';
		console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllServiciosA(id_empresa, callback){
    	
    	var url = URL_API + '/servicios/ctg/ctg_prod.php?accion=C'+'&estado=A&id_empresa='+id_empresa+'&serv=1&exluirCategoria=1';
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllProvByProd(idProd, callback){
    	var url = URL_API + '/servicios/ctg/ctg_prod.php?accion=PP'+
		'&id='+idProd;
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
    
    function busquedaFiltro(busquedaInventario, callback){
        var url = URL_API + '/servicios/ctg/ctg_prod.php?accion=c'+
        					'&cod='+busquedaInventario.codigo+
					        '&id_empresa='+busquedaInventario.id_empresa+
					        '&desc='+busquedaInventario.desc+
					        '&idmarca='+busquedaInventario.id_marca+
					        '&idmodl='+busquedaInventario.id_modelo+
        					'&cantidad_maxima_a_mostrar='+busquedaInventario.cantidad_maxima_a_mostrar;
							
		//console.log(url);
        $http.get(url).
        then(function(response) {
            callback(response);
         });
    };
	 
    function findById(empresaId, prodId, callback){
		var url = URL_API + '/servicios/ctg/ctg_prod.php?accion=C&id_empresa='+empresaId+'&id=' + prodId;
		
		//console.log(url);
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };
    
    function findImgByProdId(prodId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_prod_img.php?accion=C&idprod=' + prodId).
        then(function(response) {
           callback(response);
        });
    };
    
    function borrar(empresaId, prodId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_prod.php?accion=D&id_empresa='+empresaId+'&id=' + prodId + '&user=' + usuario, prodId).
        then(function(response) {
           callback(response);
        });
    };
	
	function borrarReal(empresaId, prodId, usuario, callback){
		var url = URL_API + '/servicios/ctg/ctg_prod.php?accion=RD&id_empresa='+empresaId+'&id=' + prodId + '&user=' + usuario;
		//console.log(url);
        $http.post(url, prodId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(empresaId, prodId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_prod.php?accion=A&id_empresa='+empresaId+'&id=' + prodId + '&user=' + usuario, prodId).
        then(function(response) {
           callback(response);
        });
    };

    function insertarDetalle(prod, prod_detalle, callback){
		var url = URL_API + '/servicios/ctg/ctg_prod.php?accion=I&idprov=' + prod_detalle.id_prov 
        + '&id_empresa=' + prod.id_empresa 
        + '&fecharecep=' + prod.fecha_recepcion 
        + '&id_almacen=' + prod.id_almacen 
        + '&id=' + prod_detalle.id 
        + '&stock=' + prod.stock 
        + '&prec1=' + prod.precio1 
        + '&user=' + prod_detalle.usuario;
		
		//console.log(url);
        $http.post(url, prod_detalle).
        then(function(response) {
            callback(response);

        });

    };

    function insertar(prod, callback){
		var url = URL_API + '/servicios/ctg/ctg_prod.php?accion=I'
		+ '&idprov=' + prod.id_prov
		+ '&desc=' + prod.descripcion 
		+ '&descCorta=' + prod.descripcion_corta
		+ '&estado=' + (prod.estado?'A':'I') 
		+ '&cod=' + prod.codigo 
		+ '&idtiprod=' + prod.id_tipo_producto 
		+ '&id_empresa=' + prod.id_empresa 
		+ '&id_almacen=' + prod.id_almacen 
		+ '&idmarca=' + prod.id_marca 
		+ '&idmodel=' + prod.id_modelo 
		+ '&idcat=' + prod.id_categoria
		+ '&idestil=' + prod.id_estilo
		+ '&serv=' + prod.servicio 
		+ '&stock=' + prod.stock 
		+ '&stockmin=' + prod.stock_minimo 
		+ '&stockmax=' + prod.stock_maximo 
		+ '&suspend=' + prod.suspendido 
		+ '&costcompra=' + prod.costo_compra 
		+ '&costfob=' + prod.costo_fob 
		+ '&costcont=' + prod.costo_contable 
		+ '&ultcostsimp=' + prod.ultimo_costo_s_impuesto 
		+ '&ultcostcimp=' + prod.ultimo_costo_c_impuesto 
		+ '&costpromcimp=' + prod.costo_prom_c_impuesto 
		+ '&costpromsimp=' + prod.costo_prom_c_impuesto 
		+ '&util1=' + prod.utilidad1 
		+ '&prec1=' + prod.precio1 
		+ '&util2=' + prod.utilidad2 
		+ '&prec2=' + prod.precio2 
		+ '&util3=' + prod.utilidad3 
		+ '&prec3=' + prod.precio3         																 
		+ '&fecharecep=' + prod.fecha_recepcion 
		+ '&fecha_vencimiento=' + prod.fecha_vencimiento 
		+ '&dias_vencimiento=' + prod.dias_vencimiento 
		+ '&OEM=' + prod.OEM
		+ '&porc_comision=' + prod.porc_comision 
		+ '&tiempo_ejecucion=' + prod.tiempo_ejecucion
		+ '&id_cuenta_inventario=' + prod.id_cuenta_inventario
		+ '&id_cuenta_ingresos=' + prod.id_cuenta_ingresos
		+ '&id_cuenta_costo=' + prod.id_cuenta_costo
		+ '&user=' + prod.usuario;
		
		console.log(url);
		
        $http.post(url, prod).
			then(function(response) {
				callback(response);												 
			});
        
};
    
    function actualizar(prod, callback){
		var url = URL_API + '/servicios/ctg/ctg_prod.php?accion=U' 
		+ '&id=' + prod.id 
		+ '&idprov=' + prod.id_prov
		+ '&desc=' + prod.descripcion 
		+ '&descCorta=' + prod.descripcion_corta
		+ '&estado=' + (prod.estado?'A':'I') 
		+ '&cod=' + prod.codigo 
		+ '&idtiprod=' + prod.id_tipo_producto 
		+ '&id_empresa=' + prod.id_empresa 
		+ '&id_almacen=' + prod.id_almacen 
		+ '&idmarca=' + prod.id_marca 
		+ '&idmodel=' + prod.id_modelo 
		+ '&idcat=' + prod.id_categoria
		+ '&idestil=' + prod.id_estilo
		+ '&serv=' + prod.servicio 
		+ '&stock=' + prod.stock 
		+ '&stockmin=' + prod.stock_minimo 
		+ '&stockmax=' + prod.stock_maximo 
		+ '&suspend=' + prod.suspendido 
		+ '&costcompra=' + prod.costo_compra 
		+ '&costfob=' + prod.costo_fob 
		+ '&costcont=' + prod.costo_contable 
		+ '&ultcostsimp=' + prod.ultimo_costo_s_impuesto 
		+ '&ultcostcimp=' + prod.ultimo_costo_c_impuesto 
		+ '&costpromcimp=' + prod.costo_prom_c_impuesto 
		+ '&costpromsimp=' + prod.costo_prom_c_impuesto 
		+ '&util1=' + prod.utilidad1 
		+ '&prec1=' + prod.precio1 
		+ '&util2=' + prod.utilidad2 
		+ '&prec2=' + prod.precio2 
		+ '&util3=' + prod.utilidad3 
		+ '&prec3=' + prod.precio3         																 
		+ '&fecharecep=' + prod.fecha_recepcion 
		+ '&fecha_vencimiento=' + prod.fecha_vencimiento 
		+ '&dias_vencimiento=' + prod.dias_vencimiento 
		+ '&OEM=' + prod.OEM
		+ '&porc_comision=' + prod.porc_comision 
		+ '&tiempo_ejecucion=' + prod.tiempo_ejecucion
		+ '&id_cuenta_inventario=' + prod.id_cuenta_inventario
		+ '&id_cuenta_ingresos=' + prod.id_cuenta_ingresos
		+ '&id_cuenta_costo=' + prod.id_cuenta_costo
		+ '&user=' + prod.usuario;
		
		//console.log(url);
        $http.post(url, prod).
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

//PROVEEDOR
angular.module('provService', []).
factory('Prov', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllA = findAllA;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.listId = listId;
    service.activar = activar;
    service.findByProdId = findByProdId;

    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_proveedor.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/ctg/ctg_proveedor.php?accion=C&estado=A';
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_proveedor.php?accion=C&estado='+filtro.estado;
		
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findByProdId(id_prod, callback){
    	var url = URL_API + '/servicios/ctg/ctg_proveedor.php?accion=C&id_prod='+id_prod;
		console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(provId, callback){
		var url =URL_API + '/servicios/ctg/ctg_proveedor.php?accion=C&id=' + provId;
		
		//console.log(url);
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(provId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_proveedor.php?accion=D&id=' + provId + '&user=' + usuario, provId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(provId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_proveedor.php?accion=A&id=' + provId + '&user=' + usuario, provId).
        then(function(response) {
           callback(response);
        });
    };
    
    function insertar(prov, callback){
		var url = URL_API + '/servicios/ctg/ctg_proveedor.php?accion=I'+
		'&desc=' + prov.descripcion  + 
		'&idTipoDProv=' + prov.id_tipo_doc_proveedor + 
		'&idTipoContribuyente=' + prov.id_tipo_contribuyente +
		'&dir=' + prov.direccion + 
		'&tel1=' + prov.tel1 + 
		'&tel2=' + prov.tel2 + 
		'&provmoto=' + prov.prov_moto + 
		'&dias_credito=' + prov.dias_credito + 
		'&exento=' + (prov.exento?1:0) + 
		'&estado=' +  (prov.estado?'A':'I') + 
		'&id_cuenta=' + prov.id_cuenta +
		'&email=' + prov.email +
		'&user=' + prov.usuario;
		
        $http.post(url, prov).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(prov, callback){
		var url = URL_API + '/servicios/ctg/ctg_proveedor.php?accion=U'+
		'&id=' + prov.id + 
		'&desc=' + prov.descripcion + 
		'&estado=' + (prov.estado?'A':'I') + 
		'&idTipoDProv=' + prov.id_tipo_doc_proveedor + 
		'&idTipoContribuyente=' + prov.id_tipo_contribuyente +
		'&tel1=' + prov.tel1 + 
		'&tel2=' + prov.tel2 + 
		'&dir=' + prov.direccion + 
		'&provmoto=' + prov.prov_moto + 
		'&dias_credito=' + prov.dias_credito + 
		'&exento=' + (prov.exento?1:0) + 
		'&tipo_proveedor=' + (prov.tipo_proveedor?1:0) + 
		'&id_cuenta=' + prov.id_cuenta +
		'&email=' + prov.email +
		'&user=' + prov.usuario;
		
		//console.log(url);
        $http.post(url, prov).
        then(function(response) {
            callback(response);
         });
    };

    function listId(prov, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_proveedor.php?accion=U&id=' + prov.id + '&desc=' + prov.descripcion + '&estado=' + prov.estado + '&tel1=' + prov.tel1 + '&tel2=' + prov.tel2 + '&dir=' + prov.direccion + '&provmoto=' + prov.prov_moto + '&user=' + prov.usuario, prov).
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

//TIPO DE FACTURA
angular.module('tipoFactService', []).
factory('TipoFact', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function activar(facturaId, usuario, callback){
            $http.post(URL_API + '/servicios/ctg/ctg_tipo_factura.php?accion=A&id=' + facturaId + '&user=' + usuario, facturaId).
            then(function(response) {
               callback(response);
            });
        };
    

    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_factura.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_factura.php?accion=C&estado='+filtro.estado+'&id_tipo_factura_buscar='+filtro.id_tipo_factura_buscar+"&excluir="+filtro.excluir;
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(facturaId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_tipo_factura.php?accion=C&id=' + facturaId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(facturaId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_factura.php?accion=D&id=' + facturaId + '&user=' + usuario, facturaId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(factura, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_factura.php?accion=I&desc=' + factura.descripcion + '&user=' + factura.usuario, factura).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(factura, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_factura.php?accion=U'+
		'&id=' + factura.id + 
		'&desc=' + factura.descripcion + 
		'&estado=' + (factura.estado?'A':'I') +
		'&user=' + factura.usuario, factura).
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

//TIPO OPERACION
angular.module('tipoOprService', []).
factory('TipoOpr', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllA = findAllA;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function activar(tipoOprId, usuario, callback){
            $http.post(URL_API + '/servicios/ctg/ctg_tipo_operacion.php?accion=A&id=' + tipoOprId + '&user=' + usuario, tipoOprId).
            then(function(response) {
               callback(response);
            });
        };


    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_operacion.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_operacion.php?accion=C&estado=A';
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_operacion.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(tipoOprId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_tipo_operacion.php?accion=C&id=' + tipoOprId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(tipoOprId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_operacion.php?accion=D&id=' + tipoOprId + '&user=' + usuario, tipoOprId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(tipoOpr, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_operacion.php?accion=I&desc=' + tipoOpr.descripcion + '&user=' + tipoOpr.usuario, tipoOpr).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(tipoOpr, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_operacion.php?accion=U'+
		'&id=' + tipoOpr.id + 
		'&desc=' + tipoOpr.descripcion + 
		'&estado=' + (tipoOpr.estado?'A':'I') +
		'&user=' + tipoOpr.usuario, tipoOpr).
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

//DEPARTAMENTO
angular.module('deptsService', []).
factory('Depts', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function activar(deptId, usuario, callback){
            $http.post(URL_API + '/servicios/ctg/ctg_depto.php?accion=A&id=' + deptId + '&user=' + usuario, deptId).
            then(function(response) {
               callback(response);
            });
        };
        


    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_depto.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_depto.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(deptId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_depto.php?accion=C&id=' + deptId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(deptId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_depto.php?accion=D&id=' + deptId + '&user=' + usuario, deptId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(dept, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_depto.php?accion=I&desc=' + dept.descripcion + '&user=' + dept.usuario ,dept).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(dept, callback){
		var url = URL_API + '/servicios/ctg/ctg_depto.php?accion=U'+
		'&id=' + dept.id + 
		'&desc=' + dept.descripcion + 
		'&estado=' + (dept.estado?'A':'I') + 
		'&user=' + dept.usuario;
		
		console.log(url);
        $http.post(url ,dept).
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

//MUNICIPIO
angular.module('munisService', []).
factory('Munis', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.findByIdDepto = findByIdDepto;
    service.findByIds = findByIds;
    service.activar = activar;


    function activar(munisId, usuario, callback){
            $http.post(URL_API + '/servicios/ctg/ctg_muni.php?accion=A&id=' + munisId + '&user=' + usuario, munisId).
            then(function(response) {
               callback(response);
            });
        };
        


    function findAll(callback){
		var url = URL_API + '/servicios/ctg/ctg_muni.php?accion=C';
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
		var url = URL_API + '/servicios/ctg/ctg_muni.php?accion=C&estado='+filtro.estado;

        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(deptsId, munisId, callback){
		var url = URL_API  + '/servicios/ctg/ctg_muni.php?accion=C&idDepto=' + deptsId + '&id=' + munisId;
		
		console.log(url);
    	$http.get(url ).
        then(function(response) {
           callback(response);
        });
    };
	
	function findByIdDepto(deptsId, callback){
		var url = URL_API  + '/servicios/ctg/ctg_muni.php?accion=C&idDepto=' + deptsId;
		
		//console.log(url);
    	$http.get(url ).
        then(function(response) {
           callback(response);
        });
    };
	
    function findByIds(munisId, callback){
    	$http.get(URL_API + '/servicios/ctg/ctg_muni.php?accion=C&id=' + munisId ).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(munisId, deptsId,  usuario, callback){
		var url = URL_API + '/servicios/ctg/ctg_muni.php?accion=D&idDepto=' + deptsId + '&id=' + munisId + '&user=' + usuario;
		
		//console.log(url);
        $http.post(url, deptsId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(munis, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_muni.php?accion=I&idDepto=' + munis.id_depto + '&desc=' + munis.descripcion + '&user=' + munis.usuario, munis).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(munis, callback){
		var url = URL_API + '/servicios/ctg/ctg_muni.php?accion=U'+
		'&id=' + munis.id + 
		'&idDepto=' + munis.id_depto +
		'&desc=' + munis.descripcion + 
		'&estado=' + (munis.estado?'A':'I') + 
		'&user=' + munis.usuario;
		//console.log(url);
        $http.post(url ,munis).
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

//TIPO PROMOCION
angular.module('tipoPromocionService', []).
factory('TipoPromocion', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllA = findAllA;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function activar(tipoPromocionId, usuario, callback){
            $http.post(URL_API + '/servicios/ctg/ctg_tipo_promocion.php?accion=A&id=' + tipoPromocionId + '&user=' + usuario, tipoPromocionId).
            then(function(response) {
               callback(response);
            });
        };
        
    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_promocion.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_promocion.php?accion=C&estado=A';
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_promocion.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };


    function findById(tipoPromocionId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_tipo_promocion.php?accion=C&id=' + tipoPromocionId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(tipoPromocionId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_promocion.php?accion=D&id=' + tipoPromocionId + '&user=' + usuario, tipoPromocionId).
        then(function(response) {
           callback(response);
        });
    };
    

    function insertar(tipoPromocion, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_promocion.php?accion=I&desc=' + tipoPromocion.descripcion + '&user=' + tipoPromocion.usuario, tipoPromocion).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(tipoPromocion, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_promocion.php?accion=U'+
		'&id=' + tipoPromocion.id + 
		'&desc=' + tipoPromocion.descripcion + 
		'&estado=' + (tipoPromocion.estado?'A':'I') +
		'&user=' + tipoPromocion.usuario, tipoPromocion).
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

//BANCOS
angular.module('bancoService', []).
factory('Banco', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllA = findAllA;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function activar(bancoId, usuario, callback){
            $http.post(URL_API + '/servicios/ctg/ctg_banco.php?accion=A&id=' + bancoId + '&user=' + usuario, bancoId).
            then(function(response) {
               callback(response);
            });
        };
        
    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_banco.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    }; 
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/ctg/ctg_banco.php?accion=C&estado=A';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_banco.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };


    function findById(bancoId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_banco.php?accion=C&id=' + bancoId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(bancoId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_banco.php?accion=D&id=' + bancoId + '&user=' + usuario, bancoId).
        then(function(response) {
           callback(response);
        });
    };
    

    function insertar(banco, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_banco.php?accion=I&desc=' + banco.descripcion + '&user=' + banco.usuario, banco).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(banco, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_banco.php?accion=U'+
		'&id=' + banco.id + 
		'&desc=' + banco.descripcion + 
		'&estado=' + (banco.estado?'A':'I') +
		'&user=' + banco.usuario, banco).
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

//BRANCH
angular.module('branchService', []).
factory('Branch', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllA = findAllA;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function activar(branchId, usuario, callback){
            $http.post(URL_API + '/servicios/ctg/ctg_branch.php?accion=A&id=' + branchId + '&user=' + usuario, branchId).
            then(function(response) {
               callback(response);
            });
        };
        
    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_branch.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/ctg/ctg_branch.php?accion=C&estado=A';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_branch.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };


    function findById(branchId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_branch.php?accion=C&id=' + branchId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(branchId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_branch.php?accion=D&id=' + branchId + '&user=' + usuario, branchId).
        then(function(response) {
           callback(response);
        });
    };
    

    function insertar(branch, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_branch.php?accion=I&desc=' + branch.descripcion + '&user=' + branch.usuario, branch).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(branch, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_branch.php?accion=U'+
		'&id=' + branch.id + 
		'&desc=' + branch.descripcion + 
		'&estado=' + (branch.estado?'A':'I') +
		'&user=' + branch.usuario, branch).
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

//BRANCH COLOR
angular.module('branchColorService', []).
factory('BranchColor', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllA = findAllA;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function activar(branchColorId, usuario, callback){
            $http.post(URL_API + '/servicios/ctg/ctg_branch_color.php?accion=A&id=' + branchColorId + '&user=' + usuario, branchColorId).
            then(function(response) {
               callback(response);
            });
        };
        
    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_branch_color.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/ctg/ctg_branch_color.php?accion=C&estado=A';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_branch_color.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };


    function findById(branchColorId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_branch_color.php?accion=C&id=' + branchColorId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(branchColorId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_branch_color.php?accion=D&id=' + branchColorId + '&user=' + usuario, branchColorId).
        then(function(response) {
           callback(response);
        });
    };
    

    function insertar(branchColor, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_branch_color.php?accion=I&desc=' + branchColor.descripcion + '&user=' + branchColor.usuario, branchColor).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(branchColor, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_branch_color.php?accion=U'+
		'&id=' + branchColor.id + 
		'&desc=' + branchColor.descripcion + 
		'&estado=' + (branchColor.estado?'A':'I') +
		'&user=' + branchColor.usuario, branchColor).
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

//TARJETA BENEFICIO
angular.module('tarjetaBeneficioService', []).
factory('TarjetaBeneficio', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function activar(tarjetaBeneficioId, usuario, callback){
            $http.post(URL_API + '/servicios/ctg/ctg_tarjeta_beneficio.php?accion=A&id=' + tarjetaBeneficioId + '&user=' + usuario, tarjetaBeneficioId).
            then(function(response) {
               callback(response);
            });
        };
        
    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_tarjeta_beneficio.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_tarjeta_beneficio.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };


    function findById(tarjetaBeneficioId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_tarjeta_beneficio.php?accion=C&id=' + tarjetaBeneficioId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(tarjetaBeneficioId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tarjeta_beneficio.php?accion=D&id=' + tarjetaBeneficioId + '&user=' + usuario, tarjetaBeneficioId).
        then(function(response) {
           callback(response);
        });
    };
    

    function insertar(tarjetaBeneficio, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tarjeta_beneficio.php?accion=I&desc=' + tarjetaBeneficio.descripcion + '&user=' + tarjetaBeneficio.usuario, tarjetaBeneficio).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(tarjetaBeneficio, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tarjeta_beneficio.php?accion=U'+
		'&id=' + tarjetaBeneficio.id + 
		'&desc=' + tarjetaBeneficio.descripcion + 
		'&estado=' + (tarjetaBeneficio.estado?'A':'I') +
		'&user=' + tarjetaBeneficio.usuario, tarjetaBeneficio).
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

//PRODUCTO RELACIONADO
angular.module('prodRelacionadoService', []).
factory('ProdRelacionado', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.borrarDefinitivo = borrarDefinitivo;
    service.insertar = insertar;
    service.insertarRedimidos = insertarRedimidos;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function activar(idProdPadre, idEmpresa, usuario, callback){
		var url =URL_API + '/servicios/ctg/ctg_tarjeta_beneficio.php?accion=A'+
		'id_prod_padre=' + idProdPadre + 
		'&id_empresa='+ idEmpresa;
		'&user=' + usuario;
		
            $http.post(url, idProdPadre).
            then(function(response) {
               callback(response);
            });
        };
        
    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_producto_relacionados.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	//@Deprecated
    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_tarjeta_beneficio.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(idProdPadre, idEmpresa, callback){
		var url = URL_API + '/servicios/ctg/ctg_producto_relacionados.php?accion=C'+
		'&id_producto_padre=' + idProdPadre + 
		'&id_empresa='+idEmpresa;
		//console.log(url);
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(idProdPadre, idEmpresa, usuario, callback){
		URL_API + '/servicios/ctg/ctg_producto_relacionados.php?accion=D&'+
		'id_prod_padre=' + idProdPadre + 
		'&id_empresa='+idEmpresa+
		'&user=' + usuario;
		
        $http.post(url, idProdPadre).
        then(function(response) {
           callback(response);
        });
    };
	
	function borrarDefinitivo(idProdPadre, idEmpresa, callback){
		var url = URL_API + '/servicios/ctg/ctg_producto_relacionados.php?accion=DD&'+
		'id_producto_padre=' + idProdPadre + 
		'&id_empresa='+idEmpresa;
		//console.log(url);
        $http.post(url, idProdPadre).
        then(function(response) {
           callback(response);
        });
    };
    
    function insertar(prodRelacionado, callback){
		var url = URL_API + '/servicios/ctg/ctg_producto_relacionados.php?accion=I'+
		'&id_producto_padre=' + prodRelacionado.id_producto_padre + 
		'&id_empresa=' + prodRelacionado.id_empresa + 
		'&codigo_producto_padre=' + prodRelacionado.codigo_producto_padre + 
		'&id_producto=' + prodRelacionado.id_producto + 
		'&codigo_producto=' + prodRelacionado.codigo_producto + 
		'&descripcion=' + prodRelacionado.descripcion + 
		'&qty=' + prodRelacionado.qty + 
		'&precio=' + prodRelacionado.precio + 
		'&costo=' + prodRelacionado.costo + 
		'&porc_comision=' + prodRelacionado.porc_comision + 
		'&monto=' + prodRelacionado.monto + 
		'&porc_descuento=' + prodRelacionado.porc_descuento + 
		'&porc_comision=' + prodRelacionado.porc_comision + 
		'&monto=' + prodRelacionado.monto + 
		'&user=' + prodRelacionado.usuario;
        
		console.log(url);
		
		$.ajax({
			async: false,
			type: "POST",
			url: url,
			data: '{name: "" }',
			success: function (response) {
				//console.log(response);
				callback(response);
			}
		});
    };
	
	function insertarRedimidos(id_producto, id_factura, id_empresa, usuario, callback){
		var url = URL_API + '/servicios/ctg/ctg_producto_relacionados.php?accion=IR'+
		'&id_factura=' + id_factura + 
		'&id_empresa=' + id_empresa + 
		'&id_producto=' + id_producto + 
		'&user=' + usuario;
        
		//console.log(url);
		
		$.ajax({
			async: false,
			type: "POST",
			url: url,
			data: '{name: "" }',
			success: function (response) {
				//console.log(response);
				callback(response);
			}
		});
    };
	
	//@Deprecated
    function actualizar(tarjetaBeneficio, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tarjeta_beneficio.php?accion=U&id=' + tarjetaBeneficio.id + '&desc=' + tarjetaBeneficio.descripcion + '&estado=' + tarjetaBeneficio.estado + '&user=' + tarjetaBeneficio.usuario, tarjetaBeneficio).
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

//PRESUPUESTO ALMACEN
angular.module('presupuestoAlmacenService', []).
factory('PresupuestoAlmacen', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllA = findAllA;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;

    function activar(presupuestoAlmacen, usuario, callback){
		var url = URL_API + '/servicios/prc/presupuesto_almacen/prc_presupuesto_almacen.php?accion=A'+
		'&id=' + presupuestoAlmacen.id + 
		'&id_empresa=' + presupuestoAlmacen.id_empresa + 
		'&id_almacen=' + presupuestoAlmacen.id_almacen + 
		'&user=' + usuario;
        $http.post(url, presupuestoAlmacen).
            then(function(response) {
               callback(response);
            });
        };
        
    function findAll(id_empresa, id_almacen, callback){
    	var url = URL_API + '/servicios/prc/presupuesto_almacen/prc_presupuesto_almacen.php?accion=C'+
		"&id_empresa="+id_empresa +
		"&id_almacen="+id_almacen
		;
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    }; 
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/prc/presupuesto_almacen/prc_presupuesto_almacen.php?accion=C&estado=A';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/prc/presupuesto_almacen/prc_presupuesto_almacen.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };


    function findById(presupuestoAlmacen, callback){
		var url = URL_API + '/servicios/prc/presupuesto_almacen/prc_presupuesto_almacen.php?accion=C'+
		'&id=' + presupuestoAlmacen.id;
		
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(presupuestoAlmacen, callback){
		var url = URL_API + '/servicios/prc/presupuesto_almacen/prc_presupuesto_almacen.php?accion=D'+
		'&id=' + presupuestoAlmacen.id + 
		'&id_empresa=' + presupuestoAlmacen.id_empresa + 
		'&id_almacen=' + presupuestoAlmacen.id_almacen ;
		//console.log(url);
        $http.post(url, presupuestoAlmacen).
        then(function(response) {
           callback(response);
        });
    };
    
    function insertar(presupuestoAlmacen, callback){
		var url = URL_API + '/servicios/prc/presupuesto_almacen/prc_presupuesto_almacen.php?accion=I'+
		'&id_empresa=' + presupuestoAlmacen.id_empresa +   
		'&id_almacen=' + presupuestoAlmacen.id +   
		'&periodo=' + presupuestoAlmacen.periodo +   
		'&monto=' + presupuestoAlmacen.monto +   
		'&estado=' + presupuestoAlmacen.estado + 
		'&user=' + presupuestoAlmacen.usuario;
		//console.log(url);
        $http.post(url, presupuestoAlmacen).
        then(function(response) {
            callback(response);
         });
    };
	
	//@deprecated
    function actualizar(presupuestoAlmacen, callback){
		var url = URL_API + '/servicios/prc/presupuesto_almacen/prc_presupuesto_almacen.php?accion=U'+
		'&id=' + presupuestoAlmacen.id + 
		'&desc=' + presupuestoAlmacen.descripcion + 
		'&estado=' + presupuestoAlmacen.estado + 
		'&user=' + presupuestoAlmacen.usuario;
		
        $http.post(url, presupuestoAlmacen
		).
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

//CAJA ALMACEN
angular.module('cajaAlmacenService', []).
factory('CajaAlmacen', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllA = findAllA;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;

    function activar(presupuestoAlmacen, usuario, callback){
		var url = URL_API + '/servicios/ctg/ctg_almacen_caja.php?accion=A'+
		'&id=' + presupuestoAlmacen.id + 
		'&id_empresa=' + presupuestoAlmacen.id_empresa + 
		'&id_almacen=' + presupuestoAlmacen.id_almacen + 
		'&user=' + usuario;
        $http.post(url, presupuestoAlmacen).
            then(function(response) {
               callback(response);
            });
        };
        
    function findAll(id_empresa, id_almacen, callback){
    	var url = URL_API + '/servicios/ctg/ctg_almacen_caja.php?accion=C'+
		"&id_empresa="+id_empresa +
		"&id_almacen="+id_almacen
		;
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    }; 
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/ctg/ctg_almacen_caja.php?accion=C&estado=A';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_almacen_caja.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };


    function findById(cajaAlmacen, callback){
		var url = URL_API + '/servicios/ctg/ctg_almacen_caja.php?accion=C'+
		'&id=' + cajaAlmacen.id;
		
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(cajaAlmacen, callback){
		var url = URL_API + '/servicios/ctg/ctg_almacen_caja.php?accion=D'+
		'&id=' + cajaAlmacen.id.id + 
		'&id_empresa=' + cajaAlmacen.id.id_empresa + 
		'&id_almacen=' + cajaAlmacen.id.id_almacen ;
		//console.log(url);
        $http.post(url, cajaAlmacen).
        then(function(response) {
           callback(response);
        });
    };
    
    function insertar(cajaAlmacen, callback){
		var url = URL_API + '/servicios/ctg/ctg_almacen_caja.php?accion=I'+
		'&id_empresa=' + cajaAlmacen.id_empresa +   
		'&id_almacen=' + cajaAlmacen.id +   
		'&descripcion_caja=' + cajaAlmacen.descripcion_caja +   
		'&ip=' + cajaAlmacen.ip +   
		'&correlativo_inicial_ticket=' + cajaAlmacen.correlativo_inicial_ticket +   
		'&correlativo_final_ticket=' + cajaAlmacen.correlativo_final_ticket +   
		'&correlativo_inicial_factura_ccf=' + cajaAlmacen.correlativo_inicial_factura_ccf +   
		'&correlativo_final_factura_ccf=' + cajaAlmacen.correlativo_final_factura_ccf +  
		'&correlativo_inicial_factura_cf=' + cajaAlmacen.correlativo_inicial_factura_cf +   
		'&correlativo_final_factura_cf=' + cajaAlmacen.correlativo_final_factura_cf +  
		'&correlativo_inicial_factura_nc=' + cajaAlmacen.correlativo_inicial_factura_nc +   
		'&correlativo_final_factura_nc=' + cajaAlmacen.correlativo_final_factura_nc +   
		
		'&estado=' + cajaAlmacen.estado + 
		'&user=' + cajaAlmacen.usuario;
		//console.log(url);
        $http.post(url, cajaAlmacen).
        then(function(response) {
            callback(response);
         });
    };
	
	//@deprecated
    function actualizar(cajaAlmacen, callback){
		var url = URL_API + '/servicios/prc/presupuesto_almacen/prc_presupuesto_almacen.php?accion=U'+
		'&id=' + cajaAlmacen.id + 
		'&desc=' + cajaAlmacen.descripcion + 
		'&estado=' + cajaAlmacen.estado + 
		'&user=' + cajaAlmacen.usuario;
		
        $http.post(url, cajaAlmacen
		).
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

//HORARIO ALMACEN
angular.module('horarioAlmacenService', []).
factory('HorarioAlmacen', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.borrar = borrar;
    service.insertar = insertar;
    service.findById = findById;
    
    function findAll(id_empresa, id_almacen, callback){
    	var url = URL_API + '/servicios/ctg/ctg_almacen_horario.php?accion=C'+
		"&id_empresa="+id_empresa +
		"&id_almacen="+id_almacen
		;
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    }; 
	
    function findById(horarioAlmacen, callback){
		var url = URL_API + '/servicios/ctg/ctg_almacen_horario.php?accion=C'+
		'&id=' + horarioAlmacen.id;
		
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(horarioAlmacen, callback){
		var url = URL_API + '/servicios/ctg/ctg_almacen_horario.php?accion=D'+
		'&id=' + horarioAlmacen.id.id + 
		'&id_empresa=' + horarioAlmacen.id.id_empresa + 
		'&id_almacen=' + horarioAlmacen.id.id_almacen ;
		console.log(url);
        $http.post(url, horarioAlmacen).
        then(function(response) {
           callback(response);
        });
    };
    
    function insertar(horarioAlmacen, callback){
		var url = URL_API + '/servicios/ctg/ctg_almacen_horario.php?accion=I'+
		'&id_empresa=' + horarioAlmacen.id_empresa +   
		'&id_almacen=' + horarioAlmacen.id +   
		'&dia=' + horarioAlmacen.dia +   
		'&hora_inicial=' + horarioAlmacen.hora_inicial +   
		'&hora_final=' + horarioAlmacen.hora_final +   
		'&user=' + horarioAlmacen.usuario;
		//console.log(url);
        $http.post(url, horarioAlmacen).
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


//TIPO COLA
angular.module('tipoColaService', []).
factory('TipoCola', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function activar(tipoColaId, usuario, callback){
            $http.post(URL_API + '/servicios/ctg/ctg_tipo_cola.php?accion=A&id=' + tipoColaId + '&user=' + usuario, tipoColaId).
            then(function(response) {
               callback(response);
            });
        };
        
    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_cola.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_cola.php?accion=C&estado='+filtro.estado;
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };


    function findById(tipoColaId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_tipo_cola.php?accion=C&id=' + tipoColaId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(tipoColaId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_cola.php?accion=D&id=' + tipoColaId + '&user=' + usuario, tipoColaId).
        then(function(response) {
           callback(response);
        });
    };
    

    function insertar(tipoCola, callback){
		var url = URL_API + '/servicios/ctg/ctg_tipo_cola.php?accion=I'+
		'&desc=' + tipoCola.descripcion + 
		'&abrev=' + tipoCola.abreviatura + 
		'&logo=' + tipoCola.logo + 
		'&ip_impresora=' + tipoCola.ip_impresora + 
		'&estado=' + tipoCola.estado + 
		'&user=' + tipoCola.usuario;
		
        $http.post(url, tipoCola).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(tipoCola, callback){
		var url = URL_API + '/servicios/ctg/ctg_tipo_cola.php?accion=U'+
		'&id=' + tipoCola.id + 
		'&desc=' + tipoCola.descripcion + 
		'&abrev=' + tipoCola.abreviatura + 
		'&logo=' + tipoCola.logo + 
		'&ip_impresora=' + tipoCola.ip_impresora + 
		'&estado=' + (tipoCola.estado?'A':'I') +
		'&user=' + tipoCola.usuario;
		//console.log(url);
        $http.post(url, tipoCola).
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

//********************* CTG_CONF ***********************************

//*****************************************CONTABILIDAD***********************************************
//TIPO DE AUXILIAR  
angular.module('tipoAuxiliarService', []).
factory('TipoAuxiliar', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllA = findAllA;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_auxiliar.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_auxiliar.php?accion=C&estado=A';
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_auxiliar.php?accion=C&estado='+filtro.estado;
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(tipoAuxiliarId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_tipo_auxiliar.php?accion=C&id=' + tipoAuxiliarId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(tipoAuxiliarId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_auxiliar.php?accion=D&id=' + tipoAuxiliarId + '&user=' + usuario, tipoAuxiliarId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(tipoAuxiliarId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_auxiliar.php?accion=A&id=' + tipoAuxiliarId + '&user=' + usuario, tipoAuxiliarId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(tipoAuxiliar, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_auxiliar.php?accion=I&desc=' + tipoAuxiliar.descripcion + '&user=' + tipoAuxiliar.usuario ,tipoAuxiliar).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(tipoAuxiliar, callback){
		var url = URL_API + '/servicios/ctg/ctg_tipo_auxiliar.php?accion=U'+
		'&id=' + tipoAuxiliar.id + 
		'&desc=' + tipoAuxiliar.descripcion + 
		'&estado=' + (tipoAuxiliar.estado?'A':'I') +
		'&user=' + tipoAuxiliar.usuario ;
		
		
        $http.post(url,tipoAuxiliar).
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

//AUXILIAR  
angular.module('auxiliarService', []).
factory('Auxiliar', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllA = findAllA;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_auxiliar.php?accion=C';
    	//console.log(url);
		$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/ctg/ctg_auxiliar.php?accion=C&estado=A';
    	//console.log(url);
		$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_auxiliar.php?accion=C&estado='+filtro.estado;
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(tipoAuxiliarId, auxiliarId, callback){
		var url = URL_API + '/servicios/ctg/ctg_auxiliar.php?accion=C'+
		'&id=' + auxiliarId+
		'&id_tipo_auxiliar='+tipoAuxiliarId;
		//console.log(url);
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(tipoAuxiliarId, auxiliarId, usuario, callback){
		var url = URL_API + '/servicios/ctg/ctg_auxiliar.php?accion=D&id=' + auxiliarId +'&id_tipo_auxiliar='+tipoAuxiliarId+ '&user=' + usuario;
		//console.log(url);
        $http.post(url, auxiliarId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(tipoAuxiliarId, auxiliarId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_auxiliar.php?accion=A&id=' + auxiliarId +'&id_tipo_auxiliar='+tipoAuxiliarId+ '&user=' + usuario, auxiliarId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(auxiliar, callback){
		var url = URL_API + '/servicios/ctg/ctg_auxiliar.php?accion=I'+
		'&id_tipo_auxiliar=' + auxiliar.id_tipo_auxiliar + 
		'&desc=' + auxiliar.descripcion + 
		'&user=' + auxiliar.usuario ,auxiliar;
		
        $http.post(url).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(auxiliar, callback){
		var url = URL_API + '/servicios/ctg/ctg_auxiliar.php?accion=U'+
		'&id=' + auxiliar.id + 
		'&id_tipo_auxiliar=' + auxiliar.id_tipo_auxiliar + 
		'&desc=' + auxiliar.descripcion + 
		'&codigo=' + auxiliar.codigo + 
		'&ref_1=' + auxiliar.ref_1 + 
		'&ref_2=' + auxiliar.ref_2 + 
		'&agente_retencion=' + auxiliar.agente_retencion + 
		'&estado=' + (auxiliar.estado?'A':'I') +
		'&user=' + auxiliar.usuario;
		//console.log(url);
        $http.post(url ,auxiliar).
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

//TIPO DE ASIENTO  
angular.module('tipoAsientoService', []).
factory('TipoAsiento', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_asiento.php?accion=C';
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_asiento.php?accion=C&estado='+filtro.estado;
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(tipoAsientoId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_tipo_asiento.php?accion=C&id=' + tipoAsientoId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(tipoAsientoId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_asiento.php?accion=D&id=' + tipoAsientoId + '&user=' + usuario, tipoAsientoId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(tipoAsientoId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_asiento.php?accion=A&id=' + tipoAsientoId + '&user=' + usuario, tipoAsientoId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(tipoAsiento, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_asiento.php?accion=I&desc=' + tipoAsiento.descripcion + '&user=' + tipoAsiento.usuario ,tipoAsiento).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(tipoAsiento, callback){
		
		var url = URL_API + '/servicios/ctg/ctg_tipo_asiento.php?accion=U'+
		'&id=' + tipoAsiento.id + 
		'&desc=' + tipoAsiento.descripcion + 
		'&estado=' + (tipoAsiento.estado?'A':'I') +
		'&user=' + tipoAsiento.usuario;
		
        $http.post(url ,tipoAsiento).
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

//TIPO DE CUENTA  
angular.module('tipoCuentaService', []).
factory('TipoCuenta', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_cuenta.php?accion=C';
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_cuenta.php?accion=C&estado='+filtro.estado;
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(tipoCuentaId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_tipo_cuenta.php?accion=C&id=' + tipoCuentaId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(tipoCuentaId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_cuenta.php?accion=D&id=' + tipoCuentaId + '&user=' + usuario, tipoCuentaId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(tipoCuentaId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_cuenta.php?accion=A&id=' + tipoCuentaId + '&user=' + usuario, tipoCuentaId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(tipoCuenta, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_cuenta.php?accion=I&desc=' + tipoCuenta.descripcion + '&user=' + tipoCuenta.usuario ,tipoCuenta).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(tipoCuenta, callback){
		
		var url = URL_API + '/servicios/ctg/ctg_tipo_cuenta.php?accion=U'+
		'&id=' + tipoCuenta.id + 
		'&desc=' + tipoCuenta.descripcion + 
		'&estado=' + (tipoCuenta.estado?'A':'I') +
		'&user=' + tipoCuenta.usuario ;
		
        $http.post(url,tipoCuenta).
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

//TIPO DE PLANTILA  
angular.module('tipoPlantillaService', []).
factory('TipoPlantilla', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_plantilla.php?accion=C';
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_tipo_plantilla.php?accion=C&estado='+filtro.estado;
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(tipoPlantillaId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_tipo_plantilla.php?accion=C&id=' + tipoPlantillaId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(tipoPlantillaId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_plantilla.php?accion=D&id=' + tipoPlantillaId + '&user=' + usuario, tipoPlantillaId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(tipoPlantillaId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_plantilla.php?accion=A&id=' + tipoPlantillaId + '&user=' + usuario, tipoPlantillaId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(tipoPlantilla, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_tipo_plantilla.php?accion=I&desc=' + tipoPlantilla.descripcion + '&user=' + tipoPlantilla.usuario ,tipoPlantilla).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(tipoPlantilla, callback){
		var url = URL_API + '/servicios/ctg/ctg_tipo_plantilla.php?accion=U'+
		'&id=' + tipoPlantilla.id + 
		'&desc=' + tipoPlantilla.descripcion + 
		'&estado=' + (tipoPlantilla.estado?'A':'I') +
		'&user=' + tipoPlantilla.usuario ;
        $http.post(url,tipoPlantilla).
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

//CENTRO DE COSTO
angular.module('centroCostoService', []).
factory('CentroCosto', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllA = findAllA;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_centro_costo.php?accion=C';
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/ctg/ctg_centro_costo.php?accion=C&estado=A';
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_centro_costo.php?accion=C&estado='+filtro.estado;
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(centroCostoId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_centro_costo.php?accion=C&id=' + centroCostoId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(centroCostoId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_centro_costo.php?accion=D&id=' + centroCostoId + '&user=' + usuario, centroCostoId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(centroCostoId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_centro_costo.php?accion=A&id=' + centroCostoId + '&user=' + usuario, centroCostoId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(centroCosto, callback){
		var url = URL_API + '/servicios/ctg/ctg_centro_costo.php?accion=I'+
		'&desc=' + centroCosto.descripcion + 
		'&total=' + centroCosto.total + 
		'&user=' + centroCosto.usuario;
		//console.log(url);
        $http.post(url ,centroCosto).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(centroCosto, callback){
		
		var url = URL_API + '/servicios/ctg/ctg_centro_costo.php?accion=U'+
		'&id=' + centroCosto.id + 
		'&desc=' + centroCosto.descripcion + 
		'&total=' + centroCosto.total + 
		'&estado=' + (centroCosto.estado?'A':'I') +
		'&user=' + centroCosto.usuario;
		
        $http.post(url ,centroCosto).
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

//NATURALEZA CUENTA
angular.module('cuentaNaturalezaService', []).
factory('CuentaNaturaleza', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllA = findAllA;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_cuenta_naturaleza.php?accion=C';
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/ctg/ctg_cuenta_naturaleza.php?accion=C&estado=A';
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_cuenta_naturaleza.php?accion=C&estado='+filtro.estado;
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(cuentaNaturalezaId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_cuenta_naturaleza.php?accion=C&id=' + cuentaNaturalezaId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(cuentaNaturalezaId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_cuenta_naturaleza.php?accion=D&id=' + cuentaNaturalezaId + '&user=' + usuario, cuentaNaturalezaId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(cuentaNaturalezaId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_cuenta_naturaleza.php?accion=A&id=' + cuentaNaturalezaId + '&user=' + usuario, cuentaNaturalezaId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(cuentaNaturaleza, callback){
		var url = URL_API + '/servicios/ctg/ctg_cuenta_naturaleza.php?accion=I'+
		'&desc=' + cuentaNaturaleza.descripcion + 
		'&user=' + cuentaNaturaleza.usuario;
		//console.log(url);
        $http.post(url ,cuentaNaturaleza).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(cuentaNaturaleza, callback){
		var url = URL_API + '/servicios/ctg/ctg_cuenta_naturaleza.php?accion=U'+
		'&id=' + cuentaNaturaleza.id + 
		'&desc=' + cuentaNaturaleza.descripcion + 
		'&estado=' + (cuentaNaturaleza.estado?'A':'I') +
		'&user=' + cuentaNaturaleza.usuario;
		
        $http.post(url ,cuentaNaturaleza).
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

//MONEDA
angular.module('monedaService', []).
factory('Moneda', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_moneda.php?accion=C';
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_moneda.php?accion=C&estado='+filtro.estado;
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(monedaId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_moneda.php?accion=C&id=' + monedaId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(monedaId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_moneda.php?accion=D&id=' + monedaId + '&user=' + usuario, monedaId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(monedaId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_moneda.php?accion=A&id=' + monedaId + '&user=' + usuario, monedaId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(moneda, callback){
		var url = URL_API + '/servicios/ctg/ctg_moneda.php?accion=I'+
		'&desc=' + moneda.descripcion + 
		'&abreviatura=' + moneda.abreviatura + 
		'&simbolo=' + moneda.simbolo + 
		'&user=' + moneda.usuario;
		
		
        $http.post(url ,moneda).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(moneda, callback){
		var url = URL_API + '/servicios/ctg/ctg_moneda.php?accion=U'+
		'&id=' + moneda.id + 
		'&desc=' + moneda.descripcion + 
		'&abreviatura=' + moneda.abreviatura + 
		'&simbolo=' + moneda.simbolo + 
		'&estado=' + (moneda.estado?'A':'I') +
		'&user=' + moneda.usuario;
		
        $http.post(url, moneda).
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

//ELEMENTO
angular.module('elementoService', []).
factory('Elemento', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllA = findAllA;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.activar = activar;


    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_elemento.php?accion=C';
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/ctg/ctg_elemento.php?accion=C&estado=A';
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_elemento.php?accion=C&estado='+filtro.estado;
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(elementoId, callback){
        $http.get(URL_API + '/servicios/ctg/ctg_elemento.php?accion=C&id=' + elementoId).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(elementoId, usuario, callback){
		var url = URL_API + '/servicios/ctg/ctg_elemento.php?accion=D&id=' + elementoId + '&user=' + usuario;
		//console.log(url);
        $http.post(url, elementoId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(elementoId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_elemento.php?accion=A&id=' + elementoId + '&user=' + usuario, elementoId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(elemento, callback){
		var url = URL_API + '/servicios/ctg/ctg_elemento.php?accion=I'+
		'&desc=' + elemento.descripcion + 
		'&total=' + elemento.total + 
		'&user=' + elemento.usuario;
		console.log(url);
        $http.post(url ,elemento).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(elemento, callback){
		var url=URL_API + '/servicios/ctg/ctg_elemento.php?accion=U'+
		'&id=' + elemento.id + 
		'&desc=' + elemento.descripcion + 
		'&estado=' + (elemento.estado?'A':'I') +
		'&user=' + elemento.usuario;
		
        $http.post(url,elemento).
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

//RUBRO
angular.module('rubroService', []).
factory('Rubro', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllA = findAllA;
    service.findAllByFilters = findAllByFilters;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.findByIdElemento = findByIdElemento;
    service.activar = activar;


    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_rubro.php?accion=C';
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/ctg/ctg_rubro.php?accion=C&estado=A';
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_rubro.php?accion=C&estado='+filtro.estado;
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(elementoId, rubroId, callback){
		var url = URL_API + '/servicios/ctg/ctg_rubro.php?accion=C&id=' + rubroId+'&id_elemento='+elementoId;
		//console.log(url);
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findByIdElemento(elementoId, callback){
		var url = URL_API + '/servicios/ctg/ctg_rubro.php?accion=C&id_elemento='+elementoId;
		//console.log(url);
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(elementoId, rubroId, usuario, callback){
		var url = URL_API + '/servicios/ctg/ctg_rubro.php?accion=D&id=' + rubroId +'&id_elemento='+elementoId+ '&user=' + usuario;
		//console.log(url);
        $http.post(url, elementoId).
        then(function(response) {
           callback(response);
        });
    };
    
    function activar(elementoId, rubroId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_rubro.php?accion=A&id=' + rubroId +'&id_elemento='+elementoId+'&user=' + usuario, elementoId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(rubro, callback){
		var url = URL_API + '/servicios/ctg/ctg_rubro.php?accion=I'+
		'&id_elemento=' + rubro.id_elemento + 
		'&desc=' + rubro.descripcion + 
		'&total=' + rubro.total + 
		'&user=' + rubro.usuario;
		//console.log(url);
        $http.post(url ,rubro).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(rubro, callback){
		var url = URL_API + '/servicios/ctg/ctg_rubro.php?accion=U'+
		'&id=' + rubro.id + 
		'&id_elemento=' + rubro.id_elemento + 
		'&desc=' + rubro.descripcion + 
		'&estado=' + (rubro.estado?'A':'I') +
		'&user=' + rubro.usuario ;
		
		//console.log(url);
        $http.post(url,rubro).
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

//CUENTA
angular.module('cuentaService', []).
factory('Cuenta', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllA = findAllA;
    service.findAllByFilters = findAllByFilters;
    service.findByFilters2 = findByFilters2;
    service.borrar = borrar;
    service.borrarCuentaSucursal = borrarCuentaSucursal;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.findByCliente = findByCliente;
    service.findByIdElemento = findByIdElemento;
    service.findByIdElemento2 = findByIdElemento2;
    service.findByIdElemento3 = findByIdElemento3;
    service.activar = activar;
    service.subirArchivo = subirArchivo;
    service.insertarCuentaSucursal = insertarCuentaSucursal;

    service.findByFormaPago = findByFormaPago;
    service.insertarFormaPagoCuentaSucursal = insertarFormaPagoCuentaSucursal;
    service.borrarFormaPagoCuentaSucursal = borrarFormaPagoCuentaSucursal;


    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_cuenta.php?accion=C';
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/ctg/ctg_cuenta.php?accion=C&estado=A';
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findByFilters2(cuenta, elementId, rubroId, nivel_cuenta, movimiento, callback){
    	var url = URL_API + '/servicios/ctg/ctg_cuenta.php?accion=C'+
		'&cuenta='+cuenta+
		'&id_elemento='+elementId+
		'&id_rubro='+rubroId+
		'&nivel_cuenta='+nivel_cuenta+
		'&movimiento='+(movimiento?1:0)
		;
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    }; 
	
	function findAllByFilters(filtro, callback){
    	var url = URL_API + '/servicios/ctg/ctg_cuenta.php?accion=C&estado='+filtro.estado+'&descripcion='+filtro.descripcion;
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(cuentaId, callback){
		var url = URL_API + '/servicios/ctg/ctg_cuenta.php?accion=C&cuenta=' + cuentaId;
		
		//console.log(url);
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findByIdElemento(elementoId, callback){
		var url = URL_API + '/servicios/ctg/ctg_cuenta.php?accion=CA&id_elemento=' + elementoId+"&estado=A&movimiento=1";
		
		//console.log(url);
		/*
        $http.get(url).
        then(function(response) {
           callback(response);
        });
		//*/
		
		$.ajax({
            async: true,
            type: "POST",
            url: url,
            data: '{name: "" }',
            success: function (response) {
				callback(response);
            }
        });
    };
	function findByIdElemento2(elementoId, callback){
		var url = URL_API + '/servicios/ctg/ctg_cuenta.php?accion=C&id_elemento=' + elementoId+"&estado=A&movimiento=1";
		
		//console.log(url);
		/*
        $http.get(url).
        then(function(response) {
           callback(response);
        });
		//*/
		
		$.ajax({
            async: true,
            type: "POST",
            url: url,
            data: '{name: "" }',
            success: function (response) {
				callback(response);
            }
        });
    };
	function findByIdElemento3(elementoId, descripcion, callback){
		var url = URL_API + '/servicios/ctg/ctg_cuenta.php?accion=C&id_elemento=' + elementoId+"&estado=A&movimiento=1&descripcion="+descripcion;
		
		//console.log(url);
		/*
        $http.get(url).
        then(function(response) {
           callback(response);
        });
		//*/
		
		$.ajax({
            async: true,
            type: "POST",
            url: url,
            data: '{name: "" }',
            success: function (response) {
				callback(response);
            }
        });
    };
	
	function findByCliente(clienteId, callback){
		var url = URL_API + '/servicios/prc/cuenta_cliente_sucursal/prc_cuenta_cliente_sucursal.php?accion=C&id_cliente=' + clienteId;
		
		console.log(url);
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findByFormaPago(formaPagoId, callback){
		var url = URL_API + '/servicios/prc/cuenta_forma_pago_sucursal/prc_cuenta_forma_pago_sucursal.php?accion=C&id_forma_pago=' + formaPagoId;
		
		//console.log(url);
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(cuentaId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_cuenta.php?accion=D&id=' + cuentaId + '&user=' + usuario, cuentaId).
        then(function(response) {
           callback(response);
        });
    };
	
    function activar(cuentaId, usuario, callback){
        $http.post(URL_API + '/servicios/ctg/ctg_cuenta.php?accion=A&id=' + cuentaId + '&user=' + usuario, cuentaId).
        then(function(response) {
           callback(response);
        });
    };

	function insertar(cuenta, callback){
		var url = URL_API + '/servicios/ctg/ctg_cuenta.php?accion=I'+
		'&cuenta=' + cuenta.cuenta + 
		'&id_cuenta_padre=' + cuenta.id_cuenta_padre + 
		'&id_elemento=' + cuenta.id_elemento + 
		'&id_rubro=' + cuenta.id_rubro + 
		'&id_auxiliar=' + cuenta.id_auxiliar + 
		'&id_centro_costo=' + cuenta.id_centro_costo + 
		'&descripcion=' + cuenta.descripcion + 
		'&id_naturaleza=' + cuenta.id_naturaleza + 
		'&nivel_cuenta=' + cuenta.nivel_cuenta + 
		'&mayor=' + cuenta.mayor + 
		'&movimiento=' + cuenta.movimiento + 
		'&hoja_trabajo=' + cuenta.hoja_trabajo + 
		'&saldo_debe=' + cuenta.saldo_debe + 
		'&saldo_haber=' + cuenta.saldo_haber + 
		'&saldo=' + cuenta.saldo + 
		'&estado=' + (cuenta.estado?'A':'I') +
		'&user=' + cuenta.usuario ;
		
		//console.log(url);
        $http.post(url,cuenta).
        then(function(response) {
            callback(response);
         });
    };
	
	function insertarCuentaSucursal(cliente, callback){
		var url = URL_API + '/servicios/prc/cuenta_cliente_sucursal/prc_cuenta_cliente_sucursal.php?accion=I'+
		'&id_cuenta=' + cliente.id_cuenta_sucursal + 
		'&id_cuenta_costo=' + cliente.id_cuenta_costo_sucursal + 
		'&id_cliente=' + cliente.id + 
		'&id_empresa=' + cliente.id_empresa + 
		'&id_almacen=' + cliente.id_almacen + 
		'&user=' + cliente.usuario ;
		
		//console.log(url);
        $http.post(url,cliente).
        then(function(response) {
            callback(response);
         });
    };
	
	function insertarFormaPagoCuentaSucursal(formaPago, callback){
		var url = URL_API + '/servicios/prc/cuenta_forma_pago_sucursal/prc_cuenta_forma_pago_sucursal.php?accion=I'+
		'&id_cuenta=' + formaPago.id_cuenta_sucursal + 
		//'&id_cuenta_costo=' + formaPago.id_cuenta_costo_sucursal + 
		'&id_forma_pago=' + formaPago.id + 
		'&id_empresa=' + formaPago.id_empresa + 
		'&id_almacen=' + formaPago.id_almacen + 
		'&user=' + formaPago.usuario ;
		
		console.log(url);
        $http.post(url,formaPago).
        then(function(response) {
            callback(response);
         });
    };
	
	function borrarCuentaSucursal(id_empresa, id_almacen, id_cuenta, id_cliente, callback){
		var url = URL_API + '/servicios/prc/cuenta_cliente_sucursal/prc_cuenta_cliente_sucursal.php?accion=D'+
		'&id_cuenta=' + id_cuenta + 
		'&id_cliente=' + id_cliente + 
		'&id_empresa=' + id_empresa + 
		'&id_almacen=' + id_almacen ;
		
		//console.log(url);
        $http.post(url,id_cuenta).
        then(function(response) {
            callback(response);
         });
    };
	
	function borrarFormaPagoCuentaSucursal(id_empresa, id_almacen, id_cuenta, id_forma_pago, callback){
		var url = URL_API + '/servicios/prc/cuenta_forma_pago_sucursal/prc_cuenta_forma_pago_sucursal.php?accion=D'+
		'&id_cuenta=' + id_cuenta + 
		'&id_forma_pago=' + id_forma_pago + 
		'&id_empresa=' + id_empresa + 
		'&id_almacen=' + id_almacen ;
		
		//console.log(url);
        $http.post(url,id_cuenta).
        then(function(response) {
            callback(response);
         });
    };
	
    function actualizar(cuenta, callback){
		console.log(cuenta);
		var url =  URL_API + '/servicios/ctg/ctg_cuenta.php?accion=U'+
		'&id=' + cuenta.id + 
		'&cuenta=' + cuenta.cuenta + 
		'&id_cuenta_padre=' + cuenta.id_cuenta_padre + 
		'&id_elemento=' + cuenta.id_elemento + 
		'&id_rubro=' + cuenta.id_rubro + 
		'&id_auxiliar=' + cuenta.id_auxiliar + 
		'&id_centro_costo=' + cuenta.id_centro_costo + 
		'&descripcion=' + cuenta.descripcion + 
		'&id_naturaleza=' + cuenta.id_naturaleza + 
		'&nivel_cuenta=' + cuenta.nivel_cuenta + 
		'&mayor=' + (cuenta.mayor?1:0) + 
		'&movimiento=' + (cuenta.movimiento?1:0) + 
		'&hoja_trabajo=' + (cuenta.hoja_trabajo?1:0) + 
		'&saldo_debe=' + cuenta.saldo_debe + 
		'&saldo_haber=' + cuenta.saldo_haber + 
		'&saldo=' + cuenta.saldo + 
		'&estado=' + (cuenta.estado?'A':'I') +
		'&user=' + cuenta.usuario ;
		
		//console.log(url);
        $http.get(url,cuenta).
        then(function(response) {
            callback(response);
         });
    };
	
	function subirArchivo(cuenta, callback){
		var imagen = cuenta._attachments_uri.image;
		var accion = cuenta.accion;
		var urlx = URL_API + '/servicios/ctg/ctg_cuenta.php';
		
		//console.log(cuenta);
		$.ajax({
			url:urlx,
			type:"POST",
			data:cuenta,
			success: function(data, status) {
				//console.log(data);
				callback(data);
			},
			error: function(data, status) {
				//console.log(data.error);
				callback(data);
			}
		});
		
    };
    return service;
  
}).service('popupService', function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});
//*****************************************CONTABILIDAD***********************************************
