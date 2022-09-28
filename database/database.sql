CREATE DATABASE kinesiologia_db;

USE kinesiologia_db;

CREATE TABLE pacientes(
    id INT(11)  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(255),
    nombre VARCHAR(255),
    apellido  VARCHAR(255),
    localidad  VARCHAR(255),
    direccion  VARCHAR(255),
    telefono  VARCHAR(255),
    observaciones TEXT,
    id_obrasocial INT(11),
    nro_afiliado VARCHAR(50),
    id_profesionales INT(11),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE pacientes;

CREATE TABLE profesionales(
    id INT(11)  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(50),
    nombre VARCHAR(50),
    apellido  VARCHAR(50),
    localidad  VARCHAR(50),
    direccion  VARCHAR(50),
    telefono  VARCHAR(50),
    especialidad VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE profesionales;

CREATE TABLE obrasocial(
    id INT(11)  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    plan VARCHAR(50),
    nro_afiliado VARCHAR(50),
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE obrasocial;

CREATE TABLE reservaTurnos(
    id INT(11)  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_pacientes INT(11),
    id_profesinales INT(11),
    id_obrasocial INT(11),
    id_turnos INT(11)
);

DESCRIBE reservaTurnos;

CREATE TABLE turnos {
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fecha VARCHAR(50),
    hora VARCHAR(50)
    consultorio VARCHAR(50),
    observacion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
}

DESCRIBE turnos;

CREATE TABLE users(
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(16) NOT NULL
    roleid VARCHAR(20) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

DESCRIBE users;