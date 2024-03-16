import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSheetComponent } from './components/exitSheet/createSheet/createSheet.component';
import { ListSheetsComponent } from './components/exitSheet/list-sheets/list-sheets.component';
import { EditSheetComponent } from './components/exitSheet/edit-sheet/edit-sheet.component';
import { ListSheetsAdminComponent } from './components/exitSheet/list-sheets-admin/list-sheets-admin.component';
import { EditSheetAdminComponent } from './components/exitSheet/edit-sheet-admin/edit-sheet-admin.component';
import { ViewSheetComponent } from './components/exitSheet/view-sheet/view-sheet.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'createSheet', component: CreateSheetComponent },
  { path: 'listSheets', component: ListSheetsComponent },
  { path: 'listSheetsAdmin', component: ListSheetsAdminComponent },
  { path: 'listSheets', component: ListSheetsComponent },
  { path: 'editSheet/:id', component: EditSheetComponent },
  { path: 'editSheetAdmin/:id', component: EditSheetAdminComponent },
  { path: 'viewSheet/:id', component: ViewSheetComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
