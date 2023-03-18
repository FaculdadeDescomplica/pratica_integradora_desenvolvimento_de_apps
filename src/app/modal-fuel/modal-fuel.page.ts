import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams} from '@ionic/angular';
import { Fuel, GasStation } from '../models/gas-station';
import { GasService } from '../services/gas.service';
@Component({
  selector: 'app-modal-fuel',
  templateUrl: './modal-fuel.page.html',
  styleUrls: ['./modal-fuel.page.scss'],
})
export class ModalFuelPage implements OnInit {


  gas: GasStation = new GasStation('', '', '', '', '', 0, 0, []);
  constructor(
    public service: GasService,
    public navParams : NavParams,
    public modalCtrl: ModalController) {
      this.gas = JSON.parse(sessionStorage.getItem('gas')|| '');
     }
  ngOnInit() {

  }

  onSubmit(form:any): void {

    
    let fuels: Fuel[] = [];
    let fuelGasolina: Fuel = new Fuel('1', 'Gasolina', form.controls.gas.value);
    let fuelEtanol: Fuel = new Fuel('2', 'Etanol', form.controls.etanol.value);
    fuels[0] = fuelGasolina
    fuels[1] = fuelEtanol
    this.gas.fuels = fuels;
    this.service.addGasStation(this.gas).subscribe(
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
