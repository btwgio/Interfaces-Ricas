import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MygamelistFormComponent } from './mygamelist-form.component';

describe('MygamelistFormComponent', () => {
  let component: MygamelistFormComponent;
  let fixture: ComponentFixture<MygamelistFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MygamelistFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MygamelistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
