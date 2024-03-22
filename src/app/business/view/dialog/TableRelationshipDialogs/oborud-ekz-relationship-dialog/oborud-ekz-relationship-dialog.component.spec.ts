import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OborudEkzRelationshipDialogComponent } from './oborud-ekz-relationship-dialog.component';

describe('OborudEkzRelationshipDialogComponent', () => {
  let component: OborudEkzRelationshipDialogComponent;
  let fixture: ComponentFixture<OborudEkzRelationshipDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OborudEkzRelationshipDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OborudEkzRelationshipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
