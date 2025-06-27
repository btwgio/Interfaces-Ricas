import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MenubarModule],
  template: `
    <div class="header">
      <h1>
         MyGameList Angular
        <img class="gamepad" src="https://cdn-icons-png.flaticon.com/512/686/686589.png" alt="Gamepad">
      </h1>
      <p class="subtitle">Gerencie sua biblioteca de jogos</p>
    </div>
    <p-menubar [model]="items" class="custom-menubar"></p-menubar>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items = [
    {
      label: 'Lista de Jogos',
      icon: 'pi pi-list',
      routerLink: '/lista'
    },
    {
      label: 'Adicionar Jogo',
      icon: 'pi pi-plus',
      routerLink: '/novo'
    }
  ];
}