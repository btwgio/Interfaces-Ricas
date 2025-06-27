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
    ToastModule
  ],
  templateUrl: './mygamelist-form.component.html',
  providers: [MessageService]
})
export class MygamelistFormComponent implements OnInit {
  jogoForm: FormGroup;
  isEditMode = false;
  jogoId: number | null = null;

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
        const jogo = this.gameService.listar().find(j => j.id === this.jogoId);
        if (jogo) {
          this.jogoForm.patchValue(jogo);
        }
      }
    });
  }

  onSubmit() {
    if (this.jogoForm.invalid) return;
    const jogo: MyGameList = this.jogoForm.value;
    if (this.isEditMode && this.jogoId !== null) {
      this.gameService.atualizar(this.jogoId, jogo);
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Jogo atualizado!' });
    } else {
      this.gameService.adicionar(jogo);
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Jogo adicionado!' });
    }
    setTimeout(() => this.router.navigate(['/lista']), 800);
  }

  voltar() {
    this.router.navigate(['/lista']);
  }
}