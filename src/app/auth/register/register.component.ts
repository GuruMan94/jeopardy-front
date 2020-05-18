import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../../_helpers/must-match.validator";
import {RegisterDto} from "./dto/RegisterDto";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  registerDto: RegisterDto;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.registerDto = new RegisterDto();
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(5)
      ]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  register() {
    if (!this.registrationForm.valid) return;
    this.registerDto.userName = this.userName;
    this.registerDto.password = this.password;
    this.registerDto.confirmPassword = this.confirmPassword;
    console.log(this.registerDto);
    this.authService.register(this.registerDto)
      .subscribe(() => {
        this.router.navigateByUrl("/register-success").then(() => {
          console.log("Navigate to register-success ...")
        });
      }, error => {
        console.log("Register failed");
      })
  }

  get userName() {
    return this.registrationForm.get("userName").value;
  }

  get password() {
    return this.registrationForm.get("password").value;
  }

  get confirmPassword() {
    return this.registrationForm.get("confirmPassword").value;
  }
}
