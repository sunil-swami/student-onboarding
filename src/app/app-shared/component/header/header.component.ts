import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from 'src/app/app-core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userInfo: any;
  userDisplayName = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    const currentUser: User = JSON.parse(localStorage.getItem('logedInUser'));
    this.userDisplayName =  currentUser.firstName + ' ' + currentUser.lastName;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
