import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MygamelistService } from '../../services/mygamelist.service';
import { MyGameList } from '../../models/mygamelist.model';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-mygamelist-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    CardModule,
    ToastModule,
    AutoCompleteModule 
  ],
  templateUrl: './mygamelist-form.component.html',
  providers: [MessageService]
})
export class MygamelistFormComponent implements OnInit {
  jogoForm: FormGroup;
  isEditMode = false;
  jogoId: number | null = null;
  filteredGames: any[] = [];
  lastQuery = '';

  constructor(
    private fb: FormBuilder,
    private gameService: MygamelistService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.jogoForm = this.fb.group({
      titulo: ['', Validators.required],
      ano: [null, [Validators.required, Validators.min(1950)]],
      genero: ['', Validators.required],
      plataforma: ['', Validators.required],
      completado: [false]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.jogoId = +id;
        this.gameService.obterPorId(this.jogoId).subscribe({
          next: (jogo) => {
            if (jogo) {
              this.jogoForm.patchValue(jogo);
            }
          },
          error: (error) => {
            console.error('Erro ao carregar jogo:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao carregar jogo para edição.'
            });
          }
        });
      }
    });
  }

  searchGames(event: any) {
    const query = event.query;
    if (query && query.length > 2 && query !== this.lastQuery) {
      this.lastQuery = query;
      this.gameService.autocomplete(query).subscribe({
        next: (games) => {
          this.filteredGames = games;
        },
        error: (error) => {
          this.filteredGames = [];
        }
      });
    } else if (!query || query.length <= 2) {
      this.filteredGames = [];
    }
  }

  onGameSelect(event: any) {
    const game = event.value || event;
    this.jogoForm.patchValue({
      titulo: game.titulo,
      ano: game.ano,
      genero: game.genero,
      plataforma: game.plataforma
    });
  }

  onSubmit() {
    if (this.jogoForm.invalid) return;
    const jogo: MyGameList = this.jogoForm.value;
    
    if (this.isEditMode && this.jogoId !== null) {
      this.gameService.atualizar(this.jogoId, jogo).subscribe({
        next: () => {
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Sucesso', 
            detail: 'Jogo atualizado!' 
          });
          setTimeout(() => this.router.navigate(['/lista']), 800);
        },
        error: (error) => {
          console.error('Erro ao atualizar jogo:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao atualizar jogo.'
          });
        }
      });
    } else {
      this.gameService.adicionar(jogo).subscribe({
        next: () => {
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Sucesso', 
            detail: 'Jogo adicionado!' 
          });
          setTimeout(() => this.router.navigate(['/lista']), 800);
        },
        error: (error) => {
          console.error('Erro ao adicionar jogo:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao adicionar jogo.'
          });
        }
      });
    }
  }

  voltar() {
    this.router.navigate(['/lista']);
  }
}