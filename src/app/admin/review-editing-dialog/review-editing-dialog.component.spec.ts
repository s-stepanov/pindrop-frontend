import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewEditingDialogComponent } from './review-editing-dialog.component';

describe('ReviewEditingDialogComponent', () => {
  let component: ReviewEditingDialogComponent;
  let fixture: ComponentFixture<ReviewEditingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewEditingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewEditingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
