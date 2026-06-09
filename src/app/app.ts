// ============================================================
// ANGULAR COMPONENTS — Root Component
//
// A COMPONENT is the core building block of Angular UIs.
// Every component has:
//   selector     — the HTML tag used to place this component
//   templateUrl  — the HTML template file
//   styleUrl     — the CSS file scoped to this component
//
// COMPONENT LIFECYCLE:
// Angular manages component instances through a lifecycle:
//   ngOnChanges  → input properties changed
//   ngOnInit     → component initialised (used in child components below)
//   ngOnDestroy  → component removed from DOM
// ============================================================

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',        // Used as <app-root> in index.html
  standalone: false,           // Belongs to AppModule (not standalone)
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Root component simply hosts the product-list component
  // All logic is delegated to child components (good practice)
}