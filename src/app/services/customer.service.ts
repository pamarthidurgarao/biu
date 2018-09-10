import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerDTO } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  loadCutomers(): Observable<CustomerDTO[]> {
    return this.http.get<CustomerDTO[]>('../../assets/customer.json');
  }
}
