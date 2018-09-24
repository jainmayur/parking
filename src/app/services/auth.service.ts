import { Router } from '@angular/router';
import { Injectable } from '../../../node_modules/@angular/core';
import * as firebase from 'firebase';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    loginStatus = false;
    constructor(private router: Router) { }
    rootRef = firebase.database().ref();
    signUpUser(email: string, password: string, name: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
            () => {
                this.rootRef.child('userInfo/').set({
                    [name]: {
                        email: email,
                        password: password
                    }
                });
            }
        )
        .catch(
            (error) => {
                this.rootRef.child('errorMessage/').set(error);
            }
        );
        this.router.navigate(['/login']);
    }
    loginUser(email: string, password: string) {
        const self = this;
        self.rootRef.child('userInfo/').once('value', snapshot => {
            snapshot.forEach(child => {
                if (email === child.val().email) {
                    bcrypt.compare(password, child.val().password, function(err, res) {
                        if (res) {
                            firebase.auth().signInWithEmailAndPassword(email, child.val().password)
                            .then(
                                () => {
                                    self.loginStatus = true;
                                    self.rootRef.child('errorMessage/').set('');
                                    self.router.navigate(['/spot-location']);

                                }
                            )
                            .catch(
                                (error) => {
                                    self.rootRef.child('errorMessage/').set(error);
                                }
                            );
                        }
                    });
                }
            });
        });
    }
    get isLoggedIn() {
        if (this.loginStatus) {
        } else {
            this.router.navigate(['/login']);
        }
        return this.loginStatus;
    }
}
