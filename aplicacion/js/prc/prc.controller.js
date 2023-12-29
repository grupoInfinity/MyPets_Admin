
/*************************** MASCOTA CONTROLLER ***********************************/

function MascotaAddCtrl($rootScope, $stateParams, $scope,
	URL_API, $filter, $http, $state, Masc, Depto, Muni, Tipom) {


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
			dueno: "",
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

	$scope.loadDept = function () {
		Masc.findAllByEmpresaA($scope.newUsuario.id_empresa, function (response) {
			if (response.data.status == 1)
				$scope.dept = response.data.info;
			else $scope.dept = [];
		});
	};


	$scope.dept = null;
	$scope.loadDept = function () {

		$scope.dept = [];
		if ($scope.newMasc.estado==null) $scope.newMasc.estado = "A";
		Depto.findAllByFilters($scope.newMasc.estado,function (response) {
			if (response.data.status == 1)
				$scope.dept = response.data.info;
			else $scope.dept = [];
		});
	};

	$scope.muni = null;
	$scope.loadMunis = function () {
		$scope.muni = [];
		if ($scope.newMasc.depto != "") {
			Muni.findByIdDepto($scope.newMasc.depto, function (response) {
				if (response.data.status == 1)
					$scope.muni = response.data.muni;
				else $scope.muni = [];
			});
		}
	};

	$scope.tpmasc = null;
	$scope.loadTpmascota = function () {
		$scope.tpmasc = [];
		if ($scope.newMasc.estado==null) $scope.newMasc.estado = "A";
		Tipom.findAllByFilters($scope.newMasc.estado, function (response) {
			if (response.data.status == 1)
				$scope.tpmasc = response.data.tpmasc;
			else $scope.tpmasc = [];
		});
	};

};

function MascotaEditCtrl($rootScope, $scope, $filter, $state, $stateParams,
	URL_API, Masc, Depto, Muni, Tipom) {

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
		$scope.newMasc = {
			idmasc: "",
			dueno: "",
			tpmascota: "",
			depto: "",
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
			var MascObj = { usuario: $rootScope.globals.currentUser.username };

			$scope.newMasc.usuario = MascObj.usuario;

			Masc.actualizar($scope.newMasc, function (data) {
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

		Masc.findById($stateParams.idmasc, function (response) {
			//if(response.data.status==1)
			$scope.newMasc = response.data.info[0];
			if ($scope.newMasc.estado == 'A') {
				$scope.newMasc.estado = true;
			}
		});
	};

	$scope.loadMasc();

	$scope.dept = null;
	$scope.loadDept = function () {

		$scope.dept = [];
		if ($scope.newMasc.estado==null) $scope.newMasc.estado = "A";
		Depto.findAllByFilters($scope.newMasc.estado,function (response) {
			if (response.data.status == 1)
				$scope.dept = response.data.info;
			else $scope.dept = [];
		});
	};

	$scope.muni = null;
	$scope.loadMunis = function () {
		$scope.muni = [];
		if ($scope.newMasc.depto != "") {
			Muni.findByIdDepto($scope.newMasc.depto, function (response) {
				if (response.data.status == 1)
					$scope.muni = response.data.muni;
				else $scope.muni = [];
			});
		}
	};

	$scope.tpmasc = null;
	$scope.loadTpmascota = function () {
		$scope.tpmasc = [];
		if ($scope.newMasc.estado==null) $scope.newMasc.estado = "A";
		Tipom.findAllByFilters($scope.newMasc.estado, function (response) {
			if (response.data.status == 1)
				$scope.tpmasc = response.data.tpmasc;
			else $scope.tpmasc = [];
		});
	};


};

function MascotaListCtrl($scope, $rootScope, $state, $compile, $window, popupService,
	DTOptionsBuilder, DTColumnDefBuilder, Masc, Almacen, URL_API) {
	var vm = this;

	vm.listMasc = listMasc;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.masc = {};

	Masc.findAlls(function (response) {
		vm.masc = response.data.info;
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
		'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(0),
	DTColumnDefBuilder.newColumnDef(1),
	DTColumnDefBuilder.newColumnDef(2),
	DTColumnDefBuilder.newColumnDef(3).notSortable()];

	vm.deleteMasc = deleteMasc;
	vm.activateMasc = activateMasc;
	vm.editMasc = editMasc;

	function listMasc() {
		Masc.findAlls(function (response) {
			if (response.data.status == 1)
				vm.masc = response.data.info;
		});

	}
	;

	function reloadData() {
		Masc.findAlls(function (response) {
			if (response.data.estado == 1) {
				vm.masc = response.data.info;
			}
			else {
				vm.masc = [];
			}

		});

	}
	;

	function deleteMasc(mascId) {
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
				Masc.borrar(mascId,
					$rootScope.globals.currentUser.username, function (response) {
						reloadData();
					});

				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Mascota Inactivada',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
	};

	function activateMasc(mascId) {
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
				Masc.activar(
					mascId,
					$rootScope.globals.currentUser.username, function (response) {
						reloadData();
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

	function editMasc(mascId) {

		$state.go('menuMaster.editMascota', {
			idMasc: mascId
		});

	}
	;


};
//////////////////VACUNAS CONTROLLER /////////////////


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
			RolUsuario.borrar(usuario, idRol, $rootScope.globals.currentUser.username, function (response) {
				$scope.refreshRol(usuario);
			});
		}
	};

	$rootScope.$on("refreshRoles", function (event, data) {
		$scope.refreshRol(data);
	});
};

function OpcionRolCtrl($scope, $rootScope, $http, $filter, $state, DTOptionsBuilder, DTColumnDefBuilder, $stateParams, $compile, $window, popupService, OpcRol, OpcPpal, Opcion, Empresa, URL_API) {

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

		$scope.opcion = { id_opc: "", id_opc_ppal: "", usuario: $rootScope.globals.currentUser.username };

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
		var id_empresa = 0;
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


/*
function VacunaTableCtrl($scope, $rootScope, $http, $state, $window, popupService,
	DTOptionsBuilder, DTColumnDefBuilder, Vacuna) {
	var vm = this;
	$scope.refresh = function () {
		Opcion.findAll(function (response) {
			$scope.vacuna = response.data.info;
		});
	};


	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withLanguage($rootScope.globals.language);

	vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(0),
	DTColumnDefBuilder.newColumnDef(1),
	DTColumnDefBuilder.newColumnDef(2),
	DTColumnDefBuilder.newColumnDef(3),
	DTColumnDefBuilder.newColumnDef(4).notSortable()];

	$scope.modifyVacuna = function (vacunaId) {
		$state.go(
			'menuMaster.editVac',
			{ idVacuna: vacunaId }
		);
	};

	$scope.deleteVacuna = function (vacunaId) {
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
				Vacuna.borrar(vacunaId, $rootScope.globals.currentUser.username, function (response) {
					$scope.refresh(vacunaId);
				});

				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Vacuna Inactivada',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})

	};

	$scope.activateVacuna = function (vacunaId) {
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
				Vacuna.activar(vacunaId, $rootScope.globals.currentUser.username, function (response) {
					$scope.refresh(vacunaId);
				});

				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Vacuna Activada',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})

	};

	$scope.refresh();

	//$scope.orderBy = 'descOpcion';

};

function VacunaAddCtrl($scope, $rootScope, $filter, $http, $state, Vacuna) {
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
		$scope.newVacuna = {
			id: ""
			, idmasc: ""
			, idtpmasc: ""
			, usuario: $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.guardarVacuna = function (value) {
		$scope.clearMessages();

		Vacuna.insertar($scope.newVacuna, function (data) {

			$scope.isVisibleAfterOpcion = $scope.isVisibleAfterOpcion ? false : true;
			$scope.formType = "UPD";

			/*Opcion.findByDesc($scope.newOpcion.descripcion, function(response){
				$scope.newOpcion = response.data.info[0];
			});//*/
			/*Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Vacuna registrada correctamente',
				showConfirmButton: false,
				timer: 1000
			})
			$state.go('menuMaster.listVac');
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

	$scope.loadVacuna = function () {
		Vacuna.findById($stateParams.idVacuna, function (response) {
			if (response.data.status == 1)
				$scope.newVacuna = response.data.info[0];
		});
	};

	$scope.loadVacuna();

	//$scope.loadOpcPadre();
	/*
		$scope.opcppales = null;
		$scope.loadOpcPpal = function () {
			$scope.opcppales = [];
	
			$scope.newOpcion.id_opc_ppal = "";
			if ($scope.newOpcion.id_opc_ppal == null) $scope.newOpcion.id_opc_ppal = "";
			if ($scope.newOpcion.id_empresa != "") {
				OpcPpal.findByEmpresaA($scope.newOpcion.id_empresa, function (response) {
					if (response.data.status == 1)
						$scope.opcppales = response.data.info;
					else $scope.opcppales = [];
				});
			}
		};*/

/*};


function VacunaEditCtrl($scope, $rootScope, $rootScope, $filter,
	$state, $stateParams, Vacuna) {
	$scope.isDisabled = 'disabled';
	$scope.updateVacuna = function () {

		var date = new Date();
		$scope.date = date.toISOString().substring(0, 10);

		var VacunaObj = {
			usuario: $rootScope.globals.currentUser.username
		};

		$scope.newVacuna.usuario = VacunaObj.usuario;

		Vacuna.actualizar($scope.newVacuna, function (response) {
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Vacuna actualizada correctamente',
				showConfirmButton: false,
				timer: 1000
			})
			$state.go('menuMaster.listVac');

		}, function (result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = ['Unknown error de servidor'];
			}
			$('#notificacionesModal').modal('show');
		});
	};

	$scope.loadVacuna = function () {
		Vacuna.findById($stateParams.idVacuna, function (response) {
			if (response.data.status == 1)
				$scope.newVacuna = response.data.info[0];
		});
	};

	$scope.loadVacuna();

	//$scope.loadOpcPadre();
};*/