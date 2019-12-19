import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { GoogleMaps } from '@ionic-native/google-maps';
import { IonicModule } from '@ionic/angular';
<<<<<<< HEAD
import {SubsidiaryPage} from './subsidiary.page';

=======
import { SubsidiaryPage } from './subsidiary.page';
>>>>>>> fcfb16c0f1faf0e44974634d7a5e8dfd2a55a5ef

providers: [
  GoogleMaps
]
const routes: Routes = [
  {
    path: '',
    component: SubsidiaryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubsidiaryPage]
})
export class SubsidiaryPageModule {}
