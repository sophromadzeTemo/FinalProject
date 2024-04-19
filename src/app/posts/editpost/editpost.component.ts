import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/interfaces/post.interface';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss'],
})
export class EditpostComponent implements OnInit {
  post: Post = { id: 0, title: '', body: '', userId: 0 };
  showError = false;

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // ამოიღეთ პოსტის ID route-ს პარამეტრებიდან
      const postId = +params['id']; // '+' გარდაქმნის პარამეტრის სტრიქონს რიცხვად
      // წამოვიღოთ პოსტის მონაცემები სერვერიდან პოსტის ID-ის გამოყენებით
      this.postService.getPostById(postId).subscribe((post: Post) => {
        this.post = post;
      });
    });
  }

  goBack(): void {
    this.router.navigate(['/posts']);
  }

  validateInputs(): boolean {
    return (
      this.post.title.trim().length > 0 && this.post.body.trim().length > 0
    );
  }

  // სერვერზე პოსტის განახლების მეთოდი
  updatePost(): void {
    if (this.validateInputs()) {
      // გამოვიძახოთ updatePost მეთოდი postService-დან
      this.postService.updatePost(this.post).subscribe(() => {
        this.goBack();
      });
    } else {
      this.showError = true;
    }
  }
}
