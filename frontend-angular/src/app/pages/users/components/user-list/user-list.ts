// src/app/pages/users/components/user-list/user-list.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../interfaces/user.interface';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  
  users: User[] | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  // Propriedades para a modal de confirmação
  showConfirmationModal = false;
  userToDelete: User | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  async getAllUsers(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      this.users = await this.userService.getAllUsers();
    } catch (err) {
      console.error(err);
      this.error = 'Ocorreu um erro ao carregar os usuários.';
      this.users = null;
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Abre a modal de confirmação para um usuário específico.
   * @param user O usuário a ser deletado.
   */
  confirmDelete(user: User): void {
    this.userToDelete = user;
    this.showConfirmationModal = true;
  }
  
  /**
   * Fecha a modal de confirmação sem remover o usuário.
   */
  cancelDelete(): void {
    this.userToDelete = null;
    this.showConfirmationModal = false;
  }

  /**
   * Efetivamente remove o usuário após a confirmação.
   */
  async deleteConfirmed(): Promise<void> {
    if (this.userToDelete && this.userToDelete.id) {
      try {
        await this.userService.deleteUser(this.userToDelete.id.toString());
        console.log(`Usuário ${this.userToDelete.id} removido com sucesso.`);
        // Recarrega a lista de usuários para atualizar a tabela
        await this.getAllUsers();
      } catch (err) {
        console.error('Falha ao remover usuário:', err);
        this.error = 'Falha ao remover usuário. Tente novamente.';
      } finally {
        this.cancelDelete();
      }
    }
  }

  /**
   * Navega para a página de edição do usuário.
   */
  editUser(user: User): void {
    // Navega para a rota /users/edit/:id
    this.router.navigate(['/users/edit', user.id]);
  }
}
