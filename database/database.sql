CREATE DATABASE kinesiologia_db;

USE kinesiologia_db;

CREATE TABLE pacientes(
    id INT(11)  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dniPacientes VARCHAR(50),
    nombrePacientes VARCHAR(50),
    apellidoPacientes  VARCHAR(50),
    idLocalidades INT(11),
    direccionPacientes VARCHAR(50),
    telefonoPacientes  VARCHAR(50),
    obsPacientes TEXT,
    hisClinicaPacientes VARCHAR(50),
    idObraSocial INT(11),
    NroAfiliadoPacientes VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profesionales(
    idProfesionales INT(11)  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dniProfesionales VARCHAR(50),
    nombreProfesionales VARCHAR(50),
    apellidoProfesionales  VARCHAR(50),
    idLocalidad  VARCHAR(50),
    direccionProfesionales  VARCHAR(50),
    telefonoProfesionales  VARCHAR(50),
    especProfesionales VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE obrasocial(
    idObraSocial INT(11)  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombreObraSocial VARCHAR(50),
    planObraSocial VARCHAR(50),
    obsObraSocial TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE turnos(
    idTurnos INT(11)  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idPacientes INT(11),
    idProfesionales INT(11),
    idUsers INT(11),
    FechaTurno date,
    Hora time,
    ObsTurno TEXT
);

CREATE TABLE users(
    idUsers INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userCod VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL,
    rolesCod VARCHAR(50) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);