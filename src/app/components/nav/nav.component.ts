import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';

import { StoreService } from '../../services/store.service';

import { UsersService } from '../../services/users.service'
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  
  token = ''
  profile: User | null = null;
  activeMenu = false;
  counter = 0;

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
     
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }
  login(){
    this.authService.loginAndGet('sebas@mail.com', '1212')
  
   .subscribe(rta => {
     //console.log(rta.access_token);// crear modelo auth, poner en el service, tiparlo
    //this.profile = rta;
    
    this.profile = rta;
     this.token = '---'
   })
   this.getProfile();
  }
  getProfile(){
    this.authService.getProfile(this.token).
    subscribe(rta => {
      this.profile = rta;
      console.log(rta)
    })
  }
}
