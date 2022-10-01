"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rolesController_1 = __importDefault(require("../controllers/rolesController"));
class RolesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', rolesController_1.default.addRole);
        this.router.get('/', rolesController_1.default.listRole);
        this.router.delete('/:id', rolesController_1.default.deleteRole);
        this.router.put('/:id', rolesController_1.default.updateRole);
    }
}
const rolesRoutes = new RolesRoutes();
exports.default = RolesRoutes;
