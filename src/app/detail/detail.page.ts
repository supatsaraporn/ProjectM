import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController, LoadingController, Platform , NavController } from "@ionic/angular";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage{

  title;
  image;
  detail;
  detail2;
  link;
  category;

  constructor( private ModalController: ModalController ,
    private navCtrl: NavController) { }

  async BackMain() {
    await this.ModalController.dismiss();
  }

  BackHome() {
    this.navCtrl.pop();
  }

}
