import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent {
  @Input()
  message: string = 'Are you sure you want to delete?';

  @Output()
  okCallback = new EventEmitter();
  @Output()
  cancelCallback = new EventEmitter();
  constructor() { }

  cancel(){
    this.cancelCallback.emit();
  }

  ok(){
    this.okCallback.emit();
  }

}
