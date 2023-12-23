var app = angular.module('japapp', [ 'ui.router', 'ngRoute', 'ngCookies', 'ngSanitize', 'ui.select', 'datatables', 'datatables.bootstrap'
	//CATALOGOS
	,'deptsService'					,'estCivilService'				,'nivEstudioService'			,'sectorService'
	,'tiempoCtrService'				,'tipoCtrService'				,'sedeService' 					,'proyectoService'			
	,'carreraService'				,'grupoService'					,'actEconoService'				,'bienesServiciosService'
	,'cursoService'					,'formaIngresoService' 			,'ingresoMensualService'		,'parentescoService'
	,'tecnicaTrabajoService'		,'tenenciaViviendaService'		,'tipoTrabajoService' 			,'tipoViviendaService'
	,'munisService'					,'tipoPlazaService'				,'motivoNoContratacionService'	,'tipoRequerimientoService'
	,'generoService'

	//CATALOGOS JAP
	,'marcaService'					,'accsMotoService'				,'estilMotoService'
	,'modeloService'				,'tallerService'				,'tipoDocService'
	,'tipoDocProvService'			,'tipoProdService'				,'tipoVehiculoService'

	//ESTUDIANTE
	,'estudianteService'			,'habilidadEstudianteService' 	,'habilidadService' 			,'facademicaEstudianteService'
	,'situacionLaboralEstService'	,'socioEconomicoEstService'		,'cursoEstudianteService'		,'infoAdicionalService'
	,'empleabilidadEstService'		,'herramientaEstudianteService'	,'ofertasService'				,'empleosAnterioresEstudianteService'
	,'ofertasBolsaEmpleoService'	,'refPersonalService'			,'refLaboralService'

	//EMPRESA
	,'empresaService'				,'plazaService'					,'requisitoPlazaService'		,'requerimientoPlazaService'
	,'aplicacionService'			,'prestacionPlazaService'		,'sucursalService'				, 'competenciaService'

	//GESTOR
	,'gestorService'				,'herramientaGestorService'

	//SEGURIDAD
	,'authenticationService'		,'flashService'					,'usuarioService'


	//CATALOGOS
	.controller('HomeController', HomeController)
	.controller('DeptsTableCtrl', DeptsTableCtrl)
	.controller('MunicipioTableCtrl', MunicipioTableCtrl)
	.controller('EstCivilTableCtrl', EstCivilTableCtrl)
	.controller('NivEstudioTableCtrl', NivEstudioTableCtrl)
	.controller('SectorTableCtrl', SectorTableCtrl)
	.controller('TiempoCtrTableCtrl', TiempoCtrTableCtrl)
	.controller('TipoCtrTableCtrl', TipoCtrTableCtrl)
	.controller('SedeTableCtrl', SedeTableCtrl)
	.controller('ProyectoTableCtrl', ProyectoTableCtrl)
	.controller('CarreraTableCtrl', CarreraTableCtrl)
	.controller('GrupoTableCtrl', GrupoTableCtrl)
	.controller('ActEconoTableCtrl', ActEconoTableCtrl)
	.controller('BienesServiciosTableCtrl', BienesServiciosTableCtrl)
	.controller('CursoTableCtrl', CursoTableCtrl)
	.controller('FormaIngresoTableCtrl', FormaIngresoTableCtrl)
	.controller('IngresoMensualTableCtrl', IngresoMensualTableCtrl)
	.controller('ParentescoTableCtrl', ParentescoTableCtrl)
	.controller('TecnicaTrabajoTableCtrl', TecnicaTrabajoTableCtrl)
	.controller('TenenciaViviendaTableCtrl', TenenciaViviendaTableCtrl)
	.controller('TipoTrabajoTableCtrl', TipoTrabajoTableCtrl)
	.controller('TipoViviendaTableCtrl', TipoViviendaTableCtrl)
	.controller('TipoPlazaTableCtrl', TipoPlazaTableCtrl)
	.controller('MotivoNoContratacionTableCtrl', MotivoNoContratacionTableCtrl)
	.controller('TipoRequerimientoTableCtrl', TipoRequerimientoTableCtrl)
	.controller('GeneroTableCtrl', GeneroTableCtrl)

	//ESTUDIANTE
	.controller('EstudianteTableCtrl', EstudianteTableCtrl)
	.controller('HabilidadEstudianteCtrl', HabilidadEstudianteCtrl)
	.controller('FAcademicaEstudianteCtrl', FAcademicaEstudianteCtrl)
	.controller('SituacionLaboralEstCtrl', SituacionLaboralEstCtrl)
	.controller('SocioEconoEstCtrl', SocioEconoEstCtrl)
	.controller('CursoEstudianteCtrl', CursoEstudianteCtrl)
	.controller('InfoAdicionalEstCtrl', InfoAdicionalEstCtrl)
	.controller('EmpleabilidadEstCtrl', EmpleabilidadEstCtrl)
	.controller('OfertasLaboralesTableCtrl', OfertasLaboralesTableCtrl)
	.controller('EmpleosAnterioresEstudianteCtrl', EmpleosAnterioresEstudianteCtrl)
	.controller('MisPostulacionesTableCtrl', MisPostulacionesTableCtrl)
	.controller('OfertasSugeridasTableCtrl', OfertasSugeridasTableCtrl)
	.controller('RefPersonalEstCtrl', RefPersonalEstCtrl)
	.controller('RefLaboralEstCtrl', RefLaboralEstCtrl)

	//EMPRESAS
	.controller('EmpresaTableCtrl', EmpresaTableCtrl)
	.controller('PlazaTableCtrl', PlazaTableCtrl)
	.controller('RequisitoPlazaCtrl', RequisitoPlazaCtrl)
	.controller('RequerimientoPlazaCtrl', RequerimientoPlazaCtrl)
	.controller('PrestacionPlazaCtrl', PrestacionPlazaCtrl)
	.controller('AplicacionTableCtrl', AplicacionTableCtrl)
	.controller('SucursalCtrl', SucursalCtrl)
	.controller('CompetenciaTableCtrl', CompetenciaTableCtrl)

	//JAP CATALOGO
	.controller('AccsMotoTableCtrl', AccsMotoTableCtrl)
	.controller('EstilMotoTableCtrl', EstilMotoTableCtrl)
	.controller('MarcaTableCtrl', MarcaTableCtrl)
	.controller('ModeloTableCtrl', ModeloTableCtrl)
	.controller('TipoDocProvTableCtrl', TipoDocProvTableCtrl)
	.controller('TipoDocTableCtrl', TipoDocTableCtrl)
	.controller('TipoProdTableCtrl', TipoProdTableCtrl)
	.controller('TipoVehiculoTableCtrl', TipoVehiculoTableCtrl)
	.controller('TallerTableCtrl', TallerTableCtrl)

	//JAP SEGURIDAD

	//GESTOR
	.controller('GestorTableCtrl', GestorTableCtrl)

	;

	app.config(['$qProvider', function ($qProvider) {
	    $qProvider.errorOnUnhandledRejections(true);
	}]);

	angular.module('japapp')
	    .config( [ '$httpProvider','$stateProvider','$urlRouterProvider', function($httpProvider, $stateProvider, $urlRouterProvider) {
	        /*
	         * Use a HTTP interceptor to add a nonce to every request to prevent MSIE from caching responses.
	         */
	        $httpProvider.interceptors.push('ajaxNonceInterceptor');
			//SEGURIDAD
	        
	        //USUARIO
	        
	        $stateProvider.
	        state('menuMaster.addUsuario', {	
	        	url : '/addUsuario',
	            templateUrl : 'partials/security/sec_usuario/addUsuario.html',
	            controller : UsuarioAddCtrl
	        }).state('menuMaster.listUsuario', {
	        	url : '/listUsuario',
	            templateUrl : 'partials/security/sec_usuario/listUsuario.html'
	        }).state('menuMaster.editUsuario', {
	        	url : '/:idUsuario/editUsuario',
	            templateUrl : 'partials/seccurity/sec_usuario/editUsuario.html',
	            controller : UsuarioEditCtrl
	        });

	        //ROL

	        $stateProvider.
	        state('menuMaster.addRol', {	
	        	url : '/addRol',
	            templateUrl : 'partials/security/sec_rol/addRol.html',
	            controller : RolAddCtrl
	        }).state('menuMaster.listRol', {
	        	url : '/listRol',
	            templateUrl : 'partials/security/sec_rol/listUsuario.html'
	        }).state('menuMaster.editRol', {
	        	url : '/:idRol/editRol',
	            templateUrl : 'partials/security/sec_rol/editRol.html',
	            controller : RolEditCtrl
	        });

	        //OPCION PRINCIPAL

	        $stateProvider.
	        state('menuMaster.addOpcPpal', {	
	        	url : '/addOpcPpal',
	            templateUrl : 'partials/security/sec_opc_principal/addOpcPpal.html',
	            controller : OpcPpalAddCtrl
	        }).state('menuMaster.listOpcPpal', {
	        	url : '/listOpcPpal',
	            templateUrl : 'partials/security/sec_opc_principal/listUsuario.html'
	        }).state('menuMaster.editOpcPpal', {
	        	url : '/:idOpcPpal/editOpcPpal',
	            templateUrl : 'partials/security/sec_opc_principal/editOpcPpal.html',
	            controller : OpcPpalEditCtrl
	        });
	        
	        //OPCION ROL

	        $stateProvider.
	        state('menuMaster.addOpcRol', {	
	        	url : '/addOpcRol',
	            templateUrl : 'partials/security/sec_opc_rol/addOpcRol.html',
	            controller : OpcRolAddCtrl
	        }).state('menuMaster.listOpcRol', {
	        	url : '/listOpcRol',
	            templateUrl : 'partials/security/sec_opc_rol/listUsuario.html'
	        }).state('menuMaster.editOpcRol', {
	        	url : '/:idOpcRol/editOpcRol',
	            templateUrl : 'partials/security/sec_opc_rol/editOpcRol.html',
	            controller : OpcRolEditCtrl
	        });
	       
	        //OPCION

	        $stateProvider.
	        state('menuMaster.addOpcion', {	
	        	url : '/addOpcion',
	            templateUrl : 'partials/security/sec_opcion/addOpcion.html',
	            controller : OpcionAddCtrl
	        }).state('menuMaster.listOpcion', {
	        	url : '/listOpcion',
	            templateUrl : 'partials/security/sec_opcion/listUsuario.html'
	        }).state('menuMaster.editOpcion', {
	        	url : '/:idOpcion/editOpcion',
	            templateUrl : 'partials/security/sec_opcion/editOpcion.html',
	            controller : OpcionEditCtrl
	        });

	        
			//CATALOGOS
			//DEPTS CRUD
	        $stateProvider.
	        state('menuMaster.addDepts', {	
	        	url : '/addDepts',
	            templateUrl : 'partials/catalogos/ctg_depts/addDepts.html',
	            controller : DeptsAddCtrl
	        }).state('menuMaster.listDepts', {
	        	url : '/listDepts',
	            templateUrl : 'partials/catalogos/ctg_depts/listDepts.html'
	        }).state('menuMaster.editDepts', {
	        	url : '/:idDepts/editDepts',
	            templateUrl : 'partials/catalogos/ctg_depts/editDepts.html',
	            controller : DeptsEditCtrl
	        });
	        
	        //MARCA
	        $stateProvider.
	        state('menuMaster.addMarca', {	
	        	url : '/addMarca',
	            templateUrl : 'partials/catalogos/ctg_marca/addMarca.html',
	            controller : MarcaAddCtrl
	        }).state('menuMaster.listMarca', {
	        	url : '/listMarca',
	            templateUrl : 'partials/catalogos/ctg_marca/listMarca.html'
	        }).state('menuMaster.editMarca', {
	        	url : '/:idMarca/editMarca',
	            templateUrl : 'partials/catalogos/ctg_marca/editMarca.html',
	            controller : MarcaEditCtrl
	        });

	   		//MUNICIPIOS CRUD
	        $stateProvider.
	        state('menuMaster.addMunis', {	
	            url : '/addMunis',
	            templateUrl : 'partials/catalogos/ctg_muni/addMuni.html',
	            controller : MunicipioAddCtrl
	        }).state('menuMaster.listMuni', {
	            url : '/listMuni',
	            templateUrl : 'partials/catalogos/ctg_muni/listMuni.html'
	        }).state('menuMaster.editMuni', {
	            url : '/:idDepto/:id/editMuni',
	            templateUrl : 'partials/catalogos/ctg_muni/editMuni.html',
	            controller : MunicipioEditCtrl
	        });
	        
			//ESTADOS CIVIL CRUD
	        $stateProvider.
	        state('menuMaster.addEstCivil', {	
	        	url : '/addEstCivil',
	            templateUrl : 'partials/catalogos/ctg_estcivil/addEstCivil.html',
	            controller : EstCivilAddCtrl
	        }).state('menuMaster.listEstCivil', {
	        	url : '/listEstCivil',
	            templateUrl : 'partials/catalogos/ctg_estcivil/listEstCivil.html'
	        }).state('menuMaster.editEstCivil', {
	        	url : '/:idEstCivil/editEstCivil',
	            templateUrl : 'partials/catalogos/ctg_estcivil/editEstCivil.html',
	            controller : EstCivilEditCtrl
	        });		

			//NIVELES ESTUDIO CRUD
	        $stateProvider.
	        state('menuMaster.addNivEstudio', {	
	        	url : '/addNivEstudio',
	            templateUrl : 'partials/catalogos/ctg_nivestudio/addNivEstudio.html',
	            controller : NivEstudioAddCtrl
	        }).state('menuMaster.listNivEstudio', {
	        	url : '/listNivEstudio',
	            templateUrl : 'partials/catalogos/ctg_nivestudio/listNivEstudio.html'
	        }).state('menuMaster.editNivEstudio', {
	        	url : '/:idNivEstudio/editNivEstudio',
	            templateUrl : 'partials/catalogos/ctg_nivestudio/editNivEstudio.html',
	            controller : NivEstudioEditCtrl
	        });		

			//SECTOR CRUD
	        $stateProvider.
	        state('menuMaster.addSector', {	
	        	url : '/addSector',
	            templateUrl : 'partials/catalogos/ctg_sector/addSector.html',
	            controller : SectorAddCtrl
	        }).state('menuMaster.listSector', {
	        	url : '/listSector',
	            templateUrl : 'partials/catalogos/ctg_sector/listSector.html'
	        }).state('menuMaster.editSector', {
	        	url : '/:idSector/editSector',
	            templateUrl : 'partials/catalogos/ctg_sector/editSector.html',
	            controller : SectorEditCtrl
	        });	

			//TIEMPO CONTRATACION CRUD
	        $stateProvider.
	        state('menuMaster.addTiempoCtr', {	
	        	url : '/addTiempoCtr',
	            templateUrl : 'partials/catalogos/ctg_tiempoctr/addTiempoCtr.html',
	            controller : TiempoCtrAddCtrl
	        }).state('menuMaster.listTiempoCtr', {
	        	url : '/listTiempoCtr',
	            templateUrl : 'partials/catalogos/ctg_tiempoctr/listTiempoCtr.html'
	        }).state('menuMaster.editTiempoCtr', {
	        	url : '/:idTiempoCtr/editTiempoCtr',
	            templateUrl : 'partials/catalogos/ctg_tiempoctr/editTiempoCtr.html',
	            controller : TiempoCtrEditCtrl
	        });

			//TIPO CONTRATACION CRUD
	        $stateProvider.
	        state('menuMaster.addTipoCtr', {	
	        	url : '/addTipoCtr',
	            templateUrl : 'partials/catalogos/ctg_tipoctr/addTipoCtr.html',
	            controller : TipoCtrAddCtrl
	        }).state('menuMaster.listTipoCtr', {
	        	url : '/listTipoCtr',
	            templateUrl : 'partials/catalogos/ctg_tipoctr/listTipoCtr.html'
	        }).state('menuMaster.editTipoCtr', {
	        	url : '/:idTipoCtr/editTipoCtr',
	            templateUrl : 'partials/catalogos/ctg_tipoctr/editTipoCtr.html',
	            controller : TipoCtrEditCtrl
	        });
			
			//SEDE CRUD
	        $stateProvider.
	        state('menuMaster.addSede', {	
	        	url : '/addSede',
	            templateUrl : 'partials/catalogos/ctg_sede/addSede.html',
	            controller : SedeAddCtrl
	        }).state('menuMaster.listSede', {
	        	url : '/listSede',
	            templateUrl : 'partials/catalogos/ctg_sede/listSede.html'
	        }).state('menuMaster.editSede', {
	        	url : '/:idSede/editSede',
	            templateUrl : 'partials/catalogos/ctg_sede/editSede.html',
	            controller : SedeEditCtrl
	        });
			
			//PROYECTO CRUD
	        $stateProvider.
	        state('menuMaster.addProyecto', {	
	        	url : '/addProyecto',
	            templateUrl : 'partials/catalogos/ctg_proyecto/addProyecto.html',
	            controller : ProyectoAddCtrl
	        }).state('menuMaster.listProyecto', {
	        	url : '/listProyecto',
	            templateUrl : 'partials/catalogos/ctg_proyecto/listProyecto.html'
	        }).state('menuMaster.editProyecto', {
	        	url : '/:idProyecto/editProyecto',
	            templateUrl : 'partials/catalogos/ctg_proyecto/editProyecto.html',
	            controller : ProyectoEditCtrl
	        });
			
			//CARRERA CRUD
	        $stateProvider.
	        state('menuMaster.addCarrera', {	
	        	url : '/addCarrera',
	            templateUrl : 'partials/catalogos/ctg_carrera/addCarrera.html',
	            controller : CarreraAddCtrl
	        }).state('menuMaster.listCarrera', {
	        	url : '/listCarrera',
	            templateUrl : 'partials/catalogos/ctg_carrera/listCarrera.html'
	        }).state('menuMaster.editCarrera', {
	        	url : '/:idCarrera/editCarrera',
	            templateUrl : 'partials/catalogos/ctg_carrera/editCarrera.html',
	            controller : CarreraEditCtrl
	        });
			
			//GRUPO CRUD
	        $stateProvider.
	        state('menuMaster.addGrupo', {	
	        	url : '/addGrupo',
	            templateUrl : 'partials/catalogos/ctg_grupo/addGrupo.html',
	            controller : GrupoAddCtrl
	        }).state('menuMaster.listGrupo', {
	        	url : '/listGrupo',
	            templateUrl : 'partials/catalogos/ctg_grupo/listGrupo.html'
	        }).state('menuMaster.editGrupo', {
	        	url : '/:idGrupo/editGrupo',
	            templateUrl : 'partials/catalogos/ctg_grupo/editGrupo.html',
	            controller : GrupoEditCtrl
	        });
			
			//ACT. ECONOMICA CRUD
	        $stateProvider.
	        state('menuMaster.addActEcono', {	
	        	url : '/addActEcono',
	            templateUrl : 'partials/catalogos/ctg_act_economica/addActEcono.html',
	            controller : ActEconoAddCtrl
	        }).state('menuMaster.listActEcono', {
	        	url : '/listActEcono',
	            templateUrl : 'partials/catalogos/ctg_act_economica/listActEcono.html'
	        }).state('menuMaster.editActEcono', {
	        	url : '/:idActEcono/editActEcono',
	            templateUrl : 'partials/catalogos/ctg_act_economica/editActEcono.html',
	            controller : ActEconoEditCtrl
	        });
			
			//BIENES O SERVICIOS CRUD
	        $stateProvider.
	        state('menuMaster.addBienesServicios', {	
	        	url : '/addBienesServicios',
	            templateUrl : 'partials/catalogos/ctg_bienes_servicios/addBienesServicios.html',
	            controller : BienesServiciosAddCtrl
	        }).state('menuMaster.listBienesServicios', {
	        	url : '/listBienesServicios',
	            templateUrl : 'partials/catalogos/ctg_bienes_servicios/listBienesServicios.html'
	        }).state('menuMaster.editBienesServicios', {
	        	url : '/:idBienesServicios/editBienesServicios',
	            templateUrl : 'partials/catalogos/ctg_bienes_servicios/editBienesServicios.html',
	            controller : BienesServiciosEditCtrl
	        });
			
			//CURSO CRUD
	        $stateProvider.
	        state('menuMaster.addCurso', {	
	        	url : '/addCurso',
	            templateUrl : 'partials/catalogos/ctg_curso/addCurso.html',
	            controller : CursoAddCtrl
	        }).state('menuMaster.listCurso', {
	        	url : '/listCurso',
	            templateUrl : 'partials/catalogos/ctg_curso/listCurso.html'
	        }).state('menuMaster.editCurso', {
	        	url : '/:idCurso/:idEmpresa/editCurso',
	            templateUrl : 'partials/catalogos/ctg_curso/editCurso.html',
	            controller : CursoEditCtrl
	        });
			
			//FORMA INGRESO CRUD
	        $stateProvider.
	        state('menuMaster.addFormaIngreso', {	
	        	url : '/addFormaIngreso',
	            templateUrl : 'partials/catalogos/ctg_forma_ingreso/addFormaIngreso.html',
	            controller : FormaIngresoAddCtrl
	        }).state('menuMaster.listFormaIngreso', {
	        	url : '/listFormaIngreso',
	            templateUrl : 'partials/catalogos/ctg_forma_ingreso/listFormaIngreso.html'
	        }).state('menuMaster.editFormaIngreso', {
	        	url : '/:idFormaIngreso/editFormaIngreso',
	            templateUrl : 'partials/catalogos/ctg_forma_ingreso/editFormaIngreso.html',
	            controller : FormaIngresoEditCtrl
	        });
			
			//INGRESO MENSUAL CRUD
	        $stateProvider.
	        state('menuMaster.addIngresoMensual', {	
	        	url : '/addIngresoMensual',
	            templateUrl : 'partials/catalogos/ctg_ingreso_mensual/addIngresoMensual.html',
	            controller : IngresoMensualAddCtrl
	        }).state('menuMaster.listIngresoMensual', {
	        	url : '/listIngresoMensual',
	            templateUrl : 'partials/catalogos/ctg_ingreso_mensual/listIngresoMensual.html'
	        }).state('menuMaster.editIngresoMensual', {
	        	url : '/:idIngresoMensual/editIngresoMensual',
	            templateUrl : 'partials/catalogos/ctg_ingreso_mensual/editIngresoMensual.html',
	            controller : IngresoMensualEditCtrl
	        });
			
			//PARENTESCO CRUD
	        $stateProvider.
	        state('menuMaster.addParentesco', {	
	        	url : '/addParentesco',
	            templateUrl : 'partials/catalogos/ctg_parentesco/addParentesco.html',
	            controller : ParentescoAddCtrl
	        }).state('menuMaster.listParentesco', {
	        	url : '/listParentesco',
	            templateUrl : 'partials/catalogos/ctg_parentesco/listParentesco.html'
	        }).state('menuMaster.editParentesco', {
	        	url : '/:idParentesco/editParentesco',
	            templateUrl : 'partials/catalogos/ctg_parentesco/editParentesco.html',
	            controller : ParentescoEditCtrl
	        });
			
			//TECNICA TRABAJO CRUD
	        $stateProvider.
	        state('menuMaster.addTecnicaTrabajo', {	
	        	url : '/addTecnicaTrabajo',
	            templateUrl : 'partials/catalogos/ctg_tecnica_trabajo/addTecnicaTrabajo.html',
	            controller : TecnicaTrabajoAddCtrl
	        }).state('menuMaster.listTecnicaTrabajo', {
	        	url : '/listTecnicaTrabajo',
	            templateUrl : 'partials/catalogos/ctg_tecnica_trabajo/listTecnicaTrabajo.html'
	        }).state('menuMaster.editTecnicaTrabajo', {
	        	url : '/:idTecnicaTrabajo/editTecnicaTrabajo',
	            templateUrl : 'partials/catalogos/ctg_tecnica_trabajo/editTecnicaTrabajo.html',
	            controller : TecnicaTrabajoEditCtrl
	        });
			
			//TENENCIA VIVIENDA CRUD
	        $stateProvider.
	        state('menuMaster.addTenenciaVivienda', {	
	        	url : '/addTenenciaVivienda',
	            templateUrl : 'partials/catalogos/ctg_tenencia_vivienda/addTenenciaVivienda.html',
	            controller : TenenciaViviendaAddCtrl
	        }).state('menuMaster.listTenenciaVivienda', {
	        	url : '/listTenenciaVivienda',
	            templateUrl : 'partials/catalogos/ctg_tenencia_vivienda/listTenenciaVivienda.html'
	        }).state('menuMaster.editTenenciaVivienda', {
	        	url : '/:idTenenciaVivienda/editTenenciaVivienda',
	            templateUrl : 'partials/catalogos/ctg_tenencia_vivienda/editTenenciaVivienda.html',
	            controller : TenenciaViviendaEditCtrl
	        });
			
			//TIPO TRABAJO CRUD
	        $stateProvider.
	        state('menuMaster.addTipoTrabajo', {	
	        	url : '/addTipoTrabajo',
	            templateUrl : 'partials/catalogos/ctg_tipo_trabajo/addTipoTrabajo.html',
	            controller : TipoTrabajoAddCtrl
	        }).state('menuMaster.listTipoTrabajo', {
	        	url : '/listTipoTrabajo',
	            templateUrl : 'partials/catalogos/ctg_tipo_trabajo/listTipoTrabajo.html'
	        }).state('menuMaster.editTipoTrabajo', {
	        	url : '/:idTipoTrabajo/editTipoTrabajo',
	            templateUrl : 'partials/catalogos/ctg_tipo_trabajo/editTipoTrabajo.html',
	            controller : TipoTrabajoEditCtrl
	        });
			
			//TIPO VIVIENDA CRUD
	        $stateProvider.
	        state('menuMaster.addTipoVivienda', {	
	        	url : '/addTipoVivienda',
	            templateUrl : 'partials/catalogos/ctg_tipo_vivienda/addTipoVivienda.html',
	            controller : TipoViviendaAddCtrl
	        }).state('menuMaster.listTipoVivienda', {
	        	url : '/listTipoVivienda',
	            templateUrl : 'partials/catalogos/ctg_tipo_vivienda/listTipoVivienda.html'
	        }).state('menuMaster.editTipoVivienda', {
	        	url : '/:idTipoVivienda/editTipoVivienda',
	            templateUrl : 'partials/catalogos/ctg_tipo_vivienda/editTipoVivienda.html',
	            controller : TipoViviendaEditCtrl
	        });
			
			//TIPO PLAZA CRUD
	        $stateProvider.
	        state('menuMaster.addTipoPlaza', {	
	        	url : '/addTipoPlaza',
	            templateUrl : 'partials/catalogos/ctg_tipo_plaza/addTipoPlaza.html',
	            controller : TipoPlazaAddCtrl
	        }).state('menuMaster.listTipoPlaza', {
	        	url : '/listTipoPlaza',
	            templateUrl : 'partials/catalogos/ctg_tipo_plaza/listTipoPlaza.html'
	        }).state('menuMaster.editTipoPlaza', {
	        	url : '/:idTipoPlaza/editTipoPlaza',
	            templateUrl : 'partials/catalogos/ctg_tipo_plaza/editTipoPlaza.html',
	            controller : TipoPlazaEditCtrl
	        });
			
			//MOTIVO NO CONTRATACION CRUD
	        $stateProvider.
	        state('menuMaster.addMotivoNoContratacion', {	
	        	url : '/addMotivoNoContratacion',
	            templateUrl : 'partials/catalogos/ctg_motivo_no_contratacion/addMotivoNoContratacion.html',
	            controller : MotivoNoContratacionAddCtrl
	        }).state('menuMaster.listMotivoNoContratacion', {
	        	url : '/listMotivoNoContratacion',
	            templateUrl : 'partials/catalogos/ctg_motivo_no_contratacion/listMotivoNoContratacion.html'
	        }).state('menuMaster.editMotivoNoContratacion', {
	        	url : '/:idMotivoNoContratacion/editMotivoNoContratacion',
	            templateUrl : 'partials/catalogos/ctg_motivo_no_contratacion/editMotivoNoContratacion.html',
	            controller : MotivoNoContratacionEditCtrl
	        });
			
			//TIPO DE REQUERIMIENTO CRUD
	        $stateProvider.
	        state('menuMaster.addTipoRequerimiento', {	
	        	url : '/addTipoRequerimiento',
	            templateUrl : 'partials/catalogos/ctg_tipo_requerimiento/addTipoRequerimiento.html',
	            controller : TipoRequerimientoAddCtrl
	        }).state('menuMaster.listTipoRequerimiento', {
	        	url : '/listTipoRequerimiento',
	            templateUrl : 'partials/catalogos/ctg_tipo_requerimiento/listTipoRequerimiento.html'
	        }).state('menuMaster.editTipoRequerimiento', {
	        	url : '/:idTipoRequerimiento/editTipoRequerimiento',
	            templateUrl : 'partials/catalogos/ctg_tipo_requerimiento/editTipoRequerimiento.html',
	            controller : TipoRequerimientoEditCtrl
	        });
			
			//GENERO CRUD
	        $stateProvider.
	        state('menuMaster.addGenero', {	
	        	url : '/addGenero',
	            templateUrl : 'partials/catalogos/ctg_genero/addGenero.html',
	            controller : GeneroAddCtrl
	        }).state('menuMaster.listGenero', {
	        	url : '/listGenero',
	            templateUrl : 'partials/catalogos/ctg_genero/listGenero.html'
	        }).state('menuMaster.editGenero', {
	        	url : '/:idGenero/editGenero',
	            templateUrl : 'partials/catalogos/ctg_genero/editGenero.html',
	            controller : GeneroEditCtrl
	        });
			
			/**ESTUDIANTE**/
			//ESTUDIANTE CRUD
	        $stateProvider.
	        state('menuMaster.addEstudiante', {	
	        	url : '/addEstudiante',
	            templateUrl : 'partials/gestor/estudiante/addEstudiante.html',
	            controller : EstudianteAddCtrl
	        }).state('menuMaster.listEstudiante', {
	        	url : '/listEstudiante',
	            templateUrl : 'partials/gestor/estudiante/listEstudiante.html'
	        }).state('menuMaster.editEstudiante', {
	        	url : '/:idEstudiante/editEstudiante',
	            templateUrl : 'partials/gestor/estudiante/editEstudiante.html',
	            controller : EstudianteEditCtrl
	        }).state('menuMaster.formHerramientas', {
	        	url : '/formHerramientas',
	            templateUrl : 'partials/gestor/estudiante/herramientas/formHerramientas.html',
				controller : HerramientaEstudianteCtrl
	        });

			//ESTUDIANTE BOLSA DE Empleos
			$stateProvider.
	        state('menuMaster.bolsaEmpleo', {
	        	url : '/bolsaEmpleo',
	            templateUrl : 'partials/estudiante/bolsaempleo/bolsaEmpleo.html'
	        });
			
			//ESTUDIANTE FORMACION ACADEMICA CRUD
	        $stateProvider.
	        state('menuMaster.estudiantefacademica', {	
	        	url : '/estudiantefacademica',
	            templateUrl : 'partials/estudiante/perfilEstudiante.html',
	            controller : FormacionAcademicaCtrl
	          }); 
			
			/**EMPRESA**/
	   		//EMPRESA CRUD
	        $stateProvider.
	        state('menuMaster.addEmpresa', {	
	            url : '/addEmpresa',
	            templateUrl : 'partials/gestor/empresa/addEmpresa.html',
	            controller : EmpresaAddCtrl
	        }).state('menuMaster.listEmpresa', {
	            url : '/listEmpresa',
	            templateUrl : 'partials/gestor/empresa/listEmpresa.html'
	        }).state('menuMaster.editEmpresa', {
	            url : '/:idEmpresa/editEmpresa',
	            templateUrl : 'partials/gestor/empresa/editEmpresa.html',
	            controller : EmpresaEditCtrl
	        });	
			
			//COMPETENCIA CRUD
	        $stateProvider.
	        state('menuMaster.listCompetenciaCursos', {
	            url : '/listCompetenciaCursos',
	            templateUrl : 'partials/gestor/empresa/herramientas/listCompetenciaCursos.html'
	        });	
			
			//PLAZA CRUD
	        $stateProvider.
	        state('menuMaster.addPlaza', {	
	        	url : '/addPlaza',
	            templateUrl : 'partials/gestor/empresa/plazas/addPlaza.html',
	            controller : PlazaAddCtrl
	        }).state('menuMaster.listPlaza', {
	        	url : '/listPlaza',
	            templateUrl : 'partials/gestor/empresa/plazas/listPlaza.html'
	        }).state('menuMaster.editPlaza', {
	        	url : '/:idPlaza/:idEmpresa/editPlaza',
	            templateUrl : 'partials/gestor/empresa/plazas/editPlaza.html',
	            controller : PlazaEditCtrl
	        });
			
			//REVISION CRUD
	        $stateProvider.
	        state('menuMaster.addAplicacion', {	
	        	url : '/addAplicacion',
	            templateUrl : 'partials/gestor/empresa/revisionCandidatos/addRevisionCandidatos.html',
	            controller : AplicacionAddCtrl
	        }).state('menuMaster.listAplicacion', {
	        	url : '/listAplicacion',
	            templateUrl : 'partials/gestor/empresa/revisionCandidatos/listRevisionCandidatos.html'
	        }).state('menuMaster.editAplicacion', {
	        	url : '/:idAplicacion/:idPlaza/:idEstudiante/editAplicacion',
	            templateUrl : 'partials/gestor/empresa/revisionCandidatos/editRevisionCandidatos.html',
	            controller : AplicacionEditCtrl
	        });
	        
			/**GESTOR**/
	        //GESTOR CRUD
	        $stateProvider.
	        state('menuMaster.listGestorEstudiante', {	
	            url : '/listGestorEstudiante',
	            templateUrl : 'partials/gestor/gestor/listEstudiante.html',
	            controller : GestorAddCtrl
	        }).state('menuMaster.listGestorEmpresa', {
	            url : '/listGestorEmpresa',
	            templateUrl : 'partials/gestor/gestor/listEmpresa.html'
	        }).state('menuMaster.listGestion', {
	            url : '/listGestion',
	            templateUrl : 'partials/gestor/gestor/listGestor.html'
	        }).state('menuMaster.editGestor', {
	            url : '/:idGestor/editGestor',
	            templateUrl : 'partials/gestor/gestor/editGestor.html',
	            controller : GestorEditCtrl
	        }).state('menuMaster.listGestorHerramienta', {
	            url : '/listGestorHerramienta',
	            templateUrl : 'partials/gestor/gestor/herramientas/formHerramientas.html',
	            controller : HerramientaGestorCtrl
	        });			

	  
	        // MENU Y LOGIN
	        $stateProvider
	            .state('menuMaster',{
	                abstract : true,
	                templateUrl : 'partials/menuMaster.html'
	            })
	            .state('menuMaster.home', {
	                url : '/home',
	                templateUrl: 'partials/security/home/home.html'
				})
				.state('login', {
					url : '/login',
					controller: LoginController,
					templateUrl: 'partials/security/login/login.html',
					controllerAs: 'vm'
				});

	        $urlRouterProvider.otherwise('/home');

	    } ])
	    .factory('ajaxNonceInterceptor', function() {
	        // This interceptor is equivalent to the behavior induced by $.ajaxSetup({cache:false});

	        var param_start = /\?/;

	        return {
	            request : function(config) {
	                if (config.method == 'GET') {
	                    // Add a query parameter named '_' to the URL, with a value equal to the current timestamp
	                    config.url += (param_start.test(config.url) ? "&" : "?") + '_=' + new Date().getTime();
	                }
	                return config;
	            }
	        }
	    })
		.run(function($rootScope, $location, $cookieStore, $http) {
			$rootScope.globals = $cookieStore.get('globals') || {};
		    if ($rootScope.globals.currentUser) {
		        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
		    }
		    
		    $rootScope.$on('$locationChangeStart', function (event, next, current) {
		        // redirect to login page if not logged in and trying to access a restricted page
		        var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
		        var loggedIn = $rootScope.globals.currentUser;

		        if (restrictedPage && !loggedIn) {
		        	$location.path('/login');
		        }
		        
		    });
		})
		.filter('propsFilter', function() {
		  return function(items, props) {
		    var out = [];

		    if (angular.isArray(items)) {
		      items.forEach(function(item) {
		        var itemMatches = false;

		        var keys = Object.keys(props);
		        for (var i = 0; i < keys.length; i++) {
		          var prop = keys[i];
		          var text = props[prop].toLowerCase();
		          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
		            itemMatches = true;
		            break;
		          }
		        }

		        if (itemMatches) {
		          out.push(item);
		        }
		      });
		    } else {
		      // Let the output be the input untouched
		      out = items;
		    }

		    return out;
		  }
		});
		
	(function() {

	  app.directive('onlyLettersInput', onlyLettersInput);
	  app.directive('emailInput', emailInput);
	  app.directive('alphanumericInput', alphanumericInput);
	  
	  function onlyLettersInput() {
	      return {
	        require: 'ngModel',
	        link: function(scope, element, attr, ngModelCtrl) {
	          function fromUser(text) {
	            var transformedInput = text.replace(/[^a-zA-Z0-9\@\ñ\Ñ\s\_\-\&\/]/g, '');
	            //console.log(transformedInput);
	            if (transformedInput !== text) {
	              ngModelCtrl.$setViewValue(transformedInput);
	              ngModelCtrl.$render();
	            }
	            return transformedInput;
	          }
	          ngModelCtrl.$parsers.push(fromUser);
	        }
	      };
	    };
	    
	    function emailInput() {
	      return {
	        require: 'ngModel',
	        link: function(scope, element, attr, ngModelCtrl) {
	          function fromUser(text) {
	            var transformedInput = text.replace(/[^a-z0-9\_\-\@\.]/g, '');
	            //console.log(transformedInput);
	            if (transformedInput !== text) {
	              ngModelCtrl.$setViewValue(transformedInput);
	              ngModelCtrl.$render();
	            }
	            return transformedInput;
	          }
	          ngModelCtrl.$parsers.push(fromUser);
	        }
	      };
	    };
		
		function alphanumericInput() {
	      return {
	        require: 'ngModel',
	        link: function(scope, element, attr, ngModelCtrl) {
	          function fromUser(text) {
	            var transformedInput = text.replace(/[^a-zA-Z0-9\ñ\Ñ\s\_\-\&\/]/g, '');
	            //console.log(transformedInput);
	            if (transformedInput !== text) {
	              ngModelCtrl.$setViewValue(transformedInput);
	              ngModelCtrl.$render();
	            }
	            return transformedInput;
	          }
	          ngModelCtrl.$parsers.push(fromUser);
	        }
	      };
	    };
	})();