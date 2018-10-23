import { Injectable } from '@angular/core';
import { ServiceTypeDTO, ServiceResponse } from '../model/service.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StaffDTO, StaffResponse } from '../model/staff.model';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class SetupService {
  constructor(private http: HttpClient) { }

  getAllService(): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(Constants.HOST_URL + '/api/service');
  }

  addService(service: ServiceTypeDTO): Observable<any> {
    return this.http.post<any>(Constants.HOST_URL + '/api/service', service);
  }

  getAllStaff(): Observable<StaffResponse> {
    return this.http.get<StaffResponse>(Constants.HOST_URL + '/api/staff');
  }

  addStaff(staff: StaffDTO): Observable<any> {
    return this.http.post<any>(Constants.HOST_URL + '/api/staff', staff);
  }
}
