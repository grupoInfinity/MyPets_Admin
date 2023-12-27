
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
			dueno:"",
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
	URL_API, Masc) {

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
			dueno:"",
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

		Masc.findById($stateParams.idmasc,function (response) {
			//if(response.data.status==1)
			$scope.newMasc = response.data.info[0];
			if ($scope.newMasc.estado == 'A') {
				$scope.newMasc.estado = true;
			}
		});
	};

	$scope.loadMasc();


};

function MascotaListCtrl($scope, $rootScope, $state, $compile, $window, popupService,
	 DTOptionsBuilder, DTColumnDefBuilder, Masc, Almacen, URL_API) {
	var vm = this;

	vm.listMasc = listMasc;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.masc = {};

	Masc.findAlls( function (response) {
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
		Masc.findAlls( function(response) {
			if(response.data.status==1)
			vm.masc = response.data.info;
		});

	}
	;

	function reloadData() {
		Masc.findAlls( function(response) {
			if(response.data.estado==1){
				vm.masc = response.data.info;
			}
			else{
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

	$scope.activateOpcion = function (vacunaId) {
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


	//$scope.loadOpcPadre();

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
	};

};


function OpcionEditCtrl($scope, $rootScope, $rootScope, $filter, $state, $stateParams, Opcion, OpcPpal, Empresa) {
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


	$scope.opcppales = null;
	$scope.loadOpcPpal = function () {
		$scope.opcppales = [];

		$scope.newOpcion.id_opc_ppal = "";
		if ($scope.newOpcion.id_opc_ppal == null) $scope.newOpcion.id_opc_ppal = "";
		if ($scope.newOpcion.id_empresa != "") {
			OpcPpal.findByEmpresaA($scope.newOpcion.id_empresa, function (response) {
				if (response.data.status == 1) $scope.opcppales = response.data.info;
				else $scope.opcppales = [];
			});
		}
	};

	$scope.loadOpcPadre = function () {
		Opcion.findAllPadre($scope.newOpcion.id_opc_ppal, function (response) {
			if (response.data.status == 1)
				$scope.opces = response.data.info;
			else $scope.opces = {};
		});
	};

	//$scope.loadOpcPadre();
};