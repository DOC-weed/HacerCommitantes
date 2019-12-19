import { Component, OnInit } from '@angular/core';

import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private ModCtrl: ModalController) { }
  email;
  pass;
  ngOnInit() {
  	this.getdatos();
  }
  getdatos() {
  	this.email=localStorage.getItem('correo');
  	this.pass=localStorage.getItem('pass');
  }
  close() {
    this.ModCtrl.dismiss();
  }

}
