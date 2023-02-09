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
class PacientesController {
    // Listado de pacientes ...
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [pacientes] = yield database_1.Mysql.execute('SELECT * FROM pacientes');
                res.json(pacientes);
            }
            catch (error) {
                console.log("Error al listar pacientes: " + error);
            }
        });
    }
    // Obtencion de un paciente ... 
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Recupero los datos del paciente buscado ...
            const { dni } = req.params;
            const paciente = yield database_1.Mysql.execute('SELECT * FROM pacientes WHERE dniPacientes = ?', [dni]);
            // Retornar si hay datos ...
            if (paciente.length > 0) {
                try {
                    console.log(JSON.stringify(paciente));
                    //return res.json(JSON.stringify(paciente));
                    if (Array.isArray(paciente[0]))
                        return res.json(paciente[0][0]);
                }
                catch (error) {
                    //res.status(404).send({text: 'El paciente no existe'});
                    res.status(404).json({ text: 'El paciente no existe' });
                }
            }
            else {
                res.status(404).json({ text: 'El paciente no existe' });
            }
        });
    }
    // Insercion de pacientes ... 
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validaciones e inserciones ...
            const [existeDNI] = yield database_1.Mysql.query('SELECT * FROM pacientes WHERE dniPacientes = ?', [req.body.dniPacientes]);
            if (Array.isArray(existeDNI) && existeDNI.length == 0) {
                try {
                    yield database_1.Mysql.query('INSERT INTO pacientes set ?', [req.body]);
                    res.json({ message: 'Paciente creado' });
                }
                catch (error) {
                    console.log("Error al crear paciente: " + error);
                }
            }
            else {
                res.status(404).json({ text: 'Ya existe un paciente con el DNI ingresado' });
            }
        });
    }
    // Modificacion de pacientes ...
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validaciones e inserciones ...
            //const { id } = req.params;
            //const existeId = await Mysql.execute('SELECT * FROM pacientes WHERE id = ?', [id]);
            //const existeId = await Mysql.query('SELECT * FROM pacientes WHERE id = ?', [req.body.id]);
            const [existeDNI] = yield database_1.Mysql.query('SELECT * FROM pacientes WHERE dniPacientes = ?', [req.body.dniPacientes]);
            //if ( Array.isArray(existeDNI) && existeDNI.length == 0 ||  ) {
            try {
                const { id } = req.params;
                yield database_1.Mysql.query('UPDATE pacientes set ? WHERE idPacientes = ?', [req.body, id]);
                res.json({ message: 'El paciente ha sido actualizado' });
            }
            catch (error) {
                console.log("Error al actualizar el paciente: " + error);
            }
            //} else {
            // res.status(404).json({text: 'Ya existe un paciente con el DNI ingresado'});
            //}
        });
    }
    // Eliminar pacientes ...
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.Mysql.query('DELETE FROM pacientes WHERE idPacientes = ?', [id]);
                res.json({ message: 'El paciente fue eliminado' });
            }
            catch (error) {
                console.log("Error al eliminar el paciente: " + error);
            }
        });
    }
}
// Instancio la clase y exporto el objeto ...
const pacientesController = new PacientesController();
exports.default = pacientesController;
