"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = __importDefault(require("../controllers/usersController"));
class UsersRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    // Rutas del componente usuario
    config() {
        this.router.get('/', usersController_1.default.getUsers);
        this.router.post('/addUser', usersController_1.default.addUser);
        this.router.post('/login', usersController_1.default.login);
    }
}
const userRotues = new UsersRoutes();
exports.default = userRotues.router;
