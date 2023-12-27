
/*************************** MASCOTA CONTROLLER ***********************************/

function MascotaAddCtrl($rootScope, $stateParams, $scope,
	URL_API, $filter, $http, $state, Masc) {


	$scope.formType = 'ADD';

	$scope.isNew = function (value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function () {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function () {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		$scope.isVisibleAfterUsuario = false;
		$scope.formType = 'ADD';

		var date = new Date();
		$scope.newMasc = {
			idmasc: "",
			tpmascota: "",
			muni: "",
			direccion: "",
			estadodir: "",
			nmasc: "",
			codigo: "",
			nacim: "",
			foto: "",
			usuario: $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerMasc = function (value) {
		$scope.clearMessages();

		if (value == "ADD") {

			Masc.insertar($scope.newMasc, function (data) {

				$scope.isVisibleAfterUsuario = $scope.isVisibleAfterUsuario ? false : true;

				$scope.formType = "UPD";

				Masc.findById($scope.newMasc.idmasc, function (response) {
					if (response.data.status == 1)
						$scope.newMasc = response.data.info[0];
					// $scope.newUsuario.id_empleado = response.data.info[0].id_empleado;
					// $scope.newUsuario.usr = response.data.info[0].usr;
				});

				//$scope.successMessages = [ 'Usuario Registrado correctamente' ];
				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Registro ingresado correctamente',
					showConfirmButton: false,
					timer: 1000
				})
			}, function (result) {
				if ((result.status == 409) || (result.status == 400)) {
					$scope.errors = result.data;
				} else {
					$scope.errorMessages = ['Unknown error de servidor'];
				}
				$('#notificacionesModal').modal('show');
			});
		}
		else {

			var date = new Date();
			var mascObj = { usuario: $rootScope.globals.currentUser.username };

			$scope.newMasc.usuario = mascObj.usuario;

			Masc.actualizar($scope.newMasc, function (data) {
				$scope.successMessages = ['Mascota Actualizada correctamente'];
				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Registro actualizado correctamente',
					showConfirmButton: false,
					timer: 1000
				})
			}, function (result) {
				if ((result.status == 409) || (result.status == 400)) {
					$scope.errors = result.data;
				} else {
					$scope.errorMessages = ['Unknown error de servidor'];
				}
				$('#notificacionesModal').modal('show');
			});

		}

	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";

};

function MascotaEditCtrl($rootScope, $scope, $filter, $state, $stateParams, 
	URL_API, Usr, Empresa, Almacen, Empleado) {

	$scope.isVisibleAfterUsuario = true;

	$scope.clearMessages = function () {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function () {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		$scope.isVisibleAfterUsuario = false;
		$scope.formType = 'ADD';
		$rootScope.$broadcast("refreshRoles", 0);

		var date = new Date();
		$scope.newUsuario = { 
			idmasc: "",
			tpmascota: "",
			muni: "",
			direccion: "",
			estadodir: "",
			nmasc: "",
			codigo: "",
			nacim: "",
			foto: "",
			usuario: $rootScope.globals.currentUser.username};

		$scope.clearMessages();
	};

	$scope.registerMasc = function (value) {

		$scope.clearMessages();

		if (value == "ADD") {
			Usr.insertar($scope.newUsuario, function (data) {

				$scope.isVisibleAfterUsuario = $scope.isVisibleAfterUsuario ? false : true;
				$scope.formType = "UPD";

				Usr.findById($scope.newUsuario.idmasc, function (response) {
					if (response.data.status == 1)
						$scope.newUsuario = response.data.info[0];
					/*$scope.newUsuario.id_empleado = response.data.info[0].id_empleado;
					$scope.newUsuario.id_empresa = response.data.info[0].id_empresa;
					$scope.newUsuario.id_almacen = response.data.info[0].id_almacen;
					$scope.newUsuario.tipo_usuario = response.data.info[0].tipo_usuario;
					$scope.newUsuario.usr = response.data.info[0].usr;*/
				});

				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Registro actualizado correctamente',
					showConfirmButton: false,
					timer: 1000
				})

			}, function (result) {
				if ((result.status == 409) || (result.status == 400)) {
					$scope.errors = result.data;
				} else {
					$scope.errorMessages = ['Unknown error de servidor'];
				}
				$('#notificacionesModal').modal('show');
			});
		}
		else {

			var date = new Date();
			var usuarioObj = { usuario: $rootScope.globals.currentUser.username };

			$scope.newUsuario.usuario = usuarioObj.usuario;

			Usr.actualizar($scope.newUsuario, function (data) {
				//$scope.successMessages = [ 'Usuario Actualizado correctamente' ];
				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Registro actualizado correctamente',
					showConfirmButton: false,
					timer: 1000
				})
			}, function (result) {
				if ((result.status == 409) || (result.status == 400)) {
					$scope.errors = result.data;
				} else {
					$scope.errorMessages = ['Unknown error de servidor'];
				}
				$('#notificacionesModal').modal('show');
			});


		}

	};

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";

	$scope.loadMasc = function () {

		Usr.findById($stateParams.idmasc,function (response) {
			//if(response.data.status==1)
			$scope.newUsuario = response.data.info[0];
			if ($scope.newUsuario.estado == 'A') {
				$scope.newUsuario.estado = true;
			}
			$scope.loadEmpleado();
		});
	};

	$scope.loadUsuario();


};

function MascotaListCtrl($scope, $rootScope, $state, $compile, $window, popupService,
	 DTOptionsBuilder, DTColumnDefBuilder, Usr, Almacen, URL_API) {
	var vm = this;

	vm.listUsuario = listUsuario;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.usuario = {};

	Usr.findById($rootScope.globals.currentUser.id_empresa, function (response) {
		vm.usuario = response.data.info;
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
		'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(0),
	DTColumnDefBuilder.newColumnDef(1),
	DTColumnDefBuilder.newColumnDef(2),
	DTColumnDefBuilder.newColumnDef(3).notSortable()];

	vm.deleteUsuario = deleteUsuario;
	vm.activateUsuario = activateUsuario;
	vm.editUsuario = editUsuario;

	/*function listUsuario() {
		Usr.findByEmpresa($rootScope.globals.currentUser.id_empresa, function(response) {
			if(response.data.status==1)
			vm.usuario = response.data.info;
		});

	}
	;

	function reloadData(id_empresa) {
		Usr.findByEmpresa(id_empresa, function(response) {
			if(response.data.estado==1){
				vm.usuario = response.data.info;
			}
			else{
				vm.usuario = [];
			}
				
		});

	}*/
	;

	function deleteMasc(usuarioId, id_empresa) {
		Swal.fire({
			title: 'Esta seguro de inactivar este registro?',
			text: "",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, inactivar!'
		}).then((result) => {
			if (result.value) {
				Usr.borrar(usuarioId,
					$rootScope.globals.currentUser.username, function (response) {
					reloadData(id_empresa);
				});

				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Usuario Inactivado',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
	};

	function activateMasc(usuarioId, id_empresa) {
		Swal.fire({
			title: 'Esta seguro de activar este registro?',
			text: "",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, activar!'
		}).then((result) => {
			if (result.value) {
				Usr.activar(usuarioId, id_empresa, $rootScope.globals.currentUser.username, function (response) {
					reloadData(id_empresa);
				});

				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Usuario Activado',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
	};

	function editMasc(usuarioId, id_empresa) {

		$state.go('menuMaster.editUsuario', {
			idUsuario: usuarioId,
			id_empresa: id_empresa

		});

	}
	;


};


/*************************** ROL USAURIO CONTROLLER ***********************************/
function RolUsuarioCtrl($scope, $rootScope, $filter, $state, $stateParams, $compile, $window, popupService, RolUsuario, Rol) {

	$scope.clearMessages = function () {

		$scope.successMessagesChild = '';
		$scope.errorMessagesChild = '';
		$scope.errorsChild = {};
	};

	$scope.resetRol = function () {

		// Sets the form to it's pristine state
		if ($scope.rolForm) {
			$scope.rolForm.$setPristine();
		}

		$scope.formTypeRol = "ADD";
		var date = new Date();

		$scope.rol = { usuario: $rootScope.globals.currentUser.username };

		$scope.rol.usr = $scope.newUsuario;
		$scope.rol.id_empresa = $scope.newUsuario;

		$scope.clearMessages();
	};

	$scope.guardarRol = function (value) {
		$scope.clearMessages();

		if (value == "ADD") {
			RolUsuario.insertar($scope.rol, function (data) {
				$scope.formTypeRol = "UPD";
				$scope.refreshRol($scope.newUsuario.usr);
				$scope.resetRol();
				$scope.successMessagesChild = ['Rol Registrado correctamente'];

			}, function (result) {
				if ((result.status == 409) || (result.status == 400)) {
					$scope.errorsChild = result.data;
				} else {
					$scope.errorMessagesChild = ['Unknown error de servidor'];
				}
			});

		} else {
			var date = new Date();
			var rolObj = { usuario: $rootScope.globals.currentUser.username };

			$scope.rol.usuario = rolObj.usuario;

			RolUsuario.actualizar($scope.rol, function (data) {
				$scope.refreshRol($scope.newUsuario.usr);
				$scope.successMessagesChild = ['Rol Actualizado correctamente'];
			}, function (result) {
				if ((result.status == 409) || (result.status == 400)) {
					$scope.errorsChild = result.data;
				} else {
					$scope.errorMessagesChild = ['Unknown error de servidor'];
				}
			});
		}
	};

	$scope.resetRol();

	$scope.loadRoles = function () {
		Rol.findAll(function (response) {
			if (response.data.status == 1)
				$scope.roles = response.data.info;
			else $scope.roles = [];
		});
	};

	$scope.loadRoles();

	//LISTA
	$scope.refreshRol = function (usuario) {
		RolUsuario.findByUsuario(usuario, function (response) {
			if (response.data.status == 1)
				$scope.rolesusr = response.data.info;
			else $scope.rolesusr = [];
		});
	};

	if ($scope.formType == "ADD") {
		$scope.refreshRol("NADA");
	} else {
		$scope.refreshRol($stateParams.idUsuario);
	}

	$scope.modifyRol = function (usuario, idRol) {
		$scope.clearMessages();
		$('#myRolModal').modal('show');
		$scope.formTypeRol = "UPD";

		RolUsuario.findById(usuario, idRol, function (response) {

			if (response.data.status == 1) {
				$scope.rol = response.data.info[0];
				$scope.rol.id_rol = response.data.info[0].id.id_rol;
			}
			else {
				$scope.rol = [];
				$scope.rol.id_rol = $rootScope.globals.currentUser.id_rol;
			}
		});

	};

	$scope.deleteRol = function (usuario, idRol) {

		if (popupService.showPopup('Esta seguro de borrar este registro?')) {
			RolUsuario.borrar(usuario, idRol, $rootScope.globals.currentUser.username, function (response) {
				$scope.refreshRol(usuario);
			});
		}
	};

	$rootScope.$on("refreshRoles", function (event, data) {
		$scope.refreshRol(data);
	});
};
//SETUP
function SetupTableCtrl($scope, $rootScope, $state, $compile, $window, Usr,
	popupService, DTOptionsBuilder, DTColumnDefBuilder, Setup, URL_API) {
	var vm = this;

	vm.message = '';
	$scope.newSetup = {
		ip: ""
	};

	$scope.registerIp = function () {
		Setup.assignIP($scope.newSetup.ip, function (response) {
			if (response.data.status == 1) {
				//console.log(response.data.info[0].msg);
				Swal.fire({
					//toast:true,
					position: 'center',
					type: 'success',
					title: response.data.info[0].msg + ' ' + response.data.info[0].ip,
					showConfirmButton: false,
					timer: 3000
				});
			}
			else {
				Swal.fire({
					//toast:true,
					position: 'center',
					type: 'error',
					title: response.data.info[0].msg + ' ' + response.data.info[0].ip,
					showConfirmButton: false,
					timer: 3000
				});
			}
		});
	}

};
