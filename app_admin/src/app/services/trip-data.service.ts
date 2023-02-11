//this file serves as a connection between the user interface and the backend API 

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

//trip interface
import { Trip } from '../models/trip';

@Injectable()

export class TripDataService 
{
  constructor(private http: Http) { }

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  //get single trip method
  public getTrip(tripCode: string): Promise<Trip>
  {
    console.log('Inside TripDataService#getTrip(tripCode)');
    return this.http
      .get(this.tripUrl + tripCode)
      .toPromise()
      .then(response => response.json() as Trip)
      .catch(this.handleError);
  }

  //get all trips method
  public getTrips(): Promise<Trip[]> 
  {
    console.log('Inside TripDataService#getTrips');
    return this.http
      .get(`${this.apiBaseUrl}trips`)
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }

  //add trip method
  public addTrip(formData: Trip): Promise<Trip>
  {
    console.log('Inside TripDataService#addTrip');
    return this.http
      .post(this.tripUrl, formData) //pass form data in request body
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }

  //update trip given unique trip code
  public updateTrip(formData: Trip): Promise<Trip>
  {
    console.log('Inside TripDataService#updateTrip');
    console.log(formData);
    return this.http
      .put(this.tripUrl + formData.code, formData)
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }

  //local method to handle errors (not up to standard!!!)
  private handleError(error: any): Promise<any> 
  {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

}
