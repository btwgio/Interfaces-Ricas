import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="header">
      <h1>
         Minha Biblioteca de Jogos ✨🎮
      </h1>
      <p class="subtitle"><b>Do clássico ao lançamento — seus jogos, sua lista, seu jeito.</b></p>
    </div>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}