import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule, Http } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {CoderPage} from '../pages/coder/coder'

import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/messaging'
import 'firebase/database'
import 'firebase/storage'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {FirebaseService} from '../providers/firebase'
import {User} from '../providers/user'

import {Storage, IonicStorageModule} from '@ionic/storage'
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CoderPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CoderPage
  ],
  providers: [
    User,
    FirebaseService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  constructor(public sg:Storage){

  }
  set(x,y){
    return this.sg.set(x,y)
  }
  get(x){
    return this.sg.get(x)
  }
}
