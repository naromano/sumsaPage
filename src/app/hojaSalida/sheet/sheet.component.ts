import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table'
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrl: './sheet.component.scss'
})
export class SheetComponent implements OnInit {

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;


  title = 'form-array';
  

  fg!: FormGroup
  dataSourcePacks!: MatTableDataSource<any>;
  displayedColumns = ["cantDesde", "precio", "eliminar"]

  cantDesde = new FormControl('')
  precio = new FormControl('')
  materiales:any[] = [];

  constructor(private _fb: FormBuilder,
    private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter( value || '')),
      
    );


    this.fg = this._fb.group({
      driver: ['', [Validators.required]],
      electrician: ['', [Validators.required]],
      workAndLocation: ['', [Validators.required]],
      removedMaterials: this._fb.array([]),
      removedLuminaries: this._fb.array([]),
      returnedMaterials: this._fb.array([]),
      returnedLuminaires: this._fb.array([]),
    });

  };

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  get removedMaterials() {
    return this.fg.controls["removedMaterials"] as FormArray;
  };

  addLesson(): void {

    const lessonForm = this._fb.group({
      cantDesde: [''],
      precio: ['']
    });


    this.removedMaterials.push(lessonForm);
    this.dataSourcePacks = new MatTableDataSource(this.removedMaterials.controls);

    this.cd.detectChanges();

  };


  deleteLesson(lessonIndex: number): void {

    this.removedMaterials.removeAt(lessonIndex);
    this.dataSourcePacks = new MatTableDataSource(this.removedMaterials.controls);

  };


  onSubmit() {
    console.log(this.fg.get('removedMaterials')?.value)

    

  }


}