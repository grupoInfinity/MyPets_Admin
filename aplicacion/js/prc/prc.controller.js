
/*************************** MASCOTA CONTROLLER ***********************************/

function MascotaAddCtrl($rootScope, $stateParams, $scope,
	URL_API, $filter, $http, $state, Masc, Depts, Munis, tpmasc) {


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
			depto: "",
			muni: "",
			direccion: "",
			estado: "",
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
		if ($scope.newMasc.estado == null) $scope.newMasc.estado = "A";
		Depts.findAllByFilters($scope.newMasc.estado, function (response) {
			if (response.data.status == 1)
				$scope.dept = response.data.info;
			else $scope.dept = [];
		});
	};

	$scope.muni = null;
	$scope.loadMunis = function () {
		$scope.muni = [];
		if ($scope.newMasc.depto != "") {
			Munis.findByIdDepto($scope.newMasc.depto, function (response) {
				if (response.data.status == 1)
					$scope.muni = response.data.muni;
				else $scope.muni = [];
			});
		}
	};

	$scope.tpmasc = null;
	$scope.loadTpmascota = function () {
		$scope.tpmasc = [];
		if ($scope.newMasc.estado == null) $scope.newMasc.estado = "A";
		tpmasc.findAllByFilters($scope.newMasc.estado, function (response) {
			if (response.data.status == 1)
				$scope.tpmasc = response.data.tpmasc;
			else $scope.tpmasc = [];
		});
	};

};

function MascotaEditCtrl($rootScope, $scope, $filter, $state, $stateParams,
	URL_API, Masc, Depts, Munis, tpmasc) {

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
		$rootScope.$broadcast("refreshMasc", 0);

		var date = new Date();
		$scope.newMasc = {
			idmasc: "",
			dueno: "",
			tpmascota: "",
			depto: "",
			muni: "",
			direccion: "",
			estad: "",
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
		Masc.findById($stateParams.idMasc, function (response) {
			if (response.data.status == 1)
				$scope.newMasc = response.data.info[0].mascota;
				$scope.newMasc.nacim= new Date(response.data.info[0].mascota.nacim);
				/*$scope.newMasc.idmasc= response.data.info[0].mascota.id_mascota;
				$scope.newMasc.dueno= response.data.info[0].mascota.usuario;
				$scope.newMasc.tpmascota= response.data.info[0].mascota.id_tipomascota;
				$scope.newMasc.depto= response.data.info[0].mascota.depto;
				$scope.newMasc.muni= response.data.info[0].mascota.id_municipio;
				$scope.newMasc.direccion= response.data.info[0].mascota.direccion;
				$scope.newMasc.estado= response.data.info[0].mascota.estado;
				$scope.newMasc.estadodir= response.data.info[0].mascota.estado_direc;
				$scope.newMasc.nmasc=response.data.info[0].mascota.nombremascota;
				$scope.newMasc.codigo= response.data.info[0].mascota.codigo;
				$scope.newMasc.nacim= new Date(response.data.info[0].mascota.nacim);
				$scope.newMasc.foto= response.data.info[0].mascota.foto;*/
				/*$scope.newMasc = {
					id_mascota: "",
					dueno: "",
					tpmascota: "",
					depto: "",
					muni: "",
					direccion: "",
					estado: "",
					estadodir: "",
					nmasc: "",
					codigo: "",
					nacim: "",
					foto: "",
					usuario: $rootScope.globals.currentUser.username
				};*/

			if ($scope.newMasc.estado == 'A') {
				$scope.newMasc.estado = true;
			}
			if ($scope.newMasc.estadodir == 'A') {
				$scope.newMasc.estadodir = true;
			}
		});
	};

	$scope.loadMasc();

	$scope.dept = null;
	$scope.loadDept = function () {

		$scope.dept = [];
		if ($scope.newMasc.estado == null) $scope.newMasc.estado = "A";
		Depts.findAllByFilters($scope.newMasc.estado, function (response) {
			if (response.data.status == 1)
				$scope.dept = response.data.info;
			else $scope.dept = [];
		});
	};

	$scope.muni = null;
	$scope.loadMunis = function () {
		$scope.muni = [];
		if ($scope.newMasc.depto != "") {
			Munis.findByIdDepto($scope.newMasc.depto, function (response) {
				if (response.data.status == 1)
					$scope.muni = response.data.muni;
				else $scope.muni = [];
			});
		}
	};

	$scope.tpmasc = null;
	$scope.loadTpmascota = function () {
		$scope.tpmasc = [];
		if ($scope.newMasc.estado == null) $scope.newMasc.estado = "A";
		tpmasc.findAllByFilters($scope.newMasc.estado, function (response) {
			if (response.data.status == 1)
				$scope.tpmasc = response.data.tpmasc;
			else $scope.tpmasc = [];
		});
	};


};

function MascotaListCtrl($scope, $rootScope, $state, $compile, $window, popupService,
	DTOptionsBuilder, DTColumnDefBuilder, Masc, URL_API) {
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
				Masc.activar(mascId, $rootScope.globals.currentUser.username, function (response) {
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

function VacunaCtrl($scope, $rootScope, $filter, $state, $stateParams, $compile,
	$window, popupService, Vacuna, Masc, Tpvac) {

	$scope.clearMessages = function () {

		$scope.successMessagesChild = '';
		$scope.errorMessagesChild = '';
		$scope.errorsChild = {};
	};

	$scope.resetVac = function () {

		if ($scope.vacForm) {
			$scope.vacForm.$setPristine();
		}

		$scope.formTypeVac = "ADD";
		var date = new Date();

		$scope.vac = {
			usuario: $rootScope.globals.currentUser.username
		};

		$scope.vac.id_mascota = $scope.newMasc;
		$scope.vac.id_tpvacuna = $scope.newtpvac;

		$scope.clearMessages();
	};

	$scope.guardarVac = function (value) {
		$scope.clearMessages();

		if (value == "ADD") {
			Vacuna.insertar($scope.vac, function (data) {
				$scope.formTypeVac = "UPD";
				$scope.refreshVac($scope.newMasc.idmasc);
				$scope.resetVac();
				$scope.successMessagesChild = ['Vacuna Registrada correctamente'];

			}, function (result) {
				if ((result.status == 409) || (result.status == 400)) {
					$scope.errorsChild = result.data;
				} else {
					$scope.errorMessagesChild = ['Unknown error de servidor'];
				}
			});

		} else {
			var date = new Date();
			var vacObj = { usuario: $rootScope.globals.currentUser.username };

			$scope.vac.usuario = vacObj.usuario;

			Vacuna.actualizar($scope.vac, function (data) {
				$scope.refreshVac($scope.newMasc.idmasc);
				$scope.successMessagesChild = ['Vacuna Actualizada correctamente'];
			}, function (result) {
				if ((result.status == 409) || (result.status == 400)) {
					$scope.errorsChild = result.data;
				} else {
					$scope.errorMessagesChild = ['Unknown error de servidor'];
				}
			});
		}
	};

	$scope.resetVac();

	$scope.loadTPVacunas = function () {
		Tpvac.findAllByFilters('A', function (response) {
			if (response.data.status == 1)
				$scope.tpvacs = response.data.info;
			else $scope.tpvacs = [];
		});
	};

	$scope.loadTPVacunas();

	//LISTA
	$scope.refreshVac = function (idMasc) {
		Vacuna.findByMasc(idMasc, function (response) {
			if (response.data.status == 1)
				$scope.vacmasc = response.data.info;
			else $scope.vacmasc = [];
		});
	};

	if ($scope.formType == "ADD") {
		$scope.refreshVac("NADA");
	} else {
		$scope.refreshVac($stateParams.idMasc);
	}

	$scope.modifyVac = function (idVac) {
		$scope.clearMessages();
		$('#myVacModal').modal('show');
		$scope.formTypeVac = "UPD";

		Vacuna.findById(idVac, function (response) {

			if (response.data.status == 1) {
				$scope.vac = response.data.info[0];
				//$scope.vac. = response.data.info[0].id.id_rol;
			}
			else {
				$scope.vac = [];
				//$scope.rol.id_rol = $rootScope.globals.currentUser.id_rol;
			}
		});

	};

	$scope.deleteVac = function (idVac) {

		if (popupService.showPopup('Esta seguro de borrar este registro?')) {
			Vacuna.borrar(idVac, function (response) {
				$scope.refreshRol(usuario);
			});
		}
	};

	$rootScope.$on("refreshVacs", function (event, data) {
		$scope.refreshVac(data);
	});
};
