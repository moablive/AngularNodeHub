import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      // Define os campos do formulário e suas validações
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
    });
  }

  async onSubmit(): Promise<void> {
    this.errorMessage = null; // Limpa erros antigos
    if (this.loginForm.invalid) {
      // Marca os campos como "tocados" para exibir as mensagens de erro
      this.loginForm.markAllAsTouched();
      return;
    }

    try {
      await this.authService.login(this.loginForm.value);
      this.router.navigate(['/']);
    } catch (error) {
      this.errorMessage = 'Email ou senha incorretos. Tente novamente.';
      console.error(error);
    }
  }
}
