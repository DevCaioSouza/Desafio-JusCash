import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';

@Component({
  selector: 'app-lead-modal',
  templateUrl: './lead-modal.component.html',
  styleUrls: ['./lead-modal.component.scss'],
})
export class LeadModalComponent {
  @ViewChildren('selectOption')
  selectOptionRef!: QueryList<any>;

  @ViewChild('nomeCompleto')
  usernameElement!: ElementRef;

  @ViewChild('userEmail')
  userEmailElement!: ElementRef;

  @ViewChild('phoneNumber')
  userPhoneNumberElement!: ElementRef;

  //testando service

  constructor(
    public dialogRef: MatDialogRef<LeadModalComponent>,
    private dataService: DataService
  ) {}


  // data: any;

  // sendDataToService() {
  //   this.dataService.setData(this.data);
  // }

  //testando service - fim

  saveLeadData(): void {
    // console.log('Clicou em Salvar', this.usernameElement.nativeElement.value);
    const userName = this.usernameElement.nativeElement.value;
    const userEmail = this.userEmailElement.nativeElement.value;
    const userPhoneNumber = this.userPhoneNumberElement.nativeElement.value;
    // console.log(userName, userEmail, userPhoneNumber);

    const userData = [userName, userEmail, userPhoneNumber];
    this.dialogRef.close();

    this.dataService.setData(userData[0])
  }




  // data: any = this.saveLeadData()

  // sendDataToService() {
  //   this.dataService.setData(this.data);
  // }




  changeCheckBoxValue(event: any) {
    const isChecked = event.srcElement.checked;
    console.log(isChecked);
    if (isChecked) {
      this.selectAll();
    } else {
      this.deselectAll();
    }
  }

  selectAll() {
    const checkboxArray = this.selectOptionRef.toArray();
    checkboxArray[0].nativeElement.checked = true;
    checkboxArray[1].nativeElement.checked = true;
    checkboxArray[2].nativeElement.checked = true;
    checkboxArray[3].nativeElement.checked = true;
  }

  deselectAll() {
    const checkboxArray = this.selectOptionRef.toArray();
    checkboxArray[0].nativeElement.checked = false;
    checkboxArray[1].nativeElement.checked = false;
    checkboxArray[2].nativeElement.checked = false;
    checkboxArray[3].nativeElement.checked = false;
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
function sendDataToService() {
  throw new Error('Function not implemented.');
}

