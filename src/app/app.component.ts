import { Component } from '@angular/core';
import { GameManagerComponent } from './components/game-manager/game-manager.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GameManagerComponent],
  template: `
    <div class="header">
      <h1>
         Minha Biblioteca de Jogos ✨🎮
        <!-- <img class="gamepad" src="https://cdn-icons-png.flaticon.com/512/686/686589.png" alt="Gamepad"> -->
      </h1>
      <p class="subtitle"><b>Do clássico ao lançamento — seus jogos, sua lista, seu jeito.</b></p>
    </div>
    <div class="content">
      <app-game-manager></app-game-manager>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}