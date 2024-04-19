import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Post } from '../interfaces/post.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  posts: Post[] = [];
  users: User[] = [];

  // მრიცხველი მომხმარებლებისა და პოსტებისთვის უნიკალური ID-ების მინიჭებისთვის
  private userIdCounter: number = 0;
  private postIdCounter: number = 0;

  constructor(private http: HttpClient) {}

  // მომხმარებელთა წამოღების მეთოდი ადგილობრივი მეხსიერებიდან ან backend API-დან
  getUsers(): Observable<User[]> {
    if (this.users.length !== 0) {
      // თუ მომხმარებლები უკვე ჩატვირთულები არიან, დავაბრუნოთ ისინი როგორც Observable ახალი HTTP მოთხოვნის გარეშე
      return new Observable<User[]>((observer) => {
        observer.next(this.users);
        observer.complete();
      });
    } else {
      // თუ მომხმარებელი არ არის ჩატვირთული, ავიღოთ ისინი API-დან
      return this.http
        .get<User[]>('https://jsonplaceholder.typicode.com/users')
        .pipe(
          map((users) => {
            this.users = users; // ვინახავ ჩატვირთულ მომხმარებლებს
            this.userIdCounter = users.length; // მომხმარებლის ID მრიცხველის განახლება
            return users;
          })
        );
    }
  }

  // პოსტების წამოღების მეთოდი ადგილობრივი მეხსიერებიდან ან backend API-დან
  getPosts(): Observable<Post[]> {
    if (this.posts.length !== 0) {
      // თუ პოსტები უკვე ჩატვირთულია, დავაბრუნოთ ისინი როგორც Observable ახალი HTTP მოთხოვნის გარეშე
      return new Observable<Post[]>((observer) => {
        observer.next(this.posts);
        observer.complete();
      });
    } else {
      // თუ პოსტები არ არის ჩატვირთული, ავიღოთ ისინი API-დან
      return this.http
        .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
        .pipe(
          map((posts) => {
            this.posts = posts; // ვინახავ ჩატვირთულ პოსტებს
            this.postIdCounter = posts.length; // პოსტების ID მრიცხველის განახლება
            return posts;
          })
        );
    }
  }

  // მომხმარებლის დამატების მეთოდი POST მოთხოვნით ბექენდში
  addUser(user: User): Observable<User> {
    user.id = ++this.userIdCounter; // ახალი უნიკალური ID-ის მინიჭება მომხმარებელზე
    return this.http
      .post<User>('https://jsonplaceholder.typicode.com/users', user)
      .pipe(
        map((addedUser) => {
          addedUser.id = user.id;
          this.users.push(addedUser); // ახალი მომხმარებლის დამატება ლოკალურად
          return addedUser; // დამატებული მომხმარებლის დაბრუნება
        })
      );
  }

  // პოსტის დამატების მეთოდი POST მოთხოვნით ბექენდში
  addPost(post: Post): Observable<Post> {
    post.id = ++this.postIdCounter; // ახალი უნიკალური ID-ის მინიჭება პოსტზე
    return this.http
      .post<Post>('https://jsonplaceholder.typicode.com/posts', post)
      .pipe(
        map((addedPost) => {
          addedPost.id = post.id;
          this.posts.unshift(addedPost); // ახალი პოსტის დამატება ლოკალურად
          return addedPost; // დამატებული პოსტის დაბრუნება
        })
      );
  }

  // კონკრეტული პოსტის ID-ით ამოღების მეთოდი ლოკალური მეხსიერებიდან ან ბექენდიდან
  getPostById(id: number): Observable<Post> {
    const foundPost = this.posts?.find((p) => p.id === id);
    if (foundPost) {
      // თუ პოსტი ლოკალურად მოიძებნა, ვაბრუნებ როგორც Observable-ს
      return new Observable<Post>((observer) => {
        observer.next(foundPost);
        observer.complete();
      });
    } else {
      // თუ პოსტი ლოკალურად არ მოიძებნა, წამოვიღოთ API-დან
      return this.http.get<Post>(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
    }
  }

  // პოსტის განახლების მეთოდი PUT მოთხოვნით backend-ზე
  updatePost(post: Post): Observable<Post> {
    // შევამოწმოთ არის თუ არა პოსტი ლოკალურ მასივში
    const index = this.posts.findIndex((p) => p.id === post.id);
    if (index !== -1) {
      // თუ პოსტი არსებობს ლოკალურად, განვაახლოთ ბექენდის გარეშე
      this.posts[index] = post; // განვაახლოთ ლოკალური მასივი ცვლილებისთვის
      return new Observable<Post>((observer) => {
        observer.next(post);
        observer.complete();
      });
    } else {
      //თუ პოსტი არ არსებობს ლოკალურად, ვაგზავნი PUT მოთხოვნას API-ში პოსტის განახლებისთვის
      return this.http.put<Post>(
        `https://jsonplaceholder.typicode.com/posts/${post.id}`,
        post
      );
    }
  }
}
