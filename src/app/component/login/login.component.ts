import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  rootRef = firebase.database().ref();
  alertMessage = '';
  constructor(private router: Router, private authService: AuthService) { }
  @ViewChild('form') loginForm: NgForm;
  onSubmit() {
    const mail = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    if ( mail !== '' && password !== '' ) {
      this.authService.loginUser(mail, password);
    }
    this.rootRef.child('errorMessage/').on('value', snap => {
      if (snap.val() !== '') {
        snap.forEach(child => {
          if ( child.key === 'message' ) {
            this.alertMessage = JSON.stringify(Object.values(snap.val())[1]);
          }
        });
      } else {
        this.alertMessage = '';
      }
    });
  }
}
