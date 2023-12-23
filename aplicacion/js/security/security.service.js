angular.module('opcionService', []).
factory('Opcion', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
	service.findAllPadre = findAllPadre;
    service.borrar = borrar;
    service.activar = activar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;

    function findAll(callback){
        $http.get(URL_API + '/servicios/sec/sec_opcion.php?accion=C').
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllPadre(id_opc_ppal, callback){
		var url =URL_API + '/servicios/sec/sec_opcion.php?accion=C&padre=1&estado=A&id_opc_ppal='+id_opc_ppal;
		console.log(url);
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findById(idOpcion, callback){
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
		'&estado=' + opcion.estado +
        '&id_empresa=' + opcion.id_empresa;
		
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
        '&estado=' + (opcion.estado?'A':'I') +
        '&id_empresa=' + opcion.id_empresa;
		
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

angular.module('opcionPrincipalService', []).
factory('OpcPpal', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.findAllA = findAllA;
    service.borrar = borrar;
    service.activar = activar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.findByEmpresaA = findByEmpresaA;

    function findAll(callback){
		var url = URL_API + '/servicios/sec/sec_opc_principal.php?accion=C';
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	function findAllA(callback){
		var url = URL_API + '/servicios/sec/sec_opc_principal.php?accion=C&estado=A';
		
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };
    function findById(id, idEmpresa, callback){
		var url = URL_API + '/servicios/sec/sec_opc_principal.php?accion=C&id=' + id + '&id_empresa=' + idEmpresa;
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findByEmpresaA(idEmpresa, callback){
		var url = URL_API + '/servicios/sec/sec_opc_principal.php?accion=C'+ 
		'&id_empresa=' + idEmpresa+
		'&estado=A';
		//console.log(url);
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(id, usuario, callback){
		var url = URL_API + '/servicios/sec/sec_opc_principal.php?accion=D&id=' + id.id + '&id_empresa=' + id.id_empresa + '&user=' + usuario;
		
        $http.post(url, id).
        then(function(response) {
           callback(response);
        });
    };
	
	function activar(id, usuario, callback){
		var url = URL_API + '/servicios/sec/sec_opc_principal.php?accion=A&id=' + id.id + '&id_empresa=' + id.id_empresa + '&user=' + usuario;
		
        $http.post(url, id).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(opcPpal, callback){
		var url = URL_API + '/servicios/sec/sec_opc_principal.php?accion=I&desc=' + opcPpal.descripcion +
        '&menuicon=' + opcPpal.menu_icon +
        '&orden=' + opcPpal.orden +
        '&accesoDirecto=' + opcPpal.acceso_directo +
        '&user=' + opcPpal.usuario +
        '&id_empresa=' + opcPpal.id_empresa ;
		
        $http.post(url,opcPpal).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(opcPpal, callback){
		var url = URL_API + '/servicios/sec/sec_opc_principal.php?accion=U&id=' + opcPpal.id.id + 
        '&desc=' + opcPpal.descripcion +
        '&menuicon=' + opcPpal.menu_icon +
		'&orden=' + opcPpal.orden +
		'&accesoDirecto=' + opcPpal.acceso_directo +
        '&estado=' + (opcPpal.estado?'A':'I') +
        '&user=' + opcPpal.usuario +
        '&id_empresa=' + opcPpal.id_empresa;
		
        $http.post(url, opcPpal).
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

angular.module('rolService', []).
factory('Rol', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.borrar = borrar;
    service.activar = activar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.findByDesc = findByDesc;
    

    function findByDesc(desc, callback){
        $http.get(URL_API + '/servicios/sec/sec_rol.php?accion=C&desc=' + desc).
        then(function(response) {
           callback(response);
        });
    };

    function findAll(callback){
        $http.get(URL_API + '/servicios/sec/sec_rol.php?accion=C').
        then(function(response) {
           callback(response);
        });
    };

    function findById(id, callback){
        $http.get(URL_API + '/servicios/sec/sec_rol.php?accion=C&id=' + id).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(id, usuario, callback){
        $http.post(URL_API + '/servicios/sec/sec_rol.php?accion=D&id=' + id + '&user=' + usuario, id).
        then(function(response) {
           callback(response);
        });
    };
	
	function activar(id, usuario, callback){
        $http.post(URL_API + '/servicios/sec/sec_rol.php?accion=A&id=' + id + '&user=' + usuario, id).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(rol, callback){
        $http.post(URL_API + '/servicios/sec/sec_rol.php?accion=I&desc=' + rol.descripcion +
        '&user=' + rol.usuario ,rol).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(rol, callback){
        $http.post(URL_API + '/servicios/sec/sec_rol.php?accion=U&id=' + rol.id + 
        '&desc=' + rol.descripcion +
        '&estado=' + (rol.estado?'A':'I') +
		'&user=' + rol.usuario ,rol).
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

angular.module('opcRolService', []).
factory('OpcRol', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.findByRol = findByRol;
    service.findByIdOpcPpalRol = findByIdOpcPpalRol;
    service.findByIdOpcPpalOpcPadreRol = findByIdOpcPpalOpcPadreRol;

    function findByRol(idRol, callback){
		var url=URL_API + '/servicios/sec/sec_opc_rol.php?accion=C&id_rol=' + idRol;
		
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAll(callback){
        $http.get(URL_API + '/servicios/sec/sec_opc_rol.php?accion=C').
        then(function(response) {
           callback(response);
        });
    };



    function findById(idOpc, IdRol, callback){
        $http.get(URL_API + '/servicios/sec/sec_opc_rol.php?accion=C&id_opc=' + idOpc +
        '&id_rol=' + IdRol).
        then(function(response) {
           callback(response);
        });
    };
	
	function findByIdOpcPpalRol(idOpcPpal, idRol, idEmpresa, callback){
		var url = URL_API + '/servicios/sec/sec_opc_rol.php?accion=CP&'+
		'id_opc_ppal=' + idOpcPpal +
        '&id_rol=' + idRol ;
		
		console.log(url);
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findByIdOpcPpalOpcPadreRol(idOpcPpal, idOpcPadre, idRol, idEmpresa, callback){
		var url = URL_API + '/servicios/sec/sec_opc_rol.php?accion=CH'+
		'&id_opc_ppal=' + idOpcPpal +
		'&id_opc_padre=' + idOpcPadre +
        '&id_rol=' + idRol +
        '&id_empresa=' + idEmpresa;
		
		//console.log(url);
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(idOpc, IdRol, usuario, callback){
        $http.post(URL_API + '/servicios/sec/sec_opc_rol.php?accion=D&id_opc=' + idOpc + 
        '&id_rol=' + IdRol +
        '&user=' + usuario, idOpc).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(opcRol, callback){
        $http.post(URL_API + '/servicios/sec/sec_opc_rol.php?accion=I&id_opc_ppal=' + opcRol.id_opc_ppal +
        '&id_opc=' + opcRol.id_opc +
        '&id_empresa=' + opcRol.id_empresa +
        '&id_rol=' + opcRol.id_rol.id +
        '&user=' + opcRol.usuario, opcRol).
        then(function(response) {
            callback(response);
         });
    };
  
    function actualizar(opcRol, idOpcion, callback){
        $http.post(URL_API + '/servicios/sec/sec_opc_rol.php?accion=U&id_opc_ppal=' + opcRol.secOpcPpal.id + 
        '&id_opc=' + opcRol.secOpc.id +
     
        '&id_rol=' + opcRol.secRol.id +
        '&user=' + opcRol.usuario, opcRol).
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
/*
angular.module('usuarioService', []).
factory('RolUsuario', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.findByUsuario = findByUsuario;

    function findByUsuario(idUsuario, callback){
		var url = URL_API + '/servicios/sec/sec_rol_usuario.php?accion=C&usr=' + idUsuario;

        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAll(callback){
        $http.get(URL_API + '/servicios/sec/sec_rol_usuario.php?accion=C').
        then(function(response) {
           callback(response);
        });
    };

    function findById(idUsuario, IdRol, callback){
		var url = URL_API + '/servicios/sec/sec_rol_usuario.php?accion=C&usr=' + idUsuario +
        '&rol=' + IdRol;
		
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(idUsuario, IdRol, usuario, callback){
        $http.post(URL_API + '/servicios/sec/sec_rol_usuario.php?accion=D&usr=' + idUsuario + 
        '&rol=' + IdRol +
        '&user=' + usuario, idUsuario).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(rolUsuario, callback){
        $http.post(URL_API + '/servicios/sec/sec_rol_usuario.php?accion=I&usr=' + rolUsuario.usr.usr +
        '&rol=' + rolUsuario.rol.id +
        '&user=' + rolUsuario.usuario, rolUsuario).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(rolUsuario, callback){
		var url=URL_API + '/servicios/sec/sec_rol_usuario.php?accion=U&usr=' + rolUsuario.usr.usr + 
        '&rol=' + rolUsuario.rol.id +
        '&user=' + rolUsuario.usuario;
		
        $http.post(url, rolUsuario).
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
*/

angular.module('rolUsuarioService', []).
factory('RolUsuario', function($http, URL_API){

    var service = {};

    service.findAll = findAll;
    service.borrar = borrar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findById = findById;
    service.findByUsuario = findByUsuario;

    function findByUsuario(idUsuario, callback){
		var url = URL_API + '/servicios/sec/sec_rol_usuario.php?accion=C&usr=' + idUsuario;

        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findAll(callback){
        $http.get(URL_API + '/servicios/sec/sec_rol_usuario.php?accion=C').
        then(function(response) {
           callback(response);
        });
    };

    function findById(idUsuario, IdRol, callback){
		var url = URL_API + '/servicios/sec/sec_rol_usuario.php?accion=C&usr=' + idUsuario +
        '&rol=' + IdRol;
		
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(idUsuario, IdRol, usuario, callback){
        $http.post(URL_API + '/servicios/sec/sec_rol_usuario.php?accion=D&usr=' + idUsuario + 
        '&rol=' + IdRol +
        '&user=' + usuario, idUsuario).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(rolUsuario, callback){
        $http.post(URL_API + '/servicios/sec/sec_rol_usuario.php?accion=I&usr=' + rolUsuario.usr.usr +
        '&rol=' + rolUsuario.rol.id +
        '&user=' + rolUsuario.usuario+
        '&id_empresa=' + rolUsuario.id_empresa.id_empresa
        , rolUsuario).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(rolUsuario, callback){
		var url=URL_API + '/servicios/sec/sec_rol_usuario.php?accion=U&usr=' + rolUsuario.id.usr + 
        '&rol=' + rolUsuario.id.rol +
        '&user=' + rolUsuario.usuario+
        '&id_empresa=' + rolUsuario.id_empresa.id_empresa;
		
        $http.post(url, rolUsuario).
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



angular.module('usrService', []).
factory('Usr', function($http, URL_API){

    var service = {};

    service.findAlls = findAlls;
    service.borrar = borrar;
    service.activar = activar;
    service.insertar = insertar;
    service.actualizar = actualizar;
    service.findByUsr = findByUsr;
    service.findByEmpresa = findByEmpresa;
    service.findAllA = findAllA; 
    /*    service.getUser = getUser;

   function getUser(usuario, callback) {

        $http.get(URL_API + '/servicios/usuario.php?accion=C&usr=' + usuario).
        then(function(response) {
           
            callback(response);
        });
    
    };*/

    function findAlls(callback){
    	var url = URL_API + '/servicios/sec/sec_usuario.php?accion=C';
		
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findAllA(callback){
    	var url = URL_API + '/servicios/sec/sec_usuario.php?accion=C&estado=A';
		
		//console.log(url);
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function findByUsr(usuarioId, id_empresa, callback){
		var url = URL_API + '/servicios/sec/sec_usuario.php?accion=C&usr=' + usuarioId + '&id_empresa=' + id_empresa;
		
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };
	
	function findByEmpresa(id_empresa, callback){
		var url = URL_API + '/servicios/sec/sec_usuario.php?accion=C' 
		+ '&id_empresa=' + id_empresa;
		
		//console.log(url);
        $http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    function borrar(usuarioId, id_empresa, usuario, callback){
		var url = URL_API + '/servicios/sec/sec_usuario.php?accion=D&usr=' + usuarioId + '&id_empresa=' + id_empresa;
		
		//console.log(url);
        $http.post(url, usuarioId).
        then(function(response) {
           callback(response);
        });
    };
	
	function activar(usuarioId, id_empresa, usuario, callback){
		var url = URL_API + '/servicios/sec/sec_usuario.php?accion=A&usr=' + usuarioId + '&id_empresa=' + id_empresa;
		
		//console.log(url);
        $http.post(url, usuarioId).
        then(function(response) {
           callback(response);
        });
    };

    function insertar(usuario, callback){
		var url = URL_API + '/servicios/sec/sec_usuario.php?accion=I'+
		'&usr=' + usuario.usr + 
		'&idEmpleado=' + usuario.id_empleado + 
		'&id_empresa=' + usuario.id_empresa +
		'&id_almacen=' + usuario.id_almacen + 
		'&clave=' + usuario.clave + 
		'&nombre=' + usuario.nombre + 
		'&apellido=' + usuario.apellido + 
		'&email=' + usuario.email + 
		'&estado=' + usuario.estado +
		'&tipouser=' + usuario.tipo_usuario + 
		'&user=' + usuario.usuario ;
		
        $http.post(url, usuario).
        then(function(response) {
            callback(response);
         });
    };

    function actualizar(usuario, callback){
		var url = URL_API + '/servicios/sec/sec_usuario.php?accion=U'+
		'&usr=' + usuario.usr + 
		'&idEmpleado=' + usuario.id_empleado + 
		'&id_empresa=' + usuario.id_empresa +
		'&id_almacen=' + usuario.id_almacen + 
		'&clave=' + usuario.clave + 
		'&nombre=' + usuario.nombre + 
		'&apellido=' + usuario.apellido + 
		'&email=' + usuario.email + 
		'&estado=' + (usuario.estado?'A':'I') +
		'&tipouser=' + usuario.tipo_usuario + 
		'&user=' + usuario.usuario;
		
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
/*
angular.module('empleadoService', []).
factory('Empleado', function($http, URL_API){

    var service = {};

    service.findAll = findAll;    

    function findAll(callback){
    	var url = URL_API + '/servicios/ctg/ctg_empleado.php?accion=C';
    	$http.get(url).
        then(function(response) {
           callback(response);
        });
    };

    return service;
    
}).service('popupService', function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});*/



//PARAMETROS
angular.module('parametroService', []).
factory('Parametro', function($http, URL_API){

  var service = {};

  service.findAll = findAll;
  service.findParamPaquete = findParamPaquete;
  service.findAllByEmpresa = findAllByEmpresa;
  service.findAllByEmpresaA = findAllByEmpresaA;
  service.borrar = borrar;
  service.insertar = insertar;
  service.actualizar = actualizar;
  service.findById = findById;
  service.findMargenPrecio = findMargenPrecio;
  service.findCor = findCor;
  service.findCorByAlmacen = findCorByAlmacen;
  service.activar = activar;

  
	function findCor(idEmpresa, callback){
		//var url = URL_API + '/servicios/prc/parametros/prc_parametros.php?accion=C&id_empresa='+idEmpresa + '&tipo_param=CORR_' + '&estado=A';
		var url = URL_API + '/servicios/prc/parametros/prc_parametros.php?accion=C&id_empresa='+idEmpresa + '&tipo_param=CORR_';
		//console.log(url);
		$http.get(url).
		then(function(response) {
		   callback(response);
		});
	};
	
	function findCorByAlmacen(idEmpresa, idAlmacen, callback){
		var url = URL_API + '/servicios/prc/parametros/prc_parametros.php?accion=C&id_empresa='+idEmpresa + '&tipo_param=CORR_' + '&id_almacen=' + idAlmacen + '&estado=A';
		console.log(url);
		$http.get(url).
		then(function(response) {
		   callback(response);
		});
	};


  function activar(parametroId, usuario, callback){
          $http.post(URL_API + '/servicios/prc/parametros/prc_parametros.php?accion=A&id=' + parametroId + '&user=' + usuario, parametroId).
          then(function(response) {
             callback(response);
          });
      };

  function findAll(callback){
  	var url = URL_API + '/servicios/prc/parametros/prc_parametros.php?accion=C';
  	$http.get(url).
      then(function(response) {
         callback(response);
      });
  };
  
  function findParamPaquete(callback){
  	var url = URL_API + '/servicios/prc/parametros/prc_parametros.php?accion=C&tipo_param=VENC_PAQUETE';
  	$http.get(url).
      then(function(response) {
         callback(response);
      });
  };
  
  function findAllByEmpresa(idEmpresa, callback){
  	var url = URL_API + '/servicios/prc/parametros/prc_parametros.php?accion=C&id_empresa='+idEmpresa;
	
  	$http.get(url).
      then(function(response) {
         callback(response);
      });
  };
  
  function findAllByEmpresaA(idEmpresa, callback){
  	var url = URL_API + '/servicios/prc/parametros/prc_parametros.php?accion=C&id_empresa='+idEmpresa+'&estado=A';
  	$http.get(url).
      then(function(response) {
         callback(response);
      });
  };

  function findById(parametroId, callback){
      $http.get(URL_API + '/servicios/prc/parametros/prc_parametros.php?accion=C&id=' + parametroId).
      then(function(response) {
         callback(response);
      });
  };
  
  function findMargenPrecio(idEmpresa, callback){
      var url = URL_API + '/servicios/prc/parametros/prc_parametros.php?accion=C&id_empresa='+idEmpresa + '&desc=MARGEN_PRECIO&tipo_param=SYSTEM&estado=A';
	  
	  //console.log(url);
	  $http.get(url).
      then(function(response) {
         callback(response);
      });
  };

  function borrar(parametroId, usuario, callback){
      $http.post(URL_API + '/servicios/prc/parametros/prc_parametros.php?accion=D&id=' + parametroId + '&user=' + usuario, parametroId).
      then(function(response) {
         callback(response);
      });
  };

  function insertar(parametro, callback){
	  var url = URL_API + '/servicios/prc/parametros/prc_parametros.php?accion=I'+
	  '&id_empresa=' + parametro.id_empresa + 
	  '&desc=' + parametro.descripcion + 
	  '&id_almacen=' + parametro.id_almacen + 
	  '&valor=' + parametro.valor + 
	  '&tipo_param=' + parametro.tipo_param + 
	  '&user=' + parametro.usuario;
      
	  //console.log(url);
	  $http.post(url, parametro).
      then(function(response) {
          callback(response);
       });
  };

  function actualizar(parametro, callback){
	  var url = URL_API + '/servicios/prc/parametros/prc_parametros.php?accion=U'+
	  '&id=' + parametro.id + 
	  '&desc=' + parametro.descripcion +  
	  '&estado=' + (parametro.estado?'A':'I') +
	  '&id_almacen=' + parametro.id_almacen + 
	  '&id_empresa=' + parametro.id_empresa + 
	  '&valor=' + parametro.valor + 
	  '&valor2=' + parametro.valor2 + 
	  '&tipo_param=' + parametro.tipo_param + 
	  '&user=' + parametro.usuario;
	  
	  //console.log(url);
      $http.post(url, parametro).
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

//SETUP
angular.module('setupService', []).
factory('Setup', function($http, URL_API){

  var service = {};

  service.assignIP = assignIP;

  function assignIP(ip, callback){
  	var url = URL_API + '/servicios/setIp.php?accion=S&ipCaja='+ip;
	//console.log(url);
  	$http.get(url).
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