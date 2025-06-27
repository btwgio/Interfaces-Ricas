import { Injectable } from "@angular/core";
import { MyGameList } from "../models/mygamelist.model";

@Injectable({
  providedIn: "root"
})
export class MygamelistService {
  private myGameList: MyGameList[] = [
    { id: 1, titulo: "Cyberpunk 2077", ano: 2020, genero: "RPG", plataforma: "PC", completado: true },
    { id: 2, titulo: "The Witcher 3", ano: 2015, genero: "RPG", plataforma: "PC", completado: false },
    { id: 3, titulo: "God of War", ano: 2018, genero: "Ação/Aventura", plataforma: "PS4", completado: true },
  ];
  private nextId = 4;

  listar(): MyGameList[] {
    return [...this.myGameList];
  }

  adicionar(jogo: MyGameList): void {
    jogo.id = this.nextId++;
    this.myGameList.push(jogo);
  }

  atualizar(id: number, jogo: MyGameList): void {
    const index = this.myGameList.findIndex(j => j.id === id);
    if (index !== -1) {
      this.myGameList[index] = { ...jogo, id };
    }
  }

  remover(id: number): void {
    this.myGameList = this.myGameList.filter(jogo => jogo.id !== id);
}
}
