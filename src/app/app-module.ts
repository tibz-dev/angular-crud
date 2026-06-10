import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
// ── PrimeNG Module Imports ────────────────────────────────
import { TableModule } from 'primeng/table';           // p-table
import { ButtonModule } from 'primeng/button';         // p-button
import { DialogModule } from 'primeng/dialog';         // p-dialog
import { InputTextModule } from 'primeng/inputtext';   // pInputText
import { InputNumberModule } from 'primeng/inputnumber'; // p-inputnumber
import { ToolbarModule } from 'primeng/toolbar';       // p-toolbar
import { ConfirmDialogModule } from 'primeng/confirmdialog'; // p-confirmDialog
import { ToastModule } from 'primeng/toast';           // p-toast (notifications)
import { TagModule } from 'primeng/tag';               // p-tag (category badge)
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

// ── PrimeNG Services ──────────────────────────────────────
import { ConfirmationService, MessageService } from 'primeng/api';

import { App } from './app';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

@NgModule({
  declarations: [
    App,
    ProductListComponent,
    ProductFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,   // Required for PrimeNG animations
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // ── PrimeNG Modules ──────────────────────────────────
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    ToolbarModule,
    ConfirmDialogModule,
    ToastModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
  ],
  providers: [
    ConfirmationService,  // Required by p-confirmDialog
    MessageService,       // Required by p-toast
    providePrimeNG({
    theme: {
      preset: Aura,
      options: { darkModeSelector: false }
    }
  })  // Set the PrimeNG theme to Aura  
  ],
  bootstrap: [App]
})
export class AppModule {}