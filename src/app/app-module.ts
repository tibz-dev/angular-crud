import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { HttpClientModule } from '@angular/common/http';

// ============================================================
// ANGULAR MODULES — NgModule
// declarations — components that belong to this module
// imports      — other modules this module depends on
// bootstrap    — the root component Angular renders first
// CommonModule — provides *ngIf, *ngFor, and the number pipe
// ReactiveFormsModule — provides FormBuilder and FormGroup
// ============================================================
@NgModule({
  declarations: [
    App,                   // Root component
    ProductListComponent,  // Displays the products table
    ProductFormComponent,  // Add / Edit form
  ],
  imports: [
    BrowserModule,         // Required for browser rendering
    CommonModule,          // *ngIf, *ngFor, number pipe
    AppRoutingModule,      // Router wiring
    FormsModule,           // Template-driven forms
    ReactiveFormsModule,
    HttpClientModule,   // HTTP client for API calls
  ],
  bootstrap: [App]
})
export class AppModule {}