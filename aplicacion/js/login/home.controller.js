
function HomeController($scope, $rootScope, $location, $stateParams, $state, Usuario, Authentication, Authorization, OpcRol)
{
	var vm = this;
	
	$scope.usuario = {};
	$scope.opciones = {};
	$scope.menuOpciones = {};
	$scope.opcionesPpal = {};
	$scope.opciones_hijo = {} ;
	$scope.opciones_padre = {} ;
	
	function loadOpciones() {
		
		Authorization.GetOpcionesPpal($rootScope.globals.currentUser.username, function(response){
			$scope.opcionesPpal = response.data.info;
			//console.log($scope.opcionesPpal);
		});
		
		Authorization.GetOpciones($rootScope.globals.currentUser.username, function(response){
			$scope.opciones_tmp = response.data.info;
			
			for (i=0; i < $scope.opciones_tmp.length; i++){
				if ($scope.opciones_tmp[i].padre == 1) {
					$scope.opciones_padre [i] = response.data.info[i];		
				}
				else{
					$scope.opciones_hijo [i] = response.data.info[i];
				}
			}
			/*
			console.log($scope.opciones_tmp);
			console.log($scope.opciones_padre);
			console.log($scope.opciones_hijo);
			//*/
		});
	};
	
	loadOpciones();
	
    function loadCurrentUser() {

		Usuario.getUser($rootScope.globals.currentUser.username, function(response){
			$scope.usuario = response.data.info[0];
		});
		
    };
    
    loadCurrentUser();
    
	
	$scope.logout = function(){

		Authentication.ClearCredentials();
		$location.path('/login');
	};
	
	$scope.themeRollOver = function(skin){

		$scope.skin = skin;
	};
	
	$scope.habilitarMenu = function(){
		var habilitarMenu = $location.search().habilitarMenu;
		var habilitarMenuWin = $stateParams.habilitarMenu;
		if (habilitarMenuWin=='undefined') habilitarMenuWin = null;
		var resp = false;
		if ((habilitarMenu == "S" || habilitarMenu == null) && (habilitarMenuWin == "S" || habilitarMenuWin == null)) {
			resp = true;
		} else {
			document.body.className = "skin-white sidebar-mini sidebar-collapse";
		}
		return resp;
	};
	
	$scope.showMenu = function(idOpcPrincipal){
		OpcRol.findByIdOpcPpalRol(idOpcPrincipal, $rootScope.globals.currentUser.sec_rol[0].id, function(response) {
			
			//console.log(response.data.info);
			if(response.data.status==1){
				$scope.menuOpciones = response.data.info;
			}
			else $scope.menuOpciones = [];
		});
		
		$state.go('menuMaster.homeMenu');
		//document.body.className = "skin-white sidebar-mini sidebar-collapse";
	}
	
	$scope.showMenuHijo = function(idOpcPrincipal, idOpc){
		//console.log("entre: "+idOpcPrincipal + "--"+idOpc);
		
		//console.log($rootScope.globals.currentUser);
		OpcRol.findByIdOpcPpalOpcPadreRol(idOpcPrincipal, idOpc, $rootScope.globals.currentUser.sec_rol[0].id, function(response) {
			
			if(response.data.status==1){
				//console.log(response.data.info);
				$scope.menuOpciones = response.data.info;
			}
			else $scope.menuOpciones = [];
		});
		
		$state.go('menuMaster.homeMenu');
		//document.body.className = "skin-white sidebar-mini sidebar-collapse";
	}
	
	$scope.showOpcion = function(url){
		//console.log("URL: "+url);
		var urlGo = url.replace("menuMaster.","/");
		
		urlGo = urlGo.substring(0, urlGo.indexOf("("));
		var indexI = url.indexOf("{")+1;
		var indexF = url.indexOf("}");
		var params  = url.substring(indexI, indexF);//*/
		//console.log("GO: "+urlGo);
		
		if(params.length>0){
			//console.log("params: "+params);
			
			var pars ="";
			var p = "";
			var parmsArray = params.split(",");
			for(var i=0; i<parmsArray.length;i++){
				pars=parmsArray[i].split(":");
				if(i>0) p+="/";
				p+=pars[1].replace(/'/g, '',"").trim();
				
			}

			url = p+urlGo;

			//console.log(url);
			$location.path(url);

		}
		else $location.path(urlGo);
	}
	
	$scope.showSalirMenuPrincipal = function(){
		$state.go("menuMaster.home");
	}
	
};