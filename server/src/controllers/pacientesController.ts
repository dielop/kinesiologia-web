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
            console.log(JSON.stringify(paciente))
            //return res.json(JSON.stringify(paciente));
            if(Array.isArray(paciente[0])) return res.json(paciente[0][0]);
        }
        res.status(404).json({text: 'El paciente no existe'});
    }

    public async create (req: Request, res: Response): Promise<void> {
        console.log(req.body);
        const [existeDNI] = await Mysql.query('SELECT * FROM pacintes WHERE dni = ?', [req.body.dni]);
        if ( Array.isArray(existeDNI) && existeDNI.length == 0) { 
            try{
                await Mysql.query('INSERT INTO pacientes set ?', [req.body]);
                res.json({message: 'Paciente creado'});
            }catch(error){
                console.log("Error al crear paciente: " + error);
            }
        } else {
            res.status(404).json({text: 'Ya existe un paciente con el DNI ingresado'});
        }
    }

    public async update (req: Request, res: Response) {
        console.log(req.body);
        const [existeDNI] = await Mysql.query('SELECT * FROM pacintes WHERE dni = ?', [req.body.dni]);
        if ( Array.isArray(existeDNI) && existeDNI.length == 0) {
            try{
                const { id } = req.params;
                await Mysql.query('UPDATE pacientes set ? WHERE id = ?', [req.body, id]);
                res.json({mesage: 'El paciente ha sido actualizado' });
            }catch(error){
                console.log("Error al actualizar el paciente: " + error);
            }
        } else {
            res.status(404).json({text: 'Ya existe un paciente con el DNI ingresado'});
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