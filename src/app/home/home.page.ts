import { Component, ViewChild } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { MenuController } from '@ionic/angular';
import { AlertController,ModalController} from '@ionic/angular';
import { DetailPage } from '../detail/detail.page';
import { IonSearchbar } from '@ionic/angular';
import { ToastController, LoadingController, Platform } from "@ionic/angular";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  article: any;
  subscription: any;

  options = {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: -60,
  };

  categories = {
    slidesPerView: 2.5,
  };

  constructor(private menu: MenuController , private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private ModalController: ModalController,
    public alertCtrl: AlertController,) {}

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  ionViewWillEnter(){
    this.getArticles();

  }

  async getArticles() {
    // show loader
    let loader = await this.loadingCtrl.create({
      message: "กำลังโหลด..."
    });
    loader.present();

    try {
      this.firestore
        .collection("article")
        .snapshotChanges()
        .subscribe(data => {
          this.article = data.map(e => {
            return {
              id: e.payload.doc.id,
              title: e.payload.doc.data()["title"],
              category: e.payload.doc.data()["category"],
              image: e.payload.doc.data()["image"],
              detail: e.payload.doc.data()["detail"],
              detail2: e.payload.doc.data()["detail2"],
              link: e.payload.doc.data()["link"],

            };
          });

          // dismiss loader
          loader.dismiss();
        });
    } catch (e) {
      this.showToast(e);
    }
  }

  showToast(message: string) {
    this.toastCtrl
      .create({
        message: message,
        duration: 3000
      })
      .then(toastData => toastData.present());
  }

  async detailArticles(details: any) {
    const modal = await this.ModalController.create({
      component: DetailPage,
      componentProps: {
        title: details.title,
        category: details.category,
        image: details.image,
        detail: details.detail,
        detail2: details.detail2,
        link: details.link,
      }
    })
    return await modal.present();
  }

  async deleteArticles(id: string) {

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Do you want to delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes!!',
          handler: () => {
            console.log('Confirm delete!!');
            this.firestore.doc("article/" + id).delete();
          }
        }
      ]
    });

    await alert.present();

  }

}

