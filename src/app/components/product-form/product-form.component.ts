// ============================================================
// ANGULAR SERVICES & DEPENDENCY INJECTION + REACTIVE FORMS
//
// REACTIVE FORMS (FormBuilder approach):
//   FormBuilder  — service injected via DI to build form groups
//   FormGroup    — groups multiple FormControls together
//   Validators   — built-in validation rules (required, min, etc.)
//
// COMPONENT COMMUNICATION — @Input and @Output:
//   @Input()  — receives data FROM a parent component
//               Parent binds it with [product]="selectedProduct"
//   @Output() — sends events TO a parent component
//               Parent listens with (save)="onSave($event)"
//   EventEmitter — the mechanism used to emit @Output events
//
// LIFECYCLE HOOK: ngOnInit
//   Used here to build the form after @Input() values are ready
// ============================================================

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  // ── @Input: Data flowing IN from parent ──────────────────
  // When editing: parent passes the selected product object
  // When adding:  parent passes null
  @Input() product: Product | null = null;

  // ── @Output: Events flowing OUT to parent ────────────────
  // 'save' emits form data (without id) when user submits
  @Output() save = new EventEmitter<Omit<Product, 'id'>>();
  // 'cancel' emits void (no data) when user cancels
  @Output() cancel = new EventEmitter<void>();

  // FormGroup holds all form controls and their validation state
  form!: FormGroup; // '!' = definite assignment (initialised in ngOnInit)

  // ── Dependency Injection: FormBuilder ────────────────────
  // FormBuilder is an Angular service — injected automatically
  constructor(private fb: FormBuilder) {}

  // ── Lifecycle Hook: ngOnInit ──────────────────────────────
  // @Input() values (product) are available here — safe to
  // use them to pre-populate the form for edit mode
  ngOnInit(): void {
    // fb.group() creates a FormGroup with named controls
    // Each control: [initialValue, Validator(s)]
    // '??' is the nullish coalescing operator:
    //   returns right side only when left side is null/undefined
    this.form = this.fb.group({
      name: [
        this.product?.name ?? '',        // Pre-fill if editing
        Validators.required              // Field must not be empty
      ],
      price: [
        this.product?.price ?? 0,
        [Validators.required, Validators.min(0)] // Must be >= 0
      ],
      category: [
        this.product?.category ?? '',
        Validators.required
      ],
    });
  }

  // ── Submit: emit form value to parent via @Output ─────────
  // Only emits if form passes ALL validators
  onSubmit(): void {
    if (this.form.valid) {
      this.save.emit(this.form.value); // Parent's onSave() receives this
    }
  }

  // ── Cancel: emit cancel event to parent ──────────────────
  onCancel(): void {
    this.cancel.emit(); // Parent's onCancel() hides the form
  }
}