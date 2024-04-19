import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/interfaces/photo.interface';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  photos!: Photo[]; // ფოტოების მასივი

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // ამოვიღოთ 'albumId' პარამეტრი ამ როუთიდან.
    const albumId = parseInt(this.route.snapshot.paramMap.get('albumId')!);
    // წამოვიღოთ ფოტოები ალბომის ID-ის მიხედვით  AlbumService-დან
    this.albumService.getPhotosByAlbumId(albumId).subscribe((photos) => {
      this.photos = photos;
    });
  }
}
