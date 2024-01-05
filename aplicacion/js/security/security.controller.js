

function OpcionTableCtrl($scope, $rootScope, $http, $state, $window, popupService,
	DTOptionsBuilder, DTColumnDefBuilder, Opcion) {
	var vm = this;
	$scope.refresh = function () {
		Opcion.findAll(function (response) {
			$scope.opciones = response.data.info;
		});
	};


	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withLanguage($rootScope.globals.language);

	vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(0),
	DTColumnDefBuilder.newColumnDef(1),
	DTColumnDefBuilder.newColumnDef(2),
	DTColumnDefBuilder.newColumnDef(3),
	DTColumnDefBuilder.newColumnDef(4).notSortable()];

	$scope.modifyOpcion = function (opcionId) {
		$state.go(
			'menuMaster.editOpcion',
			{ idOpcion: opcionId }
		);
	};

	$scope.deleteOpcion = function (opcionId) {
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
				Opcion.borrar(opcionId, $rootScope.globals.currentUser.username, function (response) {
					$scope.refresh(opcionId);
				});

				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Opcion Inactivada',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})

	};

	$scope.activateOpcion = function (opcionId) {
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
				Opcion.activar(opcionId, $rootScope.globals.currentUser.username, function (response) {
					$scope.refresh(opcionId);
				});

				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Opcion Activada',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})

	};

	$scope.refresh();

	$scope.orderBy = 'descOpcion';

};

function OpcionAddCtrl($scope, $rootScope, $filter, $http, $state, Opcion, OpcPpal) {
	$scope.isDisabled = '';
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
		$scope.isVisibleAfterOpcion = false;
		$scope.formType = 'ADD';

		var date = new Date();
		$scope.newOpcion = {
			id: ""
			, id_opc_ppal: ""
			, id_opc_padre: ""
			, padre: 0
			, descripcion: ""
			, url: ""
			, padre: ""
			, orden: ""
			, usuario: $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.guardarOpcion = function (value) {
		$scope.clearMessages();

		Opcion.insertar($scope.newOpcion, function (data) {

			$scope.isVisibleAfterOpcion = $scope.isVisibleAfterOpcion ? false : true;
			$scope.formType = "UPD";

			/*Opcion.findByDesc($scope.newOpcion.descripcion, function(response){
				$scope.newOpcion = response.data.info[0];
			});//*/
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Opcion registrada correctamente',
				showConfirmButton: false,
				timer: 1000
			})
			$state.go('menuMaster.listOpcion');
		}, function (result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = ['Unknown error de servidor'];
			}
			$('#notificacionesModal').modal('show');
		});



	};

	$scope.reset();


	$scope.loadOpcPadre = function () {
		Opcion.findAllPadre($scope.newOpcion.id_opc_ppal, function (response) {
			if (response.data.status == 1)
				$scope.opces = response.data.info;
			else $scope.opces = {};
		});
	};

	//$scope.loadOpcPadre();

	$scope.opcppales = null;
	$scope.loadOpcPpal = function () {
		$scope.opcppales = [];
		
		$scope.newOpcion.id_opc_ppal = "";
		if ($scope.newOpcion.id_opc_ppal == null) $scope.newOpcion.id_opc_ppal = "";

	};

};


function OpcionEditCtrl($scope, $rootScope, $rootScope, $filter, $state, $stateParams, Opcion, OpcPpal) {
	$scope.isDisabled = 'disabled';
	$scope.updateOpcion = function () {

		var date = new Date();
		$scope.date = date.toISOString().substring(0, 10);

		var OpcionObj = {
			usuario: $rootScope.globals.currentUser.username
		};

		$scope.newOpcion.usuario = OpcionObj.usuario;

		Opcion.actualizar($scope.newOpcion, function (response) {
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Opcion actualizada correctamente',
				showConfirmButton: false,
				timer: 1000
			})
			$state.go('menuMaster.listOpcion');

		}, function (result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = ['Unknown error de servidor'];
			}
			$('#notificacionesModal').modal('show');
		});
	};

	$scope.loadOpcion = function () {
		Opcion.findById($stateParams.idOpcion, function (response) {
			if (response.data.status == 1)
				$scope.newOpcion = response.data.info[0];
			$scope.newOpcion.id_opc_ppal = response.data.info[0].id.id_opc_principal;
			$scope.loadOpcPadre();
			$scope.newOpcion.id = response.data.info[0].id.id;
			if ($scope.newOpcion.estado == 'A') {
				$scope.newOpcion.estado = true;
			}

		});
	};

	$scope.loadOpcion();

	$scope.opcppales = {};
	$scope.listOpcPpal = function () {
		OpcPpal.findAll(function (response) {
			if (response.data.status == 1)
				$scope.opcppales = response.data.info;
		});
	};

	$scope.listOpcPpal();

	/*$scope.opcppales = null;
	$scope.loadOpcPpal = function () {
		$scope.opcppales = [];

		$scope.newOpcion.id_opc_ppal = "";
		if ($scope.newOpcion.id_opc_ppal == null) $scope.newOpcion.id_opc_ppal = "";

	};*/

	$scope.loadOpcPadre = function () {
		Opcion.findAllPadre($scope.newOpcion.id_opc_ppal, function (response) {
			if (response.data.status == 1)
				$scope.opces = response.data.info;
			else $scope.opces = {};
		});
	};

};

/*************************** OPCION PRINCIPAL CONTROLLER ***********************************/

function OpcionPrincipalAddCtrl($rootScope, $scope, $filter, $http, $state, OpcPpal) {

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

		var date = new Date();
		$scope.newOpcionPrincipal = {
			descripcion: "",
			menu_icon: "",
			orden: "",
			acceso_directo: "",
			usuario: $rootScope.globals.currentUser.username
		};
		$scope.clearMessages();
	};

	$scope.registerOpcionPrincipal = function () {
		$scope.clearMessages();
		OpcPpal.insertar($scope.newOpcionPrincipal, function (response) {

			$scope.reset();

			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Opcion Principal registrada correctamente',
				showConfirmButton: false,
				timer: 1000
			})
			$state.go('menuMaster.listOpcionPrincipal');
		}, function (result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = ['Unknown error de servidor'];
			}
			$('#notificacionesModal').modal('show');
		});
	};

	$scope.reset();

	//$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";

};

function OpcionPrincipalEditCtrl($rootScope, $scope, $filter, $state, $stateParams, OpcPpal) {

	$scope.clearMessages = function () {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};



	$scope.updateOpcPpal = function () {

		var date = new Date();
		var OpcPpalObj = {
			usuario: $rootScope.globals.currentUser.username
		};

		$scope.newOpcionPrincipal.usuario = OpcPpalObj.usuario;

		OpcPpal.actualizar($scope.newOpcionPrincipal, function (response) {
			//$scope.successMessages = [ 'Opcion Principal Actualizada correctamente' ];
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Opcion Principal actualizada correctamente',
				showConfirmButton: false,
				timer: 1000
			})
			$state.go('menuMaster.listOpcionPrincipal');
		}, function (result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = ['Unknown error de servidor'];
			}
			$('#notificacionesModal').modal('show');
		});
	};

	$scope.loadOpcPpal = function () {
		OpcPpal.findById($stateParams.idOpcPpal, function (response) {
			if (response.data.status == 1) {
				$scope.newOpcionPrincipal = response.data.info[0];
				if ($scope.newOpcionPrincipal.estado == 'A') {
					$scope.newOpcionPrincipal.estado = true;
				}
				if ($scope.newOpcionPrincipal.acceso_directo == '1') {
					$scope.newOpcionPrincipal.acceso_directo = true;
				}
			}
		});
	};

	$scope.loadOpcPpal();

	//$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";

};

function OpcionPrincipalListCtrl($scope, $rootScope, $state, $compile, $window, popupService, DTOptionsBuilder, DTColumnDefBuilder, OpcPpal, URL_API) {
	var vm = this;

	vm.listOpcPpal = listOpcPpal;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.opcPpal = {};

	OpcPpal.findAll(function (response) {
		vm.opcPpal = response.data.info;
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withLanguage($rootScope.globals.language).withOption('order', [0, 'asc']);
	vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(0),
	DTColumnDefBuilder.newColumnDef(1),
	DTColumnDefBuilder.newColumnDef(2),
	DTColumnDefBuilder.newColumnDef(3),
	DTColumnDefBuilder.newColumnDef(4).notSortable()];

	vm.deleteOpcPpal = deleteOpcPpal;
	vm.activateOpcPpal = activateOpcPpal;
	vm.editOpcPpal = editOpcPpal;

	function listOpcPpal() {
		OpcPpal.findAll(function (response) {
			if (response.data.status == 1) vm.opcPpal = response.data.info;
			else vm.opcPpal = [];
		});

	}
	;

	function reloadData() {
		OpcPpal.findAll(function (response) {
			if (response.data.status == 1) vm.opcPpal = response.data.info;
			else vm.opcPpal = [];
		});

	}
	;

	function deleteOpcPpal(opcPpalId) {
		//console.log(opcPpalId);
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
				OpcPpal.borrar(opcPpalId, $rootScope.globals.currentUser.username,
					function (response) {
						reloadData();
					});

				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Opcion Principal Inactivada',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
	};

	function activateOpcPpal(opcPpalId) {
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
				OpcPpal.activar(opcPpalId, $rootScope.globals.currentUser.username,
					function (response) {
						reloadData();
					});

				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Opcion Principal Activada',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
	};
	function editOpcPpal(opcPpalId) {

		$state.go('menuMaster.editOpcionPrincipal', {
			idOpcPpal: opcPpalId
		});

	}
	;

};

/*************************** ROL CONTROLLER ***********************************/

function RolListCtrl($scope, $rootScope, $http, $state, $window, popupService, DTOptionsBuilder, DTColumnDefBuilder, Rol) {
	/*
	var vm = this;
	
	$scope.refresh = function() {
		Rol.findAll(function(response){
			$scope.roles = response.data.info;
		});
	};

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withLanguage($rootScope.globals.language);

	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3),
			DTColumnDefBuilder.newColumnDef(4).notSortable() ];
	
	$scope.modifyRol = function(rolId){
		$state.go(
				  'menuMaster.editRol',
				  {idRol: rolId } 
				 );
	};
	
	$scope.deleteRol = function(rolId) {

		if (popupService.showPopup('Esta seguro de borrar este registro?')) {
			Rol.borrar(rolId, $rootScope.globals.currentUser.username, function(response){
				$scope.refresh(rolId);
			});
		}
	};
	
	$scope.refresh();
	//*/

	//$scope.orderBy = 'descRol';

	var vm = this;

	vm.listRol = listRol;
	vm.reloadData = reloadData;
	//vm.deleteRol = deleteRol;
	//vm.editRol = editRol;

	vm.message = '';
	vm.roles = {};

	Rol.findAll(function (response) {
		vm.roles = response.data.info;
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withLanguage($rootScope.globals.language).withOption('order', [0, 'asc']);
	vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(0),
	DTColumnDefBuilder.newColumnDef(1),
	DTColumnDefBuilder.newColumnDef(2),
	DTColumnDefBuilder.newColumnDef(3),
	DTColumnDefBuilder.newColumnDef(4).notSortable()];

	function reloadData() {
		Rol.findAll(function (response) {
			if (response.data.status == 1)
				vm.roles = response.data.info;
		});

	};

	function listRol() {
		Rol.findAll(function (response) {
			if (response.data.status == 1)
				vm.roles = response.data.info;
		});

	};

	/*
	function deleteRol(rolId) {

		if (popupService.showPopup('Esta seguro de borrar este registro?')) {
			Rol.borrar(opcPpalId, $rootScope.globals.currentUser.username,
				function(response) {
					reloadData();
				});
		}
	};
	//*/

	$scope.deleteRol = function (rolId) {
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
				Rol.borrar(rolId, $rootScope.globals.currentUser.username, function (response) {
					reloadData();
				});

				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Rol Inactivado',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
	};

	$scope.activateRol = function (rolId) {
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
				Rol.activar(rolId, $rootScope.globals.currentUser.username, function (response) {
					reloadData();
				});

				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Rol Activado',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
	};

	/*
	function editRol(rolId) {
		console.log("entre...");
		$state.go('menuMaster.editRol', {idRol: rolId } );

	};
	//*/
	$scope.editRol = function (rolId) {
		//console.log("entre...");
		$state.go(
			'menuMaster.editRol',
			{ idRol: rolId }
		);
	};

};

function RolAddCtrl($scope, $rootScope, $filter, $http, $state, Rol) {

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
		$scope.isVisibleAfterRol = false;
		$scope.formType = 'ADD';

		var date = new Date();
		$scope.newRol = {
			descripcion: "",
			usuario: $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.guardarRol = function (value) {
		$scope.clearMessages();


		if (value == "ADD") {

			Rol.insertar($scope.newRol, function (data) {

				$scope.isVisibleAfterRol = $scope.isVisibleAfterRol ? false : true;
				$scope.formType = "UPD";
				Rol.findByDesc($scope.newRol.descripcion, function (response) {
					if (response.data.status == 1)
						$scope.newRol = response.data.info[0];
					if ($scope.newRol.estado == 'A') {
						$scope.newRol.estado = true;
					}
				});
				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Rol registrado correctamente',
					showConfirmButton: false,
					timer: 1000
				})
				//$state.go('menuMaster.listRol');

			}, function (result) {
				if ((result.status == 409) || (result.status == 400)) {
					$scope.errors = result.data;
				} else {
					$scope.errorMessages = ['Unknown error de servidor'];
				}
				$('#notificacionesModal').modal('show');
			});

		} else {

			var date = new Date();
			var rolObj = { usuario: $rootScope.globals.currentUser.username };

			$scope.newRol.usuario = rolObj.usuario;

			Rol.actualizar($scope.newRol, function (data) {

				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Rol actualizado correctamente',
					showConfirmButton: false,
					timer: 1000
				})
				//$state.go('menuMaster.listRol');

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

};


function RolEditCtrl($scope, $rootScope, $rootScope, $filter, $state, $stateParams, Rol) {

	$scope.isVisibleAfterRol = true;

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
		$scope.formType = 'ADD';
		$scope.isVisibleAfterRol = false;
		$rootScope.$broadcast("refreshOpciones", 0);

		var date = new Date();
		$scope.newRol = { descripcion: "", usuario: $rootScope.globals.currentUser.username };

		$scope.clearMessages();
	};

	$scope.guardarRol = function (value) {

		$scope.clearMessages();

		if (value == "ADD") {

			Rol.insertar($scope.newRol, function (data) {

				$scope.isVisibleAfterRol = $scope.isVisibleAfterRol ? false : true;
				$scope.formType = "UPD";
				Rol.findByDesc($scope.newRol.descripcion, function (response) {
					if (response.data.status == 1)
						$scope.newRol = response.data.info[0];
				});
				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Rol registrado correctamente',
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

		} else {

			var date = new Date();
			var rolObj = { usuario: $rootScope.globals.currentUser.username };

			$scope.newRol.usuario = rolObj.usuario;

			Rol.actualizar($scope.newRol, function (data) {

				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Rol actualizado correctamente',
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

	$scope.loadRol = function () {
		Rol.findById($stateParams.idRol, function (response) {
			if (response.data.status == 1) {
				$scope.newRol = response.data.info[0];
				if ($scope.newRol.estado == 'A') {
					$scope.newRol.estado = true;
				}
			}
			else {
				$scope.newRol = [];
			}
		});
	};

	$scope.loadRol();
};

/*************************** USUARIO CONTROLLER ***********************************/

function UsuarioAddCtrl($rootScope, $stateParams, $scope, URL_API, $filter, $http, $state, Usr) {


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
		$scope.newUsuario = {
			usr: "",
			clave: "",
			nombre: "",
			apellido: "",
			tel: "",
			pin: "",
			email: "",
			estado: "",
			usuario: $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerUsuario = function (value) {
		$scope.clearMessages();

		if (value == "ADD") {

			Usr.insertar($scope.newUsuario, function (data) {

				$scope.isVisibleAfterUsuario = $scope.isVisibleAfterUsuario ? false : true;

				$scope.formType = "UPD";

				Usr.findByUsr($scope.newUsuario.usr, function (response) {
					if (response.data.status == 1)
						$scope.newUsuario = response.data.info[0];
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
			var usuarioObj = { usuario: $rootScope.globals.currentUser.username };

			$scope.newUsuario.usuario = usuarioObj.usuario;

			Usr.actualizar($scope.newUsuario, function (data) {
				$scope.successMessages = ['Usuario Actualizado correctamente'];
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

function UsuarioEditCtrl($rootScope, $scope, $filter, $state, $stateParams, URL_API, Usr) {

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
			usr: "",
			usuario: $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerUsuario = function (value) {

		$scope.clearMessages();

		if (value == "ADD") {
			Usr.insertar($scope.newUsuario, function (data) {

				$scope.isVisibleAfterUsuario = $scope.isVisibleAfterUsuario ? false : true;
				$scope.formType = "UPD";

				Usr.findByUsr($scope.newUsuario.usr, function (response) {
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

	$scope.loadUsuario = function () {

		Usr.findByUsr($stateParams.idUsuario, function (response) {
			//if(response.data.status==1)
			$scope.newUsuario = response.data.info[0];
			if ($scope.newUsuario.estado == 'A') {
				$scope.newUsuario.estado = true;
			}
		});
	};

	$scope.loadUsuario();


};

function UsuarioListCtrl($scope, $rootScope, $state, $compile, $window, popupService,
	DTOptionsBuilder, DTColumnDefBuilder, Usr, URL_API) {
	var vm = this;

	/*vm.listUsuario = listUsuario;
	vm.reloadData = reloadData;*/

	vm.message = '';
	vm.usuario = {};

	Usr.findAlls(function (response) {
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


	function deleteUsuario(usuarioId) {
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
				Usr.borrar(usuarioId, $rootScope.globals.currentUser.username, function (response) {
					//reloadData(id_empresa);
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

	function activateUsuario(usuarioId) {
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
				Usr.activar(usuarioId, $rootScope.globals.currentUser.username, function (response) {
					//reloadData(id_empresa);
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

	function editUsuario(usuarioId) {

		$state.go('menuMaster.editUsuario', {
			idUsuario: usuarioId
		});
	}
	;


};

/*************************** OPCION ROL CONTROLLER ***********************************/



function RolUsuarioCtrl($scope, $rootScope, $filter, $state, $stateParams, $compile, $window, 
	popupService, RolUsuario, Rol) {

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
				$scope.rol.id_empresa = response.data.info[0].id.id_empresa;
				$scope.rol.id_rol = response.data.info[0].id.id_rol;
			}
			else {
				$scope.rol = [];
				$scope.rol.id_empresa = $rootScope.globals.currentUser.id_empresa;
				$scope.rol.id_rol = $rootScope.globals.currentUser.id_rol;
			}
		});

	};

	$scope.deleteRol = function (usuario, idRol) {

		if (popupService.showPopup('Esta seguro de borrar este registro?')) {
			RolUsuario.borrar(usuario, idRol, /*$rootScope.globals.currentUser.username,*/ function (response) {
				$scope.refreshRol(usuario);
			});
		}
	};

	$rootScope.$on("refreshRoles", function (event, data) {
		$scope.refreshRol(data);
	});
};

function OpcionRolCtrl($scope, $rootScope, $http, $filter, $state,
	DTOptionsBuilder, DTColumnDefBuilder, $stateParams, $compile, $window,
	popupService, OpcRol, OpcPpal, Opcion, URL_API) {

	$scope.clearMessages = function () {

		$scope.successMessagesChild = '';
		$scope.errorMessagesChild = '';
		$scope.errorsChild = {};
	};

	var vm = this;

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
		'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(0),
	DTColumnDefBuilder.newColumnDef(1),
	DTColumnDefBuilder.newColumnDef(2),
	DTColumnDefBuilder.newColumnDef(3).notSortable()];


	$scope.resetOpcion = function () {

		// Sets the form to it's pristine state
		if ($scope.opcionForm) {
			$scope.opcionForm.$setPristine();
		}

		$scope.formTypeOpcion = "ADD";
		var date = new Date();

		$scope.opcion = {
			id_opc: "",
			id_opc_ppal: "",
			usuario: $rootScope.globals.currentUser.username
		};

		$scope.opcion.id_rol = $scope.newRol;
		//$scope.opcion.id_opc = $scope.opcion.id.id_opc;
		//$scope.opcion.id_opc_ppal = $scope.opcion.id.id_opc_ppal;

		$scope.clearMessages();
	};

	$scope.guardarOpcion = function (value) {
		$scope.clearMessages();

		if (value == "ADD") {

			OpcRol.insertar($scope.opcion, function (data) {
				$scope.formTypeOpcion = "UPD";
				$scope.refreshOpcion($scope.newRol.id);
				$scope.resetOpcion();
				$scope.successMessagesChild = ['Opcion Registrada correctamente'];

			}, function (result) {
				if ((result.status == 409) || (result.status == 400)) {
					$scope.errorsChild = result.data;
				} else {
					$scope.errorMessagesChild = ['Unknown error de servidor'];
				}
			});

		}
		else {

			var date = new Date();
			var opcionObj = { usuario: $rootScope.globals.currentUser.username };

			$scope.opcion.usuario = opcionObj.usuario;

			OpcRol.actualizar($scope.opcion, function (data) {
				$scope.refreshOpcion($scope.newRol.id);
				//$scope.modifyOpcion($scope.opcion.id_opc, $scope.opcion.id_opc_ppal);
				$scope.successMessagesChild = ['Opcion Actualizada correctamente'];
			}, function (result) {
				if ((result.status == 409) || (result.status == 400)) {
					$scope.errorsChild = result.data;
				} else {
					$scope.errorMessagesChild = ['Unknown error de servidor'];
				}
			});
		}
	};

	$scope.resetOpcion();

	$scope.loadOpciones = function () {

		Opcion.findAll(function (response) {
			if (response.data.status == 1)
				$scope.opces = response.data.info;
		});

	};


	$scope.loadOpcionesPpal = function () {
		OpcPpal.findAll(function (response) {
			if (response.data.status == 1)
				$scope.opcppales = response.data.info;
		});

	};
	$scope.loadOpciones();
	$scope.loadOpcionesPpal();

	$scope.updateOpcPpal = function () {
		//var opcppal = 0;		
		$scope.opcppales = null;
		$scope.opc = null;
		$scope.opcion.id_opc_ppal = "";
		$scope.opcion.id_opc = "";

		if ($scope.opcion.id_opc == null) $scope.opcion.id_opc = "";
		if ($scope.opcion.id_opc_ppal == null) $scope.opcion.id_opc_ppal = "";


		$http.get(URL_API + '/servicios/sec/sec_opc_principal.php?accion=C').
			then(function (response) {
				if (response.data.status == 1) {
					$scope.opcppales = response.data.info;
					delete $scope.opcppales.id;
				}
			});

	};



	$scope.updateOpciones = function () {
		var opcppal = 0;
		$scope.opc = null;
		$scope.opcion.id_opc = "";
		if ($scope.opcion.id_opc == null) $scope.opcion.id_opc = "";
		if ($scope.opcion.id_opc_ppal == null) $scope.opcion.id_opc_ppal = "";

		if ($scope.opcion.id_opc_ppal == null) {
			opcppal = 0;
		} else {
			opcppal = $scope.opcion.id_opc_ppal;
		}

		$http.get(URL_API + '/servicios/sec/sec_opcion.php?accion=C&id_opc_ppal=' + opcppal).
			then(function (response) {
				if (response.data.status == 1)
					$scope.opc = response.data.info;
				delete $scope.opc.id;
			});

	};

	//LISTA
	$scope.refreshOpcion = function (idRol) {
		OpcRol.findByRol(idRol, function (response) {
			if (response.data.status == 1)
				$scope.opcionesrol = response.data.info;
			else $scope.rolesusr = [];
		});

	};

	if ($scope.formType == "ADD") {
		$scope.refreshOpcion("NADA");
	} else {
		$scope.refreshOpcion($stateParams.idRol);
	}




	$scope.modifyOpcion = function (idRol, idOpcion) {
		$scope.clearMessages();
		$('#myOpcionModal').modal('show');
		$scope.formTypeOpcion = "UPD";

		OpcRol.findByRol(idRol, function (response) {
			if (response.data.status == 1)
				$scope.opcionesrol = response.data.info;
		});

		OpcRol.findById(idOpcion, idRol, function (response) {
			if (response.data.status == 1)
				$scope.opcion = response.data.info[0];
			$scope.opcion.id_opc_ppal = response.data.info[0].id.id_opc_ppal;
			$scope.opcion.id_opc = response.data.info[0].id.id_opc;
			$scope.opcion.id_rol = response.data.info[0].id.id_rol;


		});

	};

	$scope.deleteOpcion = function (idRol, idOpcion) {

		if (popupService.showPopup('Esta seguro de borrar este registro?')) {

			OpcRol.borrar(idOpcion, idRol, $rootScope.globals.currentUser.username, function (response) {
				$scope.refreshOpcion(idRol);
			});

		}
	};

	$rootScope.$on("refreshOpciones", function (event, data) {
		$scope.refreshOpcion(data);
	});
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
