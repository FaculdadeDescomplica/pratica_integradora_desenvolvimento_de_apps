import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder,  Validators } from '@angular/forms';
import { User } from '../models/user';
import { DbService } from '../services/db.service';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  user: User = new User('','','','','');  
  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private db: DbService, 
    private service: UserService) {}

 
  onSubmit(): void {
    if(this.userForm.controls['name'].value)
      this.user.name= this.userForm.controls['name'].value;
    if(this.userForm.controls['email'].value)
      this.user.email= this.userForm.controls['email'].value;
    if(this.userForm.controls['phone'].value)
      this.user.phone = this.userForm.controls['phone'].value;  
    if(this.userForm.controls['password'].value)
      this.user.password = this.userForm.controls['password'].value;

    this.db.addUser(this.user);

    
    this.service.addUser(this.user).subscribe(
      {
        next: (response) => {
          console.log(response)
          alert("Usuário cadastrado com sucesso.");

        },
        error: (erro: any) => {
          console.log('entrou no erro')
          alert("Ocorreu um erro.");
          console.log(erro)
        }
      }
    )
  }

}
