import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddCardComponent } from './dialog-add-card.component';

describe('DialogAddCardComponent', () => {
  let component: DialogAddCardComponent;
  let fixture: ComponentFixture<DialogAddCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
