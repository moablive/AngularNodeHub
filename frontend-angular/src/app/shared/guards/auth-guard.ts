import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // O guard chama o método isLoggedIn() do seu serviço
    if (this.authService.isLoggedIn()) {
      // Se o token existe e não está expirado, retorna true.
      return true;
    } else {
      // Se o token não existe ou está expirado, redireciona.
      console.warn('Acesso negado. Usuário não autenticado. Redirecionando para /users/login');
      this.router.navigate(['/users/login']);
      return false;
    }
  }
}