import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralButtonsComponent } from './general-buttons.component';

describe('GeneralButtonsComponent', () => {
  let component: GeneralButtonsComponent;
  let fixture: ComponentFixture<GeneralButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
