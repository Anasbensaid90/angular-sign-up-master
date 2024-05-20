import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ChatService } from 'src/app/services/chat.service';
import { FormControl } from '@angular/forms';
import { combineLatest, map, startWith, filter } from 'rxjs';
import { ProfileUser } from '../../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;
  searchControl = new FormControl('');

  users$ = combineLatest([
    this.usersService.allUsers$,
    this.user$,
    this.searchControl.valueChanges.pipe(
      startWith(''),
      filter(value => value !== null)
    )
  ]).pipe(
    map(([users, user, searchString]) =>
      users.filter(u =>
        u.displayName?.toLowerCase().includes((searchString ?? '').toLowerCase()) &&
        u.uid !== user?.uid
      )
    )
  );

  constructor(private usersService: UsersService, private chatService: ChatService) {}

  ngOnInit(): void {}

  createChat(otherUser: ProfileUser) {
    console.log('createChat called with:', otherUser);
    this.chatService.createChat(otherUser).subscribe({
      next: (chatId) => console.log('Chat created with ID:', chatId),
      error: (error) => console.error('Error creating chat:', error)
    });
  }
}
