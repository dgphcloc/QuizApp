import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHistoryAnswerComponent } from './dialog-history-answer.component';

describe('DialogHistoryAnswerComponent', () => {
  let component: DialogHistoryAnswerComponent;
  let fixture: ComponentFixture<DialogHistoryAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogHistoryAnswerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogHistoryAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
