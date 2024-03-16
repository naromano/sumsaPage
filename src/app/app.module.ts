import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

//Componentes
import { AppComponent } from './app.component';
import { CreateSheetComponent } from './components/exitSheet/createSheet/createSheet.component';
import { ListSheetsComponent } from './components/exitSheet/list-sheets/list-sheets.component';
import { EditSheetComponent } from './components/exitSheet/edit-sheet/edit-sheet.component';
import { ListSheetsAdminComponent } from './components/exitSheet/list-sheets-admin/list-sheets-admin.component';
import { EditSheetAdminComponent } from './components/exitSheet/edit-sheet-admin/edit-sheet-admin.component';
import { ViewSheetComponent } from './components/exitSheet/view-sheet/view-sheet.component';
import { HomeComponent } from './components/home/home.component';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';

//Modulos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

//Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    CreateSheetComponent,
    ListSheetsComponent,
    EditSheetComponent,
    ListSheetsAdminComponent,
    EditSheetAdminComponent,
    ViewSheetComponent,
    HomeComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatToolbarModule,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'sumsa-3e0e1',
        appId: '1:160524587886:web:f90e3675aa38dac264677f',
        storageBucket: 'sumsa-3e0e1.appspot.com',
        apiKey: 'AIzaSyDFUASNA8w7-a3tL8nqggoHp0rVZxcIp-4',
        authDomain: 'sumsa-3e0e1.firebaseapp.com',
        messagingSenderId: '160524587886',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
