import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tbHeader: string[] = ['Plate', 'Model', 'Manufacturer', 'Status', 'Action'];
  tbDatabase;
  searchText: string = '';
  activeForm: Boolean = false;
  nowSearch: Boolean = true;
  rowSelected;
  currentPage: number = 1;
  currentLimit: number = 10;
  showModal: Boolean = false;
  objToDelete;
  newVehicle: Boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.activeForm = false;
    this.firstEntry();
  }
  
  firstEntry() {
    this.apiService.alternPage(this.currentPage, this.currentLimit).subscribe((vehicles)=>{
      this.tbDatabase = vehicles;
      this.nowSearch = false;
    });
  }

  searchPlate(event) {
    if(typeof event != "string"){
      event = event.target.value; 
    }
    this.nowSearch = true;
    this.apiService.searchVehiclePage(event, this.currentPage, this.currentLimit).subscribe((vehicles)=>{
      this.tbDatabase = vehicles;
      this.nowSearch = false;
    });
  }

  openForm(action, event){
    let idx;
    let me = this;
    if(action == 'edit'){
      idx = event.path[3].rowIndex;
      this.tbDatabase.forEach(function(value) {
        if(value.id == idx) {
          me.rowSelected = value;
        }
      });
      this.newVehicle = false;
    }
    else {
      this.newVehicle = true;
    }
    this.activeForm = true;
  }

  deleteVehicle(){
    let me = this;
    let idx = this.objToDelete;
    this.tbDatabase.forEach(function(value) {
      if(value.id == idx) {
        me.rowSelected = value;
      }
    });
    this.showModal = !this.showModal;
  }

  modalShow(event: any) {
    if(event) {
      this.objToDelete = event;
    }
    this.showModal = !this.showModal;
  }

  changingPage(page) {
    this.nowSearch = true;
    this.apiService.alternPage(page, 10).subscribe((vehicles)=>{
      this.tbDatabase = vehicles;
      this.nowSearch = false;
    });
  }
}
