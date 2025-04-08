import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Genre, IDetallePelicula, IRespCarteleraTMDB, IRespCreditos, IRespuestaTMDB } from '../models/pelicula.model';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.api_key;

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private http = inject(HttpClient);
  private popularPage = 0;
  private generos : Genre[]=[];

  constructor( ) { }

  private ejecutarQuery<T>( query:string ) {
    query = URL + query;
    query += `&api_key=${ apiKey }&language=es-PE`;
    // console.log("Query :",query);
    return this.http.get<T>(query);
  }

  getPeliculas() {
    const hoy = new Date(); //2024-10-05
    const ultimoDiaMes = new Date( hoy.getFullYear(), hoy.getMonth()+1, 0).getDate(); //31
    const numMes = hoy.getMonth() + 1; //9+1 = 10           ...  8+1=9

    let strMes = (numMes<10) ? '0'+numMes : numMes; //10    ... 09

    const fInicio = `${ hoy.getFullYear() }-${ strMes }-01` ;  //2024-10-01
    const fFin = `${ hoy.getFullYear() }-${ strMes }-${ ultimoDiaMes }`; //2024-10-31

    return this.ejecutarQuery<IRespuestaTMDB>(`/discover/movie?primary_release_date.gte=${ fInicio }&primary_release_date.lte=${ fFin }`);
  }

  getCartelera() {
    return this.ejecutarQuery<IRespCarteleraTMDB>(`/movie/now_playing?a=1`);
  }

  getPopulares() {
    this.popularPage++;
    return this.ejecutarQuery<IRespuestaTMDB>(`/movie/popular?page=${this.popularPage}`);
  }

  getDetallePeli( id : number ) {
    return this.ejecutarQuery<IDetallePelicula>(`/movie/${id}?a=1`);
  }

  getCreditosPeli( id: number ) {
    return this.ejecutarQuery<IRespCreditos>(`/movie/${id}/credits?a=1`)
  }

  buscarPeliculaXTitulo( titulo : string ) {
    return this.ejecutarQuery<IRespuestaTMDB>(`/search/movie?query=${ titulo }`);
  }
  getGeneros():Promise<Genre[]>{
    return new Promise((resolve,reject)=>{
      this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe((resp:any) =>{
            this.generos  = resp.genres;
            resolve(this.generos);
          });
    })



  }


}
