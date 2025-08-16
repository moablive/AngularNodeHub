import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../../../services/user.service';
import { User, UpdateUserData } from '../../../../interfaces/user.interface';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.scss'],
})

export class UserForm implements OnInit {
  userForm!: FormGroup;
  isLoading = false;
  error: string | null = null;
  successMessage: string | null = null;
  
  isEditMode = false;
  private userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      this.isEditMode = !!this.userId;
      this.initializeForm();
    });
  }

  /**
   * Método para centralizar a criação do formulário.
   */
  initializeForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', this.isEditMode ? [Validators.minLength(6)] : [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Lida com a submissão para criar ou atualizar.
   */
  async onSubmit(): Promise<void> {
    this.error = null;
    this.successMessage = null;

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    try {
      // A lógica de verificação aqui agora funcionará corretamente
      if (this.isEditMode && this.userId) {
        // LÓGICA DE ATUALIZAÇÃO
        const userData: UpdateUserData = {};
        const email = this.userForm.get('email')?.value;
        const senha = this.userForm.get('senha')?.value;
        
        if (email) userData.email = email;
        if (senha) userData.senha = senha;

        // Garante que não enviamos um pedido de atualização vazio
        if (Object.keys(userData).length === 0) {
            this.error = "Nenhum campo foi modificado.";
            this.isLoading = false;
            return;
        }

        await this.userService.updateUser(this.userId, userData);
        this.successMessage = 'Utilizador atualizado com sucesso!';

      } else {
        // LÓGICA DE CRIAÇÃO
        await this.userService.register(this.userForm.value);
        this.successMessage = 'Utilizador registado com sucesso!';
      }

      setTimeout(() => {
        this.router.navigate(['/users']);
      }, 2000);

    } catch (err: any) {
      console.error('Erro ao salvar utilizador:', err);
      this.error =
        err.response?.data?.message ||
        `Ocorreu um erro ao ${this.isEditMode ? 'atualizar' : 'registar'} o utilizador.`;
    } finally {
      this.isLoading = false;
    }
  }
}