import { Component, OnInit } from '@angular/core';
import { Post } from '../interfaces/post.interface';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  users: User[] | undefined;
  posts: Post[] | undefined;

  // Default ობიექტი ახალი პოსტის შესაქმნელად
  newPost: Post = { userId: 0, id: 0, title: '', body: '' };
  // Default ობიექტი ახალი მომხმარებლის შესაქმნელად
  newUser: User = { id: 0, name: '' };

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    // ვამოწმებ არის თუ არა მომხმარებლის მონაცემები უკვე ჩატვირთული
    if (this.postService.users.length === 0) {
      // ახებ სერვისს მომხმარებლის სერვერიდან წამოსაღებად
      this.postService.getUsers().subscribe((users) => {
        this.postService.users = users; // ვინახავთ წამოღებულ მომხმარებელს სერვისში
        this.users = this.postService.users; // ვანიჭებ წამოღებულ მომხმარებლებს ლოკალურ ცვლადს
      });
    } else {
      // თუ მომხმარებელი უკვე ჩატვირთულია პირდაპირი მინიჭება.
      this.users = this.postService.users;
    }

    // სერვერიდან პოსტების წამოღება
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts; // ვანიჭებ წამოღებულ პოსტებს ლოკალურ ცვლადს
    });
  }

  // დამხმარე ფუნქცია მომხმარებლის სახელის ამოსაღებად მომხმარებლის ID-ით
  getUsers(userId: number): string {
    const user = this.postService.users?.find((user) => user.id == userId);
    return user ? user.name : '';
  }

  onPost(postId: number) {
    this.router.navigate(['/editposts', postId]);
  }
}
