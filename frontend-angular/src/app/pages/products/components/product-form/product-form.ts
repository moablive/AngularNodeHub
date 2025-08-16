import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

// Serviços e Interfaces
import { ProductService } from '../../../../services/product.service';
import { IProduct } from '../../../../interfaces/IProduct';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.scss']
})

export class ProductForm implements OnInit {
  
  productForm: FormGroup;
  isEditMode = false;
  private productId: number | null = null;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isLoading = false;
  errorMessage: string | null = null;
  imageError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      preco: ['', [Validators.required, Validators.min(0.01)]],
      imagem: [null]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.productId = +id;
        this.loadProductData(this.productId);
      }
    });
  }

  async loadProductData(id: number): Promise<void> {
    this.isLoading = true;
    try {
      const product = await this.productService.getProductById(id);
      this.productForm.patchValue({
        nome: product.nome,
        preco: this.formatNumberToBRL(product.preco) 
      });
      if (product.img_base64) {
        this.imagePreview = product.img_base64;
      }
    } catch (error) {
      this.errorMessage = 'Falha ao carregar os dados do produto.';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Valida o tipo de arquivo para aceitar apenas JPG e PNG.
   */
  onFileChange(event: Event): void {
    this.imageError = null; // Limpa erro anterior
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const allowedTypes = ['image/jpeg', 'image/png'];

      if (!allowedTypes.includes(file.type)) {
        this.imageError = 'Formato de imagem inválido. Por favor, selecione um arquivo JPG ou PNG.';
        this.productForm.patchValue({ imagem: null });
        input.value = ''; // Limpa o campo de seleção de arquivo
        this.imagePreview = null;
        this.selectedFile = null;
        return;
      }

      this.selectedFile = file;
      this.productForm.patchValue({ imagem: this.selectedFile });

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  /**
   * Formata o valor do campo de preço como moeda BRL manualmente.
   */
  formatPrice(event: any): void {
    let value = event.target.value;
    value = value.replace(/\D/g, '');
    
    // Converte para número e formata para BRL
    const numberValue = Number(value) / 100;
    const formattedValue = this.formatNumberToBRL(numberValue);

    this.productForm.get('preco')?.setValue(formattedValue, { emitEvent: false });
  }

  private formatNumberToBRL(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  /**
   * Converte o valor formatado de volta para um número antes de enviar.
   */
  async onSubmit(): Promise<void> {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const formData = new FormData();
    
    // Converte o preço de 'R$ 1.234,56' para um número '1234.56'
    const priceString = this.productForm.get('preco')?.value || '0';
    const priceNumber = priceString.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();

    formData.append('nome', this.productForm.get('nome')?.value);
    formData.append('preco', priceNumber);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    try {
      if (this.isEditMode && this.productId) {
        await this.productService.updateProduct(this.productId, formData);
      } else {
        await this.productService.createProduct(formData);
      }
      this.router.navigate(['/products']);
    } catch (error) {
      this.errorMessage = 'Ocorreu um erro ao salvar o produto. Tente novamente.';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}