"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const turnosControllers_1 = __importDefault(require("../controllers/turnosControllers"));
const apicache_1 = __importDefault(require("apicache"));
let cache = apicache_1.default.middleware;
class TurnosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', cache("2 minutes"), turnosControllers_1.default.listTurns);
        this.router.get('/turnosReservados/:selected/:id', cache("2 minutes"), turnosControllers_1.default.listTurnosReserved);
        this.router.get('/turnosLibres/:selected/:id', cache("2 minutes"), turnosControllers_1.default.getTurnFreeProfesionales);
        this.router.get('/turnosKinesiologos/:selected', cache("2 minutes"), turnosControllers_1.default.listTurnosReservedKinesiologo);
        this.router.get('/:id', cache("2 minutes"), turnosControllers_1.default.getOneTurn);
        this.router.post('/', turnosControllers_1.default.createTurn);
        this.router.delete('/:id', turnosControllers_1.default.deleteTurn);
        this.router.put('/:id', turnosControllers_1.default.updateTurn);
    }
}
const turnosRoutes = new TurnosRoutes();
exports.default = turnosRoutes.router;
