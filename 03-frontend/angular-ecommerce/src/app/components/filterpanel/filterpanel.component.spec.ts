import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterpanelComponent } from './filterpanel.component';

describe('FilterpanelComponent', () => {
  let component: FilterpanelComponent;
  let fixture: ComponentFixture<FilterpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterpanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
