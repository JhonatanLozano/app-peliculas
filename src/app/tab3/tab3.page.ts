import { Component, inject, Inject, Injectable } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { Genre, IDetallePelicula, IPelicula } from '../models/pelicula.model';
import { DataLocalService } from '../services/data-local.service';
import { SliderPosterComponent } from '../components/slider-poster/slider-poster.component';
import { PeliculaService } from '../services/pelicula.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonHeader, IonToolbar, IonTitle, IonContent,
    SliderPosterComponent,
  ],
})
export class Tab3Page{
  peliculasFav:IPelicula[] = [];
  generos : Genre[]=[];
  pelisXGenero : any[] = [] ;

 datalocalServ = inject(DataLocalService);
   pelisServ  = inject(PeliculaService);

  constructor(
) {}

  async ionViewWillEnter(){
      const pelisFAV = await this.datalocalServ.getPeliculasFavoritas();
      this.convertir_IDetallePelicula_A_IPelicula(pelisFAV);
      this.generos = await this.pelisServ.getGeneros();
      this.peliculasPorGenero(this.generos,this.peliculasFav);

  }

  peliculasPorGenero(generos: Genre[], peliculas: IPelicula[]) {
    this.pelisXGenero = [];
    generos.forEach(genero => {
        let elem = {
            "genero_id": genero.id,
            "genero_name": genero.name,
            "peliculas": peliculas.filter(peli => {
                return peli.genre_ids.find(idGenero => { return idGenero === genero.id; });
            })
        };
        this.pelisXGenero.push(elem);
    });
  }


  convertir_IDetallePelicula_A_IPelicula(pelisFav: IDetallePelicula[]) {
    this.peliculasFav = pelisFav.map((peliDet) => {
      let peli: IPelicula = {
          "adult": peliDet.adult!,
          "backdrop_path": peliDet.backdrop_path!,
          "genre_ids": peliDet.genres?.map((genero) => { return genero.id })!,
          "id": peliDet.id!,
          "original_language": peliDet.original_language!,
          "original_title": peliDet.original_title!,
          "overview": peliDet.overview!,
          "popularity": peliDet.popularity!,
          "poster_path": peliDet.poster_path!,
          "release_date": peliDet.release_date!,
          "title": peliDet.title!,
          "video": peliDet.video!,
          "vote_average": peliDet.vote_average!,
          "vote_count": peliDet.vote_count!,
      };
      return peli;
    });
  }




}
