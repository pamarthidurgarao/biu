import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerDTO, CustomerResponse } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  loadCutomers(): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>('/api/customer');
  }

  addCutomer(customer: CustomerDTO): Observable<any> {
    return this.http.post<any>('/api/customer', customer);
  }

  deleteCutomer(id: string): Observable<any> {
    return this.http.delete<any>('/api/customer/' + id);
  }

  searchByMobile(q: string): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>('/api/customer/mobile/' + q);
  }
}
