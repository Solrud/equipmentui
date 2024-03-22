import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelRelationshipDialogComponent } from './model-relationship-dialog.component';

describe('ModelRelationshipDialogComponent', () => {
  let component: ModelRelationshipDialogComponent;
  let fixture: ComponentFixture<ModelRelationshipDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelRelationshipDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelRelationshipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
