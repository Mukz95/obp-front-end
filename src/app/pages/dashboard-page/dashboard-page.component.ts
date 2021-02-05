import { Component, OnInit } from '@angular/core';
import {ObpApiService} from '../../services/obp-api.service';
import {MatDialog} from '@angular/material/dialog';
import {TotalSpendModalComponent} from '../../components/total-spend-modal/total-spend-modal.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  dataSource = [];

  // dataSource = [  {bankName: 'NATWEST', accountInfo: 'MR GABRIAL SHAS', accountType: 'CURRENT ACCOUNT'},
  //   {bankName: 'HSBC', accountInfo: 'MR GABRIAL SHAS', accountType: 'CURRENT ACCOUNT'},
  //   {bankName: 'NATWEST', accountInfo: 'MR GABRIAL SHAS', accountType: 'SAVINGS ACCOUNT'}];
  displayedColumns: string[] = ['bankName', 'accountInfo', 'accountType', 'action'];
  tokenString: string;
  hideTable = true;
  isDisabled: any;


  constructor(private obpApiService: ObpApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.tokenString = localStorage.getItem('obp-token');
    this.obpApiService.getAccounts(this.tokenString).subscribe(value => {
      value.accounts.forEach(account => {
        this.obpApiService.getBank(account.bank_id, this.tokenString).subscribe(bankData => {
          console.log(bankData.short_name);
          if (account.label === null){
            account.label = 'Unavailable';
          }

          if (account.account_type === ''){
            account.account_type = 'Unavailable';
          }

          this.dataSource.push({bankName: bankData.short_name, accountInfo: account.label, accountType: account.account_type});
        });
      });
    });
    }


  getLinkedAccounts() {
    // this.obpApiService.getBank(this.tokenString).subscribe(value => {
    //   console.log(value);
    // });
    this.hideTable = false;
  }

  openRecurringTransactionModal() {
    const dialogRef = this.dialog.open(TotalSpendModalComponent, {width: '70vw'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
