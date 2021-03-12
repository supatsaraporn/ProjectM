import { LoadingController , ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable(
)
export class AuthService {

  user$: Observable<User>;
  user: User;


  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private LoadingCtrl: LoadingController,
    private toastr: ToastController
  ) {
    this.user$ = this.afauth.authState.pipe(
      switchMap( user => {

        if(user){
          return this.afs.doc<User>('users/${user.uid}').valueChanges();
        }else {
          return of(null);
        }
      })
    )
  } // end con

  async signIn(email, password){
    const loading = await this.LoadingCtrl.create({
      message:'Loading...',
      spinner: 'crescent',
      showBackdrop: true
    });

    loading.present();

    this.afauth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL)
    .then(() => {
      this.afauth.signInWithEmailAndPassword(email,password)
      .then((data)=>{
        if(!data.user.emailVerified){
          loading.dismiss();
          this.toast('Please','warning');
          this.afauth.signOut();
        }else{
          loading.dismiss();
          this.router.navigate(['/home']);
        }
      })
      .catch(error => {
        loading.dismiss();
        this.toast(error.message, 'danger');
      })
    })
    .catch(error => {
      loading.dismiss();
      this.toast(error.message, 'danger');
    })

 } //end sighIN

 async signOut(){
   const loading = await this.LoadingCtrl.create({
     spinner: 'crescent',
     showBackdrop: true
   });
   loading.present();

   this.afauth.signOut()
   .then(() => {
     loading.dismiss();
     this.router.navigate(['/welcome']);
   })
 } //end sighOut

 async toast(message, status){
  const toast = await this.toastr.create({
    message: message,
    color:status,
    position:'top',
    duration:2000
  });
  toast.present();
}

}




