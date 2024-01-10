
/*************************** MASCOTA CONTROLLER ***********************************/

function MascotaAddCtrl($rootScope, $stateParams, $scope,
	URL_API, $filter, $http, $state, Masc) {


	$scope.getMaxDate = function () {
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth() + 1; // Agrega 1 ya que en JavaScript los meses comienzan desde 0
		var day = today.getDate();

		// Formatea la fecha como YYYY-MM-DD (formato que utiliza el input type="date")
		var maxDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);

		return maxDate;
	};
	$scope.formatoFecha = function (fecha) {
		return $filter('date')(fecha, 'yyyy-MM-dd');
	};

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
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		$scope.isVisibleAfterUsuario = false;
		$scope.formType = 'ADD';

		var date = new Date();
		$scope.newMasc = {
			idmasc: "",
			idtpmasc: "",
			iddepto: "",
			idmuni: "",
			depto: "",
			muni: "",
			tipomasc: "",
			dueno: "",
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

	$scope.dept = null;
	$scope.loadDept = function () {

		$scope.dept = [];
		Masc.findAllDept(function (response) {
			if (response.data.status == 1) {
				$scope.dept = response.data.info;
				$scope.loadMunis();
			}
			else $scope.dept = [];
		});
	};
	$scope.loadDept();

	$scope.muni = null;
	$scope.loadMunis = function () {
		$scope.muni = [];
		//if ($scope.newMasc.depto != "") {
		Masc.findMuni($scope.newMasc.iddepto, function (response) {
			if (response.data.status == 1) {
				$scope.muni = response.data.info;
			}
			else $scope.muni = [];
		});
		//}
	};

	$scope.ltpmasc = null;
	$scope.loadTpmascota = function () {
		$scope.ltpmasc = [];
		Masc.findAllTpmasc(function (response) {
			if (response.data.status == 1) {
				$scope.ltpmasc = response.data.info;
			}
			else $scope.ltpmasc = [];
		});
	};
	$scope.loadTpmascota();

	$scope.loadImage = function (input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function (e) {
				$scope.$apply(function () {
					$scope.imageUrl = e.target.result;
				});
			};

			reader.readAsDataURL(input.files[0]);
		}
	};

};

function MascotaEditCtrl($rootScope, $scope, $filter, $state, $stateParams,
	URL_API, Masc) {

	$scope.isVisibleAfterUsuario = true;

	$scope.getMaxDate = function () {
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth() + 1;
		var day = today.getDate();
		var maxDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);

		return maxDate;
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
		$rootScope.$broadcast("refreshMasc", 0);

		var date = new Date();
		$scope.newMasc = {
			idmasc: "",
			idtpmasc: "",
			iddepto: "",
			idmuni: "",
			depto: "",
			muni: "",
			tipomasc: "",
			dueno: "",
			direccion: "",
			estado: "",
			estadodir: "",
			nmasc: "",
			codigo: "",
			nacim: "",
			foto: "",
			fotol: "",
			usuario: $rootScope.globals.currentUser.username
		};


		$scope.clearMessages();
	};

	$scope.registerMasc = function (value) {

		$scope.clearMessages();

		if (value == "ADD") {
			$scope.newMasc.nacim = $scope.formatoFecha($scope.newMasc.nacim);
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
			var fileInput = document.getElementById('fileInput');
            $scope.newMasc.foto = fileInput.files[0];

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

			/*Masc.actualizarFoto(function (data) {
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
			});*/

			


		}

	};

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";

	$scope.loadMasc = function () {
		Masc.findById($stateParams.idMasc, function (response) {
			if (response.data.status == 1)
				$scope.newMasc = response.data.info[0].mascota;
			$scope.newMasc.iddepto = response.data.info[0].mascota.iddepto;

			var fechaO = new Date(response.data.info[0].mascota.nacim);
			var nuevaFecha = new Date(fechaO);
			nuevaFecha.setDate(fechaO.getDate() + 1);
			$scope.newMasc.nacim = nuevaFecha;
			

			if ($scope.newMasc.estado == 'A') {
				$scope.newMasc.estado = true;
			}
			if ($scope.newMasc.estadodir == 'A') {
				$scope.newMasc.estadodir = true;
			}
			$scope.loadDept();
		});
	};
	$scope.loadMasc();

	$scope.dept = null;
	$scope.loadDept = function () {

		$scope.dept = [];
		Masc.findAllDept(function (response) {
			if (response.data.status == 1) {
				$scope.dept = response.data.info;
				$scope.loadMunis();
			}
			else $scope.dept = [];
		});
	};
	//$scope.loadDept();

	$scope.muni = null;
	$scope.loadMunis = function () {
		$scope.muni = [];
		//if ($scope.newMasc.depto != "") {
		Masc.findMuni($scope.newMasc.iddepto, function (response) {
			if (response.data.status == 1) {
				$scope.muni = response.data.info;
			}
			else $scope.muni = [];
		});
		//}
	};

	$scope.ltpmasc = null;
	$scope.loadTpmascota = function () {
		$scope.ltpmasc = [];
		Masc.findAllTpmasc(function (response) {
			if (response.data.status == 1) {
				$scope.ltpmasc = response.data.info;
			}
			else $scope.ltpmasc = [];
		});
	};
	$scope.loadTpmascota();

	$scope.loadImage = function (input) {
		
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				$scope.$apply(function () {
					$scope.newMasc.foto = e.target.result;
				});
			};
			reader.readAsDataURL(input.files[0]);
		}
	};
};

function MascotaListCtrl($scope, $rootScope, $state, $compile, $window, popupService,
	DTOptionsBuilder, DTColumnDefBuilder, Masc, URL_API) {
	var vm = this;

	vm.listMasc = listMasc;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.masc = {};



	Masc.findAlls(
		$rootScope.globals.currentUser.sec_rol[0].id,
		$rootScope.globals.currentUser.username,
		function (response) {
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
	$window, popupService, Vacuna) {

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

		$scope.newvac = {
			id_vacuna: "",
			id_mascota: "",
			id_tipovacuna: "",
			usuario: $rootScope.globals.currentUser.username
		};
		$scope.newvac.id_mascota = $stateParams.idMasc;

		$scope.clearMessages();
	};

	$scope.guardarVac = function (value) {
		$scope.clearMessages();
		if (value == "ADD") {
			//VERIFICAR SI LA MASCOTA YA TIENE ESTA VACUNA
			//console.log('Hola'+$scope.newvac.id_tipovacuna);
			Vacuna.findById($stateParams.idMasc, $scope.newvac.id_tipovacuna, function (response) {
				if (response.data.status == 1) {
					$scope.errorMessagesChild = ['Ya tiene esta vacuna'];
				}
				else Vacuna.insertar($scope.newvac, function (data) {
					console.log(103);
					$scope.formTypeVac = "UPD";
					$scope.refreshVac($stateParams.idMasc);
					$scope.resetVac();
					Swal.fire({
						toast: true,
						position: 'top-end',
						type: 'success',
						title: 'Vacuna registrada correctamente',
						showConfirmButton: false,
						timer: 1000
					})

				}, function (result) {
					if ((result.status == 409) || (result.status == 400)) {
						$scope.errorsChild = result.data;
					} else {
						$scope.errorMessagesChild = ['Unknown error de servidor'];
					}
				});

			});

		}
	};

	$scope.resetVac();

	$scope.loadTPVacunas = function () {
		Vacuna.findAllTpvac(function (response) {
			if (response.data.status == 1) {
				console.log(response.data.info);
				$scope.tpv = response.data.info;
			}
			else $scope.tpv = [];
		});
	};

	$scope.loadTPVacunas();

	//LISTA
	$scope.vacmasc = null;
	$scope.refreshVac = function (idMasc) {
		Vacuna.findByMasc(idMasc, function (response) {
			if (response.data.status == 1) {
				$scope.vacmasc = response.data.info;
			}
			else $scope.vacmasc = [];
		});
	};

	if ($scope.formType == "ADD") {
		$scope.refreshVac("NADA");
	} else {
		$scope.refreshVac($stateParams.idMasc);
	}

	$scope.deleteVac = function (idVac) {

		Swal.fire({
			title: 'Esta seguro de eliminar este registro?',
			text: "",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminar!'
		}).then((result) => {
			if (result.value) {
				Vacuna.borrar(idVac, function (response) {
					Swal.fire({
						toast: true,
						position: 'top-end',
						type: 'success',
						title: 'Registro eliminado',
						showConfirmButton: false,
						timer: 1000
					})
					$scope.refreshVac($stateParams.idMasc);
				});


			}
		})
		/*if (popupService.showPopup('Esta seguro de borrar este registro?')) {
			//console.log(idVac+' + '+$stateParams.idMasc);

			Vacuna.borrar(idVac, function (response) {
			   $scope.refreshVac($stateParams.idMasc);
			});
		}*/
	};

	$rootScope.$on("refreshVacs", function (event, data) {
		$scope.refreshVac(data);
	});
};
