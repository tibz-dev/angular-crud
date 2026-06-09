// ============================================================
// ANGULAR MODULES — NgModule
//
// Every Angular app has at least one module: the ROOT MODULE.
// NgModule is a decorator that groups related building blocks:
//
//  declarations — Components/Directives/Pipes belonging to
//                 this module. Each component must be declared
//                 in exactly ONE module.
//
//  imports      — Other modules whose exported items we need.
//                 BrowserModule    → enables browser rendering
//                 FormsModule      → enables template-driven forms & ngModel
//                 ReactiveFormsModule → enables FormBuilder & FormGroup
//
//  bootstrap    — The ROOT component Angular renders first
//                 (mounts into <app-root> in index.html)
// ============================================================

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

@NgModule({
  declarations: [
    App,                    // Root component
    ProductListComponent,   // Displays the products table
    ProductFormComponent,   // Add / Edit form
  ],
  imports: [
    BrowserModule,          // Required for all browser-based apps
    AppRoutingModule,       // Router module (routes defined separately)
    FormsModule,            // Template-driven forms support
    ReactiveFormsModule,    // Reactive forms support (FormBuilder, Validators)
  ],
  bootstrap: [App]          // Entry-point component
})
export class AppModule {}