// ============================================================
// ANGULAR COMPONENTS + LIFECYCLE HOOKS
//
// LIFECYCLE HOOK: ngOnInit
//   Called once after Angular has initialised the component
//   and set all @Input() properties. Ideal for loading data.
//   Must implement the OnInit interface to use it.
//
// DEPENDENCY INJECTION:
//   ProductService is injected via the constructor.
//   Angular's DI system provides the singleton instance —
//   no need to call "new ProductService()".
// ============================================================

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

  // ── Component State ───────────────────────────────────────
  products: Product[] = [];           // Holds the displayed list
  selectedProduct: Product | null = null; // Product being edited (null = new)
  showForm = false;                   // Toggles form visibility

  // ── Dependency Injection ──────────────────────────────────
  // Angular injects ProductService automatically at runtime
  constructor(private productService: ProductService) {}

  // ── Lifecycle Hook: ngOnInit ──────────────────────────────
  // Runs once after component creation — perfect for data loading
  ngOnInit(): void {
    this.loadProducts();
  }

  // ── Helper: Load / Refresh List ──────────────────────────
  loadProducts(): void {
    this.products = this.productService.getAll(); // READ from service
  }

  // ── CREATE: Show blank form ───────────────────────────────
  onAdd(): void {
    this.selectedProduct = null; // Null signals "new product" to the form
    this.showForm = true;
  }

  // ── UPDATE: Show form pre-filled with selected product ────
  // Spread { ...product } creates a copy so the original
  // in the array is not mutated before the user saves
  onEdit(product: Product): void {
    this.selectedProduct = { ...product };
    this.showForm = true;
  }

  // ── DELETE: Remove product after confirmation ─────────────
  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(id);
      this.loadProducts(); // Refresh list after deletion
    }
  }

  // ── SAVE: Called by child form via @Output EventEmitter ───
  // If selectedProduct exists → UPDATE, otherwise → CREATE
  onSave(data: Omit<Product, 'id'>): void {
    if (this.selectedProduct) {
      // UPDATE: pass existing id + new form data
      this.productService.update(this.selectedProduct.id, data);
    } else {
      // CREATE: service assigns a new id automatically
      this.productService.create(data);
    }
    this.showForm = false;
    this.selectedProduct = null;
    this.loadProducts(); // Refresh list after save
  }

  // ── CANCEL: Hide form without saving ─────────────────────
  onCancel(): void {
    this.showForm = false;
    this.selectedProduct = null;
  }
}