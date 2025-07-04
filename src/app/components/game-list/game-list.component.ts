import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MyGameList } from '../../models/mygamelist.model';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TagModule
  ],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss'
})
export class GameListComponent {
  @Input() games: MyGameList[] = [];
  @Output() gameSelected = new EventEmitter<MyGameList>();
  @Output() editRequested = new EventEmitter<MyGameList>();
  @Output() deleteRequested = new EventEmitter<MyGameList>();
  @Output() addNewRequested = new EventEmitter<void>();

  onViewDetails(game: MyGameList) {
    this.gameSelected.emit(game);
  }

  onEdit(game: MyGameList) {
    this.editRequested.emit(game);
  }

  onDelete(game: MyGameList) {
    const confirmacao = confirm(`Tem certeza que deseja excluir o jogo "${game.titulo}"?`);
    if (confirmacao) {
      this.deleteRequested.emit(game);
    }
  }

  onAddNew() {
    this.addNewRequested.emit();
  }

  getSeverity(completado: boolean): 'success' | 'secondary' {
    return completado ? 'success' : 'secondary';
  }

  getStatusText(completado: boolean): string {
    return completado ? 'Completado' : 'Pendente';
  }
}
