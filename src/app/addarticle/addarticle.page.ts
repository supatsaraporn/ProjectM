import { Component, OnInit } from '@angular/core';
import { Article } from "../models/article.model";
import {ToastController,LoadingController,NavController} from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-addarticle',
  templateUrl: './addarticle.page.html',
  styleUrls: ['./addarticle.page.scss'],
})
export class AddarticlePage implements OnInit {

  articles = {} as Article;

  constructor(private toastCtrl: ToastController,private loadingCtrl: LoadingController,private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,private navCtrl: NavController) { }

  ngOnInit() {
  }

  async createArticle(articles: Article) {
    // console.log(post);

    if (this.formValidation()) {
      // console.log("ready to submit");

      // show loader
      let loader = await this.loadingCtrl.create({
        message: "กำลังโหลด..."
      });
      loader.present();

      try {
        await this.firestore.collection("article").add(articles);
      } catch (e) {
        this.showToast(e);
      }

      // dismiss loader
      loader.dismiss();

      // redirect to home page
      this.navCtrl.navigateRoot("home");
    }
  }

  formValidation() {
    if (!this.articles.title) {
      // show toast message
      this.showToast("กรุณาใส่ชื่อบทความ!!");
      return false;
    }

    if (!this.articles.category) {
      this.showToast("กำหนดประเภทบทความ!!");
      return false;
    }

    if (!this.articles.detail) {
      this.showToast("เนื้อหาส่วนที่ 1!!");
      return false;
    }

    if (!this.articles.detail2) {
      this.showToast("เนื้อหาส่วนที่ 2!!");
      return false;
    }

    if (!this.articles.link) {
      this.showToast("ลิงค์ต้นฉบับ!!");
      return false;
    }

    if (!this.articles.image) {
      this.showToast("อย่าลืมใส่รูป!!!");
      return false;
    }

    return true;
  }

  showToast(message: string) {
    this.toastCtrl
      .create({
        message: message,
        duration: 3000
      })
      .then(toastData => toastData.present());
  }

  BackMain() {
    this.navCtrl.pop();
  }

}
