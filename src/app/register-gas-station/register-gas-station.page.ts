import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GasStation } from '../models/gas-station';
import { DbService } from '../services/db.service';
import { GasService } from '../services/gas.service';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-register-gas-station',
  templateUrl: './register-gas-station.page.html',
  styleUrls: ['./register-gas-station.page.scss'],
})
export class RegisterGasStationPage implements OnInit {

  gas: GasStation = new GasStation('', '', '', '', '', 0, 0, []);
  gasForm = this.fb.group({
    title: ['', Validators.required],
    address: ['', [Validators.required, Validators.email]],
    number: ['', Validators.required],
    city: ['', Validators.required],
    lat: ['', Validators.required],
    lng: ['', Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    private db: DbService,
    private service: GasService) { }

  async ngOnInit() {
    try {
      const coordinates = await this.getCurrentLocation();
      console.log('Current position:', coordinates);
      if (coordinates?.coords) {
        this.gasForm.controls['lat'].setValue(coordinates.coords.latitude.toString());
        this.gasForm.controls['lng'].setValue(coordinates.coords.latitude.toString());
      }

    } catch (e) {
      console.log(e);
    }
  }

  getCurrentLocation() {
    return Geolocation.getCurrentPosition()
      .then(coordinates => {
        return coordinates;
      })
      .catch(e => {
        throw (e);
      });
  }

  onSubmit(): void {
    if (this.gasForm.controls['title'].value)
      this.gas.title = this.gasForm.controls['title'].value;
    if (this.gasForm.controls['address'].value)
      this.gas.address = this.gasForm.controls['address'].value;
    if (this.gasForm.controls['number'].value)
      this.gas.number = this.gasForm.controls['number'].value;
    if (this.gasForm.controls['city'].value)
      this.gas.city = this.gasForm.controls['city'].value;
    if (this.gasForm.controls['lat'].value)
      this.gas.lat = +this.gasForm.controls['lat'].value;
    if (this.gasForm.controls['lng'].value)
      this.gas.lat = +this.gasForm.controls['lng'].value;

    this.db.addGas(this.gas);

    /*
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
    )*/
  }
}
