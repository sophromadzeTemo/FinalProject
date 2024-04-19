import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { Album } from '../interfaces/album.interface';
import { Photo } from '../interfaces/photo.interface';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  users!: User[];
  albums!: Album[];
  photos!: Photo[];

  constructor(private albumService: AlbumService, private router: Router) {}

  ngOnInit(): void {
    this.albumService.getAlbums().subscribe((albums: Album[]) => {
      this.albums = albums;
    });
    this.albumService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
    this.albumService.getPhotos().subscribe((photos: Photo[]) => {
      this.photos = photos;
    });
  }

  // მომხმარებლის სახელის ამოღების მეთოდი მისი მომხმარებლის ID-ით
  getUsers(userId: number): string {
    const user = this.users?.find((user) => user.id === userId);
    return user ? user.name : '';
  }

  // ალბომში ფოტოების რაოდენობის დათვლის მეთოდი ალბომის ID-ით
  getPhotosNumber(albumId: number): number {
    return this.photos?.filter((photo) => photo.albumId === albumId).length;
  }

  onPhoto(albumId: number): void {
    this.router.navigate(['/photos', albumId]);
  }
}
