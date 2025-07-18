import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MyGameList } from "../models/mygamelist.model";

@Injectable({
  providedIn: "root"
})
export class MygamelistService {
  private readonly apiUrl = 'http://localhost:3000/api/games';

  constructor(private http: HttpClient) {}

  listar(): Observable<MyGameList[]> {
    return this.http.get<MyGameList[]>(this.apiUrl);
  }

  obterPorId(id: number): Observable<MyGameList> {
    return this.http.get<MyGameList>(`${this.apiUrl}/${id}`);
  }

  adicionar(jogo: MyGameList): Observable<MyGameList> {
    return this.http.post<MyGameList>(this.apiUrl, jogo);
  }

  atualizar(id: number, jogo: MyGameList): Observable<MyGameList> {
    return this.http.put<MyGameList>(`${this.apiUrl}/${id}`, jogo);
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  autocomplete(query: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/autocomplete?q=${encodeURIComponent(query)}`);
  }
}
