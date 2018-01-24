import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: '#zeisslet',
  templateUrl: './app.component.2.html'
})
export class AppComponent {
  count: number;

  // Inject HttpClient into your component or service.
  constructor(private http: Http) {
    this.count = 0;
  }

  public incrementCount = () => {  
    this.count++;
  }
}
