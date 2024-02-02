import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {MatStep, MatStepper, MatStepperNext} from "@angular/material/stepper";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatCheckbox} from "@angular/material/checkbox";
import {MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {ModalComponent} from "./modal/modal.component";


@Component({
  selector: 'app-root',
  standalone: true,
  providers: [MatDialog],
  imports: [CommonModule, RouterOutlet, MatStepper, MatStep, ReactiveFormsModule, MatFormField, MatInput,
    MatLabel, MatError, MatStepperNext, MatButton, MatSelect, MatOption, MatRadioGroup, MatRadioButton, MatCheckbox, MatToolbarRow, MatToolbar, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  usuarioDorm: FormGroup
  clasesForm: FormGroup

  constructor(formBuilder: FormBuilder, public dialog: MatDialog) {
    this.usuarioDorm = formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      direccion: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern('[679][0-9]{8}')]],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      comprobarcontrasena: ['', [Validators.required, comprobarContrsenas('contrasena')]]
    })
    console.log(this.usuarioDorm)

    this.clasesForm = formBuilder.group({
      clases: [[], [Validators.required, Validators.minLength(1)]],
      sexo: ['', Validators.required],
      terminos: [false, Validators.requiredTrue]
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: {
        nombre: this.usuarioDorm.value.nombre,
        direccion: this.usuarioDorm.value.direccion,
        telefono: this.usuarioDorm.value.telefono,
        email: this.usuarioDorm.value.email,
        clases: this.clasesForm.value.clases,
        sexo: this.clasesForm.value.sexo
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }


}

const comprobarContrsenas = (controlName: string) => (control: FormControl) => {
  const controlToCompare = control.root.get(controlName)
  if (controlToCompare) {
    const subscription = controlToCompare.valueChanges.subscribe(() => {
      control.updateValueAndValidity()
      subscription.unsubscribe()
    })
  }
  return controlToCompare && controlToCompare.value !== control.value ? {
    'notEqual': true
  } : null
}


