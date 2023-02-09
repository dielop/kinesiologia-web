"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class turnosControllers {
    // Listado de turnos ...
    listTurns(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [turnos] = yield database_1.Mysql.execute('SELECT * FROM turnos');
                res.json(turnos);
            }
            catch (error) {
                console.log("Error al listar los turnos: " + error);
            }
        });
    }
    // Listado de turnos reservados con datos para tabla ...
    listTurnosReserved(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const selected = req.params.selected;
            try {
                const [turnReserved] = yield database_1.Mysql.execute(`select  turnos.idTurnos,
                                                                turnos.Hora, 
                                                                turnos.FechaTurno,
                                                                turnos.turnoAsistido,
                                                                pacientes.nombrePacientes,
                                                                pacientes.apellidoPacientes,
                                                                profesionales.nombreProfesionales,
                                                                profesionales.apellidoProfesionales,
                                                                ( select obraSocial.nombreObraSocial
                                                                  from pacientes join obrasocial on
                                                                                 ( pacientes.idObraSocial = obrasocial.idObraSocial )
                                                                  where pacientes.idPacientes = turnos.idPacientes ) as nombre_obrasocial
                                                        from turnos join pacientes on
                                                                          (turnos.idPacientes = pacientes.idPacientes)
                                                                     join profesionales on
                                                                          (turnos.idProfesionales = profesionales.idProfesionales)
                                                        where turnos.FechaTurno like ? AND
                                                              turnos.idProfesionales = ?`, [selected, id]);
                res.json(turnReserved);
            }
            catch (error) {
                console.log("Error al listar los turnos: " + error);
            }
        });
    }
    // Obtener turnos libres ...
    getTurnFreeProfesionales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const selected = req.params.selected;
            const horario = ['07:45:00', '08:30:00', '09:15:00',
                '10:00:00', '10:45:00', '11:30:00',
                '12:15:00', '13:00:00', '15:00:00',
                '15:45:00', '16:30:00', "17:15:00",
                '18:00:00', '18:45:00', '19:30:00'];
            try {
                const [turnReserved] = yield database_1.Mysql.execute(`select  turnos.Hora
                                                        from turnos join pacientes on
                                                                          (turnos.idPacientes = pacientes.idPacientes)
                                                                    join profesionales on
                                                                          (turnos.idProfesionales = profesionales.idProfesionales)
                                                        where turnos.FechaTurno like ? AND
                                                              turnos.idProfesionales = ?`, [selected, id]);
                // Recupero los valores reservados en json
                const hora = JSON.stringify(turnReserved);
                const parser = JSON.parse(hora);
                // Recupero el indice del horario encontrado y lo borro del array
                for (let i = 0; i < parser.length; i++) {
                    const index = horario.indexOf(parser[i].Hora);
                    if (index != null) {
                        horario.splice(index, 1);
                    }
                }
                // Retorno el valor de horario restante
                res.json(horario);
            }
            catch (error) {
                console.log("Error al listar los horarios libres: " + error);
            }
        });
    }
    // Listado de turnos por kinesiologos ...
    listTurnosReservedKinesiologo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const selected = req.params.selected;
            try {
                const [turnReservedKinesiologo] = yield database_1.Mysql.execute(`select   turnos.idTurnos,
                                                                            turnos.Hora, 
                                                                            turnos.FechaTurno,
                                                                            turnos.turnoAsistido,
                                                                            pacientes.nombrePacientes,
                                                                            pacientes.apellidoPacientes,
                                                                            profesionales.nombreProfesionales,
                                                                            profesionales.apellidoProfesionales,
                                                                            ( select obraSocial.nombreObraSocial
                                                                            from pacientes join obrasocial on
                                                                                            ( pacientes.idObraSocial = obrasocial.idObraSocial )
                                                                            where pacientes.idPacientes = turnos.idPacientes ) as nombre_obrasocial
                                                                    from turnos join pacientes on
                                                                          (turnos.idPacientes = pacientes.idPacientes)
                                                                     join profesionales on
                                                                          (turnos.idProfesionales = profesionales.idProfesionales)
                                                        where turnos.FechaTurno like ? AND
                                                              profesionales.especProfesionales like 'Kinesiologo'`, [selected]);
                res.json(turnReservedKinesiologo);
            }
            catch (error) {
                console.log("Error al listar los turnos: " + error);
            }
        });
    }
    // Obtencion de un turno ...
    getOneTurn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Recupero los datos del turno buscado ...
            const { id } = req.params;
            const turno = yield database_1.Mysql.execute('SELECT * FROM turnos WHERE idTurnos = ?', [id]);
            // Retornar si hay datos ...
            if (turno.length > 0) {
                if (Array.isArray(turno[0]))
                    return res.json(turno[0][0]);
            }
            res.status(404).json({ text: 'El turno no existe' });
        });
    }
    // Creacion de nuevo turno ...
    createTurn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.Mysql.query('INSERT INTO turnos set ?', [req.body]);
                res.json({ message: 'Turno nuevo asignado' });
            }
            catch (error) {
                console.log("Error al asignar turno: " + error);
            }
        });
    }
    // Modificacion de turnos ...
    updateTurn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Actualizo turno si aun no asistio ...
            const { id } = req.params;
            //const [existeOS] = await Mysql.query('SELECT * FROM turnos WHERE nombreTurnos = ?', [req.body.nombreTurnos]);
            //if(Array.isArray(existeTurno) && existeTurno.length == 0 ){
            try {
                yield database_1.Mysql.query('UPDATE turnos set ? WHERE idTurnos = ?', [req.body, id]);
                res.json({ mesage: 'Turno actualizado' });
            }
            catch (error) {
                console.log("Error al actualizar turno: " + error);
            }
            // }else{
            //    res.status(404).json({text: 'Ya existe un turno con el nombre ingresado'});
            //}
        });
    }
    // Dar de baja un turno...
    deleteTurn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            try {
                const { id } = req.params;
                yield database_1.Mysql.query('DELETE FROM turnos WHERE idTurnos = ?', [id]);
                res.json({ message: 'Turno cancelado' });
            }
            catch (error) {
                console.log("Error al cancelar turno: " + error);
            }
        });
    }
}
const TurnosControllers = new turnosControllers();
exports.default = TurnosControllers;
