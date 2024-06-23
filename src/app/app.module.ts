import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, withFetch, provideHttpClient } from '@angular/common/http'; // agregue el fetch y el prvide 
import { OficioComponent } from './component/oficio/oficio.component';
import { OficioListarComponent } from './component/oficio/oficio-listar/oficio-listar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';//add
import { MatSortModule } from '@angular/material/sort'; //add
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NavbarComponent } from './component/navbar/navbar.component';//add
import {MatToolbarModule} from '@angular/material/toolbar';
import { ClienteComponent } from './component/cliente/cliente.component';
import { ClienteListarComponent } from './component/cliente/cliente-listar/cliente-listar.component';
import { SolicitudComponent } from './component/solicitud/solicitud.component';
import { SolicitudListarComponent } from './component/solicitud/solicitud-listar/solicitud-listar.component';
import { PagoComponent } from './component/pago/pago.component';
import { PagoListarComponent } from './component/pago/pago-listar/pago-listar.component';
import { TrabajadorComponent } from './component/trabajador/trabajador.component';
import { TrabadorListarComponent } from './component/trabajador/trabador-listar/trabador-listar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DialogoComponent } from './component/dialogo/dialogo.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { CreateEditClienteComponent } from './component/cliente/create-edit-cliente/create-edit-cliente.component';
import { CreateEditOficioComponent } from './component/oficio/create-edit-oficio/create-edit-oficio.component';
import { CreateEditPagoComponent } from './component/pago/create-edit-pago/create-edit-pago.component';
import { CreateEditSolicitudComponent } from './component/solicitud/create-edit-solicitud/create-edit-solicitud.component';
import { CreateEditTrabajadorComponent } from './component/trabajador/create-edit-trabajador/create-edit-trabajador.component';
import { HomeComponent } from './component/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    OficioComponent,
    OficioListarComponent,
    CreateEditOficioComponent,
    NavbarComponent,
    ClienteComponent,
    ClienteListarComponent,
    CreateEditClienteComponent,
    SolicitudComponent,
    SolicitudListarComponent,
    CreateEditSolicitudComponent,
    PagoComponent,
    PagoListarComponent,
    CreateEditPagoComponent,
    TrabajadorComponent,
    TrabadorListarComponent,
    CreateEditTrabajadorComponent,
    HomeComponent,
    DialogoComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    BrowserAnimationsModule,
    MatTableModule ,
    MatButtonModule, // Paginator add hand
    MatSortModule, // Paginator add hand
    MatPaginatorModule,// Paginator add hand
    ReactiveFormsModule, // por el Subject
    FormsModule, //add
    MatInputModule, //add
    MatNativeDateModule, //add
    MatDatepickerModule,
    MatNativeDateModule, //add
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
    MatGridListModule 
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withFetch())// agregue esto
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
