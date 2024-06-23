import { Trabajador } from "./trabajador";

export class Solicitud {
    id: number = 0;
    nombre: String = "";
    descripcion: String = "";
    estado: Boolean;
    ubicacion: String = "";
    trabajador: Trabajador
}