
//DEPARTAMENTOS
function DeptsAddCtrl($rootScope, $scope, $filter, $http, $state, Depts) {

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
		$scope.newDepts = {
			descripcion: "",
			usuario: $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerDepts = function () {
		$scope.clearMessages();

		Depts
			.insertar(
				$scope.newDepts,
				function (response) {

					$scope.reset();

					$scope.successMessages = ['Departamento Registrado correctamente'];

				},
				function (result) {
					if ((result.status == 409)
						|| (result.status == 400)) {
						$scope.errors = result.data;
					} else {
						$scope.errorMessages = ['Unknown error de servidor'];
					}
				});
		//$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listDepts');

	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function DeptsEditCtrl($rootScope, $scope, $filter, $state, $stateParams, Depts) {

	$scope.updateDepts = function () {

		var date = new Date();
		var DeptsObj = {
			usuario: $rootScope.globals.currentUser.username
		};

		$scope.newDepts.usuario = DeptsObj.usuario;

		Depts.actualizar(
			$scope.newDepts,
			function (response) {
				$scope.successMessages = ['Departamento Actualizado correctamente'];
				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Exito',
					text: "Registro actualizado correctamente",
					showConfirmButton: false,
					timer: 2000
				});
				$state.go('menuMaster.listDepts');
			},
			function (result) {
				if ((result.status == 409)
					|| (result.status == 400)) {
					$scope.errors = result.data;
				} else {
					$scope.errorMessages = ['Unknown error de servidor'];
				}
				$('#notificacionesModal').modal('show');
			});
		////
		//$state.go('menuMaster.listDepts');

	};

	$scope.loadDepts = function () {
		Depts.findById($stateParams.idDepts, function (response) {
			if (response.data.status == 1) {
				$scope.newDepts = response.data.info[0];
				if ($scope.newDepts.estado == 'A') {
					$scope.newDepts.estado = true;
				}
			}
		});
	};

	$scope.loadDepts();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function DeptsTableCtrl($scope, $rootScope, $state, $compile, $window,
	popupService, DTOptionsBuilder, DTColumnDefBuilder, Depts, URL_API) {
	var vm = this;

	vm.listDepts = listDepts;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.depts = {};

	Depts.findAll(function (response) {
		if (response.data.status == 1) {
			vm.depts = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
		'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(0),
	DTColumnDefBuilder.newColumnDef(1),
	DTColumnDefBuilder.newColumnDef(2),
	DTColumnDefBuilder.newColumnDef(3).notSortable()];

	vm.deleteDept = deleteDept;
	vm.editDept = editDept;
	vm.activateDept = activateDept;

	function listDepts() {
		Depts.findAll(function (response) {
			if (response.data.status == 1) {
				vm.depts = response.data.info;
			}
		});

	}
	;

	function reloadData() {
		Depts.findAll(function (response) {
			if (response.data.status == 1) {
				vm.depts = response.data.info;
			}
		});

	}
	;

	function deleteDept(deptsId) {
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
				Depts.borrar(deptsId, $rootScope.globals.currentUser.username,
					function (response) {
						reloadData();
					});

				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Departamento Inactivado',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
		/*
		if (popupService.showPopup('Esta seguro de borrar este registro?')) {
			Depts.borrar(deptsId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});

		}//*/
	}
	;

	function editDept(deptsId) {

		$state.go('menuMaster.editDepts', {
			idDepts: deptsId
		});

	}
	;

	function activateDept(deptsId) {

		Depts.activar(deptsId, $rootScope.globals.currentUser.username,
			function (response) {
				reloadData();
			}
		);

	}
	;

};

//MUNICIPIOS
function MunisAddCtrl($rootScope, $scope, $filter, $http, $state, Munis, Depts) {

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
		$scope.newMunis = {
			id: "", descripcion: "", id_depto: "",
			usuario: $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerMunis = function () {
		$scope.clearMessages();

		Munis.insertar($scope.newMunis, function (response) {
			//$scope.newMunis.id_depto = $scope.resp.id.id_depto;
			$scope.reset();

			$scope.successMessages = ['Municipio Registrado correctamente'];

		}, function (result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = ['Unknown error de servidor'];
			}
		});
		////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listMunis');

	};

	$scope.reset();

	$scope.loadDepts = function () {
		Depts.findAll(function (response) {
			if (response.data.status == 1) {
				$scope.depts = response.data.info;
			}
		});
	};

	$scope.loadDepts();
};

function MunisEditCtrl($rootScope, $scope, $filter, $state, $stateParams, Munis, Depts) {

	$scope.updateMunis = function () {

		var date = new Date();
		var MunisObj = {
			usuario: $rootScope.globals.currentUser.username
		};

		$scope.newMunis.usuario = MunisObj.usuario;

		Munis.actualizar($scope.newMunis, function (response) {
			//$scope.successMessages = [ 'Municipio Actualizado correctamente' ];
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro actualizado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listMuni');
		}, function (result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = ['Unknown error de servidor'];
			}
			$('#notificacionesModal').modal('show');
		});
		//$state.go('menuMaster.listMunis');

	};

	$scope.loadMunis = function () {
		Munis.findById($stateParams.idDepto, $stateParams.idMunis, function (response) {
			if (response.data.status == 1) {
				$scope.newMunis = response.data.info[0];
				$scope.newMunis.id_depto = response.data.info[0].id.id_depto;
				$scope.newMunis.id = response.data.info[0].id.id;
				if ($scope.newMunis.estado == 'A') {
					$scope.newMunis.estado = true;
				}
			}
		});
	};

	$scope.loadMunis();

	$scope.loadDepts = function () {
		Depts.findAll(function (response) {
			if (response.data.status == 1) {
				$scope.depts = response.data.info;
			}

		});
	};

	$scope.loadDepts();
};

function MunisTableCtrl($scope, $rootScope, $state, $compile, $window,
	popupService, DTOptionsBuilder, DTColumnDefBuilder, Munis, Depts, URL_API) {
	var vm = this;

	vm.listMunis = listMunis;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.munis = {};

	Munis.findAll(function (response) {
		if (response.data.status == 1) {
			vm.munis = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
		'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(0),
	DTColumnDefBuilder.newColumnDef(1),
	DTColumnDefBuilder.newColumnDef(2),
	DTColumnDefBuilder.newColumnDef(3).notSortable()];

	vm.deleteMunis = deleteMunis;
	vm.editMunis = editMunis;
	vm.activateMunis = activateMunis;

	function listMunis() {
		Munis.findAll(function (response) {
			if (response.data.status == 1) {
				vm.munis = response.data.info;
			}
		});

	}
	;

	function reloadData() {
		Munis.findAll(function (response) {
			if (response.data.status == 1) {
				vm.munis = response.data.info;
			}
		});

	};

	function deleteMunis(munisId, deptsId) {
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
				Munis.borrar(deptsId, munisId, $rootScope.globals.currentUser.username,
					function (response) {
						reloadData();
					});

				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Municipio Inactivado',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
		/*
		if (popupService.showPopup('Esta seguro de borrar este registro?')) {
			Munis.borrar(munisId, deptsId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});

		}
		//*/
	}
	;

	function editMunis(deptsId, munisId) {

		$state.go('menuMaster.editMunis', {
			idDepto: deptsId,
			idMunis: munisId
		});

	}
	;

	function activateMunis(munisId) {

		Munis.activar(munisId, $rootScope.globals.currentUser.username,
			function (response) {
				reloadData();
			}
		);

	};

};


//TIPO VACUNA
function tpvacAddCtrl($rootScope, $scope, $filter, $http, $state, tpvac) {

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
		$scope.newtpvac = {
			descripcion: "",
			usuario: $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerTpvac = function () {
		$scope.clearMessages();

		tpvac
			.insertar(
				$scope.newtpvac,
				function (response) {

					$scope.reset();

					$scope.successMessages = ['Tipo de vacuna Registrado correctamente'];

				},
				function (result) {
					if ((result.status == 409)
						|| (result.status == 400)) {
						$scope.errors = result.data;
					} else {
						$scope.errorMessages = ['Unknown error de servidor'];
					}
				});
		//$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listTipovac');

	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function tpvacEditCtrl($rootScope, $scope, $filter, $state, $stateParams, tpvac) {

	$scope.updateTpvac = function () {

		var date = new Date();
		var tpvacObj = {
			usuario: $rootScope.globals.currentUser.username
		};

		$scope.newtpvac.usuario = tpvacObj.usuario;

		tpvac.actualizar(
			$scope.newtpvac,
			function (response) {
				$scope.successMessages = ['Tipo de vacuna Actualizado correctamente'];
				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Exito',
					text: "Registro actualizado correctamente",
					showConfirmButton: false,
					timer: 2000
				});
				$state.go('menuMaster.listTipovac');
			},
			function (result) {
				if ((result.status == 409)
					|| (result.status == 400)) {
					$scope.errors = result.data;
				} else {
					$scope.errorMessages = ['Unknown error de servidor'];
				}
				$('#notificacionesModal').modal('show');
			});
		////
		//$state.go('menuMaster.listDepts');

	};

	$scope.loadTpvac = function () {
		tpvac.findById($stateParams.idtpvac, function (response) {
			if (response.data.status == 1) {
				$scope.newtpvac = response.data.info[0];
				if ($scope.newtpvac.estado == 'A') {
					$scope.newtpvac.estado = true;
				}
			}
		});
	};

	$scope.loadTpvac();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function tpvacTableCtrl($scope, $rootScope, $state, $compile, $window,
	popupService, DTOptionsBuilder, DTColumnDefBuilder, Tpvac, URL_API) {
	var vm = this;

	vm.listTpvac = listTpvac;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.tpvac = {};

	Tpvac.findAll(function (response) {
		if (response.data.status == 1) {
			vm.tpvac = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
		'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(0),
	DTColumnDefBuilder.newColumnDef(1),
	DTColumnDefBuilder.newColumnDef(2),
	DTColumnDefBuilder.newColumnDef(3).notSortable()];

	vm.deleteTpvac = deleteTpvac;
	vm.editTpvac = editTpvac;
	vm.activateTpvac = activateTpvac;

	function listTpvac() {
		Tpvac.findAll(function (response) {
			if (response.data.status == 1) {
				vm.tpvac = response.data.info;
			}
		});

	}
	;

	function reloadData() {
		Tpvac.findAll(function (response) {
			if (response.data.status == 1) {
				vm.tpvac = response.data.info;
			}
		});

	}
	;

	function deleteTpvac(tpvacId) {
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
				Tpvac.borrar(tpvacId, $rootScope.globals.currentUser.username,
					function (response) {
						reloadData();
					});

				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Tipo vacuna Inactivado',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
		/*
		if (popupService.showPopup('Esta seguro de borrar este registro?')) {
			Depts.borrar(deptsId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});

		}//*/
	}
	;

	function editTpvac(tpvacId) {

		$state.go('menuMaster.editTipovac', {
			idtpvac: tpvacId
		});

	}
	;

	function activateTpvac(tpvacId) {

		Tpvac.activar(tpvacId, $rootScope.globals.currentUser.username,
			function (response) {
				reloadData();
			}
		);

	}
	;

};


//TIPO MASCOTA 
function tpmascAddCtrl($rootScope, $scope, $filter, $http, $state, tpmasc) {

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
		$scope.newtpmasc = {
			descripcion: "",
			usuario: $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerTpmasc = function () {
		$scope.clearMessages();

		tpmasc
			.insertar(
				$scope.newtpmasc,
				function (response) {

					$scope.reset();

					$scope.successMessages = ['Tipo de mascota Registrado correctamente'];

				},
				function (result) {
					if ((result.status == 409)
						|| (result.status == 400)) {
						$scope.errors = result.data;
					} else {
						$scope.errorMessages = ['Unknown error de servidor'];
					}
				});
		//$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listTPmascota');

	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function tpmascEditCtrl($rootScope, $scope, $filter, $state, $stateParams,tpmasc) {

	$scope.updateTpmasc = function () {

		var date = new Date();
		var tpmascObj = {
			usuario: $rootScope.globals.currentUser.username
		};

		$scope.newtpmasc.usuario = tpmascObj.usuario;

		tpmasc.actualizar(
			$scope.newtpmasc,
			function (response) {
				$scope.successMessages = ['Tipo de mascota Actualizado correctamente'];
				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Exito',
					text: "Registro actualizado correctamente",
					showConfirmButton: false,
					timer: 2000
				});
				$state.go('menuMaster.listTPmascota');
			},
			function (result) {
				if ((result.status == 409)
					|| (result.status == 400)) {
					$scope.errors = result.data;
				} else {
					$scope.errorMessages = ['Unknown error de servidor'];
				}
				$('#notificacionesModal').modal('show');
			});
		////
		//$state.go('menuMaster.listDepts');

	};

	$scope.loadTpmasc = function () {
		tpmasc.findById($stateParams.idtpmasc, function (response) {
			if (response.data.status == 1) {
				$scope.newtpmasc = response.data.info[0];
				if ($scope.newtpmasc.estado == 'A') {
					$scope.newtpmasc.estado = true;
				}
			}
		});
	};

	$scope.loadTpmasc();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function tpmascTableCtrl($scope, $rootScope, $state, $compile, $window,
	popupService, DTOptionsBuilder, DTColumnDefBuilder, Tpmasc, URL_API) {
	var vm = this;

	vm.listTpmasc = listTpmasc;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.Tpmasc = {};

	Tpmasc.findAll(function (response) {
		if (response.data.status == 1) {
			vm.tpmasc = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
		'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(0),
	DTColumnDefBuilder.newColumnDef(1),
	DTColumnDefBuilder.newColumnDef(2),
	DTColumnDefBuilder.newColumnDef(3).notSortable()];

	vm.deleteTpmasc = deleteTpmasc;
	vm.editTpmasc = editTpmasc;
	vm.activateTpmasc = activateTpmasc;

	function listTpmasc() {
		Tpmasc.findAll(function (response) {
			if (response.data.status == 1) {
				vm.tpmasc = response.data.info;
			}
		});

	}
	;

	function reloadData() {
		Tpmasc.findAll(function (response) {
			if (response.data.status == 1) {
				vm.tpmasc = response.data.info;
			}
		});

	}
	;

	function deleteTpmasc(tpvacId) {
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
				Tpmasc.borrar(tpmascId, $rootScope.globals.currentUser.username,
					function (response) {
						reloadData();
					});

				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Tipo mascota Inactivado',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
		/*
		if (popupService.showPopup('Esta seguro de borrar este registro?')) {
			Depts.borrar(deptsId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});

		}//*/
	}
	;

	function editTpmasc(tpmascId) {

		$state.go('menuMaster.editTPmascota', {
			idtpmasc: tpmascId
		});

	}
	;

	function activateTpmasc(tpmascId) {

		Tpmasc.activar(tpmascId, $rootScope.globals.currentUser.username,
			function (response) {
				reloadData();
			}
		);

	}
	;

};
