import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MygamelistService } from '../../services/mygamelist.service';
import { MyGameList } from '../../models/mygamelist.model';
import { GameListComponent } from '../game-list/game-list.component';
import { GameInsertComponent } from '../game-insert/game-insert.component';
import { GameUpdateComponent } from '../game-update/game-update.component';
import { GameDetailComponent } from '../game-detail/game-detail.component';

type ViewMode = 'list' | 'insert' | 'update' | 'detail';

@Component({
  selector: 'app-game-manager',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmDialogModule,
    ToastModule,
    GameListComponent,
    GameInsertComponent,
    GameUpdateComponent,
    GameDetailComponent
  ],
  templateUrl: './game-manager.component.html',
  styleUrl: './game-manager.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class GameManagerComponent implements OnInit {
  games: MyGameList[] = [];
  currentView: ViewMode = 'list';
  selectedGame: MyGameList | null = null;

  constructor(
    private gameService: MygamelistService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.gameService.listar().subscribe({
      next: (games) => {
        this.games = games;
      },
      error: (error) => {
        console.error('Erro ao carregar jogos:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar lista de jogos'
        });
      }
    });
  }

  // Eventos do componente de lista
  onGameSelected(game: MyGameList) {
    this.selectedGame = game;
    this.currentView = 'detail';
  }

  onEditRequested(game: MyGameList) {
    this.selectedGame = game;
    this.currentView = 'update';
  }

  onDeleteRequested(game: MyGameList) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja remover o jogo "${game.titulo}"?`,
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.deleteGame(game.id);
      }
    });
  }

  onAddNewRequested() {
    this.currentView = 'insert';
  }

  // Eventos do componente de inserção
  onGameAdded(game: MyGameList) {
    this.gameService.adicionar(game).subscribe({
      next: (addedGame) => {
        this.loadGames();
        this.currentView = 'list';
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Jogo adicionado com sucesso!'
        });
      },
      error: (error) => {
        console.error('Erro ao adicionar jogo:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao adicionar jogo'
        });
      }
    });
  }

  onInsertCancelled() {
    this.currentView = 'list';
  }

  // Eventos do componente de atualização
  onGameUpdated(game: MyGameList) {
    this.gameService.atualizar(game.id, game).subscribe({
      next: (updatedGame) => {
        this.loadGames();
        this.currentView = 'list';
        this.selectedGame = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Jogo atualizado com sucesso!'
        });
      },
      error: (error) => {
        console.error('Erro ao atualizar jogo:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao atualizar jogo'
        });
      }
    });
  }

  onUpdateCancelled() {
    this.currentView = 'list';
    this.selectedGame = null;
  }

  // Eventos do componente de detalhes
  onDetailEditRequested(game: MyGameList) {
    this.selectedGame = game;
    this.currentView = 'update';
  }

  onDetailDeleteRequested(game: MyGameList) {
    this.onDeleteRequested(game);
  }

  onDetailClosed() {
    this.currentView = 'list';
    this.selectedGame = null;
  }

  // Método auxiliar para deletar jogo
  private deleteGame(id: number) {
    this.gameService.remover(id).subscribe({
      next: () => {
        this.loadGames();
        this.currentView = 'list';
        this.selectedGame = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Jogo removido com sucesso!'
        });
      },
      error: (error) => {
        console.error('Erro ao remover jogo:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao remover jogo'
        });
      }
    });
  }
}
