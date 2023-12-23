// *************************************************APP*******************************************************

// TIPO VEHICULO
function TipoVehiculoAddCtrl($rootScope, $scope, $filter, $http, $state, TipoVehiculo) {

	$scope.formType = 'ADD';
	$scope.isNew = function(value) {
		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {
		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newTipoVehiculo = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerTipoVehiculo = function() {
		$scope.clearMessages();

		TipoVehiculo.insertar($scope.newTipoVehiculo, function(response) {

			$scope.reset();

			//$scope.successMessages = [ 'Tipo de Vehiculo Registrado correctamente' ];
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Registro ingresado correctamente',
				showConfirmButton: false,
				timer: 1000
			})
			$state.go('menuMaster.listTipoVehiculo');

		}, function(result) {
			if ((result.status == 409)
					|| (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
	};
	$scope.reset();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoVehiculoEditCtrl($rootScope, $scope, $filter, $state, $stateParams, TipoVehiculo) {

	$scope.updateTipoVehiculo = function() {

		var date = new Date();
		var TipoVehiculoObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newTipoVehiculo.usuario = TipoVehiculoObj.usuario;

		TipoVehiculo.actualizar($scope.newTipoVehiculo,	function(response) {
			//$scope.successMessages = [ 'Tipo de Vehiculo Actualizado Correctamente' ];
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Registro actualizado correctamente',
				showConfirmButton: false,
				timer: 1000
			})
			$state.go('menuMaster.listTipoVehiculo');
		}, function(result) {
			if ((result.status == 409)
					|| (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
	};

	$scope.loadTipoVehiculo = function() {
		TipoVehiculo.findById($stateParams.idTipoVehiculo, function(response) {
			if (response.data.status==1){
				$scope.newTipoVehiculo = response.data.info[0];
				if($scope.newTipoVehiculo.estado=='A'){
					$scope.newTipoVehiculo.estado = true;
				}
			}
		});
	};
	$scope.loadTipoVehiculo();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoVehiculoTableCtrl($scope, $rootScope, $state, $compile, $window, popupService, DTOptionsBuilder, DTColumnDefBuilder, TipoVehiculo, URL_API) {
	var vm = this;

	vm.listTipoVehiculo = listTipoVehiculo;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.tipoVehiculo = {};

	TipoVehiculo.findAll(function(response) {
		if (response.data.status==1){
		vm.tipoVehiculo = response.data.info;
		}
	});
	
	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
		'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
		DTColumnDefBuilder.newColumnDef(1),
		DTColumnDefBuilder.newColumnDef(2),
		DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteTipoVehiculo = deleteTipoVehiculo;
	vm.editTipoVehiculo = editTipoVehiculo;
	vm.activateTipoVehiculo = activateTipoVehiculo;
	
	function listTipoVehiculo() {
		TipoVehiculo.findAll(function(response) {
			if (response.data.status==1){
			vm.tipoVehiculo = response.data.info;
			}
		});
	}
	;

	function reloadData() {
		TipoVehiculo.findAll(function(response) {
			if (response.data.status==1){
				vm.tipoVehiculo = response.data.info;
			}
		});

	}
	;

	function deleteTipoVehiculo(tipoVehiculoId) {
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
				TipoVehiculo.borrar(tipoVehiculoId,
					$rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo de Vehiculo Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		/*
		if (popupService.showPopup('Esta seguro de borrar este registro?')) {
			TipoVehiculo.borrar(tipoVehiculoId,
					$rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
		}
		//*/
	}
	;
	
	function activateTipoVehiculo(tipoVehiculoId) {
		TipoVehiculo.activar(tipoVehiculoId, $rootScope.globals.currentUser.username,
				function(response) {
					reloadData();
				});

			};

	function editTipoVehiculo(tipoVehiculoId) {

		$state.go('menuMaster.editTipoVehiculo', {
			idTipoVehiculo : tipoVehiculoId
		});
	};
};

// TIPO DE DOCUMENTO
function TipoDocAddCtrl($rootScope, $scope, $filter, $http, $state, TipoDoc) {

	$scope.formType = 'ADD';
	$scope.isNew = function(value) {
		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {
		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newTipoDoc = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};
		$scope.clearMessages();
	};

	$scope.registerTipoDoc = function() {
		$scope.clearMessages();

		TipoDoc.insertar($scope.newTipoDoc,	function(response) {

			$scope.reset();

			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro ingresado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listTipoDoc');
			},function(result) {
				if ((result.status == 409)
				|| (result.status == 400)) {
					$scope.errors = result.data;
				} else {
					$scope.errorMessages = [ 'Unknown error de servidor' ];
				}
				$('#notificacionesModal').modal('show');
			});
	};
	$scope.reset();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoDocEditCtrl($rootScope, $scope, $filter, $state, $stateParams,	TipoDoc) {

	$scope.updateTipoDoc = function() {

		var date = new Date();
		var TipoDocObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newTipoDoc.usuario = TipoDocObj.usuario;

		TipoDoc.actualizar($scope.newTipoDoc, function(response) {
			//$scope.successMessages = [ 'Tipo de Documento Actualizado correctamente' ];
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro actualizado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listTipoDoc');
		},
		function(result) {
			if ((result.status == 409)
			|| (result.status == 400)) {
			$scope.errors = result.data;
			} else {
			$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
	};

	$scope.loadTipoDoc = function() {
		TipoDoc.findById($stateParams.idTipoDoc, function(response) {
			if (response.data.status==1){
				$scope.newTipoDoc = response.data.info[0];
				if($scope.newTipoDoc.estado=='A'){
					$scope.newTipoDoc.estado = true;
				}
			}
		});
	};

	$scope.loadTipoDoc();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoDocTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, TipoDoc, URL_API) {
	var vm = this;

	vm.listTipoDoc = listTipoDoc;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.tipoDoc = {};

	TipoDoc.findAll(function(response) {
		if (response.data.status==1){
		vm.tipoDoc = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteTipoDoc = deleteTipoDoc;
	vm.editTipoDoc = editTipoDoc;
	vm.activateTipoDoc = activateTipoDoc;

	function listTipoDoc() {
		TipoDoc.findAll(function(response) {
			if (response.data.status==1){
			vm.tipoDoc = response.data.info;
			}
		});

	};

	function reloadData() {
		TipoDoc.findAll(function(response) {
			if (response.data.status==1){
			vm.tipoDoc = response.data.info;
			}
		});
	};

	function deleteTipoDoc(tipoDocId) {
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
				TipoDoc.borrar(tipoDocId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo de Documento Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
	};

	function editTipoDoc(tipoDocId) {
		$state.go('menuMaster.editTipoDoc', {
			idTipoDoc : tipoDocId
		});
	};
	
	function activateTipoDoc(tipoDocId) {
		TipoDoc.activar(tipoDocId, $rootScope.globals.currentUser.username,
				function(response) {
					reloadData();
				});
			};
	};

//TIPO GASTO
function TipoGastoAddCtrl($rootScope, $scope, $filter, $http, $state, TipoGasto) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newTipoGasto = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerTipoGasto = function() {
		$scope.clearMessages();

		TipoGasto.insertar($scope.newTipoGasto,	function(response) {
			$scope.reset();
	
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Registro ingresado correctamente',
				showConfirmButton: false,
				timer: 1000
			})
			$state.go('menuMaster.listTipoGasto');
			},function(result) {
				if ((result.status == 409)
				|| (result.status == 400)) {
				$scope.errors = result.data;
				} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
	};
	$scope.reset();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoGastoEditCtrl($rootScope, $scope, $filter, $state, $stateParams,
		TipoGasto) {

	$scope.updateTipoGasto = function() {

		var date = new Date();
		var TipoGastoObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newTipoGasto.usuario = TipoGastoObj.usuario;

		TipoGasto.actualizar($scope.newTipoGasto,function(response) {
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Registro actualizado correctamente',
				showConfirmButton: false,
				timer: 1000
			})
			$state.go('menuMaster.listTipoGasto');
			},function(result) {
				if ((result.status == 409)
				|| (result.status == 400)) {
				$scope.errors = result.data;
				} else {
					$scope.errorMessages = [ 'Unknown error de servidor' ];
				}
				$('#notificacionesModal').modal('show');
			});
	};

	$scope.loadTipoGasto = function() {
		TipoGasto.findById($stateParams.idTipoGasto, function(response) {
			if (response.data.status==1){
				$scope.newTipoGasto = response.data.info[0];
				if($scope.newTipoGasto.estado=='A'){
					$scope.newTipoGasto.estado = true;
				}
			}
		});
	};
	$scope.loadTipoGasto();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoGastoTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, TipoGasto, URL_API) {
	var vm = this;

	vm.listTipoGasto = listTipoGasto;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.tipoGasto = {};

	TipoGasto.findAll(function(response) {
		if (response.data.status==1){
		vm.tipoGasto = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteTipoGasto = deleteTipoGasto;
	vm.editTipoGasto = editTipoGasto;
	vm.activateTipoGasto = activateTipoGasto;

	function listTipoGasto() {
		TipoGasto.findAll(function(response) {
			if (response.data.status==1){
			vm.tipoGasto = response.data.info;
			}
		});

	}
	;

	function reloadData() {
		TipoGasto.findAll(function(response) {
			if (response.data.status==1){
			vm.tipoGasto = response.data.info;
			}
		});

	}
	;

	function deleteTipoGasto(tipoGastoId) {
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
				TipoGasto.borrar(tipoGastoId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo de Gasto Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})

	}
	;

	function editTipoGasto(tipoGastoId) {

		$state.go('menuMaster.editTipoGasto', {
			idTipoGasto : tipoGastoId
		});

	}
	;

	function activateTipoGasto(tipoGastoId) {
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
				TipoGasto.activar(tipoGastoId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo de Gasto Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
	};

};

//TIPO GASTO RETACEO
function TipoGastoRetaceoAddCtrl($rootScope, $scope, $filter, $http, $state, TipoGastoRetaceo) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newTipoGastoRetaceo = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerTipoGastoRetaceo= function() {
		$scope.clearMessages();

		TipoGastoRetaceo.insertar($scope.newTipoGastoRetaceo,function(response) {

			$scope.reset();

			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Registro ingresado correctamente',
				showConfirmButton: false,
				timer: 1000
			})
			$state.go('menuMaster.listTipoGastoRetaceo');

		},
		function(result) {
			if ((result.status == 409)
					|| (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});

	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoGastoRetaceoEditCtrl($rootScope, $scope, $filter, $state, $stateParams,
		TipoGastoRetaceo) {

	$scope.updateTipoGastoRetaceo = function() {

		var date = new Date();
		var TipoGastoRetaceoObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newTipoGastoRetaceo.usuario = TipoGastoRetaceoObj.usuario;

		TipoGastoRetaceo.actualizar($scope.newTipoGastoRetaceo,
			function(response) {
				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Registro actualizado correctamente',
					showConfirmButton: false,
					timer: 1000
				})
				$state.go('menuMaster.listTipoGastoRetaceo');
			},
			function(result) {
				if ((result.status == 409)
						|| (result.status == 400)) {
					$scope.errors = result.data;
				} else {
					$scope.errorMessages = [ 'Unknown error de servidor' ];
				}
				$('#notificacionesModal').modal('show');
			});

	};

	$scope.loadTipoGastoRetaceo = function() {
		TipoGastoRetaceo.findById($stateParams.idTipoGastoRetaceo, function(response) {
			if (response.data.status==1){
				$scope.newTipoGastoRetaceo = response.data.info[0];
				if($scope.newTipoGastoRetaceo.estado=='A'){
					$scope.newTipoGastoRetaceo.estado = true;
				}
			}
		});
	};

	$scope.loadTipoGastoRetaceo();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoGastoRetaceoTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, TipoGastoRetaceo, URL_API) {
	var vm = this;

	vm.listTipoGastoRetaceo = listTipoGastoRetaceo;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.tipoGastoRetaceo = {};

	TipoGastoRetaceo.findAll(function(response) {
		if (response.data.status==1){
		vm.tipoGastoRetaceo = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteTipoGastoRetaceo = deleteTipoGastoRetaceo;
	vm.editTipoGastoRetaceo = editTipoGastoRetaceo;
	vm.activateTipoGastoRetaceo = activateTipoGastoRetaceo;

	function listTipoGastoRetaceo() {
		TipoGastoRetaceo.findAll(function(response) {
			if (response.data.status==1){
			vm.tipoGastoRetaceo = response.data.info;
			}
		});

	}
	;

	function reloadData() {
		TipoGastoRetaceo.findAll(function(response) {
			if (response.data.status==1){
			vm.tipoGastoRetaceo = response.data.info;
			}
		});

	}
	;

	function deleteTipoGastoRetaceo(tipoGastoRetaceoId) {
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
				TipoGastoRetaceo.borrar(tipoGastoRetaceoId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo de Gasto Retaceo Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
	}
	;

	function editTipoGastoRetaceo(tipoGastoRetaceoId) {

		$state.go('menuMaster.editTipoGastoRetaceo', {
			idTipoGastoRetaceo : tipoGastoRetaceoId
		});

	}
	;

	function activateTipoGastoRetaceo(tipoGastoRetaceoId) {
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
				TipoGastoRetaceo.activar(tipoGastoRetaceoId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo de Gasto Retaceo Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
	};

};

// TIPO DE PRODUCTO
function TipoProdAddCtrl($rootScope, $scope, $filter, $http, $state, TipoProd) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newTipoProd = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerTipoProd = function() {
		$scope.clearMessages();

		TipoProd
				.insertar(
						$scope.newTipoProd,
						function(response) {

							$scope.reset();

							$scope.successMessages = [ 'Tipo de Producto Registrado correctamente' ];

						},
						function(result) {
							if ((result.status == 409)
									|| (result.status == 400)) {
								$scope.errors = result.data;
							} else {
								$scope.errorMessages = [ 'Unknown error de servidor' ];
							}
						});
		////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listTipoProd');
		
	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoProdEditCtrl($rootScope, $scope, $filter, $state, $stateParams,
		TipoProd) {

	$scope.updateTipoProd = function() {

		var date = new Date();
		var TipoProdObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newTipoProd.usuario = TipoProdObj.usuario;

		TipoProd
				.actualizar(
						$scope.newTipoProd,
						function(response) {
							$scope.successMessages = [ 'Tipo de Producto Actualizado correctamente' ];

						},
						function(result) {
							if ((result.status == 409)
									|| (result.status == 400)) {
								$scope.errors = result.data;
							} else {
								$scope.errorMessages = [ 'Unknown error de servidor' ];
							}
						});
		////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listTipoProd');

	};

	$scope.loadTipoProd = function() {
		TipoProd.findById($stateParams.idTipoProd, function(response) {
			if (response.data.status==1){
				$scope.newTipoProd = response.data.info[0];
				if($scope.newTipoProd.estado=='A'){
					$scope.newTipoProd.estado = true;
				}
			}
		});
	};

	$scope.loadTipoProd();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoProdTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, TipoProd, URL_API) {
	var vm = this;

	vm.listTipoProd = listTipoProd;
	vm.reloadData = reloadData;
	vm.activateTipoProd = activateTipoProd;

	vm.message = '';
	vm.tipoProd = {};

	TipoProd.findAll(function(response) {
		if (response.data.status==1){
		vm.tipoProd = response.data.info;
		}
	});


	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteTipoProd = deleteTipoProd;
	vm.editTipoProd = editTipoProd;
	vm.activateTipoProd = activateTipoProd;
	
	function listTipoProd() {
		TipoProd.findAll(function(response) {
			if (response.data.status==1){
			vm.tipoProd = response.data.info;
			}
		});

	}
	;
	

	function reloadData() {
		TipoProd.findAll(function(response) {
			if (response.data.status==1){
			vm.tipoProd = response.data.info;
			}
		});

	}
	;


	function deleteTipoProd(tipoProdId) {
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
				TipoProd.borrar(tipoProdId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo de Producto Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
	}
	;
	
	function activateTipoProd(tipoProdId) {
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
				TipoProd.activar(tipoProdId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo de Producto Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};

	function editTipoProd(tipoProdId) {

		$state.go('menuMaster.editTipoProd', {
			idTipoProd : tipoProdId
		});

	}
	;

};

// TIPO DE DOCUMENTO PROVEEDOR
function TipoDocProvAddCtrl($rootScope, $scope, $filter, $http, $state,
		TipoDocProv) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newTipoDocProv = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerTipoDocProv = function() {
		$scope.clearMessages();

		TipoDocProv
				.insertar(
						$scope.newTipoDocProv,
						function(response) {

							$scope.reset();

							$scope.successMessages = [ 'Tipo de Documento Proveedor Registrado correctamente' ];

						},
						function(result) {
							if ((result.status == 409)
									|| (result.status == 400)) {
								$scope.errors = result.data;
							} else {
								$scope.errorMessages = [ 'Unknown error de servidor' ];
							}
						});
		////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listTipoDocProv');

	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoDocProvEditCtrl($rootScope, $scope, $filter, $state, $stateParams,
		TipoDocProv) {

	$scope.updateTipoDocProv = function() {

		var date = new Date();
		var TipoDocProvObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newTipoDocProv.usuario = TipoDocProvObj.usuario;

		TipoDocProv
				.actualizar(
						$scope.newTipoDocProv,
						function(response) {
							$scope.successMessages = [ 'Tipo de Documento Proveedor Actualizado correctamente' ];

						},
						function(result) {
							if ((result.status == 409)
									|| (result.status == 400)) {
								$scope.errors = result.data;
							} else {
								$scope.errorMessages = [ 'Unknown error de servidor' ];
							}
						});
		////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listTipoDocProv');

	};

	$scope.loadTipoDocProv = function() {
		TipoDocProv.findById($stateParams.idTipoDocProv, function(response) {
			if (response.data.status==1){
				$scope.newTipoDocProv = response.data.info[0];
				if($scope.newTipoDocProv.estado=='A'){
					$scope.newTipoDocProv.estado = true;
				}
			}
		});
	};

	$scope.loadTipoDocProv();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoDocProvTableCtrl($scope, $rootScope, $state, $compile, $window, popupService, DTOptionsBuilder, DTColumnDefBuilder, TipoDocProv,
		URL_API) {
	var vm = this;

	vm.listTipoDocProv = listTipoDocProv;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.tipoDocProv = {};

	TipoDocProv.findAll(function(response) {
		if (response.data.status==1){
		vm.tipoDocProv = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteTipoDocProv = deleteTipoDocProv;
	vm.editTipoDocProv = editTipoDocProv;
	vm.activateTipoDocProv = activateTipoDocProv;

	function listTipoDocProv() {
		TipoDocProv.findAll(function(response) {
			if (response.data.status==1){
			vm.tipoDocProv = response.data.info;
			}
		});

	}
	;

	function reloadData() {
		TipoDocProv.findAll(function(response) {
			if (response.data.status==1){
			vm.tipoDocProv = response.data.info;
			}
		});

	}
	;

	function deleteTipoDocProv(tipoDocProvId) {
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
				TipoDocProv.borrar(tipoDocProvId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo de Doc. Proveedor Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		/*
		if (popupService.showPopup('Esta seguro de borrar este registro?')) {
			TipoDocProv.borrar(tipoDocProvId,
					$rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});

		}
		//*/
	}
	;

	function editTipoDocProv(tipoDocProvId) {

		$state.go('menuMaster.editTipoDocProv', {
			idTipoDocProv : tipoDocProvId
		});

	}
	;



function activateTipoDocProv(tipoDocProvId) {

	TipoDocProv.activar(tipoDocProvId, $rootScope.globals.currentUser.username,
			function(response) {
				reloadData();
			
			});
};

};

// TIPO DE INVENTARIO
function TipoInventarioAddCtrl($rootScope, $scope, $filter, $http, $state, TipoInventario) {
	$scope.formType = 'ADD';
	$scope.isNew = function(value) {
		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {
		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newTipoInventario = {
			id : "",
			descripcion : "",
			referencia : "",
			usuario : $rootScope.globals.currentUser.username
		};
		$scope.clearMessages();
	};

	$scope.registerTipoInventario = function() {
		$scope.clearMessages();
		TipoInventario.insertar($scope.newTipoInventario, function(response) {
			$scope.reset();
			$scope.successMessages = [ 'TipoInventario Registrado correctamente' ];
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
		});
		////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listTipoInventario');

	};
	$scope.reset();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoInventarioEditCtrl($rootScope, $scope, $filter, $state, $stateParams, TipoInventario) {
	$scope.updateTipoInventario = function() {
		var date = new Date();
		var TipoInventarioObj = {
			id: "",
			descripcion: "",
			referencia: "",
			usuario : $rootScope.globals.currentUser.username
		};
		$scope.newTipoInventario.id = TipoInventarioObj.id;
		$scope.newTipoInventario.descripcion = TipoInventarioObj.descripcion;
		$scope.newTipoInventario.referencia = TipoInventarioObj.referencia;
		$scope.newTipoInventario.usuario = TipoInventarioObj.usuario;
		TipoInventario.actualizar($scope.newTipoInventario, function(response) {
			$scope.successMessages = [ 'TipoInventario Actualizado correctamente' ];
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
		});
		////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listTipoInventario');

	};

	$scope.loadTipoInventario = function() {
		TipoInventario.findById($stateParams.id_tipo_inventario, function(response) {
			if (response.data.status==1){
			$scope.newTipoInventario = response.data.info[0];
			}
		});
	};
	$scope.loadTipoInventario();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoInventarioTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, TipoInventario, URL_API) {
	var vm = this;

	vm.listTipoInventario = listTipoInventario;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.tipoInventario = {};

	TipoInventario.findAll(function(response) {
		if (response.data.status==1){
		vm.tipoInventario = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteTipoInventario = deleteTipoInventario;
	vm.editTipoInventario = editTipoInventario;
	vm.activateTipoInventario = activateTipoInventario;

	function listTipoInventario() {
		TipoInventario.findAll(function(response) {
			if (response.data.status==1){
			vm.tipoInventario = response.data.info;
			}
		});
	};

	function reloadData() {
		TipoInventario.findAll(function(response) {
			if (response.data.status==1){
			vm.tipoInventario = response.data.info;
			}
		});
	};

	function deleteTipoInventario(tipoInventario) {
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
				TipoInventario.borrar(tipoInventario,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo de Inventario Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		/*
		if (popupService.showPopup('Esta seguro de borrar este registro?')) {
			TipoInventario.borrar(tipoInventario,
				function(response) {
					reloadData();
				});
		}//*/
	};

	function editTipoInventario(tipoInventario) {
		$state.go('menuMaster.editTipoInventario', {
			id_tipo_inventario : tipoInventario.id
		});
	};

	function activateTipoInventario(tipoInventario) {
		TipoInventario.activar(tipoInventario,
			function(response) {
				reloadData();
			});
	};
};


//TIPO PERSONA
function TipoPerAddCtrl($rootScope, $scope, $filter, $http, $state, TipoPer) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newTipoPer = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerTipoPer = function() {
		$scope.clearMessages();

		TipoPer.insertar($scope.newTipoPer,
			function(response) {

				$scope.reset();

				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Exito',
					text: "Registro ingresado correctamente",
					showConfirmButton: false,
					timer: 2000
				});
				$state.go('menuMaster.listTipoPer');
			},
			function(result) {
				if ((result.status == 409)
						|| (result.status == 400)) {
					$scope.errors = result.data;
				} else {
					$scope.errorMessages = [ 'Unknown error de servidor' ];
				}
				$('#notificacionesModal').modal('show');
			}
		);
	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};
 
function TipoPerEditCtrl($rootScope, $scope, $filter, $state, $stateParams,
		TipoPer) {

	$scope.updateTipoPer = function() {

		var date = new Date();
		var TipoPerObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newTipoPer.usuario = TipoPerObj.usuario;

		TipoPer.actualizar($scope.newTipoPer,
			function(response) {
				//$scope.successMessages = [ 'Tipo de Persona Actualizado correctamente' ];
				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Exito',
					text: "Registro actualizado correctamente",
					showConfirmButton: false,
					timer: 2000
				});
				$state.go('menuMaster.listTipoPer');
			},
			function(result) {
				if ((result.status == 409)
						|| (result.status == 400)) {
					$scope.errors = result.data;
				} else {
					$scope.errorMessages = [ 'Unknown error de servidor' ];
				}
				$('#notificacionesModal').modal('show');
			}
		);
	};

	$scope.loadTipoPer = function() {
		TipoPer.findById($stateParams.idTipoPer, function(response) {
			if (response.data.status==1){
				$scope.newTipoPer = response.data.info[0];
				if($scope.newTipoPer.estado=='A'){
					$scope.newTipoPer.estado = true;
				}
			}
		});
	};

	$scope.loadTipoPer();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoPerTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, TipoPer, URL_API) {
	var vm = this;

	vm.listTipoPer = listTipoPer;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.tipoPer = {};

	TipoPer.findAll(function(response) {
		if (response.data.status==1){
		vm.tipoPer = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteTipoPer = deleteTipoPer;
	vm.editTipoPer = editTipoPer;
	vm.activateTipoPer = activateTipoPer;

	function listTipoPer() {
		TipoPer.findAll(function(response) {
			if (response.data.status==1){
			vm.tipoPer = response.data.info;
			}
		});

	}
	;

	function reloadData() {
		TipoPer.findAll(function(response) {
			if (response.data.status==1){
			vm.tipoPer = response.data.info;
			}
		});

	}
	;

	function deleteTipoPer(tipoPerId) {
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
				TipoPer.borrar(tipoPerId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo de Persona Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		/*
		if (popupService.showPopup('Esta seguro de borrar este registro?')) {
			TipoPer.borrar(tipoPerId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});

		}//*/
	}
	;

	function editTipoPer(tipoPerId) {

		$state.go('menuMaster.editTipoPer', {
			idTipoPer : tipoPerId
		});

	}
	;
	
	function activateTipoPer(tipoPerId) {

		TipoPer.activar(tipoPerId, $rootScope.globals.currentUser.username,
				function(response) {
					reloadData();
				
				});
	};


};

//TIPO DE RETENCION
function TipoRetAddCtrl($rootScope, $scope, $filter, $http, $state, TipoRet) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newTipoRet = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerTipoRet = function() {
		$scope.clearMessages();

		TipoRet.insertar($scope.newTipoRet, function(response) {

			$scope.reset();

			//$scope.successMessages = [ 'Tipo de Retencion Registrado correctamente' ];
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro ingresado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listTipoRet');
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		
	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoRetEditCtrl($rootScope, $scope, $filter, $state, $stateParams, TipoRet) {

	$scope.updateTipoRet = function() {

		var date = new Date();
		var TipoRetObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newTipoRet.usuario = TipoRetObj.usuario;

		TipoRet.actualizar($scope.newTipoRet, function(response) {
			$scope.successMessages = [ 'Tipo de Retencion Actualizado correctamente' ];
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro actualizado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listTipoRet');
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});

	};

	$scope.loadTipoRet = function() {
		TipoRet.findById($stateParams.idTipoRet, function(response) {
			if (response.data.status==1){
				$scope.newTipoRet = response.data.info[0];
				if($scope.newTipoRet.estado=='A'){
					$scope.newTipoRet.estado = true;
				}
			}
		});
	};

	$scope.loadTipoRet();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoRetTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, TipoRet, URL_API) {
	var vm = this;

	vm.listTipoRet = listTipoRet;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.tipoRet = {};

	TipoRet.findAll(function(response) {
		if (response.data.status==1){
		vm.tipoRet = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteTipoRet = deleteTipoRet;
	vm.editTipoRet = editTipoRet;
	vm.activateTipoRet = activateTipoRet;

	function listTipoRet() {
		TipoRet.findAll(function(response) {
			if (response.data.status==1){
			vm.tipoRet = response.data.info;
			}
		});

	}
	;

	function reloadData() {
		TipoRet.findAll(function(response) {
			if (response.data.status==1){
			vm.tipoRet = response.data.info;
			}
		});

	}
	;

	function deleteTipoRet(tipoRetId) {
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
				TipoRet.borrar(tipoRetId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo de Retencion Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	}
	;

	function editTipoRet(tipoRetId) {

		$state.go('menuMaster.editTipoRet', {
			idTipoRet : tipoRetId
		});

	}
	;
	
	function activateTipoRet(tipoRetId) {
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
				TipoRet.activar(tipoRetId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo de Retencion Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};

};

//TIPO DE CONTRIBUYENTE
function TipoContrAddCtrl($rootScope, $scope, $filter, $http, $state, TipoContr) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newTipoContr = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerTipoContr = function() {
		$scope.clearMessages();

		TipoContr.insertar($scope.newTipoContr, function(response) {

			$scope.reset();

			//$scope.successMessages = [ 'Tipo de Contribuyente Registrado correctamente' ];
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro ingresado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listTipoContr');
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		//$state.go('menuMaster.listTipoContr');

	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoContrEditCtrl($rootScope, $scope, $filter, $state, $stateParams, TipoContr) {

	$scope.updateTipoContr = function() {

		var date = new Date();
		var TipoContrObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newTipoContr.usuario = TipoContrObj.usuario;

		TipoContr.actualizar($scope.newTipoContr, function(response) {
			//$scope.successMessages = [ 'Tipo de Contribuyente Actualizado correctamente' ];
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro actualizado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listTipoContr');
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});

	};

	$scope.loadTipoContr = function() {
		TipoContr.findById($stateParams.idTipoContr, function(response) {
			if (response.data.status==1){
				$scope.newTipoContr = response.data.info[0];
				if($scope.newTipoContr.estado=='A'){
					$scope.newTipoContr.estado = true;
				}
			}
		});
	};

	$scope.loadTipoContr();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoContrTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, TipoContr, URL_API) {
	var vm = this;

	vm.listTipoContr = listTipoContr;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.tipoContr = {};

	TipoContr.findAll(function(response) {
		if (response.data.status==1){
		vm.tipoContr = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteTipoContr = deleteTipoContr;
	vm.editTipoContr = editTipoContr;
	vm.activateTipoContr = activateTipoContr;

	function listTipoContr() {
		TipoContr.findAll(function(response) {
			if (response.data.status==1){
			vm.tipoContr = response.data.info;
			}
		});

	}
	;

	function reloadData() {
		TipoContr.findAll(function(response) {
			if (response.data.status==1){
			vm.tipoContr = response.data.info;
			}
		});

	}
	;

	function deleteTipoContr(tipoContrId) {
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
				TipoContr.borrar(tipoContrId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo de Contribuyente Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
	}
	;

	function editTipoContr(tipoContrId) {

		$state.go('menuMaster.editTipoContr', {
			idTipoContr : tipoContrId
		});

	}
	;
	
	function activateTipoContr(tipoContrId) {
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
				TipoContr.activar(tipoContrId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo de Contribuyente Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};
};

// MARCA
function MarcaAddCtrl($rootScope, $scope, $filter, $http, $state, Marca) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newMarca = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerMarca = function() {
		$scope.clearMessages();

		Marca.insertar($scope.newMarca, function(response) {

			$scope.reset();

			Swal.fire({
			  position: 'top-end',
			  type: 'success',
			  title: 'Clasificacion 1 registrada correctamente',
			  showConfirmButton: false,
			  timer: 1000
			})

			$state.go('menuMaster.listMarca');
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});

	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function MarcaEditCtrl($rootScope, $scope, $filter, $state, $stateParams, Marca) {

	$scope.updateMarca = function() {

		var date = new Date();
		var MarcaObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newMarca.usuario = MarcaObj.usuario;

		Marca.actualizar($scope.newMarca, function(response) {
			Swal.fire({
			  position: 'top-end',
			  type: 'success',
			  title: 'Clasificacion 1 actualizada correctamente',
			  showConfirmButton: false,
			  timer: 1000
			})
			$state.go('menuMaster.listMarca');
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		

	};

	$scope.loadMarca = function() {
		Marca.findById($stateParams.idMarca, function(response) {
			if (response.data.status==1){
				$scope.newMarca = response.data.info[0];
				if($scope.newMarca.estado=='A'){
					$scope.newMarca.estado = true;
				}
			}
		});
	};

	$scope.loadMarca();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function MarcaTableCtrl($scope, $rootScope, $state, $compile, $window, popupService, DTOptionsBuilder, DTColumnDefBuilder, Marca, URL_API) {
	var vm = this;

	vm.listMarca = listMarca;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.marca = {};

	Marca.findAll(function(response) {
		if (response.data.status==1){
		vm.marca = response.data.info;
		}
	});
	
	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteMarca = deleteMarca;
	vm.activateMarca = activateMarca;
	vm.editMarca = editMarca;

	function listMarca() {
		Marca.findAll(function(response) {
			if (response.data.status==1){
			vm.marca = response.data.info;
			}
		});

	}
	;

	

	function editMarca(marcaId) {

		$state.go('menuMaster.editMarca', {
			idMarca : marcaId
		});

	}
	;

	function reloadData() {
		Marca.findAll(function(response) {
			if (response.data.status==1){
			vm.marca = response.data.info;
			}
		});

	}
	;
	


	function deleteMarca(marcaId) {
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
				Marca.borrar(marcaId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Marca Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	}
	;
	
	$rootScope.$on("reloadData", function(){
		vm.reloadData();
	});
	
	
	function activateMarca(marcaId) {
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
				Marca.activar(marcaId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
					position: 'top-end',
					type: 'success',
					title: 'Marca Activado',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
	};
};

// MODELO
function ModeloAddCtrl($rootScope, $scope, $filter, $http, $state, Modelo, Marca) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newModelo = {
			id : "", descripcion : "", id_marca : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerModelo = function() {
		$scope.clearMessages();

		Modelo.insertar($scope.newModelo, function(response) {

			$scope.reset();

			Swal.fire({
				toast:true,
			  position: 'top-end',
			  type: 'success',
			  title: 'Clasificacion 2 registrada correctamente',
			  showConfirmButton: false,
			  timer: 1000
			})

		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
		});
		////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listModelo');

	};

	$scope.reset();

	$scope.loadMarca = function() {
		Marca.findAllA(function(response) {
			if (response.data.status==1){
				$scope.marca = response.data.info;
			}
			else $scope.marca = [];
		});
	};

	$scope.loadMarca();

};

function ModeloEditCtrl($rootScope, $scope, $filter, $state, $stateParams,
		Modelo, Marca) {

	$scope.updateModelos = function() {

		var date = new Date();
		var ModeloObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newModelo.usuario = ModeloObj.usuario;

		Modelo.actualizar($scope.newModelo, function(response) {
			//$scope.successMessages = [ 'Modelo Actualizado correctamente' ];
			Swal.fire({
				toast:true,
			  position: 'top-end',
			  type: 'success',
			  title: 'Clasificacion 2 actualizado correctamente',
			  showConfirmButton: false,
			  timer: 1000
			})
			$state.go('menuMaster.listModelo');
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		////
		

	};
	
	$scope.loadMarca = function() {
		Marca.findAll(function(response) {
			if (response.data.status==1){
				$scope.marca = response.data.info;
			}
		});
	};

	$scope.loadMarca();
	
	$scope.loadModelo = function() {
		//console.log("entre...");
		Modelo.findByIds($stateParams.idMarca, $stateParams.idModelo, function(response) {
			if (response.data.status==1){
				$scope.newModelo = response.data.info[0];			
				$scope.newModelo.id_marca = response.data.info[0].id.id_marca;
				$scope.newModelo.id = response.data.info[0].id.id;
				if($scope.newModelo.estado=='A'){
					$scope.newModelo.estado = true;
				}
			}
			else{
				$scope.newModelo = [];
			}
		});
	};

	$scope.loadModelo();

};

function ModeloTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, Modelo, Marca, URL_API) {
	var vm = this;

	vm.listModelo = listModelo;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.modelo = {};

	Modelo.findAll(function(response) {
		if (response.data.status==1){
		vm.modelo = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3),
			DTColumnDefBuilder.newColumnDef(4),
			DTColumnDefBuilder.newColumnDef(5).notSortable() ];

	vm.deleteModelo = deleteModelo;
	vm.editModelo = editModelo;
	vm.activateModelo = activateModelo;

	function listModelo() {
		Modelo.findAll(function(response) {
			if (response.data.status==1){
			vm.modelo = response.data.info;
			}
		});

	}
	;

	function reloadData() {
		Modelo.findAll(function(response) {
			if (response.data.status==1){
			vm.modelo = response.data.info;
			}
		});

	}
	;

	function deleteModelo(modeloId, marcaId) {
		
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
				Modelo.borrar(marcaId, modeloId,
					$rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Clasificacion Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	}
	;

	function activateModelo(marcaId, modeloId) {
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
				Modelo.activar(marcaId, modeloId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Clasificacion Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	}
	;
	function editModelo(marcaId, modeloId) {

		$state.go('menuMaster.editModelo', {
			idMarca : marcaId,
			idModelo : modeloId
		});

	}
	;

};

// COLOR
function ColorAddCtrl($rootScope, $scope, $filter, $http, $state, Color) {
	$scope.formType = 'ADD';
	$scope.isNew = function(value) {
		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {
		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newColor = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};
		$scope.clearMessages();
	};

	$scope.registerColor = function() {
		$scope.clearMessages();
		Color.insertar($scope.newColor, function(response) {
			$scope.reset();
			$scope.successMessages = [ 'Color Registrada correctamente' ];
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
		});
		////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listColor');

	};
	$scope.reset();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function ColorEditCtrl($rootScope, $scope, $filter, $state, $stateParams, Color) {
	$scope.updateColor = function() {
		var date = new Date();
		var ColorObj = {
			usuario : $rootScope.globals.currentUser.username
		};
		$scope.newColor.usuario = ColorObj.usuario;
		Color.actualizar($scope.newColor, function(response) {
			$scope.successMessages = [ 'Color Actualizada correctamente' ];
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
		});
		////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listColor');

	};

	$scope.loadColor = function() {
		Color.findById($stateParams.idColor, function(response) {
			if (response.data.status==1){
			$scope.newColor = response.data.info[0];
			}
		});
	};
	$scope.loadColor();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function ColorTableCtrl($scope, $rootScope, $state, $compile, $window, popupService, DTOptionsBuilder, DTColumnDefBuilder, Color, URL_API) {
	var vm = this;

	vm.listColor = listColor;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.color = {};

	Color.findAll(function(response) {
		if (response.data.status==1){
		vm.color = response.data.info;
		}
	});
	
	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteColor = deleteColor;
	vm.activateColor = activateColor;
	vm.editColor = editColor;

	function listColor() {
		Color.findAll(function(response) {
			if (response.data.status==1){
			vm.color = response.data.info;
			}
		});
	};

	function editColor(colorId) {
		$state.go('menuMaster.editColor', {
			idColor : colorId
		});
	};

	function reloadData() {
		Color.findAll(function(response) {
			if (response.data.status==1){
			vm.color = response.data.info;
			}
		});
	};
	
	function deleteColor(colorId) {
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
				Color.borrar(colorId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Color Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		/*
		if (popupService.showPopup('Esta seguro de borrar este registro?')) {
			Color.borrar(colorId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
		}//*/
	};
	
	$rootScope.$on("reloadData", function(){
		vm.reloadData();
	});
		
	function activateColor(colorId) {
		Color.activar(colorId, $rootScope.globals.currentUser.username,
				function(response) {
					reloadData();
				});
	};
};

// TALLER
function TallerAddCtrl($rootScope, $scope, $filter, $http, $state, Taller) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newTaller = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerTaller = function() {
		$scope.clearMessages();

		Taller.insertar($scope.newTaller, function(response) {

			$scope.reset();

			$scope.successMessages = [ 'Taller Registrado correctamente' ];

		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
		});
		////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listTaller');

	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TallerEditCtrl($rootScope, $scope, $filter, $state, $stateParams,
		Taller) {

	$scope.updateTaller = function() {

		var date = new Date();
		var TallerObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newTaller.usuario = TallerObj.usuario;

		Taller.actualizar($scope.newTaller, function(response) {
			$scope.successMessages = [ 'Taller Actualizado correctamente' ];

		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
		});
		////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listTaller');

	};

	$scope.loadTaller = function() {
		Taller.findById($stateParams.idTaller, function(response) {
			if (response.data.status==1){
			$scope.newTaller = response.data.info[0];
			}
		});
	};

	$scope.loadTaller();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TallerTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, Taller, URL_API) {
	var vm = this;

	vm.listTaller = listTaller;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.taller = {};

	Taller.findAll(function(response) {
		if (response.data.status==1){
		vm.taller = response.data.info;
		}
	});


	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteTaller = deleteTaller;
	vm.editTaller = editTaller;
	vm.activateTaller = activateTaller;

	function listTaller() {
		Taller.findAll(function(response) {
			if (response.data.status==1){
			vm.taller = response.data.info;
			}
		});

	}
	;

	function reloadData() {
		Taller.findAll(function(response) {
			if (response.data.status==1){
			vm.taller = response.data.info;
			}
		});

	}
	;
	

	function deleteTaller(tallerId) {

		if (popupService.showPopup('Esta seguro de borrar este registro?')) {
			Taller.borrar(tallerId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});

		}
	}
	;
	

	function activateTaller(tallerId) {

			Taller.activar(tallerId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					
					});

	}
	;

	function editTaller(tallerId) {

		$state.go('menuMaster.editTaller', {
			idTaller : tallerId
		});

	}
	;

};

// ESTILO MOTO
function EstilMotoAddCtrl($rootScope, $scope, $filter, $http, $state, EstilMoto) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newEstilMoto = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerEstilMoto = function() {
		$scope.clearMessages();

		EstilMoto
				.insertar(
						$scope.newEstilMoto,
						function(response) {

							$scope.reset();

							$scope.successMessages = [ 'Estilo de Moto Registrado correctamente' ];

						},
						function(result) {
							if ((result.status == 409)
									|| (result.status == 400)) {
								$scope.errors = result.data;
							} else {
								$scope.errorMessages = [ 'Unknown error de servidor' ];
							}
						});
		////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listEstilMoto');

	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function EstilMotoEditCtrl($rootScope, $scope, $filter, $state, $stateParams,
		EstilMoto) {

	$scope.updateEstilMoto = function() {

		var date = new Date();
		var EstilMotoObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newEstilMoto.usuario = EstilMotoObj.usuario;

		EstilMoto
				.actualizar(
						$scope.newEstilMoto,
						function(response) {
							$scope.successMessages = [ 'Estilo de Moto Actualizado correctamente' ];

						},
						function(result) {
							if ((result.status == 409)
									|| (result.status == 400)) {
								$scope.errors = result.data;
							} else {
								$scope.errorMessages = [ 'Unknown error de servidor' ];
							}
						});
		////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listEstilMoto');

	};

	$scope.loadEstilMoto = function() {
		EstilMoto.findById($stateParams.idEstilMoto, function(response) {
			if (response.data.status==1){
			$scope.newEstilMoto = response.data.info[0];
			}
		});
	};

	$scope.loadEstilMoto();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function EstilMotoTableCtrl($scope, $rootScope, $state, $compile, $window, popupService, DTOptionsBuilder, DTColumnDefBuilder, EstilMoto, URL_API) {
	var vm = this;

	vm.listEstilMoto = listEstilMoto;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.estilMoto = {};

	EstilMoto.findAll(function(response) {
		if (response.data.status==1){
		vm.estilMoto = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteEstilMoto = deleteEstilMoto;
	vm.editEstilMoto = editEstilMoto;
	vm.activateEstilMoto = activateEstilMoto;
	
	function listEstilMoto() {
		EstilMoto.findAll(function(response) {
			if (response.data.status==1){
			vm.estilMoto = response.data.info;
			}
		});

	}
	;


	function reloadData() {
		EstilMoto.findAll(function(response) {
			if (response.data.status==1){
			vm.estilMoto = response.data.info;
			}
		});

	}
	;


	function deleteEstilMoto(estilMotoId) {

		if (popupService.showPopup('Esta seguro de borrar este registro?')) {
			EstilMoto.borrar(estilMotoId,
					$rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});

		}
	}
	;
	

	function activateEstilMoto(estilMotoId) {

		EstilMoto.activar(estilMotoId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					
					});

	}
	;

	function editEstilMoto(estilMotoId) {

		$state.go('menuMaster.editEstilMoto', {
			idEstilMoto : estilMotoId
		});

	}
	;

};

// ACCESORIO MOTO
function AccsMotoAddCtrl($rootScope, $scope, $filter, $http, $state, AccsMoto) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newAccsMoto = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerAccsMoto = function() {
		$scope.clearMessages();

		AccsMoto
				.insertar(
						$scope.newAccsMoto,
						function(response) {

							$scope.reset();

							$scope.successMessages = [ 'Accesorio de Moto Registrado correctamente' ];

						},
						function(result) {
							if ((result.status == 409)
									|| (result.status == 400)) {
								$scope.errors = result.data;
							} else {
								$scope.errorMessages = [ 'Unknown error de servidor' ];
							}
						});
		////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listAccsMoto');

	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function AccsMotoEditCtrl($rootScope, $scope, $filter, $state, $stateParams,
		AccsMoto) {

	$scope.updateAccsMoto = function() {

		var date = new Date();
		var AccsMotoObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newAccsMoto.usuario = AccsMotoObj.usuario;

		AccsMoto.actualizar($scope.newAccsMoto, function(response) {
			$scope.successMessages = [ 'Accesorio Moto Actualizado correctamente' ];

		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
		});
		////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listAccsMoto');

	};

	$scope.loadAccsMoto = function() {
		AccsMoto.findById($stateParams.idAccsMoto, function(response) {
			if (response.data.status==1){
			$scope.newAccsMoto = response.data.info[0];
			}
		});
	};

	$scope.loadAccsMoto();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function AccsMotoTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, AccsMoto, URL_API) {
	var vm = this;

	vm.listAccsMoto = listAccsMoto;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.accsMoto = {};

	AccsMoto.findAll(function(response) {
		if (response.data.status==1){
		vm.accsMoto = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteAccsMoto = deleteAccsMoto;
	vm.editAccsMoto = editAccsMoto;
	vm.activateAccsMoto = activateAccsMoto;

	function listAccsMoto() {
		AccsMoto.findAll(function(response) {
			if (response.data.status==1){
			vm.accsMoto = response.data.info;
			}
		});

	}
	;

	function reloadData() {
		AccsMoto.findAll(function(response) {
			if (response.data.status==1){
			vm.accsMoto = response.data.info;
			}
		});

	}
	;

	function deleteAccsMoto(accsMotoId) {

		if (popupService.showPopup('Esta seguro de borrar este registro?')) {
			AccsMoto.borrar(accsMotoId,
					$rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});

		}
	}
	;
	
	function activateAccsMoto(accsMotoId) {

		AccsMoto.activar(accsMotoId, $rootScope.globals.currentUser.username,
				function(response) {
					reloadData();
				
				});

	}
	;

	function editAccsMoto(accsMotoId) {

		$state.go('menuMaster.editAccsMoto', {
			idAccsMoto : accsMotoId
		});

	}
	;

};

//ALMACEN
function AlmacenAddCtrl($rootScope, $scope, $filter, $http, $state, Almacen, Empresa, Depts, Cuenta, CONTABILIDAD) {

	$scope.formType = 'ADD';
	$scope.isVisibleEdit=false;
	$scope.contabilidad = CONTABILIDAD;

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};
	

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newAlmacen = {
			id : ""
			, descripcion : ""
			, id_empresa : ""
			,usuario : $rootScope.globals.currentUser.username
			//datos del presupuestos
			, id_presupuesto:""
			, periodo:""
			, monto: 0.00
			//contabilidad
			, id_cuenta_efectivo:""
			, id_cuenta_ventas:""
			, id_cuenta_costos:""
			, id_cuenta_inventarios:""
		};

		$scope.clearMessages();
	};

	$scope.registerAlmacen = function() {
		$scope.clearMessages();
		
		Almacen.insertar($scope.newAlmacen, function(response) {
	//		$scope.newAlmacen.id_empresa = $scope.resp.id.id_empresa;
			$scope.reset();

			Swal.fire({
				toast:true,
			  position: 'top-end',
			  type: 'success',
			  title: 'Registro almacenado correctamente',
			  showConfirmButton: false,
			  timer: 1000
			})
			$state.go('menuMaster.listAlmacen');
			
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});

	};

	$scope.reset();
				
	$scope.loadEmpresa = function() {
		Empresa.findAll(function(response) {
			if (response.data.status==1){
			$scope.empresa = response.data.info;
			}
		});
	};

	$scope.loadEmpresa();
	
	$scope.loadDepts = function() {
		Depts.findAll(function(response) {
			if (response.data.status==1){
			$scope.depts = response.data.info;
			}
		});
	};

	$scope.loadDepts();
	
	$scope.loadCuentaEfectivo = function() {
		var elemento = 1;
		var descripcion = "EFECTIVO";
		
		$scope.newAlmacen.id_cuenta_efectivo = "";
		$scope.cuenta_efectivo = [];
		Cuenta.findByIdElemento3(elemento, descripcion, function(response) {
			if (response.status==1){
				$scope.cuenta_efectivo = response.info;
			}
			else $scope.cuenta_efectivo = [];
		});
	};
	$scope.loadCuentaEfectivo();
	
	$scope.loadCuentaInventario = function() {
		var elemento = 1;
		var descripcion = "INVENTARIO";
		
		$scope.newAlmacen.id_cuenta_inventarios = "";
		$scope.cuenta_inventario = [];
		Cuenta.findByIdElemento3(elemento, descripcion, function(response) {
			if (response.status==1){
				$scope.cuenta_inventario = response.info;
			}
			else $scope.cuenta_inventario = [];
		});
	};
	$scope.loadCuentaInventario();
	
	$scope.loadCuentaCostos = function() {
		var elemento = 4;
		var descripcion = "COSTOS";
		
		$scope.newAlmacen.id_cuenta_costos = "";
		$scope.cuenta_costos = [];
		Cuenta.findByIdElemento3(elemento, descripcion, function(response) {
			if (response.status==1){
				$scope.cuenta_costos = response.info;
			}
			else $scope.cuenta_costos = [];
		});
	};
	$scope.loadCuentaCostos();
	
	$scope.loadCuentaCostos = function() {
		var elemento = 5;
		var descripcion = "INGRESOS";
		
		$scope.newAlmacen.id_cuenta_costos = "";
		$scope.id_cuenta_ventas = [];
		Cuenta.findByIdElemento3(elemento, descripcion, function(response) {
			if (response.status==1){
				$scope.cuenta_ventas = response.info;
			}
			else $scope.cuenta_ventas = [];
		});
	};
	$scope.loadCuentaCostos();

};

function AlmacenEditCtrl($rootScope, $scope, $filter, $state, $stateParams, DTOptionsBuilder, DTColumnDefBuilder,	Almacen, Empresa, Depts, PresupuestoAlmacen, CajaAlmacen, HorarioAlmacen, Cuenta, CONTABILIDAD) {
	var vm = this;
	$scope.isVisibleEdit=true;
	$scope.contabilidad = CONTABILIDAD;
	
	$scope.newAlmacen = {
		id : ""
		, descripcion : ""
		, id_empresa : ""
		,usuario : $rootScope.globals.currentUser.username
		//datos del presupuestos
		, id_presupuesto:""
		, periodo:""
		, monto: 0.00
		//contabilidad
		, id_cuenta_efectivo:""
		, id_cuenta_ventas:""
		, id_cuenta_costos:""
		, id_cuenta_inventarios:""
	};
		
	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language).withOption('order', [[0, "asc"]]);
	vm.dtColumnsDefs = [ 
		DTColumnDefBuilder.newColumnDef(0),
		DTColumnDefBuilder.newColumnDef(1),
		DTColumnDefBuilder.newColumnDef(2),
		DTColumnDefBuilder.newColumnDef(3),
		DTColumnDefBuilder.newColumnDef(4).notSortable() 
	];
	
	$scope.updateAlmacen = function() {

		var date = new Date();
		var AlmacenObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newAlmacen.usuario = AlmacenObj.usuario;

		Almacen.actualizar($scope.newAlmacen, function(response) {
			$scope.successMessages = [ 'Almacen Actualizado correctamente' ];
			Swal.fire({
				toast:true,
				position: 'top-end',
				type: 'success',
				title: 'Registro actualizado correctamente',
				showConfirmButton: false,
				timer: 1000
			})
			$state.go('menuMaster.listAlmacen');
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});

	};

	$scope.loadAlmacen = function() {
		Almacen.findById($stateParams.idEmpresa, $stateParams.idAlmacen, function(response) {
			if (response.data.status==1){
					$scope.newAlmacen = response.data.info[0];
					
					$scope.newAlmacen.id_empresa = response.data.info[0].id.id_empresa;
					$scope.newAlmacen.id_depto = response.data.info[0].id.id_depto;
					$scope.newAlmacen.id = response.data.info[0].id.id;
					if($scope.newAlmacen.estado=='A'){
						$scope.newAlmacen.estado = true;
					}
					
					if($scope.newAlmacen.transferible=='Y'){
						$scope.newAlmacen.transferible = true;
					}
					
					$scope.loadPresupuestos();
					$scope.loadCajas();
					$scope.loadHorarios();
			}
		});
	};

	$scope.loadAlmacen();

	$scope.loadEmpresa = function() {
		Empresa.findAll(function(response) {
			if (response.data.status==1){
			$scope.empresa = response.data.info;
			}
			
		});
	};

	$scope.loadEmpresa();
	
	$scope.loadDepts = function() {
		Depts.findAll(function(response) {
			if (response.data.status==1){
			$scope.depts = response.data.info;
			}
		});
	};

	$scope.loadDepts();
	
	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};
	
	$scope.formTypePresupuesto="ADD";
	
	$scope.resetPresupuesto = function() { 

		$scope.formTypePresupuesto = "ADD";
		var date = new Date();
		
		$scope.newAlmacen.id_presupuesto="";
		$scope.newAlmacen.periodo="";
		$scope.newAlmacen.monto="";
		
		$scope.clearMessages();
	};
	
	$scope.guardarPresupuesto = function() {
		
		$scope.clearMessages();

		if ($scope.formTypePresupuesto == "ADD"){
			//console.log($scope.newAlmacen);
			$scope.newAlmacen.usuario = $rootScope.globals.currentUser.username;
			PresupuestoAlmacen.insertar($scope.newAlmacen, function(data) {
				$scope.formTypePresupuesto = "UPD";
				$scope.loadPresupuestos();
				$scope.successMessagesChild = [ 'Presupuesto Registrado correctamente' ];
				
		   }, function(result) {
				if ((result.status == 409) || (result.status == 400)) {
					$scope.errorsChild = result.data;
				} else {
					$scope.errorMessagesChild = [ 'Unknown error de servidor' ];
				}
			});
			
		}
		else{

		}
		$('#myPresupuestoModal').modal('hide');
		//*/
	};
	
	$scope.loadPresupuestos = function() {
		PresupuestoAlmacen.findAll($stateParams.idEmpresa, $stateParams.idAlmacen, function(response){
			if(response.data.status==1) $scope.presupuestos =response.data.info;
			else $scope.presupuestos =[];
		});
	};
	
	$scope.deletePresupuesto = function(presupuesto){
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
				PresupuestoAlmacen.borrar(presupuesto, function(response){
					$scope.loadPresupuestos();
				});
					
				Swal.fire({
					toast:true,
					position: 'top-end',
					type: 'success',
					title: 'Presupuesto Eliminado',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
		
	}
	
	$scope.resetCaja = function() { 

		$scope.formTypeCaja = "ADD";
		var date = new Date();
		
		$scope.newAlmacen.id_caja="";
		$scope.newAlmacen.correlativo_inicial_ticket="";
		$scope.newAlmacen.correlativo_final_ticket="";
		$scope.newAlmacen.correlativo_inicial_factura_ccf="";
		$scope.newAlmacen.correlativo_final_factura_ccf="";
		$scope.newAlmacen.correlativo_inicial_factura_cf="";
		$scope.newAlmacen.correlativo_final_factura_cf="";
		$scope.newAlmacen.correlativo_inicial_factura_nc="";
		$scope.newAlmacen.correlativo_final_factura_nc="";
		$scope.newAlmacen.descripcion_caja="";
		
		$scope.clearMessages();
	};
	
	$scope.guardarCaja = function() {
		$scope.clearMessages();

		if ($scope.formTypeCaja == "ADD"){
			//console.log($scope.newAlmacen);
			$scope.newAlmacen.usuario = $rootScope.globals.currentUser.username;
			CajaAlmacen.insertar($scope.newAlmacen, function(data) {
				$scope.formTypeCaja = "UPD";
				$scope.loadCajas();
				$scope.successMessagesChild = [ 'Caja Registrada correctamente' ];
				
		   }, function(result) {
				if ((result.status == 409) || (result.status == 400)) {
					$scope.errorsChild = result.data;
				} else {
					$scope.errorMessagesChild = [ 'Unknown error de servidor' ];
				}
			});
			
		}
		else{

			
		}
		$('#myCajaModal').modal('hide');
		//*/
	};
	
	$scope.loadCajas = function() {
		CajaAlmacen.findAll($stateParams.idEmpresa, $stateParams.idAlmacen, function(response){
			if(response.data.status==1) $scope.cajas =response.data.info;
			else $scope.cajas =[];
		});
	};
	
	$scope.deleteCaja = function(caja){
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
				//console.log(caja);
				CajaAlmacen.borrar(caja, function(response){
					$scope.loadCajas();
				});
					
				Swal.fire({
					toast:true,
					position: 'top-end',
					type: 'success',
					title: 'Caja Eliminada',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
		
	}
	
	$scope.guardarHorario = function() {
		$scope.clearMessages();

		$scope.newAlmacen.usuario = $rootScope.globals.currentUser.username;
		HorarioAlmacen.insertar($scope.newAlmacen, function(response) {
			if(response.data.status==1){
				$scope.formTypeCaja = "UPD";
				$scope.loadHorarios();
				
				$('#myHorarioModal').modal('hide');
				Swal.fire({
					toast:true,
					position: 'top-end',
					type: 'success',
					title: response.data.info,
					showConfirmButton: false,
					timer: 1000
				})
			}
			else{
				Swal.fire({
					toast:true,
					position: 'top-end',
					type: 'error',
					title: response.data.info,
					showConfirmButton: false,
					timer: 1000
				})
			}
			
	   }, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errorsChild = result.data;
			} else {
				$scope.errorMessagesChild = [ 'Unknown error de servidor' ];
			}
			$('#myHorarioModal').modal('show');
		});
			
		
	};
	
	$scope.loadHorarios = function() {
		HorarioAlmacen.findAll($stateParams.idEmpresa, $stateParams.idAlmacen, function(response){
			if(response.data.status==1) $scope.horarios =response.data.info;
			else $scope.horarios =[];
		});
	};
	
	$scope.deleteHorario = function(horario){
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
				//console.log(caja);
				HorarioAlmacen.borrar(horario, function(response){
					$scope.loadHorarios();
				});
					
				Swal.fire({
					toast:true,
					position: 'top-end',
					type: 'success',
					title: 'Horario Eliminado',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
		
	}

	//CONTABILIDAD
	$scope.loadCuentaEfectivo = function() {
		var elemento = 1;
		var descripcion = "EFECTIVO";
		
		$scope.newAlmacen.id_cuenta_efectivo = "";
		$scope.cuenta_efectivo = [];
		Cuenta.findByIdElemento3(elemento, descripcion, function(response) {
			if (response.status==1){
				$scope.cuenta_efectivo = response.info;
			}
			else $scope.cuenta_efectivo = [];
		});
	};
	$scope.loadCuentaEfectivo();
	
	$scope.loadCuentaInventario = function() {
		var elemento = 1;
		var descripcion = "INVENTARIO";
		
		$scope.newAlmacen.id_cuenta_inventarios = "";
		$scope.cuenta_inventario = [];
		Cuenta.findByIdElemento3(elemento, descripcion, function(response) {
			if (response.status==1){
				$scope.cuenta_inventario = response.info;
			}
			else $scope.cuenta_inventario = [];
		});
	};
	$scope.loadCuentaInventario();
	
	$scope.loadCuentaCostos = function() {
		var elemento = 4;
		var descripcion = "COSTOS";
		
		$scope.newAlmacen.id_cuenta_costos = "";
		$scope.cuenta_costos = [];
		Cuenta.findByIdElemento3(elemento, descripcion, function(response) {
			if (response.status==1){
				$scope.cuenta_costos = response.info;
			}
			else $scope.cuenta_costos = [];
		});
	};
	$scope.loadCuentaCostos();
	
	$scope.loadCuentaCostos = function() {
		var elemento = 5;
		var descripcion = "INGRESOS";
		
		$scope.newAlmacen.id_cuenta_costos = "";
		$scope.id_cuenta_ventas = [];
		Cuenta.findByIdElemento3(elemento, descripcion, function(response) {
			if (response.status==1){
				$scope.cuenta_ventas = response.info;
			}
			else $scope.cuenta_ventas = [];
		});
	};
	$scope.loadCuentaCostos();
};

function AlmacenTableCtrl($scope, $rootScope, $state, $compile, $window, popupService, DTOptionsBuilder, DTColumnDefBuilder, Almacen, URL_API) {
	var vm = this;

	vm.listAlmacen = listAlmacen;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.almacen = {};

	Almacen.findAllByEmpresaId($rootScope.globals.currentUser.id_empresa, function(response) {
		if (response.data.status==1){
		vm.almacen = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3),
			DTColumnDefBuilder.newColumnDef(4),
			DTColumnDefBuilder.newColumnDef(5),
			DTColumnDefBuilder.newColumnDef(6),
			DTColumnDefBuilder.newColumnDef(7),
			DTColumnDefBuilder.newColumnDef(8),
			DTColumnDefBuilder.newColumnDef(9),
			DTColumnDefBuilder.newColumnDef(10).notSortable() ];

	vm.deleteAlmacen = deleteAlmacen;
	vm.editAlmacen = editAlmacen;
	vm.activateAlmacen = activateAlmacen;

	function listAlmacen() {
		Almacen.findAll(function(response) {
			if (response.data.status==1){
				vm.almacen = response.data.info;
			}
		});

	}
	;

	function reloadData() {
		Almacen.findAll(function(response) {
			if (response.data.status==1){
			vm.almacen = response.data.info;
			}
		});

	}
	;

	function deleteAlmacen(empresaId, almacenId) {
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
				Almacen.borrar(empresaId, almacenId,
					$rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Almacen Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		/*
		if (popupService.showPopup('Esta seguro de borrar este registro?')) {
			Almacen.borrar(empresaId, almacenId,
					$rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});

		}//*/
	}
	;
	
	function activateAlmacen(empresaId, almacenId) {

		Almacen.activar(empresaId, almacenId, $rootScope.globals.currentUser.username,
				function(response) {
					reloadData();
				
				});

}
;

	function editAlmacen(empresaId, almacenId) {

		$state.go('menuMaster.editAlmacen', {		
			idEmpresa : empresaId,
			idAlmacen : almacenId
		});

	}
	;

};


// CATEGORIA
function CategoriaAddCtrl($rootScope, $scope, $filter, $http, $state, Categoria) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newCategoria = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerCategoria = function() {
		$scope.clearMessages();

		Categoria.insertar($scope.newCategoria, function(response) {

			$scope.reset();

			$scope.successMessages = [ 'Categoria Registrada correctamente' ];
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro ingresado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listCategoria');
			
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});

	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function CategoriaEditCtrl($rootScope, $scope, $filter, $state, $stateParams,
		Categoria) {

	$scope.updateCategoria = function() {

		var date = new Date();
		var CategoriaObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newCategoria.usuario = CategoriaObj.usuario;

		Categoria.actualizar($scope.newCategoria, function(response) {
			$scope.successMessages = [ 'Categoria Actualizada correctamente' ];
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro actualizado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listCategoria');
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		

	};

	$scope.loadCategoria = function() {
		Categoria.findById($stateParams.idCategoria, function(response) {
			if (response.data.status==1){
				$scope.newCategoria = response.data.info[0];
				if($scope.newCategoria.estado=='A'){
					$scope.newCategoria.estado = true;
				}
			}
		});
	};

	$scope.loadCategoria();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function CategoriaTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, Categoria, URL_API) {
	var vm = this;

	vm.listCategoria = listCategoria;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.categoria = {};

	Categoria.findAll(function(response) {
		if (response.data.status==1){
		vm.categoria = response.data.info;
		}
	});


	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteCategoria = deleteCategoria;
	vm.editCategoria = editCategoria;
	vm.activateCategoria = activateCategoria;

	function listCategoria() {
		Categoria.findAll(function(response) {
			if (response.data.status==1){
			vm.categoria = response.data.info;
			}
		});

	}
	;


	function reloadData() {
		Categoria.findAll(function(response) {
			if (response.data.status==1){
			vm.categoria = response.data.info;
			}
		});

	}
	;


	function deleteCategoria(categoriaId) {
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
				Categoria.borrar(categoriaId,
					$rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Categoria Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
	}
	;

	function activateCategoria(categoriaId) {
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
				Categoria.activar(categoriaId,
					$rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Categoria Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
}
;

	function editCategoria(categoriaId) {

		$state.go('menuMaster.editCategoria', {
			idCategoria : categoriaId
		});

	}
	;

};

// CIUDAD
function CiudadAddCtrl(URL_API, $rootScope, $scope, $filter, $state, Depts, Munis, Ciudad) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newCiudad = {
			id : "", descripcion : "", id_depto : "", id_municipio : "", usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerCiudad = function() {
		$scope.clearMessages();

		Ciudad.insertar($scope.newCiudad, function(response) {
			//$scope.newCiudad.id_depto = $scope.resp.id_depto;
			//$scope.newCiudad.id_municipio = $scope.resp.id.id_municipio;
			$scope.reset();

			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro ingresado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listCiudad');
			
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		
	};

	$scope.reset();

	$scope.loadDepts = function() {
		Depts.findAll(function(response) {
			if (response.data.status==1){
			$scope.depts = response.data.info;
			}
		});
	};

	$scope.loadDepts();

	$scope.loadMunis = function() {
		Munis.findAll(function(response) {
			if (response.data.status==1){
			$scope.munis = response.data.info;
			}
		});
	};

	//$scope.loadMunis();

	$scope.updateMunis = function(){
	  	var depto = 0;
		$scope.munis = null;	  	
	  	$scope.newCiudad.id_municipio = "";	  	
	  	if ($scope.newCiudad.id_municipio==null) $scope.newCiudad.id_municipio = "";
	  	if ($scope.newCiudad.id_depto==null) $scope.newCiudad.id_depto = "";
	  	if ($scope.newCiudad.id_depto == null){
	  		depto = 0;
	  	}else{
	  		depto = $scope.newCiudad.id_depto;
	  	}
	  	
		Munis.findByIdDepto(depto, function(response){
			if (response.data.status==1){
				$scope.munis = response.data.info;
				delete $scope.munis.id;
			}
		});
    	
    };
};

function CiudadEditCtrl(URL_API, $rootScope, $scope, $filter, $state, $stateParams, Depts, Munis, Ciudad) {

	$scope.updateCiudad = function() {

		var date = new Date();
		var CiudadObj = {
			usuario : $rootScope.globals.currentUser.username
		};	
		
		$scope.newCiudad.usuario = CiudadObj.usuario;

		Ciudad.actualizar($scope.newCiudad, function(response) {
			$scope.successMessages = [ 'Ciudad Actualizada correctamente' ];
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro actualizado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listCiudad');
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});

	};
		
	$scope.loadCiudad = function() {
		Ciudad.findById($stateParams.idCiudad, function(response) {
			if (response.data.status==1){
				$scope.newCiudad = response.data.info[0];			
				$scope.newCiudad.id_depto = response.data.info[0].id.id_depto;
				$scope.newCiudad.id_municipio = response.data.info[0].id.id_municipio;
				$scope.newCiudad.id = response.data.info[0].id.id;
				if($scope.newCiudad.estado=='A'){
					$scope.newCiudad.estado = true;
				}
			}
		});
	};

	$scope.loadCiudad();

	$scope.loadDepts = function() {
		Depts.findAll(function(response) {
			if (response.data.status==1){
			$scope.depts = response.data.info;
			}
		});
	};

	$scope.loadDepts();

	$scope.loadMunis = function() {
		Munis.findAll(function(response) {
			if (response.data.status==1){
			$scope.munis = response.data.info;
			}
		});
	};

	$scope.loadMunis();
	
	$scope.updateMunis = function(){
	  	var depto = 0;
		$scope.munis = null;	  	
	  	$scope.newCiudad.id_municipio = "";	  	
	  	if ($scope.newCiudad.id_municipio==null) $scope.newCiudad.id_municipio = "";
	  	if ($scope.newCiudad.id_depto==null) $scope.newCiudad.id_depto = "";
	  	if ($scope.newCiudad.id_depto == null){
	  		depto = 0;
	  	}else{
	  		depto = $scope.newCiudad.id_depto;
	  	}
	  	
		Munis.findByIdDepto(depto, function(response){
			if (response.data.status==1){
				$scope.munis = response.data.info;
				delete $scope.munis.id;
			}
		});
    	
    };

};

function CiudadTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, Depts, Munis, Ciudad, URL_API) {
	var vm = this;

	vm.listCiudad = listCiudad;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.ciudad = {};

	Ciudad.findAll(function(response) {
		if (response.data.status==1){
		vm.ciudad = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteCiudad = deleteCiudad;
	vm.editCiudad = editCiudad;
	vm.activateCiudad = activateCiudad;

	function listCiudad() {
		Ciudad.findAll(function(response) {
			if (response.data.status==1){
			vm.ciudad = response.data.info;
			}
		});

	}
	;

	function reloadData() {
		Ciudad.findAll(function(response) {
			if (response.data.status==1){
			vm.ciudad = response.data.info;
			}
		});

	}
	;

	function deleteCiudad(ciudadId) {
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
				Ciudad.borrar(ciudadId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Ciudad Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		/*
		if (popupService.showPopup('Esta seguro de borrar este registro?')) {
			Ciudad.borrar(ciudadId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});

		}//*/
	}
	;

	
	function activateCiudad(ciudadId) {

		Ciudad.activar(ciudadId, $rootScope.globals.currentUser.username,
				function(response) {
					reloadData();
				
				});
		
	};
		
	function editCiudad(ciudadId) {

		$state.go('menuMaster.editCiudad', {			
			idCiudad : ciudadId  
		});

	}
	;
	
	
};

// CLIENTE
function ClienteAddCtrl($rootScope, $scope, $filter, $http, $state, Cliente, Depts, Munis, Ciudad, Giro, TipoDoc, TipoPer, TipoRet, TipoContr, Cuenta, CONTABILIDAD) {
	$scope.isVisibleAfter = false;
	$scope.formType = 'ADD';
	$scope.contabilidad = CONTABILIDAD;
	

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		
		
		var date = new Date();
		$scope.newCliente = {
			id : ""
			, nombre : ""
			, direccion : ""
			, id_tipo_contribuyente : ""
			, id_tipo_persona : ""
			, id_tipo_retencion : ""
			, id_depto : ""
			, id_municipio : ""
			, id_ciudad : ""
			, id_tipo_doc : ""
			, numero_doc : ""
			, registro_fiscal:""
			, nit:""
			, giro:""
			, telefono1:""
			, telefono2:""
			, fax:""
			, limite_credito:""
			, descuento:""
			, email:""
			, comentarios:""
			, percepcion:""
			, exento:""
			, dias_credito:""
			, id_cuenta:""
			, estado:""
			, usuario : $rootScope.globals.currentUser.username
			//DATOS DE CUENTA POR SUCURSAL
			, id_almacen : ""
			, id_cuenta_sucursal : ""
			, id_cuenta_costo_sucursal : ""
		};
		

		$scope.clearMessages();
	};

	$scope.registerCliente = function() {
		$scope.clearMessages();

		Cliente.insertar($scope.newCliente, function(response) {
			
			$scope.reset();

			$scope.successMessages = [ 'Cliente Registrado correctamente' ];
			
			var id_cliente = 0;
			if (response.data.status==1) {
        		id_cliente = response.data.info[0].id_cliente;
        	}
			$scope.isVisibleAfter = true;
			$scope.formType = 'UPD';
			
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro actualizado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.editCliente', {
				idCliente : id_cliente
			});
			//$state.go('menuMaster.listCliente');
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
	};

	$scope.registerClienteFact = function() {
		$scope.clearMessages();
		Cliente.insertar($scope.newCliente, function(response) {
			$scope.reset();
			$scope.successMessages = [ 'Cliente Registrado correctamente' ];
			var id_cliente = 0;
			if (response.data.status==1) {
        		id_cliente = response.data.info[0].id_cliente;
        	}
			$scope.$emit('clienteCreado', id_cliente);
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
		});
		$('#myModalNewCliente').modal('hide');
	};

	$scope.reset();

	$scope.loadDepts = function() {
		Depts.findAll(function(response) {
			if (response.data.status==1){
			$scope.depts = response.data.info;
			}
		});
	};

	$scope.loadDepts();
	
	$scope.loadMunis = function() {
		Munis.findAll(function(response) {
			if (response.data.status==1){
			$scope.munis = response.data.info;
			}
		});
	};

	//$scope.loadMunis();
	
	$scope.loadCiudad = function() {
		Ciudad.findAll(function(response) {
			if (response.data.status==1){
			$scope.ciudad = response.data.info;
			}
		});
	};

	$scope.loadCiudad();
	
	$scope.loadTipoDoc = function() {
		TipoDoc.findAll(function(response) {
			if (response.data.status==1){
			$scope.tipoDoc = response.data.info;
			}
		});
	};

	$scope.loadTipoDoc();
	
	$scope.loadTipoPer = function() {
		TipoPer.findAll(function(response) {
			if (response.data.status==1){
			$scope.tipoPer = response.data.info;
			}
		});
	};

	$scope.loadTipoPer();
	
	$scope.loadTipoContr = function() {
		TipoContr.findAll(function(response) {
			if (response.data.status==1){
			$scope.tipoContr = response.data.info;
			}
		});
	};

	$scope.loadTipoContr();
	
	$scope.loadTipoRet = function() {
		TipoRet.findAll(function(response) {
			if (response.data.status==1){
			$scope.tipoRet = response.data.info;
			}
		});
	};

	$scope.loadTipoRet();	

	$scope.loadGiro = function() {
		Giro.findAll(function(response) {
			if (response.data.status==1){
			$scope.giro = response.data.info;
			}
		});
	};

	$scope.loadGiro();

	$scope.updateMunis = function(){
	  	var depto = 0;
	  	$scope.munis = null;
	  	$scope.ciudad = null;
	  	
	  	$scope.newCliente.id_municipio = "";
		$scope.newCliente.id_ciudad = "";
	  	if ($scope.newCliente.id_ciudad==null) $scope.newCliente.id_ciudad = "";
		if ($scope.newCliente.id_municipio==null) $scope.newCliente.id_municipio = "";
	  	if ($scope.newCliente.id_depto == null){
	  		depto = 0;
	  	}else{
	  		depto = $scope.newCliente.id_depto;
	  	}
	  	
		Munis.findByIdDepto(depto, function(response) {
			if (response.data.status==1){
				$scope.munis = response.data.info;
				delete $scope.munis.id_municipio;
			}
			else{ 
				$scope.munis = [];
			}
		});
		
    	
    };
	
	$scope.updateCiudad = function(){
	  	var munis = 0;
	  	$scope.ciudad = null;
	  	
	  	$scope.newCliente.id_ciudad = "";
	  	
	  	if ($scope.newCliente.id_ciudad==null) $scope.newCliente.id_ciudad = "";
	  	if ($scope.newCliente.id_municipio==null) $scope.newCliente.id_municipio = "";
	  	
	  	
	  	if ($scope.newCliente.id_municipio == null){
	  		munis = 0;
	  	}else{
	  		munis = $scope.newCliente.id_municipio;
	  	}
	  	
    	$http.get(URL_API + '/servicios/ctg/ctg_ciudad.php?accion=C&idMuni=' + munis).
        then(function(response) {
			if (response.data.status==1){
        	$scope.ciudad = response.data.info;
			delete $scope.ciudad.id;
			}
        });
    	
    };

	$scope.loadCuenta = function() {
		var elemento = 1;
		
		//console.log($scope.newProd);
		/*
		if($scope.newProd.servicio==0){
			elemento = 1;
		}
		else{
			elemento = 4;
		}//*/
		
		$scope.newCliente.id_cuenta = "";
		$scope.cuenta = [];
		Cuenta.findByIdElemento(elemento, function(response) {
			if (response.status==1){
				$scope.cuenta = response.info;
			}
			else $scope.cuenta = [];
		});
	};
	$scope.loadCuenta();
};

function ClienteEditCtrl($rootScope, $scope, $filter, $state, $stateParams,	Cliente, Depts, Munis, Ciudad, Giro, TipoDoc, TipoPer, TipoRet, TipoContr, Cuenta, CONTABILIDAD) {
	$scope.isVisibleAfter = true;
	$scope.contabilidad = CONTABILIDAD;
	
	$scope.newCliente = {
		id : ""
		, nombre : ""
		, direccion : ""
		, id_tipo_contribuyente : ""
		, id_tipo_persona : ""
		, id_tipo_retencion : ""
		, id_depto : ""
		, id_municipio : ""
		, id_ciudad : ""
		, id_tipo_doc : ""
		, numero_doc : ""
		, registro_fiscal:""
		, nit:""
		, giro:""
		, telefono1:""
		, telefono2:""
		, fax:""
		, limite_credito:""
		, descuento:""
		, email:""
		, comentarios:""
		, percepcion:""
		, exento:""
		, dias_credito:""
		, id_cuenta:""
		, estado:""
		, usuario : $rootScope.globals.currentUser.username
		//DATOS DE CUENTA POR SUCURSAL
		, id_almacen : ""
		, id_cuenta_sucursal : ""
		, id_cuenta_costo_sucursal : ""
	};
		
	$scope.updateCliente = function() {

		var date = new Date();
		var ClienteObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newCliente.usuario = ClienteObj.usuario;

		Cliente.actualizar($scope.newCliente, function(response) {
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro actualizado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listCliente');
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});

	};

	$scope.loadCliente = function() {
		Cliente.findById($stateParams.idCliente, function(response) {
			if (response.data.status==1){
				$scope.newCliente = response.data.info[0];			
				$scope.newCliente.id_depto = response.data.info[0].id.id_depto;
				
				$scope.updateMunis();
				$scope.newCliente.id_municipio = response.data.info[0].id.id_municipio;
				$scope.newCliente.id_ciudad = response.data.info[0].id.id_ciudad;			
				if(response.data.info[0].ctg_giro!=null) $scope.newCliente.giro = response.data.info[0].ctg_giro.id;
				$scope.newCliente.id_tipo_retencion = response.data.info[0].idTipo.id_tipo_retencion;
				$scope.newCliente.id_tipo_persona = response.data.info[0].idTipo.id_tipo_persona;
				$scope.newCliente.id_tipo_doc = response.data.info[0].idTipo.id_tipo_documento;
				$scope.newCliente.id_tipo_contribuyente = response.data.info[0].idTipo.id_tipo_contribuyente;			
				$scope.newCliente.id = response.data.info[0].id.id;
				if($scope.newCliente.estado=='A'){
					$scope.newCliente.estado = true;
				}
			}
			
		});
	};

	$scope.loadCliente();

	$scope.loadDepts = function() {
		Depts.findAll(function(response) {
			if (response.data.status==1){
			$scope.depts = response.data.info;
			}
		});
	};

	$scope.loadDepts();
	
	$scope.loadMunis = function() {
		Munis.findAll(function(response) {
			if (response.data.status==1){
			$scope.munis = response.data.info;
			}
		});
	};

	$scope.loadMunis();
	
	$scope.loadCiudad = function() {
		Ciudad.findAll(function(response) {
			if (response.data.status==1){
			$scope.ciudad = response.data.info;
			}
		});
	};

	$scope.loadCiudad();
	
	$scope.loadTipoDoc = function() {
		TipoDoc.findAll(function(response) {
			if (response.data.status==1){
			$scope.tipoDoc = response.data.info;
			}
		});
	};

	$scope.loadTipoDoc();
	
	$scope.loadTipoPer = function() {
		TipoPer.findAll(function(response) {
			if (response.data.status==1){
			$scope.tipoPer = response.data.info;
			}
		});
	};

	$scope.loadTipoPer();
	
	$scope.loadTipoContr = function() {
		TipoContr.findAll(function(response) {
			if (response.data.status==1){
			$scope.tipoContr = response.data.info;
			}
		});
	};

	$scope.loadTipoContr();
	
	$scope.loadTipoRet = function() {
		TipoRet.findAll(function(response) {
			if (response.data.status==1){
			$scope.tipoRet = response.data.info;
			}
		});
	};

	$scope.loadTipoRet();
	
	$scope.loadGiro = function() {
		Giro.findAll(function(response) {
			if (response.data.status==1){
			$scope.giro = response.data.info;
			}
		});
	};

	$scope.loadGiro();
	
	$scope.updateMunis = function(){
	  	var depto = 0;
	  	
	  	$scope.munis = null;
	  	$scope.ciudad = null;
	  	
	  	$scope.newCliente.id_municipio = "";
		$scope.newCliente.id_ciudad = "";
	  	if ($scope.newCliente.id_ciudad==null) $scope.newCliente.id_ciudad = "";
		if ($scope.newCliente.id_municipio==null) $scope.newCliente.id_municipio = "";
	  	
	  	if ($scope.newCliente.id_depto == null){
	  		depto = 0;
	  	}else{
	  		depto = $scope.newCliente.id_depto;
	  	}
	  	
		
		Munis.findByIdDepto(depto, function(response) {
			if (response.data.status==1){
				$scope.munis = response.data.info;
				delete $scope.munis.id;
			}
		});
		
    	
    };
    
	$scope.updateCiudad = function(){
	  	var munis = 0;
	  	
  	$scope.ciudad = null;
	  	
	  	$scope.newCliente.id_ciudad = "";
	  	
	  	if ($scope.newCliente.id_ciudad==null) $scope.newCliente.id_ciudad = "";
	  	if ($scope.newCliente.id_municipio==null) $scope.newCliente.id_municipio = "";
	  	
	  	if ($scope.newCiudad.id_municipio == null){
	  		munis = 0;
	  	}else{
	  		munis = $scope.newCiudad.id_municipio;
	  	}
	  	
    	$http.get(URL_API + '/servicios/ctg/ctg_ciudad.php?accion=C&idMuni=' + munis).
        then(function(response) {
			if (response.data.status==1){
        	$scope.ciudad = response.data.info;
			delete $scope.ciudad.id;
			}
        });
    	
    };

	$scope.loadCuenta = function() {
		var elemento = 1;
		
		//console.log($scope.newProd);
		/*
		if($scope.newProd.servicio==0){
			elemento = 1;
		}
		else{
			elemento = 4;
		}//*/
		
		$scope.newCliente.id_cuenta = "";
		$scope.cuenta = [];
		Cuenta.findByIdElemento(elemento, function(response) {
			if (response.status==1){
				$scope.cuenta = response.info;
			}
			else $scope.cuenta = [];
		});
	};
	$scope.loadCuenta();
};

function ClienteTabsCtrl($rootScope, $scope, $filter, $state, $stateParams, $location, Cliente){
    
   
	$('.tabgroup > div').hide();
    $('.tabgroup > div:first-of-type').show();
    $('.tabs a').click(function(e){
      e.preventDefault();
        var $this = $(this),
            tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();
      
    });

    
	$scope.detalleCliente = {};
	$scope.clienteId='';
	
	$scope.loadDetalleCliente = function() {
    
    	$scope.ClienteId=$stateParams.idCliente;
    	
    	$scope.fecha_desde="";
    	$scope.fecha_hasta="";
    
    	
		Cliente.findById($stateParams.idCliente, function(response){
			if (response.data.status==1){
			$scope.cliente = response.data.info[0];
			$rootScope.descripcion_cliente = $scope.cliente.descripcion;			
			}
		});
	};
	$scope.loadDetalleCliente();
};

function ClienteTableCtrl($scope, $rootScope, $state, $compile, $window, $location, $stateParams, 
		popupService, DTOptionsBuilder, DTColumnDefBuilder, Cliente, Depts, Ciudad, Munis, URL_API, TipoDoc) {
	
	
	var vm = this;
	
	$scope.cliente = {};
	$scope.total_rows = 0;
	$scope.total_rows_clientes = 0;
	$scope.msg_total_rows = "";
	$scope.msg_total_rows_clientes = "";
	$scope.newBusquedaCliente = {nombre:"", nit: "", registro_fiscal:"", id_tipo_doc:"", numero_doc:"", cantidad_maxima_a_mostrar:99999, registro_fiscal_not_null:"N", estado:""};
	
	$scope.reset = function() {
		// Sets the form to it's pristine state
		if($scope.regForm) {
			$scope.regForm.$setPristine();
		}
		$scope.isVisibleAfterCliente = false;
			$scope.formType = "CLIENTES";
			$scope.newBusquedaCliente = {nombre:"", nit: "", registro_fiscal:"", id_tipo_doc:"", numero_doc: "", cantidad_maxima_a_mostrar:99999};
			$scope.findAll();
	};
	
	$scope.resetClientes = function() {
			$scope.newBusquedaCliente = {nombre:"", nit: "", registro_fiscal:"", id_tipo_doc:"", numero_doc:"", cantidad_maxima_a_mostrar:99999, registro_fiscal_not_null:"N"};
			$scope.busquedaFiltroClientes();
	};
	
	

	$scope.findAll = function(){
		$scope.msg_total_rows = "";
		Cliente.findAll($scope.newBusquedaCliente, function(response){
			if (response.data.status==1){
				$scope.cliente = response.data.info;
			$scope.total_rows_clientes = response.data.info[0].total_rows_clientes;
			/*if (response.data.info.length>$scope.newBusquedaCliente.cantidad_maxima_a_mostrar-1)
					$scope.msg_total_rows_clientes = "Se muestran "+$scope.newBusquedaCliente.cantidad_maxima_a_mostrar+" resultados de "+$scope.total_rows_clientes+". Favor especifique mas criterios de busqueda";*/
			}
			else{
				$scope.cliente = {}
			}
		});
	};
	$scope.findAll();
	
	
	
	TipoDoc.findAll(function(response){
		if (response.data.status==1){
		$scope.TipoDocs = response.data.info;
		}
	});
	
	$scope.TipoDocs = {};
	$scope.listTipoDoc = function() {
		TipoDoc.findAll(function(response){
			if (response.data.status==1){
			$scope.TipoDocs = response.data.info;
			}
		});
	};
	$scope.listTipoDoc();
	

	$scope.busquedaFiltroClientes = function(){
		
		//$scope.cliente = {};
		//$scope.cliente = null;
		document.getElementById("busquedaClientes").disabled = true;
		document.getElementById("resetClientes").disabled = true;
		document.getElementById("loadingClientes").style.display = "";
		$scope.newBusquedaCliente.cantidad_maxima_a_mostrar = 99999;
		$scope.msg_total_rows_clientes = "";
		
		if ($stateParams.id_tipo_factura == 1)
			$scope.newBusquedaCliente.registro_fiscal_not_null = "S";
		
		//console.log($scope.newBusquedaCliente);
		Cliente.busquedaFiltro($scope.newBusquedaCliente, function(response) {
			//reInitializeTable();
			if(response.data.status==1) $scope.cliente = response.data.info;				
			else $scope.cliente = {};
			$scope.total_rows_clientes = response.data.info[0].total_rows;
			/*if (response.data.info.length>$scope.newBusquedaCliente.cantidad_maxima_a_mostrar-1)
				$scope.msg_total_rows_clientes = "Se muestran "+$scope.newBusquedaCliente.cantidad_maxima_a_mostrar+" resultados de "+$scope.total_rows_clientes+". Favor especifique mas criterios de busqueda";*/
			document.getElementById("busquedaClientes").disabled = false;
			document.getElementById("resetClientes").disabled = false;
			document.getElementById("loadingClientes").style.display = "none";
		});
	};

	$scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withLanguage($rootScope.globals.language)
					   .withBootstrap().withOption('processing', true).withOption('deferRender', true);
	
	$scope.dtColumnDefs = [
		DTColumnDefBuilder.newColumnDef(0),
		DTColumnDefBuilder.newColumnDef(1),
		DTColumnDefBuilder.newColumnDef(2),
		DTColumnDefBuilder.newColumnDef(3),
		DTColumnDefBuilder.newColumnDef(4),
		DTColumnDefBuilder.newColumnDef(5),
		DTColumnDefBuilder.newColumnDef(6),
		DTColumnDefBuilder.newColumnDef(7),
		DTColumnDefBuilder.newColumnDef(8)		
		
	];
	
	function reInitializeTable(){
		$scope.dtOptions = null;
		$scope.dtColumnDefs = null;
		
		$scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withLanguage($rootScope.globals.language)
					   .withBootstrap().withOption('processing', true).withOption('deferRender', true);
	
		$scope.dtColumnDefs = [
			DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3),
			DTColumnDefBuilder.newColumnDef(4),
			DTColumnDefBuilder.newColumnDef(5),
			DTColumnDefBuilder.newColumnDef(6),
			DTColumnDefBuilder.newColumnDef(7),
			DTColumnDefBuilder.newColumnDef(8)
			
			
		];
	}
	
	vm.deleteCliente = deleteCliente;
	vm.editCliente = editCliente;
	vm.tabsDetalle= tabsDetalle;
	vm.activateCliente = activateCliente;

	function reloadData() {
			$scope.msg_total_rows = "";
			Cliente.findAll($scope.newBusquedaCliente, function(response){
				if (response.data.status==1){
				$scope.cliente = response.data.info;
				//$scope.ctg_almacenes = response.data.info[0].ctg_almacen;
				$scope.total_rows = response.data.info[0].total_rows;
				}
				/*if (response.data.info.length>$scope.newBusquedaCliente.cantidad_maxima_a_mostrar-1)
					$scope.msg_total_rows = "Se muestran "+$scope.newBusquedaCliente.cantidad_maxima_a_mostrar+" resultados de "+$scope.total_rows+". Favor especifique mas criterios de busqueda";*/
			});
		};
	

	function deleteCliente(clienteId) {
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
				Cliente.borrar(clienteId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Cliente Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
	}
	;
	
	function activateCliente(clienteId) {
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
				Cliente.activar(clienteId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Cliente Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};
	

	function editCliente(clienteId) {

		$state.go('menuMaster.editCliente', {
			idCliente : clienteId
		});

	}
	;

	  function tabsDetalle(clienteId) {
			var habilitarMenu = $location.search().habilitarMenu==null||$location.search().habilitarMenu=='undefined'?"S":$location.search().habilitarMenu;
			var habilitarMenuWin = $stateParams.habilitarMenu;
			if (habilitarMenuWin=='N') habilitarMenu = habilitarMenuWin;
			$state.go(
				'menuMaster.tabsDetalleC', {
					idCliente: clienteId,
					habilitarMenu: habilitarMenu
				});
		};
		
		
		$scope.listCliente = function() {
			
			$state.go('menuMaster.listCliente');
		};
	

};
	
function ClienteActivateCtrl($scope, $rootScope, $state, $compile, $window, $location, $stateParams, 
			popupService, DTOptionsBuilder, DTColumnDefBuilder, Cliente, Depts, Ciudad, Munis, URL_API, TipoDoc) {
		
		
		var vm = this;
		
		$scope.clientes = {};
		$scope.total_rows = 0;
		$scope.total_rows_clientes = 0;
		$scope.msg_total_rows = "";
		$scope.msg_total_rows_clientes = "";
		$scope.newBusquedaCliente = {nombre:"", nit: "", registro_fiscal:"", id_tipo_doc:"", numero_doc:"", cantidad_maxima_a_mostrar:99999};
		
		$scope.reset = function() {
	    	// Sets the form to it's pristine state
	        if($scope.regForm) {
	            $scope.regForm.$setPristine();
	        }
			$scope.isVisibleAfterCliente = false;
				$scope.formType = "CLIENTES";
				$scope.newBusquedaCliente = {nombre:"", nit: "", registro_fiscal:"", id_tipo_doc:"", numero_doc: "", cantidad_maxima_a_mostrar:99999};
				$scope.findAll();
	    };
	    
		$scope.resetCliente = function() {
				$scope.newBusquedaCliente = {nombre:"", nit: "", registro_fiscal:"", id_tipo_doc:"", numero_doc:"", cantidad_maxima_a_mostrar:99999, registro_fiscal_not_null:"N"};
				$scope.busquedaFiltroCliente();
	    };
	   
		
		$scope.findAllI = function(){
			$scope.msg_total_rows = "";
			Cliente.findAllI($scope.newBusquedaCliente, function(response){
				if (response.data.status==1){
				$scope.clientes = response.data.info;
				//$scope.ctg_almacenes = response.data.info[0].ctg_almacen;
				$scope.total_rows_clientes = response.data.info[0].total_rows_clientes;
				}
				/*if (response.data.info.length>$scope.newBusquedaCliente.cantidad_maxima_a_mostrar-1)
						$scope.msg_total_rows_clientes = "Se muestran "+$scope.newBusquedaCliente.cantidad_maxima_a_mostrar+" resultados de "+$scope.total_rows_clientes+". Favor especifique mas criterios de busqueda";*/
			});
		};
		$scope.findAllI();

		$scope.TipoDocs = {};
			$scope.listTipoDoc = function() {
				TipoDoc.findAll(function(response){
					if (response.data.status==1){
					$scope.TipoDocs = response.data.info;
					}
				});
			};
			$scope.listTipoDoc();
					
			
			$scope.busquedaFiltroCliente = function(){
				$scope.clientes = {};
				//$scope.cliente = null;
				document.getElementById("busquedaClientes").disabled = true;
				document.getElementById("resetClientes").disabled = true;
				document.getElementById("loadingClientes").style.display = "";
				$scope.newBusquedaCliente.cantidad_maxima_a_mostrar = 99999;
				$scope.msg_total_rows_clientes = "";
				
		    	if ($stateParams.id_tipo_factura == 1)
		    		$scope.newBusquedaCliente.registro_fiscal_not_null = "S";
				
				Cliente.busquedaFiltros($scope.newBusquedaCliente, function(response) {
					if (response.data.status==1){
					$scope.clientes = response.data.info;
	/*		        for (i=0; i<response.data.info.length; i++) {
			        	$scope.newBuscarCliente[i] = {id_cliente:response.data.info[i].id.id};
			        }*/
					$scope.total_rows_clientes = response.data.info[0].total_rows;
					}
					if (response.data.info.length>$scope.newBusquedaCliente.cantidad_maxima_a_mostrar-1)
						$scope.msg_total_rows_clientes = "Se muestran "+$scope.newBusquedaCliente.cantidad_maxima_a_mostrar+" resultados de "+$scope.total_rows_clientes+". Favor especifique mas criterios de busqueda";
					document.getElementById("busquedaClientes").disabled = false;
					document.getElementById("resetClientes").disabled = false;
					document.getElementById("loadingClientes").style.display = "none";
				});
			};
			
	
		$scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withLanguage($rootScope.globals.language)
						   .withBootstrap().withOption('processing', true).withOption('deferRender', true);
		
		$scope.dtColumnDefs = [
	        DTColumnDefBuilder.newColumnDef(0),
	        DTColumnDefBuilder.newColumnDef(1),
	        DTColumnDefBuilder.newColumnDef(2),
	        DTColumnDefBuilder.newColumnDef(3),
	        DTColumnDefBuilder.newColumnDef(4)
	        
	        
	    ];
		
		vm.deleteCliente = deleteCliente;
		vm.editCliente = editCliente;
		vm.tabsDetalle= tabsDetalle;
		vm.activateCliente = activateCliente;

		function reloadData() {
				$scope.msg_total_rows = "";
				Cliente.findAll($scope.newBusquedaCliente, function(response){
					if (response.data.status==1){
					$scope.clientes = response.data.info;
					//$scope.ctg_almacenes = response.data.info[0].ctg_almacen;
					$scope.total_rows = response.data.info[0].total_rows;
					}
				/*	if (response.data.info.length>$scope.newBusquedaCliente.cantidad_maxima_a_mostrar-1)
						$scope.msg_total_rows = "Se muestran "+$scope.newBusquedaCliente.cantidad_maxima_a_mostrar+" resultados de "+$scope.total_rows+". Favor especifique mas criterios de busqueda";*/
				});
			};
		
	
		function reloadDataI() {
			$scope.msg_total_rows = "";
			Cliente.findAllI($scope.newBusquedaCliente, function(response){
				if (response.data.status==1){
				$scope.clientes = response.data.info;
				//$scope.ctg_almacenes = response.data.info[0].ctg_almacen;
				$scope.total_rows = response.data.info[0].total_rows;
				}
				/*if (response.data.info.length>$scope.newBusquedaCliente.cantidad_maxima_a_mostrar-1)
					$scope.msg_total_rows = "Se muestran "+$scope.newBusquedaCliente.cantidad_maxima_a_mostrar+" resultados de "+$scope.total_rows+". Favor especifique mas criterios de busqueda";*/
			});
		};
		

		function deleteCliente(clienteId) {

			if (popupService.showPopup('Esta seguro de borrar este registro?')) {
				Cliente.borrar(clienteId, $rootScope.globals.currentUser.username,
						function(response) {
							reloadData();
						});

			}
		}
		;
		
		function activateCliente(clienteId) {

			Cliente.activar(clienteId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadDataI();
					
					});

	}
	;
		

		function editCliente(clienteId) {

			$state.go('menuMaster.editCliente', {
				idCliente : clienteId
			});

		}
		;
		

		  function tabsDetalle(clienteId) {
		    	var habilitarMenu = $location.search().habilitarMenu==null||$location.search().habilitarMenu=='undefined'?"S":$location.search().habilitarMenu;
		    	var habilitarMenuWin = $stateParams.habilitarMenu;
		    	if (habilitarMenuWin=='N') habilitarMenu = habilitarMenuWin;
		    	$state.go(
					'menuMaster.tabsDetalleC', {
						idCliente: clienteId,
						habilitarMenu: habilitarMenu
					});
		    };
		    
		    
		    $scope.listCliente = function() {
		    	
		    	$state.go('menuMaster.listCliente');
		    };
		

	};

function CuentaSucursalCtrl($scope, $rootScope, $http, $filter, $state, DTOptionsBuilder, DTColumnDefBuilder, $stateParams, $compile, $window, popupService, Cuenta, Almacen, Cliente, URL_API){

	$scope.clearMessages = function () {
		
		$scope.successMessagesChild = '';
		$scope.errorMessagesChild = '';
		$scope.errorsChild = {};
	};

	var vm = this;

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
		'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
		DTColumnDefBuilder.newColumnDef(1),
		DTColumnDefBuilder.newColumnDef(2),
		DTColumnDefBuilder.newColumnDef(3).notSortable() ];


	$scope.resetCuenta = function() { 

		// Sets the form to it's pristine state
		if($scope.cuentaForm) {
			$scope.cuentaForm.$setPristine();
		}
		
		$scope.formTypeOpcion = "ADD";
		var date = new Date();
		
		//$scope.cuentaSucursal = {id_cuenta: "", id_empresa: "", id_almacen:"", id_cliente:"", usuario: $rootScope.globals.currentUser.username};
		//$scope.cuentaSucursal = [];

		$scope.clearMessages();
	};

	$scope.guardarCuentaSucursal = function() {
		$scope.clearMessages();
		$scope.newCliente.id_empresa = $rootScope.globals.currentUser.id_empresa;
		$scope.newCliente.usuario = $rootScope.globals.currentUser.username;
		//console.log($scope.newCliente);
		
		
		Cuenta.insertarCuentaSucursal($scope.newCliente, function(data) {
			$scope.formTypeOpcion = "UPD";
			$scope.refreshCuenta($scope.newCliente.id);
			$scope.resetCuenta();
			$scope.successMessagesChild = [ 'Cuenta por Sucursal Registrada correctamente' ];
			
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errorsChild = result.data;
			} else {
				$scope.errorMessagesChild = [ 'Unknown error de servidor' ];
			}
		});
		//*/
		
	};

	$scope.resetCuenta();

	$scope.loadCuentas = function() {

		Cuenta.findByIdElemento(5, function(response){
			if(response.status==1)  $scope.cuentaCliente =response.info;
			else $scope.cuentaCliente =[];
		});

	};
	
	$scope.loadCuentasCostos = function() {

		Cuenta.findByIdElemento(4, function(response){
			if(response.status==1)  $scope.cuentaClienteCostos =response.info;
			else $scope.cuentaClienteCostos =[];
		});

	};


	$scope.loadAlmacen = function() {

		Almacen.busquedaAlmacen($rootScope.globals.currentUser.id_empresa, function(response){
			if(response.data.status==1)  $scope.almacen =response.data.info;
			else $scope.almacen =[];
		});

	};

	$scope.loadAlmacen();
	$scope.loadCuentas();
	$scope.loadCuentasCostos();

	//LISTA
	$scope.refreshCuenta = function(idCliente) {
		Cuenta.findByCliente(idCliente, function(response){
			if(response.data.status==1) $scope.cuentaSucursal =response.data.info;
			else $scope.cuentaSucursal =[];
		});
		
	};

	if ($scope.formType == "ADD"){
		$scope.refreshCuenta("NADA");
	}else{
		$scope.refreshCuenta($stateParams.idCliente);
	}

	$scope.deleteCuentaSucursal = function(idEmpresa, idAlmacen, idCuenta, idCliente) {
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
				Cuenta.borrarCuentaSucursal(idEmpresa, idAlmacen, idCuenta, idCliente, function(response){
					$scope.refreshCuenta(idCliente);
				});
					
				Swal.fire({
					toast:true,
					position: 'top-end',
					type: 'success',
					title: 'Cuenta Eliminada',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
		
	};

	/*$rootScope.$on("refreshCuenta", function(event, data){
		$scope.refreshCuenta(data);
	});//*/
};

//EMPRESA
function EmpresaAddCtrl($rootScope, $scope, $filter, $http, $state, Empresa, TipoContr, Giro, $stateParams) {

$scope.formType = 'ADD';
	
	$scope.isNew = function(value){
		
		if(value=='ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function () {
    	
        $scope.successMessages = '';
        $scope.errorMessages = '';
        $scope.errors = {};
    };

    
    $scope.reset = function() {
    
    	// Sets the form to it's pristine state
        if($scope.regForm) {
            $scope.regForm.$setPristine();
        }

        $scope.isVisibleAfterEmpresa = false;
        $scope.formType = 'ADD';
        	
        var date = new Date();        
      
        $scope.newEmpresa = {
			id : "",  
			descripcion : "",  
			razon_social : "",  
			nit : "",  
			nrc : "",  
			iva : "",  
			autorizacion_mh : "",  
			fecha_autorizacion : "",  
			id_tipo_contribuyente : "", 
			id_giro : "", 
			usuario : $rootScope.globals.currentUser.username};        
    	
        $scope.clearMessages();
    };

    $scope.registerEmpresa = function(value) {
        $scope.clearMessages();

        if (value == "ADD"){

        	Empresa.insertar($scope.newEmpresa, function(data) {

            	$scope.isVisibleAfterEmpresa = $scope.isVisibleAfterEmpresa ? false : true;
            	$scope.formType = "UPD";            	

            	Empresa.findByIds($scope.newEmpresa, function(response){
					if (response.data.status==1){
						$scope.newEmpresa = response.data.info[0];
						$scope.newEmpresa.id_tipo_contribuyente = response.data.info[0].id.id_tipo_contribuyente;
						$scope.newEmpresa.id = response.data.info[0].id.id;
					}
                });
            	
                $scope.successMessages = [ 'Empresa Registrada correctamente' ];
           }, function(result) {
                if ((result.status == 409) || (result.status == 400)) {
                    $scope.errors = result.data;
                } else {
                    $scope.errorMessages = [ 'Unknown error de servidor' ];
                }
            });
			////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listEmpresa');
			

        	
        } else{

    	    var date = new Date();
    	    var EmpresaObj = {usuario : $rootScope.globals.currentUser.username};

    	    $scope.newEmpresa.usuario = EmpresaObj.usuario;
       	
    	    Empresa.actualizar($scope.newEmpresa, function(data) {
    	        $scope.successMessages = [ 'Empresa Actualizada correctamente' ];
    	        
    	    }, function(result) {
    	        if ((result.status == 409) || (result.status == 400)) {
    	            $scope.errors = result.data;
    	        } else {
    	            $scope.errorMessages = [ 'Unknown error de servidor' ];
    	        }
    	    });
			 ////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listEmpresa');
			 
        	
        }
        
    };

    $scope.reset();	
    
    $scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";


	$scope.loadTipoContr = function() {
		TipoContr.findAllA(function(response) {
			if (response.data.status==1){
				$scope.tipoContr = response.data.info;
			}
			else{
				$scope.tipoContr = [];
			}
		});
	};

	$scope.loadTipoContr();
		
	$scope.loadGiro = function() {
		Giro.findAllA(function(response) {
			if (response.data.status==1){
				$scope.giro = response.data.info;
			}
			else{
				$scope.giro = [];
			}
		});
	};

	$scope.loadGiro();
};

function EmpresaEditCtrl($rootScope, $scope, $filter, $state, $stateParams, Empresa, Inventario, TipoContr, Giro) {

	$scope.isVisibleAfterEmpresa = true;

	$scope.clearMessages = function () {
    	
        $scope.successMessages = '';
        $scope.errorMessages = '';
        $scope.errors = {};
    };
    
    $scope.newImagen = {};

    $scope.reset = function() {
        
    	// Sets the form to it's pristine state
        if($scope.regForm) {
            $scope.regForm.$setPristine();
        }

        $scope.isVisibleAfterEmpresa = false;
        $scope.formType = 'ADD';
        
       // $rootScope.$broadcast("refreshEmpresa", 0);
        
		$scope.newImagen = {accion: "", id:""};	
        
        var date = new Date();
        $scope.newEmpresa = {id : "", id_tipo_contribuyente : "", descripcion : "", usuario : $rootScope.globals.currentUser.username};

        var id = $scope.newEmpresa!=null?$scope.newEmpresa.id:"";
    	$scope.newImagen = {accion: ""};
        
        $scope.clearMessages();
    };
	
    $scope.registerEmpresa = function(value) { 

    	$scope.clearMessages();

        if (value == "ADD"){
        	Empresa.insertar($scope.newEmpresa, function(data) {

            	$scope.isVisibleAfterEmpresa = $scope.isVisibleAfterEmpresa ? false : true;
                $scope.formType = "UPD";
                
            	$scope.newEmpresa = {};
        		$scope.Id='';

                Empresa.findById($scope.newEmpresa.id, function(response){
					if (response.data.status==1){
                	$scope.newEmpresa = response.data.info[0];			
        			$scope.newEmpresa.id_tipo_contribuyente = response.data.info[0].id.id_tipo_contribuyente;
        			$scope.newEmpresa.id = response.data.info[0].id.id;
        			
        			var id = $scope.newEmpresa!=null?$scope.newEmpresa.id:"";
					$scope.newImagen = {accion: "",  id : $scope.newEmpresa.id 
					}
				};
                });
            	
                $scope.successMessages = [ 'Empresa Registrada correctamente' ];
                
           }, function(result) {
                if ((result.status == 409) || (result.status == 400)) {
                    $scope.errors = result.data;
                } else {
                    $scope.errorMessages = [ 'Unknown error de servidor' ];
                }
            });
			////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listEmpresa');
			
        } 
		else{

    	    var date = new Date();
    	    var empresaObj = {usuario : $rootScope.globals.currentUser.username};

    	    $scope.newEmpresa.usuario = empresaObj.usuario;
        	
    	    Empresa.actualizar($scope.newEmpresa, function(data) {
    	        $scope.successMessages = [ 'Empresa Actualizada correctamente' ];
    	        
    	    }, function(result) {
    	        if ((result.status == 409) || (result.status == 400)) {
    	            $scope.errors = result.data;
    	        } else {
    	            $scope.errorMessages = [ 'Unknown error de servidor' ];
    	        }
    	    });
			 ////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listEmpresa');
        }
        
	  };
	  
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
	$scope.newEmpresa = {};
	$scope.Id='';
	$scope.loadEmpresa = function() { 

		// $scope.Id=$stateParams.idEmpresa; 
		Empresa.findById($stateParams.idEmpresa, function(response){
			if (response.data.status==1){
				$scope.newEmpresa = response.data.info[0];	
				$scope.newEmpresa.id_tipo_contribuyente = response.data.info[0].id.id_tipo_contribuyente;
				$scope.newEmpresa.id = response.data.info[0].id.id;			
				/*var id = $scope.newEmpresa!=null?$scope.newEmpresa.id:"";
				$scope.newImagen = {accion: "",  id : $scope.newEmpresa.id };*/

				var id = $scope.newEmpresa.id!=null?$scope.newEmpresa.id:"";
				$scope.newImagen = {accion: "", tabla: "ctg_empresa", campo: "id", referencia: $scope.newEmpresa.id, id: id};
				
				$scope.loadGiro();
				
				$scope.newEmpresa.id_giro = response.data.info[0].ctg_giro.id;
				if($scope.newEmpresa.estado=='A'){
					$scope.newEmpresa.estado = true;
				}
			};
		});
	};
	$scope.loadEmpresa();	

	
	$scope.loadTipoContr = function() {
	    	TipoContr.findAll(function(response) {
				if (response.data.status==1){
				$scope.tipoContr = response.data.info;
				}
			});
		};
	$scope.loadTipoContr();
	
	$scope.loadGiro = function() {
		Giro.findAllA(function(response) {
			if (response.data.status==1){
				$scope.giro = response.data.info;
			}
			else{
				$scope.giro = [];
			}
		});
	};

	

	$scope.uploadFile = function(files) {
		//console.log(files);
		$scope.newImagen.accion="i";
		$scope.newImagen.tabla="ctg_empresa";
		$scope.newImagen.campo="logo";
		$scope.newImagen.referencia="";
		$scope.newImagen.id= $scope.newEmpresa.id;
		var respuesta = "";
		Empresa.uploadFile(files, $scope.newImagen, function(response) {
			if(response.data.status==1){
				$scope.resp = response.data.info[0];
				$scope.newEmpresa.logo = response.data.info[0].img;
				//$scope.successMessages = response.data.info[0].msg;
			}
			else{
				$scope.successMessages = "";
			}
	   }, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Error desconocido de servidor' ];
			}
		});
		
	};
			
	$scope.deleteImg = function(index, id) {
		$scope.newImagen.accion="DELETE_EMPRESA_IMG";
		$scope.newImagen.id = id;
		Empresa.deleteImg($scope.newImagen, function(response) {
			$scope.resp = response.data.info[0];
			$scope.successMessages = [ $scope.resp.msg ];
	   }, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Error desconocido de servidor' ];
			}
		});
		//$scope.newEmpresa.splice(index,1);
		if ($scope.newEmpresa[0]==null)
			$scope.newEmpresa = [{}];
	};
	
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function EmpresaTableCtrl($scope, Inventario, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, Empresa, URL_API) {
	var vm = this;

	vm.listEmpresa = listEmpresa;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.empresa = {};

	Empresa.findAll(function(response) {
		if (response.data.status==1){
		vm.empresa = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteEmpresa = deleteEmpresa;
	vm.editEmpresa = editEmpresa;
	vm.activateEmpresa = activateEmpresa;

	function listEmpresa() {
		Empresa.findAll(function(response) {
			if (response.data.status==1){
			vm.empresa = response.data.info;
			}
		});

	}
	;


	function reloadData() {
		Empresa.findAll(function(response) {
			if (response.data.status==1){
			vm.empresa = response.data.info;
			}
		});

	}
	;

	function deleteEmpresa(empresaId) {
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
				Empresa.borrar(empresaId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
					position: 'top-end',
					type: 'success',
					title: 'Empresa Inactivada',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
	}
	;

	function activateEmpresa(empresaId) {
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
				Empresa.activar(empresaId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Empresa Activada',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
	};
	
	function editEmpresa(empresaId) {

		$state.go('menuMaster.editEmpresa', {
			idEmpresa : empresaId
		});

	}
	;

	
};

// ESTILO
function EstiloAddCtrl($rootScope, $scope, $filter, $http, $state, Estilo) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newEstilo = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerEstilo = function() {
		$scope.clearMessages();

		Estilo.insertar($scope.newEstilo, function(response) {

			$scope.reset();

			$scope.successMessages = [ 'Estilo Registrado correctamente' ];

		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
		});
		////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listEstilo');

	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function EstiloEditCtrl($rootScope, $scope, $filter, $state, $stateParams,
		Estilo) {

	$scope.updateEstilo = function() {

		var date = new Date();
		var EstiloObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newEstilo.usuario = EstiloObj.usuario;

		Estilo.actualizar($scope.newEstilo, function(response) {
			$scope.successMessages = [ 'Estilo Actualizado correctamente' ];

		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
		});
		////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listEstilo');

	};

	$scope.loadEstilo = function() {
		Estilo.findById($stateParams.idEstilo, function(response) {
			if (response.data.status==1){
				$scope.newEstilo = response.data.info[0];
				if($scope.newEstilo.estado=='A'){
					$scope.newEstilo.estado = true;
				}
			}
		});
	};

	$scope.loadEstilo();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function EstiloTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, Estilo, URL_API) {
	var vm = this;

	vm.listEstilo = listEstilo;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.estilo = {};

	Estilo.findAll(function(response) {
		if (response.data.status==1){
		vm.estilo = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteEstilo = deleteEstilo;
	vm.editEstilo = editEstilo;
	vm.activateEstilo = activateEstilo;

	function listEstilo() {
		Estilo.findAll(function(response) {
			if (response.data.status==1){
			vm.estilo = response.data.info;
			}
		});

	}
	;

	
	function reloadData() {
		Estilo.findAll(function(response) {
			if (response.data.status==1){
			vm.estilo = response.data.info;
			}
		});

	}
	;
	

	function deleteEstilo(estiloId) {
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
				Estilo.borrar(estiloId,
					$rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
					position: 'top-end',
					type: 'success',
					title: 'Estilo Inactivado',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
		
	};
	
	function activateEstilo(estiloId) {
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
				Estilo.activar(estiloId,
					$rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
					position: 'top-end',
					type: 'success',
					title: 'Estilo Activado',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
		
	};

	function editEstilo(estiloId) {

		$state.go('menuMaster.editEstilo', {
			idEstilo : estiloId
		});

	}
	;

};

// FORMA DE PAGO
function FormPagoAddCtrl($rootScope, $scope, $filter, $http, $state, FormPago, Cuenta, CONTABILIDAD) {

	$scope.formType = 'ADD';
	$scope.isVisibleAfter = true;
	$scope.contabilidad = CONTABILIDAD;

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newFormPago = {
			id : "",
			descripcion : "",
			id_cuenta : "",
			estado : "A",
			usuario : $rootScope.globals.currentUser.username
			
			//DATOS DE CUENTA POR SUCURSAL
			, id_almacen : ""
			, id_cuenta_sucursal : ""
			//, id_cuenta_costo_sucursal : ""
		};

		$scope.clearMessages();
	};

	$scope.registerFormPago = function() {
		$scope.clearMessages();

		FormPago.insertar($scope.newFormPago,function(response) {

			$scope.reset();

			Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Exito',
					text: "Registro ingresado correctamente",
					showConfirmButton: false,
					timer: 2000
				});
				$state.go('menuMaster.listFormPago');
		},
		function(result) {
			if ((result.status == 409)
					|| (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
	};

	$scope.reset();
	
	$scope.loadCuenta = function() {
		var elemento = 1;
		
		$scope.newCliente.id_cuenta = "";
		$scope.cuenta = [];
		Cuenta.findByIdElemento(elemento, function(response) {
			if (response.status==1){
				$scope.cuenta = response.info;
			}
			else $scope.cuenta = [];
		});
	};
	$scope.loadCuenta();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function FormPagoEditCtrl($rootScope, $scope, $filter, $state, $stateParams, FormPago, Cuenta, CONTABILIDAD) {
	$scope.newFormPago = {
		id : "",
		descripcion : "",
		id_cuenta : "",
		estado : "A",
		usuario : $rootScope.globals.currentUser.username
	};
	$scope.isVisibleAfter = true;
	$scope.contabilidad = CONTABILIDAD;
	
	
	$scope.updateFormPago = function() {

		var date = new Date();
		var FormPagoObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newFormPago.usuario = FormPagoObj.usuario;

		FormPago.actualizar($scope.newFormPago,
			function(response) {
				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Exito',
					text: "Registro actualizado correctamente",
					showConfirmButton: false,
					timer: 2000
				});
				$state.go('menuMaster.listFormPago');
			},
			function(result) {
				if ((result.status == 409)
						|| (result.status == 400)) {
					$scope.errors = result.data;
				} else {
					$scope.errorMessages = [ 'Unknown error de servidor' ];
				}
				$('#notificacionesModal').modal('show');
		});
	};

	$scope.loadFormPago = function() {
		FormPago.findById($stateParams.idFormPago, function(response) {
			if (response.data.status==1){
				$scope.newFormPago = response.data.info[0];
				if($scope.newFormPago.estado=='A'){
					$scope.newFormPago.estado = true;
				}
			}
		});
	};

	$scope.loadFormPago();
	
	$scope.loadCuenta = function() {
		var elemento = 1;
		
		$scope.newFormPago.id_cuenta = "";
		$scope.cuenta = [];
		Cuenta.findByIdElemento(elemento, function(response) {
			if (response.status==1){
				$scope.cuenta = response.info;
			}
			else $scope.cuenta = [];
		});
	};
	$scope.loadCuenta();
	
	$scope.loadCuentas = function() {
		if($stateParams.idFormPago==6) cta = 2;
		else cta = 1;
		Cuenta.findByIdElemento(cta, function(response){
			if(response.status==1)  $scope.cuentaFormaPago =response.info;
			else $scope.cuentaFormaPago =[];
		});

	};
	$scope.loadCuentas();
	
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function FormPagoTableCtrl($scope, $rootScope, $state, $compile, $window, popupService, DTOptionsBuilder, DTColumnDefBuilder, FormPago, URL_API) {
	var vm = this;

	vm.listFormPago = listFormPago;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.formPago = {};

	FormPago.findAll(function(response) {
		if (response.data.status==1){
		vm.formPago = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteFormPago = deleteFormPago;
	vm.editFormPago = editFormPago;
	vm.activateFormPago = activateFormPago;

	function listFormPago() {
		FormPago.findAll(function(response) {
			if (response.data.status==1){
			vm.formPago = response.data.info;
			}
		});

	}
	;

	function reloadData() {
		FormPago.findAll(function(response) {
			if (response.data.status==1){
			vm.formPago = response.data.info;
			}
		});

	}
	;

	function deleteFormPago(formPagoId) {
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
				FormPago.borrar(formPagoId,
					$rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Forma de Pago Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
	}
	;

	function editFormPago(formPagoId) {

		$state.go('menuMaster.editFormPago', {
			idFormPago : formPagoId
		});

	}
	;
	
	function activateFormPago(formPagoId) {
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
				FormPago.activar(formPagoId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Forma de Pago Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};

};

function FormaPagoCuentaSucursalCtrl($scope, $rootScope, $http, $filter, $state, DTOptionsBuilder, DTColumnDefBuilder, $stateParams, $compile, $window, popupService, Cuenta, Almacen, FormPago, URL_API)
{

	$scope.clearMessages = function () {
		
		$scope.successMessagesChild = '';
		$scope.errorMessagesChild = '';
		$scope.errorsChild = {};
	};

	var vm = this;

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
		'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
		DTColumnDefBuilder.newColumnDef(1),
		DTColumnDefBuilder.newColumnDef(2),
		DTColumnDefBuilder.newColumnDef(3).notSortable() ];


	$scope.resetCuenta = function() { 

		// Sets the form to it's pristine state
		if($scope.cuentaSucursalForm) {
			$scope.cuentaSucursalForm.$setPristine();
		}
		
		$scope.formTypeOpcion = "ADD";
		var date = new Date();
		
		//$scope.cuentaSucursal = {id_cuenta: "", id_empresa: "", id_almacen:"", id_cliente:"", usuario: $rootScope.globals.currentUser.username};
		//$scope.cuentaSucursal = [];

		$scope.clearMessages();
	};

	$scope.guardarCuentaFormaPagoSucursal = function() {
		$scope.clearMessages();
		$scope.newFormPago.id_empresa = $rootScope.globals.currentUser.id_empresa;
		$scope.newFormPago.usuario = $rootScope.globals.currentUser.username;
		//console.log($scope.newFormPago);
		
		Cuenta.insertarFormaPagoCuentaSucursal($scope.newFormPago, function(data) {
			$scope.formTypeOpcion = "UPD";
			$scope.refreshCuenta($scope.newFormPago.id);
			$scope.resetCuenta();
			$scope.successMessagesChild = [ 'Cuenta por Sucursal Registrada correctamente' ];
			
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errorsChild = result.data;
			} else {
				$scope.errorMessagesChild = [ 'Unknown error de servidor' ];
			}
		});
		//*/
		
	};

	$scope.resetCuenta();

	$scope.loadCuentas = function() {

		Cuenta.findByIdElemento(5, function(response){
			if(response.status==1)  $scope.cuenta =response.info;
			else $scope.cuenta =[];
		});

	};
	
	
	$scope.loadAlmacen = function() {

		Almacen.busquedaAlmacen($rootScope.globals.currentUser.id_empresa, function(response){
			if(response.data.status==1)  $scope.almacen =response.data.info;
			else $scope.almacen =[];
		});

	};

	$scope.loadAlmacen();
	$scope.loadCuentas();

	//LISTA
	$scope.refreshCuenta = function(idFormaPago) {
		//console.log("entre");
		Cuenta.findByFormaPago(idFormaPago, function(response){
			if(response.data.status==1) $scope.cuentaFormaPagoSucursal =response.data.info;
			else $scope.cuentaFormaPagoSucursal =[];
		});
		
	};

	if ($scope.formType == "ADD"){
		$scope.refreshCuenta("NADA");
	}else{
		$scope.refreshCuenta($stateParams.idFormPago);
	}

	$scope.deleteFormaPagoCuentaSucursal = function(idEmpresa, idAlmacen, idCuenta, idFormaPago) {
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
				Cuenta.borrarFormaPagoCuentaSucursal(idEmpresa, idAlmacen, idCuenta, idFormaPago, function(response){
					$scope.refreshCuenta(idFormaPago);
				});
					
				Swal.fire({
					toast:true,
					position: 'top-end',
					type: 'success',
					title: 'Cuenta Eliminada',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
		
	};

	/*$rootScope.$on("refreshCuenta", function(event, data){
		$scope.refreshCuenta(data);
	});//*/
};
// GIRO
function GiroAddCtrl($rootScope, $scope, $filter, $http, $state, Giro) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newGiro = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerGiro = function() {
		$scope.clearMessages();

		Giro.insertar($scope.newGiro, function(response) {

			$scope.reset();

			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro ingresado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listGiro');
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});

	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function GiroEditCtrl($rootScope, $scope, $filter, $state, $stateParams, Giro) {

	$scope.updateGiro = function() {

		var date = new Date();
		var GiroObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newGiro.usuario = GiroObj.usuario;

		Giro.actualizar($scope.newGiro, function(response) {
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro actualizado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listGiro');
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});

	};

	$scope.loadGiro = function() {
		Giro.findById($stateParams.idGiro, function(response) {
			if (response.data.status==1){
				$scope.newGiro = response.data.info[0];
				if($scope.newGiro.estado=='A'){
					$scope.newGiro.estado = true;
				}
			}
		});
	};

	$scope.loadGiro();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function GiroTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, Giro, URL_API) {
	var vm = this;

	vm.listGiro = listGiro;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.giro = {};

	Giro.findAll(function(response) {
		if (response.data.status==1){
		vm.giro = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteGiro = deleteGiro;
	vm.editGiro = editGiro;
	vm.activateGiro = activateGiro;

	function listGiro() {
		Giro.findAll(function(response) {
			if (response.data.status==1){
			vm.giro = response.data.info;
			}
		});

	}
	;

	function reloadData() {
		Giro.findAll(function(response) {
			if (response.data.status==1){
			vm.giro = response.data.info;
			}
		});

	}
	;

	function deleteGiro(giroId) {
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
				Giro.borrar(giroId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Giro Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
	}
	;

	function editGiro(giroId) {

		$state.go('menuMaster.editGiro', {
			idGiro : giroId
		});

	}
	;

	function activateGiro(giroId) {
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
				Giro.activar(giroId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Giro Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};
};

// MOTO IMG
function MotoImgAddCtrl($rootScope, $scope, $filter, $http, $state, MotoImg, ProdMoto) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newMotoImg = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerMotoImg = function() {
		$scope.clearMessages();

		MotoImg
				.insertar(
						$scope.newMotoImg,
						function(response) {

							$scope.reset();

							$scope.successMessages = [ 'Imagen de Moto Registrada correctamente' ];

						},
						function(result) {
							if ((result.status == 409)
									|| (result.status == 400)) {
								$scope.errors = result.data;
							} else {
								$scope.errorMessages = [ 'Unknown error de servidor' ];
							}
						});
		////$('#notificacionesModal').modal('show');
	};

	$scope.reset();

	$scope.loadProdMoto = function() {
		ProdMoto.findAll(function(response) {
			if (response.data.status==1){
			$scope.prodMoto = response.data.info;
			}
		});
	};

	$scope.loadProdMoto()
};

function MotoImgEditCtrl($rootScope, $scope, $filter, $state, $stateParams,
		MotoImg, ProdMoto) {

	$scope.updateMotoImg = function() {

		var date = new Date();
		var MotoImgObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newMotoImg.usuario = MotoImgObj.usuario;

		MotoImg.actualizar($scope.newMotoImg, function(response) {
			$scope.successMessages = [ 'Imagen de Moto Actualizada correctamente' ];

		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
		});
		////$('#notificacionesModal').modal('show');
	};

	$scope.loadMotoImg = function() {
		MotoImg.findByIds($stateParams.idMotoImg, function(response) {
			if (response.data.status==1){
			$scope.newMotoImg = response.data.info[0];
			}
		});
	};

	$scope.loadMotoImg();

	$scope.loadProdMoto = function() {

		ProdMoto.findAll(function(response) {
			if (response.data.status==1){
			$scope.prodMoto = response.data.info;
			}
		});
	};

	$scope.loadProdMoto()
};

function MotoImgTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, MotoImg, URL_API) {
	var vm = this;

	vm.listImgM = listImgM;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.motoImg = {};

	MotoImg.findAll(function(response) {
		if (response.data.status==1){
		vm.motoImg = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteMotoImg = deleteMotoImg;
	vm.editMotoImg = editMotoImg;

	function listImgM() {
		MotoImg.findAll(function(response) {
			if (response.data.status==1){
			vm.motoImg = response.data.info;
			}
		});

	}
	;

	function reloadData() {
		MotoImg.findAll(function(response) {
			if (response.data.status==1){
			vm.motoImg = response.data.info;
			}
		});

	}
	;

	function deleteMotoImg(motoImgId) {

		if (popupService.showPopup('Esta seguro de borrar este registro?')) {
			MotoImg.borrar(motoImgId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});

		}
	}
	;

	function editMotoImg(motoImgId) {

		$state.go('menuMaster.editMotoImg', {
			idMotoImg : motoImgId
		});

	}
	;

};

// PRODUCTO IMG
function ProdImgAddCtrl($rootScope, $scope, $filter, $http, $state, ProdImg, Prod) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newProdImg = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerProdImg = function() {
		$scope.clearMessages();

		ProdImg.insertar($scope.newProdImg,
						function(response) {
							$scope.reset();
							$scope.successMessages = [ 'Imagen de producto Registrado correctamente' ];
						},
						function(result) {
							if ((result.status == 409)
									|| (result.status == 400)) {
								$scope.errors = result.data;
							} else {
								$scope.errorMessages = [ 'Unknown error de servidor' ];
							}
						});
		////$('#notificacionesModal').modal('show');
	};

	$scope.reset();

	$scope.loadProd = function() {
		Prod.findAll(function(response) {
			if (response.data.status==1){
			$scope.prod = response.data.info;
			}
		});
	};

	$scope.loadProd();
};

function ProdImgEditCtrl($rootScope, $scope, $filter, $state, $stateParams,
		ProdImg, Prod) {

	$scope.updateProdImg = function() {

		var date = new Date();
		var ProdImgObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newProdImg.usuario = ProdImgObj.usuario;

		ProdImg.actualizar($scope.newProdImg, function(response) {
			$scope.successMessages = [ 'ProdImg Actualizada correctamente' ];

		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
		});
		////$('#notificacionesModal').modal('show');
	};

	$scope.loadProdImg = function() {
		ProdImg.findById($stateParams.idProdImg, function(response) {
			if (response.data.status==1){
				$scope.newProdImg = response.data.info[0];
			}
		});
	};

	$scope.loadProdImg();

	$scope.loadProd = function() {
		Prod.findAll(function(response) {
			if (response.data.status==1){
			$scope.prod = response.data.info;
			}
		});
	};

	$scope.loadProd();
};

function ProdImgListCtrl($rootScope, $scope, $filter, $state, $stateParams, ProdImg, Prod) {

	function listProdImg() {
		ProdImg.findById(function(response) {
			if (response.data.status==1){
			vm.prodImg = response.data.info;
			}
		});

	}
	;
		
	$scope.loadProdImg = function() {
		ProdImg.findById($stateParams.idProdImg, function(response) {
			if (response.data.status==1){
			$scope.newProdImg = response.data.info[0];
			}
		});
	};

	$scope.loadProdImg();

	$scope.loadProd = function() {
		Prod.findAll(function(response) {
			if (response.data.status==1){
			$scope.prod = response.data.info;
			}
		});
	};

	$scope.loadProd();
};

function ProdImgTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, ProdImg, URL_API) {
	var vm = this;

	
	vm.listImg = listImg;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.prodImg = {};

	ProdImg.findAll(function(response) {
		if (response.data.status==1){
		vm.prodImg = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteProdImg = deleteProdImg;
	vm.editProdImg = editProdImg;

	function listImg() {
		ProdImg.findAll(function(response) {
			if (response.data.status==1){
			vm.prodImg = response.data.info;
			}
		});

	}
	;

	function reloadData() {
		ProdImg.findAll(function(response) {
			if (response.data.status==1){
			vm.prodImg = response.data.info;
			}
		});

	}
	;
	


	function deleteProdImg(prodImgId) {

		if (popupService.showPopup('Esta seguro de borrar este registro?')) {
			ProdImg.borrar(prodImgId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});

		}
	}
	;

	function editProdImg(prodImgId) {

		$state.go('menuMaster.editProdImg', {
			idProdImg : prodImgId
		});

	}
	;
	
	function ListProdImg(prodImgId, prodId) {

		$state.go('menuMaster.listProdImg', {
			idProdImg : prodImgId,
			idProd : prodId
		});

	}
	;

};

// PRODUCTO MOTO
function ProdMotoAddCtrl(URL_API, $rootScope, $scope, $filter, $http, $state, ProdMoto, Marca, Modelo, Estilo, Color) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newProdMoto = {
			id : "", descripcion : "", id_modelo : "", id_marca : "", id_estilo : "", usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerProdMoto = function() { 
		$scope.clearMessages();

		ProdMoto.insertar($scope.newProdMoto,function(response) {

							$scope.reset();

							$scope.successMessages = [ 'Producto Moto Registrado correctamente' ];
						},
						function(result) {
							if ((result.status == 409)
									|| (result.status == 400)) {
								$scope.errors = result.data;
							} else {
								$scope.errorMessages = [ 'Unknown error de servidor' ];
							}
						});
		////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listProdMoto');

	};

	$scope.reset();

	$scope.loadMarca = function() {
		Marca.findAll(function(response) {
			if (response.data.status==1){
			$scope.marca = response.data.info;
			}
		});
	};

	$scope.loadMarca();
	
	$scope.loadModelo = function() {
		Modelo.findAll(function(response) {
			if (response.data.status==1){
			$scope.modelo = response.data.info;
			}
		});
	};

	$scope.loadModelo();
	
	$scope.loadEstilo = function() {
		Estilo.findAll(function(response) {
			if (response.data.status==1){
			$scope.estilo = response.data.info;
			}
		});
	};

	$scope.loadEstilo();

	$scope.loadColor = function() {
		Color.findAll(function(response) {
			if (response.data.status==1){
			$scope.color = response.data.info;
			}
		});
	};

	$scope.loadColor();

	
	$scope.updateModelo = function(){	

		 $scope.updateModelo = function(){
			  	var marca = 0;
			  	
			  	$scope.modelo = null;
			  	$scope.newProdMoto.id_modelo = "";
			  	if ($scope.newProd.id_marca==null) $scope.newProd.id_modelo = null;
			  //	if ($scope.newProdMoto.id_modelo==null) $scope.newProdMoto.id_modelo = "";
			  //	if ($scope.newProdMoto.id_marca==null) $scope.newProdMoto.id_marca = "";
			  	
			  	if ($scope.newProdMoto.id_marca == null){
			  		marca = 0;
			  	}else{
			  		marca = $scope.newProdMoto.id_marca;
			  	}
			  	
		    	$http.get(URL_API + '/servicios/ctg/ctg_modelo.php?accion=C&idmarca=' + marca).
		        then(function(response) {
					if (response.data.status==1){
		        	$scope.modelo = response.data.info;
					delete $scope.modelo.id;
					}
		        });
		    	
		    };
	};
};

function ProdMotoEditCtrl(URL_API, $rootScope, $scope, $filter, $state, $stateParams, ProdMoto, Marca, Modelo, Estilo, Color) {

	$scope.updateProdMoto = function() {

		var date = new Date();
		var ProdMotoObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newProdMoto.usuario = ProdMotoObj.usuario;

		ProdMoto.actualizar($scope.newProdMoto, function(response) {
			$scope.successMessages = [ 'Producto Moto Actualizado correctamente' ];

		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
		});
		//$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listProdMoto');

	};

	$scope.loadProdMoto = function() {
		ProdMoto.findById($stateParams.idProdMoto, function(response) {
			if (response.data.status==1){
			$scope.newProdMoto = response.data.info[0];			
			$scope.newProdMoto.id_marca = response.data.info[0].id.id_marca;
			$scope.newProdMoto.id_modelo = response.data.info[0].id.id_modelo;
			$scope.newProdMoto.id_estilo = response.data.info[0].id.id_estilo;
			$scope.newProdMoto.id = response.data.info[0].id.id;
			}
		});
	};

	$scope.loadProdMoto();

	$scope.loadMarca = function() {
		Marca.findAll(function(response) {
			if (response.data.status==1){
			$scope.marca = response.data.info;
			}
		});
	};

	$scope.loadMarca();
	
	$scope.loadModelo = function() {
		Modelo.findAll(function(response) {
			if (response.data.status==1){
			$scope.modelo = response.data.info;
			}
		});
	};

	$scope.loadModelo();
	
	$scope.loadEstilo = function() {
		Estilo.findAll(function(response) {
			if (response.data.status==1){
			$scope.estilo = response.data.info;
			}
		});
	};

	$scope.loadEstilo();

	$scope.loadColor = function() {
		Color.findAll(function(response) {
			if (response.data.status==1){
			$scope.color = response.data.info;
			}
		});
	};

	$scope.loadColor();
	
	$scope.updateModelo = function(){	

		 $scope.updateModelo = function(){
				  var marca = 0;
				  
				  if ($scope.newProd.id_marca==null) $scope.newProd.id_modelo = null;
			  	
			  	if ($scope.newProd.id_marca == null){
			  		marca = 0;
			  	}else{
			  		marca = $scope.newProd.id_marca;
			  	}
			  	
		    	$http.get(URL_API + '/servicios/ctg/ctg_modelo.php?accion=C&idmarca=' + marca).
		        then(function(response) {
					if (response.data.status==1){
		        	$scope.modelo = response.data.info;
					delete $scope.modelo.id;
					}
		        });
		    	
		    };
	};
};

function ProdMotoTabsCtrl($rootScope, $scope, $filter, $state, $stateParams, $location, ProdMoto, Inventario){
    
    $('.tabgroup > div').hide();
    $('.tabgroup > div:first-of-type').show();
    $('.tabs a').click(function(e){
      e.preventDefault();
        var $this = $(this),
            tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();
      
    });


	// $scope.detalleProductoM = {};
	$scope.prodMoto = {};	
	$scope.prodMotoId='';
	$scope.ctgMotoImg = {};
	
	$scope.loadDetalleProductoM = function() {
    
    	$scope.ProdMotoId=$stateParams.idProdMoto;
    	
		ProdMoto.findById($stateParams.idProdMoto, function(response){
			if (response.data.status==1){
			$scope.prodMoto = response.data.info[0];
			$rootScope.descripcion_producto = $scope.prodMoto.descripcion;	
			var id = $scope.prodMoto.ctgMotoImg!=null?$scope.prodMoto.ctgMotoImg:"";
			$scope.newImagen = {accion: "", tabla: "ctg_moto_img", campo: "id_moto", referencia: $scope.prodMoto.id.id, id: id };
			}
		});
	};
	$scope.loadDetalleProductoM();
	
	
	 $scope.uploadFile = function(files) {
	    	$scope.newImagen.accion="i";
	    	var respuesta = "";
	        Inventario.uploadFile(files, $scope.newImagen, function(response) {
	        	$scope.resp = response.data.info[0];
				var respuesta = response.data.info.split("|");
		        if ($scope.prodMoto.ctgMotoImg[0]==null && ($scope.prodMoto.ctgMotoImg.length==1)) {
		        	$scope.prodMoto.ctgMotoImg = [{}];
		        	$scope.prodMoto.ctgMotoImg[0]=({idProdMoto: $scope.newImagen.referencia, id: respuesta[0], image:respuesta[1]});
		        }
		        else
		        	$scope.prodMoto.ctgMotoImg.push({idProdMoto: $scope.newImagen.referencia, id: respuesta[0], image:respuesta[1]});
	        	$scope.successMessages = [ $scope.resp.msg ];
	       }, function(result) {
	            if ((result.status == 409) || (result.status == 400)) {
	                $scope.errors = result.data;
	            } else {
	                $scope.errorMessages = [ 'Error desconocido de servidor' ];
	            }
	        });
	        
	    };
	    
	    $scope.deleteImgPrd = function(index, id) {
	    	$scope.newImagen.accion="delete_ctg_prod_img";
	    	$scope.newImagen.id = id;
	        Inventario.deleteImgPrd($scope.newImagen, function(response) {
	        	$scope.resp = response.data.info[0];
	            $scope.successMessages = [ $scope.resp.msg ];
	       }, function(result) {
	            if ((result.status == 409) || (result.status == 400)) {
	                $scope.errors = result.data;
	            } else {
	                $scope.errorMessages = [ 'Error desconocido de servidor' ];
	            }
	        });
	        $scope.prodMoto.ctgMotoImg.splice(index,1);
	        if ($scope.prodMoto.ctgMotoImg[0]==null)
	        	$scope.prodMoto.ctgMotoImg = [{}];
	    };	
};

function ProdMotoTableCtrl($scope, $rootScope, $state, $compile, $window, $stateParams, $location,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, ProdMoto, Marca, Modelo, Estilo, URL_API) {
	var vm = this;

		$scope.message = '';
		$scope.prods = {};
		$scope.ctg_almacenes = {};
		$scope.total_rows = 0;
		$scope.msg_total_rows = "";
		$scope.newBusquedaInventario = {chasis:"", desc: "", id_marca:"", id_modelo:"", cantidad_maxima_a_mostrar:99999, listInventario:"S"};
		
		$scope.reset = function() {
	    	// Sets the form to it's pristine state
	        if($scope.regForm) {
	            $scope.regForm.$setPristine();
	        }
			$scope.isVisibleAfterInventario = false;
			$scope.formType = "PRODUCTOS";
			$scope.newBusquedaInventario = {chasis:"", desc: "", id_marca:"", id_modelo:"", cantidad_maxima_a_mostrar:99999, listInventario:"S"};
			$scope.findAll();
	    };
	    
		$scope.resetMoto = function() {
			$scope.newBusquedaInventario = {chasis:"", desc: "", id_marca:"", id_modelo:"", cantidad_maxima_a_mostrar:99999, listInventario:"S"};
			$scope.busquedaFiltro();
	    };

		$scope.findAll = function(){
			$scope.msg_total_rows = "";
			ProdMoto.findAll($scope.newBusquedaInventario, function(response){
				if (response.data.status==1){
				$scope.prodMoto = response.data.info;
				//$scope.ctg_almacenes = response.data.info[0].ctg_almacen;
				$scope.total_rows = response.data.info[0].total_rows;
				}
				if (response.data.info.length>$scope.newBusquedaInventario.cantidad_maxima_a_mostrar-1)
					$scope.msg_total_rows = "Se muestran "+$scope.newBusquedaInventario.cantidad_maxima_a_mostrar+" resultados de "+$scope.total_rows+". Favor especifique mas criterios de busqueda";
			});
		};
		$scope.findAll();		
		
		
		$scope.marcas = {};
		$scope.listMarcas = function() {
			Marca.findAll(function(response){
				if (response.data.status==1){
				$scope.marcas = response.data.info;
				}

			});
		};
		$scope.listMarcas();
		
		$scope.modelos = null;
		$scope.listModelos = function() {
			$scope.modelos = null;
			
			$scope.newBusquedaInventario.id_modelo = "";
			if ($scope.newBusquedaInventario.id_marca==null) $scope.newBusquedaInventario.id_marca = "";
			if ($scope.newBusquedaInventario.id_modelo==null) $scope.newBusquedaInventario.id_modelo = "";
			if ($scope.newBusquedaInventario.id_marca != "") {
				Modelo.findById($scope.newBusquedaInventario.id_marca, $scope.newBusquedaInventario.id_modelo, function(response){
					if (response.data.status==1)
					$scope.modelos = response.data.info;
				});
			}
		};
		
		$scope.busquedaFiltro = function(){
			$scope.prodMoto = {};
			document.getElementById("busquedaMoto").disabled = true;
			document.getElementById("resetMoto").disabled = true;
			document.getElementById("loadingMoto").style.display = "";
			$scope.newBusquedaInventario.listInventario = "N";
			$scope.newBusquedaInventario.cantidad_maxima_a_mostrar = 99999;
			$scope.msg_total_rows = "";
			ProdMoto.busquedaFiltro($scope.newBusquedaInventario, function(response){
				if (response.data.status==1){
				$scope.prodMoto = response.data.info;
				//$scope.ctg_almacenes = response.data.info[0].ctg_almacen;
				$scope.total_rows = response.data.info[0].total_rows;
				}
				if (response.data.info.length>$scope.newBusquedaInventario.cantidad_maxima_a_mostrar-1)
					$scope.msg_total_rows = "Se muestran "+$scope.newBusquedaInventario.cantidad_maxima_a_mostrar+" resultados de "+$scope.total_rows+". Favor especifique mas criterios de busqueda";
				document.getElementById("busquedaMoto").disabled = false;
				document.getElementById("resetMoto").disabled = false;
				document.getElementById("loadingMoto").style.display = "none";
			});
		};
		
		$scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withLanguage($rootScope.globals.language)
						   .withBootstrap().withOption('processing', true).withOption('deferRender', true);
		
		$scope.dtColumnDefs = [
	        DTColumnDefBuilder.newColumnDef(0),
	        DTColumnDefBuilder.newColumnDef(1),
	        DTColumnDefBuilder.newColumnDef(2),
	        DTColumnDefBuilder.newColumnDef(3),
	        DTColumnDefBuilder.newColumnDef(4),
	        DTColumnDefBuilder.newColumnDef(5),
	        DTColumnDefBuilder.newColumnDef(6),
	        DTColumnDefBuilder.newColumnDef(7),
	        DTColumnDefBuilder.newColumnDef(8),
	        DTColumnDefBuilder.newColumnDef(9),
	        DTColumnDefBuilder.newColumnDef(10).notSortable()
	        
	        
	    ];
		
		vm.deleteProdMoto = deleteProdMoto;
		vm.editProdMoto = editProdMoto;
		vm.activateProdMoto = activateProdMoto;
		vm.tabsDetalleM = tabsDetalleM;

		
		function reloadData() {
			$scope.msg_total_rows = "";
			ProdMoto.findAll($scope.newBusquedaInventario, function(response){
				if (response.data.status==1){
				$scope.prodMoto = response.data.info;
				//$scope.ctg_almacenes = response.data.info[0].ctg_almacen;
				$scope.total_rows = response.data.info[0].total_rows;
				}
				if (response.data.info.length>$scope.newBusquedaInventario.cantidad_maxima_a_mostrar-1)
					$scope.msg_total_rows = "Se muestran "+$scope.newBusquedaInventario.cantidad_maxima_a_mostrar+" resultados de "+$scope.total_rows+". Favor especifique mas criterios de busqueda";
			});
		};
		
	  
		
		function deleteProdMoto(prodMotoId) {

			if (popupService.showPopup('Esta seguro de borrar este registro?')) {
				ProdMoto.borrar(prodMotoId, $rootScope.globals.currentUser.username,
						function(response) {
							reloadData();
						});

			}
		}
		;
		
		function activateProdMoto(prodMotoId) {

			ProdMoto.activar(prodMotoId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					
					});

	}
	;

		function editProdMoto(prodMotoId) {

			$state.go('menuMaster.editProdMoto', {
				idProdMoto : prodMotoId
			});

		}
		;
		

		function imgProdMoto(prodMotoId) {

			$state.go('menuMaster.imgProdMoto', {
				idProdMoto : prodMotoId
			});

		}
		;

		  function tabsDetalleM(prodMotoId) {
		    	var habilitarMenu = $location.search().habilitarMenu==null||$location.search().habilitarMenu=='undefined'?"S":$location.search().habilitarMenu;
		    	var habilitarMenuWin = $stateParams.habilitarMenu;
		    	if (habilitarMenuWin=='N') habilitarMenu = habilitarMenuWin;
		    	$state.go(
					'menuMaster.tabsDetalleM', {
						idProdMoto: prodMotoId,
						habilitarMenu: habilitarMenu
					});
		    };
		    
		    
		    $scope.listProdMoto = function() {
		    	
		    	$state.go('menuMaster.listProdMoto');
		    };
		    
	};

// PRODUCTO
function ProdAddCtrl(URL_API, $rootScope, Inventario, $stateParams, $scope, $filter, $http, $state, Prod, TipoProd, Prov, Estilo, Marca
	, Almacen, Modelo, Categoria, Parametro, TipoOpr, Cuenta) {

	$scope.formType = 'ADD';
	$scope.isService=true;
	
	$scope.months = [
		{"id":"01","descripcion": "Enero"},
		{"id":"02","descripcion": "Febrero"},
		{"id":"03","descripcion": "Marzo"},
		{"id":"04","descripcion": "Abril"},
		{"id":"05","descripcion": "Mayo"},
		{"id":"06","descripcion": "Junio"},
		{"id":"07","descripcion": "Julio"},
		{"id":"08","descripcion": "Agosto"},
		{"id":"09","descripcion": "Septiembre"},
		{"id":"10","descripcion": "Octubre"},
		{"id":"11","descripcion": "Noviembre"},
		{"id":"12","descripcion": "Diciembre"},
	];

	$scope.isNew = function(value) {
		//console.log(value);
		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {
    	// Sets the form to it's pristine state
        if($scope.regForm) {
            $scope.regForm.$setPristine();
        }

		var date = new Date();	
	
		$scope.newProd = {
			id : "", codigo:"", descripcion : "", id_modelo : "", id_marca : "", id_estilo : "", id_tipo_producto : "", id_categoria : "",  id_almacen : '1',
			usuario : $rootScope.globals.currentUser.username, id_empresa: $rootScope.globals.currentUser.id_empresa,
			descripcion_corta:"", servicio:"", suspendido:"0"
			, stock:"0", stock_minimo:"0", precio1:"0.00", utilidad1:"0.00", utilidad2:"0.00"
			, costo_compra:"0.00", costo_fob:"0.00", costo_contable:"0.00", ultimo_costo_s_impuesto:"0.00", ultimo_costo_c_impuesto:"0.00"
			, precio2:"0.00", utilidad3:"0.00", precio3:"0.00", OEM:""
			, costo_prom_c_impuesto:"0.00", costo_prom_s_impuesto:"0.00", costo_anterior_c_impuesto:"0.00"
			, porc_comision:"0.00"
			, tiempo_ejecucion:"0"
			//datos de búsqueda de PO
			, fecha_desde:"", fecha_hasta:"", id_po:""
			//datos para la búsqueda de Kardex
			, fecha_desde_kardex:"", fecha_hasta_kardex:"", id_almacen_kardex:"", id_operacion_kardex:"", entrada_kardex:0, salida_kardex:0
			, idprov:""
			
		};	

		$scope.newProdDetalle ={

			id: ""
			, id_almacen : "1"
			, id_empresa: $rootScope.globals.currentUser.id_empresa
			, fecha_recepcion: date
			, id_prov: ""
			, usuario : $rootScope.globals.currentUser.username	
		};
		
		$scope.clearMessages();
	
	};
		
	$scope.registerProd = function() {
		$scope.clearMessages();
	
		$scope.resp = [{}];
		//console.log($rootScope.globals.currentUser.ctg_almacen[0].id);
		$scope.newProd.id_almacen = $rootScope.globals.currentUser.ctg_almacen[0].id;
		
		Prod.insertar($scope.newProd, function(response) {

			var msg = 'Operacion realizada correctamente';
			if (response.data.status==1) {
				$scope.resp = response.data.info[0];
				
				$scope.newProdDetalle.id = $scope.resp.id_producto;
				$scope.newProdDetalle.id_prov = $scope.newProd.id_prov;
				$scope.newProdDetalle.fecha_recepcion = $scope.newProd.fecha_recepcion;
				$scope.newProdDetalle.id_almacen = $scope.newProd.id_almacen;
				//console.log($scope.newProdDetalle);
				$scope.newProd.id = $scope.resp.id_producto;

				$scope.id_producto = $scope.resp.id_producto;

				//TODO: REVISAR QUE HACE ESTO
				//$scope.registerAjusteComplemento();
				
				Swal.fire({
					//toast:true,
					position: 'center',
					type: 'success',
					title: "Producto Almacenado exitosamente",
					showConfirmButton: false,
					timer: 2000
				})
				
				$state.go('menuMaster.listProd');
			}
			else {
				msg = $scope.resp.msg;
				Swal.fire({
					toast:true,
					position: 'top-end',
					type: 'success',
					title: msg,
					showConfirmButton: false,
					timer: 1000
				})
			}
						
			$scope.successMessages = [ msg ];
			
			//actualizar el kardex
			/*
			Kardex.insertar($scope.newKardex, function(response) {
				
				$scope.successMessages = [ 'Kardex registrado correctamente' ];
				
			}
			//*/

		}, function(result) {

			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
		});	
		
	};

	$scope.registerAjusteComplemento = function() {
		$scope.resp = [{}];
		Prod.insertarDetalle($scope.newProd, $scope.newProdDetalle,function(response) {
			var msg = 'Operacion realizada correctamente';
			if (response.data.status==1) {
				$scope.resp = response.data.info[0];
			}
			else {
				msg = $scope.resp.msg;
			}
			$scope.newProd.id = $scope.resp.id_producto;
			$scope.id_producto = $scope.resp.id_producto;

			//$scope.successMessages = [ 'Producto Registrado correctamente' ];
			Swal.fire({
				toast:true,
				position: 'top-end',
				type: 'success',
				title: response.data.info[0].msg,
				showConfirmButton: false,
				timer: 1000
			})

		}, function(result) {

			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}

		});
		
		$state.go('menuMaster.editProd', {
			idProd : $scope.id_producto,
			idEmpresa : $rootScope.globals.currentUser.id_empresa,
		});

	};

	$scope.reset();
	
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
	
	/*CATALOGOS*/
	$scope.loadTipoProd = function() {
		TipoProd.findAllA(function(response) {
			if (response.data.status==1){
			$scope.tipoProd = response.data.info;
			}
		});
	};
	
	$scope.loadTipoProd();
	
	$scope.loadMarca = function() {
		Marca.findAllA(function(response) {
			if (response.data.status==1){
				$scope.marca = response.data.info;
			}
		});
	};

	$scope.loadMarca();

	$scope.loadProv = function() {
		Prov.findAllA(function(response) {
			if (response.data.status==1){
				$scope.proveedor = response.data.info;
			}
			else{
				$scope.proveedor=[];
			}
		});
	};

	$scope.loadProv();
	
	$scope.loadCategoria = function() {
		excluir = "1";
		Categoria.findAllA(excluir, function(response) {
			if (response.data.status==1){
			$scope.categoria = response.data.info;
			}
		});
	};

	$scope.loadCategoria();
	
	$scope.loadEstilo = function() {
		Estilo.findAllA(function(response) {
			if (response.data.status==1){
			$scope.estilo = response.data.info;
			}
		});
	};

	//$scope.loadEstilo();

	$scope.loadAlmacen = function() {	
		Almacen.findAllByEmpresaIdA($rootScope.globals.currentUser.id_empresa, function(response) {
			if (response.data.status==1){
				$scope.almacen = response.data.info;
			}
		});
	};

	$scope.loadAlmacen();

	$scope.updateModelo = function(){
	  	var marca = 0;
	  	
	  	$scope.modelo = null;
	  	
		$scope.newProd.id_modelo = "";
		if ($scope.newProd.id_marca=="") {
			$scope.newProd.id_modelo = null;
		}
	  	
	  //	if ($scope.newProd.id_modelo==null) $scope.newProd.id_modelo = "";
	  //	if ($scope.newProd.id_marca==null) $scope.newProd.id_marca = "";
	  	
	  	
	  	if ($scope.newProd.id_marca == null){
	  		marca = 0;
	  	}else{
	  		marca = $scope.newProd.id_marca;
	  	}
	  	
		Modelo.findByIdMarca(marca, function(response) {
			if (response.data.status==1){
				$scope.modelo = response.data.info;
				delete $scope.modelo.id;
			}
			else{
				$scope.modelo = {};
			}
		});
		
		/*
    	$http.get(URL_API + '/servicios/ctg/ctg_modelo.php?accion=C&idmarca=' + marca).
        then(function(response) {
			if (response.data.status==1){
        	$scope.modelo = response.data.info;
			delete $scope.modelo.id;
			}
        });//*/
    	
	};
	
	/*carga de tipo de operacion*/
	$scope.loadTipoOperacion = function() {
		//console.log("entre...");
		TipoOpr.findAllA(function(response) {
			if (response.data.status==1) $scope.tipoOprs = response.data.info;
			else $scope.tipoOprs =[];
		});
	};
	
	$scope.loadTipoOperacion();
	
	//CONTABILIDAD
	$scope.loadCuentaActivo = function() {
		var elemento = 1;
		
		$scope.newProd.id_cuenta = "";
		$scope.cuenta_activo = [];
		Cuenta.findByIdElemento(elemento, function(response) {
			//console.log(response);
			if (response.status==1){
				$scope.cuenta_activo = response.info;
			}
			else $scope.cuenta_activo = [];
		});
	};
	$scope.loadCuentaActivo();
	
	$scope.loadCuentaPasivo = function() {
		var elemento = 4;
		
		//console.log($scope.newProd);
		
		$scope.newProd.id_cuenta = "";
		$scope.cuenta_pasivo = [];
		Cuenta.findByIdElemento3(elemento, "COSTOS", function(response) {
			if (response.status==1){
				$scope.cuenta_pasivo = response.info;
			}
			else $scope.cuenta_pasivo = [];
		});
	};
	$scope.loadCuentaPasivo();
	
	//load margen precio
	$scope.loadMargenPrecio = function() {	
		Parametro.findMargenPrecio($rootScope.globals.currentUser.id_empresa, function(response) {
			if (response.data.status==1){
				$scope.newProd.utilidad1 = response.data.info[0].valor2;
			}
		});
	};

	$scope.loadMargenPrecio();
	
	$scope.updatePrecio = function(){
		
	  	$scope.newProd.precio1 = (Number($scope.newProd.costo_contable) * (1+(Number($scope.newProd.utilidad1)/100))).toFixed(2);
	};
	
	$scope.updateUtilidad = function(){
		
		$scope.newProd.utilidad1 = Number(((Number($scope.newProd.precio1)/Number($scope.newProd.costo_contable))-1)*100).toFixed(2);
	};
	
	$scope.hideServices = function(){
		if($scope.newProd.servicio==1) $scope.isService=false;
		else $scope.isService=true;
	};
	
	$scope.updatePrecio2 = function(){
		
	  	$scope.newProd.precio2 = (Number($scope.newProd.costo_contable) * (1+(Number($scope.newProd.utilidad2)/100))).toFixed(2);
	};
};

function ProdEditCtrl(URL_API, $rootScope, $scope, $filter, $state, $stateParams, DTOptionsBuilder, DTColumnDefBuilder
, Inventario, Prod, Prov, TipoProd, Marca, Estilo, Modelo, Almacen, Categoria, PO, TipoOpr, Kardex, Parametro, Cuenta) {
	$scope.formType = 'UPD';
	$scope.isService=true;
	
	$scope.isNew = function(value) {
		//console.log(value);
		if (value == 'ADD')
			return true;
		else
			return false;
	};
	$scope.updateProd = function() {
		
		 //$scope.newImagen = {};
			
		    	// Sets the form to it's pristine state
		        if($scope.regForm) {
		            $scope.regForm.$setPristine();
		        }
				$scope.isVisibleAfterInventario = false;
				$scope.formType = "ADD";
				//$scope.newImagen = {accion: "", tabla: "ctg_prod_img", campo: "image", referencia:"", id:""};
		
			
		var date = new Date();
		var ProdObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newProd.usuario = ProdObj.usuario;
		$scope.newProd.id_empresa = $rootScope.globals.currentUser.id_empresa;

		Prod.actualizar($scope.newProd, function(response) {
			$scope.successMessages = [ 'Producto Actualizado correctamente' ];

			//actualizar el inventario en la bodega principal
			var newInventario = {
				id: {id_empresa : $scope.newProd.id_empresa, id_almacen : 1/*por defecto a la casa matriz*/, id_prod : $scope.newProd.id, id_prov : $scope.newProd.id_prov},
				stock : $scope.newProd.stock,
				stock_pedido : 0,
				stock_in_transit : 0,
				estado : "A",
				usuario : $rootScope.globals.currentUser.username
			};
		
			Inventario.actualizar(newInventario, function(response){
				
				//se actualizó el inventario
				//console.log(response.data.status);
				Swal.fire({
					toast:true,
					position: 'top-end',
					type: 'success',
					title: "Producto actualizado existosamente",
					showConfirmButton: false,
					timer: 1000
				})
			});
			//*/
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}

		});
		////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listProd');

	};
	
	
	$scope.newProd = {};
	$scope.prodId='';
	$scope.ctgImg = {};
	$scope.modelo = {};
	
	//$scope.newImagen = {accion: "", tabla: "ctg_prod_img", campo: "image", referencia:"", id:""};
	$scope.setData = function(id_almacen, id_prod){
		$scope.newProd.id_almacen = id_almacen;
	}
	
	$scope.loadProd = function() {
		Prod.findById($stateParams.idEmpresa, $stateParams.idProd, function(response) {
			if (response.data.status==1){
				$scope.newProd = response.data.info[0];
				
				//console.log(response.data.info[0]);
				
				$scope.newProd.id_categoria = response.data.info[0].id.id_categoria;
				$scope.newProd.id_tipo_producto = response.data.info[0].id.id_tipo_producto;
				$scope.newProd.id_estilo = response.data.info[0].id.id_estilo;
				
				$scope.newProd.id_marca = response.data.info[0].id.id_marca;
								
				$scope.updateModelo();
				$scope.newProd.id_modelo = response.data.info[0].id.id_modelo;			
				$scope.newProd.id = response.data.info[0].id.id;
				$scope.newProd.ctgImg =  response.data.info[0].ctgImg;
				$scope.newProd.id_almacen ='1';
				$scope.newProd.id_empresa = $rootScope.globals.currentUser.id_empresa;
				$scope.listProvs();
				
				$scope.loadMargenPrecio();
				
				$scope.loadCuentaActivo();
				$scope.loadCuentaPasivo();
				$scope.listProductTienda();
				
				$scope.hideServices();
				
				if($scope.newProd.estado=='A'){
					$scope.newProd.estado = true;
				}
			}		
		});
	};
	$scope.loadProd();
	
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
	
	$scope.loadTipoProd = function() {
		TipoProd.findAllA(function(response) {
			if (response.data.status==1){
				$scope.tipoProd = response.data.info;
			}
			else $scope.tipoProd = [];
		});
	};
	$scope.loadTipoProd();
	
	$scope.loadMarca = function() {
		Marca.findAllA(function(response) {
			if (response.data.status==1){
				$scope.marca = response.data.info;
			}
			else $scope.marca = [];
		});
	};
	$scope.loadMarca();
	
	$scope.loadModelo = function() {
		Modelo.findAllA(function(response) {
			if (response.data.status==1){
				$scope.modelo = response.data.info;
			}
			else $scope.modelo = [];
		});
	};
	//$scope.loadModelo();
	
	$scope.loadCategoria = function() {
		Categoria.findAllA("", function(response) {
			if (response.data.status==1){
				$scope.categoria = response.data.info;
			}
			else $scope.categoria = [];
		});
	};
	$scope.loadCategoria();
	
	/*
	$scope.loadEstilo = function() {
		Estilo.findAll(function(response) {
			if (response.data.status==1){
			$scope.estilo = response.data.info;
			}
		});
	};
	$scope.loadEstilo();
	//*/
	
	$scope.loadProv = function() {
		Prov.findAllA(function(response) {
			if (response.data.status==1){
				$scope.proveedor = response.data.info;
			}
			else $scope.proveedor = [];
		});
	};
	$scope.loadProv();
	
	/*$scope.guardarCuenta = function() {
		$scope.newProd.usuario = $rootScope.globals.currentUser.username;
		//console.log($scope.newProd);
		
		Inventario.actualizarCuenta($scope.newProd, function(response) {
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro actualizado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$scope.listProductTienda();
			$('#myCuentaModal').modal('hide');
		});
	};//*/
	
	$scope.loadCuentaActivo = function() {
		var elemento = 1;
		
		$scope.newProd.id_cuenta = "";
		$scope.cuenta_activo = [];
		Cuenta.findByIdElemento(elemento, function(response) {
			//console.log(response);
			if (response.status==1){
				$scope.cuenta_activo = response.info;
			}
			else $scope.cuenta_activo = [];
		});
	};
	
	$scope.loadCuentaPasivo = function() {
		var elemento = 4;
		
		//console.log($scope.newProd);
		
		$scope.newProd.id_cuenta = "";
		$scope.cuenta_pasivo = [];
		Cuenta.findByIdElemento(elemento, function(response) {
			if (response.status==1){
				$scope.cuenta_pasivo = response.info;
			}
			else $scope.cuenta_pasivo = [];
		});
	};
	//*/

	$scope.loadAlmacen = function() {
		Almacen.findAllByEmpresaIdA($rootScope.globals.currentUser.id_empresa, function(response) {
			if (response.data.status==1){
				$scope.almacen = response.data.info;
			}
			else $scope.almacen = [];
		});
	};
	$scope.loadAlmacen();

	$scope.updateModelo = function(){
		  	
		 var marca = 0;
		 
		 $scope.modelo = null;
		  	
			  $scope.newProd.id_modelo = "";
			  
			  if ($scope.newProd.id_marca==null) $scope.newProd.id_modelo = null;
		  	
		  	//if ($scope.newProd.id_modelo==null) $scope.newProd.id_modelo = null;
		  //	if ($scope.newProd.id_marca==null) $scope.newProd.id_marca = "";
		  	
		  	if ($scope.newProd.id_marca == null){
		  		marca = 0;
		  	}else{
		  		marca = $scope.newProd.id_marca;
		  	}
		  	
			Modelo.findByIdMarca(marca, function(response) {
				if (response.data.status==1){
					$scope.modelo = response.data.info;
					delete $scope.modelo.id;
				}
	        });	    	
	    };
	
	/*carga de tipo de operacion*/
	$scope.loadTipoOperacion = function() {
		//console.log("entre...");
		TipoOpr.findAllA(function(response) {
			if (response.data.status==1) $scope.tipoOprs = response.data.info;
			else $scope.tipoOprs =[];
		});
	};
	
	$scope.loadTipoOperacion();
	
	/*subir archivos de imagen*/
	/*$scope.id_referencia = function(){
		Inventario.findByProdId($rootScope.globals.currentUser.id_empresa, $stateParams.idProd, function(response){
			if (response.data.status==1) {
				$scope.detalleProducto = response.data.info[0];
				$rootScope.descripcion_producto = $scope.detalleProducto.ctg_producto.descripcion;
				$scope.ProductProvs = $scope.detalleProducto.prc_prod_prov;
				
				var id = $scope.detalleProducto.ctg_producto.ctg_prod_img[0]!=null?$scope.detalleProducto.ctg_producto.ctg_prod_img.id:"";
							}
			}
		);
		}
		$scope.id_referencia();*/

	$scope.newImagen = {accion: "", tabla: "ctg_prod_img", campo: "id_prod", referencia: $stateParams.idProd, id: ""};	

	$scope.uploadFile = function(files) {
		$scope.newImagen.accion="i";
		var respuesta = "";			

		Inventario.uploadFiles(files, $scope.newImagen, function(response) {
			$scope.resp = response.data.info[0];
			var respuesta = response.data.info.split("|");
			if ($scope.newProd.ctgImg[0]==null && ($scope.newProd.ctgImg.length==1)) {
				$scope.newProd.ctgImg = [{}];
				$scope.newProd.ctgImg[0]=({id_prod: $scope.newImagen.referencia, id: respuesta[0], image:respuesta[1]});
			}
			else
	
			$scope.newProd.ctgImg.unshift({id_prod: $scope.newImagen.referencia, id: respuesta[0], image:respuesta[1]});

			$scope.successMessages = [ $scope.resp.msg ];
	   }, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Error desconocido de servidor' ];
			}
		});
		
	};
		
	$scope.deleteImgPrd = function(index, id) {
		$scope.newImagen.accion="delete_ctg_prod_img";
		$scope.newImagen.id = id;
		Inventario.deleteImgPrd($scope.newImagen, function(response) {
			$scope.resp = response.data.info[0];
			$scope.successMessages = [ $scope.resp.msg ];
	   }, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Error desconocido de servidor' ];
			}
		});
		$scope.newProd.ctgImg.splice(index,1);
		if ($scope.newProd.ctgImg[0]==null)
			$scope.newProd.ctgImg = [{}];
	};
		
		
	/*INFORMACION DE ORDENES DE COMPRA*/
	$scope.dtOptionsOrdenes = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withOption('order', [[6, 'desc']]).withLanguage($rootScope.globals.language);
	$scope.dtColumnDefsOrdenes = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4),
        DTColumnDefBuilder.newColumnDef(5),
        DTColumnDefBuilder.newColumnDef(6)
    ];
	$scope.listPOHistDetail = function() {
    	
    	$scope.precio_acumulado = 0;
    	$scope.qty_acumulado = 0;
    	$scope.costo_acumulado = 0;
    	$scope.costo_extendido_acumulado = 0;
		$scope.costo_compra_acumulado = 0;
    	
    	var id_empresa = $rootScope.globals.currentUser.id_empresa;
    	var id_prod = $scope.newProd.id; //$stateParams.id_prod;
    	var fecha_desde = $scope.newProd.fecha_desde==undefined?"":$scope.newProd.fecha_desde;
    	var fecha_hasta = $scope.newProd.fecha_hasta==undefined?"":$scope.newProd.fecha_hasta;
		var id_po = $scope.newProd.id_po==undefined?"":$scope.newProd.id_po;
		var id_tipo_orden = 2;
		var id_tipo_inventario = 1;
    	
		PO.findPOHistDetailProd(id_empresa, id_prod, fecha_desde, fecha_hasta, id_po, id_tipo_orden, id_tipo_inventario, function(response){
			if (response.data.status==1) {
				$scope.POHistDetails = response.data.info;
				//console.log($scope.POHistDetails);
				for (i=0; i<$scope.POHistDetails.length; i++) {
					$scope.precio_acumulado += Number($scope.POHistDetails[i].precio);
					$scope.qty_acumulado += Number($scope.POHistDetails[i].qty);
					$scope.costo_acumulado += Number($scope.POHistDetails[i].costo);
					$scope.costo_extendido_acumulado += Number($scope.POHistDetails[i].costo_extendido);
					$scope.costo_compra_acumulado += Number($scope.POHistDetails[i].costo_compra);
				}
			}
			else{
				$scope.POHistDetails = [];
			}
		});
		//*/
	};
	
	$scope.resetFilterPO = function() {
    	$scope.newProd.fecha_desde = "";
    	$scope.newProd.fecha_hasta = "";
    	$scope.newProd.id_po = "";
	};
	
	/*INFORMACION DE KARDEX*/
	$scope.dtOptionsKardex = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withOption('order', [[2, 'desc']]).withLanguage($rootScope.globals.language);
	$scope.dtColumnDefsKardex = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4),
        DTColumnDefBuilder.newColumnDef(5),
        DTColumnDefBuilder.newColumnDef(6),
        DTColumnDefBuilder.newColumnDef(7)
    ];
	$scope.findKardexHistDetailProd = function() {
		var id_empresa = $rootScope.globals.currentUser.id_empresa;
		var id_prod = $scope.newProd.id;
		var fecha_desde = $scope.newProd.fecha_desde_kardex==undefined?"":$scope.newProd.fecha_desde_kardex;
    	var fecha_hasta = $scope.newProd.fecha_hasta_kardex==undefined?"":$scope.newProd.fecha_hasta_kardex;
		
		var entrada = $scope.newProd.entrada_kardex;
    	var salida = $scope.newProd.salida_kardex;
    	
    	var tipo = "";
    	if (entrada==true) tipo = "E";
    	if (salida==true) tipo = "S";
    	if (entrada==true && salida==true) tipo = "";
    	
    	var id_operacion = $scope.newProd.id_operacion_kardex==null?"":$scope.newProd.id_operacion_kardex;
    	var id_almacen = $scope.newProd.id_almacen_kardex==null?"":$scope.newProd.id_almacen_kardex;
		
		Kardex.findKardexHistDetailProd(id_empresa, id_prod, fecha_desde, fecha_hasta, tipo, id_operacion, id_almacen, function(response){
			if (response.data.status==1){
				$scope.KardexHistDetailsProd = response.data.info;
				
			}
			else $scope.KardexHistDetailsProd = [];
			
			$scope.salida_acumulada = 0;
			$scope.entrada_acumulada = 0;
			$scope.precio_venta_total = 0;
			$scope.precio_exento_total = 0;
			for(var i =0; i<$scope.KardexHistDetailsProd.length;i++){
				
				if($scope.KardexHistDetailsProd[i].tipo=="Salida"){
					$scope.salida_acumulada += Number($scope.KardexHistDetailsProd[i].qty, 0);
				}
				else{
					$scope.KardexHistDetailsProd[i].qty = $scope.KardexHistDetailsProd[i].qty.replace(',', '');
					$scope.entrada_acumulada += Number($scope.KardexHistDetailsProd[i].qty, 0);
				}
				$scope.precio_venta_total += Number($scope.KardexHistDetailsProd[i].precio, 2);
				$scope.precio_exento_total += Number($scope.KardexHistDetailsProd[i].exento, 2);
			}
			/*
			if ($scope.KardexHistDetailsProd[$scope.KardexHistDetailsProd.length-1]!=null) {
				
				$scope.entrada_acumulada = $scope.KardexHistDetailsProd[$scope.KardexHistDetailsProd.length-1].entrada_acumulada;
				$scope.salida_acumulada = $scope.KardexHistDetailsProd[$scope.KardexHistDetailsProd.length-1].salida_acumulada;
				//$scope.saldo_acumulado = $scope.KardexHistDetailsProd[$scope.KardexHistDetailsProd.length-1].saldo_acumulado;
			}
			//*/
		});
	}

	$scope.resetFilterKardex = function() {
    	$scope.newProd.fecha_desde_kardex = "";
    	$scope.newProd.fecha_hasta_kardex = "";
    	$scope.newProd.id_almacen_kardex = "";
    	$scope.newProd.id_operacion_kardex = "";
    	$scope.newProd.entrada_kardex = 0;
    	$scope.newProd.salida_kardex = 0;
	};

	/*INFORMACION DE PROVEEDORES*/
	$scope.dtOptionsProveedores = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withOption('order', [[2, 'desc']]).withLanguage($rootScope.globals.language);
	$scope.dtColumnDefsProveedores = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4),
        DTColumnDefBuilder.newColumnDef(5),
        DTColumnDefBuilder.newColumnDef(6),
        DTColumnDefBuilder.newColumnDef(7)
    ];
	
	$scope.dtOptionsTienda = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withOption('order', [[0, 'desc']]).withLanguage($rootScope.globals.language);
	$scope.dtColumnDefsTienda = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4),
        DTColumnDefBuilder.newColumnDef(5),
        //DTColumnDefBuilder.newColumnDef(6),
        //DTColumnDefBuilder.newColumnDef(7)
    ];
	
	$scope.listProvs = function() {
		Prod.findAllProvByProd($scope.newProd.id, function(response){
			if(response.data.status==1) $scope.provs = response.data.info;
			else $scope.provs = [];
		});
	};
	
	$scope.months = [
		{"id":"01","descripcion": "Enero"},
		{"id":"02","descripcion": "Febrero"},
		{"id":"03","descripcion": "Marzo"},
		{"id":"04","descripcion": "Abril"},
		{"id":"05","descripcion": "Mayo"},
		{"id":"06","descripcion": "Junio"},
		{"id":"07","descripcion": "Julio"},
		{"id":"08","descripcion": "Agosto"},
		{"id":"09","descripcion": "Septiembre"},
		{"id":"10","descripcion": "Octubre"},
		{"id":"11","descripcion": "Noviembre"},
		{"id":"12","descripcion": "Diciembre"},
	];
	
	$scope.ProductProvs = [];
	$scope.listProductProvs = function() {
    	$scope.qty_buy_acumulado = 0;
    	$scope.qty_return_acumulado = 0;
    	$scope.stock_acumulado = 0;
    	$scope.stock_in_transit_acumulado = 0;
    	$scope.stock_pedido_acumulado = 0;
    	
    	var id_empresa = $rootScope.globals.currentUser.id_empresa;
		var id_prod = $scope.newProd.id;
    	var id_proveedor = $scope.newProd.id_proveedor==undefined?"":$scope.newProd.id_proveedor;
    	var year = $scope.newProd.year==undefined?"":$scope.newProd.year;
    	var month = $scope.newProd.month==null?"":$scope.newProd.month;
    	
		Inventario.listProvsProduct(id_empresa, id_prod, id_proveedor, year, month, function(response){
			if (response.data.status==1) {
				//$scope.detalleProducto = response.data.info[0];
				$scope.ProductProvs = response.data.info;
				//$scope.ProductProvs = $scope.detalleProducto.prc_prod_prov;
				
				$scope.qty_buy_acumulado = 0.00;
				$scope.qty_return_acumulado = 0.00;
				$scope.stock_acumulado = 0.00;
				$scope.stock_in_transit_acumulado = 0.00;
				$scope.stock_pedido_acumulado =0.00;
				//*/
				
				for(var i=0; i<$scope.ProductProvs.length; i++){
					$scope.qty_buy_acumulado += Number($scope.ProductProvs[i].qty_buy.replace(/,/g, ''));
					$scope.qty_return_acumulado += Number($scope.ProductProvs[i].qty_return.replace(/,/g, ''));
					$scope.stock_acumulado += Number($scope.ProductProvs[i].stock.replace(/,/g, ''));
					$scope.stock_in_transit_acumulado += Number($scope.ProductProvs[i].stock_in_transit.replace(/,/g, ''));
					$scope.stock_pedido_acumulado += Number($scope.ProductProvs[i].stock_pedido.replace(/,/g, ''));
				}//*/
				
				$scope.qty_buy_acumulado = $scope.qty_buy_acumulado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				$scope.qty_return_acumulado = $scope.qty_return_acumulado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				$scope.stock_acumulado = $scope.stock_acumulado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				$scope.stock_in_transit_acumulado = $scope.stock_in_transit_acumulado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				$scope.stock_pedido_acumulado = $scope.stock_pedido_acumulado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
			else{
				$scope.ProductProvs = [];
			}
		});
    };
	
	$scope.productTienda = [];
	$scope.listProductTienda = function() {
    	
    	var id_empresa = $rootScope.globals.currentUser.id_empresa;
		var id_prod = $scope.newProd.id;
    	
		Inventario.findTiendasById(id_empresa, id_prod, function(response){
			if (response.data.status==1) {
				$scope.productTienda = response.data.info;
			}
			else{
				$scope.productTienda = [];
			}
		});
    };

	$scope.resetFilterProvs = function() {
		//console.log("entre...");
    	$scope.newProd.month = "";
    	$scope.newProd.year = "";
    	$scope.newProd.id_proveedor = "";
	};
	
	//load margen precio
	$scope.loadMargenPrecio = function() {
		//console.log("Tiene: "+$scope.newProd.utilidad1);
		if($scope.newProd.utilidad1==0.00 || $scope.newProd.utilidad1== "undefined"){
			Parametro.findMargenPrecio($rootScope.globals.currentUser.id_empresa, function(response) {
				if (response.data.status==1){
					
					$scope.newProd.utilidad1 = response.data.info[0].valor2;
					//console.log("Coloco: "+$scope.newProd.utilidad1);
				}
			});
		}
	};

	//$scope.loadMargenPrecio();
	
	$scope.updatePrecio = function(){
		
	  	$scope.newProd.precio1 = (Number($scope.newProd.costo_contable) * (1+(Number($scope.newProd.utilidad1)/100))).toFixed(2);
	};
	
	$scope.updatePrecio2 = function(){
		
	  	$scope.newProd.precio2 = (Number($scope.newProd.costo_contable) * (1+(Number($scope.newProd.utilidad2)/100))).toFixed(2);
	};
	
	$scope.updateUtilidad = function(){
		
		$scope.newProd.utilidad1 = Number(((Number($scope.newProd.precio1)/Number($scope.newProd.costo_contable))-1)*100).toFixed(2);
	};
	
	$scope.hideServices = function(){
		if($scope.newProd.servicio==1) $scope.isService=false;
		else $scope.isService=true;
	};
};
/*	
function ProdTabsCtrl($rootScope, $scope, $filter, $state, $stateParams, $location, Inventario, Prov, Prod, DTOptionsBuilder){

    $('.tabgroup > div').hide();
    $('.tabgroup > div:first-of-type').show();
    $('.tabs a').click(function(e){
      e.preventDefault();
        var $this = $(this),
            tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();
      
    });   
 
    $scope.prod = {};
	$scope.prodId='';
	$scope.ctgImg = {};
	
	$scope.loadDetalleProducto = function() {
	    
    	$scope.ProdId=$stateParams.idProd; 
    	
    	Prod.findById($stateParams.idProd, function(response){
			if (response.data.status==1){
			$scope.prod = response.data.info[0];
			$rootScope.descripcion_producto = $scope.prod.descripcion;
			var id = $scope.prod.ctgImg!=null?$scope.prod.ctgImg.id:"";
			$scope.newImagen = {accion: "", tabla: "ctg_prod_img", campo: "id_prod", referencia: $scope.prod.id.id, id: id} 
		};
		});
	};
	$scope.loadDetalleProducto();	
	
	$scope.uploadFile = function(files) {
		$scope.newImagen.accion="i";
		var respuesta = "";
		Inventario.uploadFile(files, $scope.newImagen, function(response) {
			$scope.resp = response.data.info[0];
			var respuesta = response.data.info.split("|");
			if ($scope.prod.ctgImg[0]==null && ($scope.prod.ctgImg.length==1)) {
				$scope.prod.ctgImg = [{}];
				$scope.prod.ctgImg [0]=({idProd: $scope.newImagen.referencia, id: respuesta[0], image:respuesta[1]});
			}
			else
				$scope.prod.ctgImg.push({idProd: $scope.newImagen.referencia, id: respuesta[0], image:respuesta[1]});
			$scope.successMessages = [ $scope.resp.msg ];
	   }, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Error desconocido de servidor' ];
			}
		});	        
	};
	    
	$scope.deleteImgPrd = function(index, id) {
		$scope.newImagen.accion="delete_ctg_prod_img";
		$scope.newImagen.id = id;
		Inventario.deleteImgPrd($scope.newImagen, function(response) {
			$scope.resp = response.data.info[0];
			$scope.successMessages = [ $scope.resp.msg ];
	   }, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Error desconocido de servidor' ];
			}
		});
		$scope.prod.ctgImg.splice(index,1);
		if ($scope.prod.ctgImg[0]==null)
			$scope.prod.ctgImg = [{}];
	};
    
};
*/
function ImgProdCtrl($rootScope, $scope, $filter, $state, $stateParams, $location, Prod, ProdImg){

	$scope.prodImg= {};
	$scope.prodId='';
	
	$scope.loadProdImg = function() {
	    
    	$scope.ProdId=$stateParams.idProd;
    	   
    	
		Prod.findImgByProdId($stateParams.idProd, function(response){
			$scope.prodImg = response.data.info[0];				
		
		});
	};
	$scope.loadProdImg();
	
};

function ProdTabsCtrl($rootScope, $scope, $filter, $state, $stateParams, $location, Inventario, Prov, DTOptionsBuilder, DTColumnDefBuilder){
	/*
	$scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withLanguage($rootScope.globals.language)
										.withBootstrap().withOption('processing', true).withOption('deferRender', true).withOption('responsive', true)
										.withOption('paging', false).withOption('lengthChange', false);
	$scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3)
    ];
    
    $('.tabgroup > div').hide();
    $('.tabgroup > div:first-of-type').show();
    $('.tabs a').click(function(e){
      e.preventDefault();
        var $this = $(this),
            tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();
      
    });
    
    $scope.newInventario = {id_empresa:"",id_almacen:"",id_prod:"",stock:"",stock_in_transit:"",stock_pedido:"",
							id_prov:"",year:"",month:"",estado:"",usuario:$rootScope.globals.currentUser.username};
    
    $scope.provs = {};
	$scope.listProvs = function() {
		$scope.filtros = {estado: "A"};
		Prov.findAllByFilters($scope.filtros, function(response){
			$scope.provs = response.data.info;
		});
	};
	$scope.listProvs();
	
	$scope.months = [
		{"id":"01","descripcion": "Enero"},
		{"id":"02","descripcion": "Febrero"},
		{"id":"03","descripcion": "Marzo"},
		{"id":"04","descripcion": "Abril"},
		{"id":"05","descripcion": "Mayo"},
		{"id":"06","descripcion": "Junio"},
		{"id":"07","descripcion": "Julio"},
		{"id":"08","descripcion": "Agosto"},
		{"id":"09","descripcion": "Septiembre"},
		{"id":"10","descripcion": "Octubre"},
		{"id":"11","descripcion": "Noviembre"},
		{"id":"12","descripcion": "Diciembre"},
	];
    
	$scope.detalleProducto = {};
	$scope.id_empresa='';
	$scope.id_prod='';
	$scope.ProductProvs = [];
	
	$scope.loadDetalleProducto = function() {
    	$scope.id_empresa=$stateParams.id_empresa;
    	$scope.id_prod=$stateParams.idProd;
    	
    	$scope.fecha_desde="";
    	$scope.fecha_hasta="";
    	$scope.id_po="";
    	
		Inventario.findByProdId($stateParams.id_empresa, $stateParams.idProd, function(response){
			if (response.data.status==1) {
				$scope.detalleProducto = response.data.info[0];
				$rootScope.descripcion_producto = $scope.detalleProducto.ctg_producto.descripcion;
				$scope.ProductProvs = $scope.detalleProducto.prc_prod_prov;
				
				var id = $scope.detalleProducto.ctg_producto.ctg_prod_img!=null?$scope.detalleProducto.ctg_producto.ctg_prod_img.id:"";
				$scope.newImagen = {accion: "", tabla: "ctg_prod_img", campo: "id_prod", referencia: $scope.detalleProducto.ctg_producto.id, id: id};
				
				if ($scope.ProductProvs[$scope.ProductProvs.length-1]!=null) {
					$scope.qty_buy_acumulado = $scope.ProductProvs[$scope.ProductProvs.length-1].qty_buy_acumulado;
					$scope.qty_return_acumulado = $scope.ProductProvs[$scope.ProductProvs.length-1].qty_return_acumulado;
					$scope.stock_acumulado = $scope.ProductProvs[$scope.ProductProvs.length-1].stock_acumulado;
					$scope.stock_in_transit_acumulado = $scope.ProductProvs[$scope.ProductProvs.length-1].stock_in_transit_acumulado;
					$scope.stock_pedido_acumulado = $scope.ProductProvs[$scope.ProductProvs.length-1].stock_pedido_acumulado;
				}
			}
		});
	};
	$scope.loadDetalleProducto();
	
    $scope.listProductProvs = function() {
    	$scope.ProductProvs = [];
    	$scope.qty_buy_acumulado = 0;
    	$scope.qty_return_acumulado = 0;
    	$scope.stock_acumulado = 0;
    	$scope.stock_in_transit_acumulado = 0;
    	$scope.stock_pedido_acumulado = 0;
    	
    	var id_empresa = $scope.id_empresa;
    	var id_prod = $scope.id_prod;
    	var id_prov = $scope.newInventario.id_prov==null?"":$scope.newInventario.id_prov;
    	var year = $scope.newInventario.year;
    	var month = $scope.newInventario.month==null?"":$scope.newInventario.month;
    	
		Inventario.listProductProvs($stateParams.id_empresa, $stateParams.id_prod, id_prov, year, month, function(response){
			if (response.data.status==1) {
				$scope.detalleProducto = response.data.info[0];
				$scope.ProductProvs = $scope.detalleProducto.prc_prod_prov;
				
				if ($scope.ProductProvs[$scope.ProductProvs.length-1]!=null) {
					$scope.qty_buy_acumulado = $scope.ProductProvs[$scope.ProductProvs.length-1].qty_buy_acumulado;
					$scope.qty_return_acumulado = $scope.ProductProvs[$scope.ProductProvs.length-1].qty_return_acumulado;
					$scope.stock_acumulado = $scope.ProductProvs[$scope.ProductProvs.length-1].stock_acumulado;
					$scope.stock_in_transit_acumulado = $scope.ProductProvs[$scope.ProductProvs.length-1].stock_in_transit_acumulado;
					$scope.stock_pedido_acumulado = $scope.ProductProvs[$scope.ProductProvs.length-1].stock_pedido_acumulado;
				}
			}
		});
    };
    
	$scope.reset = function() {
    	// Sets the form to it's pristine state
        if($scope.regForm) {
            $scope.regForm.$setPristine();
        }
		$scope.isVisibleAfterInventario = false;
		$scope.formType = "PROVEEDORES";
        $scope.newInventario = {id_empresa:"",id_almacen:"",id_prod:"",stock:"",stock_in_transit:"",stock_pedido:"",id_prov:"",year:"",month:"",estado:"",usuario:$rootScope.globals.currentUser.username};
    };
    
    $scope.listInventario = function() {
    	var habilitarMenuWin = $stateParams.habilitarMenu;
    	$state.go('menuMaster.listInventarioTab', {
			habilitarMenu: habilitarMenuWin
		});
    };
    
    $scope.uploadFile = function(files) {
    	$scope.newImagen.accion="i";
    	var respuesta = "";
        Inventario.uploadFile(files, $scope.newImagen, function(response) {
        	$scope.resp = response.data.info[0];
			var respuesta = response.data.info.split("|");
	        if ($scope.detalleProducto.ctg_producto.ctg_prod_img[0]==null && ($scope.detalleProducto.ctg_producto.ctg_prod_img.length==1)) {
	        	$scope.detalleProducto.ctg_producto.ctg_prod_img = [{}];
	        	$scope.detalleProducto.ctg_producto.ctg_prod_img[0]=({id_prod: $scope.newImagen.referencia, id: respuesta[0], image:respuesta[1]});
	        }
	        else
	        	$scope.detalleProducto.ctg_producto.ctg_prod_img.push({id_prod: $scope.newImagen.referencia, id: respuesta[0], image:respuesta[1]});
        	$scope.successMessages = [ $scope.resp.msg ];
       }, function(result) {
            if ((result.status == 409) || (result.status == 400)) {
                $scope.errors = result.data;
            } else {
                $scope.errorMessages = [ 'Error desconocido de servidor' ];
            }
        });
        
    };
    
    $scope.deleteImgPrd = function(index, id) {
    	$scope.newImagen.accion="delete_ctg_prod_img";
    	$scope.newImagen.id = id;
        Inventario.deleteImgPrd($scope.newImagen, function(response) {
        	$scope.resp = response.data.info[0];
            $scope.successMessages = [ $scope.resp.msg ];
       }, function(result) {
            if ((result.status == 409) || (result.status == 400)) {
                $scope.errors = result.data;
            } else {
                $scope.errorMessages = [ 'Error desconocido de servidor' ];
            }
        });
        $scope.detalleProducto.ctg_producto.ctg_prod_img.splice(index,1);
        if ($scope.detalleProducto.ctg_producto.ctg_prod_img[0]==null)
        	$scope.detalleProducto.ctg_producto.ctg_prod_img = [{}];
	};
	
	$scope.isRolAdmin = function(){
		var resp = false;
		if ($rootScope.globals.currentUser.isRolAdmin=='S') {
			resp = true;
		}
		return resp;
	};
    
	//*/
};
	
function ProdTableCtrl($scope, $rootScope, $state, $stateParams, $compile, $window, Marca, Modelo, Cliente,  Almacen, Empleado, popupService, DTOptionsBuilder, DTColumnDefBuilder, Prod, TipoProd, $location, URL_API) {

	
	var vm = this;

	$scope.message = '';
	$scope.prods = {};
	$scope.ctg_almacenes = {};
	$scope.total_rows = 0;
	$scope.msg_total_rows = "";
	$scope.newBusquedaInventario = {codigo:"", desc: "", id_marca:"", id_modelo:"", cantidad_maxima_a_mostrar:99999, listInventario:"S", estado:"", id_empresa: $rootScope.globals.currentUser.id_empresa};
	
	$scope.reset = function() {
    	// Sets the form to it's pristine state
        if($scope.regForm) {
            $scope.regForm.$setPristine();
        }
		$scope.isVisibleAfterInventario = false;
		$scope.formType = "PRODUCTOS";
		$scope.newBusquedaInventario = {codigo:"", desc: "", id_marca:"", id_modelo:"", cantidad_maxima_a_mostrar:99999, listInventario:"S", estado:""};
		$scope.findAll();
    };
    
	$scope.resetProductos = function() {
		$scope.newBusquedaInventario = {codigo:"", desc: "", id_marca:"", id_modelo:"", cantidad_maxima_a_mostrar:99999, listInventario:"S", estado:""};
		//$scope.busquedaFiltro();
		$scope.prods = {};
    };

	$scope.findAll = function(){
		$scope.msg_total_rows = "";
		$scope.newBusquedaInventario.id_empresa = $rootScope.globals.currentUser.id_empresa;
		Prod.findAll($scope.newBusquedaInventario, function(response){
			if (response.data.status==1){
				$scope.prods = response.data.info;
				//$scope.ctg_almacenes = response.data.info[0].ctg_almacen;
				$scope.total_rows = response.data.info[0].total_rows;
			}
			/*if (response.data.info.length>$scope.newBusquedaInventario.cantidad_maxima_a_mostrar-1)
				$scope.msg_total_rows = "Se muestran "+$scope.newBusquedaInventario.cantidad_maxima_a_mostrar+" resultados de "+$scope.total_rows+". Favor especifique mas criterios de busqueda";*/
		});
	};
	//$scope.findAll();	
	
	$scope.marcas = {};
	$scope.listMarcas = function() {
		Marca.findAll(function(response){
			if (response.data.status==1){
			$scope.marcas = response.data.info;
			}
		});
	};
	$scope.listMarcas();
	
	$scope.modelos = null;
	$scope.listModelos = function() {		
		$scope.modelos = null;
		
		$scope.newBusquedaInventario.id_modelo = "";
		if ($scope.newBusquedaInventario.id_marca==null) $scope.newBusquedaInventario.id_marca = "";
		if ($scope.newBusquedaInventario.id_modelo==null) $scope.newBusquedaInventario.id_modelo = "";
		if ($scope.newBusquedaInventario.id_marca != "") {
			Modelo.findById($scope.newBusquedaInventario.id_marca, $scope.newBusquedaInventario.id_modelo, function(response){
				if (response.data.status==1)
				$scope.modelos = response.data.info;
			});
		}
	};
	
	
	$scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withLanguage($rootScope.globals.language)
					   .withBootstrap().withOption('processing', true).withOption('order', [[2, 'asc']]).withOption('deferRender', true);
	
	$scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4),
        DTColumnDefBuilder.newColumnDef(5),
        DTColumnDefBuilder.newColumnDef(6),
        DTColumnDefBuilder.newColumnDef(7),
        DTColumnDefBuilder.newColumnDef(8)
        
        
    ];
	
	$scope.busquedaFiltro = function(){
		//$scope.prods = {};
		document.getElementById("busquedaProd").disabled = true;
		document.getElementById("resetProd").disabled = true;
		document.getElementById("loadingProd").style.display = "";
		$scope.newBusquedaInventario.listInventario = "N";
		$scope.newBusquedaInventario.cantidad_maxima_a_mostrar = 99999;
		$scope.msg_total_rows = "";
		Prod.busquedaFiltro($scope.newBusquedaInventario, function(response){
			if (response.data.status==1)	{			
				$scope.prods = response.data.info;
			//$scope.ctg_almacenes = response.data.info[0].ctg_almacen;
				$scope.total_rows = response.data.info[0].total_rows;
		/*	if (response.data.info.length>$scope.newBusquedaInventario.cantidad_maxima_a_mostrar-1)
				$scope.msg_total_rows = "Se muestran "+$scope.newBusquedaInventario.cantidad_maxima_a_mostrar+" resultados de "+$scope.total_rows+". Favor especifique mas criterios de busqueda";*/
			}
			else{
				$scope.prods = {};
			}
			
			document.getElementById("busquedaProd").disabled = false;
			document.getElementById("resetProd").disabled = false;
			document.getElementById("loadingProd").style.display = "none";
			
		});
	};

	
	vm.deleteProd = deleteProd;
	vm.realDeleteProd = realDeleteProd;
	vm.editProd = editProd;
	vm.activateProd = activateProd;
	vm.tabsDetalle = tabsDetalle;

	
	function reloadData() {
		$scope.msg_total_rows = "";
		Prod.findAll($scope.newBusquedaInventario, function(response){
			if (response.data.status==1){
			$scope.prods = response.data.info;
			//$scope.ctg_almacenes = response.data.info[0].ctg_almacen;
			$scope.total_rows = response.data.info[0].total_rows;
			}
			/*if (response.data.info.length>$scope.newBusquedaInventario.cantidad_maxima_a_mostrar-1)
				$scope.msg_total_rows = "Se muestran "+$scope.newBusquedaInventario.cantidad_maxima_a_mostrar+" resultados de "+$scope.total_rows+". Favor especifique mas criterios de busqueda";*/
		});
	};
	
	function deleteProd(prodId, empresaId) {
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
				Prod.borrar(empresaId, prodId, $rootScope.globals.currentUser.username,
					function(response) {
						$scope.busquedaFiltro();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Producto Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	}
	;
	
	function realDeleteProd(prodId, empresaId) {

		if (popupService.showPopup('Esta seguro de eliminar este registro?')) {
			Prod.borrarReal(empresaId, prodId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});

		}
	}
	;
	
	function activateProd(prodId, empresaId) {
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
				Prod.activar(empresaId, prodId, $rootScope.globals.currentUser.username,
					function(response) {
						$scope.busquedaFiltro();
				
				});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Producto Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
		

}
;

	function editProd(prodId, empresaId) {
		$state.go('menuMaster.editProd', {
			idProd : prodId,
			idEmpresa: empresaId
		});

	}
	;
	

	function imgProd(prodId) {

		$state.go('menuMaster.imgProd', {
			idProd : prodId
		});

	}
	;

	  function tabsDetalle(prodId, empresaId) {
	    	var habilitarMenu = $location.search().habilitarMenu==null||$location.search().habilitarMenu=='undefined'?"S":$location.search().habilitarMenu;
			var habilitarMenuWin = $stateParams.habilitarMenu;
			var id_empresa = $rootScope.globals.currentUser.id_empresa;
	    	if (habilitarMenuWin=='N') habilitarMenu = habilitarMenuWin;
	    	$state.go(
				'menuMaster.tabsDetalle', {
					idProd: prodId,
					idEmpresa: id_empresa,
					habilitarMenu: habilitarMenu
				});
	    };
	    
	    
	    $scope.listProd = function() {
	    	
	    	$state.go('menuMaster.listProd');
		};

		    
};

// PRODUCTO RELACIONADO
function ProdRelacionadoAddCtrl($rootScope, $scope, $filter, $http, $state, Prod, ProdRelacionado) {

	$scope.formType = 'ADD';
	$scope.disabledCode = false;

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newProdRelacionado = {
			id : ""
			, id_empresa : $rootScope.globals.currentUser.id_empresa
			, codigo : ""
			, descripcion : ""
			, servicio :1
			, id_categoria :1
			, porc_descuento :0.00
			, precio1:0.00
			, stock:9999999
			, stock_minimo:100
			, porc_comision:0.00
			, usuario : $rootScope.globals.currentUser.username
		};
		
		//búsqueda de productos
		$scope.newBuscarProd = [{}];
		$scope.newBusquedaInventario = {
			codigo:""
			, desc: ""
			, id_tipo_producto:""
			, id_prov:""
			, id_categoria:""
			, id_marca:""
			, id_modelo:""
			, id_empresa:""
		};
		$scope.clearMessages();
	};
		
	$scope.registerProdRelacionado = function() {
		$scope.clearMessages();
		
		
		$scope.newProdRelacionado.id_empresa = $rootScope.globals.currentUser.id_empresa;
		$scope.newProdRelacionado.precio1 = Number($scope.newProdRelacionado.monto, 2);
	
		Prod.insertar($scope.newProdRelacionado, function(response) {
			if(response.data.status==1){
				//$scope.reset();
				
				var id_producto_padre = response.data.info[0].id_producto;
				var codigo_producto_padre = response.data.info[0].codigo_producto;
				var monto = Number($scope.newProdRelacionado.monto, 2);
				var porc_descuento = Number($scope.newProdRelacionado.porc_descuento, 2);
				var stock_minimo = Number($scope.newProdRelacionado.stock_minimo, 2);
				var usuario = $scope.newProdRelacionado.usuario;
				
				for(i=0; i<$scope.newProdRelacionadoDetalle.length; i++){
					$scope.newProdRelacionadoDetalle[i].id_producto_padre = id_producto_padre;
					$scope.newProdRelacionadoDetalle[i].codigo_producto_padre = codigo_producto_padre;
					$scope.newProdRelacionadoDetalle[i].monto = monto;
					$scope.newProdRelacionadoDetalle[i].porc_descuento = porc_descuento;
					$scope.newProdRelacionadoDetalle[i].stock_minimo = stock_minimo;
					$scope.newProdRelacionadoDetalle[i].usuario = usuario;
					
					ProdRelacionado.insertar($scope.newProdRelacionadoDetalle[i], function(response) {
						if(response.status==1){
							//console.log("almacenado exitosamente");
						}
						else{
							console.log("no se pudo insertar: "+$scope.newProdRelacionadoDetalle[i].codigo_producto);
						}
					});
				}
				
				Swal.fire({
					//toast:true,
					position: 'center',
					type: 'success',
					title: 'Paquete registrado exitosamente',
					showConfirmButton: false,
					timer: 4000
				})
				//*/
			}
					
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$scope.successMessages = [ 'Proveedor Registrado correctamente' ];
		});
		//$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listProdRelacionado');
		
	};

	$scope.reset();

	$scope.clearList = function() {
		$scope.newBuscarProd = [];
		$scope.inventarioProductos = [];
		
		//console.log("limpie listas...");
	}
	
	$scope.inventarioProductos = [{}];
	$scope.busquedaFiltro = function(){
		//console.log("entre...1");
		if (document.getElementById("busquedaProductos").disabled==false) {
			//$scope.newBuscarProd = [{}];
			document.getElementById("busquedaProductos").disabled = true;
			document.getElementById("resetProductos").disabled = true;
			document.getElementById("loadingProductos").style.display = "";
			//console.log( $rootScope.globals.currentUser.id_empresa);
			$scope.newBusquedaInventario.id_empresa =  $rootScope.globals.currentUser.id_empresa;
			
			//if($scope.newPromocion.id_categoria) $scope.newBusquedaInventario.id_categoria =  $scope.newProdRelacionado.id_categoria;
			
			$scope.newBusquedaInventario.cantidad_maxima_a_mostrar = 999;
			$scope.msg_total_rows = "";
			
			//console.log($scope.newBusquedaInventario);
			Prod.findAllServiciosA($scope.newBusquedaInventario.id_empresa, function(response){
				//$scope.inventarioProductos = response.data.info;
				$scope.inventarioProductos = [];
				if(response.data.status ==1){
					for (i=0; i<response.data.info.length; i++) {
						//console.log(response.data.info[i]);
						$scope.inventarioProductos[i] = {	
							id_prod: response.data.info[i].id.id, 
							codigo_producto: response.data.info[i].codigo, 
							//descripcion_producto: response.data.info[i].ctg_producto.ctg_tipo_producto.descripcion + ' '+response.data.info[i].ctg_producto.ctg_marca[0].descripcion + ' '+response.data.info[i].ctg_producto.ctg_modelo[0].descripcion + ' '+response.data.info[i].ctg_producto.descripcion, 
							descripcion_producto: response.data.info[i].descripcion, 
							precio: response.data.info[i].precio1, 
							costo: response.data.info[i].costo_contable, 
							porc_comision: response.data.info[i].porc_comision
						};

						
						$scope.newBuscarProd[i] = {
							id_prod: response.data.info[i].id.id,
							codigo: response.data.info[i].codigo,
							descripcion_producto: response.data.info[i].descripcion,
							precio_unitario: response.data.info[i].precio1,
							costo: response.data.info[i].costo_contable,
							porc_comision: response.data.info[i].porc_comision,
							selected: false
						};
					}
					$scope.total_rows = response.data.info[0].total_rows;
					if (response.data.info.length>$scope.newBusquedaInventario.cantidad_maxima_a_mostrar-1)
						$scope.msg_total_rows = "Se muestran "+$scope.newBusquedaInventario.cantidad_maxima_a_mostrar+" resultados de "+$scope.total_rows+". Favor especifique mas criterios de busqueda";
				}
				else{
					$scope.inventarioProductos[0]= {};
					$scope.newBuscarProd[0] = {};
					$scope.total_rows =0;
					$scope.msg_total_rows = "";
					$scope.newBuscarProd = [];
				}
				document.getElementById("busquedaProductos").disabled = false;
				document.getElementById("resetProductos").disabled = false;
				document.getElementById("loadingProductos").style.display = "none";
			});
		}
		else{
			$scope.newBuscarProd = [];
		}
	};
	
	$scope.checkProduct = function(index) {
		//console.log("entre");
		//console.log($scope.newBuscarProd[index].selected);
		if ($scope.newBuscarProd[index].selected===true) 
			$scope.newBuscarProd[index].selected=false;
		else
			$scope.newBuscarProd[index].selected=true;
		
		//console.log($scope.newBuscarProd[index]);
	};
	
	$scope.addProdRelacionadoDetalle = function() {
		var i = 0;
		if($scope.newProdRelacionadoDetalle==null){
			$scope.newProdRelacionadoDetalle=[];
			i=0;
		}
		else{
			i = $scope.newProdRelacionadoDetalle.length;
		}
		
		//console.log(newArray);
		var montoTotal = 0.00;
	
		var i=0;
		for (j=0; j<$scope.newBuscarProd.length; j++) {
			//console.log($scope.newBuscarProd[j]);
			if($scope.newBuscarProd[j].selected===true){
				$scope.newProdRelacionadoDetalle[i] = {
					id_empresa:$rootScope.globals.currentUser.id_empresa
					, id_producto_padre:""
					, codigo_producto_padre: ""
					
					, id_producto:$scope.newBuscarProd[j].id_prod
					, codigo_producto:$scope.newBuscarProd[j].codigo
					, descripcion:$scope.newBuscarProd[j].descripcion_producto
					, precio:$scope.newBuscarProd[j].precio_unitario
					, costo:$scope.newBuscarProd[j].costo
					, porc_descuento:""
					, porc_comision:$scope.newBuscarProd[j].porc_comision
					, monto:""
					, estado:"A"
				};//*/
				montoTotal+=(Number($scope.newBuscarProd[j].precio_unitario)*Number($scope.newBuscarProd[j].qty));
				//console.log($scope.newBuscarProd[j]);
				//console.log($scope.newProdRelacionadoDetalle[i]);
				i++;
			}
		}
		$scope.newProdRelacionado.monto = montoTotal;
		$('#myModal').modal('hide');
		
	};
	
	$scope.deleteProdRelacionado = function(item){
		$scope.newProdRelacionadoDetalle.splice( item, 1 );
		if($scope.newProdRelacionadoDetalle.length==0){
			if($scope.formType=="ADD") $("#register").prop("disabled", true);
			else $("#update").prop("disabled", true);
			
		}
	}
	
	$scope.calculoTotal=function(index, campo){
		//console.log($scope.newProdRelacionadoDetalle);
		var monto = 0;
		for(i=0; i<$scope.newProdRelacionadoDetalle.length;i++){
			monto += Number($scope.newProdRelacionadoDetalle[i].qty)*Number($scope.newProdRelacionadoDetalle[i].precio);
		}
		
		let descuento = monto*(Number($scope.newProdRelacionado.porc_descuento)/100);
		
		$scope.newProdRelacionado.monto = Number(monto - descuento,2);
		//$scope.calculoTotal();
	}
};

function ProdRelacionadoEditCtrl($rootScope, $scope, $filter, $state, $stateParams, Prod, ProdRelacionado) {
	$scope.formType = 'UPD';
	$scope.disabledCode = true;
	
	$scope.isNew = function(value) {
		if (value == 'ADD')
			return true;
		else
			return false;
	};
	
	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};
	
	$scope.updateProdRelacionado = function() {

		var date = new Date();
		var ProdRelacionadoObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newProdRelacionado.usuario = ProdRelacionadoObj.usuario;
		$scope.newProdRelacionado.id = $scope.newProdRelacionado.id.id;
		$scope.newProdRelacionado.id_empresa = $rootScope.globals.currentUser.id_empresa;
		$scope.newProdRelacionado.precio1 = $scope.newProdRelacionado.monto;
		$scope.newProdRelacionado.fecha_vencimiento = $scope.newProdRelacionado.fecha_vencimiento;
		//console.log($scope.newProdRelacionado);
		Prod.actualizar($scope.newProdRelacionado, function(response) {
			if(response.data.status==1){
				//elimina todo lo q estaba antes
				ProdRelacionado.borrarDefinitivo($scope.newProdRelacionado.id, $scope.newProdRelacionado.id_empresa, function(response) {
					if(response.data.status==1){
						//actualizar los relacionados
						var id_producto_padre = $scope.newProdRelacionado.id;
						var codigo_producto_padre = $scope.newProdRelacionado.codigo;
						var monto = Number($scope.newProdRelacionado.monto, 2);
						var porc_descuento = Number($scope.newProdRelacionado.porc_descuento, 2);
						var stock_minimo = Number($scope.newProdRelacionado.stock_minimo, 2);
						var usuario = $scope.newProdRelacionado.usuario;
						
						for(i=0; i<$scope.newProdRelacionadoDetalle.length; i++){
							$scope.newProdRelacionadoDetalle[i].id_producto_padre = id_producto_padre;
							$scope.newProdRelacionadoDetalle[i].codigo_producto_padre = codigo_producto_padre;
							$scope.newProdRelacionadoDetalle[i].monto = Number($scope.newProdRelacionadoDetalle[i].precio)-(Number($scope.newProdRelacionadoDetalle[i].precio)*Number((porc_descuento/100)));
							$scope.newProdRelacionadoDetalle[i].porc_descuento = porc_descuento;
							$scope.newProdRelacionadoDetalle[i].stock_minimo = stock_minimo;
							$scope.newProdRelacionadoDetalle[i].usuario = usuario;
							
							ProdRelacionado.insertar($scope.newProdRelacionadoDetalle[i], function(response) {
								if(response.status==1){
									//console.log("almacenado exitosamente");
								}
								else{
									console.log("no se pudo insertar: "+$scope.newProdRelacionadoDetalle[i].codigo_producto);
								}
							});
						}
					}
				});
				
				
			}
			Swal.fire({
				//toast:true,
				position: 'center',
				type: 'success',
				title: 'Paquete actualizado exitosamente',
				showConfirmButton: false,
				timer: 4000
			})
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		$state.go('menuMaster.listProdRelacionado');

	};

	$scope.loadProd = function() {
		Prod.findById($stateParams.idEmpresa, $stateParams.idProd, function(response) {
			if (response.data.status==1){
				$scope.newProdRelacionado = response.data.info[0];
				//$scope.newProdRelacionado.monto = Number($scope.newProdRelacionado.precio1,2);
				
				//recorrer todos los articulos relacionados
				ProdRelacionado.findById($stateParams.idProd, $stateParams.idEmpresa, function(response) {
					if(response.data.status==1){
						$scope.newProdRelacionadoDetalle = response.data.info;
						$scope.newProdRelacionado.porc_descuento = response.data.info[0].porc_descuento;
						
						$scope.calculoTotal(response.data.info.length);
					}
					
				});
				

			}		
		});
	};
	$scope.loadProd();
	
	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newProdRelacionado = {
			id : ""
			, id_empresa : $rootScope.globals.currentUser.id_empresa
			, codigo : ""
			, descripcion : ""
			, servicio :1
			, id_categoria :1
			, porc_descuento :0.00
			, precio1:0.00
			, stock:9999999
			, stock_minimo:100
			, porc_comision:0.00
			, usuario : $rootScope.globals.currentUser.username
		};
		
		//búsqueda de productos
		$scope.newBuscarProd = [{}];
		$scope.newBusquedaInventario = {
			codigo:""
			, desc: ""
			, id_tipo_producto:""
			, id_prov:""
			, id_categoria:""
			, id_marca:""
			, id_modelo:""
			, id_empresa:$rootScope.globals.currentUser.id_empresa
		};
		$scope.clearMessages();
	};
	
	$scope.reset();
	
	$scope.clearList = function() {
		//$scope.newBuscarProd = [];
		$scope.inventarioProductos = [];
		
		//console.log("limpie listas...");
	}
	
	$scope.inventarioProductos = [{}];
	$scope.busquedaFiltro = function(){
		//console.log("entre...1");
		if (document.getElementById("busquedaProductos").disabled==false) {
			//$scope.newBuscarProd = [{}];
			document.getElementById("busquedaProductos").disabled = true;
			document.getElementById("resetProductos").disabled = true;
			document.getElementById("loadingProductos").style.display = "";
			//console.log( $rootScope.globals.currentUser.id_empresa);
			//$scope.newBusquedaInventario.id_empresa =  $rootScope.globals.currentUser.id_empresa;
			
			//if($scope.newPromocion.id_categoria) $scope.newBusquedaInventario.id_categoria =  $scope.newProdRelacionado.id_categoria;
			
			$scope.newBusquedaInventario.cantidad_maxima_a_mostrar = 999;
			$scope.msg_total_rows = "";
			
			//console.log($scope.newBusquedaInventario);
			Prod.findAllServiciosA($rootScope.globals.currentUser.id_empresa, function(response){
				//$scope.inventarioProductos = response.data.info;
				$scope.inventarioProductos = [];
				if(response.data.status ==1){
					for (i=0; i<response.data.info.length; i++) {
						//console.log(response.data.info[i]);
						$scope.inventarioProductos[i] = {	
							id_prod: response.data.info[i].id.id, 
							codigo_producto: response.data.info[i].codigo, 
							//descripcion_producto: response.data.info[i].ctg_producto.ctg_tipo_producto.descripcion + ' '+response.data.info[i].ctg_producto.ctg_marca[0].descripcion + ' '+response.data.info[i].ctg_producto.ctg_modelo[0].descripcion + ' '+response.data.info[i].ctg_producto.descripcion, 
							descripcion_producto: response.data.info[i].descripcion, 
							precio: response.data.info[i].precio1, 
							costo: response.data.info[i].costo_contable, 
							porc_comision: response.data.info[i].porc_comision
						};

						
						$scope.newBuscarProd[i] = {
							id_prod: response.data.info[i].id.id,
							codigo: response.data.info[i].codigo,
							descripcion_producto: response.data.info[i].descripcion,
							precio_unitario: response.data.info[i].precio1,
							costo: response.data.info[i].costo_contable,
							porc_comision: response.data.info[i].porc_comision,
							selected: false
						};
					}
					$scope.total_rows = response.data.info[0].total_rows;
					if (response.data.info.length>$scope.newBusquedaInventario.cantidad_maxima_a_mostrar-1)
						$scope.msg_total_rows = "Se muestran "+$scope.newBusquedaInventario.cantidad_maxima_a_mostrar+" resultados de "+$scope.total_rows+". Favor especifique mas criterios de busqueda";
				}
				else{
					$scope.inventarioProductos[0]= {};
					$scope.newBuscarProd[0] = {};
					$scope.total_rows =0;
					$scope.msg_total_rows = "";
					$scope.newBuscarProd = [];
				}
				document.getElementById("busquedaProductos").disabled = false;
				document.getElementById("resetProductos").disabled = false;
				document.getElementById("loadingProductos").style.display = "none";
			});
		}
		else{
			$scope.newBuscarProd = [];
		}
	};
	
	$scope.checkProduct = function(index) {
		//console.log("entre");
		//console.log($scope.newBuscarProd[index].selected);
		if ($scope.newBuscarProd[index].selected===true) 
			$scope.newBuscarProd[index].selected=false;
		else
			$scope.newBuscarProd[index].selected=true;
		
		//console.log($scope.newBuscarProd[index]);
	};
	
	$scope.addProdRelacionadoDetalle = function() {
		var i = 0;
		if($scope.newProdRelacionadoDetalle==null){
			$scope.newProdRelacionadoDetalle=[];
			i=0;
		}
		else{
			i = $scope.newProdRelacionadoDetalle.length;
		}
		
		//console.log(newArray);
		var montoTotal = 0.00;
	
		//var i=0;
		for (j=0; j<$scope.newBuscarProd.length; j++) {
			//console.log($scope.newBuscarProd[j]);
			if($scope.newBuscarProd[j].selected===true){
				$scope.newProdRelacionadoDetalle[i] = {
					id_empresa:$rootScope.globals.currentUser.id_empresa
					, id_producto_padre:""
					, codigo_producto_padre: ""
					
					, id_producto:$scope.newBuscarProd[j].id_prod
					, codigo_producto:$scope.newBuscarProd[j].codigo
					, descripcion:$scope.newBuscarProd[j].descripcion_producto
					, precio:$scope.newBuscarProd[j].precio_unitario
					, costo:$scope.newBuscarProd[j].costo
					, porc_descuento:""
					, porc_comision:$scope.newBuscarProd[j].porc_comision
					, monto:""
					, estado:"A"
				};//*/
				montoTotal+=(Number($scope.newBuscarProd[j].precio_unitario)*Number($scope.newBuscarProd[j].qty));
				//console.log($scope.newBuscarProd[j]);
				//console.log($scope.newProdRelacionadoDetalle[i]);
				i++;
			}
		}
		$scope.newProdRelacionado.monto = montoTotal;
		$('#myModal').modal('hide');
		
	};
	

	$scope.deleteProdRelacionado = function(item){
		$scope.newProdRelacionadoDetalle.splice( item, 1 );
		if($scope.newProdRelacionadoDetalle.length==0){
			if($scope.formType=="ADD") $("#register").prop("disabled", true);
			else $("#update").prop("disabled", true);
			
		}
	}
	
	$scope.calculoTotal=function(index){
		//console.log($scope.newProdRelacionadoDetalle);
		var monto = 0;
		for(i=0; i<$scope.newProdRelacionadoDetalle.length;i++){
			monto += Number($scope.newProdRelacionadoDetalle[i].qty)*Number($scope.newProdRelacionadoDetalle[i].precio);
		}
		
		let descuento = monto*(Number($scope.newProdRelacionado.porc_descuento)/100);
		
		$scope.newProdRelacionado.monto = Number(monto - descuento,2);
	}
};

function ProdRelacionadoTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, Prod, ProdRelacionado, URL_API) {
	var vm = this;

	vm.reloadData = reloadData;
	

	vm.message = '';
	vm.paquetes = {};

	/*Prod.findAllServicios($rootScope.globals.currentUser.id_empresa, function(response) {
		if (response.data.status==1){
			$scope.paquetes = response.data.info;
		}
		else{
			$scope.paquetes=[];
		}
	});
	//*/
	$scope.newBusquedaPaquete = {
		codigo:""
		, desc: ""
		, id_empresa:$rootScope.globals.currentUser.id_empresa
		, cantidad_maxima_a_mostrar:99999
	};
		
	$scope.resetFiltro = function() {
		$scope.newBusquedaPaquete = {
			codigo:""
			, desc: ""
			, id_empresa:$rootScope.globals.currentUser.id_empresa
			, cantidad_maxima_a_mostrar:99999
		};
		//$scope.busquedaFiltro();
		$scope.paquetes = {};
    };

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3),
			DTColumnDefBuilder.newColumnDef(4),
			DTColumnDefBuilder.newColumnDef(5),
			DTColumnDefBuilder.newColumnDef(6),
			DTColumnDefBuilder.newColumnDef(7),
			DTColumnDefBuilder.newColumnDef(8).notSortable() ];

	vm.deletePaquete = deletePaquete;
	vm.editPaquete = editPaquete;
	vm.activatePaquete = activatePaquete;
	
	$scope.busquedaFiltro = function(){
		//$scope.prods = {};
		document.getElementById("busquedaProd").disabled = true;
		document.getElementById("resetProd").disabled = true;
		document.getElementById("loadingProd").style.display = "";
		$scope.newBusquedaPaquete.listInventario = "N";
		$scope.newBusquedaPaquete.cantidad_maxima_a_mostrar = 99999;
		$scope.newBusquedaPaquete.id_empresa = $rootScope.globals.currentUser.id_empresa;
		//$scope.newBusquedaPaquete.codigo = $rootScope.globals.currentUser.id_empresa;
		
		$scope.msg_total_rows = "";
		Prod.findAllServicios($scope.newBusquedaPaquete, function(response){
			if (response.data.status==1)	{			
				$scope.paquetes = response.data.info;
			//$scope.ctg_almacenes = response.data.info[0].ctg_almacen;
				$scope.total_rows = response.data.info[0].total_rows;
		/*	if (response.data.info.length>$scope.newBusquedaPaquete.cantidad_maxima_a_mostrar-1)
				$scope.msg_total_rows = "Se muestran "+$scope.newBusquedaPaquete.cantidad_maxima_a_mostrar+" resultados de "+$scope.total_rows+". Favor especifique mas criterios de busqueda";*/
			}
			else{
				$scope.paquetes = {};
			}
			
			document.getElementById("busquedaProd").disabled = false;
			document.getElementById("resetProd").disabled = false;
			document.getElementById("loadingProd").style.display = "none";
			
		});
	};
	
	function reloadData() {
		Prod.findAllServicios($rootScope.globals.currentUser.id_empresa, function(response) {
			if (response.data.status==1){
				$scope.paquetes = response.data.info;
			}
			else{
				$scope.paquetes=[];
			}
		});

	};
	
	function deletePaquete(paqueteId, empresaId) {
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
				Prod.borrar(empresaId, paqueteId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Paquete Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		/*
		if (popupService.showPopup('Esta seguro de borrar este registro?')) {
			Prov.borrar(provId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});

		}//*/
	};
	
	function activatePaquete(paqueteId, empresaId) {
		
		
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
				Prod.activar(empresaId, paqueteId, $rootScope.globals.currentUser.username,
						function(response) {
							reloadData();
					 }
				);
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Paquete Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};

	function editPaquete(paqueteId, empresaId) {
		$state.go('menuMaster.editProdRelacionado', {
			idProd : paqueteId,
			idEmpresa : empresaId
		});
	};
};

// PROVEEDOR
function ProvAddCtrl($rootScope, $scope, $filter, $http, $state, Prov, TipoDocProv, Cuenta, TipoContr, CONTABILIDAD) {
	$scope.isVisibleAfter = false;
	$scope.formType = 'ADD';
	$scope.contabilidad = CONTABILIDAD;
	
	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newProv = {
			id : ""
			, descripcion : ""
			, id_tipo_doc_proveedor : ""
			, id_tipo_contribuyente : ""
			, tipo_proveedor : ""
			, direccion : ""
			, tel1 : ""
			, tel2 : ""
			, email : ""
			, prov_moto : 0
			, dias_credito : 0
			, exento : 0
			, usuario : $rootScope.globals.currentUser.username
			//CONTABILIDAD
			, id_cuenta : ""
		};

		$scope.clearMessages();
	};

	$scope.registerProv = function() {
		$scope.clearMessages();

		Prov.insertar($scope.newProv, function(response) {
			
			//$scope.reset();

			$scope.successMessages = [ 'Proveedor Registrado correctamente' ];
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro registrado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$scope.isVisibleAfter = true;
			//$state.go('menuMaster.listProv');
			
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
	};

	$scope.reset();

	$scope.loadTipoDocProv = function() {
		TipoDocProv.findAll(function(response) {
			if (response.data.status==1){
			$scope.tipoDocProv = response.data.info;
			}
		});
	};
	$scope.loadTipoDocProv();
	
	$scope.loadCuenta = function() {
		var elemento = 2;
		
		$scope.newCliente.id_cuenta = "";
		$scope.cuenta = [];
		Cuenta.findByIdElemento(elemento, function(response) {
			if (response.status==1){
				$scope.cuenta = response.info;
			}
			else $scope.cuenta = [];
		});
	};
	$scope.loadCuenta();
	
	$scope.loadTipoContr = function() {
		TipoContr.findAll(function(response) {
			if (response.data.status==1){
				$scope.tipoContr = response.data.info;
			}
		});
	};

	$scope.loadTipoContr();
};

function ProvEditCtrl($rootScope, $scope, $filter, $state, $stateParams, Prov, TipoDocProv, Cuenta, TipoContr, CONTABILIDAD) {
	$scope.isVisibleAfter = true;
	
	$scope.contabilidad = CONTABILIDAD;
	
	$scope.newProv = {
		id : ""
		, descripcion : ""
		, id_tipo_doc_proveedor : ""
		, id_tipo_contribuyente : ""
		, tipo_proveedor : ""
		, direccion : ""
		, tel1 : ""
		, tel2 : ""
		, email : ""
		, prov_moto : 0
		, dias_credito : 0
		, exento : 0
		, usuario : $rootScope.globals.currentUser.username
		//CONTABILIDAD
		, id_cuenta : ""
	};
		
	$scope.updateProv = function() {

		var date = new Date();
		var ProvObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newProv.usuario = ProvObj.usuario;
		
		Prov.actualizar($scope.newProv, function(response) {
			//$scope.successMessages = [ 'Proveedor Actualizado correctamente' ];
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro actualizado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listProv');
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});

	};

	$scope.loadProv = function() {
		Prov.findById($stateParams.idProv, function(response) {
			if (response.data.status==1){
				$scope.newProv = response.data.info[0];			
				$scope.newProv.id_tipo_doc_proveedor = response.data.info[0].id.id_tipo_doc_proveedor;
				$scope.newProv.id_tipo_contribuyente = response.data.info[0].id.id_tipo_contribuyente;
				$scope.newProv.id = response.data.info[0].id.id;
				if($scope.newProv.estado=='A'){
					$scope.newProv.estado = true;
				}
				if($scope.newProv.exento==1){
					$scope.newProv.exento = true;
				}
				if($scope.newProv.tipo_proveedor==1){
					$scope.newProv.tipo_proveedor = true;
				}
			}
		});
	};

	$scope.loadProv();


	$scope.loadTipoDocProv = function() {
		TipoDocProv.findAll(function(response) {
			if (response.data.status==1){
			$scope.tipoDocProv = response.data.info;
			}
		});
	};
	$scope.loadTipoDocProv();
	
	$scope.loadCuenta = function() {
		var elemento = 2;
		
		$scope.newProv.id_cuenta = "";
		$scope.cuenta = [];
		Cuenta.findByIdElemento(elemento, function(response) {
			if (response.status==1){
				$scope.cuenta = response.info;
			}
			else $scope.cuenta = [];
		});
	};
	$scope.loadCuenta();
	
	$scope.loadTipoContr = function() {
		TipoContr.findAll(function(response) {
			if (response.data.status==1){
				$scope.tipoContr = response.data.info;
			}
		});
	};

	$scope.loadTipoContr();
};

function ProvTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, Prov, URL_API) {
	var vm = this;

	vm.listProv = listProv;
	vm.reloadData = reloadData;
	

	vm.message = '';
	vm.prov = {};

	Prov.findAll(function(response) {
		if (response.data.status==1){
			vm.prov = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3),
			DTColumnDefBuilder.newColumnDef(4),
			DTColumnDefBuilder.newColumnDef(5),
			DTColumnDefBuilder.newColumnDef(6),
			DTColumnDefBuilder.newColumnDef(7),
			DTColumnDefBuilder.newColumnDef(8).notSortable() ];

	vm.deleteProv = deleteProv;
	vm.editProv = editProv;
	vm.activateProv = activateProv;

	function listProv() {
		Prov.findAllA(function(response) {
			if (response.data.status==1){
			vm.prov = response.data.info;
			}
		});

	};

	function reloadData() {
		Prov.findAll(function(response) {
			if (response.data.status==1){
			vm.prov = response.data.info;
			}
		});

	};
	
	function deleteProv(provId) {
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
				Prov.borrar(provId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Proveedor Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
	};
	
	function activateProv(provId) {
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
				Prov.activar(provId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Proveedor Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
	};

	function editProv(provId) {
		$state.go('menuMaster.editProv', {
			idProv : provId
		});
	};
};

// TIPO FACTURA
function TipoFactAddCtrl($rootScope, $scope, $filter, $http, $state, TipoFact) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newTipoFact = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerTipoFact = function() {
		$scope.clearMessages();

		TipoFact
				.insertar(
						$scope.newTipoFact,
						function(response) {

							$scope.reset();

							$scope.successMessages = [ 'Tipo de Factura Registrada correctamente' ];

						},
						function(result) {
							if ((result.status == 409)
									|| (result.status == 400)) {
								$scope.errors = result.data;
							} else {
								$scope.errorMessages = [ 'Unknown error de servidor' ];
							}
						});
		//$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listTipoFact');

	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoFactEditCtrl($rootScope, $scope, $filter, $state, $stateParams,
		TipoFact) {

	$scope.updateTipoFact = function() {

		var date = new Date();
		var TipoFactObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newTipoFact.usuario = TipoFactObj.usuario;

		TipoFact.actualizar($scope.newTipoFact, function(response) {
			$scope.successMessages = [ 'Tipo de Factura Actualizada correctamente' ];

		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
		});
		//$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listTipoFact');

	};

	$scope.loadTipoFact = function() {
		TipoFact.findById($stateParams.idTipoFact, function(response) {
			if (response.data.status==1){
				$scope.newTipoFact = response.data.info[0];
				if($scope.newTipoFact.estado=='A'){
					$scope.newTipoFact.estado = true;
				}
			}
		});
	};

	$scope.loadTipoFact();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoFactTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, TipoFact, URL_API) {
	var vm = this;

	vm.listTipoFact = listTipoFact;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.TipoFact = {};

	TipoFact.findAll(function(response) {
		if (response.data.status==1){
			vm.tipoFact = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteTipoFact = deleteTipoFact;
	vm.editTipoFact = editTipoFact;
	vm.activateTipoFact = activateTipoFact;

	function listTipoFact() {
		TipoFact.findAll(function(response) {
			if (response.data.status==1){
			vm.TipoFact = response.data.info;
			}
		});

	}
	;

	function reloadData() {
		TipoFact.findAll(function(response) {
			if (response.data.status==1){
			vm.tipoFact = response.data.info;
			}
		});

	}
	;

	function deleteTipoFact(TipoFactId) {
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
				TipoFact.borrar(TipoFactId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo Factura Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	}
	;

	function editTipoFact(TipoFactId) {

		$state.go('menuMaster.editTipoFact', {
			idTipoFact : TipoFactId
		});

	}
	;
	
	function activateTipoFact(TipoFactId) {
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
				TipoFact.activar(TipoFactId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo Factura Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
}
;
	

};

// TIPO OPERACION
function TipoOprAddCtrl($rootScope, $scope, $filter, $http, $state, TipoOpr) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newTipoOpr = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerTipoOpr = function() {
		$scope.clearMessages();

		TipoOpr.insertar($scope.newTipoOpr,
			function(response) {

				$scope.reset();

				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Exito',
					text: "Registro ingresado correctamente",
					showConfirmButton: false,
					timer: 2000
				});
				$state.go('menuMaster.listTipoOpr');
			},
			function(result) {
				if ((result.status == 409)
						|| (result.status == 400)) {
					$scope.errors = result.data;
				} else {
					$scope.errorMessages = [ 'Unknown error de servidor' ];
				}
				$('#notificacionesModal').modal('show');
			});

	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoOprEditCtrl($rootScope, $scope, $filter, $state, $stateParams,
		TipoOpr) {

	$scope.updateTipoOpr = function() {

		var date = new Date();
		var TipoOprObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newTipoOpr.usuario = TipoOprObj.usuario;

		TipoOpr.actualizar($scope.newTipoOpr, function(response) {
			
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro actualizado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listTipoOpr');
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		

	};

	$scope.loadTipoOpr = function() {
		TipoOpr.findById($stateParams.idTipoOpr, function(response) {
			if (response.data.status==1){
				$scope.newTipoOpr = response.data.info[0];
				if($scope.newTipoOpr.estado=='A'){
					$scope.newTipoOpr.estado = true;
				}
			}
		});
	};

	$scope.loadTipoOpr();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoOprTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, TipoOpr, URL_API) {
	var vm = this;

	vm.listTipoOpr = listTipoOpr;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.tipoOpr = {};

	TipoOpr.findAll(function(response) {
		if (response.data.status==1){
		vm.tipoOpr = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteTipoOpr = deleteTipoOpr;
	vm.editTipoOpr = editTipoOpr;
	vm.activateTipoOpr = activateTipoOpr;

	function listTipoOpr() {
		TipoOpr.findAll(function(response) {
			if (response.data.status==1){
			vm.tipoOpr = response.data.info;
			}
		});

	}
	;

	function reloadData() {
		TipoOpr.findAll(function(response) {
			if (response.data.status==1){
			vm.tipoOpr = response.data.info;
			}
		});

	}
	;

	function deleteTipoOpr(tipoOprId) {
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
				TipoOpr.borrar(tipoOprId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo Operacion Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})

	}
	;

	function editTipoOpr(tipoOprId) {

		$state.go('menuMaster.editTipoOpr', {
			idTipoOpr : tipoOprId
		});

	}
	;
	
	function activateTipoOpr(tipoOprId) {
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
				TipoOpr.activar(tipoOprId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo Operacion Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};
};

//DEPARTAMENTOS
function DeptsAddCtrl($rootScope, $scope, $filter, $http, $state, Depts) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newDepts = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerDepts = function() {
		$scope.clearMessages();

		Depts
				.insertar(
						$scope.newDepts,
						function(response) {

							$scope.reset();

							$scope.successMessages = [ 'Departamento Registrado correctamente' ];

						},
						function(result) {
							if ((result.status == 409)
									|| (result.status == 400)) {
								$scope.errors = result.data;
							} else {
								$scope.errorMessages = [ 'Unknown error de servidor' ];
							}
						});
		//$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listDepts');

	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function DeptsEditCtrl($rootScope, $scope, $filter, $state, $stateParams, Depts) {

	$scope.updateDepts = function() {

		var date = new Date();
		var DeptsObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newDepts.usuario = DeptsObj.usuario;

		Depts.actualizar(
						$scope.newDepts,
						function(response) {
							$scope.successMessages = [ 'Departamento Actualizado correctamente' ];
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
						function(result) {
							if ((result.status == 409)
									|| (result.status == 400)) {
								$scope.errors = result.data;
							} else {
								$scope.errorMessages = [ 'Unknown error de servidor' ];
							}
							$('#notificacionesModal').modal('show');
						});
		////
		//$state.go('menuMaster.listDepts');

	};

	$scope.loadDepts = function() {
		Depts.findById($stateParams.idDepts, function(response) {
			if (response.data.status==1){
				$scope.newDepts = response.data.info[0];
				if($scope.newDepts.estado=='A'){
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

	Depts.findAll(function(response) {
		if (response.data.status==1){
		vm.depts = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteDept = deleteDept;
	vm.editDept = editDept;
	vm.activateDept = activateDept;

	function listDepts() {
		Depts.findAll(function(response) {
			if (response.data.status==1){
			vm.depts = response.data.info;
			}
		});

	}
	;

	function reloadData() {
		Depts.findAll(function(response) {
			if (response.data.status==1){
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
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
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
			idDepts : deptsId
		});

	}
	;
	
	function activateDept(deptsId) {

		Depts.activar(deptsId, $rootScope.globals.currentUser.username,
				function(response) {
					reloadData();
			 }
		);

}
;

};

//MUNICIPIOS
function MunisAddCtrl($rootScope, $scope, $filter, $http, $state, Munis, Depts) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newMunis = {
		id : "",	descripcion : "", id_depto : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerMunis = function() {
		$scope.clearMessages();

		Munis.insertar($scope.newMunis, function(response) {
			//$scope.newMunis.id_depto = $scope.resp.id.id_depto;
			$scope.reset();

			$scope.successMessages = [ 'Municipio Registrado correctamente' ];

		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
		});
		////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listMunis');

	};

	$scope.reset();

	$scope.loadDepts = function() {
		Depts.findAll(function(response) {
			if (response.data.status==1){
			$scope.depts = response.data.info;
			}
		});
	};

	$scope.loadDepts();
};

function MunisEditCtrl($rootScope, $scope, $filter, $state, $stateParams, Munis, Depts) {

	$scope.updateMunis = function() {

		var date = new Date();
		var MunisObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newMunis.usuario = MunisObj.usuario;

		Munis.actualizar($scope.newMunis, function(response) {
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
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		//$state.go('menuMaster.listMunis');

	};

	$scope.loadMunis = function() {
		Munis.findById($stateParams.idDepto, $stateParams.idMunis, function(response) {
			if (response.data.status==1){
				$scope.newMunis = response.data.info[0];
				$scope.newMunis.id_depto = response.data.info[0].id.id_depto;
				$scope.newMunis.id = response.data.info[0].id.id;
				if($scope.newMunis.estado=='A'){
					$scope.newMunis.estado = true;
				}
			}
		});
	};

	$scope.loadMunis();

	$scope.loadDepts = function() {
		Depts.findAll(function(response) {
			if (response.data.status==1){
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

	Munis.findAll(function(response) {
		if (response.data.status==1){
		vm.munis = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteMunis = deleteMunis;
	vm.editMunis = editMunis;
	vm.activateMunis = activateMunis;

	function listMunis() {
		Munis.findAll(function(response) {
			if (response.data.status==1){
			vm.munis = response.data.info;
			}
		});

	}
	;

	function reloadData() {
		Munis.findAll(function(response) {
			if (response.data.status==1){
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
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
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
			idDepto : deptsId, 
			idMunis : munisId 
		});

	}
	;
	
	function activateMunis(munisId) {

		Munis.activar(munisId, $rootScope.globals.currentUser.username,
				function(response) {
					reloadData();
			 }
		);

}
;
	
};

// TIPO PROMOCION
function TipoPromocionAddCtrl($rootScope, $scope, $filter, $http, $state, TipoPromocion) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newTipoPromocion = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerTipoPromocion = function() {
		$scope.clearMessages();

		TipoPromocion.insertar($scope.newTipoPromocion,
		function(response) {

			$scope.reset();
			
			Swal.fire({
				toast:true,
			  position: 'top-end',
			  type: 'success',
			  title: 'Tipo Promocion registrada correctamente',
			  showConfirmButton: false,
			  timer: 1000
			})
			//$scope.successMessages = [ 'Tipo de Promocion Registrada correctamente' ];

		},
		function(result) {
			if ((result.status == 409)
					|| (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		$state.go('menuMaster.listTipoPromocion');

	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoPromocionEditCtrl($rootScope, $scope, $filter, $state, $stateParams, TipoPromocion) {

	$scope.updateTipoPromocion = function() {

		var date = new Date();
		var TipoPromocionObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newTipoPromocion.usuario = TipoPromocionObj.usuario;

		TipoPromocion.actualizar($scope.newTipoPromocion, function(response) {
			Swal.fire({
				toast:true,
			  position: 'top-end',
			  type: 'success',
			  title: 'Tipo Promocion actualizada correctamente',
			  showConfirmButton: false,
			  timer: 1000
			})

		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		$state.go('menuMaster.listTipoPromocion');

	};

	$scope.loadTipoPromocion = function() {
		TipoPromocion.findById($stateParams.idTipoPromocion, function(response) {
			if (response.data.status==1){
				$scope.newTipoPromocion = response.data.info[0];
				if($scope.newTipoPromocion.estado=='A'){
					$scope.newTipoPromocion.estado = true;
				}
			}
		});
	};

	$scope.loadTipoPromocion();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoPromocionTableCtrl($scope, $rootScope, $state, $compile, $window, popupService, DTOptionsBuilder, DTColumnDefBuilder, TipoPromocion, URL_API) {
	var vm = this;

	vm.listTipoPromocion = listTipoPromocion;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.tipoPromocion = {};

	TipoPromocion.findAll(function(response) {
		if (response.data.status==1){
			vm.tipoPromocion = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteTipoPromocion = deleteTipoPromocion;
	vm.editTipoPromocion = editTipoPromocion;
	vm.activateTipoPromocion = activateTipoPromocion;

	function listTipoPromocion() {
		TipoPromocion.findAll(function(response) {
			if (response.data.status==1){
				vm.tipoPromocion = response.data.info;
			}
		});

	};

	function reloadData() {
		TipoPromocion.findAll(function(response) {
			if (response.data.status==1){
				vm.tipoPromocion = response.data.info;
			}
		});

	};

	function deleteTipoPromocion(TipoPromocionId) {
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
				TipoPromocion.borrar(TipoPromocionId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo Promocion Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};

	function editTipoPromocion(TipoPromocionId) {

		$state.go('menuMaster.editTipoPromocion', {
			idTipoPromocion : TipoPromocionId
		});

	};
	
	function activateTipoPromocion(TipoPromocionId) {
		
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
				TipoPromocion.activar(TipoPromocionId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo Promocion Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
	};
};

//BANCO
function BancoAddCtrl($rootScope, $scope, $filter, $http, $state, Banco) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newBanco = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerBanco = function() {
		$scope.clearMessages();

		Banco.insertar($scope.newBanco,
		function(response) {

			$scope.reset();
			
			Swal.fire({
				toast:true,
			  position: 'top-end',
			  type: 'success',
			  title: 'Banco registrado correctamente',
			  showConfirmButton: false,
			  timer: 1000
			})
			//$scope.successMessages = [ 'Tipo de Promocion Registrada correctamente' ];

		},
		function(result) {
			if ((result.status == 409)
					|| (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		$state.go('menuMaster.listBanco');

	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function BancoEditCtrl($rootScope, $scope, $filter, $state, $stateParams, Banco) {

	$scope.updateBanco = function() {

		var date = new Date();
		var BancoObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newBanco.usuario = BancoObj.usuario;

		Banco.actualizar($scope.newBanco, function(response) {
			Swal.fire({
				toast:true,
			  position: 'top-end',
			  type: 'success',
			  title: 'Banco actualizada correctamente',
			  showConfirmButton: false,
			  timer: 1000
			})

		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		$state.go('menuMaster.listBanco');

	};

	$scope.loadBanco = function() {
		Banco.findById($stateParams.idBanco, function(response) {
			if (response.data.status==1){
				$scope.newBanco = response.data.info[0];
				if($scope.newBanco.estado=='A'){
					$scope.newBanco.estado = true;
				}
			}
		});
	};

	$scope.loadBanco();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function BancoTableCtrl($scope, $rootScope, $state, $compile, $window, popupService, DTOptionsBuilder, DTColumnDefBuilder, Banco, URL_API) {
	var vm = this;

	vm.listBanco = listBanco;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.banco = {};

	Banco.findAll(function(response) {
		if (response.data.status==1){
			vm.banco = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteBanco = deleteBanco;
	vm.editBanco = editBanco;
	vm.activateBanco = activateBanco;

	function listBanco() {
		Banco.findAll(function(response) {
			if (response.data.status==1){
				vm.banco = response.data.info;
			}
		});

	};

	function reloadData() {
		Banco.findAll(function(response) {
			if (response.data.status==1){
				vm.banco = response.data.info;
			}
		});

	};

	function deleteBanco(BancoId) {
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
				Banco.borrar(BancoId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Banco Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
	};

	function editBanco(BancoId) {

		$state.go('menuMaster.editBanco', {
			idBanco : BancoId
		});

	};
	
	function activateBanco(BancoId) {
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
				Banco.activar(BancoId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Banco Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
	};
};

//BRANCH
function BranchAddCtrl($rootScope, $scope, $filter, $http, $state, Branch) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newBranch = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerBranch = function() {
		$scope.clearMessages();

		Branch.insertar($scope.newBranch,
		function(response) {

			$scope.reset();
			
			Swal.fire({
				toast:true,
				position: 'top-end',
				type: 'success',
				title: 'Branch registrada correctamente',
				showConfirmButton: false,
				timer: 1000
			})
			//$scope.successMessages = [ 'Tipo de Promocion Registrada correctamente' ];

		},
		function(result) {
			if ((result.status == 409)
					|| (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		$state.go('menuMaster.listBranch');

	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function BranchEditCtrl($rootScope, $scope, $filter, $state, $stateParams, Branch) {

	$scope.updateBranch = function() {

		var date = new Date();
		var BranchObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newBranch.usuario = BranchObj.usuario;

		Branch.actualizar($scope.newBranch, function(response) {
			Swal.fire({
				toast:true,
				position: 'top-end',
				type: 'success',
				title: 'Branch actualizada correctamente',
				showConfirmButton: false,
				timer: 1000
			})

		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		$state.go('menuMaster.listBranch');

	};

	$scope.loadBranch = function() {
		Branch.findById($stateParams.idBranch, function(response) {
			if (response.data.status==1){
				$scope.newBranch = response.data.info[0];
				if($scope.newBranch.estado=='A'){
					$scope.newBranch.estado = true;
				}
			}
		});
	};

	$scope.loadBranch();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function BranchTableCtrl($scope, $rootScope, $state, $compile, $window, popupService, DTOptionsBuilder, DTColumnDefBuilder, Branch, URL_API) {
	var vm = this;

	vm.listBranch = listBranch;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.branch = {};

	Branch.findAll(function(response) {
		if (response.data.status==1){
			vm.branch = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteBranch = deleteBranch;
	vm.editBranch = editBranch;
	vm.activateBranch = activateBranch;

	function listBranch() {
		Branch.findAll(function(response) {
			if (response.data.status==1){
				vm.branch = response.data.info;
			}
		});

	};

	function reloadData() {
		Branch.findAll(function(response) {
			if (response.data.status==1){
				vm.branch = response.data.info;
			}
		});

	};

	function deleteBranch(BranchId) {
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
				Branch.borrar(BranchId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
					position: 'top-end',
					type: 'success',
					title: 'Marca de Tarjeta Inactivado',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
	};

	function editBranch(BranchId) {

		$state.go('menuMaster.editBranch', {
			idBranch : BranchId
		});

	};
	
	function activateBranch(BranchId) {
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
				Branch.activar(BranchId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
					position: 'top-end',
					type: 'success',
					title: 'Marca de Tarjeta Activado',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
	};
};

//BRANCH COLOR
function BranchColorAddCtrl($rootScope, $scope, $filter, $http, $state, BranchColor) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newBranchColor = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerBranchColor = function() {
		$scope.clearMessages();

		BranchColor.insertar($scope.newBranchColor,
		function(response) {

			$scope.reset();
			
			Swal.fire({
				toast:true,
				position: 'top-end',
				type: 'success',
				title: 'Color registrado correctamente',
				showConfirmButton: false,
				timer: 1000
			})
			//$scope.successMessages = [ 'Tipo de Promocion Registrada correctamente' ];

		},
		function(result) {
			if ((result.status == 409)
					|| (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		$state.go('menuMaster.listBranchColor');

	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function BranchColorEditCtrl($rootScope, $scope, $filter, $state, $stateParams, BranchColor) {

	$scope.updateBranchColor = function() {

		var date = new Date();
		var BranchColorObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newBranchColor.usuario = BranchColorObj.usuario;

		BranchColor.actualizar($scope.newBranchColor, function(response) {
			Swal.fire({
				toast:true,
				position: 'top-end',
				type: 'success',
				title: 'Color actualizado correctamente',
				showConfirmButton: false,
				timer: 1000
			})

		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		$state.go('menuMaster.listBranchColor');

	};

	$scope.loadBranchColor = function() {
		BranchColor.findById($stateParams.idBranchColor, function(response) {
			if (response.data.status==1){
				$scope.newBranchColor = response.data.info[0];
				if($scope.newBranchColor.estado=='A'){
					$scope.newBranchColor.estado = true;
				}
			}
		});
	};

	$scope.loadBranchColor();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function BranchColorTableCtrl($scope, $rootScope, $state, $compile, $window, popupService, DTOptionsBuilder, DTColumnDefBuilder, BranchColor, URL_API) {
	var vm = this;

	vm.listBranchColor = listBranchColor;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.branchColor = {};

	BranchColor.findAll(function(response) {
		if (response.data.status==1){
			vm.branchColor = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteBranchColor = deleteBranchColor;
	vm.editBranchColor = editBranchColor;
	vm.activateBranchColor = activateBranchColor;

	function listBranchColor() {
		BranchColor.findAll(function(response) {
			if (response.data.status==1){
				vm.branchColor = response.data.info;
			}
		});

	};

	function reloadData() {
		BranchColor.findAll(function(response) {
			if (response.data.status==1){
				vm.branchColor = response.data.info;
			}
		});

	};

	function deleteBranchColor(BranchColorId) {
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
				BranchColor.borrar(BranchColorId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
					position: 'top-end',
					type: 'success',
					title: 'Color Inactivado',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
	};

	function editBranchColor(BranchColorId) {

		$state.go('menuMaster.editBranchColor', {
			idBranchColor : BranchColorId
		});

	};
	
	function activateBranchColor(BranchColorId) {
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
				BranchColor.activar(BranchColorId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
					position: 'top-end',
					type: 'success',
					title: 'Color Activado',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
	};
	
};

//TARJETA BENEFICIO
function TarjetaBeneficioAddCtrl($rootScope, $scope, $filter, $http, $state, TarjetaBeneficio) {

	$scope.formType = 'ADD';

	$scope.isNew = function(value) {

		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {

		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {

		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newTarjetaBeneficio = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerTarjetaBeneficio = function() {
		$scope.clearMessages();

		TarjetaBeneficio.insertar($scope.newTarjetaBeneficio,
		function(response) {

			$scope.reset();
			
			Swal.fire({
				toast:true,
				position: 'top-end',
				type: 'success',
				title: 'Tarjeta Beneficio registrada correctamente',
				showConfirmButton: false,
				timer: 1000
			})
			//$scope.successMessages = [ 'Tipo de Promocion Registrada correctamente' ];

		},
		function(result) {
			if ((result.status == 409)
					|| (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		$state.go('menuMaster.listTarjetaBeneficio');

	};

	$scope.reset();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TarjetaBeneficioEditCtrl($rootScope, $scope, $filter, $state, $stateParams, TarjetaBeneficio) {

	$scope.updateTarjetaBeneficio = function() {

		var date = new Date();
		var TarjetaBeneficioObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newTarjetaBeneficio.usuario = TarjetaBeneficioObj.usuario;

		TarjetaBeneficio.actualizar($scope.newTarjetaBeneficio, function(response) {
			Swal.fire({
				toast:true,
				position: 'top-end',
				type: 'success',
				title: 'Tarjeta Beneficio actualizada correctamente',
				showConfirmButton: false,
				timer: 1000
			})

		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		$state.go('menuMaster.listTarjetaBeneficio');

	};

	$scope.loadTarjetaBeneficio = function() {
		TarjetaBeneficio.findById($stateParams.idTarjetaBeneficio, function(response) {
			if (response.data.status==1){
				$scope.newTarjetaBeneficio = response.data.info[0];
				if($scope.newTarjetaBeneficio.estado=='A'){
					$scope.newTarjetaBeneficio.estado = true;
				}
			}
		});
	};

	$scope.loadTarjetaBeneficio();

	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TarjetaBeneficioTableCtrl($scope, $rootScope, $state, $compile, $window, popupService, DTOptionsBuilder, DTColumnDefBuilder, TarjetaBeneficio, URL_API) {
	var vm = this;

	vm.listTarjetaBeneficio = listTarjetaBeneficio;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.tarjetaBeneficio = {};

	TarjetaBeneficio.findAll(function(response) {
		if (response.data.status==1){
			vm.tarjetaBeneficio = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteTarjetaBeneficio = deleteTarjetaBeneficio;
	vm.editTarjetaBeneficio = editTarjetaBeneficio;
	vm.activateTarjetaBeneficio = activateTarjetaBeneficio;

	function listTarjetaBeneficio() {
		TarjetaBeneficio.findAll(function(response) {
			if (response.data.status==1){
				vm.tarjetaBeneficio = response.data.info;
			}
		});

	};

	function reloadData() {
		TarjetaBeneficio.findAll(function(response) {
			if (response.data.status==1){
				vm.tarjetaBeneficio = response.data.info;
			}
		});

	};

	function deleteTarjetaBeneficio(TarjetaBeneficioId) {
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
				TarjetaBeneficio.borrar(TarjetaBeneficioId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
					position: 'top-end',
					type: 'success',
					title: 'Color Inactivado',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
		
	};

	function editTarjetaBeneficio(TarjetaBeneficioId) {

		$state.go('menuMaster.editTarjetaBeneficio', {
			idTarjetaBeneficio : TarjetaBeneficioId
		});

	};
	
	function activateTarjetaBeneficio(TarjetaBeneficioId) {
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
				TarjetaBeneficio.activar(TarjetaBeneficioId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
					position: 'top-end',
					type: 'success',
					title: 'Color Activado',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})
		
	};
	
};


// TIPO COLA
function TipoColaAddCtrl($rootScope, $scope, $filter, $http, $state, TipoCola) {

	$scope.formType = 'ADD';
	$scope.isNew = function(value) {
		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {
		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newTipoCola = {
			id : "",
			descripcion : "",
			abreviatura : "",
			logo : "",
			ip_impresora : "",
			estado : "",
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.clearMessages();
	};

	$scope.registerTipoCola = function() {
		$scope.clearMessages();

		TipoCola.insertar($scope.newTipoCola, function(response) {

							$scope.reset();

							$scope.successMessages = [ 'Tipo de Cola Registrada correctamente' ];

						}, function(result) {
							if ((result.status == 409)
									|| (result.status == 400)) {
								$scope.errors = result.data;
							} else {
								$scope.errorMessages = [ 'Unknown error de servidor' ];
							}
						});
		////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listTipoCola');
	};
	$scope.reset();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoColaEditCtrl($rootScope, $scope, $filter, $state, $stateParams, TipoCola) {

	$scope.updateTipoCola = function() {

		var date = new Date();
		var TipoColaObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newTipoCola.usuario = TipoColaObj.usuario;

		TipoCola.actualizar($scope.newTipoCola,	function(response) {
							$scope.successMessages = [ 'Tipo de Cola Actualizada Correctamente' ];
						}, function(result) {
							if ((result.status == 409)
									|| (result.status == 400)) {
								$scope.errors = result.data;
							} else {
								$scope.errorMessages = [ 'Unknown error de servidor' ];
							}
						});
		////$('#notificacionesModal').modal('show');
		$state.go('menuMaster.listTipoCola');
	};

	$scope.loadTipoCola = function() {
		TipoCola.findById($stateParams.idTipoCola, function(response) {
			if (response.data.status==1){
				$scope.newTipoCola = response.data.info[0];
				if($scope.newTipoCola.estado=='A'){
					$scope.newTipoCola.estado = true;
				}
			}
			else{
				$scope.newTipoCola = [];
			}
		});
	};
	$scope.loadTipoCola();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoColaTableCtrl($scope, $rootScope, $state, $compile, $window, popupService, DTOptionsBuilder, DTColumnDefBuilder, TipoCola, URL_API) {
	var vm = this;

	vm.listTipoCola = listTipoCola;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.tipoCola = {};

	TipoCola.findAll(function(response) {
		if (response.data.status==1){
			vm.tipoCola = response.data.info;
		}
		else{
			vm.tipoCola = [];
		}
	});
	
	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
		'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
		DTColumnDefBuilder.newColumnDef(1),
		DTColumnDefBuilder.newColumnDef(2),
		DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteTipoCola = deleteTipoCola;
	vm.editTipoCola = editTipoCola;
	vm.activateTipoCola = activateTipoCola;
	
	function listTipoCola() {
		TipoCola.findAll(function(response) {
			if (response.data.status==1){
				vm.tipoCola = response.data.info;
			}
			else{
				vm.tipoCola = [];
			}
		});
	}
	;

	function reloadData() {
		TipoCola.findAll(function(response) {
			if (response.data.status==1){
				vm.tipoCola = response.data.info;
			}
			else{
				vm.tipoCola = [];
			}
		});

	}
	;

	function deleteTipoCola(tipoColaId) {
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
				TipoCola.borrar(tipoColaId,
					$rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo de Cola Inactivada',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
	}
	;
	
	function activateTipoCola(tipoColaId) {
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
				TipoCola.activar(tipoColaId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
				
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo de Cola Activada',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
	};	
		

	function editTipoCola(tipoColaId) {

		$state.go('menuMaster.editTipoCola', {
			idTipoCola : tipoColaId
		});
	};

}

/** ********* CTG_CONF *********** */

// *************************************************CONTABILIDAD*******************************************************

// TIPO DE AUXILIAR
function TipoAuxiliarAddCtrl($rootScope, $scope, $filter, $http, $state, TipoAuxiliar) {

	$scope.formType = 'ADD';
	$scope.isNew = function(value) {
		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {
		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newTipoAuxiliar = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};
		$scope.clearMessages();
	};

	$scope.registerTipoAuxiliar = function() {
		$scope.clearMessages();

		TipoAuxiliar.insertar($scope.newTipoAuxiliar,	function(response) {

			$scope.reset();

			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro almacenado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listTipoAuxiliar');
		},function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
	};
	$scope.reset();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoAuxiliarEditCtrl($rootScope, $scope, $filter, $state, $stateParams,	TipoAuxiliar) {

	$scope.updateTipoAuxiliar = function() {

		var date = new Date();
		var TipoAuxiliarObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newTipoAuxiliar.usuario = TipoAuxiliarObj.usuario;

		TipoAuxiliar.actualizar($scope.newTipoAuxiliar, function(response) {
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro actualizado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listTipoAuxiliar');
		},
		function(result) {
			if ((result.status == 409)
			|| (result.status == 400)) {
			$scope.errors = result.data;
			} else {
			$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		
	};

	$scope.loadTipoAuxiliar = function() {
		TipoAuxiliar.findById($stateParams.idTipoAuxiliar, function(response) {
			if (response.data.status==1){
				$scope.newTipoAuxiliar = response.data.info[0];
				if($scope.newTipoAuxiliar.estado=='A'){
					$scope.newTipoAuxiliar.estado = true;
				}
			}
		});
	};

	$scope.loadTipoAuxiliar();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoAuxiliarTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, TipoAuxiliar, URL_API) {
	var vm = this;

	vm.listTipoAuxiliar = listTipoAuxiliar;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.tipoAuxiliar = {};

	TipoAuxiliar.findAll(function(response) {
		if (response.data.status==1){
			vm.tipoAuxiliar = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteTipoAuxiliar = deleteTipoAuxiliar;
	vm.editTipoAuxiliar = editTipoAuxiliar;
	vm.activateTipoAuxiliar = activateTipoAuxiliar;

	function listTipoAuxiliar() {
		TipoAuxiliar.findAll(function(response) {
			if (response.data.status==1){
				vm.tipoAuxiliar = response.data.info;
			}
		});

	};

	function reloadData() {
		TipoAuxiliar.findAll(function(response) {
			if (response.data.status==1){
				vm.tipoAuxiliar = response.data.info;
			}
		});
	};

	function deleteTipoAuxiliar(tipoAuxiliarId) {
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
				TipoAuxiliar.borrar(tipoAuxiliarId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo de Documento Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};

	function editTipoAuxiliar(tipoAuxiliarId) {
		$state.go('menuMaster.editTipoAuxiliar', {
			idTipoAuxiliar : tipoAuxiliarId
		});
	};
	
	function activateTipoAuxiliar(tipoAuxiliarId) {
		
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
				TipoAuxiliar.activar(tipoAuxiliarId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo de Documento Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};
};

// AUXILIAR
function AuxiliarAddCtrl($rootScope, $scope, $filter, $http, $state, Auxiliar, TipoAuxiliar) {
	$scope.edit = true;
	$scope.formType = 'ADD';
	$scope.isNew = function(value) {
		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {
		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newAuxiliar = {
			id : "",
			id_tipo_auxiliar : "",
			codigo : "",
			descripcion : "",
			ref_1 : "",
			ref_2 : "",
			agente_retencion : 0,
			estado : "",
			usuario : $rootScope.globals.currentUser.username
		};
		$scope.clearMessages();
	};

	$scope.registerAuxiliar = function() {
		$scope.clearMessages();

		Auxiliar.insertar($scope.newAuxiliar,	function(response) {

			$scope.reset();

			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro almacenado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listAuxiliar');
		},function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
	};
	$scope.reset();
	
	$scope.loadTipoAuxiliar = function() {
		TipoAuxiliar.findAll(function(response) {
			if (response.data.status==1){
				$scope.tipoAuxiliar = response.data.info;
			}
			else{ 
				$scope.tipoAuxiliar = [];
			}
		});
	};
	$scope.loadTipoAuxiliar();
	
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function AuxiliarEditCtrl($rootScope, $scope, $filter, $state, $stateParams, Auxiliar, TipoAuxiliar) {
	$scope.edit = false;
	$scope.updateAuxiliar = function() {

		var date = new Date();
		var AuxiliarObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newAuxiliar.usuario = AuxiliarObj.usuario;

		Auxiliar.actualizar($scope.newAuxiliar, function(response) {
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro actualizado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listAuxiliar');
		},
		function(result) {
			if ((result.status == 409)
			|| (result.status == 400)) {
			$scope.errors = result.data;
			} else {
			$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		
	};
		
	$scope.loadTipoAuxiliar = function() {
		TipoAuxiliar.findAllA(function(response) {
			if (response.data.status==1){
				$scope.tipoAuxiliar = response.data.info;
			}
			else{ 
				$scope.tipoAuxiliar = [];
			}
		});
	};
	$scope.loadTipoAuxiliar();
		
	$scope.loadAuxiliar = function() {
		Auxiliar.findById($stateParams.idTipoAuxiliar,$stateParams.idAuxiliar, function(response) {
			if (response.data.status==1){
				
				$scope.newAuxiliar = response.data.info[0];
				$scope.newAuxiliar.agente_retencion = Number(response.data.info[0].agente_retencion);
				if($scope.newAuxiliar.estado=='A'){
					$scope.newAuxiliar.estado = true;
				}
				//console.log($scope.newAuxiliar);
			}
			else $scope.newAuxiliar = [];
		});
	};

	$scope.loadAuxiliar();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function AuxiliarTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, Auxiliar, URL_API) {
	var vm = this;

	vm.listAuxiliar = listAuxiliar;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.auxiliar = {};

	Auxiliar.findAll(function(response) {
		if (response.data.status==1){
			vm.auxiliar = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteAuxiliar = deleteAuxiliar;
	vm.editAuxiliar = editAuxiliar;
	vm.activateAuxiliar = activateAuxiliar;

	function listAuxiliar() {
		Auxiliar.findAll(function(response) {
			if (response.data.status==1){
				vm.auxiliar = response.data.info;
			}
		});

	};

	function reloadData() {
		Auxiliar.findAll(function(response) {
			if (response.data.status==1){
				vm.auxiliar = response.data.info;
			}
		});
	};

	function deleteAuxiliar(tipoAuxiliarId, auxiliarId) {
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
				Auxiliar.borrar(tipoAuxiliarId, auxiliarId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Registro Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};

	function editAuxiliar(tipoAuxiliarId, auxiliarId) {
		$state.go('menuMaster.editAuxiliar', {
			idTipoAuxiliar : tipoAuxiliarId
			, idAuxiliar : auxiliarId
		});
	};
	
	function activateAuxiliar(tipoAuxiliarId, auxiliarId) {
		
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
				Auxiliar.activar(tipoAuxiliarId, auxiliarId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Registro Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};
};

// TIPO DE ASIENTO
function TipoAsientoAddCtrl($rootScope, $scope, $filter, $http, $state, TipoAsiento) {

	$scope.formType = 'ADD';
	$scope.isNew = function(value) {
		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {
		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newTipoAsiento = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};
		$scope.clearMessages();
	};

	$scope.registerTipoAsiento = function() {
		$scope.clearMessages();

		TipoAsiento.insertar($scope.newTipoAsiento,	function(response) {

			$scope.reset();

			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro almacenado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listTipoAsiento');
		},function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
	};
	$scope.reset();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoAsientoEditCtrl($rootScope, $scope, $filter, $state, $stateParams,	TipoAsiento) {

	$scope.updateTipoAsiento = function() {

		var date = new Date();
		var TipoAsientoObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newTipoAsiento.usuario = TipoAsientoObj.usuario;

		TipoAsiento.actualizar($scope.newTipoAsiento, function(response) {
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro actualizado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listTipoAsiento');
		},
		function(result) {
			if ((result.status == 409)
			|| (result.status == 400)) {
			$scope.errors = result.data;
			} else {
			$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		
	};

	$scope.loadTipoAsiento = function() {
		TipoAsiento.findById($stateParams.idTipoAsiento, function(response) {
			if (response.data.status==1){
				$scope.newTipoAsiento = response.data.info[0];
				if($scope.newTipoAsiento.estado=='A'){
					$scope.newTipoAsiento.estado = true;
				}
			}
		});
	};

	$scope.loadTipoAsiento();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoAsientoTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, TipoAsiento, URL_API) {
	var vm = this;

	vm.listTipoAsiento = listTipoAsiento;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.tipoAsiento = [];

	TipoAsiento.findAll(function(response) {
		if (response.data.status==1){
			vm.tipoAsiento = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteTipoAsiento = deleteTipoAsiento;
	vm.editTipoAsiento = editTipoAsiento;
	vm.activateTipoAsiento = activateTipoAsiento;

	function listTipoAsiento() {
		TipoAsiento.findAll(function(response) {
			if (response.data.status==1){
				vm.tipoAsiento = response.data.info;
			}
		});

	};

	function reloadData() {
		TipoAsiento.findAll(function(response) {
			if (response.data.status==1){
				vm.tipoAsiento = response.data.info;
			}
		});
	};

	function deleteTipoAsiento(tipoAsientoId) {
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
				TipoAsiento.borrar(tipoAsientoId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo de Documento Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};

	function editTipoAsiento(tipoAsientoId) {
		$state.go('menuMaster.editTipoAsiento', {
			idTipoAsiento : tipoAsientoId
		});
	};
	
	function activateTipoAsiento(tipoAsientoId) {
		
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
				TipoAsiento.activar(tipoAsientoId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo de Documento Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};
};

// TIPO DE CUENTA
function TipoCuentaAddCtrl($rootScope, $scope, $filter, $http, $state, TipoCuenta) {

	$scope.formType = 'ADD';
	$scope.isNew = function(value) {
		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {
		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newTipoCuenta = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};
		$scope.clearMessages();
	};

	$scope.registerTipoCuenta = function() {
		$scope.clearMessages();

		TipoCuenta.insertar($scope.newTipoCuenta,	function(response) {

			$scope.reset();

			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro almacenado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listTipoCuenta');
		},function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
	};
	$scope.reset();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoCuentaEditCtrl($rootScope, $scope, $filter, $state, $stateParams,	TipoCuenta) {

	$scope.updateTipoCuenta = function() {

		var date = new Date();
		var TipoCuentaObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newTipoCuenta.usuario = TipoCuentaObj.usuario;

		TipoCuenta.actualizar($scope.newTipoCuenta, function(response) {
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro actualizado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listTipoCuenta');
		},
		function(result) {
			if ((result.status == 409)
			|| (result.status == 400)) {
			$scope.errors = result.data;
			} else {
			$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		
	};

	$scope.loadTipoCuenta = function() {
		TipoCuenta.findById($stateParams.idTipoCuenta, function(response) {
			if (response.data.status==1){
				$scope.newTipoCuenta = response.data.info[0];
				if($scope.newTipoCuenta.estado=='A'){
					$scope.newTipoCuenta.estado = true;
				}
			}
		});
	};

	$scope.loadTipoCuenta();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoCuentaTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, TipoCuenta, URL_API) {
	var vm = this;

	vm.listTipoCuenta = listTipoCuenta;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.tipoCuenta = [];

	TipoCuenta.findAll(function(response) {
		if (response.data.status==1){
			vm.tipoCuenta = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteTipoCuenta = deleteTipoCuenta;
	vm.editTipoCuenta = editTipoCuenta;
	vm.activateTipoCuenta = activateTipoCuenta;

	function listTipoCuenta() {
		TipoCuenta.findAll(function(response) {
			if (response.data.status==1){
				vm.tipoCuenta = response.data.info;
			}
		});

	};

	function reloadData() {
		TipoCuenta.findAll(function(response) {
			if (response.data.status==1){
				vm.tipoCuenta = response.data.info;
			}
		});
	};

	function deleteTipoCuenta(tipoCuentaId) {
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
				TipoCuenta.borrar(tipoCuentaId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo de Documento Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};

	function editTipoCuenta(tipoCuentaId) {
		$state.go('menuMaster.editTipoCuenta', {
			idTipoCuenta : tipoCuentaId
		});
	};
	
	function activateTipoCuenta(tipoCuentaId) {
		
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
				TipoCuenta.activar(tipoCuentaId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Tipo de Documento Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};
};

// TIPO DE PLANTILLA
function TipoPlantillaAddCtrl($rootScope, $scope, $filter, $http, $state, TipoPlantilla) {

	$scope.formType = 'ADD';
	$scope.isNew = function(value) {
		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {
		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newTipoPlantilla = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};
		$scope.clearMessages();
	};

	$scope.registerTipoPlantilla = function() {
		$scope.clearMessages();

		TipoPlantilla.insertar($scope.newTipoPlantilla,	function(response) {

			$scope.reset();

			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro almacenado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listTipoPlantilla');
		},function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
	};
	$scope.reset();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoPlantillaEditCtrl($rootScope, $scope, $filter, $state, $stateParams,	TipoPlantilla) {

	$scope.updateTipoPlantilla = function() {

		var date = new Date();
		var TipoPlantillaObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newTipoPlantilla.usuario = TipoPlantillaObj.usuario;

		TipoPlantilla.actualizar($scope.newTipoPlantilla, function(response) {
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro actualizado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listTipoPlantilla');
		},
		function(result) {
			if ((result.status == 409)
			|| (result.status == 400)) {
			$scope.errors = result.data;
			} else {
			$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		
	};

	$scope.loadTipoPlantilla = function() {
		TipoPlantilla.findById($stateParams.idTipoPlantilla, function(response) {
			if (response.data.status==1){
				$scope.newTipoPlantilla = response.data.info[0];
				if($scope.newTipoPlantilla.estado=='A'){
					$scope.newTipoPlantilla.estado = true;
				}
			}
		});
	};

	$scope.loadTipoPlantilla();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function TipoPlantillaTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, TipoPlantilla, URL_API) {
	var vm = this;

	vm.listTipoPlantilla = listTipoPlantilla;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.tipoPlantilla = [];

	TipoPlantilla.findAll(function(response) {
		if (response.data.status==1){
			vm.tipoPlantilla = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteTipoPlantilla = deleteTipoPlantilla;
	vm.editTipoPlantilla = editTipoPlantilla;
	vm.activateTipoPlantilla = activateTipoPlantilla;

	function listTipoPlantilla() {
		TipoPlantilla.findAll(function(response) {
			if (response.data.status==1){
				vm.tipoPlantilla = response.data.info;
			}
		});

	};

	function reloadData() {
		TipoPlantilla.findAll(function(response) {
			if (response.data.status==1){
				vm.tipoPlantilla = response.data.info;
			}
		});
	};

	function deleteTipoPlantilla(tipoPlantillaId) {
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
				TipoPlantilla.borrar(tipoPlantillaId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Registro Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};

	function editTipoPlantilla(tipoPlantillaId) {
		$state.go('menuMaster.editTipoPlantilla', {
			idTipoPlantilla : tipoPlantillaId
		});
	};
	
	function activateTipoPlantilla(tipoPlantillaId) {
		
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
				TipoPlantilla.activar(tipoPlantillaId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Regsitro Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};
};

//CENTRO DE COSTO
function CentroCostoAddCtrl($rootScope, $scope, $filter, $http, $state, CentroCosto) {

	$scope.formType = 'ADD';
	$scope.isNew = function(value) {
		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {
		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newCentroCosto = {
			descripcion : "",
			total : "",
			usuario : $rootScope.globals.currentUser.username
		};
		$scope.clearMessages();
	};

	$scope.registerCentroCosto = function() {
		$scope.clearMessages();

		CentroCosto.insertar($scope.newCentroCosto,	function(response) {

			$scope.reset();

			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro almacenado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listCentroCosto');
		},function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
	};
	$scope.reset();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function CentroCostoEditCtrl($rootScope, $scope, $filter, $state, $stateParams,	CentroCosto) {

	$scope.updateCentroCosto = function() {

		var date = new Date();
		var CentroCostoObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newCentroCosto.usuario = CentroCostoObj.usuario;

		CentroCosto.actualizar($scope.newCentroCosto, function(response) {
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro actualizado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listCentroCosto');
		},
		function(result) {
			if ((result.status == 409)
			|| (result.status == 400)) {
			$scope.errors = result.data;
			} else {
			$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		
	};

	$scope.loadCentroCosto = function() {
		CentroCosto.findById($stateParams.idCentroCosto, function(response) {
			if (response.data.status==1){
				$scope.newCentroCosto = response.data.info[0];
				if($scope.newCentroCosto.estado=='A'){
					$scope.newCentroCosto.estado = true;
				}
			}
		});
	};

	$scope.loadCentroCosto();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function CentroCostoTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, CentroCosto, URL_API) {
	var vm = this;

	vm.listCentroCosto = listCentroCosto;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.centroCosto = [];

	CentroCosto.findAll(function(response) {
		if (response.data.status==1){
			vm.centroCosto = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnsDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3),
			DTColumnDefBuilder.newColumnDef(4) ];

	vm.deleteCentroCosto = deleteCentroCosto;
	vm.editCentroCosto = editCentroCosto;
	vm.activateCentroCosto = activateCentroCosto;

	function listCentroCosto() {
		CentroCosto.findAll(function(response) {
			if (response.data.status==1){
				vm.centroCosto = response.data.info;
			}
		});

	};

	function reloadData() {
		CentroCosto.findAll(function(response) {
			if (response.data.status==1){
				vm.centroCosto = response.data.info;
			}
		});
	};

	function deleteCentroCosto(centroCostoId) {
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
				CentroCosto.borrar(centroCostoId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Registro Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};

	function editCentroCosto(centroCostoId) {
		$state.go('menuMaster.editCentroCosto', {
			idCentroCosto : centroCostoId
		});
	};
	
	function activateCentroCosto(centroCostoId) {
		
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
				CentroCosto.activar(centroCostoId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Registro Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};
};

// MONEDA
function MonedaAddCtrl($rootScope, $scope, $filter, $http, $state, Moneda) {

	$scope.formType = 'ADD';
	$scope.isNew = function(value) {
		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {
		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newMoneda = {
			descripcion : "",
			usuario : $rootScope.globals.currentUser.username
		};
		$scope.clearMessages();
	};

	$scope.registerMoneda = function() {
		$scope.clearMessages();

		Moneda.insertar($scope.newMoneda,	function(response) {

			$scope.reset();

			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro almacenado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listMoneda');
		},function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
	};
	$scope.reset();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function MonedaEditCtrl($rootScope, $scope, $filter, $state, $stateParams,	Moneda) {

	$scope.updateMoneda = function() {

		var date = new Date();
		var MonedaObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newMoneda.usuario = MonedaObj.usuario;

		Moneda.actualizar($scope.newMoneda, function(response) {
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro actualizado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listMoneda');
		},
		function(result) {
			if ((result.status == 409)
			|| (result.status == 400)) {
			$scope.errors = result.data;
			} else {
			$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		
	};

	$scope.loadMoneda = function() {
		Moneda.findById($stateParams.idMoneda, function(response) {
			if (response.data.status==1){
				$scope.newMoneda = response.data.info[0];
				if($scope.newMoneda.estado=='A'){
					$scope.newMoneda.estado = true;
				}
			}
		});
	};

	$scope.loadMoneda();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function MonedaTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, Moneda, URL_API) {
	var vm = this;

	vm.listMoneda = listMoneda;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.moneda = [];

	Moneda.findAll(function(response) {
		if (response.data.status==1){
			vm.moneda = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	vm.deleteMoneda = deleteMoneda;
	vm.editMoneda = editMoneda;
	vm.activateMoneda = activateMoneda;

	function listMoneda() {
		Moneda.findAll(function(response) {
			if (response.data.status==1){
				vm.moneda = response.data.info;
			}
		});

	};

	function reloadData() {
		Moneda.findAll(function(response) {
			if (response.data.status==1){
				vm.moneda = response.data.info;
			}
		});
	};

	function deleteMoneda(monedaId) {
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
				Moneda.borrar(monedaId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Registro Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};

	function editMoneda(monedaId) {
		$state.go('menuMaster.editMoneda', {
			idMoneda : monedaId
		});
	};
	
	function activateMoneda(monedaId) {
		
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
				Moneda.activar(monedaId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Registro Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};
};

//NATURALEZA CUENTA 
function CuentaNaturalezaAddCtrl($rootScope, $scope, $filter, $http, $state, CuentaNaturaleza) {

	$scope.formType = 'ADD';
	$scope.isNew = function(value) {
		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {
		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newCuentaNaturaleza = {
			descripcion : "",
			total : "",
			usuario : $rootScope.globals.currentUser.username
		};
		$scope.clearMessages();
	};

	$scope.registerCuentaNaturaleza = function() {
		$scope.clearMessages();

		CuentaNaturaleza.insertar($scope.newCuentaNaturaleza,	function(response) {

			$scope.reset();

			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro almacenado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listCuentaNaturaleza');
		},function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
	};
	$scope.reset();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function CuentaNaturalezaEditCtrl($rootScope, $scope, $filter, $state, $stateParams,	CuentaNaturaleza) {

	$scope.updateCuentaNaturaleza = function() {

		var date = new Date();
		var CuentaNaturalezaObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newCuentaNaturaleza.usuario = CuentaNaturalezaObj.usuario;

		CuentaNaturaleza.actualizar($scope.newCuentaNaturaleza, function(response) {
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro actualizado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listCuentaNaturaleza');
		},
		function(result) {
			if ((result.status == 409)
			|| (result.status == 400)) {
			$scope.errors = result.data;
			} else {
			$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		
	};

	$scope.loadCuentaNaturaleza = function() {
		CuentaNaturaleza.findById($stateParams.idCuentaNaturaleza, function(response) {
			if (response.data.status==1){
				$scope.newCuentaNaturaleza = response.data.info[0];
				if($scope.newCuentaNaturaleza.estado=='A'){
					$scope.newCuentaNaturaleza.estado = true;
				}
			}
		});
	};

	$scope.loadCuentaNaturaleza();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function CuentaNaturalezaTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, CuentaNaturaleza, URL_API) {
	var vm = this;

	vm.listCuentaNaturaleza = listCuentaNaturaleza;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.cuentaNaturaleza = [];

	CuentaNaturaleza.findAll(function(response) {
		if (response.data.status==1){
			vm.cuentaNaturaleza = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnsDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3) ];

	vm.deleteCuentaNaturaleza = deleteCuentaNaturaleza;
	vm.editCuentaNaturaleza = editCuentaNaturaleza;
	vm.activateCuentaNaturaleza = activateCuentaNaturaleza;

	function listCuentaNaturaleza() {
		CuentaNaturaleza.findAll(function(response) {
			if (response.data.status==1){
				vm.cuentaNaturaleza = response.data.info;
			}
		});

	};

	function reloadData() {
		CuentaNaturaleza.findAll(function(response) {
			if (response.data.status==1){
				vm.cuentaNaturaleza = response.data.info;
			}
		});
	};

	function deleteCuentaNaturaleza(cuentaNaturalezaId) {
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
				CuentaNaturaleza.borrar(cuentaNaturalezaId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Registro Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};

	function editCuentaNaturaleza(cuentaNaturalezaId) {
		$state.go('menuMaster.editCuentaNaturaleza', {
			idCuentaNaturaleza : cuentaNaturalezaId
		});
	};
	
	function activateCuentaNaturaleza(cuentaNaturalezaId) {
		
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
				CuentaNaturaleza.activar(cuentaNaturalezaId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Registro Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};
};

//ELEMENTO
function ElementoAddCtrl($rootScope, $scope, $filter, $http, $state, Elemento) {

	$scope.formType = 'ADD';
	$scope.isNew = function(value) {
		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {
		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newElemento = {
			descripcion : "",
			total : "",
			usuario : $rootScope.globals.currentUser.username
		};
		$scope.clearMessages();
	};

	$scope.registerElemento = function() {
		$scope.clearMessages();

		Elemento.insertar($scope.newElemento,	function(response) {

			$scope.reset();

			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro almacenado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listElemento');
		},function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
	};
	$scope.reset();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function ElementoEditCtrl($rootScope, $scope, $filter, $state, $stateParams,	Elemento) {

	$scope.updateElemento = function() {

		var date = new Date();
		var ElementoObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newElemento.usuario = ElementoObj.usuario;

		Elemento.actualizar($scope.newElemento, function(response) {
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro actualizado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listElemento');
		},
		function(result) {
			if ((result.status == 409)
			|| (result.status == 400)) {
			$scope.errors = result.data;
			} else {
			$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		
	};

	$scope.loadElemento = function() {
		Elemento.findById($stateParams.idElemento, function(response) {
			if (response.data.status==1){
				$scope.newElemento = response.data.info[0];
				if($scope.newElemento.estado=='A'){
					$scope.newElemento.estado = true;
				}
			}
		});
	};

	$scope.loadElemento();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function ElementoTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, Elemento, URL_API) {
	var vm = this;

	vm.listElemento = listElemento;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.elemento = [];

	Elemento.findAll(function(response) {
		if (response.data.status==1){
			vm.elemento = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnsDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3) ];

	vm.deleteElemento = deleteElemento;
	vm.editElemento = editElemento;
	vm.activateElemento = activateElemento;

	function listElemento() {
		Elemento.findAll(function(response) {
			if (response.data.status==1){
				vm.elemento = response.data.info;
			}
		});

	};

	function reloadData() {
		Elemento.findAll(function(response) {
			if (response.data.status==1){
				vm.elemento = response.data.info;
			}
		});
	};

	function deleteElemento(elementoId) {
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
				Elemento.borrar(elementoId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Registro Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};

	function editElemento(elementoId) {
		$state.go('menuMaster.editElemento', {
			idElemento : elementoId
		});
	};
	
	function activateElemento(elementoId) {
		
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
				Elemento.activar(elementoId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Registro Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};
};

//RUBRO
function RubroAddCtrl($rootScope, $scope, $filter, $http, $state, Elemento, Rubro) {

	$scope.formType = 'ADD';
	$scope.isNew = function(value) {
		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {
		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newRubro = {
			id_elemento : "",
			descripcion : "",
			total : "",
			usuario : $rootScope.globals.currentUser.username
		};
		$scope.clearMessages();
	};

	$scope.registerRubro = function() {
		$scope.clearMessages();

		Rubro.insertar($scope.newRubro,	function(response) {

			$scope.reset();

			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro almacenado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listRubro');
		},function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
	};
	$scope.reset();
	
	$scope.loadElemento = function() {
		Elemento.findAllA(function(response) {
			if (response.data.status==1){
				$scope.elemento = response.data.info;
			}
			else{
				$scope.elemento = [];
			}
		});
	};

	$scope.loadElemento();
	
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function RubroEditCtrl($rootScope, $scope, $filter, $state, $stateParams, Elemento, Rubro) {
	$scope.edit = true;
	$scope.updateRubro = function() {

		var date = new Date();
		var RubroObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newRubro.usuario = RubroObj.usuario;

		Rubro.actualizar($scope.newRubro, function(response) {
			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro actualizado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listRubro');
		},
		function(result) {
			if ((result.status == 409)
			|| (result.status == 400)) {
			$scope.errors = result.data;
			} else {
			$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		
	};

	$scope.loadRubro = function() {
		Rubro.findById($stateParams.idElemento, $stateParams.idRubro, function(response) {
			if (response.data.status==1){
				$scope.newRubro = response.data.info[0];
				if($scope.newRubro.estado=='A'){
					$scope.newRubro.estado = true;
				}
			}
		});
	};

	$scope.loadRubro();
	
	$scope.loadElemento = function() {
		Elemento.findAllA(function(response) {
			if (response.data.status==1){
				$scope.elemento = response.data.info;
			}
			else{
				$scope.elemento = [];
			}
		});
	};

	$scope.loadElemento();
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function RubroTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, Rubro, URL_API) {
	var vm = this;

	vm.listRubro = listRubro;
	vm.reloadData = reloadData;

	vm.message = '';
	vm.rubro = [];

	Rubro.findAll(function(response) {
		if (response.data.status==1){
			vm.rubro = response.data.info;
		}
	});

	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnsDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3),
			DTColumnDefBuilder.newColumnDef(4),
			DTColumnDefBuilder.newColumnDef(5) ];

	vm.deleteRubro = deleteRubro;
	vm.editRubro = editRubro;
	vm.activateRubro = activateRubro;

	function listRubro() {
		Rubro.findAll(function(response) {
			if (response.data.status==1){
				vm.rubro = response.data.info;
			}
		});

	};

	function reloadData() {
		Rubro.findAll(function(response) {
			if (response.data.status==1){
				vm.rubro = response.data.info;
			}
		});
	};

	function deleteRubro(elementoId, rubroId) {
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
				Rubro.borrar(elementoId, rubroId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Registro Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};

	function editRubro(elementoId, rubroId) {
		$state.go('menuMaster.editRubro', {
			idElemento : elementoId,
			idRubro : rubroId
		});
	};
	
	function activateRubro(elementoId, rubroId) {
		
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
				Rubro.activar(elementoId, rubroId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Registro Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};
};

//CUENTA
function CuentaAddCtrl($rootScope, $scope, $filter, $http, $state, Elemento, Rubro, Auxiliar, CentroCosto, CuentaNaturaleza, Cuenta) {

	$scope.formType = 'ADD';
	$scope.isNew = function(value) {
		if (value == 'ADD')
			return true;
		else
			return false;
	};

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {
		// Sets the form to it's pristine state
		if ($scope.regForm) {
			$scope.regForm.$setPristine();
		}

		var date = new Date();
		$scope.newCuenta = {
			id : "",
			cuenta : "",
			id_cuenta_padre : "",
			id_elemento : "",
			id_rubro : "",
			id_auxiliar : "",
			id_centro_costo : "",
			descripcion : "",
			id_naturaleza : "",
			nivel_cuenta : "3",
			mayor : 0,
			movimiento : 0,
			hoja_trabajo : 0,
			saldo_debe : 0.00,
			saldo_haber : 0.00,
			saldo : 0.00,
			estado : "A",
			_attachments_uri:{image:""},
			usuario : $rootScope.globals.currentUser.username
		};
		$scope.clearMessages();
	};

	$scope.registerCuenta = function() {
		$scope.clearMessages();

		Cuenta.insertar($scope.newCuenta,	function(response) {

			$scope.reset();

			Swal.fire({
				toast: true,
				position: 'top-end',
				type: 'success',
				title: 'Exito',
				text: "Registro almacenado correctamente",
				showConfirmButton: false,
				timer: 2000
			});
			$state.go('menuMaster.listCuenta');
		},function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
	};
	$scope.reset();
	
	$scope.loadElemento = function() {
		Elemento.findAllA(function(response) {
			if (response.data.status==1){
				$scope.elemento = response.data.info;
			}
			else{
				$scope.elemento = [];
			}
		});
	};
	
	$scope.updateRubro = function() {
		$scope.rubro = [];
		$scope.newCuenta.id_rubro="";
		Rubro.findByIdElemento($scope.newCuenta.id_elemento, function(response) {
			if (response.status==1){
				$scope.rubro = response.info;
			}
			else{
				$scope.rubro = [];
			}
		});
	};

	$scope.loadElemento();
	
	$scope.loadAuxiliar = function() {
		Auxiliar.findAllA(function(response) {
			if (response.data.status==1){
				$scope.auxiliar = response.data.info;
			}
			else{
				$scope.auxiliar = [];
			}
		});
	};
	$scope.loadAuxiliar();
	
	$scope.loadCuenta = function() {
		Cuenta.findAllA(function(response) {
			if (response.data.status==1){
				$scope.cuenta = response.data.info;
			}
			else{
				$scope.cuenta = [];
			}
		});
	};
	$scope.loadCuenta();
	
	$scope.loadCentroCosto = function() {
		CentroCosto.findAllA(function(response) {
			if (response.data.status==1){
				$scope.centro_costo = response.data.info;
			}
			else{
				$scope.centro_costo = [];
			}
		});
	};
	$scope.loadCentroCosto();
	
	$scope.loadCuentaNaturaleza = function() {
		CuentaNaturaleza.findAllA(function(response) {
			if (response.data.status==1){
				$scope.cuenta_naturaleza = response.data.info;
			}
			else{
				$scope.cuenta_naturaleza = [];
			}
		});
	};
	$scope.loadCuentaNaturaleza();
	
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function CuentaEditCtrl($rootScope, $scope, $filter, $state, $stateParams, Elemento, Rubro, Auxiliar, CentroCosto, CuentaNaturaleza, Cuenta) {
	$scope.edit = true;
	$scope.newCuenta = {
		id : "",
		cuenta : "",
		id_cuenta_padre : "",
		cuenta_padre : "",
		id_elemento : "",
		id_rubro : "",
		id_auxiliar : "",
		auxiliar : "",
		id_centro_costo : "",
		centro_costo : "",
		descripcion : "",
		id_naturaleza : "",
		naturaleza : "",
		nivel_cuenta : "3",
		mayor : 0,
		movimiento : 0,
		hoja_trabajo : 0,
		saldo_debe : 0.00,
		saldo_haber : 0.00,
		saldo : 0.00,
		estado : "A",
		_attachments_uri:{image:""},
		usuario : $rootScope.globals.currentUser.username
	};
		
	$scope.updateCuenta = function() {

		var date = new Date();
		var CuentaObj = {
			usuario : $rootScope.globals.currentUser.username
		};

		$scope.newCuenta.usuario = CuentaObj.usuario;
		
		//console.log($scope.newCuenta);
		Cuenta.actualizar($scope.newCuenta, function(response) {
			//console.log(response);
			if(response.data.status==1){
				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Exito',
					text: "Registro actualizado correctamente",
					showConfirmButton: false,
					timer: 2000
				});
				$state.go('menuMaster.listCuenta');
			}
			
			
		},
		function(result) {
			if ((result.status == 409)
			|| (result.status == 400)) {
			$scope.errors = result.data;
			} else {
			$scope.errorMessages = [ 'Unknown error de servidor' ];
			}
			$('#notificacionesModal').modal('show');
		});
		
	};

	$scope.loadCuenta = function() {
		Cuenta.findById($stateParams.idCuenta, function(response) {
			if (response.data.status==1){
				$scope.newCuenta = response.data.info[0];
				console.log($scope.newCuenta);
				$scope.newCuenta.mayor = Number(response.data.info[0].mayor);
				$scope.newCuenta.movimiento = Number(response.data.info[0].movimiento);
				$scope.newCuenta.hoja_trabajo = Number(response.data.info[0].hoja_trabajo);
				if($scope.newCuenta.estado=='A'){
					$scope.newCuenta.estado = true;
				}
				/*
				if(Number($scope.newCuenta.movimiento)==1){
					$scope.newCuenta.movimiento = true;
				}
				if(Number($scope.newCuenta.hoja_trabajo)==1){
					$scope.newCuenta.hoja_trabajo = true;
				}
				if(Number($scope.newCuenta.mayor)==1){
					$scope.newCuenta.mayor = true;
				}
				//*/
				//console.log($scope.newCuenta);
				$scope.updateRubro();
			}
		});
	};

	$scope.loadCuenta();
	
	$scope.loadElemento = function() {
		Elemento.findAllA(function(response) {
			if (response.data.status==1){
				$scope.elemento = response.data.info;
			}
			else{
				$scope.elemento = [];
			}
		});
	};

	$scope.loadElemento();
	
	$scope.loadNaturaleza = function() {
		CuentaNaturaleza.findAllA(function(response) {
			if (response.data.status==1){
				$scope.naturaleza = response.data.info;
			}
			else{
				$scope.naturaleza = [];
			}
		});
	};

	$scope.loadNaturaleza();
	
	$scope.updateRubro = function() {
		$scope.rubro = [];
		//$scope.newCuenta.id_rubro="";
		Rubro.findByIdElemento($scope.newCuenta.id_elemento, function(response) {
			if (response.data.status==1){
				$scope.rubro = response.data.info;
			}
			else{
				$scope.rubro = [];
			}
		});
	};

	$scope.loadAuxiliar = function() {
		Auxiliar.findAllA(function(response) {
			if (response.data.status==1){
				$scope.auxiliar = response.data.info;
			}
			else{
				$scope.auxiliar = [];
			}
		});
	};
	$scope.loadAuxiliar();
	
	$scope.loadCuenta = function() {
		Cuenta.findAllA(function(response) {
			if (response.data.status==1){
				$scope.cuenta = response.data.info;
			}
			else{
				$scope.cuenta = [];
			}
		});
	};
	$scope.loadCuenta();
	
	$scope.loadCentroCosto = function() {
		CentroCosto.findAllA(function(response) {
			if (response.data.status==1){
				$scope.centro_costo = response.data.info;
			}
			else{
				$scope.centro_costo = [];
			}
		});
	};
	$scope.loadCentroCosto();
	
	$scope.loadCuentaNaturaleza = function() {
		CuentaNaturaleza.findAllA(function(response) {
			if (response.data.status==1){
				$scope.cuenta_naturaleza = response.data.info;
			}
			else{
				$scope.cuenta_naturaleza = [];
			}
		});
	};
	$scope.loadCuentaNaturaleza();
	
	$scope.onlyLetters = "/^[a-zA-Z.\-\s\Ññ\_\]+$/i/";
};

function CuentaTableCtrl($scope, $rootScope, $state, $compile, $window,
		popupService, DTOptionsBuilder, DTColumnDefBuilder, Elemento, Rubro, Cuenta, URL_API) {
	var vm = this;

	vm.listCuenta = listCuenta;
	vm.reloadData = reloadData;
	
	$scope.requiredRubro=false;

	vm.message = '';
	vm.cuenta = [];
	
	/*
	Cuenta.findAll(function(response) {
		if (response.data.status==1){
			vm.cuenta = response.data.info;
		}
	});
	//*/
	$scope.loadElemento = function() {
		Elemento.findAllA(function(response) {
			if (response.data.status==1){
				$scope.elemento = response.data.info;
			}
			else{
				$scope.elemento = [];
			}
		});
	};

	$scope.loadElemento();
	
	$scope.updateRubro = function() {
		$scope.rubro = [];
		$scope.newCuenta.id_rubro="";
		$scope.requiredRubro=false;
		Rubro.findByIdElemento($scope.newCuenta.id_elemento, function(response) {
			if (response.data.status==1){
				$scope.rubro = response.data.info;
			}
			else{
				$scope.rubro = [];
			}
		});
	};
	
	$scope.validateFilters = function(){
		if($scope.newCuenta.cuenta.length>0){
			$scope.requiredRubro=true;
			$scope.newCuenta.id_elemento="";
			$scope.newCuenta.id_rubro="";
			$scope.newCuenta.nivel="";
			
		}
		else if($scope.newCuenta.id_elemento.length>0 && $scope.newCuenta.id_rubro.length>0) $scope.requiredRubro=true;
	}


	vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withLanguage($rootScope.globals.language);
	vm.dtColumnsDefs = [ 
		DTColumnDefBuilder.newColumnDef(0),
		DTColumnDefBuilder.newColumnDef(1),
		DTColumnDefBuilder.newColumnDef(2),
		DTColumnDefBuilder.newColumnDef(3),
		DTColumnDefBuilder.newColumnDef(4),
		DTColumnDefBuilder.newColumnDef(5),
		DTColumnDefBuilder.newColumnDef(6),
		DTColumnDefBuilder.newColumnDef(7),
		//DTColumnDefBuilder.newColumnDef(8),
		//DTColumnDefBuilder.newColumnDef(9),
		//DTColumnDefBuilder.newColumnDef(10) 
	];

	vm.deleteCuenta = deleteCuenta;
	vm.editCuenta = editCuenta;
	vm.activateCuenta = activateCuenta;

	$scope.busquedaFiltro = function() {
		Cuenta.findByFilters2($scope.newCuenta.cuenta, $scope.newCuenta.id_elemento, $scope.newCuenta.id_rubro, $scope.newCuenta.nivel_cuenta, $scope.newCuenta.movimiento, function(response) {
			if (response.data.status==1){
				vm.cuenta = response.data.info;
			}
			else{
				vm.cuenta = [];
			}
		});

	};
	
	$scope.resetFiltros = function () {
		$scope.newCuenta.cuenta = "";
		$scope.newCuenta.id_rubro = "";
		$scope.newCuenta.id_elemento = "";
		vm.cuenta = [];
	};
	
	function listCuenta() {
		Cuenta.findAll(function(response) {
			if (response.data.status==1){
				vm.cuenta = response.data.info;
			}
		});

	};

	function reloadData() {
		$scope.busquedaFiltro();
	};

	function deleteCuenta(cuentaId) {
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
				Cuenta.borrar(cuentaId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Registro Inactivado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};

	function editCuenta(cuentaId) {
		$state.go('menuMaster.editCuenta', {
			idCuenta : cuentaId
		});
	};
	
	function activateCuenta(cuentaId) {
		
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
				Cuenta.activar(cuentaId, $rootScope.globals.currentUser.username,
					function(response) {
						reloadData();
					});
					
				Swal.fire({
					toast:true,
				  position: 'top-end',
				  type: 'success',
				  title: 'Registro Activado',
				  showConfirmButton: false,
				  timer: 1000
				})
			}
		})
		
	};
	
	$scope.newCuenta = {
		id : "",
		cuenta : "",
		id_cuenta_padre : "",
		id_elemento : "",
		id_rubro : "",
		id_auxiliar : "",
		id_centro_costo : "",
		descripcion : "",
		id_naturaleza : "",
		nivel_cuenta : "3",
		mayor : 0,
		movimiento : 0,
		hoja_trabajo : 0,
		saldo_debe : 0.00,
		saldo_haber : 0.00,
		saldo : 0.00,
		estado : "A",
		_attachments_uri:{file:""},
		usuario : $rootScope.globals.currentUser.username
	};
		
	$scope.subirArchivo = function() {
		//$scope.loadingToast.fire({type: 'info'});
		$scope.newCuenta.accion="SA";
		//console.log($scope.newCuenta);
		$("#loadingCuentas").show();
		Cuenta.subirArchivo($scope.newCuenta, function(response) {

			//console.log(response);
			if(response.status == 0){
				//$scope.loadingToast.close();
				$scope.errorMessagesChild = [ data ];
				$("#loadingCuentas").hide();
			}else{
				//$("#loadingCuentas").hide();
						
				Swal.fire({
					toast: true,
					position: 'top-end',
					type: 'success',
					title: 'Exito',
					text: "Registros almacenados correctamente",
					showConfirmButton: false,
					timer: 2000
				});
				//console.log(response.info);
				Cuenta.findAll(function(response) {
					if (response.data.status==1){
						vm.cuenta = response.data.info;
						document.getElementById("loadingCuentas").style.display = "none";
					}
				});
			}
			
			
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errorsChild = result.data.info;
			} else {
				$scope.errorMessagesChild = [ 'Unknown error de servidor' ];
			}
		});

    };

};

// *************************************************CONTABILIDAD*******************************************************

