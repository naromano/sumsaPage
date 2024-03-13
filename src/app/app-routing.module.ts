import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HojaComponent } from './hojaSalida/hoja/hoja.component';

const routes: Routes = [

  { path: 'hojaSalida', component: HojaComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
