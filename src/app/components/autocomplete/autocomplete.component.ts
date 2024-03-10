import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent implements OnInit{
  colorArray = ['Red', 'Green', 'Yellow']
  filterOption!:Observable<string[]>

  formControl = new FormControl('')


  ngOnInit(): void {
    this.filterOption = this.formControl.valueChanges.pipe(
      startWith(''), map(value => this._filter(value || ''))

    )

  }

  private _filter(value:string):string[]{

    const searchValue = value.toLocaleLowerCase();
    return this.colorArray.filter(option => option.toLocaleLowerCase().includes(searchValue));

  }

}
