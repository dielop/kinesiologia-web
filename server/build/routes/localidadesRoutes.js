"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const localidadesController_1 = __importDefault(require("../controllers/localidadesController"));
class LocalidadesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', localidadesController_1.default.listLocalidades);
        this.router.get('/:id', localidadesController_1.default.getOneLocalidad);
        this.router.post('/', localidadesController_1.default.createLocalidad);
        this.router.delete('/:id', localidadesController_1.default.deleteLocalidades);
        this.router.put('/:id', localidadesController_1.default.updateLocalidad);
    }
}
const localidadesRoutes = new LocalidadesRoutes();
exports.default = localidadesRoutes.router;
