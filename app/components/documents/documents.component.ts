import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import { Documents } from 'src/app/models/documents.model';
import { setDocuments } from 'src/app/redux/actions/documents.actions';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {
  @Input() stepper!: MatStepper;
  form: any;
  fileName: string;
  loading!: boolean;

  constructor(public store: Store<{ documents: Documents }>) {
    this.fileName = 'No file choosen';
    this.form = new FormGroup({
      document: new FormControl('', [Validators.required]),
      documentNumber: new FormControl('', [Validators.required]),
      documentType: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onChange(event: any) {
    let file = event.target.files[0];
    const url = URL.createObjectURL(file);
    this.loading = true;
    this.form.patchValue({
      document: file,
    });
    this.fileName = file.name;
    this.loading = false;
  }

  onSave() {
    if (this.form.status === 'INVALID') {
      return;
    }
    let documents = {} as Documents;
    documents.document = this.form.value.document;
    documents.documentNumber = this.form.value.documentNumber;
    documents.documentType = this.form.value.documentType;
    this.store.dispatch(setDocuments(documents));
    this.stepper.next();
  }

  onBack() {
    this.stepper.previous();
  }
}
