import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { DbService } from '../services/db.service';
import { UserService } from '../services/user.service';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private db: DbService) { }

  ngOnInit() {
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.createChannel({
      description: 'General Notifications',
      id: 'fcm_default_channel',
      importance: 5,
      lights: true,
      name: 'My notification channel',
      visibility: 1,
      lightColor: '#FF0000'
    }).then(() => {
      console.log('push channel created: ');
    }).catch(error => {
      console.error('push channel error: ', error);
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        alert('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }

  testeDB(): void {
    let user: User = new User('', 'Bruno Hauck', '32323232', 'brunohauck@gmail.com', '123456');
    this.db.addUser(user).then((res: any) => {
      this.db.getUsers().then((res: any) => {
        console.log(res)
        console.log('------------------<entrou>----------1');
      }).catch((error: any) => {
        console.log('------------------<entrou erro>----------2');
        console.error(error)
      });
    }).catch((error: any) => {
      console.log('------------------<entrou erro>----------3');
      console.log('ocorreu um erro');
      console.error(error)
    });
  }

  photoGalery() {

    this.router.navigate(['/app/tabs/tab3'])

  }

  goToGps() {

    this.router.navigate(['/gps'])

  }
  goToMap() {
    this.router.navigate(['/app/tabs/tab1'])
  }

  goToRegGasStation() {
    this.router.navigate(['/register-gas-station'])
  }

  onSubmit(form: any) {
    console.log(form.controls.email.value)
    this.db.login(form.controls.email.value).then(res => {
      console.log(res)
      console.log('------------------<entrou>----------1')
      if (form.controls.password.value === res.password) {
        console.log('entrou no login')
        this.router.navigate(['/app/tabs/tab1'])
      }
    })
    //this.router.navigate(['/app/tabs/tab1']) 
  }
}
