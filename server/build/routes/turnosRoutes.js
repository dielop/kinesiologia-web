"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const turnosControllers_1 = __importDefault(require("../controllers/turnosControllers"));
class TurnosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', turnosControllers_1.default.listTurns);
        this.router.get('/:id', turnosControllers_1.default.getOneTurn);
        this.router.post('/', turnosControllers_1.default.createTurn);
        this.router.delete('/:id', turnosControllers_1.default.deleteTurn);
        this.router.put('/:id', turnosControllers_1.default.updateTurn);
    }
}
const turnosRoutes = new TurnosRoutes();
exports.default = turnosRoutes.router;
