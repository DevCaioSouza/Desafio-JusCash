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
  @ViewChild('selectAllBoxes')
  selectAllBoxesRef!: ElementRef;

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

  saveLeadData(): void {
    const userName = this.usernameElement.nativeElement.value;
    const userEmail = this.userEmailElement.nativeElement.value;
    const userPhoneNumber = this.userPhoneNumberElement.nativeElement.value;

    const allUserTextData = [userName, userEmail, userPhoneNumber]

    this.dataService.setData(userName);

    //Lidando com os dados de input do Checkbox

    const checkboxSelectAll = this.selectAllBoxesRef;
    const checkboxArray = this.selectOptionRef.toArray();
    console.log(this.selectAllBoxesRef.nativeElement.checked)

    localStorage.setItem('checkboxTodos', JSON.stringify(checkboxSelectAll.nativeElement.checked))
    localStorage.setItem('checkboxHonorSuc', JSON.stringify(checkboxArray[0].nativeElement.checked))
    localStorage.setItem('checkboxHonorCon', JSON.stringify(checkboxArray[1].nativeElement.checked))
    localStorage.setItem('checkboxHonorDat', JSON.stringify(checkboxArray[2].nativeElement.checked))
    localStorage.setItem('checkboxCredAut', JSON.stringify(checkboxArray[3].nativeElement.checked))

    //enviando dados de input de TEXTO pro localStorage
    this.dataService.unclickableDataModal(allUserTextData)
    localStorage.setItem('textUserData', JSON.stringify(allUserTextData))


    this.dialogRef.close();
  }

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
