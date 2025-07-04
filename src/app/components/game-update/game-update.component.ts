import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { MyGameList } from '../../models/mygamelist.model';

@Component({
  selector: 'app-game-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    CardModule
  ],
  templateUrl: './game-update.component.html',
  styleUrl: './game-update.component.scss'
})
export class GameUpdateComponent implements OnChanges {
  @Input() game: MyGameList | null = null;
  @Output() gameUpdated = new EventEmitter<MyGameList>();
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['game'] && this.game) {
      this.jogoForm.patchValue({
        titulo: this.game.titulo,
        ano: this.game.ano,
        genero: this.game.genero,
        plataforma: this.game.plataforma,
        completado: this.game.completado
      });
    }
  }

  onSubmit() {
    if (this.jogoForm.valid && this.game) {
      const jogoAtualizado: MyGameList = {
        id: this.game.id,
        ...this.jogoForm.value
      };
      this.gameUpdated.emit(jogoAtualizado);
    }
  }

  onCancel() {
    this.cancelled.emit();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.jogoForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}
