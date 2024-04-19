import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'FinalProject';

  ngOnInit() {
    this.clearLocalStorage();
  }
  clearLocalStorage() {
    localStorage.removeItem('comms');
  }
}
