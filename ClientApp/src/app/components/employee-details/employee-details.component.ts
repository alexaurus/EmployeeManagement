import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent{
  @Input()
  selectedEmployee: Employee | undefined;

  @Input()
  saveEditMode: boolean = false;

  deleteReqeusted: boolean = false;

  @Output()
  backSmallUsageCallback = new EventEmitter();

  @Output()
  reloadEmployeeCallback = new EventEmitter();

  @Output()
  saveEditModeChanged = new EventEmitter<boolean>();
  constructor(private toaster: ToastrService, private empService: EmployeeService) { }

  save(){
    if(!this.selectedEmployee)return;

    if(this.selectedEmployee.employeeImage == undefined){
      this.toaster.error("Please upload employee image", "Error");
      return;
    }
    else if(this.selectedEmployee.employeeName == ""){
      this.toaster.error("Please enter employee name", "Error");
      return;
    }
    else if(this.selectedEmployee.employeeJob == ""){
      this.toaster.error("Please enter employee designation", "Error");
      return;
    }
    else if(this.selectedEmployee.employeeMotto == ""){
      this.toaster.error("Please enter employee motto", "Error");
      return;
    }
    else if(this.selectedEmployee.employeeHobbies == ""){
      this.toaster.error("Please enter employee hobbies", "Error");
      return;
    }
    else if(this.selectedEmployee.employeeHometown == ""){
      this.toaster.error("Please enter employee hometown", "Error");
      return;
    }
    else if(this.selectedEmployee.employeePersonalBlog == ""){
      this.toaster.error("Please enter employee personal blog", "Error");
      return;
    }

    if(this.selectedEmployee.empId <= 0){
      this.empService.addEmployee_s(this.selectedEmployee).then(res => {
        this.toaster.success("Employee added successfully.", "Success");
        this.reloadEmployeeCallback.emit();
        this.saveEditMode = false;
        this.saveEditModeChanged.emit(this.saveEditMode);
        this.selectedEmployee = undefined;
      }).catch(err => {
        this.toaster.error("Could not add employee, system error.", "Error");
      });
    }
    else{
      this.empService.updateEmployee_s(this.selectedEmployee).then(res => {
        this.toaster.success("Employee updated successfully.", "Success");
        this.reloadEmployeeCallback.emit();
        this.saveEditMode = false;
        this.saveEditModeChanged.emit(this.saveEditMode);
      }).catch(err => {
        this.toaster.error("Could not update employee, system error.", "Error");
      });
    }
  }

  enableEditMode(){
    this.saveEditMode = true;
    this.saveEditModeChanged.emit(this.saveEditMode);
  }

  confirmDelete(){
    if(!this.selectedEmployee)return;
    this.empService.deleteEmployee_s(this.selectedEmployee.empId).then(res => {
      this.toaster.success("Employee has been deleted successfully.", "Success");
      this.reloadEmployeeCallback.emit();
      this.selectedEmployee = undefined;
    })
    .catch(err => {
      this.toaster.error("Cannot delete the employee, system error.", "Error!");
    });
    this.deleteReqeusted = false;
  }

  cancelDelete(){
    this.deleteReqeusted = false;
  }

  back(){
    this.backSmallUsageCallback.emit();
  }

  clear(){
    this.saveEditMode = false;
    this.saveEditModeChanged.emit(this.saveEditMode);
  }

  holdImage(event: any){
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      if(me.selectedEmployee == undefined) return;
      me.selectedEmployee.employeeImage = reader.result as string;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
}
