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
    // Obtencion de un turno ...
    getOneTurn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Recupero los datos del turno buscado ...
            const { id } = req.params;
            const turno = yield database_1.Mysql.execute('SELECT * FROM turnos WHERE id = ?', [id]);
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
            // Recupero obra social si existe ...
            const [existeTurno] = yield database_1.Mysql.query('SELECT * FROM turnos WHERE nombre = ?', [req.body.nombre]);
            // Validacion e insercion ...
            if (Array.isArray(existeTurno) && existeTurno.length == 0) {
                try {
                    yield database_1.Mysql.query('INSERT INTO turnos set ?', [req.body]);
                    res.json({ message: 'Turno nuevo asignado' });
                }
                catch (error) {
                    console.log("Error al asignar turno: " + error);
                }
            }
            else {
                res.status(404).json({ text: 'Ya existe un turno con el horario ingresado' });
            }
        });
    }
    // Modificacion de turnos ...
    updateTurn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Recupero obra social si existe ...
            const [existeOS] = yield database_1.Mysql.query('SELECT * FROM turnos WHERE nombre = ?', [req.body.nombre]);
            //if(Array.isArray(existeTurno) && existeTurno.length == 0 ){
            try {
                const { id } = req.params;
                yield database_1.Mysql.query('UPDATE turnos set ? WHERE id = ?', [req.body, id]);
                res.json({ mesage: 'Turno actualizad' });
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
            try {
                const { id } = req.params;
                yield database_1.Mysql.query('DELETE FROM turnos WHERE id = ?', [id]);
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