import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
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

  async getExitSheet(id: string){
    try {
      const sheetRef = doc(this.firestore, 'exitSheets', id);
      const snapshot = await getDoc(sheetRef)
      return snapshot.data() as Sheet;
    } catch (error) {
      throw error
    };
  }
  
  updateExitSheet(id: string, sheet: Sheet){
    const sheetRef = doc(this.firestore, 'exitSheets', id)
    return updateDoc(sheetRef, {...sheet});

  }

  deleteExitSheet(sheet: Sheet) {
    const sheetDocRef = doc(this.firestore, `exitSheets/${sheet}`);
    return deleteDoc(sheetDocRef);
  }
}
