import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MygamelistListComponent } from './mygamelist-list.component';

describe('MygamelistListComponent', () => {
  let component: MygamelistListComponent;
  let fixture: ComponentFixture<MygamelistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MygamelistListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MygamelistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
