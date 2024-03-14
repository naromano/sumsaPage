import { Component, OnInit } from '@angular/core';
import { Sheet } from '../../Models/sheetModel';
import { ExitSheetService } from '../../services/exit-sheet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-sheets',
  templateUrl: './list-sheets.component.html',
  styleUrl: './list-sheets.component.scss',
})
export class ListSheetsComponent implements OnInit {
  sheets: Sheet[] = [];
  displayedColumns: string[] = [
    'date',
    'truck',
    'electrician',
    'inCharge',
    'edit',
    'delete',
  ];
  dataSource = this.sheets;

  constructor(private exitSheetService: ExitSheetService, router: Router) {}
  ngOnInit(): void {
    this.getSheets();
  }

  getSheets() {
    this.exitSheetService.getExitSheets().subscribe((resp) => {
      this.dataSource = resp;
      this.sheets = resp;
      console.log(this.sheets);
    });
  }

  editSheet(sheet: Sheet) {}

  async deleteSheet(sheet: Sheet) {
    try {
      const response = await this.exitSheetService.deleteExitSheet(sheet);
      console.log('Documento eliminado exitosamente:', response);
    } catch (error) {
      console.error('Error al intentar eliminar el documento:', error);
    }
  }
}
