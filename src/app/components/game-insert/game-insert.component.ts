import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { MyGameList } from '../../models/mygamelist.model';

@Component({
  selector: 'app-game-insert',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    CardModule
  ],
  templateUrl: './game-insert.component.html',
  styleUrl: './game-insert.component.scss'
})
export class GameInsertComponent {
  @Output() gameAdded = new EventEmitter<MyGameList>();
  @Output() cancelled = new EventEmitter<void>();

  jogoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.jogoForm = this.fb.group({
      titulo: ['', Validators.required],
      ano: [null, [Validators.required, Validators.min(1950), Validators.max(new Date().getFullYear())]],
      genero: ['', Validators.required],
      plataforma: ['', Validators.required],
      completado: [false]
    });
  }

  onSubmit() {
    if (this.jogoForm.valid) {
      const novoJogo: MyGameList = {
        id: 0, // O ID será definido pelo serviço
        ...this.jogoForm.value
      };
      this.gameAdded.emit(novoJogo);
      this.jogoForm.reset();
    }
  }

  onCancel() {
    this.jogoForm.reset();
    this.cancelled.emit();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.jogoForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}
