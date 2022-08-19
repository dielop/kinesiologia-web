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
class ProfesionalesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [profesionales] = yield database_1.Mysql.execute('SELECT * FROM profesionales');
                res.json(profesionales);
            }
            catch (error) {
                console.log("Error al listar profesionales: " + error);
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const profesionales = yield database_1.Mysql.execute('SELECT * FROM profesionales WHERE id = ?', [id]);
            if (profesionales.length > 0) {
                if (Array.isArray(profesionales[0]))
                    return res.json(profesionales[0][0]);
            }
            res.status(404).json({ text: 'El profesional no existe' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const [existeDNI] = yield database_1.Mysql.query('SELECT * FROM profesionales WHERE dni = ?', [req.body.dni]);
            if (Array.isArray(existeDNI) && existeDNI.length == 0) {
                try {
                    yield database_1.Mysql.query('INSERT INTO profesionales set ?', [req.body]);
                    res.json({ message: 'Profesional creado' });
                }
                catch (error) {
                    console.log("Error al crear profesional: " + error);
                }
            }
            else {
                res.status(404).json({ text: 'El profesional no Ya existe un profesional con el DNI ingresado' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const [existeDNI] = yield database_1.Mysql.query('SELECT * FROM profesionales WHERE dni = ?', [req.body.dni]);
            if (Array.isArray(existeDNI) && existeDNI.length == 0) {
                try {
                    const { id } = req.params;
                    yield database_1.Mysql.query('UPDATE profesionales set ? WHERE id = ?', [req.body, id]);
                    res.json({ mesage: 'El profesional ha sido actualizado' });
                }
                catch (error) {
                    console.log("Error al actualizar el profesional: " + error);
                }
            }
            else {
                res.status(404).json({ text: 'Ya existe un profesional con el DNI ingresado' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.Mysql.query('DELETE FROM profesioanles WHERE id = ?', [id]);
                res.json({ message: 'El profesional fue eliminado' });
            }
            catch (error) {
                console.log("Error al eliminar el profesional: " + error);
            }
        });
    }
}
// Instancio la clase y exporto el objeto
const profesionalesController = new ProfesionalesController();
exports.default = profesionalesController;
