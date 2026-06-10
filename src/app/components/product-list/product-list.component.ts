// ============================================================
// PRIMENG — ProductListComponent
//
// Uses PrimeNG components:
//   p-toolbar       — top action bar
//   p-table         — data table with sorting/filtering
//   p-button        — styled buttons with icons
//   p-confirmDialog — delete confirmation popup
//   p-toast         — success/error notifications
//
// ConfirmationService — triggers the confirm dialog
// MessageService      — triggers toast notifications
// Both are injected via Angular DI
// ============================================================

import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  selectedProduct: Product | null = null;

  // Controls the PrimeNG Dialog visibility
  showDialog = false;

  // Search filter value bound to the table's globalFilter
  searchValue = '';

  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService, // PrimeNG DI
    private messageService: MessageService            // PrimeNG DI
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => this.products = data,
      error: () => this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load products'
      })
    });
  }

  onAdd(): void {
    this.selectedProduct = null;
    this.showDialog = true;
  }

  onEdit(product: Product): void {
    this.selectedProduct = { ...product };
    this.showDialog = true;
  }

  // ── PrimeNG ConfirmationService ───────────────────────────
  // Instead of browser confirm(), we use a styled dialog
  onDelete(product: Product): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete <b>${product.name}</b>?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.delete(product.id).subscribe({
          next: () => {
            this.loadProducts();
            // ── PrimeNG Toast notification ────────────────
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: `${product.name} removed`
            });
          },
          error: () => this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete product'
          })
        });
      }
    });
  }

  onSave(data: Omit<Product, 'id'>): void {
    if (this.selectedProduct) {
      this.productService.update(this.selectedProduct.id, data).subscribe({
        next: () => {
          this.showDialog = false;
          this.loadProducts();
          this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'Product updated successfully'
          });
        },
        error: () => this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update product'
        })
      });
    } else {
      this.productService.create(data).subscribe({
        next: () => {
          this.showDialog = false;
          this.loadProducts();
          this.messageService.add({
            severity: 'success',
            summary: 'Created',
            detail: 'Product added successfully'
          });
        },
        error: () => this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create product'
        })
      });
    }
  }

  onCancel(): void {
    this.showDialog = false;
    this.selectedProduct = null;
  }
}