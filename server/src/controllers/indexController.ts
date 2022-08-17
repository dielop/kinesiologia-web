import {Request, Response} from 'express';

class IndexController {

    index(req: Request, res: Response) {
        res.json({text: 'Api is /api/pacientes'})
    }

}
// Exporto la clase
export const indexController = new IndexController();