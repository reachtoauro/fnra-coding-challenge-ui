import { Component } from '@angular/core';

export interface Combinations {
  combinations: string[];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Letter Cobination Generator from Phone Number';
}
