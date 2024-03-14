import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Sheet } from '../Models/sheetModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExitSheetService {

  constructor(private firestore: Firestore) { }

  addExitSheet(sheet: Sheet){
    const sheetRef = collection(this.firestore, 'existSheets');
    return addDoc(sheetRef, sheet);
  }


  getExitSheets(): Observable<Sheet[]>{
    const sheetRef = collection(this.firestore, 'existSheets' );
    return collectionData(sheetRef,{idField: 'id'}) as Observable<Sheet[]>

  }

}
