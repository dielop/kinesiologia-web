import { Response, Request } from "express";
import { Mysql } from "../database";

class turnosControllers {

    // Listado de turnos ...

    public async listTurns(req: Request, res: Response): Promise<any> {
        try {
            const [turnos] = await Mysql.execute('SELECT * FROM turnos');
            res.json(turnos);
        }catch(error){
            console.log("Error al listar los turnos: " + error);
        }
    }

    // Listado de turnos reservados con datos para tabla ... 
    public async listTurnosReserved(req: Request, res: Response): Promise<any>{
        const { dateSelected } = req.params;
        try {
            const [turnReserved] = await Mysql.execute(`select  turnos.Hora, 
                                                                turnos.FechaTurno,
                                                                pacientes.nombrePacientes,
                                                                pacientes.apellidoPacientes,
                                                                profesionales.nombreProfesionales,
                                                                profesionales.apellidoProfesionales,
                                                                ( select obraSocial.nombreObraSocial
                                                                  from pacientes join obrasocial on
                                                                                 ( pacientes.idObraSocial = obrasocial.idObraSocial )
                                                                  where pacientes.idPacientes = turnos.idPacientes ) as nombre_obrasocial
                                                        from turnos join pacientes on
                                                                          (turnos.idPacientes = pacientes.idPacientes)
                                                                     join profesionales on
                                                                          (turnos.idProfesionales = profesionales.idProfesionales)
                                                        where turnos.FechaTurno like ?`, [dateSelected]
                                                        );
            res.json(turnReserved)
        }catch(error){
            console.log("Error al listar los turnos: " + error);
        }
    }

    // Obtencion de un turno ...

    public async getOneTurn(req: Request, res: Response): Promise<any>{

        // Recupero los datos del turno buscado ...
        const { id } = req.params;
        const turno = await Mysql.execute('SELECT * FROM turnos WHERE idTurnos = ?', [id]);

        // Retornar si hay datos ...
        if(turno.length > 0){
            if(Array.isArray(turno[0])) return res.json(turno[0][0]);
        }
        res.status(404).json({text: 'El turno no existe'});
    }

    // Creacion de nuevo turno ...

    public async createTurn(req: Request, res: Response): Promise<void> {
        // Recupero obra social si existe ...
        const [existeTurno] = await Mysql.query('SELECT * FROM turnos WHERE nombreTurnos = ?', [req.body.nombreTurnos]);

        // Validacion e insercion ...
        if (Array.isArray(existeTurno) && existeTurno.length == 0 ){
            try{
                await Mysql.query('INSERT INTO turnos set ?', [req.body]);
                res.json({message: 'Turno nuevo asignado'});
            }catch(error){
                console.log("Error al asignar turno: " + error);
            }
        }else{
            res.status(404).json({text: 'Ya existe un turno con el horario ingresado'});
        }
    }

    // Modificacion de turnos ...

    public async updateTurn (req: Request, res: Response) {
        // Recupero obra social si existe ...
        const [existeOS] = await Mysql.query('SELECT * FROM turnos WHERE nombreTurnos = ?', [req.body.nombreTurnos]);
        
        //if(Array.isArray(existeTurno) && existeTurno.length == 0 ){
            try{
                const { id } = req.params;
                await Mysql.query('UPDATE turnos set ? WHERE idTurnos = ?', [req.body, id]);
                res.json({mesage: 'Turno actualizado' });
            }catch(error){
                console.log("Error al actualizar turno: " + error);
            }
    // }else{
        //    res.status(404).json({text: 'Ya existe un turno con el nombre ingresado'});
        //}
    }

    // Dar de baja un turno...

    public async deleteTurn (req: Request, res: Response): Promise<void> {
        try{
            const { id } = req.params;
            await Mysql.query('DELETE FROM turnos WHERE idTurnos = ?', [id]);
            res.json({message:'Turno cancelado'});
        }catch(error){
            console.log("Error al cancelar turno: " + error);
        }
    }
}

const TurnosControllers = new turnosControllers();
export default TurnosControllers;
