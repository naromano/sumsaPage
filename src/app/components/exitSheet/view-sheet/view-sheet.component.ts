import { Component, OnInit } from '@angular/core';
import { Sheet } from '../../../Models/sheetModel';
import { ExitSheetService } from '../../../services/exit-sheet.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MethodsService } from '../../../services/methods.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-sheet',
  templateUrl: './view-sheet.component.html',
  styleUrl: './view-sheet.component.scss'
})
export class ViewSheetComponent implements OnInit {
  
  sheet: Sheet
  mostrar = false
  activar = false
  spinner = false
  renderRemovedMaterials: SafeHtml = null;
  renderReturnedMaterials: SafeHtml = null;
  id: string

  constructor(private exitSheetServices: ExitSheetService, private methodsService: MethodsService, private aRoute: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router){
    this.id  = this.aRoute.snapshot.paramMap.get('id');

  }


  ngOnInit(): void {
    this.getExitSheet(this.id)
  }

  async getExitSheet(id: string){
    try {
      const sheet = await this.exitSheetServices.getExitSheet(id)
      this.sheet = sheet
      
      console.log(this.sheet);
      
      this.renderHTMLRemoveMaterials(this.sheet)
      this.renderHTMLReturnedMaterials(this.sheet)
      console.log(this.renderHTMLRemoveMaterials(this.sheet));
      console.log(this.renderHTMLReturnedMaterials(this.sheet));
      this.mostrar = true
       
      
    } catch (error) {
      console.log(error)
    }
  }

  downloadPdf(){
    this.methodsService.downloadPdf(this.sheet, this.activar, this.spinner)
  }

   renderHTMLRemoveMaterials(sheet: Sheet) {
    this.renderRemovedMaterials = this.sanitizer.bypassSecurityTrustHtml(
      sheet.removedMaterials
    );
  }
   renderHTMLReturnedMaterials(sheet: Sheet) {
    this.renderReturnedMaterials = this.sanitizer.bypassSecurityTrustHtml(
      sheet.returnedMaterials
    );
  }

}
