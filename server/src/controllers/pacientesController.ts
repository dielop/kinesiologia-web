import {Request, Response} from 'express';
import { Mysql } from '../database'

class PacientesController {

    // Listado de pacientes ...

    public async list(req: Request, res: Response): Promise<any> {
        try {
            const [pacientes] = await Mysql.execute('SELECT * FROM pacientes');
            res.json(pacientes);
        }catch(error){
            console.log("Error al listar pacientes: " + error);
        }
    }

    // Obtencion de un paciente ... 

    public async getOne(req: Request, res: Response): Promise<any>{

        // Recupero los datos del paciente buscado ...

        const { dni } = req.params;
        const paciente = await Mysql.execute('SELECT * FROM pacientes WHERE dniPacientes = ?', [dni]);

        // Retornar si hay datos ...
        if(paciente.length > 0){
            console.log(JSON.stringify(paciente))
            //return res.json(JSON.stringify(paciente));
            if(Array.isArray(paciente[0])) return res.json(paciente[0][0]);
        }
        res.status(404).json({text: 'El paciente no existe'});
    }

    // Insercion de pacientes ... 

    public async create (req: Request, res: Response): Promise<void> {
        
        // Validaciones e inserciones ...
        const [existeDNI] = await Mysql.query('SELECT * FROM pacientes WHERE dniPacientes = ?', [req.body.dniPacientes]);

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

    // Modificacion de pacientes ...

    public async update (req: Request, res: Response) {

        // Validaciones e inserciones ...
        //const { id } = req.params;
        //const existeId = await Mysql.execute('SELECT * FROM pacientes WHERE id = ?', [id]);
        //const existeId = await Mysql.query('SELECT * FROM pacientes WHERE id = ?', [req.body.id]);
        const [existeDNI] = await Mysql.query('SELECT * FROM pacientes WHERE dniPacientes = ?', [req.body.dniPacientes]);
        
        //if ( Array.isArray(existeDNI) && existeDNI.length == 0 ||  ) {
            try{
                const { id } = req.params;
                await Mysql.query('UPDATE pacientes set ? WHERE idPacientes = ?', [req.body, id]);
                res.json({message: 'El paciente ha sido actualizado' });
            }catch(error){
                console.log("Error al actualizar el paciente: " + error);
            }
        //} else {
           // res.status(404).json({text: 'Ya existe un paciente con el DNI ingresado'});
        //}
    }

    // Eliminar pacientes ...

    public async delete (req: Request, res: Response): Promise<void> {
        try{
            const { id } = req.params;
            await Mysql.query('DELETE FROM pacientes WHERE idPacientes = ?', [id]);
            res.json({message:'El paciente fue eliminado'});
        }catch(error){
            console.log("Error al eliminar el paciente: " + error);
        }
    }

}
// Instancio la clase y exporto el objeto ...
const pacientesController = new PacientesController();
export default pacientesController;