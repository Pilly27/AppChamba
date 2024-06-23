import { Solicitud } from "./solicitud";

export class Pago {
    id: number = 0;
    nombre: String = "";
    descripcion: String = "";
    monto: number = 0;
    solicitud:Solicitud;
}
