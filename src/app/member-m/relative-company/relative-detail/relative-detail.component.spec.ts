import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelativeDetailComponent } from './relative-detail.component';

describe('RelativeDetailComponent', () => {
  let component: RelativeDetailComponent;
  let fixture: ComponentFixture<RelativeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelativeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelativeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
