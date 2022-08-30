import { Request, Response } from "express";
import { Mysql } from "../database";

class ProfesionalesController { 
    public async list(req: Request, res: Response): Promise<any> {
        try {
            const [profesionales] = await Mysql.execute('SELECT * FROM profesionales');
            res.json(profesionales);
        }catch(error){
            console.log("Error al listar profesionales: " + error);
        }
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const profesionales = await Mysql.execute('SELECT * FROM profesionales WHERE id = ?', [id]);
        if(profesionales.length > 0){
            if(Array.isArray(profesionales[0])) return res.json(profesionales[0][0]);
        }
        res.status(404).json({text: 'El profesional no existe'});
    }

    public async create (req: Request, res: Response): Promise<void> {
        console.log(req.body);
        const [existeDNI] = await Mysql.query('SELECT * FROM profesionales WHERE dni = ?', [req.body.dni]);
        if ( Array.isArray(existeDNI) && existeDNI.length == 0 ) {
                try{
                    await Mysql.query('INSERT INTO profesionales set ?', [req.body]);
                    res.json({message: 'Profesional creado'});
                }catch(error){
                    console.log("Error al crear profesional: " + error);
                }
            }else{
            res.status(404).json({text: 'El profesional no Ya existe un profesional con el DNI ingresado'});
        }  
    }

    public async update (req: Request, res: Response) {
        console.log(req.body);
        const [existeDNI] = await Mysql.query('SELECT * FROM profesionales WHERE dni = ?', [req.body.dni]);
        if ( Array.isArray(existeDNI) && existeDNI.length == 0 ) {
            try{
                const { id } = req.params;
                await Mysql.query('UPDATE profesionales set ? WHERE id = ?', [req.body, id]);
                res.json({mesage: 'El profesional ha sido actualizado' });
            }catch(error){
                console.log("Error al actualizar el profesional: " + error);
            }            
        }else{
            res.status(404).json({text: 'Ya existe un profesional con el DNI ingresado'});
        }
    }

    public async delete (req: Request, res: Response): Promise<void> {
        try{
            const { id } = req.params;
            await Mysql.query('DELETE FROM profesionales WHERE id = ?', [id]);
            res.json({message:'El profesional fue eliminado'});
        }catch(error){
            console.log("Error al eliminar el profesional: " + error);
        }
    }

}

// Instancio la clase y exporto el objeto
const profesionalesController = new ProfesionalesController();
export default profesionalesController;