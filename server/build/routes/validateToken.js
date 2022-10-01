"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        // Si existe token lo corto luego del bearer y verifico si es valido
        const bearerToken = headerToken.slice(7);
        try {
            const tokenValido = jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || '123456');
            next();
        }
        catch (error) {
            //Retorno error si expiro o no es valido
            res.status(400).json({
                error: 'Token no valido'
            });
        }
    }
    else {
        //Retorno si no es valido o no tiene acceso
        res.status(400).json({
            error: 'Acceso denegado'
        });
    }
};
exports.default = validateToken;