import { Component, Input, OnInit } from '@angular/core';
import { Comm } from 'src/app/interfaces/comm.interface';
import { CommService } from 'src/app/services/comm.service';

@Component({
  selector: 'app-comms',
  templateUrl: './comms.component.html',
  styleUrls: ['./comms.component.scss'],
})
export class CommsComponent implements OnInit {
  @Input() postId!: number; // Input property postId-ის მისაღებად მშობელი კომპონენტიდან
  comms!: Comm[];
  newCommentName: string = '';
  newCommentBody: string = '';
  showError: boolean = false;

  constructor(private commService: CommService) {}

  validateInputs(): boolean {
    return (
      this.newCommentName.trim().length > 0 &&
      this.newCommentBody.trim().length > 0
    );
  }

  ngOnInit(): void {
    this.loadComments();
  }

  // კომენტარების ჩატვირთვის მეთოდი ლოკალურად ან სერვერიდან
  loadComments() {
    const storedComments = localStorage.getItem('comms'); // კომენტარების მოძიება ლოკალურად
    if (storedComments) {
      this.comms = JSON.parse(storedComments); // თუ შენახული კომენტარებია ლოკალურად, ჩამოტვირთე.
    } else {
      // თუ კომენტარები არ არის ადგილობრივ მეხსიერებაში, წამოვიღოთ სერვერიდან
      this.commService.getComments().subscribe((comms) => {
        this.comms = comms;
        this.updateLocalStorage(); // განაახლეთ ლოკალური მეხსიერება ახალი კომენტარებით
      });
    }
  }

  // ლოკალური მეხსიერების განახლების მეთოდი მიმდინარე კომენტარებით
  updateLocalStorage() {
    localStorage.setItem('comms', JSON.stringify(this.comms));
  }

  // ახალი კომენტარის დამატების მეთოდი
  addComment(): void {
    if (this.validateInputs()) {
      // ახალი კომენტარის ობიექტის შექმნა
      const newComment: Comm = {
        id: 0,
        name: this.newCommentName.trim(),
        body: this.newCommentBody.trim(),
      };

      // ვეძახი სერვისს რომ დავამატო ახალი კომენტარი ბექენდში
      this.commService.addComment(newComment).subscribe({
        next: (addedComment) => {
          this.comms.unshift(addedComment); // ვამატებ ახალ კომენტარს კომენტარების მასივის დასაწყისში
          this.updateLocalStorage(); // ლოკალური მეხისერების განახლება
          this.resetInputFields(); // ინფუთების ველების გასუფთავება კომენტარის დამატების შემდეგ
        },
        error: (error) => {
          console.error('Failed to add comment:', error);
          this.showError = true;
        },
      });
    } else {
      this.showError = true;
    }
  }

  resetInputFields() {
    this.newCommentName = '';
    this.newCommentBody = '';
    this.showError = false;
  }
}
