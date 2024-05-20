import {Injectable, NgModule} from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp'
import { environment } from 'src/environments/environment'
import { HomeComponent } from 'src/app/components/home/home.component'

import { MatButtonModule } from '@angular/material/button'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { MatCardModule } from '@angular/material/card'
import { ProfileComponent } from 'src/app/components/profile/profile.component'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { PostFeedComponent } from 'src/app/components/post-feed/post-feed.component'
import {CreatePostComponent} from "./components/create-post/create-post.component";
import { PostComponent } from 'src/app/components/post/post.component'
import { ReplyComponent } from 'src/app/components/reply/reply.component'
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AuthService} from "src/app/services/auth.service";
import {AuthenticatorComponent} from "./components/authenticator/authenticator.component";
import {EmailVerificationComponent} from "./components/email-verification/email-verification.component";
@Injectable({ providedIn: 'root' })
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    PostFeedComponent,
    CreatePostComponent,
    PostComponent,
    ReplyComponent,
    AuthenticatorComponent,
    EmailVerificationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent], // Provide AuthService here
})
export class AppModule {
  constructor () {
    FirebaseTSApp.init(environment.firebase)
  }
}
