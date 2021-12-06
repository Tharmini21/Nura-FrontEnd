import { Component, OnInit,Input,ViewEncapsulation } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-opportunitylist',
  templateUrl: './opportunitylist.component.html',
  styleUrls: ['./opportunitylist.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class OpportunitylistComponent implements OnInit {
  //@Input() token:any;
  token:any;
  constructor(private authService: AuthService) { }
 
  ngOnInit(): void {
     this.token=localStorage.getItem("token");
     this.Getopportunitylist();
  }
  OpportunityFieldList:any;
  OpportunityList: any;
  SmartsheetList: any;
  sheetId:string="";
  access_token: string = "";
  Showloader:boolean=false;
  
  Getopportunitylist() {
    this.Showloader=true;
    this.access_token=this.token;
    this.authService.GetOpportunitieslist(this.access_token).subscribe(
      (data: any) => {
      this.OpportunityList=data.records;
      this.Showloader=false;
      },
      err => {
        console.log(err);
      }
    )
  };
}
