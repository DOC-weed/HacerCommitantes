import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, PopoverController, NavParams} from "@ionic/angular";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
id: string;
img: any;
nombre;
dep;
precio;
stock;
preciomin;
preciomay;
image;
prodcomi;
  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;
  filepath;

  constructor( private Navparam: NavParams, private db: AngularFirestore, private storage: AngularFireStorage,
               private AlertCtrl: AlertController, private ModCtrl: PopoverController) { }



  ngOnInit() {
    this.id = this.Navparam.get('id');
    this.img = this.Navparam.get('image');
    this.dep = this.Navparam.get('depa');

    this.getdatos();
  } /*Se obtiene una imagen para guardarla dentro de una etiqueta*/
  getImg(event) {
    this.img = event.target.files[0];
    const input = event.target;
    const reader = new FileReader();
    // tslint:disable-next-line:only-arrow-functions
    reader.onload = function() {
      const dataURL = reader.result;
      const output = (document.getElementById('output') as HTMLImageElement);
      if (typeof dataURL === 'string') {
        output.src = dataURL;
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
  /* Esta parte se usa para obetener los campos s de la base de datos*/
  getdatos() {
    console.log(this.id);
    console.log(this.img);
    console.log(this.dep);
    this.db.collection(this.dep).ref.doc(this.id).get().then(doc => {
      this.prodcomi = doc.data();
      this.nombre = this.prodcomi.Nombre;
      this.precio = this.prodcomi.Precio;
      this.preciomin = this.prodcomi.PrecioMen;
      this.preciomay = this.prodcomi.PrecioMay;
      this.stock = this.prodcomi.Stock;
      this.filepath = this.prodcomi.Url;
      });
  }
/* Aqui se actualiza la base de datos con los campos nuevos*/
  up() {
    const fileRef = this.storage.ref(this.filepath);
    const task = this.storage.upload(this.filepath, this.img);
    this.uploadProgress = task.percentageChanges();
    task.snapshotChanges().pipe(
        finalize(() => this.uploadURL = fileRef.getDownloadURL())
    ).subscribe();
    console.log(this.id);
    console.log(this.dep);
    this.db.collection(this.dep).doc(this.id).update({
      Nombre: this.nombre,
      Precio: this.precio,
      PrecioMen: this.preciomin,
      PrecioMay: this.preciomay,
      Stock: this.stock,
      Url: this.filepath
    }).then(() => {
      this.alertClienteEdit();
    }).catch(() => {
      console.log('rerrrrrrrrrororororororo0oljm aigjeraifvowejjjfxjfcjkijlvjeofohl');
    });
    this.dismiss();
  }
  /*Aqui muestra una alerta que dice que el producto se actualizo*/
  async alertClienteEdit() {
    const alert = await this.AlertCtrl.create({
      message: 'Producto actualizado',
      buttons: ['Aceptar'],
    });
    alert.present();
  }
  dismiss() {
    this.ModCtrl.dismiss();
  }


}
