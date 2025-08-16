import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  
  // Injetamos o AuthService e o Router para usá-los no nosso componente
  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  /**
   * Um 'getter' que facilita o acesso ao estado de login no template HTML.
   * O template vai chamar this.isLoggedIn para saber se mostra ou não os botões.
   */
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  /**
   * Executa o logout, chama o método do serviço e redireciona o usuário.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  /**
   * Getter que busca o email do usuário a partir do token JWT decodificado.
   */
  get userEmail(): string | null {
    const userData = this.authService.getUserData();
    return userData ? userData.email : null;
  }
}
