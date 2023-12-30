
angular.module('usuarioService', []).
factory('Usuario', function($http, URL_API){

        var service = {};

        service.getUser = getUser;

        function getUser(usuario, callback) {
			var url = URL_API + '/servicios/sec/sec_usuario.php?accion=C&usr=' + usuario;
			//console.log(url);
            $http.get(url).
            then(function(response) {
               
                callback(response);
            });
        
        };

        return service;

  });
