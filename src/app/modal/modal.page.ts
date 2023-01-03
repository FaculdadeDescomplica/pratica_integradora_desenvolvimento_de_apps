import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  precoAlcool: number = 0;

  constructor() { }
  ngOnInit() {
    console.log(this.precoAlcool);
  }



}
