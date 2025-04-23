import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MobileService {
  private apiUrl = 'http://localhost:3000/mobiles';  // API URL where data is fetched from

  constructor(private http: HttpClient) {}

  // Get the list of mobiles from the backend
  getMobiles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new mobile
  addMobile(mobile: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, mobile);
  }

  // Update an existing mobile
  updateMobile(mobile: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${mobile.id}`, mobile);
  }

  // Delete a mobile
  deleteMobile(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
