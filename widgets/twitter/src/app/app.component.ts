import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

interface TwitterPost {
  userId: string;
  title: string;
  body: string;
}

@Component({
  selector: '.tile-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  results: Array<TwitterPost>;
 
  // Inject HttpClient into your component or service.
  constructor(private http: Http) {}
 
  ngOnInit(): void {
    // Make the HTTP request:
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(data => {
      this.results = (<Array<TwitterPost>>data.json()).filter((_, i) => i < 5);
    });
  }
}
