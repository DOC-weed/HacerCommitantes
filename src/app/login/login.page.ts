import { Component, OnInit } from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {AngularFireAuth} from "@angular/fire/auth";
/*Esta parte del código es para el login*/
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
usuAdmin = '';
passAdmin = '';
usuClient = '';
passClient = '';

  constructor(private NavC: NavController, private Auth: AngularFireAuth, private AlertCtrl: AlertController) { }

  ngOnInit() {
    localStorage.clear();
    /* Si aqui te logeas con la cuenta del admin te mete a la parte de admin*/
  }
 inicioAdmin(email, pass) {
      localStorage.setItem('correo', email);
      localStorage.setItem('pass', pass);
      this.Auth.auth.signInWithEmailAndPassword(email, pass).then(res => {
          this.usuAdmin = '';
          this.passAdmin = '';
          this.NavC.navigateForward('tabs/tab1');
      }).catch( res => {
          this.datosincorrectos();
      });
 }
 /*Si te loegas con cuenta de cliente te manda a la parte del cliente*/
 inicioCliente(email, pass) {
      localStorage.setItem('correo', email);
      localStorage.setItem('pass', pass);
     this.Auth.auth.signInWithEmailAndPassword(email, pass).then(res => {
         this.usuClient = '';
         this.passClient = '';
         this.NavC.navigateForward('sales');
     }).catch( res => {
         this.datosincorrectos();
     });
 } /*Te manda una alerta si tienes datos incorrectos*/
 async datosincorrectos() {
      const alert = await this.AlertCtrl.create({
          message: 'Datos incorrectos, ingrese nuevos datos',
      });
      alert.present();
 } /*Si le das showadmin se muestran los inputs que se pueden usar*/
 showadmin() {
const admin1 = (document.getElementById('admin') as HTMLDivElement).style;
const btninput = (document.getElementById('btninput1') as HTMLDivElement).style;
admin1.display = 'block';
admin1.position = 'relative';
btninput.position = 'block';
btninput.margin = 'auto';
const client = (document.getElementById('cliente') as HTMLDivElement).style;
client.display = 'none';

   } /*Si le das showcliente se muestran los inputs que se pueden usar*/
  showcliente() {
      const admin1 = (document.getElementById('admin') as HTMLDivElement).style;
      admin1.display = 'none';
      const client = (document.getElementById('cliente') as HTMLDivElement).style;
      client.display = 'block';
      client.position = 'relative';
  }
}
