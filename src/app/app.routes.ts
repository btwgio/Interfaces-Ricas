import { Routes } from '@angular/router';
import { MygamelistListComponent } from './components/mygamelist-list/mygamelist-list.component';
import { MygamelistFormComponent } from './components/mygamelist-form/mygamelist-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/lista', pathMatch: 'full' },
  { path: 'lista', component: MygamelistListComponent },
  { path: 'novo', component: MygamelistFormComponent,title: 'Novo jogo' },
  { path: 'editar/:id', component: MygamelistFormComponent, title: 'Editar jogo' },
  { path: '**', redirectTo: '/lista' }
];
