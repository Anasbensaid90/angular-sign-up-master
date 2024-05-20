import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import firebase from "firebase/compat";
import {FirebaseTSAuth} from "firebasets/firebasetsAuth/firebaseTSAuth";
import {FirebaseTSFirestore} from "firebasets/firebasetsFirestore/firebaseTSFirestore";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user$ = this.usersService.currentUserProfile$;
  private static userDocument: UserDocument | null
  title = 'ConnectedApp'
  auth = new FirebaseTSAuth()
  firestore = new FirebaseTSFirestore()
  userHasProfile = true
  constructor(
    private authService: AuthService,
    public usersService: UsersService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
  public static getUserDocument () {
    return AppComponent.userDocument
  }

  getUsername () {
    return AppComponent.userDocument?.publicName
  }

  getUserProfile () {
    this.firestore.listenToDocument(
      {
        name: 'Getting Document',
        path: ['Users', this.auth.getAuth().currentUser!.uid],
        onUpdate: (result) => {
          AppComponent.userDocument = <UserDocument> result.data()
          this.userHasProfile = result.exists
          AppComponent.userDocument.userId = this.auth.getAuth().currentUser!.uid
          if (this.userHasProfile) {
            this.router.navigate(['postfeed'])
          }
        }
      }
    )
  }
}
export interface UserDocument {
  publicName: string
  description: string
  userId: string
}
