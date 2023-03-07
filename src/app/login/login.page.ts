import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { DbService } from '../services/db.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private db: DbService) { }

  ngOnInit() {
  }

  testeDB(): void {
    let user: User = new User('','Bruno Hauck','32323232','brunohauck@gmail.com','123456');
    this.db.addUser(user).then((res: any) => {
      this.db.getUsers().then((res: any) => {
        console.log(res)
        console.log('------------------<entrou>----------1');
      }).catch((error:any) => {
        console.log('------------------<entrou erro>----------2');
        console.error(error)
      });
    }).catch((error:any) => {
      console.log('------------------<entrou erro>----------3');
      console.log('ocorreu um erro');
      console.error(error)
    });
  }

  onSubmit(form:any){
    console.log(form.controls.email.value)
    this.db.login(form.controls.email.value).then(res => {
      console.log(res)
      console.log('------------------<entrou>----------1')
      if(form.controls.password.value === res.password){
       console.log('entrou no login')
       this.router.navigate(['/app/tabs/tab1']) 
      }
    })
    //this.router.navigate(['/app/tabs/tab1']) 
  }
}
