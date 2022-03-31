import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [],
})
export class PorPaisComponent implements OnInit {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;
  constructor(private paisService: PaisService) {}

  ngOnInit(): void {}
  buscar(termino: string) {
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarPais(this.termino).subscribe(
      (paises) => {
        this.paises = paises;
      },
      (err) => {
        this.hayError = true;
        this.paises = [];
      }
    );
  }
  sugerencias(termino: string) {
    this.hayError = false;
    this.termino = termino;

    this.termino.length > 0
      ? (this.mostrarSugerencias = true)
      : (this.mostrarSugerencias = false);

    this.paisService.buscarPais(termino).subscribe(
      (paises) => (this.paisesSugeridos = paises.splice(0, 3)),
      (err) => (this.paisesSugeridos = [])
    );
  }
  buscarSugerido(termino: string) {
    this.buscar(termino);
  }
}
