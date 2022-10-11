import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarLocalidadesComponent } from './modificar-localidades.component';

describe('ModificarLocalidadesComponent', () => {
  let component: ModificarLocalidadesComponent;
  let fixture: ComponentFixture<ModificarLocalidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarLocalidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarLocalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
