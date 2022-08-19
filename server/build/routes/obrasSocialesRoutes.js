"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const obrasSocialesController_1 = __importDefault(require("../controllers/obrasSocialesController"));
class ObrasSocialesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', obrasSocialesController_1.default.list);
        this.router.get('/:id', obrasSocialesController_1.default.getOneObraSocial);
        this.router.post('/', obrasSocialesController_1.default.create);
        this.router.delete('/:id', obrasSocialesController_1.default.delete);
        this.router.put('/:id', obrasSocialesController_1.default.update);
    }
}
const obrasSocialesRoutes = new ObrasSocialesRoutes();
exports.default = obrasSocialesRoutes.router;
