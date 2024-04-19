import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AlbumsComponent } from './albums/albums.component';
import { TodosComponent } from './todos/todos.component';
import { AddpostComponent } from './posts/addpost/addpost.component';
import { PhotosComponent } from './albums/photos/photos.component';
import { PostsComponent } from './posts/posts.component';
import { EditpostComponent } from './posts/editpost/editpost.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'albums', component: AlbumsComponent },
  { path: 'todos', component: TodosComponent },
  { path: 'editposts/:id', component: EditpostComponent },
  { path: 'addpost', component: AddpostComponent },
  { path: 'photos/:albumId', component: PhotosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
