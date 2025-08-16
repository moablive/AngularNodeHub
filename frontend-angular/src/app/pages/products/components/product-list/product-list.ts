import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { IProduct } from '../../../../interfaces/IProduct';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductList implements OnInit {
  
  public isLoading = true;
  public errorMessage: string | null = null;
  public products: IProduct[] = [];

  // Propriedades existentes para a modal de exclusão
  public showConfirmationModal = false;
  public productToDelete: IProduct | null = null;

  // Propriedades para a nova modal de detalhes
  public showDetailsModal = false;
  public selectedProduct: IProduct | null = null;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = null;
    try {
      this.products = await this.productService.getAllProducts();
    } catch (error: any) {
      this.errorMessage = 'Falha ao carregar os produtos. Verifique sua conexão ou tente novamente mais tarde.';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  editProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  // Métodos da modal de exclusão (sem alterações)
  openDeleteModal(product: IProduct): void {
    this.productToDelete = product;
    this.showConfirmationModal = true;
  }
  
  cancelDelete(): void {
    this.productToDelete = null;
    this.showConfirmationModal = false;
  }

  async deleteConfirmed(): Promise<void> {
    if (this.productToDelete) {
      try {
        await this.productService.deleteProduct(this.productToDelete.id);
        this.products = this.products.filter(p => p.id !== this.productToDelete?.id);
      } catch (err) {
        console.error('Falha ao remover produto:', err);
        this.errorMessage = 'Falha ao remover produto. Tente novamente.';
      } finally {
        this.cancelDelete();
      }
    }
  }

  /**
   * Abre a modal de detalhes para um produto específico.
   */
  openDetailsModal(product: IProduct): void {
    this.selectedProduct = product;
    this.showDetailsModal = true;
  }

  /**
   * Fecha a modal de detalhes.
   */
  closeDetailsModal(): void {
    this.selectedProduct = null;
    this.showDetailsModal = false;
  }
}