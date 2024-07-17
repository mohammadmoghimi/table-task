import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './data.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HorizontalService } from './horizontal.service';
import { VerticalService } from './vertical.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , ReactiveFormsModule , CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  form: FormGroup;
  verticalList: any[] = [];
  horizontalList: any[] = [];
  equation: string = '';
  total: number = 0;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private horizontalService: HorizontalService,
    private verticalService: VerticalService
  ) {
    this.form = this.fb.group({
      rows: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.dataService.getLists().subscribe(data => {
      this.verticalList = data.verticalList;
      this.horizontalList = data.horizontalList;
      this.initForm();
    });

    this.verticalService.newItem$.subscribe(newItem => {
      if (newItem && newItem.name) {
        this.verticalList.push(newItem);
        const row = this.fb.group({
          input: [''],
          checkboxes: this.fb.array(this.horizontalList.map(() => this.fb.control(false)))
        });
        this.rows.push(row);
      }
    });

    this.horizontalService.newItem$.subscribe(newItem => {
      if (newItem && newItem.name) {
        this.horizontalList.push(newItem);
        this.rows.controls.forEach(row => {
          (row.get('checkboxes') as FormArray).push(this.fb.control(false));
        });
      }
    });
  }

  initForm() {
    const rows = this.form.get('rows') as FormArray;
    this.verticalList.forEach((item, index) => {
      const row = this.fb.group({
        input: [''],
        checkboxes: this.fb.array(this.horizontalList.map(() => this.fb.control(false)))
      });
      rows.push(row);

      row.valueChanges.subscribe(() => {
        this.calculateEquation();
      });
    });
  }

  get rows() {
    return this.form.get('rows') as FormArray;
  }

  getCheckboxes(rowIndex: number) {
    return (this.rows.at(rowIndex).get('checkboxes') as FormArray).controls as FormControl[];
  }

  calculateEquation() {
    this.total = 0;
    let equationParts: string[] = [];
    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows.at(i);
      const input = row.get('input')!.value;
      const checkboxes = row.get('checkboxes') as FormArray;

      for (let j = 0; j < checkboxes.length; j++) {
        if (checkboxes.at(j).value) {
          const verticalValue = this.verticalList[i].value;
          const horizontalValue = this.horizontalList[j].value;
          const result = input * verticalValue + horizontalValue;
          this.total += result;
          equationParts.push(`${input} * ${verticalValue} + ${horizontalValue}`);
        }
      }
    }
    this.equation = equationParts.join(' + ') + ` = ${this.total}`;
  }
}