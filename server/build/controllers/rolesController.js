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
class RolesControllers {
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
    // Obtencion de un paciente ... 
    getOneRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Recupero los datos del rol buscado ...
            const { id } = req.params;
            const rol = yield database_1.Mysql.execute('SELECT * FROM roles WHERE idRoles = ?', [id]);
            // Retornar si hay datos ...
            if (rol.length > 0) {
                console.log(JSON.stringify(rol));
                if (Array.isArray(rol[0]))
                    return res.json(rol[0][0]);
            }
            res.status(404).json({ text: 'El rol no existe' });
        });
    }
    addRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Insercion de rol ...
            try {
                yield database_1.Mysql.query('INSERT INTO roles set ? ', [req.body]);
                res.json({ message: 'Nuevo rol creado' });
            }
            catch (error) {
                res.status(404).json({ text: 'Error al crear nuevo Rol' });
            }
        });
    }
    updateRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Recupero rol si existe ...
            const [existeRol] = yield database_1.Mysql.query('SELECT * FROM roles WHERE nombreRoles = ?', [req.body.nombreRoles]);
            //if(Array.isArray(existeOS) && existeOS.length == 0 ){
            try {
                const { id } = req.params;
                yield database_1.Mysql.query('UPDATE roles set ? WHERE idRoles = ?', [req.body, id]);
                res.json({ message: 'Rol actualizado' });
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
                yield database_1.Mysql.query('DELETE FROM roles WHERE idRoles = ?', [id]);
                res.json({ message: 'Rol eliminado' });
            }
            catch (error) {
                console.log("Error al eliminar el Rol seleccionado: " + error);
            }
        });
    }
}
// Instancio la clase y exporto el objeto
const rolesControllers = new RolesControllers();
exports.default = rolesControllers;
