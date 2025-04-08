import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IDetallePelicula } from '../models/pelicula.model';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  private myStorage : Storage | null = null;
  private ionStorage = inject(Storage);
  private toastCtrl = inject(ToastController);
  arrPeliculasFav : IDetallePelicula[] = [];

  constructor() {
    this.init();
  }

  async init() {
    const STORAGE = await this.ionStorage.create();
    this.myStorage = STORAGE;
  }

  guardarPelicula( pelicula : IDetallePelicula ) {
    let msje = "";
    const existe = this.existePelicula(pelicula);
    if( existe ) {
      //eliminar de Favoritos
      this.arrPeliculasFav = this.arrPeliculasFav.filter( (peli) => peli.id !== pelicula.id );
      msje = "Eliminado de Favoritos.";
    } else {
      //Agregar a Favoritos
      this.arrPeliculasFav.push(pelicula);
      msje = "Agregado a Favoritos.";
    }

    this.myStorage?.set('peliculas', this.arrPeliculasFav);
    this.presentToast(msje);

    return !existe;
  }

  existePelicula(pelicula : IDetallePelicula) : boolean{
    let existe = false;
    for (const peli of this.arrPeliculasFav) {
      if(peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }
    return existe;
  }

  async presentToast( message : string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
    });

    await toast.present();
  }

  async getPeliculasFavoritas() {

    if(!this.myStorage) await this.init();

    const PELICULAS = await this.myStorage?.get('peliculas');
    this.arrPeliculasFav = PELICULAS || [];

    return this.arrPeliculasFav;
  }

  async existePeliculaFavorita( id : number ) {
    await this.getPeliculasFavoritas();
    const existe = this.arrPeliculasFav.find( (peli) => peli.id === id );
    return existe ? true : false;
  }


}
