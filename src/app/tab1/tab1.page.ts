import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonGrid, IonCol } from '@ionic/angular/standalone';
import { PeliculaService } from '../services/pelicula.service';
import { IPelicula } from '../models/pelicula.model';
import { ImagenPipe } from '../pipes/imagen.pipe';
import { SwiperOptions } from 'swiper/types';
import { SliderBackdropComponent } from '../components/slider-backdrop/slider-backdrop.component';
import { SliderPosterComponent } from '../components/slider-poster/slider-poster.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonCol, IonGrid, IonRow, ImagenPipe, IonHeader, IonToolbar, IonTitle, IonContent,
    SliderBackdropComponent, SliderPosterComponent
  ]
})
export class Tab1Page implements OnInit{

  private pelisServ = inject(PeliculaService);

  peliculasRecientes : IPelicula[] = [];
  pelisCartelera : IPelicula[] = [];
  pelisPopulares : IPelicula[] = [];

  constructor() {}

  ngOnInit(): void {
    this.pelisServ.getPeliculas()
      .subscribe( resp => {
        // console.log("Resp Recientes" , resp);
        this.peliculasRecientes = resp.results;
      });

    this.pelisServ.getCartelera()
      .subscribe( resp=> {
        // console.log("Resp Cartelera" , resp);
        this.pelisCartelera = resp.results;
      });

      this.getPopulares();

  }

  private getPopulares() {
    this.pelisServ.getPopulares()
      .subscribe( resp=> {
        // console.log("Resp Populares" , resp);
        this.pelisPopulares = [...this.pelisPopulares, ...resp.results];
      });
  }

  cargarMasPelis() {
    this.getPopulares();
  }
}
