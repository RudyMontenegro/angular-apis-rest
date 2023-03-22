import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError, zip } from 'rxjs'
import { checkTime } from './../interceptors/time.interceptor'

import { CreateProductDTO, Product } from './../models/product.model';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api/products`;// SOLO EN  produccion
  //private apiUrl = '/api/products'; // se puede dejar el url o poner un proxi
  //private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products'; // se puede dejar el url o poner un proxi
// proxi solo corre en desarrollo y no en produccion.
  constructor(
    private http: HttpClient

  ) { }

  /*getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }*/
  getAllProducts(limit ? : number, offset? : number) {
    let params = new HttpParams();
    if (limit != undefined && offset != undefined){// para la paginacion.
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Product[]>(this.apiUrl, { params, context: checkTime() })
    .pipe(
            retry(5),// hace peticion 5 veces para consumir el api, si la conexion es inestable.
            map(products => products.map (item => {// modificar, o aumetar mas datos al flujo que llega de la api.
              return {
                ...item,
                taxes: .19 * item.price
              }
            }))
          )
        }
  featReadAndUpdate(id: string, dto: any){
    return zip(
      this.getProduct(id),
      this.update(id, dto)
    );
    }
  
/*
  getProductsByPage(limit: number, offset: number){
    return this.http.get<Product[]>(`${this.apiUrl}`,
    {
      params: { limit, offset }
    }
    );
  }*/
  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) { //if (error.status === 500) {
          return throwError('Algo esta fallando en el server');
        } 
        if (error.status === HttpStatusCode.NotFound) { //if (error.status === 404) {
          return throwError('El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No estas permitido');
        }
        return throwError('Ups algo salio mal');
      })
    )
  }

  create(dto: CreateProductDTO){
    return this.http.post<Product>(this.apiUrl, dto);
  }
  update(id: string, dto: any){
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto); // se cambia todos los atributos del producto// putch solo cambia un atributo
  }

  delete(id: string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
