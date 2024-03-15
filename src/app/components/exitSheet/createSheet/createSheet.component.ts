import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PersonalService } from '../../../services/personal.service';
import { Sheet } from '../../../Models/sheetModel';
import { ExitSheetService } from '../../../services/exit-sheet.service';
import { MethodsService } from '../../../services/methods.service';

@Component({
  selector: 'app-createSheet',
  templateUrl: './createSheet.component.html',
  styleUrls: ['./createSheet.component.scss'],
})
export class CreateSheetComponent implements OnInit {
  materialRemoved = new FormControl('');
  cantMaterialRemoved = new FormControl('');

  renderizado: SafeHtml = '';
  activar = false;
  spinner = false;

  drivers!: string[];
  electricians!: string[];
  trucks!: string[];
  inCharges!: string[];
  departaments!: string[];

  myForm: FormGroup = this.fb.group({
    driver: ['', [Validators.required]],
    electrician: ['', [Validators.required]],
    departament: ['', [Validators.required]],
    inCharge: ['', [Validators.required]],
    truck: ['', [Validators.required]],
    removedMaterials: ['', [Validators.required]],
    returnedMaterials: [''],
  });

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private personalServices: PersonalService,
    private exitSheetService: ExitSheetService,
    private methodsService: MethodsService
  ) {}

  ngOnInit(): void {
    this.getInfoSelects();
  }

  getInfoSelects() {
    this.drivers = this.personalServices.getDrivers();
    this.electricians = this.personalServices.getElectricians();
    this.trucks = this.personalServices.getTrucks();
    this.inCharges = this.personalServices.getInCharge();
    this.departaments = this.personalServices.getDepartaments();
  }

  getDate(): string {
    const dateCurrent = new Date();
    const day = dateCurrent.getDate();
    const month = dateCurrent.getUTCMonth();
    const year = dateCurrent.getFullYear();
    const hour = dateCurrent.getHours();
    const minutes = dateCurrent.getMinutes();
    const dateToday = `${day}/${month + 1}/${year} - ${hour}:${minutes}`;

    return dateToday;
  }

  async createSheet() {
    if (this.myForm.valid) {
      this.spinner = true;
      const sheet: Sheet = {
        date: this.getDate(),
        driver: this.myForm.get('driver')?.value,
        electrician: this.myForm.get('electrician')?.value,
        truck: this.myForm.get('truck')?.value,
        inCharge: this.myForm.get('inCharge')?.value,
        departament: this.myForm.get('departament')?.value,
        removedMaterials: this.myForm.get('removedMaterials')?.value,
        returnedMaterials: '',
      };

      const response = await this.exitSheetService.addExitSheet(sheet);
      const id = response.id;
      console.log(id);
      this.renderHTML(sheet);
      this.activar = true;

      setTimeout(() => {
        this.methodsService.downloadPdf(sheet, this.activar, this.spinner);
        window.alert('Apriete "OK" para descargar PDF');
        window.location.reload();
      }, 500);
    } else {
      window.alert('FALTA COMPLETAR FORMULARIO');
    }
  }

  renderHTML(sheet: Sheet) {
    this.renderizado = this.sanitizer.bypassSecurityTrustHtml(
      sheet.removedMaterials
    );
  }
}
