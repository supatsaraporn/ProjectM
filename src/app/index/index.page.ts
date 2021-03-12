import { Component, ViewChild } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { MenuController } from '@ionic/angular';
import { ModalController} from '@ionic/angular';
import { DetailPage } from '../detail/detail.page';
import { IonSearchbar } from '@ionic/angular';
import { ToastController, LoadingController, Platform , NavController } from "@ionic/angular";

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage{

  article: any;
  subscription: any;

  constructor(private menu: MenuController , private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private ModalController: ModalController ,
    private navCtrl: NavController) { }

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

BackHome() {
  this.navCtrl.pop();
}

}
