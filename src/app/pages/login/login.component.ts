import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AuthState } from '../../states/auth.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: AuthService,
    private authState: AuthState,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.api.login(this.form.value).subscribe({
      next: (response) => {

        console.log('Login successful', response);

        this.authState.setToken(response['token']);
        this.authState.setUserId(response['userId']);
        this.router.navigate(['/']);

        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Login failed';
        this.isLoading = false;
      }
    });
  }

}
