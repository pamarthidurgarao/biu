import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerDTO, CustomerResponse } from '../model/customer.model';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  loadCutomers(): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(Constants.HOST_URL + '/api/customer');
  }

  addCutomer(customer: CustomerDTO): Observable<any> {
    return this.http.post<any>(Constants.HOST_URL + '/api/customer', customer);
  }

  deleteCutomer(id: string): Observable<any> {
    return this.http.delete<any>(Constants.HOST_URL + '/api/customer/' + id);
  }

  searchByMobile(q: string): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(Constants.HOST_URL + '/api/customer/mobile/' + q);
  }
}
