import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../interfaces/album.interface';
import { User } from '../interfaces/user.interface';
import { Photo } from '../interfaces/photo.interface';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  constructor(private http: HttpClient) {}

  // API-დან ალბომების სიის ამოღების მეთოდი. აბრუნებს ალბომების დაობზერვერებულ მასივს.
  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(
      'https://jsonplaceholder.typicode.com/albums'
    );
  }

  // API-დან იუზერების სიის ამოღების მეთოდი. აბრუნებს იუზერების დაობზერვერებულ მასივს.
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/Users');
  }

  // API-დან ფოტოების სიის ამოღების მეთოდი. აბრუნებს ფოტოების დაობზერვერებულ მასივს.
  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(
      'https://jsonplaceholder.typicode.com/photos'
    );
  }

  // API-დან ფოტოების სიის ამოღება კონკრეტული ალბომის Id-ით. აბრუნებს ფოტოების დაობზერვერებულ მასივს.
  getPhotosByAlbumId(albumId: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(
      `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
    );
  }
}
