import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from '../api.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  @Input() isNew: Boolean;
  @Input() data: Object;
  flag: Boolean = false;

  vehicleForm = this.formBuilder.group({
    gender: [''],
    plate: [''],
    model: [''],
    manufacturer: [''],
    color: [''],
    status: ['']
  })

  constructor(
    private apiService: ApiService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    if(!this.data){
      this.data = {
        'plate': '',
        'model': '',
        'manufacturer': '',
        'color': '',
        'status': ''
      }
    }
  }

  onSubmit(obj) {
    if(this.isNew){
      this.newVehicle(obj);
    }
    else {
      this.refreshVehicle(obj);
    }
  }

  resetAll(){
    this.vehicleForm.reset();
  }

  newVehicle(vehicle) {
    this.apiService.newVehicle(vehicle).subscribe((vehicles)=>{
      this.flag = true;
    });
  }

  refreshVehicle(vehicle) {
    this.apiService.refreshVehicle(vehicle).subscribe((vehicles)=>{
      this.flag = true;
    });
  }

}
