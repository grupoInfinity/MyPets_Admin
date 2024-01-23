DROP DATABASE IF EXISTS `dbMyPet`;

CREATE DATABASE IF NOT EXISTS `dbMyPet`;

USE `dbMyPet`;
SELECT * FROM sec_opc_rol


SELECT v.id_vacuna,v.id_mascota,v.id_tipovacuna,t.nombrevacuna,DATE(v.fecha_creacion) AS fecha_creacion
 FROM dbmypet.prc_vacunas v, dbmypet.prc_mascotas m, dbmypet.ctg_tipovacunas t 
WHERE v.id_mascota=2 AND  v.id_mascota=m.id_mascota AND v.id_tipovacuna=t.id_tipovacuna

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


insert  into `sec_opcion`(`id_opc`,`id_menu`,`id_opc_padre`,`padre`,`descripcion`,`url`,`estado`,
`usuario_creacion`,`fecha_creacion`,`usuario_update`,`fecha_update`,`orden`) 
    VALUES 
    #ADMINISTRACION
    #CATALOGOS
    #(1,1,NULL,1,'Catalogos','','A','admin','2018-11-09 15:29:05','nguerrero','2021-08-12 00:00:00',1),#PADRE
    (1,1,1,NULL,'Departamentos','menuMaster.listDepts()','A',NULL,NULL,NULL,NULL,1),
    (2,1,1,NULL,'Municipios','menuMaster.listMuni()','A',NULL,NULL,NULL,NULL,2),
    (3,1,1,NULL,'Tipos mascotas','menuMaster.listTPmascota()','A',NULL,NULL,NULL,NULL,3),
    (4,1,1,NULL,'Tipos vacunas','menuMaster.listTipovac()','A',NULL,NULL,NULL,NULL,4),
    #PROCEDIMIENTOS
    #(6,1,NULL,1,'Procedimientos','','A','admin','2018-11-09 15:29:05',NULL,NULL,2),#PADRE
    (5,1,NULL,NULL,'Mascotas','menuMaster.listMascota()','A',NULL,NULL,NULL,NULL,1),
    #SEGURIDAD
    #REGISTROS
    #(8,2,NULL,1,'Registros','','A','admin','2018-11-09 15:29:05','nguerrero','2021-08-12 00:00:00',1),#PADRE
    (6,2,NULL,NULL,'Usuario','menuMaster.listUsuario()','A','admin','2018-11-09 15:29:05',NULL,NULL,2),
    #AUTORIZACION
    #(10,2,NULL,1,'Autorizacion','','A','admin','2018-11-09 15:29:05','nguerrero','2021-08-12 00:00:00',3),#PADRE
    (7,2,NULL,NULL,'Opción','menuMaster.listOpcion()','A','admin','2018-11-09 15:29:05','system','2023-12-03 00:00:00',4),
    (8,2,NULL,NULL,'Rol','menuMaster.listRol()','A','admin','2018-11-09 15:29:05',NULL,NULL,5),
    (9,2,NULL,NULL,'Opcion Principal','menuMaster.listOpcionPrincipal()','A','admin','2018-11-09 15:29:05',NULL,NULL,6),
    (10,2,NULL,NULL,'Setup','menuMaster.listSetup()','I','admin','2021-08-07 18:12:47',NULL,NULL,7),
    #PERFIL
    (11,3,NULL,NULL,'Cuenta','','A','admin','2018-11-09 15:29:05',NULL,NULL,1);#PADRE


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
	 #(1,1,1,'admin','2018-11-09 15:29:01',NULL,NULL),
    (1,1,1,'admin','2018-11-09 15:29:01',NULL,NULL),#DEPARTAMENTOS
    (1,2,1,'admin','2018-11-09 15:29:01',NULL,NULL),#MUNICIPIOS
    (1,3,1,'admin','2018-11-09 15:29:01',NULL,NULL),#TIPO MASCOTAS
    (1,4,1,'admin','2018-11-09 15:29:01',NULL,NULL),#TIPO VACUNAS
    #ADMIN PROCEDIMIENTOS
    #(1,6,1,'admin','2018-11-09 15:29:01',NULL,NULL),
    #(1,6,2,'admin','2018-11-09 15:29:01',NULL,NULL),
    (1,5,1,'admin','2018-11-09 15:29:01',NULL,NULL),#MASCOTA ADMIN
    (1,5,2,'admin','2018-11-09 15:29:01',NULL,NULL),#MASCOTA CLIENTE
    #SEGURIDAD
    #(2,8,1,'admin','2018-11-09 15:29:01',NULL,NULL),#
    (2,6,1,'admin','2018-11-09 15:29:01',NULL,NULL),#
    #(2,10,1,'admin','2018-11-09 15:29:01',NULL,NULL),#
    (2,7,1,'admin','2018-11-09 15:29:01',NULL,NULL),#
    (2,8,1,'admin','2018-11-09 15:29:01',NULL,NULL),#
    (2,9,1,'admin','2018-11-09 15:29:01',NULL,NULL),#
    (2,10,1,'admin','2018-11-09 15:29:01',NULL,NULL),#
	 #PERFIL
    (3,1,1,'admin','2018-11-09 15:29:01',NULL,NULL),#SETUP
    (3,11,2,'admin','2018-11-09 15:29:01',NULL,NULL);#SETUP 

LOCK TABLES `sec_opc_rol` WRITE;

USE dbmypet
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
    `codigo` VARCHAR(255) UNIQUE,
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
VALUE(1,1,1,'dnery','Avenida','A','Charly','239022','2019-03-02','
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
','A','dnery','2021-08-11 16:15:48',NULL,NULL),
(2,2,6,'dnery','Avenida Hulin','A','Mily','200022','2019-03-02',NULL,'A','dnery','2021-08-11 16:15:48',NULL,NULL),
(3,2,1,'nmunoz','Colonia San Martin','A','Jilly','300221','2019-03-02',NULL,'A','dnery','2021-08-11 16:15:48',NULL,NULL);
 
USE dbmypet
SELECT * FROM sec_usuario;
SELECT * FROM ctg_municipios


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


SELECT * FROM sec_usuario
UPDATE sec_usuario SET usuario='dbarrientosss' WHERE usuario=''


SELECT * from prc_vacunas

LOCK TABLES `prc_vacunas` WRITE;
USE dbmypet

 
/*--------------------TABLAS SEGURIDAD-----------------------------*/
