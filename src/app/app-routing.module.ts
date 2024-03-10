import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HojaComponent } from './hojaSalida/hoja/hoja.component';
import { SheetComponent } from './hojaSalida/sheet/sheet.component';

const routes: Routes = [

  { path: 'hojaSalida', component: HojaComponent },
  { path: 'salida', component: SheetComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
