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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE pacientes;