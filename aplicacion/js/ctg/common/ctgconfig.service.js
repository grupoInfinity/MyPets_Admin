//DEPARTAMENTO
angular.module('deptsService', []).
    factory('Depts', function ($http, URL_API) {

        var service = {};

        service.findAll = findAll;
        service.findAllByFilters = findAllByFilters;
        service.borrar = borrar;
        service.insertar = insertar;
        service.actualizar = actualizar;
        service.findById = findById;
        service.activar = activar;


        function activar(deptId, usuario, callback) {
            $http.post(URL_API + '/servicios/ctg/ctg_depto.php?accion=A&id=' + deptId + '&user=' + usuario, deptId).
                then(function (response) {
                    callback(response);
                });
        };

        function findAll(callback) {
            var url = URL_API + '/servicios/ctg/ctg_depto.php?accion=C';
            console.log(url);
            $http.get(url).
                then(function (response) {
                    callback(response);
                });
        };

        function findAllByFilters(filtro, callback) {
            var url = URL_API + '/servicios/ctg/ctg_depto.php?accion=C&estado=' + filtro.estado;
            $http.get(url).
            then(function (response) {
                callback(response);
            });
        };

        function findById(deptId, callback) {
            $http.get(URL_API + '/servicios/ctg/ctg_depto.php?accion=C&id=' + deptId).
            then(function (response) {
                callback(response);
            });
        };

        function borrar(deptId, usuario, callback) {
            $http.post(URL_API + '/servicios/ctg/ctg_depto.php?accion=D&id=' + deptId + '&user=' + usuario, deptId).
            then(function (response) {
                callback(response);
            });
        };

        function insertar(dept, callback) {
            $http.post(URL_API + '/servicios/ctg/ctg_depto.php?accion=I&desc=' + dept.descripcion + '&user=' + dept.usuario, dept).
            then(function (response) {
                callback(response);
            });
        };

        function actualizar(dept, callback) {
            var url = URL_API + '/servicios/ctg/ctg_depto.php?accion=U' +
                '&id=' + dept.id +
                '&desc=' + dept.descripcion +
                '&estado=' + (dept.estado ? 'A' : 'I') +
                '&user=' + dept.usuario;

            console.log(url);
            $http.post(url, dept).
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

//MUNICIPIO
angular.module('munisService', []).
    factory('Munis', function ($http, URL_API) {

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


        function activar(munisId, usuario, callback) {
            $http.post(URL_API + '/servicios/ctg/ctg_muni.php?accion=A&id=' + munisId + '&user=' + usuario, munisId).
            then(function (response) {
                callback(response);
            });
        };



        function findAll(callback) {
            var url = URL_API + '/servicios/ctg/ctg_muni.php?accion=C';
            console.log(url);
            $http.get(url).
                then(function (response) {
                    callback(response);
                });
        };

        function findAllByFilters(filtro, callback) {
            var url = URL_API + '/servicios/ctg/ctg_muni.php?accion=C&estado=' + filtro.estado;
            console.log(url);
            $http.get(url).
                then(function (response) {
                    callback(response);
                });
        };

        function findById(deptsId, munisId, callback) {
            var url = URL_API + '/servicios/ctg/ctg_muni.php?accion=C&idDepto=' + deptsId + '&id=' + munisId;

            console.log(url);
            $http.get(url).
                then(function (response) {
                    callback(response);
                });
        };

        function findByIdDepto(deptsId, callback) {
            var url = URL_API + '/servicios/ctg/ctg_muni.php?accion=C&idDepto=' + deptsId + '&estado=A';

            console.log(url);
            $http.get(url).
                then(function (response) {
                    callback(response);
                });
        };

        function findByIds(munisId, callback) {
            $http.get(URL_API + '/servicios/ctg/ctg_muni.php?accion=C&id=' + munisId).
                console.log(url);
            then(function (response) {
                callback(response);
            });
        };

        function borrar(munisId, deptsId, usuario, callback) {
            var url = URL_API + '/servicios/ctg/ctg_muni.php?accion=D&idDepto=' + deptsId + '&id=' + munisId + '&user=' + usuario;

            console.log(url);
            $http.post(url, deptsId).
                then(function (response) {
                    callback(response);
                });
        };

        function insertar(munis, callback) {
            $http.post(URL_API + '/servicios/ctg/ctg_muni.php?accion=I&idDepto=' + munis.id_depto + '&desc=' + munis.descripcion + '&user=' + munis.usuario, munis).
            then(function (response) {
                callback(response);
            });
        };

        function actualizar(munis, callback) {
            var url = URL_API + '/servicios/ctg/ctg_muni.php?accion=U' +
                '&id=' + munis.id +
                '&idDepto=' + munis.id_depto +
                '&desc=' + munis.descripcion +
                '&estado=' + (munis.estado ? 'A' : 'I') +
                '&user=' + munis.usuario;
            console.log(url);
            $http.post(url, munis).
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
//TIPO VACUNA
angular.module('tpvacService', []).
    factory('Tpvac', function ($http, URL_API) {

        var service = {};

        service.findAll = findAll;
        service.findAllByFilters = findAllByFilters;
        service.borrar = borrar;
        service.insertar = insertar;
        service.actualizar = actualizar;
        service.findById = findById;
        service.activar = activar;


        function activar(tpvacId, usuario, callback) {
            console.log(url);
            $http.post(URL_API + '/servicios/ctg/ctg_tipovacuna.php?accion=A&id=' + tpvacId +
                '&user=' + usuario, tpvacId).
                then(function (response) {
                    callback(response);
                });
        };

        function findAll(callback) {
            var url = URL_API + '/servicios/ctg/ctg_tipovacuna.php?accion=C';
            console.log(url);
            $http.get(url).
                then(function (response) {
                    callback(response);
                });
        };

        function findAllByFilters(filtro, callback) {
            var url = URL_API + '/servicios/ctg/ctg_tipovacuna.php?accion=C&estado=' + filtro.estado;
            console.log(url);
            $http.get(url).
            then(function (response) {
                callback(response);
            });
        };

        function findById(deptId, callback) {
            console.log(1);
            $http.get(URL_API + '/servicios/ctg/ctg_tipovacuna.php?accion=C&id=' + deptId).
            then(function (response) {
                callback(response);
            });
        };

        function borrar(deptId, usuario, callback) {
            $http.post(URL_API + '/servicios/ctg/ctg_tipovacuna.php?accion=D&id=' + deptId + '&user=' + usuario, deptId).
            then(function (response) {
                callback(response);
            });
        };

        function insertar(dept, callback) {
            $http.post(URL_API + '/servicios/ctg/ctg_tipovacuna.php?accion=I&desc=' + dept.descripcion +
                '&user=' + dept.usuario, dept).
            then(function (response) {
                callback(response);
            });
        };

        function actualizar(dept, callback) {
            var url = URL_API + '/servicios/ctg/ctg_tipovacuna.php?accion=U' +
                '&id=' + dept.id +
                '&desc=' + dept.descripcion +
                '&estado=' + (dept.estado ? 'A' : 'I') +
                '&user=' + dept.usuario;

            console.log(url);
            $http.post(url, dept).
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

//TIPO MASCOTA
angular.module('tpmascService', []).
    factory('tpmasc', function ($http, URL_API) {

        var service = {};

        service.findAll = findAll;
        service.findAllByFilters = findAllByFilters;
        service.borrar = borrar;
        service.insertar = insertar;
        service.actualizar = actualizar;
        service.findById = findById;
        service.activar = activar;


        function activar(tpvacId, usuario, callback) {
            $http.post(URL_API + '/servicios/ctg/ctg_tipomascota.php?accion=A&id=' + tpvacId +
                '&user=' + usuario, tpvacId).
                then(function (response) {
                    callback(response);
                });
        };

        function findAll(callback) {
            var url = URL_API + '/servicios/ctg/ctg_tipomascota.php?accion=C';
            console.log(url);
            $http.get(url).
                then(function (response) {
                    callback(response);
                });
        };

        function findAllByFilters(filtro, callback) {
            var url = URL_API + '/servicios/ctg/ctg_tipomascota.php?accion=C&estado=' + filtro.estado;
            console.log(url);
            $http.get(url).
                then(function (response) {
                    callback(response);
                });
        };

        function findById(deptId, callback) {
            $http.get(URL_API + '/servicios/ctg/ctg_tipomascota.php?accion=C&id=' + deptId).
                then(function (response) {
                    callback(response);
                });
        };

        function borrar(deptId, usuario, callback) {
            $http.post(URL_API + '/servicios/ctg/ctg_tipomascota.php?accion=D&id=' + deptId +
                '&user=' + usuario, deptId).
                then(function (response) {
                    callback(response);
                });
        }; 

        function insertar(dept, callback) {
            $http.post(URL_API + '/servicios/ctg/ctg_tipomascota.php?accion=I&desc=' + dept.descripcion +
                '&user=' + dept.usuario, dept).
                then(function (response) {
                    callback(response);
                });
        };

        function actualizar(dept, callback) {
            var url = URL_API + '/servicios/ctg/ctg_tipomascota.php?accion=U' +
                '&id=' + dept.id +
                '&desc=' + dept.descripcion +
                '&estado=' + (dept.estado ? 'A' : 'I') +
                '&user=' + dept.usuario;

            console.log(url);
            $http.post(url, dept).
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