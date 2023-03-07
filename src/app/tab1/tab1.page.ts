import { Component, ElementRef, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { GoogleMap, MapType } from '@capacitor/google-maps';
import { ModalController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { ModalPage } from '../modal/modal.page';
import { GasStation } from '../models/gas-station';

import { GasService } from '../services/gas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {


  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;
  center: any = {
    lat: -23.0008826,
    lng: -43.3505312,
  };
  markerId: string = '';

  gasStations: GasStation[] = [];
  constructor(
    public modalCtrl: ModalController,
    private service: GasService) { }
  ngOnInit(): void {
    this.getGasStations();
  }
  getGasStations(): void {
    this.service.getGasStation().subscribe(
      {
        next: (response) => {
          console.log(response)
          this.gasStations = response;
        },
        error: (erro: any) => {
          console.log('entrou no erro')
          console.log(erro)
        }
      }
    )
  }

  ionViewDidEnter() {
    this.createMap();
  }

  async locate() {
    if (this.newMap) await this.newMap.enableCurrentLocation(true);
  }

  async createMap() {

    try {
      this.newMap = await GoogleMap.create({
        id: 'capacitor-google-maps',
        element: this.mapRef.nativeElement,
        apiKey: environment.google_maps_api_key,
        config: {
          center: this.center,
          zoom: 13,
        },

      });
      await this.addMarker(this.center.lat, this.center.lng);
      await this.addListeners();
      //await this.locate();  
      await this.loadMarkers();
    } catch (e) {
      console.log(e);
    }
  }

  async loadMarkers() {
    if (this.newMap) await
      this.gasStations
        .forEach(gas => {
          this.addMarkers(gas.lat, gas.lng, gas.title);

        });
  }

  async setCamera() {
    // Move the map programmatically e coloca na posição desejada
    await this.newMap.setCamera({
      coordinate: {
        lat: -23.0008826,
        lng: -43.3505312,
      },
      zoom: 13,
    });

    // Enable traffic Layer
    await this.newMap.enableTrafficLayer(true);

    if (Capacitor.getPlatform() !== 'web') {
      await this.newMap.enableIndoorMaps(true);
    }


    await this.newMap.setPadding({
      top: 50,
      left: 50,
      right: 0,
      bottom: 0,
    });
  }

  async addMarkers(lat: number, lng: number, title: string) {
    await this.newMap.addMarkers([
      {
        coordinate: {
          lat: lat,
          lng: lng,
        },
        title: title
      }
    ]);
  }

  async addMarker(lat: number, lng: number) {
    // Add a marker to the map
    if (this.markerId) this.removeMarker();
    this.markerId = await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng,
      },
      title: 'Posto de Gasolina',
      draggable: true,
    });

  }

  async removeMarker(id?: any) {
    await this.newMap.removeMarker(id ? id : this.markerId);
  }

  async addListeners() {
    // Handle marker click
    await this.newMap.setOnMarkerClickListener((event) => {
      let id: number = Number(event.markerId);
      console.log(id);
      console.log(this.gasStations[id]);
      this.goToDetail(this.gasStations[id])
    });

    await this.newMap.setOnCameraMoveStartedListener((event) => {
      console.log(event);
    });


    await this.newMap.setOnMapClickListener((event) => {
      console.log('setOnMapClickListener', event);
      this.addMarker(event.latitude, event.longitude);
    });

    await this.newMap.setOnMyLocationButtonClickListener((event: any) => {
      console.log('setOnMyLocationButtonClickListener', event);
      this.addMarker(event.latitude, event.longitude);
    });

    await this.newMap.setOnMyLocationClickListener((event) => {
      console.log('setOnMyLocationClickListener', event);
      this.addMarker(event.latitude, event.longitude);
    });
  }

  async goToDetail(gasStation: GasStation) {
    //this.churchs[this.indexChurch]
    //sessionStorage.setItem("post", JSON.stringify(this.churchs[this.indexChurch]));
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        name: gasStation.title,
        lat: gasStation.lat,
        lng: gasStation.lng,
      },
    });
    modal.present();
  }
}
