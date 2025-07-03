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
    { id: 4, titulo: "Persona 3", ano: 2006, genero: "J-RPG", plataforma: "PS2", completado: true },
    { id: 5, titulo: "Horizon Zero Dawn", ano: 2017, genero: "Ação/RPG", plataforma: "PS4", completado: false },
    { id: 6, titulo: "Mass Effect 2", ano: 2010, genero: "RPG", plataforma: "PC", completado: true },
    { id: 7, titulo: "Final Fantasy X", ano: 2001, genero: "J-RPG", plataforma: "PS2", completado: true },
    { id: 8, titulo: "Red Dead Redemption 2", ano: 2018, genero: "Ação/Aventura", plataforma: "PC", completado: false },
    { id: 9, titulo: "NieR: Automata", ano: 2017, genero: "Ação/J-RPG", plataforma: "PC", completado: true },
    { id: 10, titulo: "Dark Souls III", ano: 2016, genero: "RPG/Ação", plataforma: "PC", completado: false },
    { id: 11, titulo: "Dragon Age: Inquisition", ano: 2014, genero: "RPG", plataforma: "PC", completado: true },
    { id: 12, titulo: "Bloodborne", ano: 2015, genero: "Ação/RPG", plataforma: "PS4", completado: false },
    { id: 13, titulo: "Shin Megami Tensei V", ano: 2021, genero: "J-RPG", plataforma: "Switch", completado: true },

  ];
  
  private nextId = Math.max(...this.myGameList.map(g => g.id)) + 1;

  listar(): MyGameList[] {
    return [...this.myGameList];
  }

  obterPorId(id: number): MyGameList | undefined {
    return this.myGameList.find(jogo => jogo.id === id);
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
