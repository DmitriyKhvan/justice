import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { LawsuitComponent } from '../../lawsuit.component';

@Component({
  selector: 'app-select-action',
  templateUrl: './select-action.component.html',
  styleUrls: ['./select-action.component.scss'],
})
export class SelectActionComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  actions: any[] = [];

  constructor(public lawsuitService: LawsuitService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      action: new FormControl(null, Validators.required),
    });
    this.lawsuitService.getActions().subscribe((actions) => {
      this.actions = actions;
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
    this.lawsuitService.actionIds.push(this.form.value.action);
    this.actions = this.actions.filter(
      (action) => !this.lawsuitService.actionIds.includes(action.id)
    );

    console.log('this.lawsuitService.actionIds', this.lawsuitService.actionIds);
    console.log('this.actions', this.actions);
  }
}
