import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employee-list-item',
  templateUrl: './employee-list-item.component.html',
  styleUrls: ['./employee-list-item.component.css']
})
export class EmployeeListItemComponent{
  @Input()
  employeeData: Employee | undefined;

  @Input()
  selected: boolean = false;

  @Output()
  delete = new EventEmitter<number>();
  constructor() { }

  deleteEmployee(empId: number){
    this.delete.emit(empId);
  }

}
