import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  employees: Employee[] = [];
  deleteReqeusted: boolean = false;
  deleteId: number = -1;
  error: string = '';

  @Input()
  selectedIndex: number = -1;

  @Output()
  employeeSelected = new EventEmitter<Employee | undefined>();

  @Output()
  smallScreenUsageCallback = new EventEmitter<number>();

  @Output()
  smallScreenUsageAddCallback = new EventEmitter();

  @Output()
  addNewCallback = new EventEmitter();
  constructor(private empService: EmployeeService, private toaster: ToastrService) {
    this.loadEmployees();
  }

  loadEmployees(){
    this.empService.getEmployees_s().then(res => {
      this.employees = res as Employee[];
    }).catch(err => {
      this.error = "Could not load employees, system error.";
    })
  }

  employeeIsSelected(index: number){
    this.selectedIndex = index;
    this.employeeSelected.emit(this.employees[index]);
    this.smallScreenUsageCallback.emit(index);
  }

  deleteEmployee(empId: number){
    this.deleteReqeusted = true;
    this.deleteId = empId;
  }

  confirmDelete(){
    this.empService.deleteEmployee_s(this.deleteId).then(res => {
      this.loadEmployees();
      this.toaster.success("Employee has been deleted successfully.", "Success");
      this.employeeSelected.emit(undefined);
    })
    .catch(err => {
      this.toaster.error("Cannot delete the employee, system error.", "Error!");
    });
    this.deleteReqeusted = false;
  }

  cancelDelete(){
    this.deleteReqeusted = false;
  }

  addNew(){
    this.selectedIndex = -1;
    this.addNewCallback.emit();
    this.smallScreenUsageAddCallback.emit();
  }

}
