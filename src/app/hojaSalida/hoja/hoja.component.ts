import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Sheet } from '../../Models/sheetModel';

@Component({
  selector: 'app-hoja',
  templateUrl: './hoja.component.html',
  styleUrl: './hoja.component.scss'
})
export class HojaComponent implements OnInit {

  materialRemoved = new FormControl('')
  cantMaterialRemoved = new FormControl('')

  constructor ( private fb: FormBuilder) {}
  
  dateCurrent = new Date()
  day = this.dateCurrent.getDate()
  month = this.dateCurrent.getUTCMonth()
  year = this.dateCurrent.getFullYear()

  dateToday = this.day + "/" + (this.month+1) + "/" + this.year

  myForm: FormGroup = this.fb.group({
    driver: ['', [Validators.required]],
    electrician: ['', [Validators.required]],
    workAndLocation: ['', [Validators.required]],

    removedMaterials: this.fb.array([this.fb.group({
      material: ['hola'],
      amount: ['']
    })]),


    retiredLuminaires: [this.fb.array([])],
    returnedMaterials: ['', [Validators.required]],
    returnedLuminaires: ['', [Validators.required]],
  })
  
  ngOnInit(): void {
    console.log(this.myForm.get('removedMaterials')?.value)
  }

  

  createSheet(){
    console.log(this.myForm.get('removedMaterials')?.value)
    
  }

  get removedMaterials(){
    return this.myForm.get('removedMaterials') as FormArray;
  }

  addInput(){

    const removedMaterialForm = this.fb.group({
      material:[''],
      amount:['']
    });

    this.removedMaterials.push(removedMaterialForm)
    console.log(this.myForm.value)

  }

}
