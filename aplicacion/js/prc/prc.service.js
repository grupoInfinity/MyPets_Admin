angular.module('vacunaService', []).
    factory('Vacuna', function ($http, URL_API) {

        var service = {};

        service.findAll = findAll;
        service.findById = findById;
        service.findByMasc = findByMasc;
        service.borrar = borrar;
        service.insertar = insertar;
        service.actualizar = actualizar;
        service.activar = activar;
        service.findAllTpvac = findAllTpvac;

        function findAllTpvac(callback) {
            var url = URL_API + '/servicios/ctg/ctg_tipovacuna.php?accion=C&estado=A';
            //console.log(url);
            $http.get(url).
                then(function (response) {
                    callback(response);
                });
        };

        function findAll(callback) {
            $http.get(URL_API + '/servicios/prc/prc_vacuna.php?accion=C').
                then(function (response) {
                    callback(response);
                });
        };

        function findByMasc(idMasc, callback) {
            var url = URL_API + '/servicios/prc/prc_vacuna.php?accion=C&idmasc=' + idMasc;
            //console.log(url);
            $http.get(url).
                then(function (response) {
                    callback(response);
                });
        };

        function findById(idMasc, idTpvac, callback) {
            var url = URL_API + '/servicios/prc/prc_vacuna.php?accion=C&idmasc=' + idMasc
                + '&idtpvac=' + idTpvac;
            //console.log(url);
            $http.get(url).
                then(function (response) {
                    callback(response);
                });
        };

        function borrar(id, callback) {
            $http.post(URL_API + '/servicios/prc/prc_vacuna.php?accion=D&id=' + id).
                then(function (response) {
                    callback(response);
                });
        };

        function activar(id, usuario, callback) {
            $http.post(URL_API + '/servicios/prc/prc_vacuna.php?accion=A&id=' + id + '&user=' + usuario, id).
                then(function (response) {
                    callback(response);
                });
        };

        function insertar(vacuna, callback) {

            var url = URL_API + '/servicios/prc/prc_vacuna.php?accion=I' +
                '&idmasc=' + vacuna.id_mascota +
                '&idtpvac=' + vacuna.id_tipovacuna +
                '&user=' + vacuna.usuario;
            $http.post(url, vacuna).
                then(function (response) {
                    callback(response);
                });
        };

        function actualizar(vacuna, callback) {

            var url = URL_API + '/servicios/prc/prc_vacuna.php?accion=U' +
                '&idmasc=' + vacuna.idmasc +
                '&idtpvac=' + vacuna.idtpvac +
                '&user=' + vacuna.usuario;

            $http.post(url, vacuna).
                then(function (response) {
                    callback(response);
                });
        };

        return service;

    }).service('popupService', function ($window) {
        this.showPopup = function (message) {
            return $window.confirm(message);
        }
    });


//////*********//////////////////MASCOTA SERVICE /////////////////**********////////

angular.module('mascService', []).
    factory('Masc', function ($http, URL_API) {

        var service = {};

        service.findAlls = findAlls;
        service.borrar = borrar;
        service.insertar = insertar;
        service.actualizar = actualizar;
        service.actualizarFoto = actualizarFoto;
        service.findByCo = findByCo;
        service.findById = findById;
        service.findAllA = findAllA;
        service.activar = activar;
        service.findAllTpmasc = findAllTpmasc;
        service.findAllDept = findAllDept;
        service.findMuni = findMuni;

        function findAlls(idRol, dueno, callback) {
            var url = "";
            if (idRol == 1) {//ADMIN
                url = URL_API + '/servicios/prc/prc_mascota.php?accion=C';
            }
            if (idRol == 2) {//CLIENTE
                url = URL_API + '/servicios/prc/prc_mascota.php?accion=C&dueno=' + dueno;
            }

            //console.log(url);
            $http.get(url).
                then(function (response) {
                    callback(response);
                });
        };

        function findAllA(callback) {
            var url = URL_API + '/servicios/prc/prc_mascota.php?accion=C&estado=A';

            //console.log(url);
            $http.get(url).
                then(function (response) {
                    callback(response);
                });
        };
        function findById(mascId, callback) {
            var url = URL_API + '/servicios/prc/prc_mascota.php?accion=C&id=' + mascId;
            //console.log(url);
            $http.get(url).
                then(function (response) {
                    callback(response);
                });
        };

        function findAllTpmasc(callback) {
            var url = URL_API + '/servicios/ctg/ctg_tipomascota.php?accion=C&estado=A';
            //console.log(url);
            $http.get(url).
                then(function (response) {
                    callback(response);
                });
        };
        function findAllDept(callback) {
            var url = URL_API + '/servicios/ctg/ctg_depto.php?accion=C&estado=A';
            //console.log(url);
            $http.get(url).
                then(function (response) {
                    callback(response);
                });
        };
        function findMuni(deptsId, callback) {
            var url = URL_API + '/servicios/ctg/ctg_muni.php?accion=C&idDepto=' + deptsId + '&estado=A';
            //console.log(url);
            $http.get(url).
                then(function (response) {
                    callback(response);
                });
        };

        function findByCo(mascId, callback) {
            var url = URL_API + '/servicios/prc/prc_mascota.php?accion=C&codigo=' + mascId;

            $http.get(url).
                then(function (response) {
                    callback(response);
                });
        };


        function borrar(mascId, usuario, callback) {
            var url = URL_API + '/servicios/prc/prc_mascota.php?accion=D&id=' + mascId
                + '&user=' + usuario;

            //console.log(url);
            $http.post(url, mascId).
                then(function (response) {
                    callback(response);
                });
        };

        function activar(mascId, usuario, callback) {
            var url = URL_API + '/servicios/prc/prc_mascota.php?accion=A&id=' + mascId
                + '&user=' + usuario;
            //console.log(url);
            $http.post(url, mascId).
                then(function (response) {
                    callback(response);
                });
        };

        function formatoFecha(fecha) {
            var year = fecha.getFullYear();
            var mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
            var dia = ("0" + fecha.getDate()).slice(-2);
            var fechaFormateada = year + "-" + mes + "-" + dia;

            return fechaFormateada;
        };

        function insertar(usuario, callback) {
            var url = URL_API + '/servicios/prc/prc_mascota.php?accion=I' +
                '&dueno=' + usuario.dueno +
                '&tpmascota=' + usuario.idtpmasc +
                '&muni=' + usuario.idmuni +
                '&direccion=' + usuario.direccion +
                '&estadodir=' + usuario.estadodir +
                '&nmasc=' + usuario.nmasc +
                '&codigo=' + usuario.codigo +
                '&nacim=' + formatoFecha(usuario.nacim) +
                '&estado=' + usuario.estado +
                '&user=' + usuario.usuario+
                '&foto=' + usuario.foto;

            console.log(url);

            $http.post(url, usuario).
                then(function (response) {
                    callback(response);
                });
        };
        /*function actualizar(usuario, callback) {
            var url = URL_API + '/servicios/prc/prc_mascota.php?accion=U';
        
            var formData = new FormData();
            formData.append('id', usuario.idmasc);
            formData.append('tpmascota', usuario.idtpmasc);
            formData.append('muni', usuario.idmuni);
            formData.append('direccion', usuario.direccion);
            formData.append('estadodir', usuario.estadodir ? 'A' : 'I');
            formData.append('nmasc', usuario.nmasc);
            formData.append('codigo', usuario.codigo);
            formData.append('estado', usuario.estado ? 'A' : 'I');
            formData.append('user', usuario.usuario);
            formData.append('nacim', formatoFecha(usuario.nacim));
            //formData.append('foto', file);
        
            console.log(url);
        
            $http.post(url, formData, {
                headers: {
                    'Content-Type': undefined  // Set to undefined to let Angular set the correct content type
                },
            }).then(function(response) {
                callback(response);
            });
        }*/
        

        function actualizar(usuario, callback){
            var url = URL_API + '/servicios/prc/prc_mascota.php?accion=U'+
            '&id=' + usuario.idmasc +
            '&tpmascota=' + usuario.idtpmasc + 
            '&muni=' + usuario.idmuni + 
            '&direccion=' + usuario.direccion + 
            '&estadodir=' + (usuario.estadodir ? 'A' : 'I')+ 
            '&nmasc=' + usuario.nmasc + 
            '&codigo=' + usuario.codigo + 
            '&estado=' + (usuario.estado ? 'A' : 'I') +
            '&user=' + usuario.usuario +
            '&nacim=' + formatoFecha(usuario.nacim);
            

            console.log(url);
            $http.post(url).
            then(function(response) {
                callback(response);
             });
        };
        function actualizarFoto(masc, callback) {
            var formData = new FormData();
            formData.append('accion', 'U');
            formData.append('id', masc.idmasc);
            formData.append('user', masc.usuario);
            formData.append('foto', masc.foto);
        
            var url = URL_API + '/servicios/prc/mascotafoto.php';
        
            $http.post(url, formData, {
            }).then(function(response) {
                callback(response);
                console.log(response);
                console.log(url,formData);
            });
        };




        return service;

    }).service('popupService', function ($window) {
        this.showPopup = function (message) {
            return $window.confirm(message);
        }
    });

