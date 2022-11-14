import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTurnosKinesiologosComponent } from './listar-turnos-kinesiologos.component';

describe('ListarTurnosKinesiologosComponent', () => {
  let component: ListarTurnosKinesiologosComponent;
  let fixture: ComponentFixture<ListarTurnosKinesiologosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTurnosKinesiologosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTurnosKinesiologosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
