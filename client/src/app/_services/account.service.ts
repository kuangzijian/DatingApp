import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/api/';

  curentUser = signal<User | null>(null);

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map(user => {
        if (user){
          localStorage.setItem('user', JSON.stringify(user));
          this.curentUser.set(user);
        }
        return user;
      })
    )
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (user){
          localStorage.setItem('user', JSON.stringify(user));
          this.curentUser.set(user);
        }
        return user;
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.curentUser.set(null);
  }
}