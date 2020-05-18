import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginDto} from "./dto/LoginDto";
import {AuthService} from "../auth.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginDto: LoginDto;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.loginDto = new LoginDto();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5)
      ]]
    });
    this.loginDto = {
      userName: '',
      password: ''
    }
  }

  login() {
    if (!this.loginForm.valid) return;
    this.loginDto.userName = this.userName;
    this.loginDto.password = this.password;
    this.authService.login(this.loginDto).subscribe(data => {
      if (data) {
        this.router.navigateByUrl('/home').then(() => {
          console.log("Login succeeded");
        })
      } else {
        console.log("Login failed");
      }
    })
  }

  get userName() {
    return this.loginForm.get("userName").value;
  }

  get password() {
    return this.loginForm.get("password").value;
  }


}
