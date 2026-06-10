// ============================================================
// ANGULAR HTTP CLIENT — Connecting to ASP.NET Core API
//
// HttpClient is Angular's built-in service for HTTP requests.
// It must be provided via HttpClientModule in app-module.ts.
//
// All methods now return Observable<T> instead of plain values.
// Observables are lazy streams — nothing happens until you
// subscribe (or use the async pipe in templates).
//
// Each method maps to a REST endpoint:
//   getAll()       → GET    /api/products
//   getById(id)    → GET    /api/products/:id
//   create(data)   → POST   /api/products
//   update(id)     → PUT    /api/products/:id
//   delete(id)     → DELETE /api/products/:id
// ============================================================

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {

  // Base URL of the ASP.NET Core API
  // In production this would come from environment.ts
  private apiUrl = 'http://localhost:5027/api/products';

  // HttpClient injected via DI — same pattern as before
  constructor(private http: HttpClient) {}

  // ── READ ALL ──────────────────────────────────────────────
  // Returns Observable that emits Product[] when API responds
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // ── READ ONE ──────────────────────────────────────────────
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // ── CREATE ────────────────────────────────────────────────
  // POST sends product data as JSON body
  // API returns the created product with its new id
  create(data: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, data);
  }

  // ── UPDATE ────────────────────────────────────────────────
  // PUT sends full product object to /api/products/:id
  update(id: number, data: Omit<Product, 'id'>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, { id, ...data });
  }

  // ── DELETE ────────────────────────────────────────────────
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}