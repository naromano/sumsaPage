import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSheetComponent } from './components/exitSheet/createSheet/createSheet.component';
import { ListSheetsComponent } from './components/list-sheets/list-sheets.component';

const routes: Routes = [
  { path: 'createSheet', component: CreateSheetComponent },
  { path: 'listSheets', component: ListSheetsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
