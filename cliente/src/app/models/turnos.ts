import { Time } from "@angular/common";

export interface turnos {
    idTurnos?: Number;
    idPacientes: Number;
    idProfesionales: Number;
    idUsers: Number;
    fechaTurno: String;
    hora: String;
    obsTurno: String;
}