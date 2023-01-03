import { Component } from '@angular/core';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  items: any;
  constructor() {
    this.items = [
      {
        title: 'Posto Cidade', 
        subTitle: 'Gasolina R$4,80', 
        image: 'https://images.emojiterra.com/google/android-11/512px/26fd.png'
      },
      {
        title: 'Posto Expresso', 
        subTitle: 'Alcool R$3,80', 
        image: 'https://images.emojiterra.com/google/android-11/512px/26fd.png'
      },
      {
        title: 'Central dos Combustíveis', 
        subTitle: 'Gasolina Super R$5,30', 
        image: 'https://images.emojiterra.com/google/android-11/512px/26fd.png'
      },
      {
        title: 'Posto Rio', 
        subTitle: 'Alcool R$3,90', 
        image: 'https://images.emojiterra.com/google/android-11/512px/26fd.png'
      },
      {
        title: 'Posto BH', 
        subTitle: 'Gas natural R$2,60', 
        image: 'https://images.emojiterra.com/google/android-11/512px/26fd.png'
      }]
  }
}
