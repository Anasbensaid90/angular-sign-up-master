import { Injectable } from '@angular/core';
import { collection, addDoc, Firestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { take, concatMap, map } from 'rxjs/operators';
import { UsersService } from './users.service';
import { ProfileUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private firestore: Firestore,
    private usersService: UsersService
  ) {}

  createChat(otherUser: ProfileUser): Observable<string> {
    console.log('createChat called with otherUser:', otherUser);
    const ref = collection(this.firestore, 'chats');
    return this.usersService.currentUserProfile$.pipe(
      take(1),
      concatMap(user => {
        console.log('Current user:', user);
        return from(addDoc(ref, {
          userIds: [user?.uid, otherUser?.uid],
          users: [
            {
              displayName: user?.displayName ?? '',
              photoURL: user?.photoURL ?? ''
            },
            {
              displayName: otherUser?.displayName ?? '',
              photoURL: otherUser?.photoURL ?? ''
            },
          ]
        })).pipe(
          map(docRef => {
            console.log('Chat document created with ID:', docRef.id);
            return docRef.id;
          })
        );
      })
    );
  }
}
