import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAngularA11yComponent } from './ngx-angular-a11y.component';

describe('NgxAngularA11yComponent', () => {
  let component: NgxAngularA11yComponent;
  let fixture: ComponentFixture<NgxAngularA11yComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxAngularA11yComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxAngularA11yComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
