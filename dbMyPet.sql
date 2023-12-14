CREATE DATABASE IF NOT EXISTS dbMyPet;
use dbMyPet;

--------------------TABLAS CATALOGO------------------------------
CREATE TABLE IF NOT EXISTS ctg_tipovacunas(
    id_tipovacuna INT PRIMARY KEY AUTO_INCREMENT,
    nombrevacuna VARCHAR(255),
    estado VARCHAR(1),
    usuario_creacion VARCHAR(255),
    fecha_creacion datetime,
    usuario_update VARCHAR(255),
    fecha_update datetime 
);
CREATE TABLE IF NOT EXISTS ctg_tipomascotas(
    id_tipomascota INT PRIMARY KEY AUTO_INCREMENT,
    tipomascota VARCHAR(255),
    estado VARCHAR(1),
    usuario_creacion VARCHAR(255),
    fecha_creacion datetime,
    usuario_update VARCHAR(255),
    fecha_update datetime 
);
CREATE TABLE IF NOT EXISTS ctg_departamentos(
    id_departamento INT PRIMARY KEY AUTO_INCREMENT,
    departamento VARCHAR(255),
    estado VARCHAR(1),
    usuario_creacion VARCHAR(255),
    fecha_creacion datetime,
    usuario_update VARCHAR(255),
    fecha_update datetime  
);
CREATE TABLE IF NOT EXISTS ctg_municipios(
    id_municipio INT PRIMARY KEY AUTO_INCREMENT,
    id_departamento INT,
    municipio VARCHAR(255),
    estado VARCHAR(1),
    usuario_creacion VARCHAR(255),
    fecha_creacion datetime,
    usuario_update VARCHAR(255),
    fecha_update datetime 
);

--------------------TABLAS DINAMICAS-----------------------------
CREATE TABLE IF NOT EXISTS prc_mascota(
    id_mascota INT PRIMARY KEY AUTOINCREMENT,
    id_tipomascota INT,
    id_municipio INT,---ESTE TRAE EL ID DEL DEPARTAMENTO
    id_usuario INT,--IDENTIFICADOR DEL ENCARGADO
    residencia VARCHAR(255), 
    estado_residencia VARCHAR(1),
    nombremascota VARCHAR(255),
    codigo INT,
    foto LONGTEXT,
    /*mailcontacto VARCHAR(255),
    telcontacto VARCHAR(255),*/
    estado VARCHAR(1),
    usuario_creacion VARCHAR(255),
    fecha_creacion datetime,
    usuario_update VARCHAR(255),
    fecha_update datetime 
);
CREATE TABLE IF NOT EXISTS prc_vacunas(
    id_vacunas INT PRIMARY KEY AUTOINCREMENT,
    id_mascota INT,
    id_tipovacuna INT,
    estado VARCHAR(1),
    usuario_creacion VARCHAR(255),
    fecha_creacion datetime,
    usuario_update VARCHAR(255),
    fecha_update datetime 
);

--------------------TABLAS SEGURIDAD-----------------------------
CREATE TABLE IF NOT EXISTS sec_menu(
    id_menu INT PRIMARY KEY AUTO_INCREMENT,
    nombremenu VARCHAR(255),
    estado VARCHAR(1),
    usuario_creacion VARCHAR(255),
    fecha_creacion datetime,
    usuario_update VARCHAR(255),
    fecha_update datetime 
);
CREATE TABLE IF NOT EXISTS sec_opciones(
    id_opc INT PRIMARY KEY AUTOINCREMENT,
    desc_opc VARCHAR(255),---Descripcion
    estado VARCHAR(1),
    usuario_creacion VARCHAR(255),
    fecha_creacion datetime,
    usuario_update VARCHAR(255),
    fecha_update datetime 
);
CREATE TABLE IF NOT EXISTS sec_usuarios(
    id_usuario INT PRIMARY KEY AUTOINCREMENT,
    mail varchar(255),
    telefono varchar(255),
    clave varchar(255),
    pin varchar(255),
    estado VARCHAR(1),
    usuario_creacion VARCHAR(255),
    fecha_creacion datetime,
    usuario_update VARCHAR(255),
    fecha_update datetime 
);
CREATE TABLE IF NOT EXISTS sec_roles(
    id_rol INT PRIMARY KEY AUTOINCREMENT,
    desc_rol VARCHAR(255),--Descripcion
    estado VARCHAR(1),
    usuario_creacion VARCHAR(255),
    fecha_creacion datetime,
    usuario_update VARCHAR(255),
    fecha_update datetime 
);
CREATE TABLE IF NOT EXISTS sec_opciones_roles(
    id_opc_rol INT PRIMARY KEY AUTOINCREMENT,
    id_opc INT,
    id_rol INT,
    estado VARCHAR(1),
    usuario_creacion VARCHAR(255),
    fecha_creacion datetime,
    usuario_update VARCHAR(255),
    fecha_update datetime 
);
CREATE TABLE IF NOT EXISTS sec_roles_usuarios(
    id_rol_us INT PRIMARY KEY AUTOINCREMENT,
    id_rol INT,
    id_usuario INT,
    estado VARCHAR(1),
    usuario_creacion VARCHAR(255),
    fecha_creacion datetime,
    usuario_update VARCHAR(255),
    fecha_update datetime 
);

-------------LAVES FORANEAS-------------------


-------------MUNICIPIO -------------------
ALTER TABLE ctg_municipios
ADD CONSTRAINT fk_municipios_dep-- DEPARTAMENTO A MUNICIPIO
FOREIGN KEY (id_departamento) REFERENCES ctg_departamentos(id_departamento);

-------------MASCOTAS -------------------
ALTER TABLE prc_mascotas
ADD CONSTRAINT fk_mascotas_us--USUARIO A MASCOTA
FOREIGN KEY (id_usuario) REFERENCES sec_usuarios(id_usuario),
ADD CONSTRAINT fk_mascotas_munic--MUNICIPIO A MASCOTA
FOREIGN KEY (id_municipio) REFERENCES ctg_municipios(id_municipio),
ADD CONSTRAINT fk_mascotas_tpm--TIPO MASCOTA A MASCOTA
FOREIGN KEY (id_tipomascota) REFERENCES ctg_tipomascotas(id_tipomascota);

------------- VACUNAS -------------------
ALTER TABLE prc_vacunas
ADD CONSTRAINT fk_mascota_vac--TRAER MASCOTA
FOREIGN KEY (id_mascota) REFERENCES prc_mascotas(id_mascota),
ADD CONSTRAINT fk_tipovac_vac--TRAER TIPO VACUNA
FOREIGN KEY (id_tipovacuna) REFERENCES ctg_tipovacunas(id_tipovacuna);

-------------OPCIONES ROLES-------------------
ALTER TABLE sec_opciones_roles
ADD CONSTRAINT fk_opc_opc--TRAER OPCION
FOREIGN KEY (id_opc) REFERENCES sec_opciones(id_opc),
ADD CONSTRAINT fk_rol_rol--TRAER ROL
FOREIGN KEY (id_rol) REFERENCES sec_roles(id_rol);

-------------ROLES USUARIOS-------------------
ALTER TABLE sec_roles_usuarios
ADD CONSTRAINT fk_rol_usuario_rol--TRAER ROL
FOREIGN KEY (id_rol) REFERENCES sec_roles(id_rol),
ADD CONSTRAINT fk_rol_usuario_usuario--TRAER USUARIO
FOREIGN KEY (id_usuario) REFERENCES sec_usuarios(id_usuario);