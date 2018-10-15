import { Injectable } from '@angular/core';
import { ServiceTypeDTO,ServiceResponse } from '../model/service.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SetupService {
  constructor(private http: HttpClient) { }

  loadCutomers(): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>('https://bui-api.herokuapp.com/service');
  }

  addService(service: ServiceTypeDTO): Observable<any> {
    return this.http.post<any>('https://bui-api.herokuapp.com/service', service);
  }
}
