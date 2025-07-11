import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JogosService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  searchGames(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/autocomplete?q=${encodeURIComponent(query)}`);
  }

  getGameDetails(gameId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/games/${gameId}`);
  }
}