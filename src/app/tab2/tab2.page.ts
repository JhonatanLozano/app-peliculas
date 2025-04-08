import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonGrid, IonRow, IonCol, IonLabel, IonList, IonItem, IonCard, IonImg, IonCardSubtitle, IonCardHeader, IonCardTitle, IonSpinner, ModalController } from '@ionic/angular/standalone';
import { PeliculaService } from '../services/pelicula.service';
import { IPelicula } from '../models/pelicula.model';
import { ImagenPipe } from '../pipes/imagen.pipe';
import { CommonModule } from '@angular/common';
import { DetallePeliculaComponent } from '../components/detalle-pelicula/detalle-pelicula.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonCardTitle, IonCardHeader, IonCardSubtitle, IonImg, IonCard, IonItem, IonList, IonLabel, IonCol, IonRow, IonGrid, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent,
    ImagenPipe, CommonModule
  ]
})
export class Tab2Page {
  textoBuscar : string = '';
  ideasBusq : string[] = ["Deadpool", "Avengers", "Piratas del Caribe", "Avatar", "Harry Potter"];
  private pelisServ = inject(PeliculaService);
  private modalCtrl = inject(ModalController);
  arrPeliculas : IPelicula[] = [];
  cargando : boolean = false;

  constructor() {}

  buscar(evento : any) {
    const valor = evento.detail.value;
    this.buscarPelicula(valor);
  }

  clickIdea(idea : string) {
    this.textoBuscar=idea;
    this.buscarPelicula(idea);
  }

  buscarPelicula( titulo : string ) {
    this.cargando = true;
    this.pelisServ.buscarPeliculaXTitulo(titulo)
      .subscribe( resp=> {
        this.arrPeliculas = resp.results;
        this.cargando = false;
      });
  }

  async verDetalle( idPeli : number) {
    const modal = await this.modalCtrl.create({
      component: DetallePeliculaComponent,
      componentProps: { id : idPeli }
    });

    await modal.present();

  }

}
