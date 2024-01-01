DROP DATABASE IF EXISTS `dbMyPet`;

CREATE DATABASE IF NOT EXISTS `dbMyPet`;

USE `dbMyPet`;
/*
SELECT DISTINCT opc.*  
		FROM sec_rol_usuario rs
		INNER JOIN sec_opc_rol opcr ON opcr.id_rol = rs.id_rol
		INNER JOIN sec_opcion opc ON opc.id_opc = opcr.id_opc 
		AND COALESCE(opc.id_menu, -1) = COALESCE(opcr.id_menu, -1)
		AND opc.estado = 'A'
		INNER JOIN sec_usuario us ON us.usuario = rs.usuario*/
		
	
		SELECT DISTINCT mn.*  
		FROM sec_menu mn
		INNER JOIN sec_opc_rol opcr ON opcr.id_menu = mn.id_menu
		INNER JOIN sec_rol_usuario rs ON rs.usuario = '' AND rs.id_rol = opcr.id_rol
		WHERE mn.estado = 'A'

DROP TABLE IF EXISTS `sec_menu`;

CREATE TABLE IF NOT EXISTS dbMyPet.sec_menu (   #SEC MENU
  `id_menu` INT NOT NULL COMMENT 'id opcion principal',
  `descripcion` varchar(125) DEFAULT NULL COMMENT 'descripcion de la opcion principal',
  `menu_icon` varchar(500) DEFAULT NULL COMMENT 'icono del menu',
  `orden` int(3) DEFAULT NULL COMMENT 'orden de la opción principal',
  `acceso_directo` tinyint(1) DEFAULT NULL COMMENT 'si la opción principal tendrá acceso directo',
  `estado` varchar(1) DEFAULT 'A' COMMENT 'estado de la opcion principal',
  `usuario_creacion` varchar(255) DEFAULT NULL COMMENT 'usuario creacion',
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'fecha creacion',
  `usuario_update` varchar(255) DEFAULT NULL COMMENT 'usuario modificacion',
  `fecha_update` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT 'fecha modificacion',
  PRIMARY KEY (`id_menu`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabla de seguridad para manejo de las opciones principales';


LOCK TABLES `sec_menu` WRITE;

insert  into `sec_menu`(`id_menu`,`descripcion`,`menu_icon`,`orden`,`acceso_directo`,`estado`,
`usuario_creacion`,`fecha_creacion`,`usuario_update`,`fecha_update`)
 values (1,'Administración','glyphicon-th',1,1,'A','admin','2018-11-09 15:28:56','nguerrero','2021-08-12 00:56:20'),
 		  (2,'Seguridad','glyphicon-cog',2,1,'A','admin','2018-11-09 15:28:56','nguerrero','2021-08-12 00:56:31'),
 		  (3,'Perfil','glyphicon-user',3,1,'A','admin','2018-11-09 15:28:56','admin','2019-02-18 21:49:07');

UNLOCK TABLES;

DROP TABLE IF EXISTS `sec_opc_rol`;
DROP TABLE IF EXISTS `sec_opcion`;
SELECT * FROM `sec_menu`;
SELECT * FROM `sec_opc_rol`;
SELECT * FROM `sec_opcion`;

CREATE TABLE IF NOT EXISTS dbMyPet.sec_opcion (
  `id_opc` int NOT NULL COMMENT 'id de la opcion',
  `id_menu` int NOT NULL DEFAULT 0 COMMENT 'id de la opcion principal',
  `id_opc_padre` int DEFAULT NULL COMMENT 'id de la opcion padre',
  `padre` tinyint(1) DEFAULT NULL COMMENT 'si la opcion es padre',
  `descripcion` varchar(125) DEFAULT NULL COMMENT 'descripcion de la opcion',
  `url` varchar(125) DEFAULT NULL COMMENT 'url de la opcion',
  `estado` varchar(1) DEFAULT 'A' COMMENT 'estado de la opcion',
  `usuario_creacion` varchar(255) DEFAULT NULL COMMENT 'usuario creacion',
  `fecha_creacion` datetime DEFAULT NULL COMMENT 'fecha creacion',
  `usuario_update` varchar(255) DEFAULT NULL COMMENT 'usuario modificacion',
  `fecha_update` datetime DEFAULT NULL  COMMENT 'fecha modificacion',
  `orden` int(5) DEFAULT NULL COMMENT 'orden de la opcion',
  PRIMARY KEY (`id_opc`),
  KEY `FK_OPC_PRINCIPAL` (`id_menu`),
  CONSTRAINT `FK_OPC_PRINCIPAL` FOREIGN KEY (`id_menu`) REFERENCES `sec_menu` (`id_menu`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabla de seguridad para manejo de las opciones';

LOCK TABLES `sec_opcion` WRITE;


insert  into `sec_opcion`(`id_opc`,`id_menu`,`id_opc_padre`,`padre`,`descripcion`,`url`,`estado`,
`usuario_creacion`,`fecha_creacion`,`usuario_update`,`fecha_update`,`orden`) 
    VALUES 
    #ADMINISTRACION
    #CATALOGOS
    (1,1,NULL,1,'Catalogos','','A','admin','2018-11-09 15:29:05','nguerrero','2021-08-12 00:00:00',1),#PADRE
    (2,1,1,NULL,'Departamentos','menuMaster.listDepts()','A',NULL,NULL,NULL,NULL,1),
    (3,1,1,NULL,'Municipios','menuMaster.listMuni()','A',NULL,NULL,NULL,NULL,2),
    (4,1,1,NULL,'Tipos mascotas','menuMaster.listTPmascota()','A',NULL,NULL,NULL,NULL,3),
    (5,1,1,NULL,'Tipos vacunas','menuMaster.listTipovac()','A',NULL,NULL,NULL,NULL,4),
    #PROCEDIMIENTOS
    (6,1,NULL,1,'Procedimientos','','A','admin','2018-11-09 15:29:05',NULL,NULL,2),#PADRE
    (7,1,6,NULL,'Mascotas','menuMaster.listMascota()','A',NULL,NULL,NULL,NULL,1),
    #SEGURIDAD
    #REGISTROS
    (8,2,NULL,1,'Registros','','A','admin','2018-11-09 15:29:05','nguerrero','2021-08-12 00:00:00',1),#PADRE
    (9,2,8,NULL,'Usuario','menuMaster.listUsuario()','A','admin','2018-11-09 15:29:05',NULL,NULL,2),
    #AUTORIZACION
    (10,2,NULL,1,'Autorizacion','','A','admin','2018-11-09 15:29:05','nguerrero','2021-08-12 00:00:00',3),#PADRE
    (11,2,10,NULL,'Opción','menuMaster.listOpcion()','A','admin','2018-11-09 15:29:05','system','2023-12-03 00:00:00',4),
    (12,2,10,NULL,'Rol','menuMaster.listRol()','A','admin','2018-11-09 15:29:05',NULL,NULL,5),
    (13,2,10,NULL,'Opcion Principal','menuMaster.listOpcionPrincipal()','A','admin','2018-11-09 15:29:05',NULL,NULL,6),
    (14,2,10,NULL,'Setup','menuMaster.listSetup()','I','admin','2021-08-07 18:12:47',NULL,NULL,7),
    #PERFIL
    (15,3,NULL,1,'Cuenta','','A','admin','2018-11-09 15:29:05',NULL,NULL,1);#PADRE


SELECT * FROM sec_opcion

SELECT A.id_opc, A.id_menu, A.id_opc_padre, A.padre, 
    A.descripcion, A.url, A.estado, A.id_empresa, A.orden
	FROM sec_opcion A

UNLOCK TABLES;

DROP TABLE IF EXISTS `sec_rol`;

CREATE TABLE IF NOT EXISTS dbMyPet.sec_rol (
  `id_rol` int NOT NULL COMMENT 'id del rol',
  `descripcion` varchar(50) DEFAULT NULL COMMENT 'descripcion del rol',
  `estado` varchar(1) DEFAULT 'A' COMMENT 'estado del rol',
  `usuario_creacion` varchar(255) DEFAULT NULL COMMENT 'usuario creacion',
  `fecha_creacion` datetime DEFAULT NULL COMMENT 'fecha creacion',
  `usuario_update` varchar(255) DEFAULT NULL COMMENT 'usuario modificacion',
  `fecha_update` datetime DEFAULT NULL  COMMENT 'fecha modificacion',
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabla de seguridad para manejo de los roles';

LOCK TABLES `sec_rol` WRITE;

insert  into `sec_rol`(`id_rol`,`descripcion`,`estado`,`usuario_creacion`,`fecha_creacion`,`usuario_update`,`fecha_update`)
  VALUE(1,'Administrador','A','admin','2021-08-11 16:15:48','admin','2019-02-11 00:00:00'),
 (2,'Cliente','A','admin','2021-08-11 16:15:48',NULL,NULL);
 
 SELECT * FROM sec_rol

UNLOCK TABLES;

DROP TABLE IF EXISTS `sec_usuario`;

CREATE TABLE IF NOT EXISTS dbMyPet.sec_usuario (
  `usuario` varchar(255) NOT NULL COMMENT 'id del usuario',
  `clave` varchar(255) DEFAULT NULL COMMENT 'clave del usuario',
  `nombre` varchar(255) DEFAULT NULL COMMENT 'nombre del usuario',
  `apellido` varchar(255) DEFAULT NULL COMMENT 'apellido del usuario',
  `email` varchar(255) DEFAULT NULL COMMENT 'email del usuario',
  `telefono` varchar(255) DEFAULT NULL COMMENT 'telefono del usuario',
  `pin` varchar(255) DEFAULT NULL COMMENT 'pin para recuperar clave',
  `estado` varchar(1) DEFAULT 'A' COMMENT 'estado del usuario',
  `usuario_creacion` varchar(255) DEFAULT NULL COMMENT 'usuario creacion',
  `fecha_creacion` datetime DEFAULT NULL COMMENT 'fecha creacion',
  `usuario_update` varchar(255) DEFAULT NULL COMMENT 'usuario modificacion',
  `fecha_update` datetime DEFAULT NULL  COMMENT 'fecha modificacion',
  PRIMARY KEY (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabla de seguridad para manejo de usuario';


LOCK TABLES `sec_usuario` WRITE;

insert  into `sec_usuario`(`usuario`,`clave`,`telefono`,`nombre`,`apellido`,`email`,`pin`,`estado`,`usuario_creacion`,`fecha_creacion`,`usuario_update`,`fecha_update`) 
    values ('dbarrientos','22222222','123','Dennis','Barrientos','gustavo.moreno@gi-sv.com','000100','A','admin','2021-11-14 13:13:24',NULL,NULL),
    ('dnery','123','22222222','Daniel','Nery','gustavo.moreno@gi-sv.com','000200','A','admin','2021-11-14 13:13:24',NULL,NULL),
    ('esantos','123','22222223','Eneas','Santos','gustavo.moreno@gi-sv.com','000300','A','admin','2021-11-14 13:13:24',NULL,NULL),
    ('gmoreno','456','22222224','Gustavo','Moreno','gustavo.moreno@gi-sv.com','000400','A','admin','2021-11-14 13:13:24','gmoreno','2021-11-14 16:01:38'),
    ('iabrego','123','22222225','Ivan','Abrego','gustavo.moreno@gi-sv.com','000100','A','admin','2021-11-14 13:13:24','system','2023-12-03 00:00:00'),
    ('jcastaneda','123','22222226','Jorge','Castaneda','gustavo.moreno@gi-sv.com','000500','A','admin','2021-11-14 13:13:24',NULL,NULL),
    ('kguardado','123','22222227','Karina','Guardado','gustavo.moreno@gi-sv.com','000600','A','admin','2021-11-14 13:13:24',NULL,NULL),
    ('lcastillo','123','22222228','Luis','Castillo','gustavo.moreno@gi-sv.com','000700','A','admin','2021-11-14 13:13:24',NULL,NULL),
    ('nmena','123','22222229','Nelson','Mena','gustavo.moreno@gi-sv.com','000800','A','admin','2021-11-14 13:13:24',NULL,NULL),
    ('nmunoz','123','22222202','Nelson','Muñoz','gustavo.moreno@gi-sv.com','000900','A','admin','2021-11-14 13:13:24',NULL,NULL),
    ('system','321','22222002','Administrador','Sistemas','gustavo.moreno@gi-sv.com','000110','A','admin','2021-11-14 13:13:24',NULL,NULL);


SELECT * FROM sec_rol_user

UNLOCK TABLES;

DROP TABLE IF EXISTS `sec_opc_rol`;

CREATE TABLE IF NOT EXISTS dbMyPet.sec_opc_rol (
  `id_menu` int NOT NULL DEFAULT 0 COMMENT 'id opcion principal',
  `id_opc` int NOT NULL COMMENT 'id opcion',
  `id_rol` int NOT NULL COMMENT 'id rol',
  `usuario_creacion` varchar(255) DEFAULT NULL COMMENT 'usuario creacion',
  `fecha_creacion` datetime DEFAULT NULL COMMENT 'fecha creacion',
  `usuario_update` varchar(255) DEFAULT NULL COMMENT 'usuario modificacion',
  `fecha_update` datetime DEFAULT NULL  COMMENT 'fecha modificacion',
  PRIMARY KEY (`id_menu`,`id_opc`,`id_rol`),
  KEY `FK_OPC_PPAL1` (`id_menu`),
  KEY `FK_ROL2` (`id_rol`),
  KEY `FK_OPC1` (`id_opc`),
  CONSTRAINT `FK_OPC1` FOREIGN KEY (`id_opc`) REFERENCES `sec_opcion` (`id_opc`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_OPC_PPAL1` FOREIGN KEY (`id_menu`) REFERENCES `sec_menu` (`id_menu`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ROL2` FOREIGN KEY (`id_rol`) REFERENCES `sec_rol` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabla de seguridad para manejo de las opciones por rol';

insert  into `sec_opc_rol`(`id_menu`,`id_opc`,`id_rol`,`usuario_creacion`,`fecha_creacion`,`usuario_update`,`fecha_update`) 
    values
    #ADMIN CATALOGO
	 (1,1,1,'admin','2018-11-09 15:29:01',NULL,NULL),
    (1,2,1,'admin','2018-11-09 15:29:01',NULL,NULL),#DEPARTAMENTOS
    (1,3,1,'admin','2018-11-09 15:29:01',NULL,NULL),#MUNICIPIOS
    (1,4,1,'admin','2018-11-09 15:29:01',NULL,NULL),#TIPO MASCOTAS
    (1,5,1,'admin','2018-11-09 15:29:01',NULL,NULL),#TIPO VACUNAS
    #ADMIN PROCEDIMIENTOS
    (1,6,1,'admin','2018-11-09 15:29:01',NULL,NULL),
    (1,6,2,'admin','2018-11-09 15:29:01',NULL,NULL),
    (1,7,1,'admin','2018-11-09 15:29:01',NULL,NULL),#MASCOTA ADMIN
    (1,7,2,'admin','2018-11-09 15:29:01',NULL,NULL),#MASCOTA CLIENTE
    #SEGURIDAD
    (2,8,1,'admin','2018-11-09 15:29:01',NULL,NULL),#
    (2,9,1,'admin','2018-11-09 15:29:01',NULL,NULL),#
    (2,10,1,'admin','2018-11-09 15:29:01',NULL,NULL),#
    (2,11,1,'admin','2018-11-09 15:29:01',NULL,NULL),#
    (2,12,1,'admin','2018-11-09 15:29:01',NULL,NULL),#
    (2,13,1,'admin','2018-11-09 15:29:01',NULL,NULL),#
    (2,14,1,'admin','2018-11-09 15:29:01',NULL,NULL),#
	 #PERFIL
    (3,15,1,'admin','2018-11-09 15:29:01',NULL,NULL),#SETUP
    (3,15,2,'admin','2018-11-09 15:29:01',NULL,NULL);#SETUP 

LOCK TABLES `sec_opc_rol` WRITE;


UNLOCK TABLES;

DROP TABLE IF EXISTS `sec_rol_usuario`;

CREATE TABLE IF NOT EXISTS dbMyPet.sec_rol_usuario (
  `usuario` varchar(30) NOT NULL COMMENT 'id de usuario',
  `id_rol` INT NOT NULL COMMENT 'id del rol',
  `usuario_creacion` varchar(255) DEFAULT NULL COMMENT 'usuario creacion',
  `fecha_creacion` datetime DEFAULT NULL COMMENT 'fecha creacion',
  `usuario_update` varchar(255) DEFAULT NULL COMMENT 'usuario modificacion',
  `fecha_update` datetime DEFAULT NULL  COMMENT 'fecha modificacion',
  PRIMARY KEY (`usuario`,`id_rol`),
  KEY `FK_ROL1` (`id_rol`),
  KEY `FK_USUARIO1` (`usuario`),
  CONSTRAINT `FK_ROL1` FOREIGN KEY (`id_rol`) REFERENCES `sec_rol` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabla de seguridad para manejo de los roles por usuario';


LOCK TABLES `sec_rol_usuario` WRITE;

insert  into `sec_rol_usuario`(`usuario`,`id_rol`,`usuario_creacion`,`fecha_creacion`,`usuario_update`,`fecha_update`) 
    values ('dbarrientos',1,'admin','2021-08-11 16:15:48',NULL,NULL),
    ('dnery',1,'admin','2021-08-11 16:15:48',NULL,NULL),
    ('esantos',1,'admin','2021-08-11 16:15:48',NULL,NULL),
    ('gmoreno',1,'admin','2021-08-11 16:15:48',NULL,NULL),
    ('iabrego',1,'admin','2021-08-11 16:15:48',NULL,NULL),
    ('jcastaneda',1,'admin','2021-08-11 16:15:48',NULL,NULL),
    ('kguardado',1,'admin','2021-08-11 16:15:48',NULL,NULL),
    ('lcastillo',1,'admin','2021-08-11 16:15:48',NULL,NULL),
    ('nmena',1,'admin','2021-08-11 16:15:48',NULL,NULL),
    ('nmunoz',2,'admin','2021-08-11 16:15:48',NULL,NULL),
    ('system',1,'system','2021-08-11 16:15:48',NULL,NULL);
    
    
SELECT A.id_rol, A.descripcion, A.estado
FROM sec_rol A WHERE A.id_rol = 1

UNLOCK TABLES;


DROP TABLE IF EXISTS `ctg_tipovacunas`;
/*--------------------TABLAS CATALOGO------------------------------*/
CREATE TABLE IF NOT EXISTS dbMyPet.ctg_tipovacunas(
    `id_tipovacuna` INT PRIMARY KEY,
    `nombrevacuna` VARCHAR(255),
    `estado` VARCHAR(1),
    `usuario_creacion` varchar(255) DEFAULT NULL COMMENT 'usuario creacion',
    `fecha_creacion` datetime DEFAULT NULL COMMENT 'fecha creacion',
    `usuario_update` varchar(255) DEFAULT NULL COMMENT 'usuario modificacion',
    `fecha_update` datetime DEFAULT NULL  COMMENT 'fecha modificacion'
)ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabla de seguridad para manejo de los roles por usuario';

insert  into `ctg_tipovacunas`(`id_tipovacuna`,`nombrevacuna`,`estado`,`usuario_creacion`,`fecha_creacion`,`usuario_update`,`fecha_update`) 
    values (1,'distemper','A','admin','2021-08-11 16:15:48',NULL,NULL),
    (2,'parvovirosis','A','admin','2021-08-11 16:15:48',NULL,NULL),
    (3,'adenovirus canino','A','admin','2021-08-11 16:15:48',NULL,NULL),
    (4,'leptospirosis','A','admin','2021-08-11 16:15:48',NULL,NULL),
    (5,'rabia','A','admin','2021-08-11 16:15:48',NULL,NULL),
    (6,'polivalente','A','admin','2021-08-11 16:15:48',NULL,NULL),
    (7,'moquillo canino','A','admin','2021-08-11 16:15:48',NULL,NULL)

LOCK TABLES `ctg_tipovacunas` WRITE;

DROP TABLE IF EXISTS `ctg_tipomascotas`;
CREATE TABLE IF NOT EXISTS dbMyPet.ctg_tipomascotas(
    `id_tipomascota` INT PRIMARY KEY,
    `tipomascota` VARCHAR(255),
    `estado` VARCHAR(1),
    `usuario_creacion` varchar(255) DEFAULT NULL COMMENT 'usuario creacion',
    `fecha_creacion` datetime DEFAULT NULL COMMENT 'fecha creacion',
    `usuario_update` varchar(255) DEFAULT NULL COMMENT 'usuario modificacion',
    `fecha_update` datetime DEFAULT NULL  COMMENT 'fecha modificacion'
)ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabla de seguridad para manejo de los roles por usuario';


insert  into `ctg_tipomascotas`(`id_tipomascota`,`tipomascota`,`estado`,`usuario_creacion`,`fecha_creacion`,`usuario_update`,`fecha_update`) 
    values (1,'gato','A','admin','2021-08-11 16:15:48',NULL,NULL),
    (2,'perro','A','admin','2021-08-11 16:15:48',NULL,NULL),
    (3,'conejo','A','admin','2021-08-11 16:15:48',NULL,NULL),
    (4,'tortuga','A','admin','2021-08-11 16:15:48',NULL,NULL),
    (5,'hamster','A','admin','2021-08-11 16:15:48',NULL,NULL)

LOCK TABLES `ctg_tipomascotas` WRITE;

DROP TABLE IF EXISTS `ctg_departamentos`;
CREATE TABLE IF NOT EXISTS dbMyPet.ctg_departamentos(
    `id_departamento` INT PRIMARY KEY,
    `descripcion` VARCHAR(255),
    `estado` VARCHAR(1),
    `usuario_creacion` varchar(255) DEFAULT NULL COMMENT 'usuario creacion',
    `fecha_creacion` datetime DEFAULT NULL COMMENT 'fecha creacion',
    `usuario_update` varchar(255) DEFAULT NULL COMMENT 'usuario modificacion',
    `fecha_update` datetime DEFAULT NULL  COMMENT 'fecha modificacion'
)ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabla de seguridad para manejo de los roles por usuario';


INSERT INTO ctg_departamentos (id_departamento, descripcion,estado,usuario_creacion,fecha_creacion,usuario_update,fecha_update) 
VALUE(1,'San Salvador','A','admin','2021-08-11 16:15:48',NULL,NULL),
(2,'San Vicente','A','admin','2021-08-11 16:15:48',NULL,NULL),
(3,'Ahuachapan','A','admin','2021-08-11 16:15:48',NULL,NULL),
(4,'San Miguel','A','admin','2021-08-11 16:15:48',NULL,NULL),
(5,'Santa Ana','A','admin','2021-08-11 16:15:48',NULL,NULL),
(6,'Morazan','A','admin','2021-08-11 16:15:48',NULL,NULL),
(7,'La Libertad','A','admin','2021-08-11 16:15:48',NULL,NULL),
(8,'Sonsonate','A','admin','2021-08-11 16:15:48',NULL,NULL),
(9,'Chalatenango','A','admin','2021-08-11 16:15:48',NULL,NULL),
(10,'La Union','A','admin','2021-08-11 16:15:48',NULL,NULL),
(11,'La Paz','A','admin','2021-08-11 16:15:48',NULL,NULL),
(12,'Usulutan','A','admin','2021-08-11 16:15:48',NULL,NULL),
(13,'Cabañas','A','admin','2021-08-11 16:15:48',NULL,NULL),
(14,'Cuscatlan','A','admin','2021-08-11 16:15:48',NULL,NULL)

SELECT * FROM ctg_departamentos

LOCK TABLES `ctg_departamentos` WRITE;

/*insert into ctg_departamentos (id_departamento,departamento,estado)
 VALUES (1,'San Salvador','A'),(2,'San Miguel','A');*/
DROP TABLE IF EXISTS `ctg_municipios`;
CREATE TABLE IF NOT EXISTS dbMyPet.ctg_municipios(
    `id_municipio` INT,
    `id_departamento` INT,
    `descripcion` VARCHAR(255),
    `estado` VARCHAR(1),
    `usuario_creacion` varchar(255) DEFAULT NULL COMMENT 'usuario creacion',
    `fecha_creacion` datetime DEFAULT NULL COMMENT 'fecha creacion',
    `usuario_update` varchar(255) DEFAULT NULL COMMENT 'usuario modificacion',
    `fecha_update` datetime DEFAULT NULL  COMMENT 'fecha modificacion',
    PRIMARY KEY (`id_municipio`),
    KEY `fk_municipios_dep` (`id_departamento`),
    -- DEPARTAMENTO A MUNICIPIO
    CONSTRAINT `fk_municipios_dep` FOREIGN KEY(`id_departamento`) REFERENCES `ctg_departamentos`(`id_departamento`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabla de seguridad para manejo de los roles por usuario';

INSERT INTO ctg_municipios (id_municipio,id_departamento, descripcion,estado,usuario_creacion,fecha_creacion,usuario_update,fecha_update) 
VALUE(1, 1, 'San Salvador Norte', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(2, 1, 'San Salvador Sur', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(3, 1, 'San Salvador Este', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(4, 1, 'San Salvador Oeste', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(5, 2, 'San Vicente Norte', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(6, 2, 'San Vicente Sur', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(7, 2, 'San Vicente Este', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(8, 2, 'San Vicente Oeste', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(9, 3, 'Ahuachapan Norte', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(10, 3, 'Ahuachapan Sur', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(11, 3, 'Ahuachapan Este', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(12, 3, 'Ahuachapan Oeste', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(13, 7, 'La Libertad Norte', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(14, 7, 'La Libertad Sur', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(15, 7, 'La Libertad Este', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(16, 7, 'La Libertad Oeste', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(17, 8, 'Sonsonate Norte', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(18, 8, 'Sonsonate Sur', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(19, 8, 'Sonsonate Este', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(20, 8, 'Sonsonate Oeste', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(21, 9, 'Chalatenango Norte', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(22, 9, 'Chalatenango Sur', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(23, 9, 'Chalatenango Este', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(24, 9, 'Chalatenango Oeste', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(25, 10, 'La Union Norte', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(26, 10, 'La Union Sur', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(27, 10, 'La Union Este', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(28, 10, 'La Union Oeste', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(29, 11, 'La Paz Norte', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(30, 11, 'La Paz Sur', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(31, 11, 'La Paz Este', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(32, 11, 'La Paz Oeste', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(33, 12, 'Usulutan Norte', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(34, 12, 'Usulutan Sur', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(35, 12, 'Usulutan Este', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(36, 12, 'Usulutan Oeste', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(37, 13, 'Cabañas Norte', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(38, 13, 'Cabañas Sur', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(39, 13, 'Cabañas Este', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(40, 13, 'Cabañas Oeste', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(41, 14, 'Cuscatlan Norte', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(42, 14, 'Cuscatlan Sur', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(43, 14, 'Cuscatlan Este', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(44, 14, 'Cuscatlan Oeste', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(45, 4, 'San Miguel Norte', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(46, 4, 'San Miguel Sur', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(47, 4, 'San Miguel Este', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(48, 4, 'San Miguel Oeste', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(49, 5, 'Santa Ana Norte', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(50, 5, 'Santa Ana Sur', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(51, 5, 'Santa Ana Este', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(52, 5, 'Santa Ana Oeste', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(53, 6, 'Morazan Norte', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(54, 6, 'Morazan Sur', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(55, 6, 'Morazan Este', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL),
(56, 6, 'Morazan Oeste', 'A', 'admin','2021-08-11 16:15:48',NULL,NULL)

LOCK TABLES `ctg_municipios` WRITE;

/*insert into ctg_municipios(id_municipio,id_departamento,municipio,estado) 
 VALUES (1,1,'San Salvador Centro','A'),(2,2,'San Miguel Centro','A');
 select * from ctg_municipios where municipio like '%M%'
 select id_municipio,departamento,municipio,M.estado
 from ctg_municipios M,ctg_departamentos D 
 where M.id_departamento=D.id_departamento AND
 id_municipio=2*/
/*--------------------TABLAS DINAMICAS-----------------------------*/
DROP TABLE IF EXISTS `prc_mascotas`;
CREATE TABLE IF NOT EXISTS dbMyPet.prc_mascotas(
    `id_mascota` INT,
    `id_tipomascota` INT,
    `id_municipio` INT,
    `usuario` varchar(255),
    `direccion` VARCHAR(255),
    `estado_direc` VARCHAR(1),
    `nombremascota` VARCHAR(255),
    `codigo` VARCHAR(255),
    `nacimiento` date,
    `foto` LONGTEXT,
    `estado` VARCHAR(1),
    `usuario_creacion` varchar(255) DEFAULT NULL COMMENT 'usuario creacion',
    `fecha_creacion` datetime DEFAULT NULL COMMENT 'fecha creacion',
    `usuario_update` varchar(255) DEFAULT NULL COMMENT 'usuario modificacion',
    `fecha_update` datetime DEFAULT NULL  COMMENT 'fecha modificacion',
    PRIMARY KEY (`id_mascota`),
    KEY `fk_mascotas_tpm` (`id_tipomascota`),
    KEY `fk_mascotas_munic`(`id_municipio`),
    KEY `fk_mascotas_us` (`usuario`),
    CONSTRAINT `fk_mascotas_tpm` FOREIGN KEY(`id_tipomascota`) REFERENCES `ctg_tipomascotas`(`id_tipomascota`),
    CONSTRAINT `fk_mascotas_munic` FOREIGN KEY(`id_municipio`) REFERENCES `ctg_municipios`(`id_municipio`),
    CONSTRAINT `fk_mascotas_us` FOREIGN KEY(`usuario`) REFERENCES `sec_usuario`(`usuario`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabla de seguridad para manejo de los roles por usuario';

INSERT INTO prc_mascotas(id_mascota,id_tipomascota,id_municipio,usuario,direccion,estado_direc,nombremascota,
codigo,nacimiento,foto,estado,usuario_creacion,fecha_creacion,usuario_update,fecha_update) 
VALUE(1,1,1,'dnery','Avenida','A','Charly','239022','2019-03-02',NULL,'A','dnery','2021-08-11 16:15:48',NULL,NULL),
(2,2,1,'dnery','Avenida Hulin','A','Mily','200022','2019-03-02',NULL,'A','dnery','2021-08-11 16:15:48',NULL,NULL);


SELECT * FROM ctg_departamentos;SELECT * FROM ctg_municipios

SELECT m.id_mascota, u.usuario, u.email,u.telefono,m.nombremascota,
    d.descripcion as depto,mu.descripcion as muni,m.direccion,m.estado_direc,m.codigo,m.nacimiento 
    FROM prc_mascotas m, ctg_tipomascotas t, ctg_municipios mu,
    sec_usuario u, ctg_departamentos d 
    WHERE #$id_mascota $usuario $nombremasc $estado AND 
	 m.id_tipomascota=t.id_tipomascota AND m.usuario=u.usuario 
    AND m.id_municipio=mu.id_municipio AND mu.id_departamento=d.id_departamento


SELECT * FROM prc_mascotas 
LOCK TABLES `prc_mascotas` WRITE;
/*
 SELECT m.id_mascota, u.id_usuario, u.mail,u.telefono,m.nombremascota,
 d.departamento,mu.municipio,m.direccion,m.estado_direc,m.codigo,m.edad,m.foto 
 FROM prc_mascotas m,sec_usuarios u, ctg_tipomascotas t, ctg_municipios mu, ctg_departamentos d 
 WHERE m.id_tipomascota=t.id_tipomascota AND m.id_usuario=u.id_usuario AND mu.id_departamento=d.id_departamento 
 AND m.id_mascota=1;
 */
 DROP TABLE IF EXISTS `prc_vacunas`;
CREATE TABLE IF NOT EXISTS dbMyPet.prc_vacunas(
    `id_vacuna` INT,
    `id_mascota` INT,
    `id_tipovacuna` INT,
    `usuario_creacion` varchar(255) DEFAULT NULL COMMENT 'usuario creacion',
    `fecha_creacion` datetime DEFAULT NULL COMMENT 'fecha creacion',
    `usuario_update` varchar(255) DEFAULT NULL COMMENT 'usuario modificacion',
    `fecha_update` datetime DEFAULT NULL  COMMENT 'fecha modificacion',
    PRIMARY KEY(`id_vacuna`,`id_mascota`,`id_tipovacuna`),
    KEY `fk_mascota_vac` (`id_mascota`),
    KEY `fk_tipovac_vac` (`id_tipovacuna`),
    CONSTRAINT `fk_mascota_vac` FOREIGN KEY(`id_mascota`) REFERENCES `prc_mascotas`(`id_mascota`),
    CONSTRAINT `fk_tipovac_vac` FOREIGN KEY(`id_tipovacuna`) REFERENCES `ctg_tipovacunas`(`id_tipovacuna`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabla de seguridad para manejo de los roles por usuario';

INSERT INTO prc_vacunas(id_vacuna,id_mascota,id_tipovacuna,usuario_creacion,fecha_creacion,usuario_update,fecha_update) 
VALUE(1,1,1,'dnery','2021-08-11 16:15:48',NULL,NULL);

INSERT INTO prc_vacunas(id_vacuna,id_mascota,id_tipovacuna,usuario_creacion,fecha_creacion,usuario_update,fecha_update) 
VALUE(2,2,2,'dnery','2021-08-11 16:15:48',NULL,NULL);

SELECT * from prc_mascotas

LOCK TABLES `prc_vacunas` WRITE;
USE dbmypet

 
/*--------------------TABLAS SEGURIDAD-----------------------------*/
