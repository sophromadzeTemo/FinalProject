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
    this.route.params.subscribe((params) => {
      // ვიღებ 'albumId'-ს route-ს პარამეტრებიდან და ვაკონვერტირებ რიცხვად
      const albumId = parseInt(params['albumId']!);
      // 'albumId'-სთან დაკავშირებული ფოტოების მოთხოვნა სერვერიდან
      this.albumService.getPhotosByAlbumId(albumId).subscribe((photos) => {
        this.photos = photos;
      });
    });
  }
}
