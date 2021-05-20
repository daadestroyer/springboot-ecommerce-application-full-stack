import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryDropdownComponent } from './product-category-dropdown.component';

describe('ProductCategoryDropdownComponent', () => {
  let component: ProductCategoryDropdownComponent;
  let fixture: ComponentFixture<ProductCategoryDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoryDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
