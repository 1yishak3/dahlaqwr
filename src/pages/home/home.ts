import { Component, AfterViewInit} from '@angular/core';
import { NavController,Events,LoadingController, ToastController } from 'ionic-angular';

//import { LoginPage } from '../login/login';
//import { SignupPage } from '../signup/signup';
import { FirebaseService } from '../../providers/firebase'
import {Storage} from '@ionic/storage'
import {CoderPage} from '../coder/coder'

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
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ev:any
  fbs:FirebaseService;
  recaptchaVerifier: any
  recaptchaVerifier1: any
  confirmationResult: any
  request:any
  digit:any
  creds:any={
    digit:"",
    pass:""
  }
  constructor(public lc:LoadingController, public toastCtrl:ToastController,public sg:Storage,public events:Events,public navCtrl: NavController, public fire : FirebaseService) {
    this.fbs=fire
    this.ev=events


   }

   ngAfterViewInit(){

   }
  clicker(){
    get("request").then((req)=>{
      this.request=req
      console.log("this is request",req)
      get("num").then((num)=>{
        this.digit=num

        if(req){
          console.log(req)
          if(req==='signup'){
            this.signup()
          }else if(req==='login'){
            this.login()
          }
        }else{
          console.log("sth wrong with getting info...shit. Wasted entire day")
        }
      })
    })
  }
  login() {
    var lod=this.lc.create({content:"Verifying you are human..."})
    lod.present()
    var navCtrl=this.navCtrl
    var vm=this
    //navCtrl.push(LoginPage,{'confirm':"what?"})
    get("password").then((pass)=>{
      this.creds.digit=this.digit
      this.creds.pass=pass
      this.fbs.recaptcha("verify").then((ver)=>{
        console.log("Verify in verify out",ver)
        this.recaptchaVerifier=ver
        this.fbs.login(this.creds, this.recaptchaVerifier).then((res)=>{
          console.log("We have a response: ", res)
          lod.dismiss()
          // localforage.setItem("confirmationCoder",res).then(()=>{
          //   localforage.setItem("readyRU",true).then(()=>{
          //     console.log("we are ready!")
          //     lod.dismiss()
          //   })
          // })
          this.navCtrl.push(CoderPage,{cCode:res,what:'login'})
        }).catch((err)=>{
          lod.dismiss()
          let toast = this.toastCtrl.create({
            message: "Something went wrong with veriication. Please retry (If you are human, lol).",
            duration: 3333,
            position: 'top'
          });
          toast.present();
        //  vm.fbs.currentUser().delete()
          console.log("Error loging in. Cause: ",err)
          //navCtrl.push(LoginPage)
        })
      }).catch((err)=>{
        console.log("sam ting wong",err)
        lod.dismiss()
        let toast = this.toastCtrl.create({
          message: "Something went wrong with veriication. Please retry (If you are human, lol).",
          duration: 3333,
          position: 'top'
        });
        toast.present();
      })
    })

  }
  // set(x,y){
  //   return this.sg.set(x,y)
  // }
  // get(x){
  //   return this.sg.get(x)
  // }
  signup() {
    var lod=this.lc.create({content:"Verifying you are human..."})
    lod.present()
    console.log(this.digit)
    /*var happy = this.fbs.linkToNumber
    var creds= this.creds
    var vm=this
    var recaptchaVerifier1 = this.recaptchaVerifier1*/
    var vm=this
    var confirmationResult;
    var navCtrl=this.navCtrl
    get("password").then((pass)=>{
      this.creds.digit=this.digit
      this.creds.pass=pass
      this.fbs.recaptcha("verify").then((ver)=>{
        this.fbs.createUser(this.creds, ver).then((res)=>{
          console.log("This is the conf code",res)
          confirmationResult = res
          // localforage.setItem("confirmationCoder",res).then(()=>{
          //   localforage.setItem("readyRU",true)
          //   lod.dismiss()
          // })
          lod.dismiss()
          this.navCtrl.push(CoderPage,{cCode:res,what:'signup'})
        }).catch(function(err){
          if(vm.fbs.currentUser()){
            vm.fbs.currentUser().delete()
          }
          lod.dismiss()
          let toast = this.toastCtrl.create({
            message: "Something went wrong. Please make sure you haven't registered an account with that number already.",
            duration: 3333,
            position: 'top'
          });
          toast.present();

          lod.dismiss()
          console.log("You have an error",err)
          //toast saying An error with the network occured, click back and try again.
          //navCtrl.push(SignupPage,{"confirm":confirmationResult})
        })
      }).catch((err)=>{
        lod.dismiss()
        if(vm.fbs.currentUser()){
          vm.fbs.currentUser().delete()
        }
        console.log(err)

      })
    })



  }
  // verify(){
  //   this.fbs.recaptcha("verify").then((veri)=>{
  //     console.log("moment of truth",veri)
  //     localforage.setItem("verifier",veri).then(()=>{
  //       console.log("Read as shit")
  //       return localforage.setItem("readyRU",true)
  //     })
  //   })
  //
  // }
}
