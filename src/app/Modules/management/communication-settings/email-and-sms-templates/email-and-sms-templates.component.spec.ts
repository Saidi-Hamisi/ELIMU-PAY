import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAndSmsTemplatesComponent } from './email-and-sms-templates.component';

describe('EmailAndSmsTemplatesComponent', () => {
  let component: EmailAndSmsTemplatesComponent;
  let fixture: ComponentFixture<EmailAndSmsTemplatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailAndSmsTemplatesComponent]
    });
    fixture = TestBed.createComponent(EmailAndSmsTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
