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
class localidadesController {
    // Listado de localidades ...
    listLocalidades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [obrasocial] = yield database_1.Mysql.execute('SELECT * FROM localidades');
                res.json(obrasocial);
            }
            catch (error) {
                console.log("Error al listar localidades: " + error);
            }
        });
    }
    // Obtencion de una localidad ...
    getOneLocalidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Recupero los datos la obra social buscada ...
            const { id } = req.params;
            const localidad = yield database_1.Mysql.execute('SELECT * FROM localidades WHERE idLocalidades = ?', [id]);
            // Retornar si hay datos ...
            if (localidad.length > 0) {
                if (Array.isArray(localidad[0]))
                    return res.json(localidad[0][0]);
            }
            res.status(404).json({ text: 'La obra social no existe' });
        });
    }
    // Alta de localidad ...
    createLocalidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Recupero localidad si existe ...
            const [existeLocalidad] = yield database_1.Mysql.query('SELECT * FROM localidades WHERE nombreLocalidades = ?', [req.body.nombreLocalidades]);
            // Validacion e insercion ...
            if (Array.isArray(existeLocalidad) && existeLocalidad.length == 0) {
                try {
                    yield database_1.Mysql.query('INSERT INTO localidades set ?', [req.body]);
                    res.json({ message: 'Localidad creada' });
                }
                catch (error) {
                    console.log("Error al crear localidad: " + error);
                }
            }
            else {
                res.status(404).json({ text: 'Ya existe una localidad con el nombre ingresado' });
            }
        });
    }
    // Modificacion de localidad ...
    updateLocalidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Recupero obra social si existe ...
            const [existeLocalidad] = yield database_1.Mysql.query('SELECT * FROM localidades WHERE nombreLocalidades = ?', [req.body.nombreLocalidades]);
            //if(Array.isArray(existeOS) && existeOS.length == 0 ){
            try {
                const { id } = req.params;
                yield database_1.Mysql.query('UPDATE localidades set ? WHERE idLocalidades = ?', [req.body, id]);
                res.json({ mesage: 'Localidad actualizada' });
            }
            catch (error) {
                console.log("Error al actualizar localidad: " + error);
            }
            // }else{
            //    res.status(404).json({text: 'Ya existe una obra social con el nombre ingresado'});
            //}
        });
    }
    // Eliminar localidades ...
    deleteLocalidades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.Mysql.query('DELETE FROM localidades WHERE idLocalidades = ?', [id]);
                res.json({ message: 'Localidad eliminada' });
            }
            catch (error) {
                console.log("Error al eliminar localidad: " + error);
            }
        });
    }
}
// Instancio la clase y exporto el objeto
const localidad = new localidadesController();
exports.default = localidad;
