import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {root} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/login').then(r => {
        console.log("Logout succeeded");
      })
    })
  }
}
