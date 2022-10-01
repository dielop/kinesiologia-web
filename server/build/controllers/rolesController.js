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
class rolesControllers {
    listRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [roles] = yield database_1.Mysql.execute('SELECT * FROM roles');
                res.json(roles);
            }
            catch (error) {
                console.log("Error al listar los roles de usuario: " + error);
            }
        });
    }
    addRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Insercion de rol ...
            try {
                yield database_1.Mysql.query('INSERT INTO roles ? ', [req.body]);
                res.json({ message: 'Nuevo rol creado' });
            }
            catch (error) {
                res.status(404).json({ text: 'Error al crear nuevo Rol' });
            }
        });
    }
    updateRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Recupero obra social si existe ...
            const [existeRol] = yield database_1.Mysql.query('SELECT * FROM roles WHERE nombre = ?', [req.body.nombre]);
            //if(Array.isArray(existeOS) && existeOS.length == 0 ){
            try {
                const { id } = req.params;
                yield database_1.Mysql.query('UPDATE roles set ? WHERE id = ?', [req.body, id]);
                res.json({ mesage: 'Rol actualizado' });
            }
            catch (error) {
                console.log("Error al actualizar el rol: " + error);
            }
        });
    }
    deleteRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.Mysql.query('DELETE FROM roles WHERE id = ?', [id]);
                res.json({ message: 'Rol eliminado' });
            }
            catch (error) {
                console.log("Error al eliminar el Rol seleccionado: " + error);
            }
        });
    }
}
// Instancio la clase y exporto el objeto
const RolesControllers = new rolesControllers();
exports.default = RolesControllers;
