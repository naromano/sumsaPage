import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Sheet } from '../Models/sheetModel';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExitSheetService {
  constructor(private firestore: Firestore) {}

  addExitSheet(sheet: Sheet) {
    const sheetRef = collection(this.firestore, 'exitSheets');
    return addDoc(sheetRef, sheet);
  }

  getExitSheets(): Observable<Sheet[]> {
    const sheetRef = collection(this.firestore, 'exitSheets');
    return collectionData(sheetRef, { idField: 'id' }) as Observable<Sheet[]>;
  }

  updateExitSheet(sheet: Sheet): Observable<Sheet> {
    const sheetDocRef = doc(this.firestore, `exitSheets/${sheet.id}`);
    const { id, ...updatedData } = sheet; // Eliminar el ID de la hoja antes de actualizar
    return new Observable<Sheet>((observer) => {
      updateDoc(sheetDocRef, updatedData)
        .then(() => {
          // Después de actualizar el documento, obtén los datos actualizados del documento
          observer.next({ id, ...updatedData }); // Devolver el objeto Sheet actualizado
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  deleteExitSheet(sheet: Sheet) {
    const sheetDocRef = doc(this.firestore, `exitSheets/${sheet}`);
    return deleteDoc(sheetDocRef);
  }
}
