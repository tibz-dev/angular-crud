import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  selectedProduct: Product | null = null;
  showForm = false;
  isLoading = false;   // Shows loading state while API responds
  errorMessage = '';   // Displays API errors to the user

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // ── Subscribe to Observable to get data ──────────────────
  // .subscribe() has two callbacks:
  //   next  — runs when data arrives successfully
  //   error — runs when the HTTP request fails
  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;   // Assign API response to array
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load products.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onAdd(): void {
    this.selectedProduct = null;
    this.showForm = true;
  }

  onEdit(product: Product): void {
    this.selectedProduct = { ...product };
    this.showForm = true;
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      // Subscribe to the delete Observable to trigger the request
      this.productService.delete(id).subscribe({
        next: () => this.loadProducts(),
        error: (err) => {
          this.errorMessage = 'Failed to delete product.';
          console.error(err);
        }
      });
    }
  }

  onSave(data: Omit<Product, 'id'>): void {
    if (this.selectedProduct) {
      // UPDATE — subscribe to trigger the PUT request
      this.productService.update(this.selectedProduct.id, data).subscribe({
        next: () => {
          this.showForm = false;
          this.selectedProduct = null;
          this.loadProducts();
        },
        error: (err) => {
          this.errorMessage = 'Failed to update product.';
          console.error(err);
        }
      });
    } else {
      // CREATE — subscribe to trigger the POST request
      this.productService.create(data).subscribe({
        next: () => {
          this.showForm = false;
          this.loadProducts();
        },
        error: (err) => {
          this.errorMessage = 'Failed to create product.';
          console.error(err);
        }
      });
    }
  }

  onCancel(): void {
    this.showForm = false;
    this.selectedProduct = null;
    this.errorMessage = '';
  }
}