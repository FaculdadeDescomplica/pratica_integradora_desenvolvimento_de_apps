import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams} from '@ionic/angular';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  precoGas:any;
  precoAl:any;
  title:any;
  precoAlcool: number = 0;

  constructor(
    public navParams : NavParams,
    public modalCtrl: ModalController) { }
  ngOnInit() {
    console.log(this.precoGas);
    this.title = this.navParams.get('title')
    this.precoGas = this.navParams.get('precoGas')
    this.precoAl = this.navParams.get('precoAl')
  }




}
