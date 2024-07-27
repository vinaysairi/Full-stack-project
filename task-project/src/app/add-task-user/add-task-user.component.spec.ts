import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskUserComponent } from './add-task-user.component';

describe('AddTaskUserComponent', () => {
  let component: AddTaskUserComponent;
  let fixture: ComponentFixture<AddTaskUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTaskUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaskUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
