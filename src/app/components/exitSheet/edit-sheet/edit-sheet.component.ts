import { Component, OnInit } from '@angular/core';
import { ExitSheetService } from '../../../services/exit-sheet.service';
import { Sheet } from '../../../Models/sheetModel';
import { ActivatedRoute, Router } from '@angular/router';
import { MethodsService } from '../../../services/methods.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-sheet',
  templateUrl: './edit-sheet.component.html',
  styleUrl: './edit-sheet.component.scss'
})
export class EditSheetComponent implements OnInit {

  sheet!: Sheet
  id: string
  mostrar = false
  editorContent: string = '';
  removedMaterials: string;
  activar = false;
  spinner = false;
  renderizado: SafeHtml = '';
  removedMaterial = false;
  returnedMaterials = true;

  constructor(private exitSheetServices : ExitSheetService, private aRoute: ActivatedRoute, private methodsService: MethodsService, private sanitizer: DomSanitizer, private router: Router){
    this.id  = this.aRoute.snapshot.paramMap.get('id');

  }
  ngOnInit(): void {
    this.getExitSheet(this.id)
  }

  async getExitSheet(id: string){
    try {
      const sheet = await this.exitSheetServices.getExitSheet(id)
      this.sheet = sheet
      this.removedMaterials = this.sheet.removedMaterials
      this.mostrar = true
    } catch (error) {
      console.log(error)
    }
  }

  updateSheet(){
    this.spinner = true;
    const returnedMaterials = this.sheet.removedMaterials;

    const sheet: Sheet = {
      date: this.sheet.date,
      departament: this.sheet.departament,
      driver: this.sheet.driver,
      electrician: this.sheet.electrician,
      removedMaterials: this.removedMaterials,
      inCharge: this.sheet.inCharge,
      truck: this.sheet.truck,
      returnedMaterials,
    }
      this.exitSheetServices.updateExitSheet(this.id, sheet);
      this.renderHTML(sheet);
      this.removedMaterial = true;
      this.returnedMaterials = false;
      setTimeout(() => {
        this.methodsService.downloadPdf(sheet, this.activar, this.spinner);
        window.alert('Apriete "OK" para descargar PDF');
        this.router.navigateByUrl('/listSheets')
      }, 500);

  }

  renderHTML(sheet: Sheet) {
    this.renderizado = this.sanitizer.bypassSecurityTrustHtml(
      sheet.returnedMaterials
    );
  }

}
