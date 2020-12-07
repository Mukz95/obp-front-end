import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ObpApiService} from '../../services/obp-api.service';
import {MatTableDataSource} from '@angular/material/table';
import {AdvancedLegendComponent, AdvancedPieChartComponent, reduceTicks} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-recurring-tran-modal',
  templateUrl: './total-spend-modal.component.html',
  styleUrls: ['./total-spend-modal.component.css']
})
export class TotalSpendModalComponent implements OnInit {

  @ViewChild(AdvancedPieChartComponent) child: AdvancedPieChartComponent;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['date', 'description', 'category', 'amount'];

  single = [];


  view: any[] = [1000, 500];

  // options
  gradient = true;

  colorScheme = {
    domain: ['#0228FA', '#FA0202', '#FA7A02', '#28FA02', '#A702FA', '#FA02DC', '#E5FF07', '#07FFF0' ]
  };
  isLoading = true;


  constructor(private obpApiService: ObpApiService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {

    const transactionList = [];
    this.obpApiService.getTransactions().subscribe(transactions =>{
      transactions.forEach(transaction => {
        transactionList.push({date: transaction.completed,
          description: transaction.description,
          category: transaction.category,
          amount: (transaction.value.amount / 100).toFixed(2)});
      });
      this.dataSource.data = transactionList;
      this.categoryTotaller();
      this.isLoading = false;

    });
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));

  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  private categoryTotaller(){
    let billsTotal = 0;
    let shoppingTotal = 0;
    let eatingOutTotal = 0;
    let entertainmentTotal = 0;
    let financeTotal = 0;
    let generalTotal = 0;
    let transportTotal = 0
    let groceriesTotal = 0;
    let pcTotal = 0;
    const billsList = this.dataSource.data.filter(val => val.category === 'Bills');
    const shoppingList = this.dataSource.data.filter(val => val.category === 'Shopping');
    const eatingOutList = this.dataSource.data.filter(val => val.category === 'Eating Out');
    const entertainmentList = this.dataSource.data.filter(val => val.category === 'Entertainment');
    const financeList = this.dataSource.data.filter(val => val.category === 'Finance');
    const generallist = this.dataSource.data.filter(val => val.category === 'General');
    const transportList = this.dataSource.data.filter(val => val.category === 'Transport');
    const groceriesList = this.dataSource.data.filter(val => val.category === 'Groceries');
    const pcList = this.dataSource.data.filter(val => val.category === 'Personal Care');

    billsList.forEach(val => {
      billsTotal += Number(val.amount);
    });

    shoppingList.forEach(val => {
      shoppingTotal += Number(val.amount);
    });

    eatingOutList.forEach(val => {
      eatingOutTotal += Number(val.amount);
    });

    entertainmentList.forEach(val => {
      entertainmentTotal += Number(val.amount);
    });

    financeList.forEach(val => {
      financeTotal += Number(val.amount);
    });

    generallist.forEach(val => {
      generalTotal += Number(val.amount);
    });

    transportList.forEach(val => {
      transportTotal += Number(val.amount);
    });

    groceriesList.forEach(val => {
      groceriesTotal += Number(val.amount);
    });

    pcList.forEach(val => {
      pcTotal += Number(val.amount);
    });

    console.log(billsTotal);
    console.log(shoppingTotal);
    console.log(eatingOutTotal);

    this.single = [{name: 'Transport', value: transportTotal}, {name: 'Groceries', value: groceriesTotal},
      {name: 'Shopping', value: shoppingTotal}, {name: 'Bills', value: billsTotal},
      {name: 'Eating Out', value: eatingOutTotal}, {name: 'Entertainment', value: entertainmentTotal},
      {name: 'Finance', value: financeTotal}, {name: 'General', value: generalTotal},
      {name: 'Personal Care', value: pcTotal}, ];
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  format(value) {
    return '£' + value.toFixed(2);
  }

}
