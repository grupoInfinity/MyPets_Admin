var app = angular.module('aplicacion', ['ui.router', 'ngRoute', 'ngCookies', 'ngSanitize',
  'ui.select', 'datatables', 'datatables.bootstrap'
  //CATALOGOS
  , 'munisService', 'deptsService', 'tpvacService', 'tpmascService'
  //PRC
  , 'vacunaService', 'mascService'

  //SEGURIDAD
  , 'opcionService', 'opcRolService', 'opcionPrincipalService', 'rolUsuarioService'
  , 'rolService', 'authenticationService', 'flashService', 'usrService'
  , 'authorizationService', 'setupService', 'usuarioService'

])

  //CATALOGOS
  .controller('HomeController', HomeController)
  .controller('DeptsTableCtrl', DeptsTableCtrl)
  .controller('MunisTableCtrl', MunisTableCtrl)
  .controller('tpvacTableCtrl', tpvacTableCtrl)
  .controller('tpmascTableCtrl', tpmascTableCtrl)
  //PROCEDIMIENTOS
  .controller('MascotaListCtrl', MascotaListCtrl)
  .controller('VacunaCtrl', VacunaCtrl)

  //SEGURIDAD
  .controller('UsuarioListCtrl', UsuarioListCtrl)
  //.controller('UsuarioListCtrl', UsuarioListCtrl)
  .controller('RolListCtrl', RolListCtrl)
  .controller('OpcionPrincipalListCtrl', OpcionPrincipalListCtrl)
  .controller('RolUsuarioCtrl', RolUsuarioCtrl)
  .controller('OpcionTableCtrl', OpcionTableCtrl)
  .controller('OpcionRolCtrl', OpcionRolCtrl)

  //REGISTRO PRINCIPAL
  //.controller('RegistroMainCtrl', RegistroMainCtrl)

  ;

app.config(['$qProvider', function ($qProvider) {
  $qProvider.errorOnUnhandledRejections(true);
}]);

angular.module('aplicacion')
  .config(['$httpProvider', '$stateProvider', '$urlRouterProvider',
    function ($httpProvider, $stateProvider, $urlRouterProvider) {
      /*
       * Use a HTTP interceptor to add a nonce to every request to prevent MSIE from caching responses.
       */
      $httpProvider.interceptors.push('ajaxNonceInterceptor');
      //SEGURIDAD

      //USUARIO
      $stateProvider.
        state('menuMaster.addUsuario', {
          url: '/addUsuario',
          templateUrl: 'partials/security/usuario/addUsuario.html',
          controller: UsuarioAddCtrl
        }).state('menuMaster.listUsuario', {
          url: '/listUsuario',
          templateUrl: 'partials/security/usuario/listUsuario.html'
        }).state('menuMaster.editUsuario', {
          url: '/:idUsuario/editUsuario',
          templateUrl: 'partials/security/usuario/editUsuario.html',
          controller: UsuarioEditCtrl
        });

      //ROL
      $stateProvider.
        state('menuMaster.addRol', {
          url: '/addRol',
          templateUrl: 'partials/security/rol/addRol.html',
          controller: RolAddCtrl
        }).state('menuMaster.listRol', {
          url: '/listRol',
          templateUrl: 'partials/security/rol/listRol.html',
          controller: RolListCtrl
        }).state('menuMaster.editRol', {
          url: '/:idRol/editRol',
          templateUrl: 'partials/security/rol/editRol.html',
          controller: RolEditCtrl
        });

      //OPCION
      $stateProvider.
        state('menuMaster.addOpcion', {
          url: '/addOpcion',
          templateUrl: 'partials/security/opcion/addOpcion.html',
          controller: OpcionAddCtrl
        }).state('menuMaster.listOpcion', {
          url: '/listOpcion',
          templateUrl: 'partials/security/opcion/listOpcion.html'

        }).state('menuMaster.editOpcion', {
          url: '/:idOpcion/editOpcion',
          templateUrl: 'partials/security/opcion/editOpcion.html',
          controller: OpcionEditCtrl
        });

      //OPCION PRINCIPAL
      $stateProvider.
        state('menuMaster.addOpcionPrincipal', {
          url: '/addOpcionPrincipal',
          templateUrl: 'partials/security/menu/addOpcionPrincipal.html',
          controller: OpcionPrincipalAddCtrl
        }).state('menuMaster.listOpcionPrincipal', {
          url: '/listOpcionPrincipal',
          templateUrl: 'partials/security/menu/listOpcionPrincipal.html'
        }).state('menuMaster.editOpcionPrincipal', {
          url: '/:idOpcPpal/editOpcionPrincipal',
          templateUrl: 'partials/security/menu/editOpcionPrincipal.html',
          controller: OpcionPrincipalEditCtrl
        });

      //CATALOGOS
      //DEPTS CRUD
      $stateProvider.
        state('menuMaster.addDepts', {
          url: '/addDepts',
          templateUrl: 'partials/ctg/ctg_depts/addDepts.html',
          controller: DeptsAddCtrl
        }).state('menuMaster.listDepts', {
          url: '/listDepts',
          templateUrl: 'partials/ctg/ctg_depts/listDepts.html'
        }).state('menuMaster.editDepts', {
          url: '/:idDepts/editDepts',
          templateUrl: 'partials/ctg/ctg_depts/editDepts.html',
          controller: DeptsEditCtrl
        });

      //MUNICIPIO
      $stateProvider.
        state('menuMaster.addMuni', {
          url: '/addMuni',
          templateUrl: 'partials/ctg/ctg_muni/addMuni.html',
          controller: MunisAddCtrl
        }).state('menuMaster.listMuni', {
          url: '/listMuni',
          templateUrl: 'partials/ctg/ctg_muni/listMuni.html'
        }).state('menuMaster.editMunis', {
          url: '/:idDepto/:idMunis/editMuni',
          templateUrl: 'partials/ctg/ctg_muni/editMuni.html',
          controller: MunisEditCtrl
        });

      //TIPO MASCOTA
      $stateProvider.
        state('menuMaster.addTPmascota', {
          url: '/addTPmascota',
          templateUrl: 'partials/ctg/ctg_tpmascota/addTPmascota.html',
          controller: tpmascAddCtrl
        }).state('menuMaster.listTPmascota', {
          url: '/listTPmascota',
          templateUrl: 'partials/ctg/ctg_tpmascota/listTPmascota.html'
        }).state('menuMaster.editTPmascota', {
          url: '/:idtpmasc/editTPmascota',
          templateUrl: 'partials/ctg/ctg_tpmascota/editTPmascota.html',
          controller: tpmascEditCtrl
        });

      //TIPO VACUNA
      $stateProvider.
        state('menuMaster.addTipovac', {
          url: '/addTipovac',
          templateUrl: 'partials/ctg/ctg_tipovac/addTipovac.html',
          controller: tpvacAddCtrl
        }).state('menuMaster.listTipovac', {
          url: '/listTipovac',
          templateUrl: 'partials/ctg/ctg_tipovac/listTipovac.html'
        }).state('menuMaster.editTipovac', {
          url: '/:idtpvac/editTipovac',
          templateUrl: 'partials/ctg/ctg_tipovac/editTipovac.html',
          controller: tpvacEditCtrl
        });


      //MASCOTA
      $stateProvider.
        state('menuMaster.addMascota', {
          url: '/addMascota',
          templateUrl: 'partials/prc/prc_mascotas/addMascota.html',
          controller: MascotaAddCtrl
        }).state('menuMaster.listMascota', {
          url: '/listMascota',
          templateUrl: 'partials/prc/prc_mascotas/listMascota.html'
        }).state('menuMaster.editMascota', {
          url: '/:idMasc/editMascota',
          templateUrl: 'partials/prc/prc_mascotas/editMascota.html',
          controller: MascotaEditCtrl
        });

      // MENU, -LOGIN - REGISTRO - RECUP
      $stateProvider
        .state('registroMain', {
          url: '/registroMain',
          controller: RegistroMainCtrl,
          templateUrl: 'partials/security/login/registroMain.html'
        })
        //RECUPERACION
        .state('recupMain', {
          url: '/recupMain',
          controller: RecupMainCtrl,
          templateUrl: 'partials/recupMain.html',
          controllerAs: 'rm'
        })
        .state('insertCode', {
          url: '/:usr/insertCode',
          //url: '/insertCode',
          templateUrl: 'partials/security/recup/insertCode.html',
          controller: insertCodeCtrl
        })
        .state('editClave', {
          url: '/:usr/editClave',
          templateUrl: 'partials/security/recup/editClave.html',
          controller: editClaveCtrl
        })
        //MENU
        .state('menuMaster', {
          abstract: true,
          templateUrl: 'partials/menuMaster.html'
        })
        .state('menuMaster.home', {
          url: '/home',
          templateUrl: 'partials/security/home/home.html'
        })
        .state('menuMaster.home2', {
          url: '/home2',
          templateUrl: 'partials/security/home/home2.html'
        })
        .state('menuMaster.homeMenu', {
          url: '/homeMenu',
          templateUrl: 'partials/security/home/homeMenu.html'
        })
        .state('login', {
          url: '/login',
          controller: LoginController,
          templateUrl: 'partials/security/login/login.html',
          controllerAs: 'vm'
        })
        ;

      $urlRouterProvider.otherwise('/home');

    }])
  .factory('ajaxNonceInterceptor', function () {
    // This interceptor is equivalent to the behavior induced by $.ajaxSetup({cache:false});

    var param_start = /\?/;

    return {
      request: function (config) {
        if (config.method == 'GET') {
          // Add a query parameter named '_' to the URL, with a value equal to the current timestamp
          config.url += (param_start.test(config.url) ? "&" : "?") + '_=' + new Date().getTime();
        }
        return config;
      }
    }
  })
  .run(function ($rootScope, $location, $cookieStore, $http) {
    $rootScope.globals = $cookieStore.get('globals') || {};
    //$rootScope.user = $cookieStore.get('user');
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      // redirect to login page if not logged in and trying to access a restricted page
      function secCode(longitud) {
        const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=[]{}|;:,.<>?";
        let codigo = "";
        for (let i = 0; i < longitud; i++) {
          const indice = Math.floor(Math.random() * caracteres.length);
          codigo += caracteres.charAt(indice);
        }
        return codigo;
      }

      var loggedIn = $rootScope.globals.currentUser;
      var user = $rootScope.user;
      var restrictedPage = $.inArray($location.path(), ['/login', '/registroMain', '/recupMain',
      '/'+user+'/insertCode','/'+user+'/editClave']) === -1;
      //console.log($rootScope.user);


      if (restrictedPage) {
        if(!loggedIn){
          $location.path('/login');
        }     
      }
      $rootScope.user=secCode(30);
      

    });
  })
  .filter('propsFilter', function () {
    return function (items, props) {
      var out = [];

      if (angular.isArray(items)) {
        items.forEach(function (item) {
          var itemMatches = false;

          var keys = Object.keys(props);
          for (var i = 0; i < keys.length; i++) {
            var prop = keys[i];
            var text = props[prop].toLowerCase();
            if (item[prop] && item[prop].toString().toLowerCase().indexOf(text) !== -1) {
              itemMatches = true;
              break;
            }
          }

          if (itemMatches) {
            out.push(item);
          }
        });
      } else {
        // Let the output be the input untouched
        out = items;
      }

      return out;
    }
  });

(function () {

  app.directive('onlyLettersInput', onlyLettersInput);
  app.directive('emailInput', emailInput);
  app.directive('alphanumericInput', alphanumericInput);

  app.directive('stringToNumber', stringToNumber);
  app.directive('stringToDate', stringToDate);

  app.directive("moveNextOnEnter", function () {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if (event.which === 13) {
          var $nextElement = angular.element(document.getElementById(attrs.moveNextOnEnter));
          if ($nextElement.length == 0) {
            $nextElement = angular.element(document.getElementById(attrs.id));
          }
          $nextElement[0].autofocus = true;
          $nextElement[0].focus();
          $nextElement[0].setSelectionRange(0, $nextElement[0].value.length);
          event.preventDefault();
        }
      });
    };
  });

  app.directive("moveNextOnTab", function () {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if (event.which === 9) {
          var $nextElement = angular.element(document.getElementById(attrs.moveNextOnEnter));
          if ($nextElement.length == 0) {
            $nextElement = angular.element(document.getElementById(attrs.id));
          }
          $nextElement[0].autofocus = true;
          $nextElement[0].focus();
          $nextElement[0].setSelectionRange(0, $nextElement[0].value.length);
          event.preventDefault();
        }
      });
    };
  });

  app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if (event.which === 13) {
          scope.$apply(function () {
            scope.$eval(attrs.ngEnter);
          });
          event.preventDefault();
        }
      });
    };
  });

  app.directive('ngTab', function () {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if (event.which === 9) {
          scope.$apply(function () {
            scope.$eval(attrs.ngEnter);
          });
          event.preventDefault();
        }
      });
    };
  });

  app.directive('appFilereader', function ($q) {
    var slice = Array.prototype.slice;

    return {
      restrict: 'A',
      require: '?ngModel',
      link: function (scope, element, attrs, ngModel) {
        if (!ngModel) return;

        ngModel.$render = function () { };

        element.bind('change', function (e) {
          var element = e.target;

          $q.all(slice.call(element.files, 0).map(readFile))
            .then(function (values) {
              if (element.multiple) ngModel.$setViewValue(values);
              else ngModel.$setViewValue(values.length ? values[0] : null);
            });

          function readFile(file) {
            var deferred = $q.defer();

            var reader = new FileReader();
            reader.onload = function (e) {
              deferred.resolve(e.target.result);
            };
            reader.onerror = function (e) {
              deferred.reject(e);
            };
            reader.readAsDataURL(file);

            return deferred.promise;
          }

        }); //change
      } //link
    }; //return
  });

  app.directive('selectOnClick', ['$window', function ($window) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.on('click', function () {
          if (!$window.getSelection().toString()) {
            this.setSelectionRange(0, this.value.length)
          }
        });
      }
    };
  }]);

  function ngFiles($parse) {
    return {
      require: 'ngModel',
      link: function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
          onChange(scope, { $files: event.target.files });
        });
      }
    };

  };

  function onlyLettersInput() {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          var transformedInput = text.replace(/[^a-zA-Z0-9\@\ñ\Ñ\s\_\-\&\/]/g, '');
          //console.log(transformedInput);
          if (transformedInput !== text) {
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
          }
          return transformedInput;
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  };

  function emailInput() {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          var transformedInput = text.replace(/[^a-z0-9\_\-\@\.]/g, '');
          //console.log(transformedInput);
          if (transformedInput !== text) {
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
          }
          return transformedInput;
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  };

  function alphanumericInput() {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          var transformedInput = text.replace(/[^a-zA-Z0-9\ñ\Ñ\s\_\-\&\/]/g, '');
          //console.log(transformedInput);
          if (transformedInput !== text) {
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
          }
          return transformedInput;
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  };

  function stringToNumber() {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        ngModel.$parsers.push(function (value) {
          return '' + value;
        });
        ngModel.$formatters.push(function (value) {
          return parseFloat(value);
        });
      }
    };
  };

  function stringToDate() {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        ngModel.$parsers.push(function (value) {
          return '' + value;
        });
        ngModel.$formatters.push(function (value) {
          return (value);
        });
      }
    };
  };
})();