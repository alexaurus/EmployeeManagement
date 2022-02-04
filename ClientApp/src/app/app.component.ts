import { Component, ViewChildren } from '@angular/core';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { Employee } from './models/employee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedEmp: Employee | undefined;
  selectedIdx: number = -1;
  saveEditMode: boolean = false;
  title = 'Employee Management';
  useSmallScreen: boolean = false;

  addMode: boolean = false;

  @ViewChildren(EmployeeListComponent) empListComp: EmployeeListComponent[] = [];
  employeeIsSelected(employee: Employee | undefined){
    if(employee == undefined)
      this.selectedEmp = undefined;
    else
      this.selectedEmp = Object.assign({}, employee);
    this.saveEditMode = false;
    this.addMode = false;
  }

  reloadEmployees(){
    console.log(this.empListComp);
    this.empListComp.forEach(f => f.loadEmployees());
  }

  usingSmallScreen(index: number){
    this.useSmallScreen = true;
    this.selectedIdx = index;
  }

  usingSmallScreenAdd(){
    this.useSmallScreen = true;
  }

  backSmallScreenUsage(){
    this.useSmallScreen = false;
    this.selectedEmp = undefined;
    this.selectedIdx = -1;
  }

  saveEditModeChanged(mode: boolean){
    if(this.addMode){
      this.selectedEmp = undefined;
    }
    if(this.useSmallScreen && this.addMode){
      this.useSmallScreen = false;
      this.selectedIdx = -1;
    }
    this.saveEditMode = mode;
    this.addMode = false;
  }

  addNew(){
    this.selectedEmp = {
      empId: 0,
      employeeImage: '',
      employeeName: '',
      employeeJob: '',
      employeeMotto: '',
      employeeHobbies: '',
      employeeHometown: '',
      employeePersonalBlog: ''
    };
    this.saveEditMode = true;
    this.addMode = true;
  }
}
