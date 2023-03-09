import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { CreateProductDTO, Product } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(
    private http: HttpClient

  ) { }

  /*getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }*/
  getAllProducts(limit ? : number, offset? : number) {
    let params = new HttpParams();
    if (limit != undefined && offset != undefined){
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Product[]>(this.apiUrl, { params });
  }
/*
  getProductsByPage(limit: number, offset: number){
    return this.http.get<Product[]>(`${this.apiUrl}`,
    {
      params: { limit, offset }
    }
    );
  }*/
  getProduct(id : string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
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
