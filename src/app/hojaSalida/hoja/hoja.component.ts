import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PersonalService } from '../../services/personal.service';
import { Sheet } from '../../Models/sheetModel';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-hoja',
  templateUrl: './hoja.component.html',
  styleUrls: ['./hoja.component.scss'],
})
export class HojaComponent implements OnInit {
  materialRemoved = new FormControl('');
  cantMaterialRemoved = new FormControl('');

  dateCurrent = new Date();
  day = this.dateCurrent.getDate();
  month = this.dateCurrent.getUTCMonth();
  year = this.dateCurrent.getFullYear();
  hour = this.dateCurrent.getHours();
  minutes = this.dateCurrent.getMinutes();
  dateToday = `${this.day}/${this.month + 1}/${this.year} - ${this.hour}:${
    this.minutes
  }`;

  renderizado1: SafeHtml = '';
  renderizado2: SafeHtml = '';
  activar = false;

  drivers!: string[];
  electricians!: string[];
  trucks!: string[];
  inCharges!: string[];

  myForm: FormGroup = this.fb.group({
    driver: ['', [Validators.required]],
    electrician: ['', [Validators.required]],
    workAndLocation: ['', [Validators.required]],
    inCharge: ['', [Validators.required]],
    truck: ['', [Validators.required]],
    removedMaterials: ['', [Validators.required]],
    returnedMaterials: [''],
  });

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private personalServices: PersonalService
  ) {}

  ngOnInit(): void {
    this.drivers = this.personalServices.getDrivers();
    this.electricians = this.personalServices.getElectricians();
    this.trucks = this.personalServices.getTrucks();
    this.inCharges = this.personalServices.getInCharge();
  }

  createSheet(): void {
    if (this.myForm.valid) {
      const form: Sheet = {
        date: this.dateToday,
        driver: this.myForm.get('driver')?.value,
        electrician: this.myForm.get('electrician')?.value,
        truck: this.myForm.get('truck')?.value,
        inCharge: this.myForm.get('inCharge')?.value,
        workAndLocation: this.myForm.get('workAndLocation')?.value,
        removedMaterials: this.myForm.get('removedMaterials')?.value,
        returnedMaterials: '',
      };

      this.renderizado1 = this.sanitizer.bypassSecurityTrustHtml(
        this.myForm.get('removedMaterials')?.value
      );
      setTimeout(() => {
        this.activar = true;
        const DATA = document.getElementById('content');
        const doc = new jsPDF('p', 'pt', 'a4');
        const options = {
          background: 'white',
          scale: 3,
        };
        html2canvas(DATA, options)
          .then((canvas) => {
            const img = canvas.toDataURL('image/PNG');

            // Add image Canvas to PDF
            const bufferX = 15;
            const bufferY = 15;
            const imgProps = (doc as any).getImageProperties(img);
            const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            doc.addImage(
              img,
              'PNG',
              bufferX,
              bufferY,
              pdfWidth,
              pdfHeight,
              undefined,
              'FAST'
            );
            return doc;
          })
          .then((docResult) => {
            docResult.save(`${form.date}, ${form.electrician}.pdf`);
            this.activar = true;
          });
      }, 1000);

      console.log(form);
    } else {
      window.alert('FALTA COMPLETAR FORMULARIO');
    }
  }
}
