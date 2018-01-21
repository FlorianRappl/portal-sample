import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: '.tile-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  results: string[];
 
  // Inject HttpClient into your component or service.
  constructor(private http: Http) {}
 
  ngOnInit(): void {
    // Make the HTTP request:
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(data => {
      this.results = data.json();
      console.log(this.results);
    });
  }
}
