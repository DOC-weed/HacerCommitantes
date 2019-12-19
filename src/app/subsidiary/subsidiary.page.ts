import { Component, OnInit } from '@angular/core';
import {ModalController, NavController} from "@ionic/angular";
import { ViewChild } from "@angular/core";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker
} from "@ionic-native/google-maps";
import { Platform} from "@ionic/angular";
import { StaticSymbol } from '@angular/compiler';
import { read } from 'fs';
import {SubsidiaryPageModule} from './subsidiary.module';
@Component({
  selector: 'app-subsidiary',
  templateUrl: './subsidiary.page.html',
  styleUrls: ['./subsidiary.page.scss'],
})
export class SubsidiaryPage {
<<<<<<< HEAD
  @ViewChild('map',{static:false}) element;
=======
  constructor(private ModCtrl: ModalController, private NavCtrl: NavController,public plt: Platform) { }
/*
export class subsidiary {
  @ViewChild('map') element;
>>>>>>> fcfb16c0f1faf0e44974634d7a5e8dfd2a55a5ef
  constructor(private ModCtrl: ModalController, private NavCtrl: NavController,public googleMaps: GoogleMaps, public plt: Platform) { }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.plt.ready().then(() => {
      this.initMap();
    });
  }
back() {
    this.NavCtrl.navigateForward('./sales');
}
initMap(){

  let map: GoogleMap = this.googleMaps.create(this.element.nativeElement);

  map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {

    let coordinates: LatLng = new LatLng(33.6396965, -84.4304574);

    let position = {
      target: coordinates,
      zoom: 17
    };

    map.animateCamera(position);

    let markerOptions: MarkerOptions = {
      position: coordinates,
      icon: "assets/images/icons8-Marker-64.png",
      title: 'Our first POI'
    };

    const marker = map.addMarker(markerOptions)
      .then((marker: Marker) => {
        marker.showInfoWindow();
    });
  });
}
}