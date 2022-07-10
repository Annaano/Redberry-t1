import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  register: string = 'https://chess-tournament-api.devtest.ge/api/register';
  grandmasters: string =
    'https://chess-tournament-api.devtest.ge/api/grandmasters';

  constructor(private http: HttpClient) {}

  getGrandmasters() {
    return this.http.get<any>(this.grandmasters);
  }

  addUser(obj: any) {
    return this.http.post(this.register, obj);
  }
}
