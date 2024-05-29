import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, ViewRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-government-allocation',
  templateUrl: './government-allocation.component.html',
  styleUrls: ['./government-allocation.component.css']
})
export class GovernmentAllocationComponent {
  dataSource = Array.from({ length: 100 }).map((_, i) => `Item #${i + 1}`);
  pageSizeOptions = [5, 10, 20];
  pageSize = 5;
  pageIndex = 0;

  onPageChange(event: PageEvent) {
    console.log('Page event:', event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

 
}
 


}
