import { Injectable } from '@angular/core';
import { ServiceTypeDTO, ServiceResponse } from '../model/service.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SetupService {
  constructor(private http: HttpClient) { }

  getAllService(): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>('/api/service');
  }

  addService(service: ServiceTypeDTO): Observable<any> {
    return this.http.post<any>('/api/service', service);
  }
}
