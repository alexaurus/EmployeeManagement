import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";

@Injectable()
export class EmployeeService {
    constructor(private http: HttpClient){}

    getEmployees_s(){
        return this.http.get('Employees/GetAllEmployees', {responseType: 'json'}).toPromise();
    }

    addEmployee_s(employee: Employee){
        return this.http.post('Employees/AddEmployee', employee, {responseType: 'json'}).toPromise();
    }

    updateEmployee_s(employee: Employee){
        return this.http.post('Employees/EditEmployee', employee, {responseType: 'json'}).toPromise();
    }

    deleteEmployee_s(empId: number){
        return this.http.get('Employees/DeleteEmployee?empId=' + empId, {responseType: 'json'}).toPromise();
    }
}