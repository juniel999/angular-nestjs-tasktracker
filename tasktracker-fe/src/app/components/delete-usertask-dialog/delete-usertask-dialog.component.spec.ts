import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUsertaskDialogComponent } from './delete-usertask-dialog.component';

describe('DeleteUsertaskDialogComponent', () => {
  let component: DeleteUsertaskDialogComponent;
  let fixture: ComponentFixture<DeleteUsertaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteUsertaskDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUsertaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
