import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MygamelistService } from '../../services/mygamelist.service';
import { MyGameList } from '../../models/mygamelist.model';

@Component({
  selector: 'app-mygamelist-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TagModule,
    ConfirmDialogModule,
    ToastModule,
    RouterModule 
  ],
  templateUrl: './mygamelist-list.component.html',
  styleUrl: './mygamelist-list.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class MygamelistListComponent implements OnInit {
  jogos: MyGameList[] = [];

  constructor(
    private gameService: MygamelistService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public router: Router
  ) {}

  ngOnInit() {
    this.carregarJogos();
  }

  carregarJogos() {
    this.gameService.listar().subscribe({
      next: (jogos) => {
        this.jogos = jogos;
      },
      error: (error) => {
        console.error('Erro ao carregar jogos:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar jogos. Verifique se o backend está rodando.'
        });
      }
    });
  }

  confirmarRemocao(jogo: MyGameList) {
  this.confirmationService.confirm({
    message: `Tem certeza que deseja remover o jogo "${jogo.titulo}"?`,
    header: 'Confirmação de Exclusão',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sim',
    rejectLabel: 'Não',
    accept: () => {
      this.removerJogo(jogo.id);
    }
  });
}

removerJogo(id: number) {
  this.gameService.remover(id).subscribe({
    next: () => {
      this.carregarJogos();
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
        detail: 'Erro ao remover jogo.'
      });
    }
  });
}

  editarJogo(id: number) {
    this.router.navigate(['/editar', id]);
  }
  

  getSeverity(completado: boolean): string {
    return completado ? 'success' : 'warning';
  }

  getStatusText(completado: boolean): string {
    return completado ? 'Completado' : 'Pendente';
  }
}
