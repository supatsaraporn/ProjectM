import { Component, OnInit } from "@angular/core";
import {
  ToastController,
  LoadingController,
  NavController
} from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})

export class RegisterPage implements OnInit{

  name: string;
  email: string;
  password: string;


  constructor(
    private afs: AngularFirestore,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private toastr: ToastController,
    private navCtrl: NavController,
    private router: Router,
  ) {}

  ngOnInit() {
  }

  async register() {
    if (this.name && this.email && this.password) {
      const loading = await this.loadingCtrl.create({
        message: 'loading..',
        spinner: 'crescent',
        showBackdrop: true
      });

      loading.present();

      this.afAuth.createUserWithEmailAndPassword(this.email, this.password).then((data) => {

        this.afs.collection('user').doc(data.user.uid).set({
          'userId': data.user.uid,
          'username': this.name,
          'email': this.email,
          'createdAt': Date.now()
        });

        data.user.sendEmailVerification();

      })
      .then(() => {
        // console.log('success');
        loading.dismiss();
        this.toast('Registration success!' , 'success')
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log('success');
        // console.log(error.message);
        this.toast(error.message, 'danger');
      })
    } else {
      // console.log('Please fill the from!');
      this.toast('Please From The Form!', 'danger');
    }
  } // end of register


  async toast(message , status){
    const toast = await this.toastr.create({
      message: message,
      position: 'top',
      color: status,
      duration: 2000
    });

    toast.present();
  }
}
