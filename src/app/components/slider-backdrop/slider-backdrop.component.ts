import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { IPelicula } from 'src/app/models/pelicula.model';
import { ImagenPipe } from 'src/app/pipes/imagen.pipe';
import { SwiperOptions } from 'swiper/types';
import { ModalController } from '@ionic/angular/standalone';
import { DetallePeliculaComponent } from '../detalle-pelicula/detalle-pelicula.component';

@Component({
  selector: 'app-slider-backdrop',
  templateUrl: './slider-backdrop.component.html',
  styleUrls: ['./slider-backdrop.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ImagenPipe]
})
export class SliderBackdropComponent  implements AfterViewInit {

  @Input() peliculas : IPelicula[] = [];
  @ViewChild('swiperBackdrop', {static:false}) swiperContainer! : ElementRef;

  private modalCtrl = inject(ModalController);

  swiperParams : SwiperOptions = {
    slidesPerView: 1.1,
    freeMode: true,
    loop: true,
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    }
  };

  constructor() { }

  ngAfterViewInit() : void {
    const swiperEl = this.swiperContainer.nativeElement;
    Object.assign(swiperEl!, this.swiperParams);
    swiperEl!.initialize();
  }

  async verDetallePeli( idPeli : number ) {
    const modal = await this.modalCtrl.create({
      component: DetallePeliculaComponent,
      componentProps: {
        id: idPeli
      }
    });
    modal.present();
  }

}
