import {Request, Response} from 'express';
import { Mysql } from '../database'

class PacientesController {

    public async list(req: Request, res: Response): Promise<any> {
        try {
            const [pacientes] = await Mysql.execute('SELECT * FROM pacientes');
            res.json(pacientes);
        }catch(error){
            console.log("Error al listar pacientes: " + error);
        }
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const paciente = await Mysql.execute('SELECT * FROM pacientes WHERE id = ?', [id]);
        if(paciente.length > 0){
            return res.json(paciente[0]);
        }
        res.status(404).json({text: 'El paciente no existe'});
    }

    public async create (req: Request, res: Response): Promise<void> {
        try{
            await Mysql.query('INSERT INTO pacientes set ?', [req.body]);
            res.json({message: 'Paciente creado'});
        }catch(error){
            console.log("Error al crear paciente: " + error);
        }
    }

    public async update (req: Request, res: Response) {
        try{
            const { id } = req.params;
            await Mysql.query('UPDATE pacientes set ? WHERE id = ?', [req.body, id]);
            res.json({mesage: 'El paciente ha sido actualizado' });
        }catch(error){
            console.log("Error al actualizar el paciente: " + error);
        }
    }

    public async delete (req: Request, res: Response): Promise<void> {
        try{
            const { id } = req.params;
            await Mysql.query('DELETE FROM pacientes WHERE id = ?', [id]);
            res.json({message:'El paciente fue eliminado'});
        }catch(error){
            console.log("Error al eliminar el paciente: " + error);
        }
    }

}
// Instancio la clase y exporto el objeto
const pacientesController = new PacientesController();
export default pacientesController;