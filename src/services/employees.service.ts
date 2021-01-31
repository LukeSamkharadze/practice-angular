import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';
import { delay } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  getEmployees() {
    return this.httpClient.get<Employee[]>(`${environment.usersApiUrl}/data`).pipe(delay(2000));
  }
  updateEmployee(id: number, employee: Employee) {
    return this.httpClient.put<Employee>(`${environment.usersApiUrl}/data/${id}`, employee).pipe(delay(2000));
  }

  deleteEmployee(id: number) {
    return this.httpClient.delete<Employee>(`${environment.usersApiUrl}/data/${id}`).pipe(delay(2000));
  }

  register(employee: Employee) {
    return this.httpClient.post<Employee>(`${environment.usersApiUrl}/data`, employee).pipe(delay(2000));
  }

  getSpecificEmployee(id: number) {
    return this.httpClient.get<Employee>(`${environment.usersApiUrl}/data/${id}`).pipe(delay(2000));
  }

  constructor(private httpClient: HttpClient) { }
}
