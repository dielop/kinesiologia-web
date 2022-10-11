import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLocalidadesComponent } from './crear-localidades.component';

describe('CrearLocalidadesComponent', () => {
  let component: CrearLocalidadesComponent;
  let fixture: ComponentFixture<CrearLocalidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearLocalidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearLocalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
