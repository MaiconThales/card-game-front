import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogViewCardsComponent } from './dialog-view-cards.component';

describe('DialogViewCardsComponent', () => {
  let component: DialogViewCardsComponent;
  let fixture: ComponentFixture<DialogViewCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogViewCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogViewCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
