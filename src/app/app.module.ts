import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { AlbumsComponent } from './albums/albums.component';
import { PostsComponent } from './posts/posts.component';
import { AddpostComponent } from './posts/addpost/addpost.component';
import { EditpostComponent } from './posts/editpost/editpost.component';
import { CommsComponent } from './posts/editpost/comms/comms.component';
import { PhotosComponent } from './albums/photos/photos.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    MainComponent,
    HeaderComponent,
    AlbumsComponent,
    PostsComponent,
    AddpostComponent,
    EditpostComponent,
    CommsComponent,
    PhotosComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
