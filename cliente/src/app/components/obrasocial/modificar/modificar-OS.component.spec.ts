import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarOSComponent } from './modificar-OS.component';

describe('ModificarOSComponent', () => {
  let component: ModificarOSComponent;
  let fixture: ComponentFixture<ModificarOSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarOSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarOSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
