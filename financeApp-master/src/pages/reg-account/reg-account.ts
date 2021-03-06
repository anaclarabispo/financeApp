import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-reg-account',
  templateUrl: 'reg-account.html'
})
export class RegAccountPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  regAccount: { titulo: string, saldo: number, typecont: number} = {
    titulo: '',
    saldo: 0,
    conta: 0
  };

  // Our translated text strings
  private regAccountErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.regAccountErrorString = value;
    })
  }

  doRegAccount() {
    // Attempt to login in through our User service
    this.user.signup(this.regAccount).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {

      this.navCtrl.push(MainPage);

      // Unable to credit Card
      let toast = this.toastCtrl.create({
        message: this.regAccountErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
