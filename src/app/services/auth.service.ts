import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.api;

  constructor(private http: HttpClient) { }

  register(data: any): Observable<Response> {
    return this.http.post<Response>(`${this.url}/register`, data);
  }

  login(data: any): Observable<Response> {
    return this.http.post<Response>(`${this.url}/login`, data);
  }

}
