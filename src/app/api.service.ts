import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = "https://5eb9ba733f97140016992030.mockapi.io/";
  
  constructor(private httpClient: HttpClient) { }

  treatError(error: HttpErrorResponse) {
    let msgError = 'Unknown error.';
    if (error.error instanceof ErrorEvent) {
      msgError = `Error: ${error.error.message}`;
    } else {
      msgError = `Error Code: ${error.status}\n
      Error Message: ${error.message}`;
    }
    window.alert(msgError);
    return throwError(msgError);
  }

  public getAll(){
    return this.httpClient.get(this.API_URL + `vehicle`).pipe(
      catchError(
        this.treatError
      )
    );
  }

  public getVehicle(id){
    return this.httpClient.get(this.API_URL + `vehicle/${id}`).pipe(
      catchError(
        this.treatError
      )
    );
  }

  public searchVehicle(plate){
    return this.httpClient.get(this.API_URL + `vehicle?filter=${plate}`).pipe(
      catchError(
        this.treatError
      )
    );
  }
  
  public searchVehiclePage(plate, page, limit){
    return this.httpClient.get(this.API_URL + `vehicle?filter=${plate}&page=${page}&limit=${limit}`).pipe(
      catchError(
        this.treatError
      )
    );
  }

  public searchActiveVehicle(active){
    return this.httpClient.get(this.API_URL + `vehicle?filter=${active}`).pipe(
      catchError(
        this.treatError
      )
    );
  }

  public alternPage(page, limit){
    return this.httpClient.get(this.API_URL + `vehicle?page=${page}&limit=${limit}`).pipe(
      catchError(
        this.treatError
      )
    );
  }

  public newVehicle(car){
    return this.httpClient.post(this.API_URL + `vehicle`, car).pipe(
      catchError(
        this.treatError
      )
    );
  }

  public refreshVehicle(car){
    return this.httpClient.put(this.API_URL + `vehicle/${car.id}`, car).pipe(
      catchError(
        this.treatError
      )
    );
  }

  public deleteVehicle(car){
    return this.httpClient.delete(this.API_URL + `vehicle/${car.id}`, car).pipe(
      catchError(
        this.treatError
      )
    );
  }
}
