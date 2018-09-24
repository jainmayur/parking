import { Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '../../../../node_modules/@angular/router';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent {
  rootRef = firebase.database().ref();
  @ViewChild('form') signUpForm: NgForm;
  resetForm() {
    this.signUpForm.reset();
  }

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    const self = this;
    const email: string = self.signUpForm.value.email;
    const username: string = self.signUpForm.value.user_name;
    const password: string = self.signUpForm.value.password;
    const confirmPass: string = self.signUpForm.value.confirmPass;

    bcrypt.genSalt(10, function(error, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        if (password === confirmPass && password.length >= 6 && username !== '' ) {
          self.auth.signUpUser(email, hash, username);
          self.resetForm();
        }
        bcrypt.compare(confirmPass, hash, function(eror, res) {
          if (res) {
            alert(res);
          } else {
            alert('password not match');
          }
        });
      });
    });

    this.rootRef.child('errorMessage/').on('value', snap => {
      snap.forEach(child => {
        if (child.key === 'message') {
          alert(child.val());
        }
      });
    });
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
