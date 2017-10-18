import { Component, AfterViewInit} from '@angular/core';
import { NavController,Events,LoadingController,NavParams,ToastController } from 'ionic-angular';

//import { LoginPage } from '../login/login';
//import { SignupPage } from '../signup/signup';
import { FirebaseService } from '../../providers/firebase'
import {Storage} from '@ionic/storage'

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
// declare var require: any;
// const localforage:LocalForage = require("localforage");
// localforage.config({
//   name:"Dahlaq"
// })
declare var localforage:any
declare var set:any
declare var get:any
declare var getF:any
@Component({
  selector: 'page-coder',
  templateUrl: 'coder.html'
})
export class CoderPage {
  ev:any
  fbs:FirebaseService;
  recaptchaVerifier: any
  recaptchaVerifier1: any
  confirmationResult: any
  request:any
  digit:any
  cCode:any
  what:any
  code:string
  once:number=0
  notSubmitted:boolean=true
  constructor(public toastCtrl:ToastController,public nvp:NavParams,public lc:LoadingController,public sg:Storage,public events:Events,public navCtrl: NavController, public fire : FirebaseService) {
    this.fbs=fire
    this.ev=events
    this.cCode=this.nvp.get("cCode")
    this.what=this.nvp.get("what")


  }
  doLogin(){
    this.cCode=this.nvp.get("cCode")
    this.what=this.nvp.get("what")
    if(this.what==='login'){
      this.login()
    }else if(this.what==='signup'){
      this.signup()
    }
  }
  login(){
      var load=this.lc.create({
      content:"Logging you in..."
    })
    load.present()
    var vm=this

      //this.navCtrl.push(MainPage);
      this.cCode.confirm(this.code).then((res)=>{
        this.notSubmitted=false
        this.fbs.getDatabase("/users/"+this.fbs.currentUser().uid+"/basic/username",true).then((th)=>{
          if(!th){
            load.dismiss()
              let toast = this.toastCtrl.create({
                message: "It looks like you don't have an account with us yet, please signup for an account to enjoy Dahlaq",
                duration: 3333,
                position: 'top'
              });
              toast.present();
              vm.fbs.currentUser().delete().then(()=>{
                console.log("fdfdfd")
                set("state",'nono').then(()=>{
                  getF("state")
                })
              })
              //this.navCtrl.pop()


          }else{
            console.log("Login Successful")
            load.dismiss()
            let toast = this.toastCtrl.create({
              message: "Welcome back! See what's new and catch up with friends!",
              duration: 1000,
              position: 'top'
            });
            toast.present();
            setTimeout(()=>{
              console.log("is the timeout working even??")
              set("state",'login').then(()=>{
                getF("state")
              })
            },666)

          }
        })

      }).catch((err)=>{
        //this.navCtrl.push(MainPage);
        console.log("Error with the confirmation code", err)
        load.dismiss()
        let toast = this.toastCtrl.create({
          message: "Login failed. Please make sure you enter the right SMS code.",
          duration: 1000,
          position: 'top'
        });
        toast.present();
      //  this.navCtrl.pop()
      setTimeout(()=>{
        console.log("Anything")
        set("state",'nono').then(()=>{
          getF("state")
        })
      },1250)
      })
  }
  signup(){
    var load=this.lc.create({
    content:"Signing you up..."
  })
  load.present()
  var vm=this

    //this.navCtrl.push(MainPage);
    this.cCode.confirm(this.code).then((res)=>{
      this.notSubmitted=false

        //console.log("Login Successful")
        load.dismiss()
        let toast = this.toastCtrl.create({
          message: "Almost done... Wait a bit.",
          duration: 1000,
          position: 'top'
        });
        toast.present();
        setTimeout(()=>{
          set("state",'signup').then(()=>{
            getF("state")
          })

        },1250)

    }).catch((err)=>{
      //this.navCtrl.push(MainPage);
      console.log("Error with the confirmation code", err)
      load.dismiss()
      let toast = this.toastCtrl.create({
        message: "Signup failed. Please make sure you enter the right SMS code.",
        duration: 1000,
        position: 'top'
      });

      if(this.fbs.currentUser()){
        this.fbs.currentUser().delete().then(()=>{
          this.navCtrl.pop()
        })

      }else{
        this.navCtrl.pop()
      }
      toast.present();
      //this.navCtrl.pop()
      setTimeout(()=>{
        set("state",'nono').then(()=>{
          getF("state")
        })
      },1250)

    })


  }

}
