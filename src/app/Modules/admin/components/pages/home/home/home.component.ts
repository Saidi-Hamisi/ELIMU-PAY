import { Component, OnInit } from "@angular/core";
import { HomecardsService } from "./homecards.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // category:Observable<any>
  constructor(private homecardsservive:HomecardsService) { }

  ngOnInit(): void {
  }
  reloadData(){
    this.homecardsservive.getTotalIncome()
  }
}


