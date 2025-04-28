import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = `${environment.api}/users`;

  constructor(private http: HttpClient) { }

  getUser(userId: string): Observable<Response> {
    return this.http.get<Response>(`${this.url}/${userId}`);
  }

  updateUser(userId: string, data: any): Observable<Response> {
    return this.http.patch<Response>(`${this.url}/${userId}`, data);
  }

  updatePassword(userId: string, data: any): Observable<Response> {
    return this.http.patch<Response>(`${this.url}/${userId}/password`, data);
  }

  addProfilePicture(userId: string, data: FormData): Observable<Response> {
    return this.http.post<Response>(`${this.url}/${userId}/profile-picture`, data);
  }


}
