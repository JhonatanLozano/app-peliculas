import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.imgPath ;

@Pipe({
  name: 'imagen',
  standalone: true
})
export class ImagenPipe implements PipeTransform {

  transform(img: string | undefined | null, size: string="w500"): string {
    if(!img) return './assets/no-image-banner.jpg';
    const imgUrl = `${URL}/${size}${img}`;
    return imgUrl;
  }

}
