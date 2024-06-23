import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OficioComponent } from './component/oficio/oficio.component';
import { CreateEditOficioComponent } from './component/oficio/create-edit-oficio/create-edit-oficio.component';
import { ClienteComponent } from './component/cliente/cliente.component';
import { ClienteListarComponent } from './component/cliente/cliente-listar/cliente-listar.component';
import { PagoComponent } from './component/pago/pago.component';
import { CreateEditPagoComponent } from './component/pago/create-edit-pago/create-edit-pago.component';
import { SolicitudComponent } from './component/solicitud/solicitud.component';
import { CreateEditSolicitudComponent } from './component/solicitud/create-edit-solicitud/create-edit-solicitud.component';
import { TrabajadorComponent } from './component/trabajador/trabajador.component';
import { CreateEditTrabajadorComponent } from './component/trabajador/create-edit-trabajador/create-edit-trabajador.component';
import { TrabadorListarComponent } from './component/trabajador/trabador-listar/trabador-listar.component';
import { CreateEditClienteComponent } from './component/cliente/create-edit-cliente/create-edit-cliente.component';
import path from 'path';
import { OficioListarComponent } from './component/oficio/oficio-listar/oficio-listar.component';
import { SolicitudListarComponent } from './component/solicitud/solicitud-listar/solicitud-listar.component';
import { PagoListarComponent } from './component/pago/pago-listar/pago-listar.component';

const routes: Routes = [
  {
    path: 'clientes',
    component: ClienteComponent,
    children: [
      {
        path: 'listar',
        component: ClienteListarComponent,
      },
      {
        path: 'nuevo',
        component: CreateEditClienteComponent,
      },
      {
        path: 'editar/:id', 
        component:CreateEditClienteComponent
      }
    ],
  }, 
  {
    path: 'oficios', component:OficioComponent, children: [
      {
        path: 'listar', component:OficioListarComponent
      },
      {
        path: 'nuevo', component:CreateEditOficioComponent
      },
      {
        path: 'editar/:id', component:CreateEditOficioComponent
      }
    ]
  },
  {
    path: 'pagos', component: PagoComponent, children: [
      {
        path: 'listar', component:PagoListarComponent
      },
      {
        path: 'nuevo', component:CreateEditPagoComponent
      },
      {
        path: 'editar/:id', component:CreateEditPagoComponent
      }
    ]
  },
  {
    path: 'solicitudes', component: SolicitudComponent, children: [
      {
        path: 'listar', component:SolicitudListarComponent
      },
      {
        path: 'nuevo', component:CreateEditSolicitudComponent
      },
      {
        path: 'editar/:id', component:CreateEditSolicitudComponent
      }
    ]
  },
  {
    path: 'trabajadores', component: TrabajadorComponent, children: [
      {
        path: 'listar', component:TrabadorListarComponent
      },
      {
        path: 'nuevo', component:CreateEditTrabajadorComponent
      },
      {
        path: 'editar/:id', component:CreateEditTrabajadorComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
