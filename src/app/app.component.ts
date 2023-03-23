import { Component } from '@angular/core';

import { Product } from './models/product.model';

import { AuthService } from '../app/services/auth.service';
import { UsersService } from '../app/services/users.service';
import { FilesService } from '../app/services/files.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';
  myInputMessage:string ="I am the parent comppnent"

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private filesService: FilesService,
  ){

  }

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser(){
    this.usersService.create({ // crear la manera de conectar con la interfaz
       name: 'Rudy',
       email: 'rolidoss7@gmail.com',
       password: '123123', 
    })
    .subscribe(rta => {
      console.log(rta)
    })
  }

  downloadPdf() {
    this.filesService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()
  }
  
}
