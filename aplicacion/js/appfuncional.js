var app = angular.module('japapp', ['ui.router', 'ngRoute', 'ngCookies', 'ngSanitize', 'ui.select',
	'datatables', 'datatables.bootstrap'
	//CATALOGOS
	, 'deptsService', 'munisService', 'tpvacService', 'tpmascService'

	//PRC
	, 'vacunaService', 'mascService'

	//SEGURIDAD
	, 'authenticationService', 'flashService', 'usrService'])


	//CATALOGOS
	.controller('HomeController', HomeController)
	.controller('DeptsTableCtrl', DeptsTableCtrl)
	.controller('MunicipioTableCtrl', MunicipioTableCtrl)

	//PROCEDIMIENTOS
	.controller('MascotaListCtrl', MascotaListCtrl)
	.controller('VacunaCtrl', VacunaCtrl)

	;

app.config(['$qProvider', function ($qProvider) {
	$qProvider.errorOnUnhandledRejections(true);
}]);

angular.module('japapp')
	.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', function ($httpProvider, $stateProvider, $urlRouterProvider) {
		/*
		 * Use a HTTP interceptor to add a nonce to every request to prevent MSIE from caching responses.
		 */
		$httpProvider.interceptors.push('ajaxNonceInterceptor');
		//SEGURIDAD

		//USUARIO

		$stateProvider.
			state('menuMaster.addUsuario', {
				url: '/addUsuario',
				templateUrl: 'partials/security/sec_usuario/addUsuario.html',
				controller: UsuarioAddCtrl
			}).state('menuMaster.listUsuario', {
				url: '/listUsuario',
				templateUrl: 'partials/security/sec_usuario/listUsuario.html'
			}).state('menuMaster.editUsuario', {
				url: '/:idUsuario/editUsuario',
				templateUrl: 'partials/seccurity/sec_usuario/editUsuario.html',
				controller: UsuarioEditCtrl
			});

		//ROL

		$stateProvider.
			state('menuMaster.addRol', {
				url: '/addRol',
				templateUrl: 'partials/security/sec_rol/addRol.html',
				controller: RolAddCtrl
			}).state('menuMaster.listRol', {
				url: '/listRol',
				templateUrl: 'partials/security/sec_rol/listUsuario.html'
			}).state('menuMaster.editRol', {
				url: '/:idRol/editRol',
				templateUrl: 'partials/security/sec_rol/editRol.html',
				controller: RolEditCtrl
			});

		//OPCION PRINCIPAL

		$stateProvider.
			state('menuMaster.addOpcPpal', {
				url: '/addOpcPpal',
				templateUrl: 'partials/security/sec_opc_principal/addOpcPpal.html',
				controller: OpcPpalAddCtrl
			}).state('menuMaster.listOpcPpal', {
				url: '/listOpcPpal',
				templateUrl: 'partials/security/sec_opc_principal/listUsuario.html'
			}).state('menuMaster.editOpcPpal', {
				url: '/:idOpcPpal/editOpcPpal',
				templateUrl: 'partials/security/sec_opc_principal/editOpcPpal.html',
				controller: OpcPpalEditCtrl
			});

		//OPCION ROL

		$stateProvider.
			state('menuMaster.addOpcRol', {
				url: '/addOpcRol',
				templateUrl: 'partials/security/sec_opc_rol/addOpcRol.html',
				controller: OpcRolAddCtrl
			}).state('menuMaster.listOpcRol', {
				url: '/listOpcRol',
				templateUrl: 'partials/security/sec_opc_rol/listUsuario.html'
			}).state('menuMaster.editOpcRol', {
				url: '/:idOpcRol/editOpcRol',
				templateUrl: 'partials/security/sec_opc_rol/editOpcRol.html',
				controller: OpcRolEditCtrl
			});

		//OPCION

		$stateProvider.
			state('menuMaster.addOpcion', {
				url: '/addOpcion',
				templateUrl: 'partials/security/sec_opcion/addOpcion.html',
				controller: OpcionAddCtrl
			}).state('menuMaster.listOpcion', {
				url: '/listOpcion',
				templateUrl: 'partials/security/sec_opcion/listUsuario.html'
			}).state('menuMaster.editOpcion', {
				url: '/:idOpcion/editOpcion',
				templateUrl: 'partials/security/sec_opcion/editOpcion.html',
				controller: OpcionEditCtrl
			});


		//CATALOGOS
		//DEPARTAMENTOS CRUD
		$stateProvider.
			state('menuMaster.addDepts', {
				url: '/addDepts',
				templateUrl: 'partials/catalogos/ctg_depts/addDepts.html',
				controller: DeptsAddCtrl
			}).state('menuMaster.listDepts', {
				url: '/listDepts',
				templateUrl: 'partials/catalogos/ctg_depts/listDepts.html'
			}).state('menuMaster.editDepts', {
				url: '/:idDepts/editDepts',
				templateUrl: 'partials/catalogos/ctg_depts/editDepts.html',
				controller: DeptsEditCtrl
			});

		//MUNICIPIOS CRUD
		$stateProvider.
			state('menuMaster.addMunis', {
				url: '/addMunis',
				templateUrl: 'partials/catalogos/ctg_muni/addMuni.html',
				controller: MunicipioAddCtrl
			}).state('menuMaster.listMuni', {
				url: '/listMuni',
				templateUrl: 'partials/catalogos/ctg_muni/listMuni.html'
			}).state('menuMaster.editMuni', {
				url: '/:idDepto/:id/editMuni',
				templateUrl: 'partials/catalogos/ctg_muni/editMuni.html',
				controller: MunicipioEditCtrl
			});


		// MENU Y LOGIN
		$stateProvider
			.state('menuMaster', {
				abstract: true,
				templateUrl: 'partials/menuMaster.html'
			})
			.state('menuMaster.home', {
				url: '/home',
				templateUrl: 'partials/security/home/home.html'
			})
			.state('login', {
				url: '/login',
				controller: LoginController,
				templateUrl: 'partials/security/login/login.html',
				controllerAs: 'vm'
			});

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
		if ($rootScope.globals.currentUser) {
			$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
		}

		$rootScope.$on('$locationChangeStart', function (event, next, current) {
			// redirect to login page if not logged in and trying to access a restricted page
			var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
			var loggedIn = $rootScope.globals.currentUser;

			if (restrictedPage && !loggedIn) {
				$location.path('/login');
			}

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
						if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
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
})();