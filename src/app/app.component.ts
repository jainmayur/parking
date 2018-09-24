import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDidvyXDQ9iDCOuc4BolZ2s6UMZtqP06BI',
      authDomain: 'parkme-f3a9a.firebaseapp.com',
      databaseURL: 'https://parkme-f3a9a.firebaseio.com',
      projectId: 'parkme-f3a9a',
      storageBucket: 'parkme-f3a9a.appspot.com',
      messagingSenderId: '561142016481'
    });
  }
}


