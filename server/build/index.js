"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const pacientesRoutes_1 = __importDefault(require("./routes/pacientesRoutes"));
const obrasSocialesRoutes_1 = __importDefault(require("./routes/obrasSocialesRoutes"));
const profesionalesRoutes_1 = __importDefault(require("./routes/profesionalesRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const localidadesRoutes_1 = __importDefault(require("./routes/localidadesRoutes"));
const rolesRoutes_1 = __importDefault(require("./routes/rolesRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        dotenv_1.default.config();
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/pacientes', pacientesRoutes_1.default);
        this.app.use('/api/obrasocial', obrasSocialesRoutes_1.default);
        this.app.use('/api/profesionales', profesionalesRoutes_1.default);
        this.app.use('/api/users', usersRoutes_1.default);
        this.app.use('/api/localidades', localidadesRoutes_1.default);
        this.app.use('/api/roles', rolesRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
