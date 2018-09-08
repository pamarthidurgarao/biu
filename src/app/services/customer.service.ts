import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../customer/customer.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  loadCutomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>('../../assets/customer.json');
  }
}
