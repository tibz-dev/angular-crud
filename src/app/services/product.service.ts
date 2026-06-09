// ============================================================
// ANGULAR SERVICES & DEPENDENCY INJECTION
//
// A Service is a class that holds business logic and data,
// kept separate from components (separation of concerns).
//
// @Injectable({ providedIn: 'root' }) registers this service
// in the ROOT INJECTOR — meaning Angular creates ONE shared
// instance (singleton) available to the entire application.
//
// DEPENDENCY INJECTION (DI): Instead of components creating
// their own instances with "new ProductService()", Angular
// automatically injects the shared instance via the constructor.
// ============================================================

import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'  // Registers service at root level (singleton)
})
export class ProductService {

  // Private in-memory array simulates a database
  // In a real app this would be replaced by HttpClient API calls
  private products: Product[] = [
    { id: 1, name: 'Laptop',     price: 12000, category: 'Electronics' },
    { id: 2, name: 'Desk Chair', price: 3500,  category: 'Furniture'   },
    { id: 3, name: 'Notebook',   price: 150,   category: 'Stationery'  },
  ];

  // Auto-incrementing ID counter (simulates DB auto-increment)
  private nextId = 4;

  // ── READ ──────────────────────────────────────────────────
  // Returns a shallow copy of the array using spread operator
  // so external code cannot directly mutate the private array
  getAll(): Product[] {
    return [...this.products];
  }

  // Find a single product by ID using Array.find()
  getById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  // ── CREATE ────────────────────────────────────────────────
  // Omit<Product, 'id'> means: accept all Product fields
  // EXCEPT 'id' (the service assigns the id automatically)
  create(data: Omit<Product, 'id'>): Product {
    const newProduct = { ...data, id: this.nextId++ }; // spread + assign id
    this.products.push(newProduct);
    return newProduct;
  }

  // ── UPDATE ────────────────────────────────────────────────
  // findIndex returns -1 if no match found (guard against that)
  update(id: number, data: Omit<Product, 'id'>): Product | null {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;              // Product not found
    this.products[index] = { id, ...data };    // Replace with new data
    return this.products[index];
  }

  // ── DELETE ────────────────────────────────────────────────
  // splice(index, 1) removes exactly 1 element at that index
  delete(id: number): boolean {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.products.splice(index, 1);
    return true;
  }
}