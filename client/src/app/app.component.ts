import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  private  accountService = inject(AccountService);
  title = 'DatingApp';
  users:any;

  ngOnInit(): void {
    this.getUsers();
    this.SetCurrentUser();
  }

  SetCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const users = JSON.parse(userString);
    this.accountService.curentUser.set(users);
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (response) => this.users = response,
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }
    })
  }
}