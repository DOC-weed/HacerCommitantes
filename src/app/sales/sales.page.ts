import { Component, OnInit } from '@angular/core';
import {GlobalPage} from "../global/global.page";
import {ProfilePage} from "../profile/profile.page";
import {SubsidiaryPage} from "../subsidiary/subsidiary.page";
import {AlertController, ModalController, PopoverController} from "@ionic/angular";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {CarritoService} from "../carrito.service";
import  {CarPage} from "../car/car.page";
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
  comida: any[];
  ropa: any[];
  electric: any[];
  pape: any[];
  searchcomida= '';
  searchropa='';
  searchelectric='';
  searchpape='';
  datoscaneado: {};
  ProductoFound;
  cantidad = 0;
  cant=0;
  canti= 1;
  canti1= 1;
  canti2= 1;
  canti3= 1;
  constructor(private ModCtrl: ModalController, private db: AngularFirestore, private storage: AngularFireStorage,
              private PoptCtrl: PopoverController, private carservice: CarritoService, private Alert: AlertController,
              private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
    this.showComida();
    this.showElectric();
    this.showPape();
    this.showRopa();
  }
  showComida() {
    this.db.collection('Comida').snapshotChanges().subscribe(data => {
      this.comida = data.map(e => {
        return {
          id: e.payload.doc.id,
          productos: e.payload.doc.data()
        };
      });
      console.log(this.comida);
      for (const producto of this.comida) {
        console.log(producto.productos.Url);
        this.storage.ref(producto.productos.Url).getDownloadURL().toPromise().then((url) => {
          producto.productos.Url2 = url;
        }).catch((error) => {
          console.log('khaaaa!!!', error);
        });
      }
    });
  }
  showRopa() {
    this.db.collection('Ropa').snapshotChanges().subscribe(data => {
      this.ropa = data.map(e => {
        return {
          id: e.payload.doc.id,
          productos: e.payload.doc.data()
        };
      });
      console.log(this.ropa);
      for (const producto of this.ropa) {
        console.log(producto.productos.Url);
        this.storage.ref(producto.productos.Url).getDownloadURL().toPromise().then((url) => {
          producto.productos.Url2 = url;
        }).catch((error) => {
          console.log('khaaaa!!!', error);
        });
      }
    });
  }
  showElectric() {
    this.db.collection('Electronicos').snapshotChanges().subscribe(data => {
      this.electric = data.map(e => {
        return {
          id: e.payload.doc.id,
          productos: e.payload.doc.data()
        };
      });
      console.log(this.electric);
      for (const producto of this.electric) {
        console.log(producto.productos.Url);
        this.storage.ref(producto.productos.Url).getDownloadURL().toPromise().then((url) => {
          producto.productos.Url2 = url;
        }).catch((error) => {
          console.log('khaaaa!!!', error);
        });
      }
    });
  }
  showPape() {
    this.db.collection('Papeleria').snapshotChanges().subscribe(data => {
      this.pape = data.map(e => {
        return {
          id: e.payload.doc.id,
          productos: e.payload.doc.data()
        };
      });
      console.log(this.pape);
      for (const pape of this.pape) {
        console.log(pape.productos.Url);
        this.storage.ref(pape.productos.Url).getDownloadURL().toPromise().then((url) => {
          pape.productos.Url2 = url;
        }).catch((error) => {
          console.log('khaaaa!!!', error);
        });
      }
    });
  }
  async openGlobal() {
    const modal = await this.ModCtrl.create({
      component: GlobalPage,
    });
    await modal.present();
  }
  async openProfile() {
    const modal = await this.ModCtrl.create({
      component: ProfilePage,
    });
    await modal.present();
  }
  async openSubsidiary() {
    const modal = await this.ModCtrl.create({
      component: SubsidiaryPage,
    });
    await modal.present();
  }
  search(event) {
    this.searchcomida = event.detail.value;
    this.searchelectric = event.detail.value;
    this.searchpape = event.detail.value;
    this.searchropa = event.detail.value;
  }
  in(nombre, precio, stock) {
    if (stock < this.canti) {
      this.insu();
    } else {
      this.db.collection('Ventas').add({
        Nombre: nombre,
        Precio: precio,
        Cantidad: this.canti,
        Total: precio * this.canti
      });
    }
   // console.log(id);
  }
  in1(nombre, precio, stock) {
    if (stock < this.canti1) {
      this.insu();
    } else {
      this.db.collection('Ventas').add({
        Nombre: nombre,
        Precio: precio,
        Cantidad: this.canti1,
        Total: precio * this.canti1
      });
    }
    // console.log(id);
  }
  in2(nombre, precio, stock) {
    if (stock < this.canti2) {
      this.insu();
    } else {
      this.db.collection('Ventas').add({
        Nombre: nombre,
        Precio: precio,
        Cantidad: this.canti2,
        Total: precio * this.canti2
      });
    }
    // console.log(id);
  }
  in3(nombre, precio, stock) {
    if (stock < this.canti3) {
      this.insu();
    } else {
      this.db.collection('Ventas').add({
        Nombre: nombre,
        Precio: precio,
        Cantidad: this.canti3,
        Total: precio * this.canti3
      });
    }
    // console.log(id);
  }
  async openecar() {
    const popo = await  this.ModCtrl.create({
      component: CarPage,
    });
    await popo.present();
  }
  async insu() {
    const alert = await this.Alert.create({
      message: 'Productos insuficientes',
      buttons: ['OK'],
    });
    alert.present();
  }
  LeerCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.datoscaneado = barcodeData;
//console.log(this.datoscaneado['text']);
      this.db.collection('tennisH').doc(this.datoscaneado['text']).ref.get().then(doc =>{
        this.ProductoFound = doc.data();
        console.log(this.ProductoFound);
        this.storage.ref(this.ProductoFound.Url).getDownloadURL().toPromise().then((url) => {

        });

      });
    }).catch(err => {
          console.log("Error del cod", err);
        });
  }

}
