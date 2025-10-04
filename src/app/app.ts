import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TenderItem {
  id: number;
  quantity: number;
  estimateRate: number;
  fullRate: number;
  contractorRate: number;
}

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   template: `
   


//     <div class="container">
//       <div class="header-card">
//         <div class="header-content">
//           <h1>{{ t['title'] }}</h1>
//           <button class="lang-btn" (click)="toggleLanguage()">
//             🌐 {{ lang === 'en' ? 'हिंदी' : 'English' }}
//           </button>
//         </div>

//         <div class="percentage-section">
//           <label>{{ t['percentage'] }}:</label>
//           <input 
//             type="number" 
//             [(ngModel)]="percentage" 
//             (ngModelChange)="updateAllContractorRates()"
//             class="percentage-input"
//             placeholder="0"
//             step="0.01"
//           />
//           <span>%</span>
//           <div class="help-text">
//             {{ t['percentageHelp'] }}
//           </div>
//         </div>

//         <button class="add-btn" (click)="addItem()">
//           ➕ {{ t['addItem'] }}
//         </button>
//       </div>

//       <div *ngIf="items.length === 0" class="no-data">
//         {{ t['noData'] }}
//       </div>

//       <div *ngIf="items.length > 0" class="table-card">
//         <div class="table-wrapper">
//           <table>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>{{ t['quantity'] }}</th>
//                 <th>{{ t['estimateRate'] }}</th>
//                 <th>{{ t['fullRate'] }}</th>
//                 <th>{{ t['contractorRate'] }}</th>
//                 <th>{{ t['actions'] }}</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr *ngFor="let item of items; let i = index">
//                 <td>{{ i + 1 }}</td>
//                 <td>
//                   <input 
//                     type="number" 
//                     [(ngModel)]="item.quantity"
//                     (ngModelChange)="calculateRates(item)"
//                     (input)="preventNegative($event, item, 'quantity')"
//                     class="input-field"
//                     placeholder="0"
//                     min="0"
//                   />
//                 </td>
//                 <td>
//                   <input 
//                     type="number" 
//                     [(ngModel)]="item.estimateRate"
//                     (ngModelChange)="calculateRates(item)"
//                     (input)="preventNegative($event, item, 'estimateRate')"
//                     class="input-field"
//                     placeholder="0"
//                     min="0"
//                   />
//                 </td>
//                 <td>
//                   <div class="rate-display">
//                     ₹ {{ item.fullRate.toFixed(2) }}
//                   </div>
//                 </td>
//                 <td>
//                   <div class="rate-display contractor-rate">
//                     ₹ {{ item.contractorRate.toFixed(2) }}
//                     <span class="diff-badge" [ngClass]="getDiffClass()">
//                       {{ getDifferenceText(item) }}
//                     </span>
//                   </div>
//                 </td>
//                 <td class="text-center">
//                   <button class="delete-btn" (click)="deleteItem(item.id)">
//                     🗑️
//                   </button>
//                 </td>
//               </tr>
//               <tr class="total-row">
//                 <td colspan="3" class="text-right">{{ t['total'] }}:</td>
//                 <td>
//                   <strong>₹ {{ getTotalFullRate().toFixed(2) }}</strong>
//                 </td>
//                 <td>
//                   <strong>₹ {{ getTotalContractorRate().toFixed(2) }}</strong>
//                   <span class="total-diff" [ngClass]="getDiffClass()">
//                     ({{ getTotalDifference() }})
//                   </span>
//                 </td>
//                 <td></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   `,
//   styles: [`
//     * {
//       margin: 0;
//       padding: 0;
//       box-sizing: border-box;
//     }

//     .container {
//       min-height: 100vh;
//       background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//       padding: 20px;
//       font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//     }

//     .header-card {
//       background: white;
//       border-radius: 10px;
//       padding: 30px;
//       margin-bottom: 20px;
//       box-shadow: 0 10px 30px rgba(0,0,0,0.2);
//     }

//     .header-content {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       margin-bottom: 30px;
//     }

//     h1 {
//       color: #667eea;
//       font-size: 2rem;
//     }

//     .lang-btn {
//       background: #667eea;
//       color: white;
//       border: none;
//       padding: 10px 20px;
//       border-radius: 5px;
//       cursor: pointer;
//       font-size: 1rem;
//       transition: all 0.3s;
//     }

//     .lang-btn:hover {
//       background: #5568d3;
//       transform: translateY(-2px);
//     }

//     .percentage-section {
//       display: flex;
//       align-items: center;
//       gap: 15px;
//       margin-bottom: 20px;
//     }

//     .percentage-section label {
//       font-size: 1.1rem;
//       font-weight: 600;
//       color: #333;
//     }

//     .percentage-input {
//       width: 120px;
//       padding: 10px;
//       border: 2px solid #667eea;
//       border-radius: 5px;
//       font-size: 1rem;
//     }

//     .percentage-section span {
//       font-size: 1.1rem;
//       color: #666;
//     }

//     .add-btn {
//       background: #10b981;
//       color: white;
//       border: none;
//       padding: 12px 24px;
//       border-radius: 5px;
//       cursor: pointer;
//       font-size: 1rem;
//       font-weight: 600;
//       transition: all 0.3s;
//     }

//     .add-btn:hover {
//       background: #059669;
//       transform: translateY(-2px);
//     }

//     .no-data {
//       background: white;
//       border-radius: 10px;
//       padding: 60px;
//       text-align: center;
//       color: #666;
//       font-size: 1.2rem;
//       box-shadow: 0 10px 30px rgba(0,0,0,0.2);
//     }

//     .table-card {
//       background: white;
//       border-radius: 10px;
//       overflow: hidden;
//       box-shadow: 0 10px 30px rgba(0,0,0,0.2);
//     }

//     table {
//       width: 100%;
//       border-collapse: collapse;
//     }

//     thead {
//       background: #667eea;
//       color: white;
//     }

//     th {
//       padding: 15px;
//       text-align: left;
//       font-weight: 600;
//     }

//     tbody tr {
//       border-bottom: 1px solid #e5e7eb;
//       transition: background 0.2s;
//     }

//     tbody tr:hover {
//       background: #f9fafb;
//     }

//     td {
//       padding: 12px 15px;
//     }

//     .input-field {
//       width: 100%;
//       padding: 8px;
//       border: 1px solid #d1d5db;
//       border-radius: 4px;
//       font-size: 0.95rem;
//     }

//     .input-field:focus {
//       outline: none;
//       border-color: #667eea;
//     }

//     .readonly {
//       background: #f3f4f6;
//       cursor: not-allowed;
//     }

//     .contractor {
//       background: #d1fae5;
//     }

//     .delete-btn {
//       background: #ef4444;
//       color: white;
//       border: none;
//       padding: 8px 12px;
//       border-radius: 4px;
//       cursor: pointer;
//       transition: all 0.3s;
//     }

//     .delete-btn:hover {
//       background: #dc2626;
//     }

//     .text-center {
//       text-align: center;
//     }

//     .text-right {
//       text-align: right;
//       font-weight: 600;
//       font-size: 1.1rem;
//     }

//     .total-row {
//       background: #ede9fe;
//       font-weight: bold;
//     }

//     .total-row td {
//       padding: 20px 15px;
//       font-size: 1.1rem;
//     }

//     input[type="number"]::-webkit-inner-spin-button,
//     input[type="number"]::-webkit-outer-spin-button {
//       opacity: 1;
//     }
//   `]
// })
// export class AppComponent {
//   lang: string = 'en';
//   percentage: number = 0;
//   items: TenderItem[] = [];
//   nextId: number = 1;

//   translations: Translations = {
//     en: {
//       title: 'Tender Calculator',
//       addItem: 'Add Item',
//       quantity: 'Quantity',
//       estimateRate: 'Estimate Rate',
//       fullRate: 'Full Rate',
//       contractorRate: 'Contractor Rate',
//       percentage: 'Contractor Percentage (%)',
//       total: 'Total',
//       actions: 'Actions',
//       noData: 'No items added yet. Click "Add Item" to start.',
//       percentageHelp: 'Positive % = Discount (lower rate) | Negative % = Markup (higher rate). Note: Quantity & Rate cannot be negative.',
//     },
//     hi: {
//       title: 'टेंडर कैलकुलेटर',
//       addItem: 'आइटम जोड़ें',
//       quantity: 'मात्रा',
//       estimateRate: 'अनुमानित दर',
//       fullRate: 'पूर्ण दर',
//       contractorRate: 'ठेकेदार दर',
//       percentage: 'ठेकेदार प्रतिशत (%)',
//       total: 'कुल',
//       actions: 'क्रियाएं',
//       noData: 'अभी तक कोई आइटम नहीं जोड़ा गया। शुरू करने के लिए "आइटम जोड़ें" पर क्लिक करें।',
//       percentageHelp: 'धनात्मक % = छूट (कम दर) | ऋणात्मक % = वृद्धि (अधिक दर). नोट: मात्रा और दर ऋणात्मक नहीं हो सकते।',
//     }
//   };

//   get t() {
//     return this.translations[this.lang];
//   }

//   toggleLanguage() {
//     this.lang = this.lang === 'en' ? 'hi' : 'en';
//   }

//   addItem() {
//     this.items.push({
//       id: this.nextId++,
//       quantity: 0,
//       estimateRate: 0,
//       fullRate: 0,
//       contractorRate: 0
//     });
//   }

//   deleteItem(id: number) {
//     this.items = this.items.filter(item => item.id !== id);
//   }

//   preventNegative(event: any, item: TenderItem, field: 'quantity' | 'estimateRate') {
//     const value = parseFloat(event.target.value);
//     if (value < 0 || event.target.value === '-') {
//       if (field === 'quantity') {
//         item.quantity = 0;
//       } else if (field === 'estimateRate') {
//         item.estimateRate = 0;
//       }
//       event.target.value = '0';
//     }
//   }

//   calculateRates(item: TenderItem) {
//     // Calculate Full Rate
//     item.fullRate = item.quantity * item.estimateRate;
    
//     // Calculate Contractor Rate based on percentage
//     // Positive percentage = discount (subtract)
//     // Negative percentage = markup (add)
//     item.contractorRate = item.fullRate - (item.fullRate * this.percentage / 100);
//   }

//   updateAllContractorRates() {
//     this.items.forEach(item => {
//       // Recalculate contractor rate with new percentage
//       item.contractorRate = item.fullRate - (item.fullRate * this.percentage / 100);
//     });
//   }

//   getDifferenceText(item: TenderItem): string {
//     const diff = item.fullRate - item.contractorRate;
//     const sign = diff >= 0 ? '-' : '+';
//     return `${sign}₹${Math.abs(diff).toFixed(2)}`;
//   }

//   getDiffClass(): string {
//     return this.percentage >= 0 ? 'positive' : 'negative';
//   }

//   getTotalFullRate(): number {
//     return this.items.reduce((sum, item) => sum + item.fullRate, 0);
//   }

//   getTotalContractorRate(): number {
//     return this.items.reduce((sum, item) => sum + item.contractorRate, 0);
//   }

//   getTotalDifference(): string {
//     const totalFull = this.getTotalFullRate();
//     const totalContractor = this.getTotalContractorRate();
//     const diff = totalFull - totalContractor;
//     const sign = diff >= 0 ? '-' : '+';
//     return `${sign}₹${Math.abs(diff).toFixed(2)}`;
//   }
// }

// ...existing code...
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="header-card">
        <div class="header-content">
          <h1>{{ t['title'] }}</h1>
          <button class="lang-btn" (click)="toggleLanguage()">
            🌐 {{ lang === 'en' ? 'हिंदी' : 'English' }}
          </button>
        </div>

        <div class="percentage-section">
          <label>{{ t['percentage'] }}:</label>
          <input 
            type="number" 
            [(ngModel)]="percentage" 
            (ngModelChange)="updateAllContractorRates()"
            class="percentage-input"
            placeholder="0"
            step="0.01"
          />
          <span>%</span>
          <div class="help-text">
            {{ t['percentageHelp'] }}
          </div>
        </div>

        <button class="add-btn" (click)="addItem()">
          ➕ {{ t['addItem'] }}
        </button>
      </div>

      <div *ngIf="items.length === 0" class="no-data">
        {{ t['noData'] }}
      </div>

      <div *ngIf="items.length > 0" class="table-card">
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>{{ t['quantity'] }}</th>
                <th>{{ t['estimateRate'] }}</th>
                <th>{{ t['fullRate'] }}</th>
                <th>{{ t['contractorRate'] }}</th>
                <th>{{ t['actions'] }}</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of items; let i = index">
                <td>{{ i + 1 }}</td>
                <td>
                  <input 
                    type="number" 
                    [(ngModel)]="item.quantity"
                    (ngModelChange)="calculateRates(item)"
                    (input)="preventNegative($event, item, 'quantity')"
                    class="input-field"
                    placeholder="0"
                    
                  />
                </td>
                <td>
                  <input 
                    type="number" 
                    [(ngModel)]="item.estimateRate"
                    (ngModelChange)="calculateRates(item)"
                    (input)="preventNegative($event, item, 'estimateRate')"
                    class="input-field"
                    placeholder="0"
                    
                  />
                </td>
                <td>
                  <div class="rate-display">
                    ₹ {{ item.fullRate.toFixed(2) }}
                  </div>
                </td>
                <td>
                  <div class="rate-display contractor-rate">
                    ₹ {{ item.contractorRate.toFixed(2) }}
                    <span class="diff-badge" [ngClass]="getDiffClass()">
                      {{ getDifferenceText(item) }}
                    </span>
                  </div>
                </td>
                <td class="text-center">
                  <button class="delete-btn" (click)="deleteItem(item.id)">
                    🗑️
                  </button>
                </td>
              </tr>
              <tr class="total-row">
                <td colspan="3" class="text-right">{{ t['total'] }}:</td>
                <td>
                  <strong>₹ {{ getTotalFullRate().toFixed(2) }}</strong>
                </td>
                <td>
                  <strong>₹ {{ getTotalContractorRate().toFixed(2) }}</strong>
                  <span class="total-diff" [ngClass]="getDiffClass()">
                    ({{ getTotalDifference() }})
                  </span>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Footer Section -->
      <footer class="footer">
        <div class="footer-content">
          Developed by Bhuwan Paneru, © {{ currentYear }} Tender Calculator. All rights reserved.
        </div>
      </footer>
    </div>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .header-card {
      background: white;
      border-radius: 10px;
      padding: 30px;
      margin-bottom: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      flex-wrap: wrap;
      gap: 10px;
    }

    h1 {
      color: #667eea;
      font-size: 2rem;
      word-break: break-word;
    }

    .lang-btn {
      background: #667eea;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s;
      min-width: 100px;
    }

    .lang-btn:hover {
      background: #5568d3;
      transform: translateY(-2px);
    }

    .percentage-section {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .percentage-section label {
      font-size: 1.1rem;
      font-weight: 600;
      color: #333;
      min-width: 160px;
    }

    .percentage-input {
      width: 120px;
      padding: 10px;
      border: 2px solid #667eea;
      border-radius: 5px;
      font-size: 1rem;
      min-width: 80px;
    }

    .percentage-section span {
      font-size: 1.1rem;
      color: #666;
    }

    .help-text {
      font-size: 0.95rem;
      color: #888;
      margin-top: 5px;
      flex-basis: 100%;
    }

    .add-btn {
      background: #10b981;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s;
      margin-top: 10px;
      min-width: 120px;
    }

    .add-btn:hover {
      background: #059669;
      transform: translateY(-2px);
    }

    .no-data {
      background: white;
      border-radius: 10px;
      padding: 60px;
      text-align: center;
      color: #666;
      font-size: 1.2rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      margin-bottom: 20px;
    }

    .table-card {
      background: white;
      border-radius: 10px;
      overflow: auto;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      margin-bottom: 20px;
    }

    .table-wrapper {
      width: 100%;
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 600px;
    }

    thead {
      background: #667eea;
      color: white;
    }

    th {
      padding: 15px;
      text-align: left;
      font-weight: 600;
      font-size: 1rem;
      white-space: nowrap;
    }

    tbody tr {
      border-bottom: 1px solid #e5e7eb;
      transition: background 0.2s;
    }

    tbody tr:hover {
      background: #f9fafb;
    }

    td {
      padding: 12px 15px;
      font-size: 0.98rem;
      vertical-align: middle;
    }

    .input-field {
      width: 100%;
      padding: 8px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      font-size: 0.95rem;
      min-width: 60px;
    }

    .input-field:focus {
      outline: none;
      border-color: #667eea;
    }

    .readonly {
      background: #f3f4f6;
      cursor: not-allowed;
    }

    .contractor {
      background: #d1fae5;
    }

    .delete-btn {
      background: #ef4444;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
      min-width: 40px;
    }

    .delete-btn:hover {
      background: #dc2626;
    }

    .text-center {
      text-align: center;
    }

    .text-right {
      text-align: right;
      font-weight: 600;
      font-size: 1.1rem;
    }

    .total-row {
      background: #ede9fe;
      font-weight: bold;
    }

    .total-row td {
      padding: 20px 15px;
      font-size: 1.1rem;
    }

    .rate-display {
      min-width: 80px;
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    .contractor-rate {
      font-weight: 600;
      color: #059669;
    }

    .diff-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.85rem;
      margin-left: 4px;
      font-weight: 500;
    }

    .diff-badge.positive {
      background: #d1fae5;
      color: #059669;
    }

    .diff-badge.negative {
      background: #fee2e2;
      color: #dc2626;
    }

    .total-diff {
      font-size: 0.95rem;
      margin-left: 6px;
      font-weight: 500;
    }

    .total-diff.positive {
      color: #059669;
    }

    .total-diff.negative {
      color: #dc2626;
    }

    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      opacity: 1;
    }

    /* Responsive Styles */
    @media (max-width: 900px) {
      .header-card, .table-card, .no-data {
        padding: 18px;
      }
      th, td {
        padding: 8px 6px;
        font-size: 0.95rem;
      }
      .total-row td {
        padding: 12px 6px;
        font-size: 1rem;
      }
      h1 {
        font-size: 1.4rem;
      }
      .add-btn, .lang-btn {
        font-size: 0.95rem;
        padding: 8px 14px;
      }
    }

    @media (max-width: 600px) {
      .container {
        padding: 6px;
      }
      .header-card, .table-card, .no-data {
        padding: 8px;
        margin-bottom: 10px;
      }
      .header-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
      }
      .percentage-section {
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
      }
      .table-wrapper {
        min-width: 0;
        overflow-x: auto;
      }
      table {
        min-width: 400px;
      }
      th, td {
        padding: 6px 3px;
        font-size: 0.92rem;
      }
      .total-row td {
        padding: 8px 3px;
        font-size: 0.95rem;
      }
      .add-btn, .lang-btn {
        font-size: 0.92rem;
        padding: 6px 10px;
      }
    }

    /* Footer Styles */
    .footer {
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.07);
      text-align: center;
      padding: 16px 0;
      margin-top: auto;
      font-size: 1rem;
      color: #dcdde1ff;
      font-weight: 500;
    }

    @media (max-width: 600px) {
      .footer {
        font-size: 0.92rem;
        padding: 10px 0;
      }
    }
  `]
})
export class AppComponent {
  lang: string = 'en';
  percentage: number = 0;
  items: TenderItem[] = [];
  nextId: number = 1;
  currentYear: number = new Date().getFullYear();

  translations: Translations = {
    en: {
      title: 'Tender Calculator',
      addItem: 'Add Item',
      quantity: 'Quantity',
      estimateRate: 'Estimate Rate',
      fullRate: 'Full Rate',
      contractorRate: 'Contractor Rate',
      percentage: 'Contractor Percentage (%)',
      total: 'Total',
      actions: 'Actions',
      noData: 'No items added yet. Click "Add Item" to start.',
      percentageHelp: 'Positive % = Discount (lower rate) | Negative % = Markup (higher rate). Note: Quantity & Rate cannot be negative.',
    },
    hi: {
      title: 'टेंडर कैलकुलेटर',
      addItem: 'आइटम जोड़ें',
      quantity: 'मात्रा',
      estimateRate: 'अनुमानित दर',
      fullRate: 'पूर्ण दर',
      contractorRate: 'ठेकेदार दर',
      percentage: 'ठेकेदार प्रतिशत (%)',
      total: 'कुल',
      actions: 'क्रियाएं',
      noData: 'अभी तक कोई आइटम नहीं जोड़ा गया। शुरू करने के लिए "आइटम जोड़ें" पर क्लिक करें।',
      percentageHelp: 'धनात्मक % = छूट (कम दर) | ऋणात्मक % = वृद्धि (अधिक दर). नोट: मात्रा और दर ऋणात्मक नहीं हो सकते।',
    }
  };

  get t() {
    return this.translations[this.lang];
  }

  toggleLanguage() {
    this.lang = this.lang === 'en' ? 'hi' : 'en';
  }

  addItem() {
    this.items.push({
      id: this.nextId++,
      quantity: null as unknown as number,
      estimateRate: null as unknown as number,
      fullRate: 0,
      contractorRate: 0
    });
  }

  deleteItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
  }

  preventNegative(event: any, item: TenderItem, field: 'quantity' | 'estimateRate') {
    const value = parseFloat(event.target.value);
    if (value < 0 || event.target.value === '-') {
      if (field === 'quantity') {
        item.quantity = 0;
      } else if (field === 'estimateRate') {
        item.estimateRate = 0;
      }
      event.target.value = '0';
    }
  }

  calculateRates(item: TenderItem) {
    item.fullRate = item.quantity * item.estimateRate;
    item.contractorRate = item.fullRate - (item.fullRate * this.percentage / 100);
  }

  updateAllContractorRates() {
    this.items.forEach(item => {
      item.contractorRate = item.fullRate - (item.fullRate * this.percentage / 100);
    });
  }

  getDifferenceText(item: TenderItem): string {
    const diff = item.fullRate - item.contractorRate;
    const sign = diff >= 0 ? '-' : '+';
    return `${sign}₹${Math.abs(diff).toFixed(2)}`;
  }

  getDiffClass(): string {
    return this.percentage >= 0 ? 'positive' : 'negative';
  }

  getTotalFullRate(): number {
    return this.items.reduce((sum, item) => sum + item.fullRate, 0);
  }

  getTotalContractorRate(): number {
    return this.items.reduce((sum, item) => sum + item.contractorRate, 0);
  }

  getTotalDifference(): string {
    const totalFull = this.getTotalFullRate();
    const totalContractor = this.getTotalContractorRate();
    const diff = totalFull - totalContractor;
    const sign = diff >= 0 ? '-' : '+';
    return `${sign}₹${Math.abs(diff).toFixed(2)}`;
  }
}

