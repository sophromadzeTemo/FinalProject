import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post.interface';
import { User } from 'src/app/interfaces/user.interface';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.scss'],
})
export class AddpostComponent {
  newPost: Post = { userId: 0, id: 0, title: '', body: '' };
  newUserName: string = '';
  showError: boolean = false;

  constructor(private postService: PostService, private router: Router) {}

  validateInputs(): boolean {
    return (
      this.newUserName.trim().length > 0 &&
      this.newPost.title.trim().length > 0 &&
      this.newPost.body.trim().length > 0
    );
  }

  // ახალი პოსტის დამატების დამუშავების მეთოდი
  addPost(): void {
    // ჯერ ვამოწმებ ინფუთებს
    if (this.validateInputs()) {
      // ვქმნი ახალი მომხმარებლის ობიექტს ამოჭრილი(trim) სახელით
      const newUser: User = { id: 0, name: this.newUserName.trim() };
      // ვიძახებ სერვისს ახალი მომხმარებლის დასამატებლად
      this.postService.addUser(newUser).subscribe((user) => {
        // მომხმარებლის წარმატებით დამატების შემდეგ ვქმნი ახალი პოსტის ობიექტს
        const newPost: Post = {
          userId: user.id, // ვანიჭებ მომხმარებლის ID-ს ახლად შექმნილი მომხმარებლისგან
          id: 0,
          title: this.newPost.title.trim(),
          body: this.newPost.body.trim(),
        };
        // ვიძახებ სერვისს პოსტის დასამატებლად
        this.postService.addPost(newPost).subscribe(() => {
          this.router.navigate(['/posts']);
        });
      });
    } else {
      this.showError = true;
    }
  }
}
