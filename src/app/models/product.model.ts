// ============================================================
// ANGULAR MODULES & COMPONENTS - Data Model (Interface)
// Interfaces define the shape/structure of data objects.
// TypeScript interfaces enforce type safety across the app.
// ============================================================

export interface Product {
  id: number;        // Unique identifier for each product
  name: string;      // Product name
  price: number;     // Product price in Rands
  category: string;  // Product category label
}