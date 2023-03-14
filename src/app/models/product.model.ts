export interface Product {
  id: string;
  title: string;
  price: number;
  images: string [];
  description: string;
  category: Category;
  taxes?: number;
}

export interface Category{
  id: string;
  name: string;
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category' > { // se omite id y category
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO>{//pone todos los atributos en opcional --> ?
  
}
//export interface UpdateProductDTO {
  //title?: string;
  //price?: number;
  //images?: string [];
  //description?: string;
  //categoryId?: number;
//}
