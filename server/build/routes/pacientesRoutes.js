"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pacientesController_1 = __importDefault(require("../controllers/pacientesController"));
class PacientesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', pacientesController_1.default.list);
        this.router.get('/:id', pacientesController_1.default.getOne);
        this.router.post('/', pacientesController_1.default.create);
        this.router.delete('/:id', pacientesController_1.default.delete);
        this.router.put('/:id', pacientesController_1.default.update);
    }
}
const pacientesRoutes = new PacientesRoutes();
exports.default = pacientesRoutes.router;
