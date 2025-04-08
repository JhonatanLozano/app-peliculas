import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonLabel, IonGrid, IonCol, IonRow, IonCard, IonItem, IonIcon, IonNote, IonRouterOutlet, IonChip, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { thumbsUp, peopleOutline, arrowBackOutline, starOutline, star } from 'ionicons/icons';
import { Cast, IDetallePelicula } from 'src/app/models/pelicula.model';
import { ImagenPipe } from 'src/app/pipes/imagen.pipe';
import { DataLocalService } from 'src/app/services/data-local.service';
import { PeliculaService } from 'src/app/services/pelicula.service';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.scss'],
  standalone: true,
  imports: [CommonModule, ImagenPipe, IonContent, IonLabel, IonGrid, IonCol, IonRow, IonCard, IonItem, IonIcon, IonNote, IonChip],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetallePeliculaComponent implements OnInit, AfterViewInit {
  @Input() id: number = 0;
  detallePeli: IDetallePelicula = {};
  actoresPeli: Cast[] = [];
  oculto: number = 150;
  estrella : string = 'star-outline';
  private pelisServ = inject(PeliculaService);
  private modalCtrl = inject(ModalController);
  private dataLocal = inject(DataLocalService);
  @ViewChild('swiperActores', { static: false }) swiperContainer!: ElementRef;
  swiperParams: SwiperOptions = {
    slidesPerView: 3.1,
    freeMode: true,
    loop: false,
    spaceBetween: -15,
    breakpoints: {
      640: {
        slidesPerView: 3.1,
      },
      1024: {
        slidesPerView: 4.1,
      },
      1200: {
        slidesPerView: 4.1,
      },
    },
  };

  constructor() {
    addIcons({ thumbsUp, peopleOutline, arrowBackOutline, starOutline, star });
  }

  ngOnInit() {
    // console.log("Detalle works! ID=", this.id);

    this.dataLocal.existePeliculaFavorita( this.id )
      .then( existe => this.estrella = (existe)?'star':'star-outline' );

    this.pelisServ.getDetallePeli(this.id)
      .subscribe(resp => {
        this.detallePeli = resp;
      });

    this.pelisServ.getCreditosPeli(this.id)
      .subscribe(resp => {
        this.actoresPeli = resp.cast;
      });
  }

  ngAfterViewInit(): void {
    const swiperEl = this.swiperContainer.nativeElement;
    Object.assign(swiperEl!, this.swiperParams);
    swiperEl!.initialize();
  }

  favorito() {
    const existe = this.dataLocal.guardarPelicula( this.detallePeli );
    this.estrella = existe ? 'star' : 'star-outline';
  }
  regresar() {
    this.modalCtrl.dismiss();
  }

}
