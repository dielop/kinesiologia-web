import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoOSComponent } from './nuevo-OS.component';

describe('NuevoOSComponent', () => {
  let component: NuevoOSComponent;
  let fixture: ComponentFixture<NuevoOSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoOSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoOSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
