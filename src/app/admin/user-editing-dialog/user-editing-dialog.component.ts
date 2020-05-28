import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfo } from 'src/app/authentication/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-editing-dialog',
  templateUrl: './user-editing-dialog.component.html',
  styleUrls: ['./user-editing-dialog.component.scss'],
})
export class UserEditingDialogComponent implements OnInit {
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: UserInfo, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: this.fb.control(this.data.email),
      nickname: this.fb.control(this.data.nickname),
    });
  }
}
