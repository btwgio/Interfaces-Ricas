import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { MyGameList } from '../../models/mygamelist.model';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    TagModule
  ],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.scss'
})
export class GameDetailComponent {
  @Input() game: MyGameList | null = null;
  @Output() editRequested = new EventEmitter<MyGameList>();
  @Output() deleteRequested = new EventEmitter<MyGameList>();
  @Output() closed = new EventEmitter<void>();

  onEdit() {
    if (this.game) {
      this.editRequested.emit(this.game);
    }
  }

  onDelete() {
    if (this.game) {
      this.deleteRequested.emit(this.game);
    }
  }

  onClose() {
    this.closed.emit();
  }

  getSeverity(completado: boolean): 'success' | 'secondary' {
    return completado ? 'success' : 'secondary';
  }

  getStatusText(completado: boolean): string {
    return completado ? 'Completado' : 'Pendente';
  }
}
