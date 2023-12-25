function LoginController($scope, $state, $stateParams, Authentication, Flash)
{

	var vm = this;
	$scope.skin = "skin-blue";
    vm.login = login;

    vm.secUsuario = {
		usr:""
		, clave:""
	};
	var random = Math.ceil((Math.random()*5));
	if(random==0) random=1;
	else if(random>5) random=5;
	$scope.image = random;
    
    (function initController() {
        // reset login status
		//console.log($stateParams);
    	Authentication.ClearCredentials();
    })();
    
    function login() {
		if(vm.secUsuario.usr.length>0 && vm.secUsuario.clave.length>0){
			vm.dataLoading = true;
			Authentication.Login(vm.secUsuario, function (response) {
				if (response.data.status == '1') {
					Authentication.SetCredentials(
						vm.secUsuario.usr, 
						//response.data.info[0].idUser,
						vm.secUsuario.clave,
						/*response.data.info[0].isRolAdmin,
						response.data.info[0].isRolSupervisor,
						response.data.info[0].isRolCajero,*/
						// vm.secUsuario.clave,
						response.data.info[0].sec_rol
					);
					
					$state.go('menuMaster.home');
				} else {
					//console.log(response.data.info);
					//Flash.Error(response.data.info);
					Swal.fire({
						//toast:true,
						position: 'center',
						type: 'error',
						title: response.data.info,
						showConfirmButton: false,
						timer: 3500
					});
					vm.dataLoading = false;
				}
			});
		}
		else{
			Swal.fire({
				//toast:true,
				position: 'center',
				type: 'error',
				title: 'Revise los datos de acceso',
				showConfirmButton: false,
				timer: 3500
			});
		}
        
    };

	
};

