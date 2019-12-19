import { Component, OnInit } from '@angular/core';
import {AlertController, NavParams} from "@ionic/angular";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  id;
  img;
  nombre;
  precio;
  stock;
  datoscaneado: {};
  ProductoFound: any;
  imgg;

  constructor(private Alert: AlertController, private db: AngularFirestore, private storage: AngularFireStorage, private Navparam: NavParams,
              private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
    this.id = this.Navparam.get('od');
    this.img = this.Navparam.get('image');
    this.getdatos();
  }
  getdatos() {
    this.db.collection('Electronicos').ref.doc(this.id).get().then( doc => {
      const pepe = doc.data();
      this.nombre = pepe.Nombre;
      this.precio = pepe.Precio;
      this.stock = pepe.Stock;

    });
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
  async insu() {
    const alert = await this.Alert.create({
      message: 'Productos insuficientes',
      buttons: ['OK'],
    });
    alert.present();
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
  leercode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.datoscaneado = barcodeData;
      this.db.collection('Electronicos').ref.doc(this.datoscaneado['text']).get().then(doc => {
        this.ProductoFound = doc.data();
        this.nombre = this.ProductoFound.Nombre;
        this.precio = this.ProductoFound.Precio;
        this.stock = this.ProductoFound.Stock;
        this.storage.ref(this.ProductoFound.Url).getDownloadURL().toPromise().then((url) => {
          this.imgg = url;
          console.log(this.imgg);
          console.log(this.ProductoFound);

        });
      });

    }).catch(err => {
      console.log('Error del cod', err);
    });
  }

}
