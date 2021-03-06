import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule, FirebaseApp} from '@angular/fire';
import {File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import {AltasPageModule} from './altas/altas.module';
import {BajasPageModule} from './bajas/bajas.module';
import {ProfilePageModule} from "./profile/profile.module";
import {SalesPageModule} from "./sales/sales.module";
import {SubsidiaryPageModule} from "./subsidiary/subsidiary.module";
import {UserPageModule} from "./user/user.module";
import {GlobalPageModule} from "./global/global.module";
import {PipesModule} from "./filtro/pipes.module";
import {CarPageModule} from "./car/car.module";
import {CarritoService} from "./carrito.service";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {EditPageModule} from "./edit/edit/edit.module";
import {AddprovPageModule} from "./addprov/addprov.module";
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import {PayPal} from "@ionic-native/paypal/ngx";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule, AngularFirestoreModule, AltasPageModule, BajasPageModule, ProfilePageModule, SalesPageModule,
  SubsidiaryPageModule, UserPageModule, GlobalPageModule, PipesModule, CarPageModule, AngularFireAuthModule, EditPageModule,
  AddprovPageModule],
  providers: [
    CarritoService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, BarcodeScanner, File, FileOpener, PayPal
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
