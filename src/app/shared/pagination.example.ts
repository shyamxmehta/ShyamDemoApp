// Got it! If your data doesn't come from an API with built-in pagination (e.g., you have a static dataset or the data comes from a service but doesn't include pagination), you can handle pagination entirely within your Angular component.

// Here’s how you can paginate a dataset in the frontend when you are using the async pipe:

// Steps:
// Component:
// Manually paginate the data in the component by slicing your dataset based on the current page and page size.
// Template:
// Use the async pipe to display paginated data in the template.
// Add buttons for pagination controls (Next, Previous, etc.).
// Example:
// Let’s assume you have a large dataset in memory, and you want to paginate it on the frontend.

// 1. Component:
// typescript
// Copy code
// import { Component, OnInit } from '@angular/core';
// import { Observable, of } from 'rxjs';

// @Component({
//   selector: 'app-paginated-list',
//   templateUrl: './paginated-list.component.html',
// })
// export class PaginatedListComponent implements OnInit {
//   // Assume we have a large static dataset
//   private allData: any[] = Array.from({ length: 100 }, (_, i) => ({ id: i, name: `Item ${i + 1}` }));

//   // Pagination variables
//   page = 1;        // Current page
//   pageSize = 10;   // Items per page
//   totalItems = 100; // Total number of items
//   paginatedData$: Observable<any[]>;

//   constructor() {}

//   ngOnInit() {
//     this.loadPage();
//   }

//   loadPage() {
//     const startIndex = (this.page - 1) * this.pageSize;
//     const endIndex = startIndex + this.pageSize;
//     const paginatedData = this.allData.slice(startIndex, endIndex);
//     this.paginatedData$ = of(paginatedData);  // Wrap paginated data in an observable
//   }

//   nextPage() {
//     if ((this.page * this.pageSize) < this.totalItems) {
//       this.page++;
//       this.loadPage();
//     }
//   }

//   previousPage() {
//     if (this.page > 1) {
//       this.page--;
//       this.loadPage();
//     }
//   }

//   goToPage(pageNumber: number) {
//     if (pageNumber >= 1 && pageNumber <= Math.ceil(this.totalItems / this.pageSize)) {
//       this.page = pageNumber;
//       this.loadPage();
//     }
//   }
// }


// 2. Template:
// html
// Copy code
// <div *ngIf="paginatedData$ | async as paginatedData; else loading">
//   <ul>
//     <li *ngFor="let item of paginatedData">{{ item.name }}</li>
//   </ul>

//   <!-- Pagination controls -->
//   <div class="pagination">
//     <button (click)="previousPage()" [disabled]="page === 1">Previous</button>
    
//     <!-- Page numbers -->
//     <button *ngFor="let pageNumber of [].constructor(Math.ceil(totalItems / pageSize)); let i = index" 
//             (click)="goToPage(i + 1)" 
//             [class.active]="i + 1 === page">
//       {{ i + 1 }}
//     </button>
    
//     <button (click)="nextPage()" [disabled]="page === Math.ceil(totalItems / pageSize)">Next</button>
//   </div>
  
//   <div class="page-info">
//     Page {{ page }} of {{ totalItems / pageSize | ceil }}
//   </div>
// </div>

// <ng-template #loading>
//   <p>Loading...</p>
// </ng-template>
// Key Concepts:
// Paginate Data Manually: The loadPage method slices the allData array based on the current page and page size, which is essentially how pagination works. We calculate the startIndex and endIndex to slice the dataset accordingly.

// Observable: The paginatedData$ is an Observable<any[]> which is what Angular's async pipe subscribes to in the template. We use of(paginatedData) to wrap the sliced array as an observable, which can be asynchronously handled by the template.

// Pagination Controls:

// Previous & Next: The previousPage and nextPage methods increment or decrement the current page number.
// Go to specific page: The goToPage method is used for navigation to a specific page, which is helpful if you want page number buttons.
// Disabled buttons: The "Previous" button is disabled when on the first page, and the "Next" button is disabled when on the last page.
// Dynamic Page Numbers: The *ngFor loop creates page number buttons dynamically based on the total number of pages (Math.ceil(totalItems / pageSize)).

// CSS Classes for Active Page: You can highlight the active page by adding a class ([class.active]="i + 1 === page") to the buttons, which makes it clear which page is currently being viewed.

// Example Enhancements:
// Custom Pagination Controls: You can customize the pagination controls further to include options like "First", "Last", or "Go to page".

// Responsive Pagination: You can enhance the design of pagination buttons to make it responsive for different screen sizes or use a dropdown for larger datasets.

// Error Handling: If your data comes from a service (e.g., a database or file), make sure to handle errors (e.g., network errors) gracefully.

// Final Thoughts:
// This example demonstrates how to paginate data on the frontend when the data itself doesn't come with built-in pagination support from an API. This approach uses Angular’s async pipe to handle the observable, along with manual pagination logic inside the component to slice the data accordingly.