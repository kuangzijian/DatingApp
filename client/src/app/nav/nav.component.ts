import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HasRoleDirective } from '../_directives/has-role.directive';

declare var bootstrap: any;

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive, CommonModule, HasRoleDirective],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit, AfterViewInit {
  accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  model: any = {};
  isCollapsed = true;
  
  ngOnInit() {
    // Initialize Bootstrap components
    if (typeof bootstrap !== 'undefined') {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  }

  ngAfterViewInit() {
    // Initialize navbar collapse
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false
      });
    }
  }

  toggleNav() {
    this.isCollapsed = !this.isCollapsed;
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse) {
      if (this.isCollapsed) {
        bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
      } else {
        bootstrap.Collapse.getInstance(navbarCollapse)?.show();
      }
    }
  }
  
  login() {
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
        this.toggleNav(); // Close mobile menu after login
      },
      error: (error) => {
        this.toastr.error(error.error);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    this.toggleNav(); // Close mobile menu after logout
  }
}