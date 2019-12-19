import { Component, OnInit } from '@angular/core';
import {CarritoService} from "../carrito.service";
import {Producto} from "../producto/producto.js";
import {AngularFirestore} from "@angular/fire/firestore";
import {AlertController} from "@ionic/angular";
import {PayPal, PayPalPayment, PayPalConfiguration} from "@ionic-native/paypal/ngx";

@Component({
  selector: 'app-car',
  templateUrl: './car.page.html',
  styleUrls: ['./car.page.scss'],
})
export class CarPage implements OnInit {
  ventas: any[];
  total = 0;
  prod = 0;
  total1: any;

  constructor(private carser: CarritoService, private db: AngularFirestore, private AlertCtrl: AlertController,
              private payPal: PayPal) {
  }

  ngOnInit() {
    this.getcarrito();
  }

  getcarrito() {
    this.db.collection('Ventas').snapshotChanges().subscribe(data => {
          this.ventas = data.map(e => {
            return {
              id: e.payload.doc.id,
              productos: e.payload.doc.data()
            };
          });
          for (const producto of this.ventas) {
            this.total = this.total + producto.productos.Total;
            this.prod = this.prod + producto.productos.Cantidad;


          }

          console.log(this.ventas);
        }
    );
  }

  eliminarprod(id) {
    this.db.collection('Ventas').doc(id).delete();


  }
  async eliminartabla() {
    const alert = await this.AlertCtrl.create({
      message: 'Se borraran todos los productos del carrito, ¿Desea continuar?',
      buttons: [{
        text: 'Cancelar',
        role: 'Cancel',
        handler: blah => {
          console.log('confirm cancel: blah');
        }
      }, {
        text: 'Aceptar',
        handler: () => {
          this.deletecollection();
        }
      }]
    });
    alert.present();
  }
  addtable() {
    this.total1 = this.total.toString();
    console.log(this.total1);
    console.log("Entre a Paypal");
    this.payPal.init({
      PayPalEnvironmentProduction: '',
      PayPalEnvironmentSandbox: 'AV2AqcS1ct1osF--W8jpYpdQy2-reJPcG_KZ8nK94L-NeuD9VBp1kO0AZeFrEtAVcEHE3HnleXQP4gu_'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        // payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        const payment = new PayPalPayment(this.total1,"MXN", "Monto total", "MMS sale");
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
          // Successfully paid

          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }
  deletecollection() {
    this.db.collection('Ventas').snapshotChanges().subscribe(data => {
          this.ventas = data.map(e => {
            return {
              id: e.payload.doc.id,
              productos: e.payload.doc.data()
            };
          });
          for (const prod of this.ventas) {
            this.db.collection('Ventas').doc(prod.id).delete();

          }

        }
    );
  }



}
