import { Component, OnInit } from '@angular/core';
import {GlobalPage} from '../global/global.page';
import {ProfilePage} from '../profile/profile.page';
import {SubsidiaryPage} from '../subsidiary/subsidiary.page';
import {AlertController, ModalController, PopoverController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {CarritoService} from '../carrito.service';
import  {CarPage} from '../car/car.page';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {UserPage} from '../user/user.page';

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
  searchcomida = '';
  searchropa = '';
  searchelectric = '';
  searchpape = '';

  cantidad = 0;

  cant = 0;
  canti = 1;
  canti1 = 1;
  canti2 = 1;
  canti3 = 1;
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
  search(event) {
    this.searchcomida = event.detail.value;
    this.searchelectric = event.detail.value;
    this.searchpape = event.detail.value;
    this.searchropa = event.detail.value;
  }

   async in1(nombre, precio, stock) {
   const alert = await this.Alert.create({
       inputs: [{
           name: 'cantidad',
           type: 'number',
         value: 0,
       }],
       buttons: [
           {
               text: 'Cancel',
               role: 'cancel',
               handler: () => {
                   console.log('confirm cancel');
               }
           }, {
           text: 'Agregar al carrito',
               handler: (alertData) => {
               console.log(alertData.cantidad);
               if (stock < alertData.cantidad) {
                       this.insu();
                   } else if (alertData.cantidad === '') {
                        this.datosvacios();
                          } else {
                       this.db.collection('Ventas').add({
                           Nombre: nombre,
                           Precio: precio,
                           Cantidad: alertData.cantidad,
                           Total: precio * alertData.cantidad
                       }).then(() => {
                           this.productoadd();
                       });
                   }
               }
           }
       ]
   });
   alert.present();
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
  async LeerCode() {
    const popo = await this.PoptCtrl.create({
      component: UserPage,
      backdropDismiss: true,
    });
    return popo.present();

  }
  async productoadd() {
      const alert = await this.Alert.create({
          message: 'Producto agregado',
      });
      alert.present();
  }
  async datosvacios() {
    const alert = await this.Alert.create({
      message: 'Datos vacios',
    });
    alert.present();
  }
  async updatecliente2() {

  }

}
