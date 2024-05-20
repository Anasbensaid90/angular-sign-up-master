import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import {ProfileUser} from "../models/user";
import { collectionData, query } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root',
})
export class UsersService {
  get allUsers$(): Observable<ProfileUser[]> {
    const ref=collection(this._firestore,'users');
    const queryAll= query(ref);
    return collectionData(queryAll) as Observable<ProfileUser[]>;
  }
  constructor(
    private _firestore: Firestore,
    private _authService: AuthService
  ) {}

  get currentUserProfile$(): Observable<ProfileUser | null> {
    return this._authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this._firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }


  addUser(user: ProfileUser): Observable<void> {
    const ref = doc(this._firestore, 'users', user.uid);
    return from(setDoc(ref, user));
  }

  updateUser(user: ProfileUser): Observable<void> {
    const ref = doc(this._firestore, 'users', user.uid);
    return from(updateDoc(ref, { ...user }));
  }
}
