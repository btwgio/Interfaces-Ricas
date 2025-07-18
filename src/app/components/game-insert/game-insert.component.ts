import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MyGameList } from '../../models/mygamelist.model';
import { JogosService } from '../../services/jogos.service';
import { debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';

@Component({
  selector: 'app-game-insert',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    CardModule,
    AutoCompleteModule
  ],
  templateUrl: './game-insert.component.html',
  styleUrl: './game-insert.component.scss'
})
export class GameInsertComponent implements OnInit {
  @Output() gameAdded = new EventEmitter<MyGameList>();
  @Output() cancelled = new EventEmitter<void>();

  jogoForm: FormGroup;
  filteredGames: any[] = [];
  selectedGame: any = null;
  lastQuery = '';

  constructor(
    private fb: FormBuilder,
    private jogosService: JogosService
  ) {
    this.jogoForm = this.fb.group({
      titulo: ['', Validators.required],
      ano: [null, [Validators.required, Validators.min(1950), Validators.max(new Date().getFullYear())]],
      genero: ['', Validators.required],
      plataforma: ['', Validators.required],
      completado: [false]
    });
  }

  ngOnInit() {
    
  }

  searchGames(event: any) {
    const query = event.query;
    if (query && query.length > 2 && query !== this.lastQuery) {
      this.lastQuery = query;
      this.jogosService.searchGames(query).subscribe({
        next: (games) => {
          this.filteredGames = games;
        },
        error: (error) => {
          console.error('Erro ao buscar jogos:', error);
          this.filteredGames = [];
        }
      });
    } else if (!query || query.length <= 2) {
      this.filteredGames = [];
    }
  }

  onGameSelect(event: any) {
    const game = event.value || event;
    this.selectedGame = game;
    
    // Preenche o formulário com os dados do jogo selecionado
    this.jogoForm.patchValue({
      titulo: game.titulo,
      ano: game.ano,
      genero: game.genero,
      plataforma: game.plataforma
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
      this.selectedGame = null;
    }
  }

  onCancel() {
    this.jogoForm.reset();
    this.selectedGame = null;
    this.cancelled.emit();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.jogoForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}
