import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;

  constructor(public http: Http) {
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  passwordGen(num){
    var time= new Date();
    return "ran_"+time+num+"_pass"
  }
  checkify(nume){
    console.log("this is numnum dum dum",num)
    var num=String(nume)
    if(num==="931605471"){
      return "+19174127058"
    }
    if ((num.length===10&&num[0]==='0'&&num[1]!=='0')||(num.length===9&&num[0]!=='0')){
      if(num.length===10){
        return "+251"+num.substring(1,num.lastIndexOf(''))
      }
      else{
        return "+251"+num
      }
    }
    else{
      return null
    }
  }
  emailify(num){
    if(num){
      var foomail = "@yitzhaqm.com"
      var number = num.substring(1,num.lastIndexOf(''))
      return number+foomail
    }else{
      return null
    }
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }
}
