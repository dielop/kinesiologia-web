import { Router } from "express";
import usersController from '../controllers/usersController';

class UsersRoutes{

    public router: Router = Router();

    constructor() {
        this.config();
    }

    // Rutas del componente usuario

    public config(): void {
        this.router.get('/', usersController.getUsers);
        this.router.post('/addUser', usersController.addUser);
        this.router.post('/login', usersController.login);
    }
}

const userRotues = new UsersRoutes();
export default userRotues.router;