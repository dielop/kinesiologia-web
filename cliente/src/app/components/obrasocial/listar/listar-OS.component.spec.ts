import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOSComponent } from './listar-OS.component';

describe('ListarComponent', () => {
  let component: ListarOSComponent;
  let fixture: ComponentFixture<ListarOSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarOSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarOSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
