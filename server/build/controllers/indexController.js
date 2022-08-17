"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    index(req, res) {
        res.json({ text: 'Api is /api/pacientes' });
    }
}
// Exporto la clase
exports.indexController = new IndexController();
