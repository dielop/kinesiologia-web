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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UsersController {
    // Obtengo los usuarios registrados
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [users] = yield database_1.Mysql.query('SELECT * FROM users');
            if (Array.isArray(users) && users.length > 0) {
                res.json(users);
            }
            else {
                //Password incorrecto
                res.status(404).json({ text: 'No existe el usuario' });
            }
        });
    }
    // Registro de usuarios
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, roleId } = req.body;
            const hashedPassword = yield bcrypt_1.default.hash(password, 10); // hasheo el password para encriptar
            try {
                database_1.Mysql.query('INSERT INTO users set ?', { username: username, password: hashedPassword, roleId: roleId });
                res.json({
                    msg: 'Usuario creado con exito',
                });
            }
            catch (error) {
                //Password incorrecto
                res.status(404).json({ text: 'No se pudo crear el usuario' });
            }
        });
    }
    // Logueo de usuarios 
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Recupero usuario y contrasenia
            const { username, password } = req.body;
            // Verificacion de usuario       
            const [login] = yield database_1.Mysql.execute('SELECT * FROM users WHERE username=?', [username]);
            const loginResult = JSON.stringify(login);
            if (loginResult == '[]') {
                //No existe el usuario en la base de datos
                res.status(404).json({ text: 'No existe el usuario en la base de datos' });
            }
            else {
                //Existe el usuario en la base de datos entonces lo tengo que parsear para recuperar valor
                const parser = JSON.parse(loginResult);
                const userPassword = parser[0].password;
                //Comparamos password
                bcrypt_1.default.compare(password, userPassword).then((result) => {
                    if (result) {
                        //Login exitoso -> generamos el token
                        console.log(username);
                        const role = parser[0].roleId;
                        console.log(role);
                        const token = jsonwebtoken_1.default.sign({
                            username: username,
                            roleId: role
                        }, process.env.SECRET_KEY || '123456');
                        res.json({
                            token
                        });
                    }
                    else {
                        //Password incorrecto
                        res.status(404).json({ text: 'Contraseña incorrecta' });
                    }
                });
            }
        });
    }
}
// Instancio la clase y exporto el objeto
const usersController = new UsersController();
exports.default = usersController;
