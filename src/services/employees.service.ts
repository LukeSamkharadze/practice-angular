import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  getEmployees() {
    return this.httpClient.get<Employee[]>(`${environment.url}/data`);
  }
  updateEmployee(id: number, employee: Employee) {
    return this.httpClient.put<Employee>(`${environment.url}/data/${id}`, employee);
  }

  deleteEmployee(id: number) {
    return this.httpClient.delete<Employee>(`${environment.url}/data/${id}`);
  }

  register(employee: Employee) {
    return this.httpClient.post<Employee>(`${environment.url}/data`, employee);
  }

  getSpecificEmployee(id: number) {
    return this.httpClient.get<Employee>(`${environment.url}/data/${id}`);
  }

  constructor(private httpClient: HttpClient) { }
}
