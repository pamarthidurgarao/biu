import { Injectable } from '@angular/core';
import { ServiceTypeDTO } from '../model/service.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SetupService {
  constructor(private http: HttpClient) { }

  loadCutomers(): Observable<ServiceTypeDTO[]> {
    return this.http.get<ServiceTypeDTO[]>('../../assets/setup.json');
  }
}
