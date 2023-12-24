
angular.module('authenticationService',[]).
    factory('Authentication', function($http, $cookies, $rootScope, URL_API){
    	
    	 var service = {};
    	 
         service.Login = Login;
         service.Login2 = Login2;
         service.SetCredentials = SetCredentials;
         service.ClearCredentials = ClearCredentials;
    	 
         
         function Login(secUsuario, callback) {
			var url = URL_API + '/servicios/sec/sec_usuario.php?accion=LP&usr=' + secUsuario.usr + '&clave=' + secUsuario.clave + '&estado=A';
			console.log(url);
			$http.post(url, secUsuario).
			then(function(response) {
				callback(response);
			});
         };
		 
		 function Login2(secUsuario, callback) {
        	 var url = URL_API + '/servicios/sec/sec_usuario.php?accion=LP2&usr=' + secUsuario.usr + '&estado=A';
			 //console.log(url);
        	 $http.post(url, secUsuario).
        	 then(function(response) {
                 callback(response);
             });
         };
         
         function SetCredentials(username, /*idUser,*/ password, /*isRolAdmin, isRolSupervisor, isRolCajero,*/ sec_rol) {
             var authdata = Base64.encode(username + ':' + password);
             var language = {
                    "sProcessing":     "Procesando...",
                    "sLengthMenu":     "Mostrar _MENU_ registros",
                    "sZeroRecords":    "No se encontraron resultados",
                    "sEmptyTable":     "Ning&uacute;n dato disponible en esta tabla",
                    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix":    "",
                    "sSearch":         "Buscar:",
                    "sUrl":            "",
                    "sInfoThousands":  ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                        "sFirst":    "Primero",
                        "sLast":     "&Uacute;ltimo",
                        "sNext":     "Siguiente",
                        "sPrevious": "Anterior"
                    },
                    "oAria": {
                        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                    }
                }
				
			//console.log(empresa);
			//console.log(ctg_empresa);
			//console.log(ctg_almacen);
			//console.log(gral_params);
			$rootScope.globals = {
				currentUser: {
					username: username,
					//idUser: idUser,
					authdata: authdata,
					/*isRolAdmin: isRolAdmin,
					isRolSupervisor: isRolSupervisor,
					isRolCajero: isRolCajero,*/
					sec_rol: sec_rol
				}
				, language: language
			};
			//console.log($rootScope.globals.gral_params);
			//console.log($rootScope.globals.currentUser.ctg_almacen);

             // set default auth header for http requests
             $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

             // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
             var cookieExp = new Date();
             cookieExp.setDate(cookieExp.getDate() + 7);
             $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
         };

         function ClearCredentials() {
             
			 
			 //DESLOGEEO
			/*if($rootScope.globals.currentUser!=undefined){
				var url = URL_API + '/servicios/sec/sec_usuario.php?accion=LO'+
				'&usr=' + $rootScope.globals.currentUser.username + 
				'&idUser=' + $rootScope.globals.currentUser.idUser
				;
				//console.log(url);
				$http.post(url).
					then(function(response) {
				});
			}*/
			 
			$rootScope.globals = {};
			$cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
         };
         
    	 return service;

    	 
});

//Base64 encoding service used by AuthenticationService
var Base64 = {

    keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this.keyStr.charAt(enc1) +
                this.keyStr.charAt(enc2) +
                this.keyStr.charAt(enc3) +
                this.keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
    },

    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            window.alert("There were invalid base64 characters in the input text.\n" +
                "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                "Expect errors in decoding.");
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        do {
            enc1 = this.keyStr.indexOf(input.charAt(i++));
            enc2 = this.keyStr.indexOf(input.charAt(i++));
            enc3 = this.keyStr.indexOf(input.charAt(i++));
            enc4 = this.keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";

        } while (i < input.length);

        return output;
    }
};