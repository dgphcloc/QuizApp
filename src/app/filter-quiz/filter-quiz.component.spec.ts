import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterQuizComponent } from './filter-quiz.component';

describe('FilterQuizComponent', () => {
  let component: FilterQuizComponent;
  let fixture: ComponentFixture<FilterQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
