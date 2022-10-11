import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarLocalidadesComponent } from './listar-localidades.component';

describe('ListarLocalidadesComponent', () => {
  let component: ListarLocalidadesComponent;
  let fixture: ComponentFixture<ListarLocalidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarLocalidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarLocalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
