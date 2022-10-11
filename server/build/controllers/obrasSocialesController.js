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
class obrasSocialesController {
    // Listado de obras sociales ...
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [obrasocial] = yield database_1.Mysql.execute('SELECT * FROM obrasocial');
                res.json(obrasocial);
            }
            catch (error) {
                console.log("Error al listar obras sociales: " + error);
            }
        });
    }
    // Obtencion de una obra social ...
    getOneObraSocial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Recupero los datos la obra social buscada ...
            const { id } = req.params;
            const obrasocial = yield database_1.Mysql.execute('SELECT * FROM obrasocial WHERE idObraSocial = ?', [id]);
            // Retornar si hay datos ...
            if (obrasocial.length > 0) {
                if (Array.isArray(obrasocial[0]))
                    return res.json(obrasocial[0][0]);
            }
            res.status(404).json({ text: 'La obra social no existe' });
        });
    }
    // Insercion de obras sociales ...
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Recupero obra social si existe ...
            const [existeOS] = yield database_1.Mysql.query('SELECT * FROM obrasocial WHERE nombreObraSocial = ?', [req.body.nombreObraSocial]);
            // Validacion e insercion ...
            if (Array.isArray(existeOS) && existeOS.length == 0) {
                try {
                    yield database_1.Mysql.query('INSERT INTO obrasocial set ?', [req.body]);
                    res.json({ message: 'Obra social creada' });
                }
                catch (error) {
                    console.log("Error al crear obra social: " + error);
                }
            }
            else {
                res.status(404).json({ text: 'Ya existe una obra social con el nombre ingresado' });
            }
        });
    }
    // Modificacion de obras sociales ...
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Recupero obra social si existe ...
            const [existeOS] = yield database_1.Mysql.query('SELECT * FROM obrasocial WHERE nombreObraSocial = ?', [req.body.nombreObraSocial]);
            //if(Array.isArray(existeOS) && existeOS.length == 0 ){
            try {
                const { id } = req.params;
                yield database_1.Mysql.query('UPDATE obrasocial set ? WHERE idObraSocial = ?', [req.body, id]);
                res.json({ mesage: 'Obra social actualizada' });
            }
            catch (error) {
                console.log("Error al actualizar obra social: " + error);
            }
            // }else{
            //    res.status(404).json({text: 'Ya existe una obra social con el nombre ingresado'});
            //}
        });
    }
    // Eliminar obras sociales ...
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.Mysql.query('DELETE FROM obrasocial WHERE idObraSocial = ?', [id]);
                res.json({ message: 'Obra social eliminada' });
            }
            catch (error) {
                console.log("Error al eliminar obra social: " + error);
            }
        });
    }
}
// Instancio la clase y exporto el objeto
const obrasSociales = new obrasSocialesController();
exports.default = obrasSociales;
