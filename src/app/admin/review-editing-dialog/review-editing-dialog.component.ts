import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Review } from 'src/app/search/types/review';

@Component({
  selector: 'app-review-editing-dialog',
  templateUrl: './review-editing-dialog.component.html',
  styleUrls: ['./review-editing-dialog.component.scss'],
})
export class ReviewEditingDialogComponent implements OnInit {
  reviewTextarea: FormControl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Review, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.reviewTextarea = this.fb.control(this.data.content);
  }
}
