import express, { Application } from 'express';
import morgan  from 'morgan';
import cors  from 'cors';
import indexRoutes  from './routes/indexRoutes';
import pacientesRoutes  from './routes/pacientesRoutes';
import obrasSocialesRoutes from './routes/obrasSocialesRoutes';
import profesionalesRoutes from './routes/profesionalesRoutes';

class Server {

    public app:Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}))
    }

    routes(): void{
        this.app.use('/', indexRoutes);
        this.app.use('/api/pacientes', pacientesRoutes);
        this.app.use('/api/obrasocial', obrasSocialesRoutes);
        this.app.use('/api/profesionales', profesionalesRoutes);
    }

    start(): void{
        this.app.listen(this.app.get('port'), () => {
        console.log('Server on port', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();