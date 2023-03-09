import { Component, OnInit } from '@angular/core';

import { Product, CreateProductDTO, UpdateProductDTO} from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';
import { find } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id:'',
      name:'',
    },
    description: ''
  }

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService,
   // private idProduct: String
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }
  onShowDetail(id: string){
    this.productsService.getProduct(id)
    .subscribe( data => {
      this.toggleProductDetail();
      this.productChosen = data;
    })
  }
  createNewProduct(){
    const product: CreateProductDTO ={
      title: 'Nuevo Producto',
      description: 'bla bla bla',
      images: [''],
      price: 1000,
      categoryId: 2
    }
    this.productsService.create(product) // llamando al metodo create del servicio conectado al API
    .subscribe(data => {
      console.log('created' , data);
      this.products.unshift(data);
    }
    )
  }

  updateProduct(){// tipar -> verificar si una varible cumple con los atributos del modelo
    const changes: UpdateProductDTO = {
      title: 'nuevo title',
      //otro: 'asas'
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes).subscribe(
      data => {
        const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
        this.products[productIndex] = data;
        this.productChosen = data;
      }
    )
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(() => {
        const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
        this.products.splice(productIndex,1);
        this.showProductDetail = false
      }
    )
  }
}
