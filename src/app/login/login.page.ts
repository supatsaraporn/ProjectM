import { AuthService } from '../services/auth.service';
import { Component, OnInit } from "@angular/core";
import {
  ToastController,
  LoadingController,
  NavController,
  Platform
} from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { LoadChildren, Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {

  //[x: string]: any;
  //subscription: any;

  email: string;
  password: string;

  constructor(
    private router:Router,
    private auth: AuthService,
    private toastr: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private platform: Platform
  ) {}

  ngOnInit() {}

  register(){
    this.router.navigate(['/register']);
  } //end

  async login(){
    if(this.email && this.password){
      const loading = await this.loadingCtrl.create({
        message: 'Loading....',
        spinner: 'crescent',
        showBackdrop: true
      });

      loading.present();

      this.auth.signIn(this.email, this.password).then(() => {
        loading.dismiss();
      })
      .catch((error) => {
        loading.dismiss();
        this.toast(error.message, 'danger');
      });
    } else {
      this.toast('Please enter you email and password' , 'danger')
    }
  } //end
  home(){
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    })
  }



  async toast(message, status){
    const toast = await this.toastr.create({
      message: message,
      position: 'top',
      color: status,
      duration: 2000
    });
    toast.present();
  } //end
}
