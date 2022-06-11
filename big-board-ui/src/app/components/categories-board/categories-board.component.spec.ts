import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesBoardComponent } from './categories-board.component';

describe('CategoriesBoardComponent', () => {
  let component: CategoriesBoardComponent;
  let fixture: ComponentFixture<CategoriesBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesBoardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
