import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  getEmployees() {
    return this.httpClient.get<Employee[]>(`${environment.usersApiUrl}/data`);
  }
  updateEmployee(id: number, employee: Employee) {
    return this.httpClient.put<Employee>(`${environment.usersApiUrl}/data/${id}`, employee);
  }

  deleteEmployee(id: number) {
    return this.httpClient.delete<Employee>(`${environment.usersApiUrl}/data/${id}`);
  }

  register(employee: Employee) {
    return this.httpClient.post<Employee>(`${environment.usersApiUrl}/data`, employee);
  }

  getSpecificEmployee(id: number) {
    return this.httpClient.get<Employee>(`${environment.usersApiUrl}/data/${id}`);
  }

  constructor(private httpClient: HttpClient) { }
}
