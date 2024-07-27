import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienthomeComponent } from './clienthome.component';

describe('ClienthomeComponent', () => {
  let component: ClienthomeComponent;
  let fixture: ComponentFixture<ClienthomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienthomeComponent]
    });
    fixture = TestBed.createComponent(ClienthomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
