//this file serves as a connection between the user interface and the backend API 

import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//trip interface
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({providedIn: 'root'})

export class TripDataService 
{
  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage) { }

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  //add trip method
  public addTrip(formData: Trip): Promise<Trip>
  {
    let httpOptions =
    {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.storage.getItem('travlr-token')}`
      })
    };

    console.log('Inside TripDataService#addTrip');
    return this.http
      .post(this.tripUrl, formData, httpOptions) //pass form data in request body
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }
 
 
  //get single trip method
  public getTrip(tripCode: string): Promise<Trip>
  {
    console.log('Inside TripDataService#getTrip(tripCode)');
    return this.http
      .get(this.tripUrl + tripCode)
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }

  //get all trips method
  public getTrips(): Promise<Trip[]> 
  {
    console.log('Inside TripDataService#getTrips');
    console.log('trying to pull trips: ' + `${this.apiBaseUrl}trips`)
    return this.http
      .get(`${this.apiBaseUrl}trips`)
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }

  //update trip given unique trip code
  public updateTrip(formData: Trip): Promise<Trip>
  {
    let httpOptions =
    {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.storage.getItem('travlr-token')}`
      })
    };

    console.log('Inside TripDataService#updateTrip');
    return this.http
      .put(this.tripUrl + formData.code, formData, httpOptions)
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }

  //local method to handle errors (not up to standard!!!)
  private handleError(error: any): Promise<any> 
  {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  public login(user: User): Promise<AuthResponse>
  {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse>
  {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse>
  {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError);
  }

}
