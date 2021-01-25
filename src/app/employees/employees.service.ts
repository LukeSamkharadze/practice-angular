import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from './models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  register(employee: Employee) {
    return this.httpClient.post<Employee>(`${environment.url}/create`, employee, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    });
  }

  getSpecificEmployee(id: number) {
    return this.httpClient.get<Employee>(`${environment.url}/employee/${id}`);
  }

  constructor(private httpClient: HttpClient) { }
}
